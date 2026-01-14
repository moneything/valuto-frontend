const express = require('express');
const router = express.Router();
const { chatWithGemini } = require('../controllers/aiController');
const { authenticateClerkUser } = require('../middleware/auth');

/**
 * AI Routes
 * All routes require Clerk authentication
 */

// @route   POST /api/ai/chat
// @desc    Chat with Gemini
// @access  Private
router.post('/chat', authenticateClerkUser, chatWithGemini);

module.exports = router;
