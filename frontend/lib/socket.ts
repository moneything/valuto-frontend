/**
 * Socket.IO Client Configuration
 * Handles connection to backend with Clerk authentication
 */

import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

/**
 * Initialize Socket.IO connection
 * Must be called with a valid Clerk session token
 */
export const initSocket = (token: string): Socket => {
  // Disconnect existing socket if any
  if (socket?.connected) {
    socket.disconnect();
  }

  // Create new socket connection
  socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000', {
    auth: {
      token, // Clerk session token
    },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  // Connection event handlers
  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket?.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('❌ Socket disconnected:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('⚠️ Socket connection error:', error.message);
  });

  return socket;
};

/**
 * Get current socket instance
 */
export const getSocket = (): Socket | null => {
  return socket;
};

/**
 * Disconnect socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

