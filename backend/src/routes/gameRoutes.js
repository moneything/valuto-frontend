const express = require('express');
const router = express.Router();
const {
  submitGameResult,
  getGameHistory,
  getGameResult,
  getGameLeaderboard,
  getUserGameStats,
  getRecentGames,
} = require('../controllers/gameController');
const { authenticateClerkUser, optionalAuth } = require('../middleware/auth');
const { validateGameResult, validatePaginationParams } = require('../utils/validators');

/**
 * Game Routes
 * Handles game results, history, and leaderboards
 */

// @route   POST /api/game/result
// @desc    Submit game result
// @access  Private
router.post('/result', authenticateClerkUser, validateGameResult, submitGameResult);

// @route   GET /api/game/history
// @desc    Get user's game history
// @access  Private
router.get('/history', authenticateClerkUser, validatePaginationParams, getGameHistory);

// @route   GET /api/game/result/:id
// @desc    Get specific game result
// @access  Private
router.get('/result/:id', authenticateClerkUser, getGameResult);

// @route   GET /api/game/leaderboard/:gameCode
// @desc    Get game leaderboard by game code
// @access  Public
router.get('/leaderboard/:gameCode', optionalAuth, getGameLeaderboard);

// @route   GET /api/game/stats
// @desc    Get user's game statistics
// @access  Private
router.get('/stats', authenticateClerkUser, getUserGameStats);

// @route   GET /api/game/recent
// @desc    Get recent games across all users
// @access  Public
router.get('/recent', optionalAuth, getRecentGames);

module.exports = router;
