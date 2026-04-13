const User = require('../models/User');
const { asyncHandler } = require('../utils/errorHandler');

/**
 * Leaderboard Controller
 * Handles global and filtered leaderboard operations
 */

/**
 * @desc    Get global leaderboard
 * @route   GET /api/leaderboard
 * @access  Public
 */
const getGlobalLeaderboard = asyncHandler(async (req, res) => {
  const { limit = 100, school } = req.query;

  const leaderboard = await User.getLeaderboard({
    limit: parseInt(limit),
    school,
  });

  // Add rankings
  const rankedLeaderboard = leaderboard.map((user, index) => ({
    rank: index + 1,
    ...user,
  }));

  res.status(200).json({
    success: true,
    data: {
      leaderboard: rankedLeaderboard,
      filters: {
        school: school || 'all',
        limit: parseInt(limit),
      },
    },
  });
});

/**
 * @desc    Get user's leaderboard rank
 * @route   GET /api/leaderboard/rank
 * @access  Private
 */
const getUserRank = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  // Get current user
  const currentUser = await User.findOne({ clerkUserId });

  if (!currentUser) {
    return res.status(404).json({
      success: false,
      message: 'User profile not found',
    });
  }

  // Calculate global rank
  const usersAbove = await User.countDocuments({
    isActive: true,
    totalPoints: { $gt: currentUser.totalPoints },
  });

  const globalRank = usersAbove + 1;

  // Calculate school rank if applicable
  let schoolRank = null;
  if (currentUser.school) {
    const schoolUsersAbove = await User.countDocuments({
      school: currentUser.school,
      isActive: true,
      totalPoints: { $gt: currentUser.totalPoints },
    });
    schoolRank = schoolUsersAbove + 1;
  }

  // Get total users for context
  const totalUsers = await User.countDocuments({
    isActive: true,
  });

  res.status(200).json({
    success: true,
    data: {
      globalRank,
      schoolRank,
      totalUsers,
      totalPoints: currentUser.totalPoints,
      school: currentUser.school,
      percentile: Math.round(((totalUsers - globalRank) / totalUsers) * 100),
    },
  });
});

/**
 * @desc    Get school leaderboard
 * @route   GET /api/leaderboard/school/:schoolName
 * @access  Public
 */
const getSchoolLeaderboard = asyncHandler(async (req, res) => {
  const { schoolName } = req.params;
  const { limit = 50 } = req.query;

  const leaderboard = await User.getLeaderboard({
    limit: parseInt(limit),
    school: schoolName,
  });

  const rankedLeaderboard = leaderboard.map((user, index) => ({
    rank: index + 1,
    ...user,
  }));

  res.status(200).json({
    success: true,
    data: {
      school: schoolName,
      leaderboard: rankedLeaderboard,
    },
  });
});

/**
 * @desc    Get top performers (hall of fame)
 * @route   GET /api/leaderboard/top
 * @access  Public
 */
const getTopPerformers = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const topPerformers = await User.find({ isActive: true })
    .select('name title role school totalPoints gamesPlayed lessonsCompleted currentStreak')
    .sort({ totalPoints: -1 })
    .limit(parseInt(limit))
    .lean();

  const rankedPerformers = topPerformers.map((user, index) => ({
    rank: index + 1,
    ...user,
  }));

  res.status(200).json({
    success: true,
    data: rankedPerformers,
  });
});

/**
 * @desc    Get leaderboard with user context
 * @route   GET /api/leaderboard/with-context
 * @access  Private
 */
const getLeaderboardWithContext = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { limit = 50 } = req.query;

  // Get current user
  const currentUser = await User.findOne({ clerkUserId });

  if (!currentUser) {
    return res.status(404).json({
      success: false,
      message: 'User profile not found',
    });
  }

  // Get leaderboard
  const leaderboard = await User.getLeaderboard({
    limit: parseInt(limit),
    school: null, // Global leaderboard
  });

  // Calculate user's rank
  const usersAbove = await User.countDocuments({
    isActive: true,
    totalPoints: { $gt: currentUser.totalPoints },
  });

  const userRank = usersAbove + 1;

  // Add rankings
  const rankedLeaderboard = leaderboard.map((user, index) => ({
    rank: index + 1,
    isCurrentUser: user._id.toString() === currentUser._id.toString(),
    ...user,
  }));

  res.status(200).json({
    success: true,
    data: {
      leaderboard: rankedLeaderboard,
      currentUser: {
        rank: userRank,
        name: currentUser.name,
        totalPoints: currentUser.totalPoints,
        gamesPlayed: currentUser.gamesPlayed,
        lessonsCompleted: currentUser.lessonsCompleted,
      },
    },
  });
});

/**
 * @desc    Get leaderboard statistics
 * @route   GET /api/leaderboard/stats
 * @access  Public
 */
const getLeaderboardStats = asyncHandler(async (req, res) => {
  const [totals, userStats] = await Promise.all([
    User.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
        },
      },
    ]),
    User.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalPoints: { $sum: '$totalPoints' },
          avgPoints: { $avg: '$totalPoints' },
          totalGamesPlayed: { $sum: '$gamesPlayed' },
          avgGamesPlayed: { $avg: '$gamesPlayed' },
          totalLessonsCompleted: { $sum: '$lessonsCompleted' },
        },
      },
    ]),
  ]);

  const totalResult = totals[0] || null;
  const userResult = userStats[0] || null;

  res.status(200).json({
    success: true,
    data: {
      totalUsers: totalResult?.totalUsers || 0,
      totalStudents: totalResult?.totalUsers || 0,
      totalTeachers: 0,
      totalPoints: userResult?.totalPoints || 0,
      avgPoints: userResult?.avgPoints || 0,
      totalGamesPlayed: userResult?.totalGamesPlayed || 0,
      avgGamesPlayed: userResult?.avgGamesPlayed || 0,
      totalLessonsCompleted: userResult?.totalLessonsCompleted || 0,
    },
  });
});

module.exports = {
  getGlobalLeaderboard,
  getUserRank,
  getSchoolLeaderboard,
  getTopPerformers,
  getLeaderboardWithContext,
  getLeaderboardStats,
};
