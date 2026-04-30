const Challenge = require('../models/Challenge');
const User = require('../models/User');
const LearningProgress = require('../models/LearningProgress');
const { AppError, asyncHandler } = require('../utils/errorHandler');

async function awardChallengePointsOnce(challengeId, user, points, bonusMultiplier = 1) {
  const rewardedChallenge = await Challenge.findOneAndUpdate(
    {
      _id: challengeId,
      rewardGranted: { $ne: true },
    },
    {
      $set: {
        rewardGranted: true,
        rewardedAt: new Date(),
      },
    },
    {
      new: true,
    }
  );

  if (!rewardedChallenge) {
    return 0;
  }

  const totalAward = points * bonusMultiplier;
  user.totalPoints += totalAward;
  user.updateStreak();
  await user.save();
  return totalAward;
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

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Date boundaries for today
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  // Check if challenges exist for today
  let challenges = await Challenge.getDailyChallenges(user._id.toString());

  // Ensure daily challenges exist (backfill missing types)
  const ensured = await Challenge.ensureDailyChallenges(user._id.toString(), clerkUserId, startOfDay);
  if (ensured || challenges.length === 0) {
    challenges = await Challenge.getDailyChallenges(user._id.toString());
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

      const newProgress = Math.min(lessonsCompletedThisWeek, streakChallenge.targetProgress);
      const wasCompleted = streakChallenge.completed;

      if (streakChallenge.currentProgress !== newProgress) {
        streakChallenge.currentProgress = newProgress;
      }

      if (!streakChallenge.completed && newProgress >= streakChallenge.targetProgress) {
        streakChallenge.completed = true;
        streakChallenge.completedAt = new Date();
        streakChallenge.currentProgress = streakChallenge.targetProgress;
      }

      if (streakChallenge.isModified()) {
        await streakChallenge.save();
        didModifyChallenges = true;

        if (!wasCompleted && streakChallenge.completed) {
          await awardChallengePointsOnce(
            streakChallenge._id,
            user,
            streakChallenge.pointsEarned,
            streakChallenge.bonusMultiplier || 1
          );
        }
      }
    }
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

    const newProgress = Math.min(lessonsCompletedToday, dailyLessonChallenge.targetProgress);
    const wasCompleted = dailyLessonChallenge.completed;

    if (dailyLessonChallenge.currentProgress !== newProgress) {
      dailyLessonChallenge.currentProgress = newProgress;
    }

    if (!dailyLessonChallenge.completed && newProgress >= dailyLessonChallenge.targetProgress) {
      dailyLessonChallenge.completed = true;
      dailyLessonChallenge.completedAt = new Date();
      dailyLessonChallenge.currentProgress = dailyLessonChallenge.targetProgress;
    }

    if (dailyLessonChallenge.isModified()) {
      await dailyLessonChallenge.save();
      didModifyChallenges = true;

      if (!wasCompleted && dailyLessonChallenge.completed) {
        await awardChallengePointsOnce(
          dailyLessonChallenge._id,
          user,
          dailyLessonChallenge.pointsEarned,
          dailyLessonChallenge.bonusMultiplier || 1
        );
      }
    }
  }

  // Refresh challenges list with latest values if modified
  if (didModifyChallenges) {
    challenges = await Challenge.getDailyChallenges(user._id.toString());
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
  throw new AppError(
    'Direct challenge progress updates are disabled. Challenges are updated only by verified server-side flows.',
    403
  );
});

/**
 * @desc    Complete a challenge
 * @route   PUT /api/challenges/:challengeId/complete
 * @access  Private
 */
const completeChallenge = asyncHandler(async (req, res) => {
  throw new AppError(
    'Direct challenge completion is disabled. Challenges are completed only by verified server-side flows.',
    403
  );
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
