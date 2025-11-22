// backend/src/controllers/learningController.js

const LearningProgress = require('../models/LearningProgress');
const LearningModule = require('../models/LearningModule');
const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

/**
 * LEARNING Controller
 * Works with the NEW LearningModule + LearningProgress schemas
 * A module = one lesson. No multi-lesson structure.
 * moduleId = topic slug (string).
 */

/* --------------------------------------------------------
 *  Save or Update Progress
 *  POST /api/learning/progress
 * -------------------------------------------------------- */
const saveProgress = asyncHandler(async (req, res) => {
  console.log("🔥 Incoming Progress Payload:");
  console.dir(req.body, { depth: null });

  console.log("🔥 Incoming Auth User:");
  console.dir(req.clerkUser, { depth: null });

  const clerkUserId = req.clerkUser.id;

  const {
    moduleId,          // topic slug
    status,
    quizScore,
    timeSpent,
    quizAnswers,
    responses,         // quiz responses with correctness
    simulationResult,  // simulation scoring
    scenarioResults,   // scenario scoring
    sessionData        // contains time
  } = req.body;

  if (!moduleId) {
    throw new AppError("Missing moduleId (topic slug)", 400);
  }
  console.log("📌 moduleId received:", moduleId);

  // 1) Get user
  const user = await User.findOne({ clerkUserId });
  if (!user) throw new AppError("User profile not found", 404);

  // 2) Get module using topic slug
  console.log("🔍 Searching for module with topic:", moduleId);
  let module; // <--- IMPORTANT
  try {
    module = await LearningModule.findOne({ topic: moduleId });
    console.log("🟩 Module returned:", module);
  } catch (err) {
    console.error("🟥 ERROR WHEN FETCHING MODULE:", err);
    throw new AppError("Database error while searching for module", 500);
  }

  if (!module) {
    throw new AppError("Learning module not found", 404);
  }

  // 3) Determine effective moduleName
  const moduleName = module.title;

  // ------------------------
  // SCORE CALCULATION LOGIC
  // ------------------------
  let finalScore = quizScore;

  // 1) Quiz (responses with isCorrect)
  if (finalScore == null && Array.isArray(responses)) {
    const correct = responses.filter(r => r.isCorrect).length;
    finalScore = responses.length > 0
      ? Math.round((correct / responses.length) * 100)
      : 0;
  }

  // 2) Simulation result
  if (finalScore == null && simulationResult) {
    finalScore =
      simulationResult.finalScore ??
      simulationResult.score ??
      0;
  }

  // 3) Scenario-based scoring
  if (finalScore == null && Array.isArray(scenarioResults)) {
    const total = scenarioResults.length;
    const optimal = scenarioResults.filter(s => s.isOptimal).length;
    finalScore = total > 0 ? Math.round((optimal / total) * 100) : 0;
  }

  const effectiveScore = finalScore ?? null;

  // -----------------------
  // COMPLETION LOGIC
  // -----------------------
  const isCompleted =
    status === "completed" ||
    (effectiveScore !== null && effectiveScore >= 70);

  const effectiveStatus = isCompleted
    ? "completed"
    : status || "in_progress";

  // -----------------------
  // FIND EXISTING PROGRESS
  // -----------------------
  let progress = await LearningProgress.findOne({
    userId: user._id.toString(),
    moduleId: module.topic,
  });

  let pointsEarned = 0;
  let isFirstCompletion = false;

  if (progress) {
    // ========== UPDATE EXISTING ==========
    progress.status = effectiveStatus;

    if (effectiveScore !== null) {
      progress.quizScore = effectiveScore;
      progress.quizPassed = effectiveScore >= 70;
      progress.quizAttempts = (progress.quizAttempts || 0) + 1;
    }

    const timeToAdd = timeSpent || sessionData?.totalTime || 0;
    if (timeToAdd > 0) progress.timeSpent += timeToAdd;

    progress.lastAccessedAt = new Date();

    // Award points on FIRST completion only
    if (isCompleted && !progress.completedAt) {
      progress.completedAt = new Date();
      isFirstCompletion = true;

      pointsEarned = calculatePoints(module.points, effectiveScore);

      // Update user stats
      user.lessonsCompleted += 1;
      user.totalPoints += pointsEarned;
      user.updateStreak();
      await user.save();
    }

    await progress.save();

  } else {
    // ========== CREATE NEW PROGRESS ==========
    progress = await LearningProgress.create({
      userId: user._id.toString(),
      clerkUserId,
      moduleId: module.topic,
      moduleName,
      status: effectiveStatus,
      quizScore: effectiveScore,
      quizPassed: effectiveScore ? effectiveScore >= 70 : false,
      timeSpent: timeSpent || sessionData?.totalTime || 0,
      quizAttempts: effectiveScore ? 1 : 0,
    });

    // Award points ONLY if completed immediately
    if (isCompleted) {
      isFirstCompletion = true;
      pointsEarned = calculatePoints(module.points, effectiveScore);

      user.lessonsCompleted += 1;
      user.totalPoints += pointsEarned;
      user.updateStreak();
      await user.save();
    }
  }

  return res.status(200).json({
    success: true,
    message: "Progress saved successfully",
    data: progress,
    pointsEarned: isFirstCompletion ? pointsEarned : 0,
    totalPoints: user.totalPoints,
    lessonsCompleted: user.lessonsCompleted,
  });
});


