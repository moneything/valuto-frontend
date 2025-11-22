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

/**
 * @desc Create category (Admin only)
 * @route POST /api/categories
 * @access Private
 */
const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    message: "Category created",
    data: category,
  });
});

/**
 * @desc Update category
 * @route PUT /api/categories/:id
 * @access Private
 */
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ id: req.params.id });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  Object.assign(category, req.body);
  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated",
    data: category,
  });
});

/**
 * @desc Delete (soft delete)
 * @route DELETE /api/categories/:id
 * @access Private
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ id: req.params.id });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  category.isActive = false;
  await category.save();

  res.status(200).json({
    success: true,
    message: "Category deleted",
  });
});

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
