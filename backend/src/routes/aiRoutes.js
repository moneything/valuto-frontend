const express = require('express');
const router = express.Router();
const { chatWithGemini } = require('../controllers/aiController');
const { authenticateClerkUser, requireActiveSubscription } = require('../middleware/auth');

/**
 * AI Routes
 * All routes require Clerk authentication
 */

// @route   POST /api/ai/chat
// @desc    Chat with Gemini
// @access  Private
router.post('/chat', authenticateClerkUser, requireActiveSubscription, chatWithGemini);

module.exports = router;
