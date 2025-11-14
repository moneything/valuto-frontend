const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

/**
 * User Controller
 * Handles all user-related operations (CRUD, stats, profile management)
 */

/**
 * @desc Ensure user exists after Clerk login
 * @route GET /api/users/me
 * @access Private
 */
const getOrCreateUser = asyncHandler(async (req, res) => {
  const { userId, emailAddress } = req.auth;

  const user = await User.findOneAndUpdate(
    { clerkUserId: userId },
    {
      clerkUserId: userId,
      email: emailAddress,
      isActive: true,
      lastActiveDate: new Date(),
    },
    { new: true, upsert: true }
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc Complete onboarding (update role, school, etc.)
 * @route POST /api/users/onboarding
 * @access Private
 */
const completeOnboarding = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const updates = req.body;

  const user = await User.findOneAndUpdate(
    { clerkUserId: userId },
    {
      ...updates,
      completedOnboarding: true,
      updatedAt: new Date(),
    },
    { new: true }
  );

  if (!user) throw new AppError('User not found', 404);

  res.status(200).json({
    success: true,
    message: 'Onboarding completed successfully',
    data: user,
  });
});

/**
 * @desc Create or update user profile (generic sync)
 * @route POST /api/user
 * @access Private
 */
const createOrUpdateUser = asyncHandler(async (req, res) => {
  const { name, email, role, age, school, grade, subject, completedOnboarding } = req.body;
  const { userId } = req.auth;

  let user = await User.findOne({ clerkUserId: userId });

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    if (age !== undefined) user.age = age;
    if (school !== undefined) user.school = school;
    if (grade !== undefined) user.grade = grade;
    if (subject !== undefined) user.subject = subject;
    if (completedOnboarding !== undefined) user.completedOnboarding = completedOnboarding;
    user.updateStreak();

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: user,
    });
  } else {
    user = await User.create({
      clerkUserId: userId,
      name,
      email,
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
 * @desc Get current user profile
 * @route GET /api/user
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const user = await User.findOne({ clerkUserId: userId });

  if (!user) throw new AppError('User profile not found', 404);

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc Update user profile
 * @route PUT /api/user
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const { name, age, school, grade, subject } = req.body;

  const user = await User.findOne({ clerkUserId: userId });
  if (!user) throw new AppError('User profile not found', 404);

  if (name) user.name = name;
  if (age !== undefined) user.age = age;
  if (school !== undefined) user.school = school;
  if (grade !== undefined) user.grade = grade;
  if (subject !== undefined) user.subject = subject;
  user.updateStreak();

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: user,
  });
});

/**
 * @desc Get user statistics
 * @route GET /api/user/stats
 * @access Private
 */
const getUserStats = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  let user = await User.findOne({ clerkUserId: userId });

  // Auto-create user if missing
  if (!user) {
    const { clerkClient } = require('@clerk/clerk-sdk-node');
    const clerkUser = await clerkClient.users.getUser(userId);

    user = await User.create({
      clerkUserId: userId,
      name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
      email: clerkUser.emailAddresses[0]?.emailAddress || `user_${userId}@placeholder.com`,
      role: 'student',
      completedOnboarding: false,
    });
  }

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
 * @desc Add points to user
 * @route POST /api/user/points
 * @access Private
 */
const addPoints = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const { points, source } = req.body;

  if (!points || points < 0) throw new AppError('Invalid points value', 400);

  const user = await User.findOne({ clerkUserId: userId });
  if (!user) throw new AppError('User profile not found', 404);

  user.totalPoints += points;
  user.updateStreak();

  await user.save();

  res.status(200).json({
    success: true,
    message: `${points} points added successfully`,
    data: { totalPoints: user.totalPoints, pointsAdded: points, source },
  });
});

/**
 * @desc Increment game count
 * @route POST /api/user/game-played
 * @access Private
 */
const incrementGameCount = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const user = await User.findOne({ clerkUserId: userId });
  if (!user) throw new AppError('User profile not found', 404);

  user.gamesPlayed += 1;
  user.updateStreak();
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Game count updated',
    data: { gamesPlayed: user.gamesPlayed },
  });
});

/**
 * @desc Increment lesson count
 * @route POST /api/user/lesson-completed
 * @access Private
 */
const incrementLessonCount = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const user = await User.findOne({ clerkUserId: userId });
  if (!user) throw new AppError('User profile not found', 404);

  user.lessonsCompleted += 1;
  user.updateStreak();
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Lesson count updated',
    data: { lessonsCompleted: user.lessonsCompleted },
  });
});

/**
 * @desc Add achievement to user
 * @route POST /api/user/achievement
 * @access Private
 */
const addAchievement = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const { achievementId } = req.body;
  if (!achievementId) throw new AppError('Achievement ID is required', 400);

  const user = await User.findOne({ clerkUserId: userId });
  if (!user) throw new AppError('User profile not found', 404);

  user.addAchievement(achievementId);
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Achievement unlocked!',
    data: { achievementId, totalAchievements: user.achievements.length },
  });
});

