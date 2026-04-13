// backend/src/controllers/learningModuleController.js
const LearningModule = require('../models/LearningModule');
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
  throw new AppError("Learning module creation is disabled", 403);
});

/* --------------------------------------------------------
 * UPDATE MODULE (Teacher only)
 * -------------------------------------------------------- */
const updateModule = asyncHandler(async (req, res) => {
  throw new AppError("Learning module updates are disabled", 403);
});

/* --------------------------------------------------------
 * DELETE MODULE (Soft delete)
 * -------------------------------------------------------- */
const deleteModule = asyncHandler(async (req, res) => {
  throw new AppError("Learning module deletion is disabled", 403);
});

module.exports = {
  getModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
};
