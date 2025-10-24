const express = require('express');
const router = express.Router();
const {
  getNews,
  getEvents,
  getNewsAndEvents,
  createNews,
  createEvent,
} = require('../controllers/newsController');
const { authenticateClerkUser } = require('../middleware/auth');

/**
 * News and Events Routes
 * Handles financial news and networking events
 */

// @route   GET /api/news/all
// @desc    Get both news and events
// @access  Public
router.get('/all', getNewsAndEvents);

// @route   GET /api/news/news
// @desc    Get all news articles
// @access  Public
router.get('/news', getNews);

// @route   GET /api/news/events
// @desc    Get all events
// @access  Public
router.get('/events', getEvents);

// @route   POST /api/news/news
// @desc    Create a news article
// @access  Private (Admin only)
router.post('/news', authenticateClerkUser, createNews);

// @route   POST /api/news/events
// @desc    Create an event
// @access  Private (Admin only)
router.post('/events', authenticateClerkUser, createEvent);

module.exports = router;

