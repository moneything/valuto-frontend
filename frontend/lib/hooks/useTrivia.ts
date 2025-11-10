/**
 * React Hook for Trivia Game
 * Provides socket connection with Clerk auth
 */

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Socket } from 'socket.io-client';
import { initSocket, disconnectSocket } from '../socket';

export const useTrivia = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    const setupSocket = async () => {
      try {
        const token = await getToken({ template: "default" });

        
        if (!token) {
          console.error('No Clerk token available');
          return;
        }

        const newSocket = initSocket(token);
        
        newSocket.on('connect', () => {
          setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
          setIsConnected(false);
        });

        setSocket(newSocket);
      } catch (error) {
        console.error('Failed to setup socket:', error);
      }
    };

    setupSocket();

    return () => {
      disconnectSocket();
      setIsConnected(false);
    };
  }, [getToken, isSignedIn]);

  return { socket, isConnected };
};

