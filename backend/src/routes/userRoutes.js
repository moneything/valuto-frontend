const express = require('express');
const router = express.Router();
const {
  createOrUpdateUser,
  getUserProfile,
  updateUserProfile,
  getUserStats,
  addPoints,
  incrementGameCount,
  incrementLessonCount,
  addAchievement,
  deleteUser,
} = require('../controllers/userController');
const { authenticateClerkUser } = require('../middleware/auth');
const { validateUserCreation, validateUserUpdate } = require('../utils/validators');

/**
 * User Routes
 * All routes are protected with Clerk authentication
 */

// @route   POST /api/user
// @desc    Create or update user profile
// @access  Private
router.post('/', authenticateClerkUser, validateUserCreation, createOrUpdateUser);

// @route   GET /api/user
// @desc    Get current user profile
// @access  Private
router.get('/', authenticateClerkUser, getUserProfile);

// @route   PUT /api/user
// @desc    Update user profile
// @access  Private
router.put('/', authenticateClerkUser, validateUserUpdate, updateUserProfile);

// @route   GET /api/user/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', authenticateClerkUser, getUserStats);

// @route   POST /api/user/points
// @desc    Add points to user
// @access  Private
router.post('/points', authenticateClerkUser, addPoints);

// @route   POST /api/user/game-played
// @desc    Increment user's game count
// @access  Private
router.post('/game-played', authenticateClerkUser, incrementGameCount);

// @route   POST /api/user/lesson-completed
// @desc    Increment user's lesson count
// @access  Private
router.post('/lesson-completed', authenticateClerkUser, incrementLessonCount);

// @route   POST /api/user/achievement
// @desc    Add achievement to user
// @access  Private
router.post('/achievement', authenticateClerkUser, addAchievement);

// @route   DELETE /api/user
// @desc    Delete user account (soft delete)
// @access  Private
router.delete('/', authenticateClerkUser, deleteUser);

module.exports = router;
