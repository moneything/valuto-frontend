const mongoose = require('mongoose');

/**
 * GameResult Schema
 * Stores individual game play results for trivia games
 */
const gameResultSchema = new mongoose.Schema(
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

    // Game Information
    gameCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    gameTitle: {
      type: String,
      required: true,
      trim: true,
    },
    gameType: {
      type: String,
      enum: ['trivia', 'quiz', 'challenge'],
      default: 'trivia',
    },

    // Score Information
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    maxPossibleScore: {
      type: Number,
      required: true,
      min: 0,
    },
    accuracy: {
      type: Number,
      min: 0,
      max: 100,
    },

    // Performance Metrics
    questionsAnswered: {
      type: Number,
      required: true,
      min: 0,
    },
    correctAnswers: {
      type: Number,
      required: true,
      min: 0,
    },
    timeTaken: {
      type: Number, // in seconds
      min: 0,
    },

    // Detailed Question Results (optional)
    questionResults: [
      {
        questionId: String,
        question: String,
        selectedAnswer: Number,
        correctAnswer: Number,
        isCorrect: Boolean,
        timeSpent: Number, // in seconds
        pointsEarned: Number,
      },
    ],

    // Completion Status
    completed: {
      type: Boolean,
      default: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },

    // Additional Context
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
gameResultSchema.index({ userId: 1, completedAt: -1 }); // User's game history
gameResultSchema.index({ gameCode: 1, score: -1 }); // Game leaderboard
gameResultSchema.index({ completedAt: -1 }); // Recent games

// Pre-save middleware to calculate accuracy
gameResultSchema.pre('save', function (next) {
  if (this.questionsAnswered > 0) {
    this.accuracy = Math.round((this.correctAnswers / this.questionsAnswered) * 100 * 100) / 100;
  } else {
    this.accuracy = 0;
  }
  next();
});

// Static method to get user's game history
gameResultSchema.statics.getUserHistory = async function (userId, options = {}) {
  const { limit = 10, skip = 0 } = options;

  return this.find({ userId })
    .select('-questionResults') // Exclude detailed results for performance
    .sort({ completedAt: -1 })
    .limit(limit)
    .skip(skip)
    .lean();
};

// Static method to get game leaderboard
gameResultSchema.statics.getGameLeaderboard = async function (gameCode, limit = 10) {
  return this.find({ gameCode })
    .select('userId score accuracy questionsAnswered correctAnswers completedAt')
    .sort({ score: -1, completedAt: 1 })
    .limit(limit)
    .lean();
};

// Static method to get user stats
gameResultSchema.statics.getUserStats = async function (userId) {
  const results = await this.aggregate([
    { $match: { userId, completed: true } },
    {
      $group: {
        _id: null,
        totalGames: { $sum: 1 },
        totalScore: { $sum: '$score' },
        avgScore: { $avg: '$score' },
        avgAccuracy: { $avg: '$accuracy' },
        totalCorrect: { $sum: '$correctAnswers' },
        totalQuestions: { $sum: '$questionsAnswered' },
      },
    },
  ]);

  return results.length > 0 ? results[0] : null;
};

const GameResult = mongoose.model('GameResult', gameResultSchema);

module.exports = GameResult;
