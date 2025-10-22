const { verifyToken } = require('@clerk/clerk-sdk-node');

/**
 * Socket.IO Authentication Middleware
 * Verifies Clerk JWT tokens on socket connection (networkless)
 */
const socketAuthMiddleware = async (socket, next) => {
  try {
    // Get token from handshake auth
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication token required'));
    }

    // Verify JWT token (networkless verification)
    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      if (!payload || !payload.sub) {
        return next(new Error('Invalid or expired session token'));
      }

      // Attach user info from JWT payload to socket
      socket.user = {
        id: payload.sub,
        email: payload.email,
        firstName: payload.first_name,
        lastName: payload.last_name,
        fullName: `${payload.first_name || ''} ${payload.last_name || ''}`.trim(),
      };

      // Continue with connection
      next();
    } catch (clerkError) {
      console.error('Socket auth - JWT verification error:', clerkError.message);
      return next(new Error('Failed to verify authentication token'));
    }
  } catch (error) {
    console.error('Socket auth - General error:', error);
    return next(new Error('Authentication failed'));
  }
};

module.exports = socketAuthMiddleware;
