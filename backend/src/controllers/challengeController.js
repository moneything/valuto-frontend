const Challenge = require('../models/Challenge');
const User = require('../models/User');
const LearningProgress = require('../models/LearningProgress');
const { AppError, asyncHandler } = require('../utils/errorHandler');

const MANUAL_CHALLENGE_TYPES = new Set([
  'monthly_build_your_life',
  'monthly_build_your_business',
  'monthly_investment_simulation',
]);

function assertManualChallenge(challenge) {
  if (!MANUAL_CHALLENGE_TYPES.has(challenge.challengeType)) {
    throw new AppError('This challenge cannot be updated directly', 403);
  }
}

/**
 * Challenge Controller
 * Handles daily and weekly challenges and special tasks
 */

/**
 * @desc    Get user's daily and weekly challenges
 * @route   GET /api/challenges/daily
 * @access  Private
 */
const getDailyChallenges = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  console.log("[Challenges] Fetch daily challenges for clerkUserId:", clerkUserId);

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }
  console.log("[Challenges] Found user:", user._id.toString(), "role:", user.role);

  // Date boundaries for today
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  // Check if challenges exist for today
  let challenges = await Challenge.getDailyChallenges(user._id.toString());
  console.log("[Challenges] Existing challenges today:", challenges.length);

  // Ensure daily challenges exist (backfill missing types)
  const ensured = await Challenge.ensureDailyChallenges(user._id.toString(), clerkUserId, startOfDay);
  if (ensured || challenges.length === 0) {
    console.log("[Challenges] Ensured daily challenges; refetching.");
    challenges = await Challenge.getDailyChallenges(user._id.toString());
    console.log("[Challenges] Challenge count after ensure:", challenges.length);
  }

  const streakChallenges = await Challenge.find({
    userId: user._id.toString(),
    challengeType: { $in: ['learning_streak', 'learning_streak_6', 'learning_streak_7', 'learning_streak_9'] },
    challengeDate: { $gte: startOfDay, $lte: endOfDay },
  });

  let didModifyChallenges = false;

  if (streakChallenges.length > 0) {
    for (const streakChallenge of streakChallenges) {
      const periodStart = new Date(streakChallenge.challengeDate);
      periodStart.setHours(0, 0, 0, 0);
      const periodEnd = new Date(periodStart.getTime() + 7 * 24 * 60 * 60 * 1000 - 1);

      const lessonsCompletedThisWeek = await LearningProgress.countDocuments({
        userId: user._id.toString(),
        status: 'completed',
        completedAt: { $gte: periodStart, $lte: periodEnd },
      });

      console.log("[Challenges] Learning streak lessons in window:", lessonsCompletedThisWeek, "window:", periodStart.toISOString(), "-", periodEnd.toISOString(), "type:", streakChallenge.challengeType);

      console.log("[Challenges] Found streak challenge:", streakChallenge._id.toString());
      const newProgress = Math.min(lessonsCompletedThisWeek, streakChallenge.targetProgress);
      const wasCompleted = streakChallenge.completed;

      if (streakChallenge.currentProgress !== newProgress) {
        console.log("[Challenges] Updating streak progress from", streakChallenge.currentProgress, "to", newProgress);
        streakChallenge.currentProgress = newProgress;
      }

      if (!streakChallenge.completed && newProgress >= streakChallenge.targetProgress) {
        console.log("[Challenges] Streak completed via sync.");
        streakChallenge.completed = true;
        streakChallenge.completedAt = new Date();
        streakChallenge.currentProgress = streakChallenge.targetProgress;
      }

      if (streakChallenge.isModified()) {
        await streakChallenge.save();
        didModifyChallenges = true;
        console.log("[Challenges] Saved streak challenge updates.");

        if (!wasCompleted && streakChallenge.completed) {
          const bonusMultiplier = streakChallenge.bonusMultiplier || 1;
          console.log("[Challenges] Awarding streak points:", streakChallenge.pointsEarned * bonusMultiplier);
          user.totalPoints += streakChallenge.pointsEarned * bonusMultiplier;
          user.updateStreak();
          await user.save();
        }
      }
    }
  } else {
    console.log("[Challenges] No streak challenge found for today.");
  }

  // Daily lesson challenge auto-sync (complete 1 lesson today)
  const dailyLessonChallenge = await Challenge.findOne({
    userId: user._id.toString(),
    challengeType: 'daily_lesson',
    challengeDate: { $gte: startOfDay, $lte: endOfDay },
  });

  if (dailyLessonChallenge) {
    const lessonsCompletedToday = await LearningProgress.countDocuments({
      userId: user._id.toString(),
      status: 'completed',
      completedAt: { $gte: startOfDay, $lte: endOfDay },
    });

    console.log("[Challenges] Lessons completed today:", lessonsCompletedToday);

    const newProgress = Math.min(lessonsCompletedToday, dailyLessonChallenge.targetProgress);
    const wasCompleted = dailyLessonChallenge.completed;

    if (dailyLessonChallenge.currentProgress !== newProgress) {
      console.log("[Challenges] Updating daily lesson progress from", dailyLessonChallenge.currentProgress, "to", newProgress);
      dailyLessonChallenge.currentProgress = newProgress;
    }

    if (!dailyLessonChallenge.completed && newProgress >= dailyLessonChallenge.targetProgress) {
      console.log("[Challenges] Daily lesson completed via sync.");
      dailyLessonChallenge.completed = true;
      dailyLessonChallenge.completedAt = new Date();
      dailyLessonChallenge.currentProgress = dailyLessonChallenge.targetProgress;
    }

    if (dailyLessonChallenge.isModified()) {
      await dailyLessonChallenge.save();
      didModifyChallenges = true;
      console.log("[Challenges] Saved daily lesson challenge updates.");

      if (!wasCompleted && dailyLessonChallenge.completed) {
        const bonusMultiplier = dailyLessonChallenge.bonusMultiplier || 1;
        console.log("[Challenges] Awarding daily lesson points:", dailyLessonChallenge.pointsEarned * bonusMultiplier);
        user.totalPoints += dailyLessonChallenge.pointsEarned * bonusMultiplier;
        user.updateStreak();
        await user.save();
      }
    }
  } else {
    console.log("[Challenges] No daily lesson challenge found for today.");
  }

  // Refresh challenges list with latest values if modified
  if (didModifyChallenges) {
    challenges = await Challenge.getDailyChallenges(user._id.toString());
    console.log("[Challenges] Refetched challenges after sync. Count:", challenges.length);
  }

  res.status(200).json({
    success: true,
    data: challenges,
  });
});

