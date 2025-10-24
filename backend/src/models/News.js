const mongoose = require('mongoose');

/**
 * News Schema
 * Stores financial news articles
 */
const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      default: 'Financial Times',
    },
    category: {
      type: String,
      enum: ['stocks', 'crypto', 'economy', 'business', 'personal-finance', 'general'],
      default: 'general',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
newsSchema.index({ publishedAt: -1 });
newsSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('News', newsSchema);

