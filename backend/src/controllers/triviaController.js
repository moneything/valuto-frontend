const Session = require('../models/Session');
const SessionResult = require('../models/SessionResult');
const { AppError, asyncHandler } = require('../utils/errorHandler');

/**
 * Trivia REST API Controller
 * Handles non-realtime trivia operations
 */

/**
 * @desc    Create trivia session via REST
 * @route   POST /api/trivia/session
 * @access  Private (Teacher only)
 */
const createSession = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { title, questions, settings } = req.body;

  // Get or create user
  const User = require('../models/User');
  let user = await User.findOne({ clerkUserId });

  if (!user) {
    // Fetch full user data from Clerk
    const { clerkClient } = require('@clerk/clerk-sdk-node');
    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    
    // Auto-create user with teacher role (can be updated via onboarding)
    user = await User.create({
      clerkUserId,
      name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
      email: clerkUser.emailAddresses[0]?.emailAddress || `user_${clerkUserId}@placeholder.com`,
      role: 'teacher', // Default to teacher since they're creating a game
      completedOnboarding: false,
    });
  }

  // Verify user is a teacher
  if (user.role !== 'teacher') {
    throw new AppError('Only teachers can create trivia sessions', 403);
  }

  // Generate unique join code
  const joinCode = await Session.generateJoinCode();

  // Generate session ID
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Create session
  const session = await Session.create({
    sessionId,
    joinCode,
    title,
    hostId: clerkUserId,
    hostName: user.name,
    status: 'waiting',
    questions: questions.map((q, index) => ({
      id: `q${index + 1}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctAnswer,
      timeLimit: q.timeLimit || 30,
      points: 100,
      explanation: q.explanation,
    })),
    players: [],
    settings: settings || {},
  });

  res.status(201).json({
    success: true,
    message: 'Trivia session created successfully',
    data: {
      sessionId: session.sessionId,
      joinCode: session.joinCode,
      title: session.title,
      questionCount: session.questions.length,
    },
  });
});

/**
 * @desc    Get session by join code
 * @route   GET /api/trivia/session/code/:joinCode
 * @access  Public
 */
const getSessionByCode = asyncHandler(async (req, res) => {
  const { joinCode } = req.params;

  const session = await Session.findOne({ joinCode: joinCode.toUpperCase() })
    .select('-questions.correctIndex -questions.explanation') // Hide answers
    .lean();

  if (!session) {
    throw new AppError('Session not found', 404);
  }

  res.status(200).json({
    success: true,
    data: {
      sessionId: session.sessionId,
      title: session.title,
      status: session.status,
      hostName: session.hostName,
      playerCount: session.players.length,
      questionCount: session.questions.length,
    },
  });
});

/**
 * @desc    Get session by ID
 * @route   GET /api/trivia/session/:sessionId
 * @access  Private
 */
const getSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const clerkUserId = req.clerkUser.id;

  const session = await Session.findOne({ sessionId });

  if (!session) {
    throw new AppError('Session not found', 404);
  }

  // Check if user is host or player
  const isHost = session.hostId === clerkUserId;
  const isPlayer = session.players.some((p) => p.userId === clerkUserId);

  if (!isHost && !isPlayer) {
    throw new AppError('Access denied to this session', 403);
  }

  // If not host, hide correct answers
  const sessionData = session.toObject();
  if (!isHost) {
    sessionData.questions = sessionData.questions.map((q) => ({
      ...q,
      correctIndex: undefined,
      explanation: undefined,
    }));
  }

  res.status(200).json({
    success: true,
    data: sessionData,
  });
});

/**
 * @desc    Get all sessions for current user
 * @route   GET /api/trivia/sessions
 * @access  Private
 */
const getUserSessions = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { status } = req.query;

  const User = require('../models/User');
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  let query = {};

  if (user.role === 'teacher') {
    // Get sessions created by this teacher
    query.hostId = clerkUserId;
  } else {
    // Get sessions this student participated in
    query['players.userId'] = clerkUserId;
  }

  if (status) {
    query.status = status;
  }

  const sessions = await Session.find(query)
    .select('sessionId joinCode title hostName status players.length createdAt startedAt endedAt')
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  res.status(200).json({
    success: true,
    data: sessions.map((s) => ({
      sessionId: s.sessionId,
      joinCode: s.joinCode,
      title: s.title,
      hostName: s.hostName,
      status: s.status,
      playerCount: s.players ? s.players.length : 0,
      createdAt: s.createdAt,
      startedAt: s.startedAt,
      endedAt: s.endedAt,
    })),
  });
});

/**
 * @desc    Get session results
 * @route   GET /api/trivia/session/:sessionId/results
 * @access  Private (Host or participant)
 */
const getSessionResults = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const clerkUserId = req.clerkUser.id;

  // Get session
  const session = await Session.findOne({ sessionId });

  if (!session) {
    throw new AppError('Session not found', 404);
  }

  // Check access
  const isHost = session.hostId === clerkUserId;
  const isPlayer = session.players.some((p) => p.userId === clerkUserId);

  if (!isHost && !isPlayer) {
    throw new AppError('Access denied to these results', 403);
  }

  // Get results
  const results = await SessionResult.getSessionResults(sessionId);

  if (!results) {
    throw new AppError('Results not found. Game may not be finished yet.', 404);
  }

  // If player, only return their own detailed results
  if (!isHost) {
    const playerResult = results.results.find((r) => r.userId === clerkUserId);

    return res.status(200).json({
      success: true,
      data: {
        sessionId: results.sessionId,
        sessionTitle: results.sessionTitle,
        playerResult,
        leaderboard: results.results.map((r) => ({
          rank: r.rank,
          userName: r.userName,
          score: r.score,
          accuracy: r.accuracy,
        })),
      },
    });
  }

  // Host gets full results
  res.status(200).json({
    success: true,
    data: results,
  });
});

/**
 * @desc    Get user's trivia history
 * @route   GET /api/trivia/history
 * @access  Private
 */
const getUserHistory = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { limit = 10, skip = 0 } = req.query;

  const history = await SessionResult.getUserHistory(clerkUserId, {
    limit: parseInt(limit),
    skip: parseInt(skip),
  });

  const total = await SessionResult.countDocuments({ userId: clerkUserId });

  res.status(200).json({
    success: true,
    data: {
      history,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: skip + history.length < total,
      },
    },
  });
});

/**
 * @desc    Get user's trivia statistics
 * @route   GET /api/trivia/stats
 * @access  Private
 */
const getUserTriviaStats = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  const stats = await SessionResult.getUserStats(clerkUserId);

  res.status(200).json({
    success: true,
    data: stats,
  });
});

/**
 * @desc    Delete session
 * @route   DELETE /api/trivia/session/:sessionId
 * @access  Private (Host only)
 */
const deleteSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const clerkUserId = req.clerkUser.id;

  const session = await Session.findOne({ sessionId });

  if (!session) {
    throw new AppError('Session not found', 404);
  }

  // Only host can delete
  if (session.hostId !== clerkUserId) {
    throw new AppError('Only the host can delete this session', 403);
  }

  // Can only delete if not active
  if (session.status === 'active') {
    throw new AppError('Cannot delete active session', 400);
  }

  await Session.deleteOne({ sessionId });

  res.status(200).json({
    success: true,
    message: 'Session deleted successfully',
  });
});

module.exports = {
  createSession,
  getSessionByCode,
  getSession,
  getUserSessions,
  getSessionResults,
  getUserHistory,
  getUserTriviaStats,
  deleteSession,
};
