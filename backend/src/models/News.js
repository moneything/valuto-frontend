const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
      trim: true,
    },

    summary: {
      type: [String], // <-- array of bullet points
      required: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    sourceUrl: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Bills",
        "Benefits",
        "Jobs",
        "Savings",
        "Investing",
        "Property",
        "Scams",
        "All",
      ],
      required: true,
    },

    badge: {
      type: String,
      enum: ["Explainer", "Alert", "Saving Tip"],
      default: null,
    },

    publishedAt: {
      type: Date,
      required: true,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    // Admin-specific control (optional)
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("News", NewsSchema);
