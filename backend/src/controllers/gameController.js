const GameResult = require('../models/GameResult');
const User = require('../models/User');
const Challenge = require('../models/Challenge');
const Session = require('../models/Session');
const { AppError, asyncHandler } = require('../utils/errorHandler');

async function syncDailyTriviaChallenge(user, clerkUserId) {
  const userId = user?._id?.toString?.() || user?.id?.toString?.();
  if (!userId) {
    throw new AppError('User profile not found', 404);
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay);
  endOfDay.setHours(23, 59, 59, 999);

  let triviaChallenge = await Challenge.findOne({
    userId,
    challengeType: 'daily_trivia',
    challengeDate: { $gte: startOfDay, $lte: endOfDay },
  });

  if (!triviaChallenge) {
    console.log('[Challenge] No trivia challenge found for user', userId, '— creating');
    await Challenge.createDailyChallenges(userId, clerkUserId);
    triviaChallenge = await Challenge.findOne({
      userId,
      challengeType: 'daily_trivia',
      challengeDate: { $gte: startOfDay, $lte: endOfDay },
    });
  }

  if (!triviaChallenge) {
    console.log('[Challenge] Trivia challenge missing after creation attempt', {
      userId,
    });
    return 0;
  }

  const challengeId = triviaChallenge?._id?.toString?.() || triviaChallenge?.challengeId || 'unknown';

  if (!triviaChallenge.completed) {
    const before = triviaChallenge.currentProgress;
    await triviaChallenge.updateProgress(1);
    console.log('[Challenge] Trivia progress updated', {
      userId,
      challengeId,
      before,
      after: triviaChallenge.currentProgress,
      completed: triviaChallenge.completed,
    });
  } else {
    console.log('[Challenge] Trivia challenge already completed', {
      userId,
      challengeId,
    });
  }

  if (!triviaChallenge.completed) {
    return 0;
  }

  if (typeof Challenge.findOneAndUpdate !== 'function') {
    return 0;
  }

  const rewardGrant = await Challenge.findOneAndUpdate(
    {
      _id: triviaChallenge._id,
      rewardGranted: { $ne: true },
    },
    {
      $set: {
        rewardGranted: true,
        rewardedAt: new Date(),
      },
    },
    { new: true }
  );

  if (!rewardGrant) {
    return 0;
  }

  const rewardPoints = triviaChallenge.pointsEarned * triviaChallenge.bonusMultiplier;
  user.totalPoints += rewardPoints;
  user.updateStreak();
  await user.save();
  return rewardPoints;
}

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
  const { sessionId, gameCode } = req.body;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  const sessionQuery = sessionId
    ? { sessionId }
    : { joinCode: String(gameCode || '').toUpperCase() };

  const session = await Session.findOne(sessionQuery);
  if (!session) {
    throw new AppError('Verified game session not found', 404);
  }

  const normalizedClerkUserId = String(clerkUserId);

  if (!['ended', 'archived'].includes(session.status)) {
    throw new AppError('Game session must be finished before results can be recorded', 400);
  }

  const player = session.players.find((entry) => String(entry.userId) === normalizedClerkUserId);
  if (!player || player.answeredQuestions <= 0) {
    throw new AppError('You are not eligible to submit results for this session', 403);
  }

  const normalizedGameCode = session.joinCode.toUpperCase();
  const existingResult = await GameResult.findOne({
    clerkUserId,
    gameCode: normalizedGameCode,
    completed: true,
  });

  if (existingResult) {
    return res.status(200).json({
      success: true,
      message: 'Game result already recorded',
      data: {
        gameResult: existingResult,
        updatedStats: {
          totalPoints: user.totalPoints,
          gamesPlayed: user.gamesPlayed,
        },
      },
    });
  }

  const maxPossibleScore = session.questions.reduce(
    (total, question) => total + (question.points || session.settings?.pointsPerCorrect || 100),
    0
  );
  const questionResults = player.answers.map((answer) => {
    const sessionQuestion = session.questions.find((question) => question.id === answer.questionId);
    return {
      questionId: answer.questionId,
      question: sessionQuestion?.question || '',
      selectedAnswer: answer.selectedIndex,
      correctAnswer: sessionQuestion?.correctIndex,
      isCorrect: answer.isCorrect,
      timeSpent: answer.timeSpentMs ? Math.round(answer.timeSpentMs / 1000) : undefined,
      pointsEarned: answer.pointsEarned,
    };
  });
  const timeTaken = player.answers.reduce((total, answer) => total + (answer.timeSpentMs || 0), 0);
  try {
    // Create game result
    const gameResult = await GameResult.create({
      userId: user._id.toString(),
      clerkUserId,
      sessionId: session.sessionId,
      gameCode: normalizedGameCode,
      gameTitle: session.title,
      gameType: 'trivia',
      score: player.score,
      maxPossibleScore,
      questionsAnswered: player.answeredQuestions,
      correctAnswers: player.correctAnswers,
      timeTaken: Math.round(timeTaken / 1000),
      questionResults,
      completed: true,
      completedAt: new Date(),
      metadata: {
        sessionId: session.sessionId,
        verifiedFromSession: true,
      },
    });

    // Update user stats
    user.totalPoints += player.score;
    user.gamesPlayed += 1;
    user.updateStreak();
    await user.save();

    // Update related challenges (e.g., daily trivia)
    try {
      await syncDailyTriviaChallenge(user, clerkUserId);
    } catch (err) {
      console.error('Failed to update trivia challenge progress:', err);
    }

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
  } catch (error) {
    if (error?.code === 11000 && session.sessionId) {
      const existingSessionResult = await GameResult.findOne({
        clerkUserId,
        sessionId: session.sessionId,
        completed: true,
      });

      if (existingSessionResult) {
        return res.status(200).json({
          success: true,
          message: 'Game result already recorded',
          data: {
            gameResult: existingSessionResult,
            updatedStats: {
              totalPoints: user.totalPoints,
              gamesPlayed: user.gamesPlayed,
            },
          },
        });
      }
    }

    throw error;
  }
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
