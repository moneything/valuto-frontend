const mongoose = require('mongoose');

/**
 * LearningProgress Schema
 * (Updated for SINGLE-LESSON MODULES)
 *
 * Each user has exactly ONE progress document per module.
 */

const learningProgressSchema = new mongoose.Schema(
  {
    // User Reference
    userId: {
      type: String,
      required: true,
      index: true,
    },

    clerkUserId: {
      type: String,
      required: true,
      index: true,
    },

    // Module Identifier
    moduleId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    // Display Name
    moduleName: {
      type: String,
      required: true,
      trim: true,
    },

    // Progress Status
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'in_progress',
    },

    // Quiz Results
    quizScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    quizPassed: {
      type: Boolean,
      default: false,
    },

    quizAttempts: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Time Tracking
    timeSpent: {
      type: Number, // in seconds
      default: 0,
      min: 0,
    },

    // Timestamps
    startedAt: {
      type: Date,
      default: Date.now,
    },

    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    // Optional: detailed correctness / answers
    quizAnswers: [
      {
        question: String,
        selectedAnswer: Number,
        isCorrect: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

/* -------------------------
   INDEXES
-------------------------- */

// One progress document per module per user
learningProgressSchema.index(
  { userId: 1, moduleId: 1 },
  { unique: true }
);

/* -------------------------
   INSTANCE METHODS
-------------------------- */

learningProgressSchema.methods.markCompleted = function () {
  this.status = 'completed';
  this.completedAt = new Date();
  return this.save();
};

learningProgressSchema.methods.addTimeSpent = function (seconds) {
  this.timeSpent += seconds;
  this.lastAccessedAt = new Date();
  return this.save();
};

/* -------------------------
   STATIC METHODS
-------------------------- */

// Single-module summary
learningProgressSchema.statics.getModuleSummary = async function (userId, moduleId) {
  const progress = await this.findOne({ userId, moduleId }).lean();

  if (!progress) {
    return {
      moduleId,
      totalLessons: 1,
      completedLessons: 0,
      completionPercentage: 0,
      totalTimeSpent: 0,
      averageQuizScore: 0,
      lessons: [],
    };
  }

  return {
    moduleId,
    totalLessons: 1,
    completedLessons: progress.status === 'completed' ? 1 : 0,
    completionPercentage: progress.status === 'completed' ? 100 : 0,
    totalTimeSpent: progress.timeSpent,
    averageQuizScore: progress.quizScore ?? 0,
    lessons: [progress],
  };
};

// All modules for user
learningProgressSchema.statics.getUserProgress = async function (userId) {
  const progress = await this.find({ userId })
    .sort({ lastAccessedAt: -1 })
    .lean();

  return progress;
};

/* -------------------------
   LEADERBOARD (unchanged)
-------------------------- */

learningProgressSchema.statics.getModuleLeaderboard = async function (moduleId, limit = 10) {
  const results = await this.aggregate([
    { $match: { moduleId, status: 'completed' } },
    {
      $group: {
        _id: '$userId',
        totalTimeSpent: { $sum: '$timeSpent' },
        avgQuizScore: { $avg: '$quizScore' },
        completedAt: { $max: '$completedAt' },
      },
    },
    { $sort: { avgQuizScore: -1, totalTimeSpent: 1 } },
    { $limit: limit },
  ]);

  return results;
};

module.exports = mongoose.model('LearningProgress', learningProgressSchema);
