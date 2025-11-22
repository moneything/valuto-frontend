// backend/src/controllers/learningModuleController.js
const LearningModule = require('../models/LearningModule');
const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

/**
 * Learning Module Controller — NEW SCHEMA VERSION
 * Uses topic slug as moduleId.
 */

/* --------------------------------------------------------
 * GET ALL MODULES
 * GET /api/learning/modules
 * -------------------------------------------------------- */
const getModules = asyncHandler(async (req, res) => {
  const { topic, difficultyLevel, categoryId } = req.query;

  const filters = {};

  if (topic) filters.topic = topic;
  if (difficultyLevel) filters.difficultyLevel = difficultyLevel;
  if (categoryId) filters.categoryId = categoryId;

  const modules = await LearningModule.find(filters).lean();

  const transformed = modules.map(m => ({
    ...m,
    id: m._id.toString(),
  }));

  res.status(200).json({
    success: true,
    count: transformed.length,
    data: transformed,
  });
});

/* --------------------------------------------------------
 * GET SPECIFIC MODULE (by topic slug)
 * GET /api/learning/modules/:topic
 * -------------------------------------------------------- */
const getModule = asyncHandler(async (req, res) => {
  const topic = req.params.id; // frontend passes /modules/:topic

  const module = await LearningModule.findOne({ topic }).lean();

  if (!module) throw new AppError("Module not found", 404);
  if (!module.isActive) throw new AppError("Module is inactive", 403);

  return res.status(200).json({
    success: true,
    data: {
      ...module,
      id: module._id.toString(),
    }
  });
});

/* --------------------------------------------------------
 * CREATE MODULE (Teacher only)
 * -------------------------------------------------------- */
const createModule = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const user = await User.findOne({ clerkUserId });

  if (!user) throw new AppError("User not found", 404);
  if (user.role !== "teacher" && user.role !== "admin") {
    throw new AppError("Only teachers can create modules", 403);
  }

  const moduleData = {
    ...req.body,
    createdBy: clerkUserId,
  };

  const module = await LearningModule.create(moduleData);

  res.status(201).json({
    success: true,
    message: "Module created",
    data: module,
  });
});

/* --------------------------------------------------------
 * UPDATE MODULE (Teacher only)
 * -------------------------------------------------------- */
const updateModule = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const user = await User.findOne({ clerkUserId });

  if (!user) throw new AppError("User not found", 404);
  if (user.role !== "teacher" && user.role !== "admin") {
    throw new AppError("Only teachers can update modules", 403);
  }

  const module = await LearningModule.findById(req.params.id);

  if (!module) throw new AppError("Module not found", 404);

  // Only creator or admin
  if (module.createdBy !== clerkUserId && user.role !== "admin") {
    throw new AppError("You can only update modules you created", 403);
  }

  Object.assign(module, req.body);
  await module.save();

  res.status(200).json({
    success: true,
    message: "Module updated",
    data: module,
  });
});

/* --------------------------------------------------------
 * DELETE MODULE (Soft delete)
 * -------------------------------------------------------- */
const deleteModule = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const user = await User.findOne({ clerkUserId });

  if (!user) throw new AppError("User not found", 404);
  if (user.role !== "teacher" && user.role !== "admin") {
    throw new AppError("Only teachers can delete modules", 403);
  }

  const module = await LearningModule.findById(req.params.id);

  if (!module) throw new AppError("Module not found", 404);

  // Only creator or admin
  if (module.createdBy !== clerkUserId && user.role !== "admin") {
    throw new AppError("You can only delete modules you created", 403);
  }

  module.isActive = false;
  await module.save();

  res.status(200).json({
    success: true,
    message: "Module deleted",
  });
});

module.exports = {
  getModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
};
