const mongoose = require('mongoose');

/**
 * Challenge Schema
 * Tracks user completion of daily challenges and special tasks
 */
const challengeSchema = new mongoose.Schema(
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

    // Challenge Information
    challengeId: {
      type: String,
      required: true,
      trim: true,
    },
    challengeType: {
      type: String,
      required: true,
      enum: [
        'daily_trivia',
        'learning_streak',
        'calculator_expert',
        'perfect_score',
        'speed_demon',
        'knowledge_master',
        'early_bird',
        'night_owl',
        'weekend_warrior',
      ],
    },
    challengeName: {
      type: String,
      required: true,
      trim: true,
    },
    challengeDescription: {
      type: String,
      trim: true,
    },

    // Completion Information
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },

    // Points & Rewards
    pointsEarned: {
      type: Number,
      required: true,
      min: 0,
    },
    bonusMultiplier: {
      type: Number,
      default: 1,
      min: 1,
    },

    // Progress Tracking (for multi-step challenges)
    currentProgress: {
      type: Number,
      default: 0,
      min: 0,
    },
    targetProgress: {
      type: Number,
      required: true,
      min: 1,
    },

    // Date Context (for daily/weekly challenges)
    challengeDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    expiresAt: {
      type: Date,
    },

    // Additional Metadata
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes
challengeSchema.index({ userId: 1, challengeDate: -1 }); // User's challenges by date
challengeSchema.index({ userId: 1, challengeType: 1, challengeDate: 1 }, { unique: true }); // Unique challenge per day
challengeSchema.index({ userId: 1, completed: 1 }); // Filter completed challenges

// Instance method to update progress
challengeSchema.methods.updateProgress = function (increment = 1) {
  this.currentProgress += increment;

  if (this.currentProgress >= this.targetProgress && !this.completed) {
    this.completed = true;
    this.completedAt = new Date();
  }

  return this.save();
};

// Instance method to complete challenge immediately
challengeSchema.methods.complete = function () {
  this.completed = true;
  this.completedAt = new Date();
  this.currentProgress = this.targetProgress;
  return this.save();
};

// Static method to get user's daily challenges
challengeSchema.statics.getDailyChallenges = async function (userId, date = new Date()) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return this.find({
    userId,
    challengeDate: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  })
    .sort({ createdAt: 1 })
    .lean();
};

// Static method to get user's completed challenges
challengeSchema.statics.getCompletedChallenges = async function (userId, options = {}) {
  const { limit = 50, skip = 0 } = options;

  return this.find({ userId, completed: true })
    .sort({ completedAt: -1 })
    .limit(limit)
    .skip(skip)
    .lean();
};

// Static method to get challenge stats
challengeSchema.statics.getUserChallengeStats = async function (userId) {
  const results = await this.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalChallenges: { $sum: 1 },
        completedChallenges: {
          $sum: { $cond: ['$completed', 1, 0] },
        },
        totalPointsEarned: {
          $sum: { $cond: ['$completed', '$pointsEarned', 0] },
        },
        avgCompletionRate: {
          $avg: { $cond: ['$completed', 1, 0] },
        },
      },
    },
  ]);

  if (results.length === 0) {
    return {
      totalChallenges: 0,
      completedChallenges: 0,
      totalPointsEarned: 0,
      completionRate: 0,
    };
  }

  const stats = results[0];
  return {
    totalChallenges: stats.totalChallenges,
    completedChallenges: stats.completedChallenges,
    totalPointsEarned: stats.totalPointsEarned,
    completionRate: Math.round(stats.avgCompletionRate * 100),
  };
};

// Static method to create default daily challenges for user
challengeSchema.statics.createDailyChallenges = async function (userId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if challenges already exist for today
  const existing = await this.findOne({ userId, challengeDate: today });
  if (existing) {
    return null; // Already created for today
  }

  const dailyChallenges = [
    {
      userId,
      challengeId: `daily_trivia_${Date.now()}`,
      challengeType: 'daily_trivia',
      challengeName: 'Daily Trivia',
      challengeDescription: 'Play one trivia game today',
      pointsEarned: 50,
      targetProgress: 1,
      challengeDate: today,
      expiresAt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
    {
      userId,
      challengeId: `learning_streak_${Date.now()}`,
      challengeType: 'learning_streak',
      challengeName: 'Learning Streak',
      challengeDescription: 'Complete 3 lessons this week',
      pointsEarned: 200,
      targetProgress: 3,
      challengeDate: today,
      expiresAt: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      userId,
      challengeId: `calculator_expert_${Date.now()}`,
      challengeType: 'calculator_expert',
      challengeName: 'Calculator Expert',
      challengeDescription: 'Use the calculator 5 times',
      pointsEarned: 100,
      targetProgress: 5,
      challengeDate: today,
      expiresAt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
  ];

  return this.insertMany(dailyChallenges);
};

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
