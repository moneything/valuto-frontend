# Socket.IO API - Real-Time Trivia

This document reflects the current Socket.IO trivia implementation in `backend/src/sockets/triviaSocketHandlers.js` and `backend/src/controllers/triviaGameController.js`.

## Base URL

- Development: `ws://localhost:5000`
- Production: `wss://your-domain.com`

## Authentication

The Socket.IO server requires a Clerk session JWT on connection.

```ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  auth: {
    token: clerkSessionToken,
  },
});
```

On success, the server attaches:

```ts
socket.user = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
};
```

## Client → Server Events

All client events accept an optional callback. When provided, the server returns:

```json
{ "success": true, "data": { ... } }
```

or

```json
{ "success": false, "error": "..." }
```

### `create_session`

Create a new trivia session (host only).

Payload:

```ts
{
  title: string;
  questions: Array<{
    question: string;
    options: string[]; // length 4
    correctAnswer: number; // 0-3
    timeLimit?: number; // seconds
    explanation?: string;
  }>;
  settings?: {
    pointsPerCorrect?: number;
    speedBonusEnabled?: boolean;
    maxSpeedBonus?: number;
  };
}
```

Callback data:

```ts
{ sessionId: string; joinCode: string; title: string; questionCount: number; }
```

### `host_session`

Host joins their session and receives current players.

Payload:

```ts
{ sessionId: string }
```

Callback data:

```ts
{
  session: {
    sessionId: string;
    joinCode: string;
    title: string;
    status: 'waiting' | 'active' | 'ended';
    players: Array<{ userId: string; name: string; isConnected: boolean }>;
    questionCount: number;
  }
}
```

### `join_session`

Join by 6-character code.

Payload:

```ts
{ joinCode: string }
```

Callback data and `waiting_lobby` payload:

```ts
{
  sessionId: string;
  title: string;
  status: 'waiting' | 'active';
  hostName: string;
  playerCount: number;
  questionCount: number;
}
```

### `start_game`

Host starts the game.

Payload:

```ts
{ sessionId: string }
```

### `submit_answer`

Submit an answer for the current question.

Payload:

```ts
{
  sessionId: string;
  questionId: string;
  selectedIndex: number;
  timeSpentMs: number;
}
```

### `next_question`

Host advances to the next question.

Payload:

```ts
{ sessionId: string }
```

### `end_game`

Host ends the game early.

Payload:

```ts
{ sessionId: string }
```

### `get_leaderboard`

Fetch current leaderboard.

Payload:

```ts
{ sessionId: string }
```

Callback data:

```ts
{ leaderboard: Array<{ userId: string; name: string; score: number; rank: number }> }
```

### `reconnect_session`

Reconnect a player to an active session.

Payload:

```ts
{ sessionId: string }
```

Callback data:

```ts
{
  status: 'waiting' | 'active' | 'ended';
  currentQuestionIndex: number;
  playerScore: number;
  leaderboard: Array<{ userId: string; name: string; score: number; rank: number }>;
}
```

## Server → Client Events

### `waiting_lobby`

Sent to a player after joining.

Payload matches the `join_session` callback data.

### `player_joined`

Sent to the host when a player joins.

```ts
{ userId: string; name: string; playerCount: number }
```

### `player_left`

Sent to the host when a player disconnects.

```ts
{ userId: string; name: string; playerCount: number }
```

### `game_started`

Sent to all players when the host starts the game.

```ts
{ message: string; questionCount: number }
```

### `new_question`

Broadcasts the current question.

```ts
{
  questionIndex: number;
  questionNumber: number;
  totalQuestions: number;
  question: {
    id: string;
    question: string;
    options: string[];
    timeLimit: number;
    points: number;
  };
}
```

### `answer_result`

Sent to the player after `submit_answer`.

```ts
{ isCorrect: boolean; correctIndex: number; pointsEarned: number; explanation?: string }
```

### `leaderboard_update`

Broadcasts updated scores.

```ts
{ leaderboard: Array<{ userId: string; name: string; score: number; rank: number }> }
```

### `game_over`

Broadcasts final results.

```ts
{ leaderboard: Array<{ userId: string; name: string; score: number; rank: number }>; sessionId: string; title: string }
```

### `answer_error`

Emitted when an answer submission fails.

```ts
{ message: string }
```

