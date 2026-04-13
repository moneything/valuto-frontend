const mongoose = require('mongoose');

/**
 * Challenge Schema
 * Tracks user completion of daily and weekly challenges and special tasks
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
        'learning_streak_6',
        'learning_streak_7',
        'learning_streak_9',
        'daily_lesson',
        'calculator_expert',
        'monthly_build_your_life',
        'monthly_build_your_business',
        'monthly_investment_simulation',
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

// Static method to get user's daily and weekly challenges for the current day context
challengeSchema.statics.getDailyChallenges = async function (userId, date = new Date()) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return this.find({
    userId,
    challengeDate: { $lte: endOfDay },
    $or: [
      {
        expiresAt: {
          $gte: startOfDay,
        },
      },
      { expiresAt: { $exists: false } },
      { expiresAt: null },
    ],
  })
    .sort({ expiresAt: 1, createdAt: 1 })
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

// Static method to create default daily and weekly challenges for user
challengeSchema.statics.createDailyChallenges = async function (userId, clerkUserId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return this.ensureDailyChallenges(userId, clerkUserId, today);
};

// Helper to build the daily and weekly challenge templates
challengeSchema.statics.buildDailyChallenges = function (dayStart, userId, clerkUserId) {
  const t = dayStart.getTime();
  return [
    {
      userId,
      clerkUserId,
      challengeId: `daily_trivia_${t}`,
      challengeType: 'daily_trivia',
      challengeName: 'Daily Trivia',
      challengeDescription: 'Play one trivia game today',
      pointsEarned: 50,
      targetProgress: 1,
      challengeDate: dayStart,
      expiresAt: new Date(dayStart.getTime() + 24 * 60 * 60 * 1000),
    },
    {
      userId,
      clerkUserId,
      challengeId: `learning_streak_${t}`,
      challengeType: 'learning_streak',
      challengeName: 'Learning Streak',
      challengeDescription: 'Complete 3 lessons this week',
      pointsEarned: 200,
      targetProgress: 3,
      challengeDate: dayStart,
      expiresAt: new Date(dayStart.getTime() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      userId,
      clerkUserId,
      challengeId: `learning_streak_6_${t}`,
      challengeType: 'learning_streak_6',
      challengeName: 'Learning Streak (6x)',
      challengeDescription: 'Complete 6 lessons this week',
      pointsEarned: 400,
      targetProgress: 6,
      challengeDate: dayStart,
      expiresAt: new Date(dayStart.getTime() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      userId,
      clerkUserId,
      challengeId: `learning_streak_7_${t}`,
      challengeType: 'learning_streak_7',
      challengeName: 'Learning Streak (7x)',
      challengeDescription: 'Complete 7 lessons this week',
      pointsEarned: 500,
      targetProgress: 7,
      challengeDate: dayStart,
      expiresAt: new Date(dayStart.getTime() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      userId,
      clerkUserId,
      challengeId: `learning_streak_9_${t}`,
      challengeType: 'learning_streak_9',
      challengeName: 'Learning Streak (9x)',
      challengeDescription: 'Complete 9 lessons this week',
      pointsEarned: 650,
      targetProgress: 9,
      challengeDate: dayStart,
      expiresAt: new Date(dayStart.getTime() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      userId,
      clerkUserId,
      challengeId: `daily_lesson_${t}`,
      challengeType: 'daily_lesson',
      challengeName: 'Daily Lesson',
      challengeDescription: 'Complete 1 lesson today',
      pointsEarned: 75,
      targetProgress: 1,
      challengeDate: dayStart,
      expiresAt: new Date(dayStart.getTime() + 24 * 60 * 60 * 1000),
    },
    {
      userId,
      clerkUserId,
      challengeId: `calculator_expert_${t}`,
      challengeType: 'calculator_expert',
      challengeName: 'Calculator Expert',
      challengeDescription: 'Use the calculator 5 times',
      pointsEarned: 100,
      targetProgress: 5,
      challengeDate: dayStart,
      expiresAt: new Date(dayStart.getTime() + 24 * 60 * 60 * 1000),
    },
  ];
};

challengeSchema.statics.buildMonthlyChallenges = function (monthStart, userId, clerkUserId) {
  const monthStamp = `${monthStart.getFullYear()}_${monthStart.getMonth() + 1}`;
  const nextMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1);

  return [
    {
      userId,
      clerkUserId,
      challengeId: `monthly_build_your_life_${monthStamp}`,
      challengeType: 'monthly_build_your_life',
      challengeName: 'Monthly Build Your Life',
      challengeDescription: 'Complete one Build Your Life playthrough this month',
      pointsEarned: 250,
      targetProgress: 1,
      challengeDate: monthStart,
      expiresAt: nextMonth,
    },
    {
      userId,
      clerkUserId,
      challengeId: `monthly_build_your_business_${monthStamp}`,
      challengeType: 'monthly_build_your_business',
      challengeName: 'Monthly Build Your Business',
      challengeDescription: 'Start and play through a Build Your Business run this month',
      pointsEarned: 250,
      targetProgress: 1,
      challengeDate: monthStart,
      expiresAt: nextMonth,
    },
    {
      userId,
      clerkUserId,
      challengeId: `monthly_investment_simulation_${monthStamp}`,
      challengeType: 'monthly_investment_simulation',
      challengeName: 'Monthly Investment Simulation',
      challengeDescription: 'Complete one Investment Simulation round this month',
      pointsEarned: 250,
      targetProgress: 1,
      challengeDate: monthStart,
      expiresAt: nextMonth,
    },
  ];
};

// Ensure each daily, weekly, and monthly challenge exists for the given user context
challengeSchema.statics.ensureDailyChallenges = async function (userId, clerkUserId, date = new Date()) {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dayStart);
  dayEnd.setHours(23, 59, 59, 999);
  const monthStart = new Date(dayStart.getFullYear(), dayStart.getMonth(), 1);
  const monthEnd = new Date(dayStart.getFullYear(), dayStart.getMonth() + 1, 0, 23, 59, 59, 999);

  const templates = [
    ...this.buildDailyChallenges(dayStart, userId, clerkUserId),
    ...this.buildMonthlyChallenges(monthStart, userId, clerkUserId),
  ];
  let createdAny = false;

  for (const template of templates) {
    const isMonthlyTemplate = template.challengeType.startsWith('monthly_');
    const existing = await this.findOne({
      userId,
      challengeType: template.challengeType,
      challengeDate: isMonthlyTemplate
        ? { $gte: monthStart, $lte: monthEnd }
        : { $gte: dayStart, $lte: dayEnd },
    });

    if (!existing) {
      await this.create(template);
      createdAny = true;
    }
  }

  return createdAny;
};

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
