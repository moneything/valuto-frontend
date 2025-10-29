const LearningProgress = require('../models/LearningProgress');
const LearningModule = require('../models/LearningModule');
const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

/**
 * Learning Progress Controller
 * Handles learning module and lesson progress tracking
 */

/**
 * @desc    Save or update learning progress (for module completion)
 * @route   POST /api/learning/progress
 * @access  Private
 */
const saveProgress = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { 
    moduleId, 
    moduleName, 
    lessonId, 
    lessonName, 
    status, 
    quizScore, 
    timeSpent, 
    quizAnswers,
    activityType,
    responses,
    simulationResult,
    scenarioResults,
    sessionData
  } = req.body;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Get module to check points
  // Try to find by _id first (ObjectId), then fall back to string id search
  let module = await LearningModule.findById(moduleId).catch(() => null);
  if (!module) {
    // If not found by ObjectId, try finding by _id as string
    module = await LearningModule.findOne({ _id: moduleId });
  }
  if (!module) {
    throw new AppError('Learning module not found', 404);
  }

  // For new frontend format (complete module activity)
  // Treat the whole module as one "lesson"
  const effectiveLessonId = lessonId || `${moduleId}_main`;
  const effectiveLessonName = lessonName || module.title;
  const effectiveModuleName = moduleName || module.title;

  // Calculate score based on activity type
  let calculatedScore = quizScore;
  if (!calculatedScore && responses && Array.isArray(responses)) {
    // Quiz activity
    const correctAnswers = responses.filter(r => r.isCorrect).length;
    calculatedScore = responses.length > 0 ? Math.round((correctAnswers / responses.length) * 100) : 0;
  } else if (!calculatedScore && simulationResult) {
    // Simulation activity
    calculatedScore = simulationResult.finalScore || simulationResult.score || 0;
  } else if (!calculatedScore && scenarioResults) {
    // Scenario activity
    const totalScenarios = scenarioResults.length;
    const optimalChoices = scenarioResults.filter(r => r.isOptimal).length;
    calculatedScore = totalScenarios > 0 ? Math.round((optimalChoices / totalScenarios) * 100) : 0;
  }

  // Determine if completed (score >= 70% or explicitly set)
  const isCompleted = status === 'completed' || (calculatedScore && calculatedScore >= 70);
  const effectiveStatus = isCompleted ? 'completed' : (status || 'in_progress');

  // Check if progress already exists
  let progress = await LearningProgress.findOne({
    userId: user._id.toString(),
    moduleId,
    lessonId: effectiveLessonId,
  });

  let pointsEarned = 0;
  let isNewCompletion = false;

  if (progress) {
    // Update existing progress
    if (effectiveStatus) progress.status = effectiveStatus;
    if (calculatedScore !== undefined) {
      progress.quizScore = calculatedScore;
      progress.quizPassed = calculatedScore >= 70;
      progress.quizAttempts += 1;
    }
    if (timeSpent || sessionData?.totalTime) {
      progress.timeSpent += (timeSpent || sessionData?.totalTime || 0);
    }
    if (quizAnswers) progress.quizAnswers = quizAnswers;

    progress.lastAccessedAt = new Date();

    // Award points on first completion only
    if (effectiveStatus === 'completed' && !progress.completedAt) {
      progress.completedAt = new Date();
      isNewCompletion = true;

      // Calculate points earned based on performance
      const basePoints = module.points || 100;
      if (calculatedScore >= 90) {
        pointsEarned = basePoints; // Full points for excellent performance
      } else if (calculatedScore >= 80) {
        pointsEarned = Math.round(basePoints * 0.9); // 90% for good performance
      } else if (calculatedScore >= 70) {
        pointsEarned = Math.round(basePoints * 0.8); // 80% for passing
      }

      // Update user stats
      user.lessonsCompleted += 1;
      user.totalPoints += pointsEarned;
      user.updateStreak();
      await user.save();
    }

    await progress.save();
  } else {
    // Create new progress
    progress = await LearningProgress.create({
      userId: user._id.toString(),
      clerkUserId,
      moduleId,
      moduleName: effectiveModuleName,
      lessonId: effectiveLessonId,
      lessonName: effectiveLessonName,
      status: effectiveStatus,
      quizScore: calculatedScore,
      quizPassed: calculatedScore ? calculatedScore >= 70 : false,
      timeSpent: timeSpent || sessionData?.totalTime || 0,
      quizAnswers: quizAnswers || [],
    });

    // Award points if completed on first attempt
    if (effectiveStatus === 'completed') {
      isNewCompletion = true;
      const basePoints = module.points || 100;
      if (calculatedScore >= 90) {
        pointsEarned = basePoints;
      } else if (calculatedScore >= 80) {
        pointsEarned = Math.round(basePoints * 0.9);
      } else if (calculatedScore >= 70) {
        pointsEarned = Math.round(basePoints * 0.8);
      }

      user.lessonsCompleted += 1;
      user.totalPoints += pointsEarned;
      user.updateStreak();
      await user.save();
    }
  }

  res.status(200).json({
    success: true,
    message: 'Progress saved successfully',
    data: progress,
    pointsEarned: isNewCompletion ? pointsEarned : 0,
    totalPoints: user.totalPoints,
    lessonsCompleted: user.lessonsCompleted,
  });
});

/**
 * @desc    Get user's progress for a specific module
 * @route   GET /api/learning/progress/:moduleId
 * @access  Private
 */
