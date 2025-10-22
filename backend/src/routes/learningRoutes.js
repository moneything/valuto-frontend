const express = require('express');
const router = express.Router();
const {
  saveProgress,
  getModuleProgress,
  getAllProgress,
  markLessonCompleted,
  updateTimeSpent,
  getModuleLeaderboard,
  getLearningStats,
} = require('../controllers/learningController');
const { authenticateClerkUser, optionalAuth } = require('../middleware/auth');
const { validateLearningProgress } = require('../utils/validators');

/**
 * Learning Progress Routes
 * Handles learning module and lesson progress tracking
 */

// @route   POST /api/learning/progress
// @desc    Save or update learning progress
// @access  Private
router.post('/progress', authenticateClerkUser, validateLearningProgress, saveProgress);

// @route   GET /api/learning/progress/:moduleId
// @desc    Get user's progress for a specific module
// @access  Private
router.get('/progress/:moduleId', authenticateClerkUser, getModuleProgress);

// @route   GET /api/learning/progress
// @desc    Get all user's learning progress
// @access  Private
router.get('/progress', authenticateClerkUser, getAllProgress);

// @route   PUT /api/learning/complete/:moduleId/:lessonId
// @desc    Mark lesson as completed
// @access  Private
router.put('/complete/:moduleId/:lessonId', authenticateClerkUser, markLessonCompleted);

// @route   PUT /api/learning/time/:moduleId/:lessonId
// @desc    Update time spent on lesson
// @access  Private
router.put('/time/:moduleId/:lessonId', authenticateClerkUser, updateTimeSpent);

// @route   GET /api/learning/leaderboard/:moduleId
// @desc    Get module leaderboard
// @access  Public
router.get('/leaderboard/:moduleId', optionalAuth, getModuleLeaderboard);

// @route   GET /api/learning/stats
// @desc    Get learning statistics
// @access  Private
router.get('/stats', authenticateClerkUser, getLearningStats);

module.exports = router;
