# Socket.IO API Documentation - Real-Time Trivia System

## 🌐 Overview

This document details all Socket.IO events for the Valuto real-time trivia game system. The trivia game follows a Kahoot-style multiplayer format where a teacher hosts a live session and students join to answer questions in real-time.

**Base URL:** `ws://localhost:5000` (development) or `wss://your-domain.com` (production)

---

## 🔐 Authentication

### Connection Authentication

All Socket.IO connections require Clerk authentication. Pass the Clerk session token during connection:

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  auth: {
    token: clerkSessionToken // Required: Clerk session token
  }
});
```

**Authentication Flow:**
1. Client initiates connection with `token` in `auth` object
2. Server verifies token with Clerk
3. On success, attaches user info to socket and allows connection
4. On failure, rejects connection with error

**Socket User Object:**
```typescript
socket.user = {
  id: string;          // Clerk user ID
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
}
```

---

## 🎮 Game Flow

### Overview

```
1. Teacher creates session (REST API or socket event)
2. Teacher joins as host
3. Students join using 6-character code
4. Teacher starts game
5. Server broadcasts questions one by one
6. Students submit answers
7. Server calculates scores and broadcasts leaderboard
8. Repeat until all questions answered
9. Server broadcasts final results and saves to DB
```

---

## 📡 Socket Events

### 1. Connection Events

#### `connect`
**Direction:** Client → Server (automatic)  
**When:** Socket successfully connects and authenticates

**Client Code:**
```javascript
socket.on('connect', () => {
  console.log('Connected:', socket.id);
});
```

---

#### `disconnect`
**Direction:** Client → Server (automatic)  
**When:** Socket disconnects (intentional or connection lost)

**Parameters:**
- `reason` (string): Reason for disconnection

**Server Behavior:**
- Marks player as disconnected in session
- Notifies host if player disconnects during game
- Maintains player data for potential reconnection

**Client Code:**
```javascript
socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});
```

---

### 2. Session Creation & Management

#### `create_session`
**Direction:** Client → Server  
**Who:** Teacher only  
**Purpose:** Create a new trivia game session

**Request Payload:**
```typescript
{
  title: string;                    // Session title
  questions: Array<{
    question: string;               // Question text
    options: string[];              // 4 options
    correctAnswer: number;          // Index of correct answer (0-3)
    timeLimit: number;              // Time limit in seconds (10-120)
    explanation?: string;           // Optional explanation
  }>;
  settings?: {
    pointsPerCorrect?: number;      // Default: 100
    speedBonusEnabled?: boolean;    // Default: true
    maxSpeedBonus?: number;         // Default: 50
  };
}
```

**Response (callback):**
```typescript
{
  success: boolean;
  data?: {
    sessionId: string;              // Unique session ID
    joinCode: string;               // 6-character join code
    title: string;
    questionCount: number;
  };
  error?: string;
}
```

**Example:**
```javascript
socket.emit('create_session', {
  title: 'Introduction to Investing',
  questions: [
    {
      question: 'What is a stock?',
      options: ['A loan', 'Ownership', 'A bond', 'A savings account'],
      correctAnswer: 1,
      timeLimit: 30,
      explanation: 'Stocks represent ownership in a company.'
    }
  ]
}, (response) => {
  if (response.success) {
    console.log('Join Code:', response.data.joinCode);
  }
});
```

---

#### `host_session`
**Direction:** Client → Server  
**Who:** Teacher (session creator)  
**Purpose:** Host joins their created session to control it

**Request Payload:**
```typescript
{
  sessionId: string;                // Session ID to host
}
```

**Response (callback):**
```typescript
{
  success: boolean;
  data?: {
    session: {
      sessionId: string;
      joinCode: string;
      title: string;
      status: 'waiting' | 'active' | 'ended';
      players: Array<{
        userId: string;
        name: string;
        isConnected: boolean;
      }>;
      questionCount: number;
    };
  };
  error?: string;
}
```

**Example:**
```javascript
socket.emit('host_session', {
  sessionId: 'session_123'
}, (response) => {
  if (response.success) {
    console.log('Hosting session:', response.data.session.joinCode);
  }
});
```

---

#### `join_session`
**Direction:** Client → Server  
**Who:** Student  
**Purpose:** Join a trivia session using join code

**Request Payload:**
```typescript
{
  joinCode: string;                 // 6-character code (e.g., 'ABC123')
}
```

**Response (callback):**
```typescript
{
  success: boolean;
  data?: {
    sessionId: string;
    title: string;
    status: 'waiting' | 'active' | 'ended';
    hostName: string;
    playerCount: number;
    questionCount: number;
  };
  error?: string;
}
```

**Server Emits:** `waiting_lobby` to joining player

**Example:**
```javascript
socket.emit('join_session', {
  joinCode: 'ABC123'
}, (response) => {
  if (response.success) {
    console.log('Joined:', response.data.title);
  } else {
    console.error('Failed:', response.error);
  }
});
```

---

### 3. Game State Events

#### `player_joined`
**Direction:** Server → Client (Host only)  
**When:** A new player joins the session  
**Purpose:** Notify host of new participants

**Payload:**
```typescript
{
  userId: string;
  name: string;
  playerCount: number;              // Updated total count
}
```

**Example:**
```javascript
socket.on('player_joined', (data) => {
  console.log(`${data.name} joined! (${data.playerCount} players)`);
  // Update UI to show new player
});
```

---

#### `player_left`
**Direction:** Server → Client (Host only)  
**When:** A player disconnects  
**Purpose:** Notify host of player departure

**Payload:**
```typescript
{
  userId: string;
  playerCount: number;              // Updated total count
}
```

**Example:**
```javascript
socket.on('player_left', (data) => {
  console.log(`Player left. ${data.playerCount} remaining.`);
});
```

---

#### `waiting_lobby`
**Direction:** Server → Client (Player)  
**When:** Player successfully joins session  
**Purpose:** Provide lobby information while waiting for game to start

**Payload:**
```typescript
{
  sessionId: string;
  title: string;
  status: 'waiting' | 'active';
  hostName: string;
  playerCount: number;
  questionCount: number;
}
```

**Example:**
```javascript
socket.on('waiting_lobby', (data) => {
  console.log(`Waiting in: ${data.title}`);
  console.log(`Host: ${data.hostName}`);
  console.log(`Players: ${data.playerCount}`);
});
```

---

### 4. Game Play Events

#### `start_game`
**Direction:** Client → Server  
**Who:** Host only  
**Purpose:** Start the trivia game

**Request Payload:**
```typescript
{
  sessionId: string;
}
```

**Response (callback):**
```typescript
{
  success: boolean;
  error?: string;
}
```

**Server Emits:** `game_started` to all participants

**Example:**
```javascript
socket.emit('start_game', {
  sessionId: 'session_123'
}, (response) => {
  if (response.success) {
    console.log('Game started!');
  }
});
```

---

#### `game_started`
**Direction:** Server → All Clients  
**When:** Host starts the game  
**Purpose:** Notify all players that game is beginning

**Payload:**
```typescript
{
  message: string;                  // 'Game is starting!'
  questionCount: number;
}
```

**Example:**
```javascript
socket.on('game_started', (data) => {
  console.log(data.message);
  // Show countdown animation
  // Prepare to receive first question
});
```

---

#### `new_question`
**Direction:** Server → All Clients  
**When:** New question is broadcast (after game starts or previous question ends)  
**Purpose:** Display question to all players

**Payload:**
```typescript
{
  questionIndex: number;            // 0-based index
  questionNumber: number;           // 1-based number for display
  totalQuestions: number;
  question: {
    id: string;                     // e.g., 'q1'
    question: string;               // Question text
    options: string[];              // 4 answer options
    timeLimit: number;              // Seconds
    points: number;                 // Base points (usually 100)
  };
}
```

**Note:** Correct answer is NOT included (server-authoritative)

**Example:**
```javascript
socket.on('new_question', (data) => {
  console.log(`Question ${data.questionNumber}/${data.totalQuestions}`);
  console.log(data.question.question);
  
  // Display question UI
  // Start client-side timer visualization
  // Enable answer buttons
});
```

---

#### `submit_answer`
**Direction:** Client → Server  
**Who:** Student  
**Purpose:** Submit answer to current question

**Request Payload:**
```typescript
{
  sessionId: string;
  questionId: string;               // From new_question event
  selectedIndex: number;            // 0-3
  timeSpentMs: number;              // Milliseconds taken to answer
}
```

**Response (callback):**
```typescript
{
  success: boolean;
  error?: string;
}
```

**Server Emits:** 
- `answer_result` to submitting player
- `leaderboard_update` to all players

**Example:**
```javascript
const startTime = Date.now();

