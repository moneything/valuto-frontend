const GameResult = require('../models/GameResult');
const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

/**
 * Game Controller
 * Handles game result submission and retrieval
 */

/**
 * @desc    Submit game result
 * @route   POST /api/game/result
 * @access  Private
 */
const submitGameResult = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const {
    gameCode,
    gameTitle,
    gameType,
    score,
    maxPossibleScore,
    questionsAnswered,
    correctAnswers,
    timeTaken,
    questionResults,
  } = req.body;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Create game result
  const gameResult = await GameResult.create({
    userId: user._id.toString(),
    clerkUserId,
    gameCode: gameCode.toUpperCase(),
    gameTitle,
    gameType: gameType || 'trivia',
    score,
    maxPossibleScore,
    questionsAnswered,
    correctAnswers,
    timeTaken,
    questionResults: questionResults || [],
    completed: true,
    completedAt: new Date(),
  });

  // Update user stats
  user.totalPoints += score;
  user.gamesPlayed += 1;
  user.updateStreak();
  await user.save();

  res.status(201).json({
    success: true,
    message: 'Game result submitted successfully',
    data: {
      gameResult,
      updatedStats: {
        totalPoints: user.totalPoints,
        gamesPlayed: user.gamesPlayed,
      },
    },
  });
});

/**
 * @desc    Get user's game history
 * @route   GET /api/game/history
 * @access  Private
 */
const getGameHistory = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { limit = 10, skip = 0 } = req.query;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Get game history
  const history = await GameResult.getUserHistory(user._id.toString(), {
    limit: parseInt(limit),
    skip: parseInt(skip),
  });

  // Get total count for pagination
  const totalCount = await GameResult.countDocuments({ userId: user._id.toString() });

  res.status(200).json({
    success: true,
    data: {
      history,
      pagination: {
        total: totalCount,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: skip + history.length < totalCount,
      },
    },
  });
});

/**
 * @desc    Get specific game result
 * @route   GET /api/game/result/:id
 * @access  Private
 */
const getGameResult = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const clerkUserId = req.clerkUser.id;

  const gameResult = await GameResult.findById(id);

  if (!gameResult) {
    throw new AppError('Game result not found', 404);
  }

  // Verify ownership
  if (gameResult.clerkUserId !== clerkUserId) {
    throw new AppError('Access denied to this game result', 403);
  }

  res.status(200).json({
    success: true,
    data: gameResult,
  });
});

/**
 * @desc    Get game leaderboard by game code
 * @route   GET /api/game/leaderboard/:gameCode
 * @access  Public
 */
const getGameLeaderboard = asyncHandler(async (req, res) => {
  const { gameCode } = req.params;
  const { limit = 10 } = req.query;

  const leaderboard = await GameResult.getGameLeaderboard(gameCode.toUpperCase(), parseInt(limit));

  // Enrich with user information
  const enrichedLeaderboard = await Promise.all(
    leaderboard.map(async (entry) => {
      const user = await User.findById(entry.userId).select('name school grade');
      return {
        ...entry,
        userName: user?.name || 'Unknown',
        school: user?.school,
        grade: user?.grade,
      };
    })
  );

  res.status(200).json({
    success: true,
    data: {
      gameCode,
      leaderboard: enrichedLeaderboard,
    },
  });
});

/**
 * @desc    Get user's game statistics
 * @route   GET /api/game/stats
 * @access  Private
 */
const getUserGameStats = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Get detailed stats
  const stats = await GameResult.getUserStats(user._id.toString());

  res.status(200).json({
    success: true,
    data: stats || {
      totalGames: 0,
      totalScore: 0,
      avgScore: 0,
      avgAccuracy: 0,
      totalCorrect: 0,
      totalQuestions: 0,
    },
  });
});

/**
 * @desc    Get recent games across all users
 * @route   GET /api/game/recent
 * @access  Public
 */
const getRecentGames = asyncHandler(async (req, res) => {
  const { limit = 20 } = req.query;

  const recentGames = await GameResult.find({ completed: true })
    .select('gameCode gameTitle score accuracy completedAt userId')
    .sort({ completedAt: -1 })
    .limit(parseInt(limit))
    .lean();

  // Enrich with user names
  const enrichedGames = await Promise.all(
    recentGames.map(async (game) => {
      const user = await User.findById(game.userId).select('name');
      return {
        ...game,
        userName: user?.name || 'Anonymous',
      };
    })
  );

  res.status(200).json({
    success: true,
    data: enrichedGames,
  });
});

module.exports = {
  submitGameResult,
  getGameHistory,
  getGameResult,
  getGameLeaderboard,
  getUserGameStats,
  getRecentGames,
};
