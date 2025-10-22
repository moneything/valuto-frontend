const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

/**
 * User Controller
 * Handles all user-related operations (CRUD, stats, profile management)
 */

/**
 * @desc    Create or sync user profile with Clerk
 * @route   POST /api/user
 * @access  Private
 */
const createOrUpdateUser = asyncHandler(async (req, res) => {
  const { name, email, role, age, school, grade, subject, completedOnboarding } = req.body;
  const clerkUserId = req.clerkUser.id;

  // Check if user already exists
  let user = await User.findOne({ clerkUserId });

  if (user) {
    // Update existing user
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    // Update optional fields only if provided
    if (age !== undefined) user.age = age;
    if (school !== undefined) user.school = school;
    if (grade !== undefined) user.grade = grade;
    if (subject !== undefined) user.subject = subject;
    if (completedOnboarding !== undefined) user.completedOnboarding = completedOnboarding;

    // Update streak on activity
    user.updateStreak();

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: user,
    });
  } else {
    // Create new user
    user = await User.create({
      clerkUserId,
      name: name || req.clerkUser.fullName,
      email: email || req.clerkUser.email,
      role: role || 'student',
      age,
      school,
      grade,
      subject,
      completedOnboarding: completedOnboarding || false,
    });

    return res.status(201).json({
      success: true,
      message: 'User profile created successfully',
      data: user,
    });
  }
});

/**
 * @desc    Get current user profile
 * @route   GET /api/user
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/user
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { name, age, school, grade, subject } = req.body;

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Update fields
  if (name) user.name = name;
  if (age !== undefined) user.age = age;
  if (school !== undefined) user.school = school;
  if (grade !== undefined) user.grade = grade;
  if (subject !== undefined) user.subject = subject;

  // Update activity
  user.updateStreak();

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: user,
  });
});

/**
 * @desc    Get user statistics
 * @route   GET /api/user/stats
 * @access  Private
 */
const getUserStats = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  let user = await User.findOne({ clerkUserId });

  // Auto-create user if doesn't exist
  if (!user) {
    // Fetch full user data from Clerk
    const { clerkClient } = require('@clerk/clerk-sdk-node');
    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    
    user = await User.create({
      clerkUserId,
      name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
      email: clerkUser.emailAddresses[0]?.emailAddress || `user_${clerkUserId}@placeholder.com`,
      role: 'student', // Default role
      completedOnboarding: false,
    });
  }

  // Get additional stats from other models
  const GameResult = require('../models/GameResult');
  const LearningProgress = require('../models/LearningProgress');
  const Challenge = require('../models/Challenge');

  const [gameStats, learningStats, challengeStats] = await Promise.all([
    GameResult.getUserStats(user._id.toString()),
    LearningProgress.getUserProgress(user._id.toString()),
    Challenge.getUserChallengeStats(user._id.toString()),
  ]);

  res.status(200).json({
    success: true,
    data: {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        school: user.school,
        grade: user.grade,
      },
      stats: {
        totalPoints: user.totalPoints,
        gamesPlayed: user.gamesPlayed,
        lessonsCompleted: user.lessonsCompleted,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        achievements: user.achievements.length,
      },
      gameStats,
      learningStats,
      challengeStats,
    },
  });
});

/**
 * @desc    Add points to user
 * @route   POST /api/user/points
 * @access  Private
 */
const addPoints = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { points, source } = req.body;

  if (!points || points < 0) {
    throw new AppError('Invalid points value', 400);
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  user.totalPoints += points;
  user.updateStreak();

  await user.save();

  res.status(200).json({
    success: true,
    message: `${points} points added successfully`,
    data: {
      totalPoints: user.totalPoints,
      pointsAdded: points,
      source,
    },
  });
});

/**
 * @desc    Update user game count
 * @route   POST /api/user/game-played
 * @access  Private
 */
const incrementGameCount = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  user.gamesPlayed += 1;
  user.updateStreak();

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Game count updated',
    data: {
      gamesPlayed: user.gamesPlayed,
    },
  });
});

/**
 * @desc    Update user lesson count
 * @route   POST /api/user/lesson-completed
 * @access  Private
 */
const incrementLessonCount = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  user.lessonsCompleted += 1;
  user.updateStreak();

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Lesson count updated',
    data: {
      lessonsCompleted: user.lessonsCompleted,
    },
  });
});

/**
 * @desc    Add achievement to user
 * @route   POST /api/user/achievement
 * @access  Private
 */
const addAchievement = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;
  const { achievementId } = req.body;

  if (!achievementId) {
    throw new AppError('Achievement ID is required', 400);
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  user.addAchievement(achievementId);
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Achievement unlocked!',
    data: {
      achievementId,
      totalAchievements: user.achievements.length,
    },
  });
});

/**
 * @desc    Delete user account
 * @route   DELETE /api/user
 * @access  Private
 */
const deleteUser = asyncHandler(async (req, res) => {
  const clerkUserId = req.clerkUser.id;

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new AppError('User profile not found', 404);
  }

  // Soft delete by marking as inactive
  user.isActive = false;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User account deactivated successfully',
  });
});

module.exports = {
  createOrUpdateUser,
  getUserProfile,
  updateUserProfile,
  getUserStats,
  addPoints,
  incrementGameCount,
  incrementLessonCount,
  addAchievement,
  deleteUser,
};
