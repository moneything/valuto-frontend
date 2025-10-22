const mongoose = require('mongoose');

/**
 * Session Schema
 * Represents a live trivia game session (Kahoot-style)
 */
const sessionSchema = new mongoose.Schema(
  {
    // Unique session identifier
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // 6-character join code (e.g., ABC123)
    joinCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      length: 6,
      index: true,
    },

    // Game Information
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Host Information
    hostId: {
      type: String,
      required: true,
      index: true,
    },
    hostName: {
      type: String,
      required: true,
    },
    hostSocketId: {
      type: String,
    },

    // Session Status
    status: {
      type: String,
      enum: ['waiting', 'active', 'ended'],
      default: 'waiting',
      index: true,
    },

    // Game Progress
    currentQuestionIndex: {
      type: Number,
      default: -1, // -1 means game hasn't started
      min: -1,
    },
    questionStartTime: {
      type: Date,
    },

    // Questions Array
    questions: [
      {
        id: {
          type: String,
          required: true,
        },
        question: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
          validate: {
            validator: function (arr) {
              return arr.length === 4;
            },
            message: 'Must have exactly 4 options',
          },
        },
        correctIndex: {
          type: Number,
          required: true,
          min: 0,
          max: 3,
        },
        timeLimit: {
          type: Number,
          required: true,
          min: 10,
          max: 120,
        },
        points: {
          type: Number,
          default: 100,
          min: 0,
        },
        explanation: {
          type: String,
        },
      },
    ],

    // Players Array
    players: [
      {
        userId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        socketId: {
          type: String,
        },
        score: {
          type: Number,
          default: 0,
          min: 0,
        },
        answeredQuestions: {
          type: Number,
          default: 0,
          min: 0,
        },
        correctAnswers: {
          type: Number,
          default: 0,
          min: 0,
        },
        answers: [
          {
            questionId: String,
            selectedIndex: Number,
            isCorrect: Boolean,
            timeSpentMs: Number,
            pointsEarned: Number,
            answeredAt: Date,
          },
        ],
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        isConnected: {
          type: Boolean,
          default: true,
        },
      },
    ],

    // Game Settings
    settings: {
      pointsPerCorrect: {
        type: Number,
        default: 100,
      },
      speedBonusEnabled: {
        type: Boolean,
        default: true,
      },
      maxSpeedBonus: {
        type: Number,
        default: 50,
      },
    },

    // Timestamps
    startedAt: {
      type: Date,
    },
    endedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Indexes for performance
sessionSchema.index({ joinCode: 1 });
sessionSchema.index({ hostId: 1, status: 1 });
sessionSchema.index({ status: 1, createdAt: -1 });

// Instance method to generate unique join code
sessionSchema.statics.generateJoinCode = async function () {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code;
  let exists = true;

  while (exists) {
    code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Check if code already exists
    const existing = await this.findOne({ joinCode: code });
    exists = !!existing;
  }

  return code;
};

// Instance method to add player
sessionSchema.methods.addPlayer = function (playerData) {
  const existingPlayer = this.players.find((p) => p.userId === playerData.userId);

  if (existingPlayer) {
    // Update existing player (reconnection)
    existingPlayer.socketId = playerData.socketId;
    existingPlayer.isConnected = true;
    return existingPlayer;
  } else {
    // Add new player
    this.players.push({
      userId: playerData.userId,
      name: playerData.name,
      socketId: playerData.socketId,
      score: 0,
      answeredQuestions: 0,
      correctAnswers: 0,
      answers: [],
      joinedAt: new Date(),
      isConnected: true,
    });
    return this.players[this.players.length - 1];
  }
};

// Instance method to remove player
sessionSchema.methods.removePlayer = function (userId) {
  const playerIndex = this.players.findIndex((p) => p.userId === userId);
  if (playerIndex !== -1) {
    this.players[playerIndex].isConnected = false;
    this.players[playerIndex].socketId = null;
  }
};

// Instance method to submit answer
sessionSchema.methods.submitAnswer = function (userId, questionId, answerData) {
  const player = this.players.find((p) => p.userId === userId);

  if (!player) {
    throw new Error('Player not found in session');
  }

  // Check if already answered this question
  const alreadyAnswered = player.answers.some((a) => a.questionId === questionId);
  if (alreadyAnswered) {
    throw new Error('Question already answered');
  }

  // Find the question
  const question = this.questions.find((q) => q.id === questionId);
  if (!question) {
    throw new Error('Question not found');
  }

  // Calculate if correct
  const isCorrect = answerData.selectedIndex === question.correctIndex;

  // Calculate points with speed bonus
  let pointsEarned = 0;
  if (isCorrect) {
    pointsEarned = question.points;

    // Add speed bonus if enabled
    if (this.settings.speedBonusEnabled && answerData.timeSpentMs) {
      const timeLimit = question.timeLimit * 1000; // Convert to ms
      const remainingTime = timeLimit - answerData.timeSpentMs;
      const speedBonus = Math.floor((remainingTime / timeLimit) * this.settings.maxSpeedBonus);
      pointsEarned += Math.max(0, speedBonus);
    }
  }

  // Add answer to player
  player.answers.push({
    questionId,
    selectedIndex: answerData.selectedIndex,
    isCorrect,
    timeSpentMs: answerData.timeSpentMs,
    pointsEarned,
    answeredAt: new Date(),
  });

  // Update player stats
  player.answeredQuestions += 1;
  if (isCorrect) {
    player.correctAnswers += 1;
  }
  player.score += pointsEarned;

  return {
    isCorrect,
    pointsEarned,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
  };
};

// Instance method to get leaderboard
sessionSchema.methods.getLeaderboard = function () {
  return this.players
    .filter((p) => p.isConnected || p.answeredQuestions > 0)
    .map((p) => ({
      userId: p.userId,
      name: p.name,
      score: p.score,
      correctAnswers: p.correctAnswers,
      answeredQuestions: p.answeredQuestions,
      accuracy:
        p.answeredQuestions > 0 ? Math.round((p.correctAnswers / p.answeredQuestions) * 100) : 0,
    }))
    .sort((a, b) => b.score - a.score)
    .map((p, index) => ({
      rank: index + 1,
      ...p,
    }));
};

// Instance method to start game
sessionSchema.methods.startGame = function () {
  if (this.status !== 'waiting') {
    throw new Error('Game already started or ended');
  }

  if (this.questions.length === 0) {
    throw new Error('No questions in session');
  }

  this.status = 'active';
  this.currentQuestionIndex = 0;
  this.startedAt = new Date();
  this.questionStartTime = new Date();
};

// Instance method to advance to next question
sessionSchema.methods.nextQuestion = function () {
  if (this.status !== 'active') {
    throw new Error('Game not active');
  }

  this.currentQuestionIndex += 1;

  if (this.currentQuestionIndex >= this.questions.length) {
    // Game over
    this.status = 'ended';
    this.endedAt = new Date();
    return null;
  }

  this.questionStartTime = new Date();
  return this.questions[this.currentQuestionIndex];
};

// Instance method to end game
sessionSchema.methods.endGame = function () {
  this.status = 'ended';
  this.endedAt = new Date();
};

// Static method to get active sessions
sessionSchema.statics.getActiveSessions = async function (hostId = null) {
  const query = { status: { $in: ['waiting', 'active'] } };
  if (hostId) {
    query.hostId = hostId;
  }

  return this.find(query)
    .select('sessionId joinCode title hostName status players.length createdAt')
    .sort({ createdAt: -1 })
    .lean();
};

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
