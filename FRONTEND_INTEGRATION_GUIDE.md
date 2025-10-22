# Frontend Integration Guide - Real-Time Trivia

## 📋 Overview

This guide walks you through integrating the completed Socket.IO backend with the Next.js frontend. The backend is **100% complete and production-ready**. Follow these steps to connect the existing trivia UI to the live multiplayer system.

---

## ✅ Pre-Integration Checklist

Before starting, ensure:

- [ ] Backend is running (`cd backend && npm run dev`)
- [ ] Backend shows "🎮 WebSocket: enabled (Socket.IO)"
- [ ] MongoDB is connected
- [ ] Clerk authentication is configured
- [ ] Frontend runs without errors (`cd frontend && npm run dev`)

---

## 🚀 Step-by-Step Integration

### Step 1: Install Dependencies

```bash
cd frontend
npm install socket.io-client
```

**Expected Result:** `socket.io-client` added to `package.json`

---

### Step 2: Create Socket.IO Utility

Create a new file: `frontend/lib/socket.ts`

```typescript
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
```

**Add to `.env.local`:**
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

---

### Step 3: Create React Hook for Trivia

Create: `frontend/lib/hooks/useTrivia.ts`

```typescript
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
  const { getToken } = useAuth();

  useEffect(() => {
    const setupSocket = async () => {
      try {
        const token = await getToken();
        
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
  }, [getToken]);

  return { socket, isConnected };
};
```

---

### Step 4: Update Trivia Hub Page

Modify: `frontend/app/dashboard/trivia/page.tsx`

**Changes Required:**

1. **Import socket hook:**
```typescript
import { useTrivia } from '@/lib/hooks/useTrivia';
import { useState, useEffect } from 'react';
```

2. **Replace mock data with API call:**
```typescript
export default function TriviaHub() {
  const { socket, isConnected } = useTrivia();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch active sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/trivia/sessions', {
          headers: {
            'Authorization': `Bearer ${await getToken()}`,
          },
        });
        const data = await response.json();
        setGames(data.data);
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Rest of component...
}
```

3. **Update join functionality:**
```typescript
const handleJoin = () => {
  if (!socket || !joinCode) return;

  socket.emit('join_session', { joinCode }, (response) => {
    if (response.success) {
      // Store sessionId for reconnection
      localStorage.setItem('currentSessionId', response.data.sessionId);
      
      // Navigate to play page
      router.push(`/dashboard/trivia/play/${joinCode}`);
    } else {
      alert(`Failed to join: ${response.error}`);
    }
  });
};
```

---

### Step 5: Update Create Game Page

Modify: `frontend/app/dashboard/trivia/create/page.tsx`

**Changes:**

1. **Use Socket.IO or REST API:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    // Use REST API to create session
    const response = await fetch('http://localhost:5000/api/trivia/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({
        title: gameTitle,
        questions: questions.map(q => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          timeLimit: q.timeLimit,
        })),
      }),
    });

    const data = await response.json();

    if (data.success) {
      const { sessionId, joinCode } = data.data;
      
      // Store sessionId
      localStorage.setItem('hostingSessionId', sessionId);
      
      // Show join code
      alert(`Game created! Join Code: ${joinCode}`);
      
      // Navigate to host view
      router.push(`/dashboard/trivia/host/${sessionId}`);
    }
  } catch (error) {
    console.error('Failed to create session:', error);
    alert('Failed to create game');
  }
};
```

---

### Step 6: Create Host View (New Page)

Create: `frontend/app/dashboard/trivia/host/[sessionId]/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTrivia } from '@/lib/hooks/useTrivia';

interface Player {
  userId: string;
  name: string;
  isConnected: boolean;
}

