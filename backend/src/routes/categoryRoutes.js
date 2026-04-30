const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategory,
} = require("../controllers/categoryController");

const { authenticateClerkUser, requireActiveSubscription } = require("../middleware/auth");

// Paid platform access
router.get("/", authenticateClerkUser, requireActiveSubscription, getCategories);
router.get("/:id", authenticateClerkUser, requireActiveSubscription, getCategory);

module.exports = router;
