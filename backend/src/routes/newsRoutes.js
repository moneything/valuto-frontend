const express = require('express');
const router = express.Router();
const {
  getNews,
  getEvents,
  getNewsAndEvents,
} = require('../controllers/newsController');
const { authenticateClerkUser, requireActiveSubscription } = require('../middleware/auth');

/**
 * News and Events Routes
 * Handles financial news and networking events
 */

// @route   GET /api/news/all
// @desc    Get both news and events
// @access  Paid platform access
router.get('/all', authenticateClerkUser, requireActiveSubscription, getNewsAndEvents);

// @route   GET /api/news/news
// @desc    Get all news articles
// @access  Paid platform access
router.get('/news', authenticateClerkUser, requireActiveSubscription, getNews);

// @route   GET /api/news/events
// @desc    Get all events
// @access  Paid platform access
router.get('/events', authenticateClerkUser, requireActiveSubscription, getEvents);

module.exports = router;
