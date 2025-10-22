const express = require('express');
const router = express.Router();
const {
  getDailyChallenges,
  updateChallengeProgress,
  completeChallenge,
  getCompletedChallenges,
  getChallengeStats,
  createCustomChallenge,
  deleteChallenge,
} = require('../controllers/challengeController');
const { authenticateClerkUser } = require('../middleware/auth');
const { validateChallenge, validatePaginationParams } = require('../utils/validators');

/**
 * Challenge Routes
 * Handles daily challenges and special tasks
 */

// @route   GET /api/challenges/daily
// @desc    Get user's daily challenges
// @access  Private
router.get('/daily', authenticateClerkUser, getDailyChallenges);

// @route   PUT /api/challenges/:challengeId/progress
// @desc    Update challenge progress
// @access  Private
router.put('/:challengeId/progress', authenticateClerkUser, updateChallengeProgress);

// @route   PUT /api/challenges/:challengeId/complete
// @desc    Complete a challenge
// @access  Private
router.put('/:challengeId/complete', authenticateClerkUser, completeChallenge);

// @route   GET /api/challenges/completed
// @desc    Get user's completed challenges
// @access  Private
router.get('/completed', authenticateClerkUser, validatePaginationParams, getCompletedChallenges);

// @route   GET /api/challenges/stats
// @desc    Get challenge statistics
// @access  Private
router.get('/stats', authenticateClerkUser, getChallengeStats);

// @route   POST /api/challenges/create
// @desc    Create custom challenge (teacher only)
// @access  Private (Teacher)
router.post('/create', authenticateClerkUser, validateChallenge, createCustomChallenge);

// @route   DELETE /api/challenges/:challengeId
// @desc    Delete/Cancel a challenge
// @access  Private
router.delete('/:challengeId', authenticateClerkUser, deleteChallenge);

module.exports = router;
