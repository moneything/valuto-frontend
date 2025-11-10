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
      enum: ['waiting', 'active', 'ended', 'archived'],
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
        id: { type: String, required: true },
        question: { type: String, required: true },
        options: {
          type: [String],
          required: true,
          validate: {
            validator: (arr) => arr.length === 4,
            message: 'Must have exactly 4 options',
          },
        },
        correctIndex: { type: Number, required: true, min: 0, max: 3 },
        timeLimit: { type: Number, required: true, min: 10, max: 120 },
        points: { type: Number, default: 100, min: 0 },
        explanation: { type: String },
      },
    ],

    // Players Array
    players: [
      {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        socketId: { type: String },
        score: { type: Number, default: 0, min: 0 },
        answeredQuestions: { type: Number, default: 0, min: 0 },
        correctAnswers: { type: Number, default: 0, min: 0 },
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
        joinedAt: { type: Date, default: Date.now },
        isConnected: { type: Boolean, default: true },
      },
    ],

    // Game Settings
    settings: {
      pointsPerCorrect: { type: Number, default: 100 },
      speedBonusEnabled: { type: Boolean, default: true },
      maxSpeedBonus: { type: Number, default: 50 },
    },

    startedAt: { type: Date },
    endedAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes
sessionSchema.index({ joinCode: 1 });
sessionSchema.index({ hostId: 1, status: 1 });
sessionSchema.index({ status: 1, createdAt: -1 });

// Static method to generate unique join code
sessionSchema.statics.generateJoinCode = async function () {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code, exists;
  do {
    code = Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
    exists = await this.findOne({ joinCode: code });
  } while (exists);
  return code;
};

// === Player Methods ===
sessionSchema.methods.addPlayer = function (playerData) {
  const existing = this.players.find((p) => p.userId === playerData.userId);
  if (existing) {
    existing.socketId = playerData.socketId;
    existing.isConnected = true;
    return existing;
  }
  this.players.push({
    ...playerData,
    score: 0,
    answeredQuestions: 0,
    correctAnswers: 0,
    answers: [],
    joinedAt: new Date(),
    isConnected: true,
  });
  return this.players[this.players.length - 1];
};

sessionSchema.methods.removePlayer = function (userId) {
  const player = this.players.find((p) => p.userId === userId);
  if (player) {
    player.isConnected = false;
    player.socketId = null;
  }
};

// === Game Logic ===

// ✅ SAFE: no crash when called after game ended
sessionSchema.methods.nextQuestion = function () {
  if (this.status !== 'active') {
    console.warn(`⚠️ Skipping nextQuestion() — session ${this.sessionId} not active.`);
    return null;
  }

  this.currentQuestionIndex += 1;

  if (this.currentQuestionIndex >= this.questions.length) {
    this.status = 'ended';
    this.endedAt = new Date();
    return null;
  }

  this.questionStartTime = new Date();
  return this.questions[this.currentQuestionIndex];
};

sessionSchema.methods.startGame = function () {
  if (this.status !== 'waiting') throw new Error('Game already started or ended');
  if (this.questions.length === 0) throw new Error('No questions in session');

  this.status = 'active';
  this.currentQuestionIndex = 0;
  this.startedAt = new Date();
  this.questionStartTime = new Date();
};

sessionSchema.methods.endGame = function () {
  // 🧹 Gracefully mark the session ended
  if (this.status !== 'ended') {
    this.status = 'ended';
    this.endedAt = new Date();
  }
};

// === Leaderboard ===
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
        p.answeredQuestions > 0
          ? Math.round((p.correctAnswers / p.answeredQuestions) * 100)
          : 0,
    }))
    .sort((a, b) => b.score - a.score)
    .map((p, i) => ({ rank: i + 1, ...p }));
};

// === Answer Logic ===
sessionSchema.methods.submitAnswer = function (userId, questionId, data) {
  const player = this.players.find((p) => p.userId === userId);
  if (!player) throw new Error('Player not found in session');
  if (player.answers.some((a) => a.questionId === questionId))
    throw new Error('Question already answered');

  const question = this.questions.find((q) => q.id === questionId);
  if (!question) throw new Error('Question not found');

  const isCorrect = data.selectedIndex === question.correctIndex;
  let points = 0;
  if (isCorrect) {
    points = question.points;
    if (this.settings.speedBonusEnabled && data.timeSpentMs) {
      const timeLimit = question.timeLimit * 1000;
      const remaining = timeLimit - data.timeSpentMs;
      const bonus = Math.floor((remaining / timeLimit) * this.settings.maxSpeedBonus);
      points += Math.max(0, bonus);
    }
  }

  player.answers.push({
    questionId,
    selectedIndex: data.selectedIndex,
    isCorrect,
    timeSpentMs: data.timeSpentMs,
    pointsEarned: points,
    answeredAt: new Date(),
  });

  player.answeredQuestions += 1;
  if (isCorrect) player.correctAnswers += 1;
  player.score += points;

  return { isCorrect, pointsEarned: points, correctIndex: question.correctIndex, explanation: question.explanation };
};

// === Static ===
sessionSchema.statics.getActiveSessions = async function (hostId = null) {
  const query = { status: { $in: ['waiting', 'active'] } };
  if (hostId) query.hostId = hostId;

  return this.find(query)
    .select('sessionId joinCode title hostName status players createdAt')
    .sort({ createdAt: -1 })
    .lean();
};

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
