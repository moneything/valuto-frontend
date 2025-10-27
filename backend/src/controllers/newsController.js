const News = require('../models/News');
const Event = require('../models/Event');
const { AppError, asyncHandler } = require('../utils/errorHandler');

/**
 * News Controller
 * Handles financial news and networking events
 */

/**
 * @desc    Get all news articles
 * @route   GET /api/news/news
 * @access  Public
 */
const getNews = asyncHandler(async (req, res) => {
  const { limit = 10, category } = req.query;

  const filter = { isActive: true };
  if (category) {
    filter.category = category;
  }

  const news = await News.find(filter)
    .sort({ publishedAt: -1 })
    .limit(parseInt(limit))
    .lean();

  // Format dates and map fields for frontend
  const formattedNews = news.map(item => ({
    ...item,
    time: item.publishedAt ? new Date(item.publishedAt).toISOString() : null,
    publishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString() : null,
    createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
    updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString() : null,
  }));

  res.status(200).json({
    success: true,
    count: formattedNews.length,
    data: formattedNews,
  });
});

/**
 * @desc    Get all events
 * @route   GET /api/news/events
 * @access  Public
 */
const getEvents = asyncHandler(async (req, res) => {
  const { limit = 10, category } = req.query;

  const filter = { isActive: true };
  if (category) {
    filter.category = category;
  }

  const events = await Event.find(filter)
    .sort({ eventDate: 1 })
    .limit(parseInt(limit))
    .lean();

  // Format dates and map fields for frontend
  const formattedEvents = events.map(item => ({
    ...item,
    date: item.eventDate ? new Date(item.eventDate).toISOString() : null,
    eventDate: item.eventDate ? new Date(item.eventDate).toISOString() : null,
    createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
    updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString() : null,
  }));

  res.status(200).json({
    success: true,
    count: formattedEvents.length,
    data: formattedEvents,
  });
});

/**
 * @desc    Get both news and events
 * @route   GET /api/news/all
 * @access  Public
 */
const getNewsAndEvents = asyncHandler(async (req, res) => {
  const { newsLimit = 5, eventsLimit = 5 } = req.query;

  const [news, events] = await Promise.all([
    News.find({ isActive: true })
      .sort({ publishedAt: -1 })
      .limit(parseInt(newsLimit))
      .lean(),
    Event.find({ isActive: true })
      .sort({ eventDate: 1 })
      .limit(parseInt(eventsLimit))
      .lean(),
  ]);

  // Format dates and map fields for frontend
  const formattedNews = news.map(item => ({
    ...item,
    time: item.publishedAt ? new Date(item.publishedAt).toISOString() : null,
    publishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString() : null,
    createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
    updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString() : null,
  }));

  const formattedEvents = events.map(item => ({
    ...item,
    date: item.eventDate ? new Date(item.eventDate).toISOString() : null,
    eventDate: item.eventDate ? new Date(item.eventDate).toISOString() : null,
    createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
    updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString() : null,
  }));

  res.status(200).json({
    success: true,
    data: {
      news: formattedNews,
      events: formattedEvents,
    },
  });
});

/**
 * @desc    Create a news article
 * @route   POST /api/news/news
 * @access  Private (Admin only)
 */
const createNews = asyncHandler(async (req, res) => {
  const newsData = {
    ...req.body,
  };

  const news = await News.create(newsData);

  res.status(201).json({
    success: true,
    message: 'News article created successfully',
    data: news,
  });
});

/**
 * @desc    Create an event
 * @route   POST /api/news/events
 * @access  Private (Admin only)
 */
const createEvent = asyncHandler(async (req, res) => {
  const eventData = {
    ...req.body,
  };

  const event = await Event.create(eventData);

  res.status(201).json({
    success: true,
    message: 'Event created successfully',
    data: event,
  });
});

module.exports = {
  getNews,
  getEvents,
  getNewsAndEvents,
  createNews,
  createEvent,
};

