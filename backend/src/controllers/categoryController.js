const Category = require('../models/Category');
const { AppError, asyncHandler } = require('../utils/errorHandler');

/**
 * @desc Get all categories
 * @route GET /api/categories
 * @access Public
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

/**
 * @desc Get category by ID (slug)
 * @route GET /api/categories/:id
 * @access Public
 */
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ id: req.params.id });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

module.exports = {
  getCategories,
  getCategory,
};
