const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { authenticateClerkUser, optionalAuth } = require("../middleware/auth");

// Public
router.get("/", optionalAuth, getCategories);
router.get("/:id", optionalAuth, getCategory);

// Protected (Admin/Teacher ideally — add role check later)
router.post("/", authenticateClerkUser, createCategory);
router.put("/:id", authenticateClerkUser, updateCategory);
router.delete("/:id", authenticateClerkUser, deleteCategory);

module.exports = router;