// User clicks answer
const answerIndex = 2;
const timeSpent = Date.now() - startTime;

socket.emit('submit_answer', {
  sessionId: 'session_123',
  questionId: 'q1',
  selectedIndex: answerIndex,
  timeSpentMs: timeSpent
}, (response) => {
  if (!response.success) {
    console.error('Answer not accepted:', response.error);
  }
});
```

---

#### `answer_result`
**Direction:** Server → Client (Individual player)  
**When:** After player submits answer  
**Purpose:** Provide feedback on submitted answer

**Payload:**
```typescript
{
  isCorrect: boolean;
  correctIndex: number;             // Index of correct answer
  pointsEarned: number;             // Points awarded (0 if incorrect)
  explanation?: string;             // Optional explanation
}
```

**Example:**
```javascript
socket.on('answer_result', (data) => {
  if (data.isCorrect) {
    console.log(`✅ Correct! +${data.pointsEarned} points`);
  } else {
    console.log(`❌ Wrong! Correct answer: ${data.correctIndex}`);
  }
  
  if (data.explanation) {
    console.log(data.explanation);
  }
});
```

---

#### `leaderboard_update`
**Direction:** Server → All Clients  
**When:** After each answer submission  
**Purpose:** Live leaderboard updates

**Payload:**
```typescript
{
  leaderboard: Array<{
    rank: number;                   // 1, 2, 3, etc.
    userId: string;
    name: string;
    score: number;
    correctAnswers: number;
    answeredQuestions: number;
    accuracy: number;               // Percentage
  }>;
}
```

**Example:**
```javascript
socket.on('leaderboard_update', (data) => {
  console.log('Current Rankings:');
  data.leaderboard.forEach(player => {
    console.log(`${player.rank}. ${player.name}: ${player.score} pts`);
  });
  
  // Update leaderboard UI
});
```

---

#### `next_question`
**Direction:** Client → Server  
**Who:** Host only  
**Purpose:** Manually advance to next question

**Request Payload:**
```typescript
{
  sessionId: string;
}
```

**Response (callback):**
```typescript
{
  success: boolean;
  error?: string;
}
```

**Server Emits:** `new_question` to all players after delay

**Note:** Questions auto-advance after time limit + 5 seconds

**Example:**
```javascript
socket.emit('next_question', {
  sessionId: 'session_123'
}, (response) => {
  if (response.success) {
    console.log('Advancing to next question...');
  }
});
```

---

#### `game_over`
**Direction:** Server → All Clients  
**When:** All questions have been answered  
**Purpose:** End game and show final results

**Payload:**
```typescript
{
  leaderboard: Array<{
    rank: number;
    userId: string;
    name: string;
    score: number;
    correctAnswers: number;
    answeredQuestions: number;
    accuracy: number;
  }>;
  sessionId: string;
  title: string;
}
```

**Note:** Results are automatically saved to database

**Example:**
```javascript
socket.on('game_over', (data) => {
  console.log('Game Over!');
  console.log(`Final Rankings for: ${data.title}`);
  
  data.leaderboard.forEach(player => {
    console.log(`${player.rank}. ${player.name}: ${player.score} pts (${player.accuracy}%)`);
  });
  
  // Show final results screen
  // Save sessionId for results API call
});
```

---

### 5. Utility Events

#### `get_leaderboard`
**Direction:** Client → Server  
**Who:** Any participant  
**Purpose:** Request current leaderboard

**Request Payload:**
```typescript
{
  sessionId: string;
}
```

**Response (callback):**
```typescript
{
  success: boolean;
  data?: {
    leaderboard: Array<LeaderboardEntry>;
  };
  error?: string;
}
```

**Example:**
```javascript
socket.emit('get_leaderboard', {
  sessionId: 'session_123'
}, (response) => {
  if (response.success) {
    console.log(response.data.leaderboard);
  }
});
```

---

#### `reconnect_session`
**Direction:** Client → Server  
**Who:** Player who disconnected  
**Purpose:** Rejoin ongoing game after disconnection

**Request Payload:**
```typescript
{
  sessionId: string;
}
```

**Response (callback):**
```typescript
{
  success: boolean;
  data?: {
    status: 'waiting' | 'active' | 'ended';
    currentQuestionIndex: number;
    playerScore: number;
    leaderboard: Array<LeaderboardEntry>;
  };
  error?: string;
}
```

**Example:**
```javascript
socket.emit('reconnect_session', {
  sessionId: storedSessionId
}, (response) => {
  if (response.success) {
    console.log('Reconnected! Your score:', response.data.playerScore);
    // Restore game state based on currentQuestionIndex
  }
});
```

---

#### `end_game`
**Direction:** Client → Server  
**Who:** Host only  
**Purpose:** Manually end game early

**Request Payload:**
```typescript
{
  sessionId: string;
}
```

**Response (callback):**
```typescript
{
  success: boolean;
  error?: string;
}
```

**Server Emits:** `game_over` to all players

**Example:**
```javascript
socket.emit('end_game', {
  sessionId: 'session_123'
}, (response) => {
  if (response.success) {
    console.log('Game ended by host');
  }
});
```

---

## 🎯 Complete Game Flow Example

### Teacher (Host) Flow

```javascript
import { io } from 'socket.io-client';

