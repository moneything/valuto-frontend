const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { authenticateClerkUser, requireActiveSubscription } = require("../middleware/auth");

// Paid platform access
router.get("/", authenticateClerkUser, requireActiveSubscription, getCategories);
router.get("/:id", authenticateClerkUser, requireActiveSubscription, getCategory);

// Category mutations are disabled for all app users.
router.post("/", authenticateClerkUser, createCategory);
router.put("/:id", authenticateClerkUser, updateCategory);
router.delete("/:id", authenticateClerkUser, deleteCategory);

module.exports = router;
