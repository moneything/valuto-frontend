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
  createModule,
  updateModule,
  deleteModule,
} = require('../controllers/learningModuleController');

const { authenticateClerkUser, optionalAuth } = require('../middleware/auth');
const { validateLearningProgress } = require('../utils/validators');

/* ============================================================
 * Learning Module Content Routes
 * These handle CRUD operations for the actual lesson content
 * ============================================================ */

// @route   GET /api/learning/modules
// @desc    Get all learning modules
// @access  Public
router.get('/modules', getModules);

// @route   GET /api/learning/modules/:id
// @desc    Get a specific learning module
// @access  Public
router.get('/modules/:id', getModule);

// @route   POST /api/learning/modules
// @desc    Create a new learning module
// @access  Private (Teacher only)
router.post('/modules', authenticateClerkUser, createModule);

// @route   PUT /api/learning/modules/:id
// @desc    Update a learning module
// @access  Private (Teacher only)
router.put('/modules/:id', authenticateClerkUser, updateModule);

// @route   DELETE /api/learning/modules/:id
// @desc    Delete a learning module
// @access  Private (Teacher only)
router.delete('/modules/:id', authenticateClerkUser, deleteModule);

/* ============================================================
 * Learning Progress Routes (Single-module progress tracking)
 * New schema = 1 module = 1 progress record
 * moduleId = module.topic (string)
 * ============================================================ */

// @route   POST /api/learning/progress
// @desc    Save or update progress for a module
// @access  Private
router.post('/progress', (req, res, next) => {
  console.log("🚨 ROUTE HIT BEFORE VALIDATOR");
  console.log("🧪 RAW BODY RECEIVED BY BACKEND:");
  console.log(req.body);
  next();
}, authenticateClerkUser, validateLearningProgress, saveProgress);

// @route   GET /api/learning/progress/:moduleId
// @desc    Get user's progress for a specific module
// @access  Private
router.get('/progress/:moduleId', authenticateClerkUser, getModuleProgress);

// @route   GET /api/learning/progress
// @desc    Get all user's learning progress
// @access  Private
router.get('/progress', authenticateClerkUser, getAllProgress);

// @route   PUT /api/learning/time/:moduleId
// @desc    Update time spent on a module
// @access  Private
router.put('/time/:moduleId', authenticateClerkUser, updateTimeSpent);

// @route   GET /api/learning/leaderboard/:moduleId
// @desc    Get leaderboard for a module
// @access  Public (auth optional)
router.get('/leaderboard/:moduleId', optionalAuth, getModuleLeaderboard);

// @route   GET /api/learning/stats
// @desc    Get learning statistics for the authenticated user
// @access  Private
router.get('/stats', authenticateClerkUser, getLearningStats);

module.exports = router;
