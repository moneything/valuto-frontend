const mongoose = require('mongoose');

/**
 * SessionResult Schema
 * Stores final results for each player in a trivia session
 */
const sessionResultSchema = new mongoose.Schema(
  {
    // Session Reference
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    sessionTitle: {
      type: String,
      required: true,
    },
    joinCode: {
      type: String,
      required: true,
    },

    // Player Information
    userId: {
      type: String,
      required: true,
      index: true,
    },
    userName: {
      type: String,
      required: true,
    },

    // Performance Metrics
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    rank: {
      type: Number,
      required: true,
      min: 1,
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 0,
    },
    answeredQuestions: {
      type: Number,
      required: true,
      min: 0,
    },
    correctAnswers: {
      type: Number,
      required: true,
      min: 0,
    },
    accuracy: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    // Detailed Answers
    answers: [
      {
        questionId: {
          type: String,
          required: true,
        },
        questionText: {
          type: String,
          required: true,
        },
        selectedIndex: {
          type: Number,
          min: 0,
          max: 3,
        },
        correctIndex: {
          type: Number,
          required: true,
          min: 0,
          max: 3,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
        timeSpentMs: {
          type: Number,
          min: 0,
        },
        pointsEarned: {
          type: Number,
          required: true,
          min: 0,
        },
        answeredAt: {
          type: Date,
        },
      },
    ],

    // Timing Information
    sessionStartedAt: {
      type: Date,
      required: true,
    },
    sessionEndedAt: {
      type: Date,
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes
sessionResultSchema.index({ sessionId: 1, rank: 1 });
sessionResultSchema.index({ userId: 1, completedAt: -1 });
sessionResultSchema.index({ sessionId: 1, score: -1 });

// Static method to create results from session
sessionResultSchema.statics.createFromSession = async function (session) {
  const results = [];

  if (!session || !session.players || session.players.length === 0) {
    return results;
  }

  // Get leaderboard to determine ranks
  const leaderboard = session.getLeaderboard();

  // Create result for each player
  for (const player of session.players) {
    if (player.answeredQuestions === 0) {
      continue; // Skip players who didn't answer anything
    }

    const leaderboardEntry = leaderboard.find((l) => l.userId === player.userId);
    const rank = leaderboardEntry ? leaderboardEntry.rank : session.players.length;

    // Transform answers with full question text
    const answersWithDetails = player.answers.map((answer) => {
      const question = session.questions.find((q) => q.id === answer.questionId);
      return {
        questionId: answer.questionId,
        questionText: question ? question.question : 'Unknown question',
        selectedIndex: answer.selectedIndex,
        correctIndex: question ? question.correctIndex : -1,
        isCorrect: answer.isCorrect,
        timeSpentMs: answer.timeSpentMs,
        pointsEarned: answer.pointsEarned,
        answeredAt: answer.answeredAt,
      };
    });

    const result = {
      sessionId: session.sessionId,
      sessionTitle: session.title,
      joinCode: session.joinCode,
      userId: player.userId,
      userName: player.name,
      score: player.score,
      rank,
      totalQuestions: session.questions.length,
      answeredQuestions: player.answeredQuestions,
      correctAnswers: player.correctAnswers,
      accuracy:
        player.answeredQuestions > 0
          ? Math.round((player.correctAnswers / player.answeredQuestions) * 100)
          : 0,
      answers: answersWithDetails,
      sessionStartedAt: session.startedAt,
      sessionEndedAt: session.endedAt,
      completedAt: new Date(),
    };

    results.push(result);
  }

  // Bulk insert all results
  if (results.length > 0) {
    await this.insertMany(results);
  }

  return results;
};

// Static method to get user's session history
sessionResultSchema.statics.getUserHistory = async function (userId, options = {}) {
  const { limit = 10, skip = 0 } = options;

  return this.find({ userId })
    .select('-answers') // Exclude detailed answers for list view
    .sort({ completedAt: -1 })
    .limit(limit)
    .skip(skip)
    .lean();
};

// Static method to get session results (for host)
sessionResultSchema.statics.getSessionResults = async function (sessionId) {
  const results = await this.find({ sessionId }).sort({ rank: 1 }).lean();

  if (results.length === 0) {
    return null;
  }

  // Calculate session statistics
  const stats = {
    sessionId,
    sessionTitle: results[0].sessionTitle,
    joinCode: results[0].joinCode,
    totalPlayers: results.length,
    averageScore: Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length),
    averageAccuracy: Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length),
    highestScore: Math.max(...results.map((r) => r.score)),
    lowestScore: Math.min(...results.map((r) => r.score)),
    sessionStartedAt: results[0].sessionStartedAt,
    sessionEndedAt: results[0].sessionEndedAt,
    results,
  };

  return stats;
};

// Static method to get user statistics
sessionResultSchema.statics.getUserStats = async function (userId) {
  const results = await this.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalSessions: { $sum: 1 },
        totalScore: { $sum: '$score' },
        avgScore: { $avg: '$score' },
        avgAccuracy: { $avg: '$accuracy' },
        avgRank: { $avg: '$rank' },
        bestRank: { $min: '$rank' },
        totalCorrect: { $sum: '$correctAnswers' },
        totalQuestions: { $sum: '$answeredQuestions' },
        firstPlaceFinishes: {
          $sum: { $cond: [{ $eq: ['$rank', 1] }, 1, 0] },
        },
        topThreeFinishes: {
          $sum: { $cond: [{ $lte: ['$rank', 3] }, 1, 0] },
        },
      },
    },
  ]);

  if (results.length === 0) {
    return {
      totalSessions: 0,
      totalScore: 0,
      avgScore: 0,
      avgAccuracy: 0,
      avgRank: 0,
      bestRank: 0,
      totalCorrect: 0,
      totalQuestions: 0,
      firstPlaceFinishes: 0,
      topThreeFinishes: 0,
    };
  }

  return {
    ...results[0],
    avgScore: Math.round(results[0].avgScore),
    avgAccuracy: Math.round(results[0].avgAccuracy),
    avgRank: Math.round(results[0].avgRank * 10) / 10,
  };
};

const SessionResult = mongoose.model('SessionResult', sessionResultSchema);

module.exports = SessionResult;
