const express = require('express');
const router = express.Router();
const {
  getGlobalLeaderboard,
  getUserRank,
  getSchoolLeaderboard,
  getTopPerformers,
  getLeaderboardWithContext,
  getLeaderboardStats,
} = require('../controllers/leaderboardController');
const { authenticateClerkUser, optionalAuth } = require('../middleware/auth');
const { validateLeaderboardParams } = require('../utils/validators');

/**
 * Leaderboard Routes
 * Handles global and filtered leaderboard queries
 */

// @route   GET /api/leaderboard
// @desc    Get global leaderboard
// @access  Public
router.get('/', optionalAuth, validateLeaderboardParams, getGlobalLeaderboard);

// @route   GET /api/leaderboard/rank
// @desc    Get user's leaderboard rank
// @access  Private
router.get('/rank', authenticateClerkUser, getUserRank);

// @route   GET /api/leaderboard/school/:schoolName
// @desc    Get school leaderboard
// @access  Public
router.get('/school/:schoolName', optionalAuth, getSchoolLeaderboard);

// @route   GET /api/leaderboard/top
// @desc    Get top performers (hall of fame)
// @access  Public
router.get('/top', optionalAuth, getTopPerformers);

// @route   GET /api/leaderboard/with-context
// @desc    Get leaderboard with user context
// @access  Private
router.get('/with-context', authenticateClerkUser, getLeaderboardWithContext);

// @route   GET /api/leaderboard/stats
// @desc    Get leaderboard statistics
// @access  Public
router.get('/stats', optionalAuth, getLeaderboardStats);

module.exports = router;
