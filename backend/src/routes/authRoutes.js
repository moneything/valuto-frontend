const express = require('express');
const router = express.Router();
const { clerkClient } = require('@clerk/clerk-sdk-node');
const { authenticateClerkUser } = require('../middleware/auth');
const { asyncHandler } = require('../utils/errorHandler');

/**
 * Authentication Routes
 * Handles Clerk authentication verification
 */

/**
 * @route   POST /api/auth/verify
 * @desc    Verify Clerk session token and return user info
 * @access  Public (but requires valid token)
 */
router.post(
  '/verify',
  authenticateClerkUser,
  asyncHandler(async (req, res) => {
    // User is already authenticated by middleware
    const clerkUser = req.clerkUser;

    res.status(200).json({
      success: true,
      message: 'Token verified successfully',
      data: {
        userId: clerkUser.id,
        email: clerkUser.email,
        name: clerkUser.fullName,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
      },
    });
  })
);

/**
 * @route   GET /api/auth/session
 * @desc    Get current session information
 * @access  Private
 */
router.get(
  '/session',
  authenticateClerkUser,
  asyncHandler(async (req, res) => {
    const clerkUser = req.clerkUser;

    // Get additional user details from Clerk
    const user = await clerkClient.users.getUser(clerkUser.id);

    res.status(200).json({
      success: true,
      data: {
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
        createdAt: user.createdAt,
        lastSignInAt: user.lastSignInAt,
      },
    });
  })
);

/**
 * @route   GET /api/auth/health
 * @desc    Health check for auth service
 * @access  Public
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Authentication service is operational',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
