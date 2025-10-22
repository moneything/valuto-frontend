const LearningProgress = require('../models/LearningProgress');
const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

/**
 * Learning Progress Controller
 * Handles learning module and lesson progress tracking
 */

/**
 * @desc    Save or update learning progress
 * @route   POST /api/learning/progress
 * @access  Private
 */
const saveProgress = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { moduleId, moduleName, lessonId, lessonName, status, quizScore, timeSpent, quizAnswers } =
    req.body;

  // Get user
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Check if progress already exists
  let progress = await LearningProgress.findOne({
    userId: user._id.toString(),
    moduleId,
    lessonId,
  });

  if (progress) {
    // Update existing progress
    if (status) progress.status = status;
    if (quizScore !== undefined) {
      progress.quizScore = quizScore;
      progress.quizPassed = quizScore >= 70; // 70% passing grade
      progress.quizAttempts += 1;
    }
    if (timeSpent) progress.timeSpent += timeSpent;
    if (quizAnswers) progress.quizAnswers = quizAnswers;

    progress.lastAccessedAt = new Date();

    if (status === 'completed' && !progress.completedAt) {
      progress.completedAt = new Date();

      // Update user's lesson count
      user.lessonsCompleted += 1;
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
      moduleName,
      lessonId,
      lessonName,
      status: status || 'in_progress',
      quizScore,
      quizPassed: quizScore ? quizScore >= 70 : false,
      timeSpent: timeSpent || 0,
      quizAnswers: quizAnswers || [],
    });

    // If already completed, update user count
    if (status === 'completed') {
      user.lessonsCompleted += 1;
      user.updateStreak();
      await user.save();
    }
  }

  res.status(200).json({
    success: true,
    message: 'Progress saved successfully',
    data: progress,
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

  // Find progress
  let progress = await LearningProgress.findOne({
    userId: user._id.toString(),
    moduleId,
    lessonId,
  });

  if (!progress) {
    throw new AppError('Progress record not found', 404);
  }

  // Mark as completed if not already
  if (progress.status !== 'completed') {
    await progress.markCompleted();

    // Update user stats
    user.lessonsCompleted += 1;
    user.updateStreak();
    await user.save();
  }

  res.status(200).json({
    success: true,
    message: 'Lesson marked as completed',
    data: progress,
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
