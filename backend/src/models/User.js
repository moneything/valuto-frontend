const mongoose = require('mongoose');

/**
 * User Schema
 * Stores user profile information synced with Clerk authentication
 */
const userSchema = new mongoose.Schema(
  {
    // Clerk User ID (primary identifier)
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // Role Management
    role: {
      type: String,
      enum: ['student', 'teacher'],
      default: 'student',
      required: true,
    },

    // Optional Profile Details
    age: {
      type: Number,
      min: 5,
      max: 120,
    },
    school: {
      type: String,
      trim: true,
    },
    grade: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },

    // Onboarding Status
    completedOnboarding: {
      type: Boolean,
      default: false,
    },

    // Gamification Stats
    totalPoints: {
      type: Number,
      default: 0,
      min: 0,
    },
    gamesPlayed: {
      type: Number,
      default: 0,
      min: 0,
    },
    lessonsCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Streak Tracking
    currentStreak: {
      type: Number,
      default: 0,
      min: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastActiveDate: {
      type: Date,
      default: Date.now,
    },

    // Achievement Tracking
    achievements: [
      {
        achievementId: String,
        unlockedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Activity Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Indexes for performance
userSchema.index({ totalPoints: -1 }); // For leaderboard queries
userSchema.index({ school: 1, totalPoints: -1 }); // For school-based leaderboards
userSchema.index({ role: 1 }); // For filtering by role

// Virtual for average score calculation
userSchema.virtual('averageScore').get(function () {
  if (this.gamesPlayed === 0) return 0;
  return Math.round((this.totalPoints / this.gamesPlayed) * 100) / 100;
});

// Instance method to update streak
userSchema.methods.updateStreak = function () {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastActive = new Date(this.lastActiveDate);
  lastActive.setHours(0, 0, 0, 0);

  const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) {
    // Same day, no change
    return this.currentStreak;
  } else if (daysDiff === 1) {
    // Consecutive day, increment streak
    this.currentStreak += 1;
    if (this.currentStreak > this.longestStreak) {
      this.longestStreak = this.currentStreak;
    }
  } else {
    // Streak broken
    this.currentStreak = 1;
  }

  this.lastActiveDate = today;
  return this.currentStreak;
};

// Instance method to add achievement
userSchema.methods.addAchievement = function (achievementId) {
  const exists = this.achievements.some((a) => a.achievementId === achievementId);
  if (!exists) {
    this.achievements.push({ achievementId });
  }
};

// Static method to get leaderboard
userSchema.statics.getLeaderboard = async function (options = {}) {
  const { limit = 100, school = null, role = 'student' } = options;

  const query = { role, isActive: true };
  if (school) {
    query.school = school;
  }

  return this.find(query)
    .select('name email school totalPoints gamesPlayed lessonsCompleted')
    .sort({ totalPoints: -1 })
    .limit(limit)
    .lean();
};

// Pre-save middleware to ensure data consistency
userSchema.pre('save', function (next) {
  // Ensure streak values are non-negative
  if (this.currentStreak < 0) this.currentStreak = 0;
  if (this.longestStreak < 0) this.longestStreak = 0;

  // Update longest streak if current is higher
  if (this.currentStreak > this.longestStreak) {
    this.longestStreak = this.currentStreak;
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
