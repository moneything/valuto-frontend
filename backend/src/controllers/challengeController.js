const Challenge = require('../models/Challenge');
const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

/**
 * Challenge Controller
 * Handles daily challenges and special tasks
 */

/**
 * @desc    Get user's daily challenges
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

  // Check if challenges exist for today
  let challenges = await Challenge.getDailyChallenges(user._id.toString());

  // If no challenges exist, create them
  if (challenges.length === 0) {
    await Challenge.createDailyChallenges(user._id.toString());
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

  // Update progress
  const wasCompleted = challenge.completed;
  await challenge.updateProgress(increment);

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

  if (challenge.completed) {
    return res.status(400).json({
      success: false,
      message: 'Challenge already completed',
    });
  }

  // Complete challenge
  await challenge.complete();

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
 * @desc    Create custom challenge (admin/teacher)
 * @route   POST /api/challenges/create
 * @access  Private (Teacher only)
 */
const createCustomChallenge = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const {
    challengeId,
    challengeType,
    challengeName,
    challengeDescription,
    pointsEarned,
    targetProgress,
    expiresAt,
  } = req.body;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Check if user is teacher
  if (user.role !== 'teacher') {
    throw new AppError('Only teachers can create custom challenges', 403);
  }

  // Create challenge
  const challenge = await Challenge.create({
    userId: user._id.toString(),
    clerkUserId,
    challengeId,
    challengeType,
    challengeName,
    challengeDescription,
    pointsEarned,
    targetProgress,
    expiresAt: expiresAt ? new Date(expiresAt) : undefined,
  });

  res.status(201).json({
    success: true,
    message: 'Custom challenge created successfully',
    data: challenge,
  });
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
