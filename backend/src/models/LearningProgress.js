const mongoose = require('mongoose');

/**
 * LearningProgress Schema
 * Tracks user progress through learning modules and lessons
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

    // Module Information
    moduleId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    moduleName: {
      type: String,
      required: true,
      trim: true,
    },

    // Lesson Information
    lessonId: {
      type: String,
      required: true,
      trim: true,
    },
    lessonName: {
      type: String,
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
    },
    quizAttempts: {
      type: Number,
      default: 1,
      min: 1,
    },
    quizPassed: {
      type: Boolean,
      default: false,
    },

    // Time Tracking
    timeSpent: {
      type: Number, // in seconds
      default: 0,
      min: 0,
    },

    // Activity Timestamps
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
    },

    // Quiz Details (optional)
    quizAnswers: [
      {
        questionId: String,
        selectedAnswer: Number,
        isCorrect: Boolean,
        attemptNumber: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compound indexes
learningProgressSchema.index({ userId: 1, moduleId: 1 }); // User's module progress
learningProgressSchema.index({ userId: 1, moduleId: 1, lessonId: 1 }, { unique: true }); // Unique progress per lesson
learningProgressSchema.index({ userId: 1, status: 1 }); // Filter by progress status

// Instance method to mark as completed
learningProgressSchema.methods.markCompleted = function () {
  this.status = 'completed';
  this.completedAt = new Date();
  return this.save();
};

// Instance method to update time spent
learningProgressSchema.methods.addTimeSpent = function (seconds) {
  this.timeSpent += seconds;
  this.lastAccessedAt = new Date();
  return this.save();
};

// Static method to get user's module summary
learningProgressSchema.statics.getModuleSummary = async function (userId, moduleId) {
  const lessons = await this.find({ userId, moduleId }).sort({ lessonId: 1 }).lean();

  const totalLessons = lessons.length;
  const completedLessons = lessons.filter((l) => l.status === 'completed').length;
  const totalTimeSpent = lessons.reduce((acc, l) => acc + (l.timeSpent || 0), 0);
  const averageQuizScore =
    lessons.filter((l) => l.quizScore != null).reduce((acc, l) => acc + l.quizScore, 0) /
      lessons.filter((l) => l.quizScore != null).length || 0;

  return {
    moduleId,
    totalLessons,
    completedLessons,
    completionPercentage: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
    totalTimeSpent,
    averageQuizScore: Math.round(averageQuizScore * 100) / 100,
    lessons,
  };
};

// Static method to get all user progress
learningProgressSchema.statics.getUserProgress = async function (userId) {
  const progress = await this.find({ userId }).sort({ lastAccessedAt: -1 }).lean();

  // Group by module
  const modules = {};
  progress.forEach((p) => {
    if (!modules[p.moduleId]) {
      modules[p.moduleId] = {
        moduleId: p.moduleId,
        moduleName: p.moduleName,
        lessons: [],
        completed: 0,
        total: 0,
      };
    }
    modules[p.moduleId].lessons.push(p);
    modules[p.moduleId].total += 1;
    if (p.status === 'completed') {
      modules[p.moduleId].completed += 1;
    }
  });

  return Object.values(modules);
};

// Static method to get leaderboard by module completion
learningProgressSchema.statics.getModuleLeaderboard = async function (moduleId, limit = 10) {
  const results = await this.aggregate([
    { $match: { moduleId, status: 'completed' } },
    {
      $group: {
        _id: '$userId',
        totalTimeSpent: { $sum: '$timeSpent' },
        avgQuizScore: { $avg: '$quizScore' },
        lessonsCompleted: { $sum: 1 },
        completedAt: { $max: '$completedAt' },
      },
    },
    { $sort: { lessonsCompleted: -1, avgQuizScore: -1 } },
    { $limit: limit },
  ]);

  return results;
};

const LearningProgress = mongoose.model('LearningProgress', learningProgressSchema);

module.exports = LearningProgress;