/**
 * @desc Get achievements
 * @route GET /api/user/achievements
 * @access Private
 */
const getAchievements = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const user = await User.findOne({ clerkUserId: userId });
  if (!user) throw new AppError('User profile not found', 404);

  const achievements = user.achievements.map((a) => ({
    achievementId: a.achievementId,
    unlockedAt: a.unlockedAt,
    icon: getAchievementIcon(a.achievementId),
    title: getAchievementTitle(a.achievementId),
    description: getAchievementDescription(a.achievementId),
    unlocked: true,
  }));

  res.status(200).json({ success: true, data: achievements });
});

/**
 * @desc Get activity summary
 * @route GET /api/user/activity
 * @access Private
 */
const getActivity = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const { limit = 10 } = req.query;
  const user = await User.findOne({ clerkUserId: userId });
  if (!user) throw new AppError('User profile not found', 404);

  const activity = [];

  if (user.lessonsCompleted > 0)
    activity.push({
      type: 'lesson',
      title: `Completed ${user.lessonsCompleted} learning module${user.lessonsCompleted > 1 ? 's' : ''}`,
      date: user.lastActiveDate || user.updatedAt,
      points: 0,
    });

  if (user.gamesPlayed > 0)
    activity.push({
      type: 'game',
      title: `Played ${user.gamesPlayed} trivia game${user.gamesPlayed > 1 ? 's' : ''}`,
      date: user.lastActiveDate || user.updatedAt,
      points: 0,
    });

  user.achievements.slice(0, parseInt(limit)).forEach((a) =>
    activity.push({
      type: 'achievement',
      title: `Unlocked "${getAchievementTitle(a.achievementId)}"`,
      date: a.unlockedAt,
      points: 10,
    })
  );

  activity.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.status(200).json({ success: true, data: activity.slice(0, limit) });
});

// Metadata helpers
function getAchievementIcon(id) {
  const icons = {
    first_game: '🏆',
    knowledge_seeker: '📚',
    investment_pro: '💰',
    on_fire: '🔥',
    perfect_score: '⭐',
    top_student: '👑',
  };
  return icons[id] || '🎯';
}
function getAchievementTitle(id) {
  const titles = {
    first_game: 'First Game',
    knowledge_seeker: 'Knowledge Seeker',
    investment_pro: 'Investment Pro',
    on_fire: 'On Fire!',
    perfect_score: 'Perfect Score',
    top_student: 'Top Student',
  };
  return titles[id] || 'Achievement';
}
function getAchievementDescription(id) {
  const descriptions = {
    first_game: 'Play your first trivia game',
    knowledge_seeker: 'Complete 5 learning modules',
    investment_pro: 'Reach 1000 total points',
    on_fire: 'Maintain a 7-day streak',
    perfect_score: 'Get 100% on a trivia game',
    top_student: 'Reach #1 on leaderboard',
  };
  return descriptions[id] || 'Complete a special task';
}

/**
 * @desc Soft delete user account
 * @route DELETE /api/user
 * @access Private
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const user = await User.findOne({ clerkUserId: userId });
  if (!user) throw new AppError('User profile not found', 404);

  user.isActive = false;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User account deactivated successfully',
  });
});


/**
 * @desc Get user statistics by database ID (for teachers/admins)
 * @route GET /api/user/:id/stats
 * @access Private (Teacher/Admin only)
 */
const getUserStatsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const clerkUserId = req.clerkUser?.id; // auth context

  const requestingUser = await User.findOne({ clerkUserId });
  if (!requestingUser || requestingUser.role !== "teacher") {
    throw new AppError("Only teachers can view student stats", 403);
  }

  const targetUser = await User.findById(id);
  if (!targetUser) throw new AppError("Student not found", 404);

  const GameResult = require("../models/GameResult");
  const LearningProgress = require("../models/LearningProgress");
  const Challenge = require("../models/Challenge");

  const [gameStats, learningStats, challengeStats] = await Promise.all([
    GameResult.getUserStats(targetUser._id.toString()),
    LearningProgress.getUserProgress(targetUser._id.toString()),
    Challenge.getUserChallengeStats(targetUser._id.toString()),
  ]);

  res.status(200).json({
    success: true,
    data: {
      user: {
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        school: targetUser.school,
        grade: targetUser.grade,
      },
      stats: {
        totalPoints: targetUser.totalPoints,
        gamesPlayed: targetUser.gamesPlayed,
        lessonsCompleted: targetUser.lessonsCompleted,
        currentStreak: targetUser.currentStreak,
        longestStreak: targetUser.longestStreak,
      },
      gameStats,
      learningStats,
      challengeStats,
    },
  });
});


module.exports = {
  getOrCreateUser,
  completeOnboarding,
  createOrUpdateUser,
  getUserProfile,
  updateUserProfile,
  getUserStats,
  getUserStatsById,
  addPoints,
  incrementGameCount,
  incrementLessonCount,
  addAchievement,
  getAchievements,
  getActivity,
  deleteUser,
};