/**
 * @desc    Update challenge progress
 * @route   PUT /api/challenges/:challengeId/progress
 * @access  Private
 */
const updateChallengeProgress = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { challengeId } = req.params;
  const { increment = 1 } = req.body;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Find challenge
  const challenge = await Challenge.findOne({
    _id: challengeId,
    userId: user._id.toString(),
  });

  if (!challenge) {
    throw new AppError('Challenge not found', 404);
  }

  assertManualChallenge(challenge);

  const wasCompleted = challenge.completed;
  if (!Number.isFinite(Number(increment)) || Number(increment) <= 0) {
    throw new AppError('Increment must be a positive value', 400);
  }

  // Manual challenge progress is server-capped to one step per verified action.
  await challenge.updateProgress(1);

  // If newly completed, award points
  if (!wasCompleted && challenge.completed) {
    user.totalPoints += challenge.pointsEarned * challenge.bonusMultiplier;
    user.updateStreak();
    await user.save();
  }

  res.status(200).json({
    success: true,
    message: challenge.completed ? 'Challenge completed!' : 'Progress updated',
    data: {
      challenge,
      pointsEarned: !wasCompleted && challenge.completed ? challenge.pointsEarned : 0,
      totalPoints: user.totalPoints,
    },
  });
});

/**
 * @desc    Complete a challenge
 * @route   PUT /api/challenges/:challengeId/complete
 * @access  Private
 */
const completeChallenge = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { challengeId } = req.params;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Find challenge
  const challenge = await Challenge.findOne({
    _id: challengeId,
    userId: user._id.toString(),
  });

  if (!challenge) {
    throw new AppError('Challenge not found', 404);
  }

  assertManualChallenge(challenge);

  if (challenge.completed) {
    return res.status(400).json({
      success: false,
      message: 'Challenge already completed',
    });
  }

  await challenge.updateProgress(challenge.targetProgress - challenge.currentProgress);

  // Award points
  user.totalPoints += challenge.pointsEarned * challenge.bonusMultiplier;
  user.updateStreak();
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Challenge completed successfully!',
    data: {
      challenge,
      pointsEarned: challenge.pointsEarned * challenge.bonusMultiplier,
      totalPoints: user.totalPoints,
    },
  });
});

/**
 * @desc    Get user's completed challenges
 * @route   GET /api/challenges/completed
 * @access  Private
 */
const getCompletedChallenges = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { limit = 50, skip = 0 } = req.query;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Get completed challenges
  const challenges = await Challenge.getCompletedChallenges(user._id.toString(), {
    limit: parseInt(limit),
    skip: parseInt(skip),
  });

  res.status(200).json({
    success: true,
    data: challenges,
  });
});

/**
 * @desc    Get challenge statistics
 * @route   GET /api/challenges/stats
 * @access  Private
 */
const getChallengeStats = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Get stats
  const stats = await Challenge.getUserChallengeStats(user._id.toString());

  res.status(200).json({
    success: true,
    data: stats,
  });
});

/**
 * @desc    Create custom challenge
 * @route   POST /api/challenges/create
 * @access  Private
 */
const createCustomChallenge = asyncHandler(async (req, res) => {
  throw new AppError('Custom challenges are disabled for all users', 403);
});

/**
 * @desc    Delete/Cancel a challenge
 * @route   DELETE /api/challenges/:challengeId
 * @access  Private
 */
const deleteChallenge = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { challengeId } = req.params;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Find and delete challenge
  const challenge = await Challenge.findOneAndDelete({
    _id: challengeId,
    userId: user._id.toString(),
  });

  if (!challenge) {
    throw new AppError('Challenge not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Challenge deleted successfully',
  });
});

module.exports = {
  getDailyChallenges,
  updateChallengeProgress,
  completeChallenge,
  getCompletedChallenges,
  getChallengeStats,
  createCustomChallenge,
  deleteChallenge,
};