// 1. Connect with authentication
const socket = io('http://localhost:5000', {
  auth: { token: clerkToken }
});

// 2. Listen for connection
socket.on('connect', () => {
  console.log('Connected as host');
  
  // 3. Create session
  socket.emit('create_session', {
    title: 'Financial Literacy Quiz',
    questions: [/* ... */]
  }, (response) => {
    const { sessionId, joinCode } = response.data;
    console.log('Join Code:', joinCode);
    
    // 4. Join as host
    socket.emit('host_session', { sessionId }, (res) => {
      console.log('Hosting session');
    });
  });
});

// 5. Listen for players joining
socket.on('player_joined', (data) => {
  console.log(`${data.name} joined! (${data.playerCount} total)`);
});

// 6. Start game when ready
function startGame(sessionId) {
  socket.emit('start_game', { sessionId }, (response) => {
    console.log('Game started!');
  });
}

// 7. Monitor leaderboard updates
socket.on('leaderboard_update', (data) => {
  console.log('Live rankings:', data.leaderboard);
});

// 8. Handle game over
socket.on('game_over', (data) => {
  console.log('Final results:', data.leaderboard);
});
```

### Student (Player) Flow

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  auth: { token: clerkToken }
});

// 1. Connect and join
socket.on('connect', () => {
  socket.emit('join_session', {
    joinCode: 'ABC123'
  }, (response) => {
    if (response.success) {
      console.log('Joined!', response.data.title);
    }
  });
});

// 2. Wait in lobby
socket.on('waiting_lobby', (data) => {
  console.log(`Waiting for ${data.hostName} to start...`);
});

// 3. Game starts
socket.on('game_started', () => {
  console.log('Game is starting!');
});

// 4. Receive questions
let questionStartTime;

socket.on('new_question', (data) => {
  console.log(`Q${data.questionNumber}: ${data.question.question}`);
  questionStartTime = Date.now();
  
  // Display question and options
});

// 5. Submit answer
function submitAnswer(questionId, selectedIndex) {
  const timeSpent = Date.now() - questionStartTime;
  
  socket.emit('submit_answer', {
    sessionId: currentSessionId,
    questionId,
    selectedIndex,
    timeSpentMs: timeSpent
  });
}

// 6. Get result
socket.on('answer_result', (data) => {
  if (data.isCorrect) {
    console.log(`✅ Correct! +${data.pointsEarned} pts`);
  } else {
    console.log(`❌ Wrong. Answer: ${data.correctIndex}`);
  }
});

// 7. See live rankings
socket.on('leaderboard_update', (data) => {
  console.log('Current rank:', data.leaderboard);
});

// 8. Game ends
socket.on('game_over', (data) => {
  const myRank = data.leaderboard.find(p => p.userId === myUserId);
  console.log(`You ranked #${myRank.rank}!`);
});
```

---

## ⚡ Real-Time Features

### Server-Authoritative Timing
- Timer runs on server, not client
- Answers submitted after time limit are rejected
- Small buffer (1s) allowed for network latency

### Score Calculation
```
Base Points: 100 (configurable)
Speed Bonus: (time_remaining / time_limit) * 50
Total: base + speed_bonus (if correct)
```

### Auto-Progression
- Questions auto-advance after `timeLimit + 5 seconds`
- Host can manually advance with `next_question`
- Game auto-ends when all questions completed

---

## 🔄 Reconnection Handling

### If Player Disconnects

1. Socket disconnects (connection lost or intentional)
2. Server marks player as `isConnected: false`
3. Player data and score preserved
4. Host notified via `player_left`

### If Player Reconnects

1. Player establishes new socket connection
2. Emit `reconnect_session` with sessionId
3. Server updates socket ID and reconnect status
4. Server sends current game state
5. Player rejoins at current question

**Important:** Store `sessionId` in localStorage for reconnection!

---

## 🛡️ Security & Validation

### Authentication
- ✅ All connections require valid Clerk token
- ✅ Token verified on connection attempt
- ✅ User info attached to socket

### Authorization
- ✅ Only host can start/end game
- ✅ Only host can advance questions
- ✅ Only participants can submit answers

### Validation
- ✅ Answer timestamps validated (reject if too late)
- ✅ Duplicate answers rejected
- ✅ Session status checked before actions
- ✅ Join codes validated

---

## 🚨 Error Handling

All socket events use callbacks for error handling:

```javascript
socket.emit('event_name', payload, (response) => {
  if (!response.success) {
    console.error('Error:', response.error);
    // Handle error (show to user, retry, etc.)
  }
});
```

### Common Errors

| Error | Reason | Solution |
|-------|--------|----------|
| "Session not found" | Invalid join code or sessionId | Verify code, check if expired |
| "Game already started" | Trying to start active game | Check game status first |
| "Answer submitted too late" | Exceeded time limit | Accept as incorrect, inform user |
| "Question already answered" | Duplicate submission | Ignore, show previous result |
| "Only the host can..." | Non-host trying host action | Check user role |
| "Authentication required" | Missing/invalid token | Re-authenticate with Clerk |

---

## 📦 Frontend Integration

### Installation

```bash
npm install socket.io-client
```

### React Hook Example

```typescript
// hooks/useTrivia.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@clerk/nextjs';