export default function HostView() {
  const { sessionId } = useParams();
  const { socket, isConnected } = useTrivia();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Join as host
    socket.emit('host_session', { sessionId }, (response) => {
      if (response.success) {
        setSession(response.data.session);
        setPlayers(response.data.session.players);
      }
    });

    // Listen for players joining
    socket.on('player_joined', (data) => {
      console.log(`${data.name} joined!`);
      // Refresh player list (or update state)
    });

    // Listen for game started
    socket.on('game_started', () => {
      setGameStarted(true);
    });

    return () => {
      socket.off('player_joined');
      socket.off('game_started');
    };
  }, [socket, isConnected, sessionId]);

  const handleStartGame = () => {
    if (!socket) return;

    socket.emit('start_game', { sessionId }, (response) => {
      if (response.success) {
        console.log('Game started!');
      } else {
        alert(`Failed to start: ${response.error}`);
      }
    });
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{session.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-2">Join Code</h2>
        <p className="text-6xl font-mono text-green-600">{session.joinCode}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Players ({players.length})
        </h2>
        {players.map((player) => (
          <div key={player.userId} className="flex items-center gap-2 p-2">
            <div className={`w-3 h-3 rounded-full ${player.isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span>{player.name}</span>
          </div>
        ))}
      </div>

      {!gameStarted && players.length > 0 && (
        <button
          onClick={handleStartGame}
          className="mt-6 bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold"
        >
          Start Game
        </button>
      )}
    </div>
  );
}
```

---

### Step 7: Refactor Play Page (MAJOR UPDATE)

Modify: `frontend/app/dashboard/trivia/play/[code]/page.tsx`

This is the **most complex change**. You need to:

1. **Remove all client-side game state**
2. **Replace with Socket.IO event listeners**
3. **Handle all game events from server**

**Key Changes:**

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTrivia } from '@/lib/hooks/useTrivia';

export default function PlayGame() {
  const { code } = useParams();
  const { socket, isConnected } = useTrivia();
  
  // Game state (from server)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'ended'>('waiting');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [myScore, setMyScore] = useState(0);

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Join session
    socket.emit('join_session', { joinCode: code }, (response) => {
      if (!response.success) {
        alert(`Failed to join: ${response.error}`);
        return;
      }
    });

    // Waiting lobby
    socket.on('waiting_lobby', (data) => {
      console.log('Waiting for host to start...');
      setGameState('waiting');
    });

    // Game started
    socket.on('game_started', () => {
      console.log('Game starting!');
      setGameState('playing');
    });

    // New question received
    socket.on('new_question', (data) => {
      setCurrentQuestion(data.question);
      setTimeLeft(data.question.timeLimit);
      setSelectedAnswer(null);
      setShowResult(false);
      
      // Start client timer (visual only)
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = data.question.timeLimit - elapsed;
        setTimeLeft(Math.max(0, remaining));
        
        if (remaining <= 0) {
          clearInterval(interval);
        }
      }, 100);
    });

    // Answer result
    socket.on('answer_result', (data) => {
      setResult(data);
      setShowResult(true);
      
      if (data.isCorrect) {
        setMyScore(prev => prev + data.pointsEarned);
      }
    });

    // Leaderboard update
    socket.on('leaderboard_update', (data) => {
      setLeaderboard(data.leaderboard);
    });

    // Game over
    socket.on('game_over', (data) => {
      setGameState('ended');
      setLeaderboard(data.leaderboard);
    });

    return () => {
      socket.off('waiting_lobby');
      socket.off('game_started');
      socket.off('new_question');
      socket.off('answer_result');
      socket.off('leaderboard_update');
      socket.off('game_over');
    };
  }, [socket, isConnected, code]);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null || !socket) return;
    
    setSelectedAnswer(index);
    
    const timeSpent = (currentQuestion.timeLimit - timeLeft) * 1000;
    
    socket.emit('submit_answer', {
      sessionId: localStorage.getItem('currentSessionId'),
      questionId: currentQuestion.id,
      selectedIndex: index,
      timeSpentMs: timeSpent,
    }, (response) => {
      if (!response.success) {
        console.error('Answer not accepted:', response.error);
      }
    });
  };

  // Render different views based on game state
  if (gameState === 'waiting') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Waiting for host...</h1>
          <div className="animate-pulse text-2xl">⏳</div>
        </div>
      </div>
    );
  }

  if (gameState === 'ended') {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6">Game Over!</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Final Results</h2>
          {leaderboard.map((player, index) => (
            <div key={player.userId} className="flex justify-between p-3 border-b">
              <span>#{player.rank} {player.name}</span>
              <span className="font-bold">{player.score} pts</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Playing state
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-8">
      {currentQuestion && (
        <div className="max-w-4xl mx-auto">
          {/* Timer */}
          <div className="mb-6 text-center">
            <div className={`text-6xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
              {timeLeft}s
            </div>
          </div>

          {/* Question */}
          <div className="bg-white p-8 rounded-lg shadow-2xl mb-6">
            <h2 className="text-3xl font-bold mb-6">{currentQuestion.question}</h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`p-6 rounded-lg text-xl font-bold transition-all ${
                  selectedAnswer === index
                    ? result?.isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-white hover:scale-105'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Result Feedback */}
          {showResult && (
            <div className="mt-6 text-center text-white">
              <div className="text-4xl mb-2">
                {result.isCorrect ? '✅ Correct!' : '❌ Wrong'}
              </div>
              <div className="text-2xl">
                +{result.pointsEarned} points
              </div>
            </div>
          )}

          {/* Mini Leaderboard */}
          <div className="mt-8 bg-white p-4 rounded-lg">
            <h3 className="font-bold mb-2">Live Rankings</h3>
            {leaderboard.slice(0, 5).map((player) => (
              <div key={player.userId} className="flex justify-between text-sm">
                <span>#{player.rank} {player.name}</span>
                <span>{player.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 🧪 Testing the Integration

### Test 1: Connection
1. Start backend: `npm run dev` (in backend)
2. Start frontend: `npm run dev` (in frontend)
3. Login to frontend
4. Navigate to `/dashboard/trivia`
5. Check browser console: Should see "✅ Socket connected"

### Test 2: Create Game (Teacher)
1. Click "Create New Game"
2. Fill in title and questions
3. Submit form
4. Should receive join code (e.g., "ABC123")
5. Should navigate to host view

### Test 3: Join Game (Student)
1. Enter join code on trivia hub
2. Click "Join Game"
3. Should navigate to waiting lobby
4. Should see "Waiting for host..."

### Test 4: Play Game
1. Host clicks "Start Game"
2. All players see "Game starting!"
3. First question appears on all screens
4. Players submit answers
5. Live leaderboard updates
6. Questions auto-advance
7. Final results shown

---

## 🐛 Common Issues & Solutions

### Issue: "Socket not connecting"
**Solution:** Check Clerk token, ensure backend is running, verify CORS settings

### Issue: "Players not seeing each other"
**Solution:** Verify all players joined same sessionId, check socket rooms

### Issue: "Answers not being accepted"
**Solution:** Check time validation, ensure session is 'active', verify socket connection

### Issue: "Questions not broadcasting"
**Solution:** Check host permissions, verify session started, check server logs

---

## 📚 Additional Resources

- **Backend Socket API:** `backend/SOCKETS-API.md`
- **Frontend Discovery:** `trivia-overview.md`
- **Implementation Summary:** `REAL-TIME_TRIVIA_IMPLEMENTATION.md`

---

## ✅ Integration Complete Checklist

- [ ] Socket.IO client installed
- [ ] Socket utility created (`lib/socket.ts`)
- [ ] useTrivia hook created
- [ ] Environment variables configured
- [ ] Trivia hub updated (fetch sessions)
- [ ] Create game page updated (API integration)
- [ ] Host view page created
- [ ] Play page refactored (full socket integration)
- [ ] Tested: Connection
- [ ] Tested: Create game
- [ ] Tested: Join game
- [ ] Tested: Play game end-to-end
- [ ] Tested: Multiplayer (2+ students)
- [ ] Tested: Reconnection
- [ ] Tested: Game end and results

**When all checked:** Your real-time trivia system is fully operational! 🎉

---

**Good luck with the integration! The backend is rock-solid and ready for you.** 💪

