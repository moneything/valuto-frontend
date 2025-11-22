// backend/src/models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true, // lucide icon name (e.g., "Wallet", "TrendingUp")
    },
    color: {
      type: String,
      required: true, // e.g., "bg-blue-500", "bg-green-500"
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