/* --------------------------------------------------------
 * Calculate module points
 * -------------------------------------------------------- */
function calculatePoints(basePoints = 100, score = 0) {
  if (score >= 90) return basePoints;
  if (score >= 80) return Math.round(basePoints * 0.9);
  if (score >= 70) return Math.round(basePoints * 0.8);
  return 0;
}

/* --------------------------------------------------------
 * GET Module Progress
 * GET /api/learning/progress/:moduleId
 * -------------------------------------------------------- */
const getModuleProgress = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { moduleId } = req.params; // topic slug

  const user = await User.findOne({ clerkUserId });
  if (!user) throw new AppError("User profile not found", 404);

  const summary = await LearningProgress.getModuleSummary(
    user._id.toString(),
    moduleId
  );

  return res.status(200).json({
    success: true,
    data: summary,
  });
});

/* --------------------------------------------------------
 * GET All Progress for User
 * GET /api/learning/progress
 * -------------------------------------------------------- */
const getAllProgress = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  const user = await User.findOne({ clerkUserId });
  if (!user) throw new AppError("User profile not found", 404);

  const progress = await LearningProgress.getUserProgress(
    user._id.toString()
  );

  return res.status(200).json({
    success: true,
    data: progress,
  });
});

/* --------------------------------------------------------
 * UPDATE Time Spent
 * PUT /api/learning/time/:moduleId
 * -------------------------------------------------------- */
const updateTimeSpent = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { moduleId } = req.params;
  const { timeSpent } = req.body;

  if (!timeSpent || timeSpent < 0) {
    throw new AppError("Invalid time spent value", 400);
  }

  const user = await User.findOne({ clerkUserId });
  if (!user) throw new AppError("User profile not found", 404);

  const progress = await LearningProgress.findOne({
    userId: user._id.toString(),
    moduleId,
  });

  if (!progress)
    throw new AppError("Progress record not found", 404);

  await progress.addTimeSpent(timeSpent);

  return res.status(200).json({
    success: true,
    message: "Time spent updated",
    data: {
      totalTimeSpent: progress.timeSpent,
      addedTime: timeSpent,
    },
  });
});

/* --------------------------------------------------------
 * MODULE LEADERBOARD
 * GET /api/learning/leaderboard/:moduleId
 * -------------------------------------------------------- */
const getModuleLeaderboard = asyncHandler(async (req, res) => {
  const { moduleId } = req.params;
  const { limit = 10 } = req.query;

  const leaderboard = await LearningProgress.getModuleLeaderboard(
    moduleId,
    parseInt(limit)
  );

  const enriched = await Promise.all(
    leaderboard.map(async (entry, index) => {
      const user = await User.findById(entry.userId).select("name school");

      return {
        rank: index + 1,
        userId: entry.userId,
        name: user?.name || "Unknown",
        school: user?.school,
        avgQuizScore: entry.avgQuizScore,
        totalTimeSpent: entry.totalTimeSpent,
        completedAt: entry.completedAt,
      };
    })
  );

  return res.status(200).json({
    success: true,
    data: {
      moduleId,
      leaderboard: enriched,
    },
  });
});

/* --------------------------------------------------------
 * LEARNING STATS
 * GET /api/learning/stats
 * -------------------------------------------------------- */
const getLearningStats = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  const user = await User.findOne({ clerkUserId });
  if (!user) throw new AppError("User profile not found", 404);

  const allProgress = await LearningProgress.find({
    userId: user._id.toString(),
  });

  const totalModules = allProgress.length;
  const completedModules = allProgress.filter(p => p.status === "completed").length;

  const totalTime = allProgress.reduce(
    (acc, p) => acc + p.timeSpent,
    0
  );

  const quizScores = allProgress
    .filter(p => p.quizScore != null)
    .map(p => p.quizScore);

  const avgQuizScore =
    quizScores.length > 0
      ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length
      : 0;

  return res.status(200).json({
    success: true,
    data: {
      totalModules,
      completedModules,
      inProgressModules: totalModules - completedModules,
      completionPercentage:
        totalModules > 0
          ? (completedModules / totalModules) * 100
          : 0,
      totalTimeSpent: totalTime,
      averageQuizScore: Math.round(avgQuizScore * 100) / 100,
    },
  });
});

module.exports = {
  saveProgress,
  getModuleProgress,
  getAllProgress,
  updateTimeSpent,
  getModuleLeaderboard,
  getLearningStats,
};
