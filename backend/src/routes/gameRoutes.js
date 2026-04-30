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
const { authenticateClerkUser, requireActiveSubscription } = require('../middleware/auth');
const { validateGameResult, validatePaginationParams } = require('../utils/validators');

/**
 * Game Routes
 * Handles game results, history, and leaderboards
 */

// @route   POST /api/game/result
// @desc    Submit game result
// @access  Private
router.post('/result', authenticateClerkUser, requireActiveSubscription, validateGameResult, submitGameResult);

// @route   GET /api/game/history
// @desc    Get user's game history
// @access  Private
router.get('/history', authenticateClerkUser, requireActiveSubscription, validatePaginationParams, getGameHistory);

// @route   GET /api/game/result/:id
// @desc    Get specific game result
// @access  Private
router.get('/result/:id', authenticateClerkUser, requireActiveSubscription, getGameResult);

// @route   GET /api/game/leaderboard/:gameCode
// @desc    Get game leaderboard by game code
// @access  Public
router.get('/leaderboard/:gameCode', authenticateClerkUser, requireActiveSubscription, getGameLeaderboard);

// @route   GET /api/game/stats
// @desc    Get user's game statistics
// @access  Private
router.get('/stats', authenticateClerkUser, requireActiveSubscription, getUserGameStats);

// @route   GET /api/game/recent
// @desc    Get recent games across all users
// @access  Public
router.get('/recent', authenticateClerkUser, requireActiveSubscription, getRecentGames);

module.exports = router;
