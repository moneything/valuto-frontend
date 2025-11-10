const express = require('express');
const router = express.Router();
const {
  restartSession,
  createSession,
  getSessionByCode,
  getSession,
  getUserSessions,
  getSessionResults,
  getUserHistory,
  getUserTriviaStats,
  deleteSession,
} = require('../controllers/triviaController');
const { authenticateClerkUser } = require('../middleware/auth');
const { body, param } = require('express-validator');
const { handleValidationErrors } = require('../utils/validators');

/**
 * Trivia Routes
 * REST API for trivia session management
 */

// Validation middleware for session creation
const validateSessionCreation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('questions').isArray({ min: 1 }).withMessage('At least one question is required'),
  body('questions.*.question').trim().notEmpty().withMessage('Question text is required'),
  body('questions.*.options')
    .isArray({ min: 4, max: 4 })
    .withMessage('Must have exactly 4 options'),
  body('questions.*.correctAnswer')
    .isInt({ min: 0, max: 3 })
    .withMessage('Correct answer must be between 0 and 3'),
  body('questions.*.timeLimit')
    .optional()
    .isInt({ min: 10, max: 120 })
    .withMessage('Time limit must be between 10 and 120 seconds'),
  handleValidationErrors,
];


// @route   POST /api/trivia//session/:sessionId/restart
// @desc    Reset game progress and restart it
// @access  Private (Teacher)
router.post('/session/:sessionId/restart', authenticateClerkUser, restartSession);


// @route   POST /api/trivia/session
// @desc    Create new trivia session
// @access  Private (Teacher)
router.post('/session', authenticateClerkUser, validateSessionCreation, createSession);

// @route   GET /api/trivia/session/code/:joinCode
// @desc    Get session by join code
// @access  Public
router.get('/session/code/:joinCode', getSessionByCode);

// @route   GET /api/trivia/session/:sessionId
// @desc    Get session by ID
// @access  Private
router.get('/session/:sessionId', authenticateClerkUser, getSession);

// @route   GET /api/trivia/sessions
// @desc    Get all sessions for current user
// @access  Private
router.get('/sessions', authenticateClerkUser, getUserSessions);

// @route   GET /api/trivia/session/:sessionId/results
// @desc    Get session results
// @access  Private
router.get('/session/:sessionId/results', authenticateClerkUser, getSessionResults);

// @route   GET /api/trivia/history
// @desc    Get user's trivia history
// @access  Private
router.get('/history', authenticateClerkUser, getUserHistory);

// @route   GET /api/trivia/stats
// @desc    Get user's trivia statistics
// @access  Private
router.get('/stats', authenticateClerkUser, getUserTriviaStats);

// @route   DELETE /api/trivia/session/:sessionId
// @desc    Delete session
// @access  Private (Host)
router.delete('/session/:sessionId', authenticateClerkUser, deleteSession);


module.exports = router;
