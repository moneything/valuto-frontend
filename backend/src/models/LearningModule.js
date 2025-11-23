// backend/src/models/LearningModule.js
const mongoose = require("mongoose");

const learningModuleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    // Category link
    categoryId: {
      type: String, // e.g. "saving-and-budgeting"
      required: true,
      index: true,
    },

    topic: { type: String, required: true, unique: true }, // URL slug, e.g. "budgeting-basics"

    // Lesson header UI metadata
    visual: {
      icon: String,          // "Wallet", "PiggyBank"
      iconColor: String,     // "bg-blue-500"
      badge: String,         // "Beginner Friendly"
      readTime: Number,      // minutes
    },

    // Core lesson content (multiple cards)
    contentSections: [
      {
        id: String, // unique for card
        type: {
          type: String,
          enum: [
            "header",
            "explanation",
            "example",
            "warning",
            "tip",
            "comparison",
            "list",
            "steps",
            "payslipBlock",
            "miniInfoGrid",
            "payTypesStack",
          ],
        },
        title: String,
        content: String,
        icon: String,
        colorScheme: String,
        metadata: mongoose.Schema.Types.Mixed,
      },
    ],

    // Mini quiz
    quiz: {
      questions: [
        {
          question: String,
          options: [String],
          correctAnswer: Number, // index
          explanation: String,
        },
      ],
      passingScore: Number,
    },

    // Next Steps
    relatedLessons: [
      {
        moduleId: String,
        title: String,
        relationship: {
          type: String,
          enum: ["prerequisite", "next-step", "related", "advanced"],
        },
      },
    ],

    points: { type: Number, default: 100 },
    difficultyLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    timeEstimate: { type: Number, default: 5 },

    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },

    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

learningModuleSchema.index({ categoryId: 1, order: 1 });

module.exports = mongoose.model("LearningModule", learningModuleSchema);
