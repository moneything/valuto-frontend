const { clerkClient, verifyToken } = require('@clerk/clerk-sdk-node');

/**
 * Clerk Authentication Middleware
 * Verifies Clerk JWT tokens (networkless) and attaches user information to request
 */
const authenticateClerkUser = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please provide a valid token.',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing.',
      });
    }

    // Verify the JWT token (networkless verification)
    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      if (!payload || !payload.sub) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired session token.',
        });
      }

      // Attach user information from JWT payload
      req.clerkUser = {
        id: payload.sub,
        email: payload.email,
        firstName: payload.first_name,
        lastName: payload.last_name,
        fullName: `${payload.first_name || ''} ${payload.last_name || ''}`.trim(),
      };

      // 👇 Add this line for compatibility with the controller
      req.auth = {
        userId: payload.sub,
        emailAddress: payload.email,
        firstName: payload.first_name,
        lastName: payload.last_name,
        fullName: `${payload.first_name || ''} ${payload.last_name || ''}`.trim(),
      };


      // Continue to next middleware/controller
      next();
    } catch (clerkError) {
      console.error('Clerk JWT verification error:', clerkError.message);
      return res.status(401).json({
        success: false,
        message: 'Failed to verify authentication token.',
        error: process.env.NODE_ENV === 'development' ? clerkError.message : undefined,
      });
    }
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
    });
  }
};

/**
 * Optional Authentication Middleware
 * Attempts to authenticate but allows request to proceed even if authentication fails
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No auth provided, continue without user info
      req.clerkUser = null;
      return next();
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      req.clerkUser = null;
      return next();
    }

    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      if (payload && payload.sub) {
        req.clerkUser = {
          id: payload.sub,
          email: payload.email,
          firstName: payload.first_name,
          lastName: payload.last_name,
          fullName: `${payload.first_name || ''} ${payload.last_name || ''}`.trim(),
        };
      } else {
        req.clerkUser = null;
      }
    } catch (clerkError) {
      console.error('Optional auth verification failed:', clerkError.message);
      req.clerkUser = null;
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    req.clerkUser = null;
    next();
  }
};

/**
 * Role-based Authorization Middleware
 * Ensures user has required role (student or teacher)
 */
const requireRole = (roles) => {
  return async (req, res, next) => {
    try {
      if (!req.clerkUser) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required.',
        });
      }

      // Get user from database to check role
      const User = require('../models/User');
      const user = await User.findOne({ clerkUserId: req.clerkUser.id });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User profile not found. Please complete onboarding.',
        });
      }

      // Check if user has required role
      const allowedRoles = Array.isArray(roles) ? roles : [roles];

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. This action requires ${allowedRoles.join(' or ')} role.`,
        });
      }

      // Attach database user to request
      req.user = user;

      next();
    } catch (error) {
      console.error('Role authorization error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error checking user permissions.',
      });
    }
  };
};

module.exports = {
  authenticateClerkUser,
  optionalAuth,
  requireRole,
};
