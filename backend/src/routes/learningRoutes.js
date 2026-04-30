// backend/src/routes/learningRoutes.js

const express = require('express');
const router = express.Router();

const {
  saveProgress,
  getModuleProgress,
  getAllProgress,
  updateTimeSpent,
  getModuleLeaderboard,
  getLearningStats,
} = require('../controllers/learningController');

const {
  getModules,
  getModule,
} = require('../controllers/learningModuleController');

const { authenticateClerkUser, requireActiveSubscription } = require('../middleware/auth');
const { validateLearningProgress } = require('../utils/validators');

/* ============================================================
 * Learning Module Content Routes
 * These expose read-only lesson content for subscribed users
 * ============================================================ */

// @route   GET /api/learning/modules
// @desc    Get all learning modules
// @access  Paid platform access
router.get('/modules', authenticateClerkUser, requireActiveSubscription, getModules);

// @route   GET /api/learning/modules/:id
// @desc    Get a specific learning module
// @access  Paid platform access
router.get('/modules/:id', authenticateClerkUser, requireActiveSubscription, getModule);

/* ============================================================
 * Learning Progress Routes (Single-module progress tracking)
 * New schema = 1 module = 1 progress record
 * moduleId = module.topic (string)
 * ============================================================ */

// @route   POST /api/learning/progress
// @desc    Save or update progress for a module
// @access  Private
router.post('/progress', authenticateClerkUser, requireActiveSubscription, validateLearningProgress, saveProgress);

// @route   GET /api/learning/progress/:moduleId
// @desc    Get user's progress for a specific module
// @access  Private
router.get('/progress/:moduleId', authenticateClerkUser, requireActiveSubscription, getModuleProgress);

// @route   GET /api/learning/progress
// @desc    Get all user's learning progress
// @access  Private
router.get('/progress', authenticateClerkUser, requireActiveSubscription, getAllProgress);

// @route   PUT /api/learning/time/:moduleId
// @desc    Update time spent on a module
// @access  Private
router.put('/time/:moduleId', authenticateClerkUser, requireActiveSubscription, updateTimeSpent);

// @route   GET /api/learning/leaderboard/:moduleId
// @desc    Get leaderboard for a module
// @access  Paid platform access
router.get('/leaderboard/:moduleId', authenticateClerkUser, requireActiveSubscription, getModuleLeaderboard);

// @route   GET /api/learning/stats
// @desc    Get learning statistics for the authenticated user
// @access  Private
router.get('/stats', authenticateClerkUser, requireActiveSubscription, getLearningStats);

module.exports = router;