const getModuleProgress = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { moduleId } = req.params;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Get module summary
  const summary = await LearningProgress.getModuleSummary(user._id.toString(), moduleId);

  res.status(200).json({
    success: true,
    data: summary,
  });
});

/**
 * @desc    Get all user's learning progress
 * @route   GET /api/learning/progress
 * @access  Private
 */
const getAllProgress = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Get all progress grouped by module
  const progress = await LearningProgress.getUserProgress(user._id.toString());

  res.status(200).json({
    success: true,
    data: progress,
  });
});

/**
 * @desc    Mark lesson as completed
 * @route   PUT /api/learning/complete/:moduleId/:lessonId
 * @access  Private
 */
const markLessonCompleted = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { moduleId, lessonId } = req.params;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Get module to check points
  // Try to find by _id first (ObjectId), then fall back to string id search
  let module = await LearningModule.findById(moduleId).catch(() => null);
  if (!module) {
    // If not found by ObjectId, try finding by _id as string
    module = await LearningModule.findOne({ _id: moduleId });
  }
  if (!module) {
    throw new AppError('Learning module not found', 404);
  }

  // Find progress
  let progress = await LearningProgress.findOne({
    userId: user._id.toString(),
    moduleId,
    lessonId,
  });

  if (!progress) {
    throw new AppError('Progress record not found', 404);
  }

  let pointsEarned = 0;

  // Mark as completed if not already
  if (progress.status !== 'completed') {
    await progress.markCompleted();

    // Award points based on quiz score
    const basePoints = module.points || 100;
    const score = progress.quizScore || 70; // Default to minimum passing if no score
    
    if (score >= 90) {
      pointsEarned = basePoints;
    } else if (score >= 80) {
      pointsEarned = Math.round(basePoints * 0.9);
    } else if (score >= 70) {
      pointsEarned = Math.round(basePoints * 0.8);
    }

    // Update user stats
    user.lessonsCompleted += 1;
    user.totalPoints += pointsEarned;
    user.updateStreak();
    await user.save();
  }

  res.status(200).json({
    success: true,
    message: 'Lesson marked as completed',
    data: progress,
    pointsEarned,
    totalPoints: user.totalPoints,
    lessonsCompleted: user.lessonsCompleted,
  });
});

/**
 * @desc    Update time spent on lesson
 * @route   PUT /api/learning/time/:moduleId/:lessonId
 * @access  Private
 */
const updateTimeSpent = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { moduleId, lessonId } = req.params;
  const { timeSpent } = req.body;

  if (!timeSpent || timeSpent < 0) {
    throw new AppError('Invalid time spent value', 400);
  }

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Find progress
  let progress = await LearningProgress.findOne({
    userId: user._id.toString(),
    moduleId,
    lessonId,
  });

  if (!progress) {
    throw new AppError('Progress record not found', 404);
  }

  await progress.addTimeSpent(timeSpent);

  res.status(200).json({
    success: true,
    message: 'Time spent updated',
    data: {
      totalTimeSpent: progress.timeSpent,
      addedTime: timeSpent,
    },
  });
});

/**
 * @desc    Get module leaderboard
 * @route   GET /api/learning/leaderboard/:moduleId
 * @access  Public
 */
const getModuleLeaderboard = asyncHandler(async (req, res) => {
  const { moduleId } = req.params;
  const { limit = 10 } = req.query;

  const leaderboard = await LearningProgress.getModuleLeaderboard(moduleId, parseInt(limit));

  // Enrich with user names
  const enrichedLeaderboard = await Promise.all(
    leaderboard.map(async (entry, index) => {
      const user = await User.findById(entry._id).select('name school');
      return {
        rank: index + 1,
        userId: entry._id,
        name: user?.name || 'Unknown',
        school: user?.school,
        lessonsCompleted: entry.lessonsCompleted,
        avgQuizScore: Math.round(entry.avgQuizScore * 100) / 100,
        totalTimeSpent: entry.totalTimeSpent,
        completedAt: entry.completedAt,
      };
    })
  );

  res.status(200).json({
    success: true,
    data: {
      moduleId,
      leaderboard: enrichedLeaderboard,
    },
  });
});

/**
 * @desc    Get learning statistics
 * @route   GET /api/learning/stats
 * @access  Private
 */
const getLearningStats = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Get all progress
  const allProgress = await LearningProgress.find({
    userId: user._id.toString(),
  });

  // Calculate stats
  const totalLessons = allProgress.length;
  const completedLessons = allProgress.filter((p) => p.status === 'completed').length;
  const inProgressLessons = allProgress.filter((p) => p.status === 'in_progress').length;
  const totalTimeSpent = allProgress.reduce((acc, p) => acc + p.timeSpent, 0);
  const averageQuizScore =
    allProgress.filter((p) => p.quizScore != null).reduce((acc, p) => acc + p.quizScore, 0) /
      allProgress.filter((p) => p.quizScore != null).length || 0;

  // Get unique modules
  const uniqueModules = [...new Set(allProgress.map((p) => p.moduleId))];

  res.status(200).json({
    success: true,
    data: {
      totalLessons,
      completedLessons,
      inProgressLessons,
      completionPercentage: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
      totalTimeSpent,
      averageQuizScore: Math.round(averageQuizScore * 100) / 100,
      modulesStarted: uniqueModules.length,
    },
  });
});

module.exports = {
  saveProgress,
  getModuleProgress,
  getAllProgress,
  markLessonCompleted,
  updateTimeSpent,
  getModuleLeaderboard,
  getLearningStats,
};