export function useTrivia() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { getToken } = useAuth();
  
  useEffect(() => {
    const initSocket = async () => {
      const token = await getToken({ template: "default" }); 
      
      const newSocket = io('http://localhost:5000', {
        auth: { token }
      });
      
      newSocket.on('connect', () => {
        console.log('Connected');
      });
      
      setSocket(newSocket);
    };
    
    initSocket();
    
    return () => {
      socket?.disconnect();
    };
  }, []);
  
  return socket;
}
```

---

## 📊 Testing

### Using Socket.IO Client CLI

```bash
npm install -g socket.io-client-cli

socket.io-client http://localhost:5000 \
  --auth token=your_clerk_token \
  --event join_session \
  --data '{"joinCode":"ABC123"}'
```

### Postman Support

Postman supports WebSocket testing. Configure:
1. New WebSocket Request
2. URL: `ws://localhost:5000`
3. Add auth token to handshake

---

## 📚 Additional Resources

- [Socket.IO Documentation](https://socket.io/docs/)
- [Clerk Authentication](https://clerk.com/docs)
- [MongoDB Sessions](https://www.mongodb.com/docs/)
- [Backend README](./README.md)
- [API Documentation](./API_DOCUMENTATION.md)

---

**Document Version:** 1.0  
**Last Updated:** October 22, 2025  
**Maintained By:** Valuto Backend Team

