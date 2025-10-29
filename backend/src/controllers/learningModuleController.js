const LearningModule = require('../models/LearningModule');
const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

/**
 * Learning Module Controller
 * Handles CRUD operations for learning modules
 */

/**
 * @desc    Get all learning modules
 * @route   GET /api/learning/modules
 * @access  Public
 */
const getModules = asyncHandler(async (req, res) => {
  const { topic, difficulty, activityType } = req.query;

  const filters = {};
  if (topic) filters.topic = topic;
  if (difficulty) filters.difficulty = difficulty;
  if (activityType) filters.activityType = activityType;

  const modules = await LearningModule.getModules(filters);
  
  // Transform _id to id for each module and convert ObjectId to string
  const transformedModules = modules.map(module => ({
    ...module,
    id: module._id.toString(),
    _id: undefined
  }));

  res.status(200).json({
    success: true,
    count: transformedModules.length,
    data: transformedModules,
  });
});

/**
 * @desc    Get a specific learning module
 * @route   GET /api/learning/modules/:id
 * @access  Public
 */
const getModule = asyncHandler(async (req, res) => {
  const module = await LearningModule.findById(req.params.id);

  if (!module) {
    throw new AppError('Learning module not found', 404);
  }

  if (!module.isActive) {
    throw new AppError('This module is currently inactive', 403);
  }

  // Transform _id to id and convert ObjectId to string
  const moduleData = module.toObject ? module.toObject() : module;
  moduleData.id = moduleData._id.toString();
  delete moduleData._id;

  res.status(200).json({
    success: true,
    data: moduleData,
  });
});

/**
 * @desc    Create a new learning module
 * @route   POST /api/learning/modules
 * @access  Private (Teacher/Admin only)
 */
const createModule = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  // Get user to verify they're a teacher
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  if (user.role !== 'teacher') {
    throw new AppError('Only teachers can create learning modules', 403);
  }

  const moduleData = {
    ...req.body,
    createdBy: clerkUserId,
  };

  const module = await LearningModule.create(moduleData);

  res.status(201).json({
    success: true,
    message: 'Learning module created successfully',
    data: module,
  });
});

/**
 * @desc    Update a learning module
 * @route   PUT /api/learning/modules/:id
 * @access  Private (Teacher/Admin only)
 */
const updateModule = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  // Get user to verify they're a teacher
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  if (user.role !== 'teacher') {
    throw new AppError('Only teachers can update learning modules', 403);
  }

  const module = await LearningModule.findById(req.params.id);

  if (!module) {
    throw new AppError('Learning module not found', 404);
  }

  // Check if user is the creator
  if (module.createdBy !== clerkUserId && user.role !== 'admin') {
    throw new AppError('You can only update modules you created', 403);
  }

  // Update fields
  Object.keys(req.body).forEach((key) => {
    module[key] = req.body[key];
  });

  await module.save();

  res.status(200).json({
    success: true,
    message: 'Learning module updated successfully',
    data: module,
  });
});

/**
 * @desc    Delete a learning module
 * @route   DELETE /api/learning/modules/:id
 * @access  Private (Teacher/Admin only)
 */
const deleteModule = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  // Get user to verify they're a teacher
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  if (user.role !== 'teacher') {
    throw new AppError('Only teachers can delete learning modules', 403);
  }

  const module = await LearningModule.findById(req.params.id);

  if (!module) {
    throw new AppError('Learning module not found', 404);
  }

  // Check if user is the creator
  if (module.createdBy !== clerkUserId && user.role !== 'admin') {
    throw new AppError('You can only delete modules you created', 403);
  }

  // Soft delete (mark as inactive)
  module.isActive = false;
  await module.save();

  res.status(200).json({
    success: true,
    message: 'Learning module deleted successfully',
  });
});

module.exports = {
  getModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
};

