const mongoose = require("mongoose");

const learningModuleSchema = new mongoose.Schema(
  {
    // Basic Info
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    // Category (Learn Hub)
    category: {
      id: String,           // e.g. "core-money-skills"
      name: String,         // e.g. "Core Money Skills"
      icon: String,         // lucide icon name
      color: String,        // e.g. "blue"
    },

    // Topic (search/filter)
    topic: { type: String, required: true, index: true },

    // Visual Metadata for lesson header
    visual: {
      icon: String,          // lucide icon name
      iconColor: String,     // e.g. "blue", "green"
      badge: String,         // "Essential", "Beginner Friendly"
      readTime: Number,      // minutes
    },

    // Structured Content Sections
    contentSections: [
      {
        id: String,
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
          ],
        },
        title: String,
        content: String, // rich text or markdown
        icon: String,
        colorScheme: String, // matches UI cards
        metadata: mongoose.Schema.Types.Mixed, // lists, comparisons, etc.
      },
    ],

    // Quiz (3-question style)
    quiz: {
      questions: [
        {
          question: String,
          options: [String], // exactly 4 choices
          correctAnswer: Number, // index (0-3)
          explanation: String,
        },
      ],
      passingScore: Number, // e.g., 2
    },

    // Related Lessons
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

    // Metadata
    points: { type: Number, default: 100 },
    difficultyLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    timeEstimate: { type: Number, default: 5 }, // UI uses 3–5 min read

    // Ordering
    order: { type: Number, default: 0 },

    // Status
    isActive: { type: Boolean, default: true },

    // Creator
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

// Indexes
learningModuleSchema.index({ "category.id": 1, order: 1 });
learningModuleSchema.index({ topic: 1, difficultyLevel: 1 });
learningModuleSchema.index({ isActive: 1 });

// Mongoose JSON cleanup
learningModuleSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Static method to filter lessons
learningModuleSchema.statics.getModules = async function (filters = {}) {
  const query = { isActive: true };

  if (filters.categoryId) query["category.id"] = filters.categoryId;
  if (filters.topic) query.topic = filters.topic;
  if (filters.difficulty) query.difficultyLevel = filters.difficulty;

  return this.find(query).sort({ order: 1 }).lean();
};

module.exports = mongoose.model("LearningModule", learningModuleSchema);
