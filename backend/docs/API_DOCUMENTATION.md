# Valuto Backend API Documentation

## API Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-domain.com/api`

## Authentication

All protected endpoints require a Clerk session token in the Authorization header:

```
Authorization: Bearer <clerk_session_token>
```

---

## 🔐 Authentication Endpoints

### Verify Token

Verify a Clerk session token and return user information.

**Endpoint**: `POST /api/auth/verify`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Response**:
```json
{
  "success": true,
  "message": "Token verified successfully",
  "data": {
    "userId": "user_xxx",
    "email": "user@example.com",
    "name": "John Doe",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

## 👤 User Endpoints

### Create/Update User Profile

Create a new user profile or update existing one.

**Endpoint**: `POST /api/user`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "age": 16,
  "school": "Central High School",
  "grade": "Year 11",
  "completedOnboarding": true
}
```

**Response**:
```json
{
  "success": true,
  "message": "User profile created successfully",
  "data": {
    "_id": "...",
    "clerkUserId": "user_xxx",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "totalPoints": 0,
    "gamesPlayed": 0,
    "lessonsCompleted": 0,
    "currentStreak": 0
  }
}
```

### Get User Profile

Get the current user's profile.

**Endpoint**: `GET /api/user`

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "totalPoints": 2450,
    "gamesPlayed": 12,
    "lessonsCompleted": 8,
    "currentStreak": 3
  }
}
```

### Get User Statistics

Get detailed statistics for the current user.

**Endpoint**: `GET /api/user/stats`

**Response**:
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "stats": {
      "totalPoints": 2450,
      "gamesPlayed": 12,
      "lessonsCompleted": 8,
      "currentStreak": 3,
      "longestStreak": 7,
      "achievements": 5
    },
    "gameStats": {
      "totalGames": 12,
      "avgScore": 850,
      "avgAccuracy": 85.5
    },
    "learningStats": [...],
    "challengeStats": { ... }
  }
}
```

---

## 🎮 Game Endpoints

### Submit Game Result

Submit a completed game result.

**Endpoint**: `POST /api/game/result`

**Request Body**:
```json
{
  "gameCode": "ABC123",
  "gameTitle": "Introduction to Investing",
  "gameType": "trivia",
  "score": 850,
  "maxPossibleScore": 1000,
  "questionsAnswered": 10,
  "correctAnswers": 8,
  "timeTaken": 245,
  "questionResults": [
    {
      "questionId": "q1",
      "question": "What is a stock?",
      "selectedAnswer": 1,
      "correctAnswer": 1,
      "isCorrect": true,
      "timeSpent": 15,
      "pointsEarned": 100
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Game result submitted successfully",
  "data": {
    "gameResult": { ... },
    "updatedStats": {
      "totalPoints": 3300,
      "gamesPlayed": 13
    }
  }
}
```

### Get Game History

Get user's game play history.

**Endpoint**: `GET /api/game/history?limit=10&skip=0`

**Response**:
```json
{
  "success": true,
  "data": {
    "history": [
      {
        "_id": "...",
        "gameCode": "ABC123",
        "gameTitle": "Introduction to Investing",
        "score": 850,
        "accuracy": 80,
        "completedAt": "2025-10-22T..."
      }
    ],
    "pagination": {
      "total": 12,
      "limit": 10,
      "skip": 0,
      "hasMore": true
    }
  }
}
```

### Get Game Leaderboard

Get leaderboard for a specific game.

**Endpoint**: `GET /api/game/leaderboard/:gameCode?limit=10`

**Response**:
```json
{
  "success": true,
  "data": {
    "gameCode": "ABC123",
    "leaderboard": [
      {
        "userId": "...",
        "userName": "Sarah Chen",
        "school": "Central High",
        "score": 950,
        "accuracy": 95,
        "completedAt": "2025-10-22T..."
      }
    ]
  }
}
```

---

## 🏆 Leaderboard Endpoints

### Get Global Leaderboard

Get global leaderboard with optional filters.

**Endpoint**: `GET /api/leaderboard?limit=100&role=student&school=CentralHigh`

**Query Parameters**:
- `limit` (optional): Number of users to return (default: 100)
- `role` (optional): Filter by role ('student' or 'teacher')
- `school` (optional): Filter by school name

**Response**:
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "name": "Sarah Chen",
        "email": "sarah@example.com",
        "school": "Central High",
        "totalPoints": 3850,
        "gamesPlayed": 25,
        "lessonsCompleted": 15
      }
    ],
    "filters": {
      "role": "student",
      "school": "all",
      "limit": 100
    }
  }
}
```

### Get User Rank

Get current user's rank on the leaderboard.

**Endpoint**: `GET /api/leaderboard/rank`

**Response**:
```json
{
  "success": true,
  "data": {
    "globalRank": 15,
    "schoolRank": 3,
    "totalUsers": 250,
    "totalPoints": 2450,
    "school": "Central High",
    "percentile": 94
  }
}
```

---

## 📚 Learning Progress Endpoints

### Save Learning Progress

Save or update progress for a lesson.

**Endpoint**: `POST /api/learning/progress`

**Request Body**:
```json
{
  "moduleId": "stocks-shares",
  "moduleName": "Stocks & Shares",
  "lessonId": "what-are-stocks",
  "lessonName": "What are Stocks?",
  "status": "completed",
  "quizScore": 90,
  "timeSpent": 300,
  "quizAnswers": [
    {
      "questionId": "q1",
      "selectedAnswer": 1,
      "isCorrect": true,
      "attemptNumber": 1
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Progress saved successfully",
  "data": {
    "_id": "...",
    "moduleId": "stocks-shares",
    "lessonId": "what-are-stocks",
    "status": "completed",
    "quizScore": 90,
    "completedAt": "2025-10-22T..."
  }
}
```

### Get Module Progress

Get user's progress for a specific module.

**Endpoint**: `GET /api/learning/progress/:moduleId`

**Response**:
```json
{
  "success": true,
  "data": {
    "moduleId": "stocks-shares",
    "totalLessons": 5,
    "completedLessons": 3,
    "completionPercentage": 60,
    "totalTimeSpent": 1200,
    "averageQuizScore": 85,
    "lessons": [...]
  }
}
```

### Get All Learning Progress

Get all learning progress for the current user.

**Endpoint**: `GET /api/learning/progress`

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "moduleId": "stocks-shares",
      "moduleName": "Stocks & Shares",
      "lessons": [...],
      "completed": 3,
      "total": 5
    }
  ]
}
```

---

## 🎯 Challenge Endpoints

### Get Daily Challenges

Get user's daily challenges (auto-creates if none exist).

**Endpoint**: `GET /api/challenges/daily`

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "challengeId": "daily_trivia_...",
      "challengeType": "daily_trivia",
      "challengeName": "Daily Trivia",
      "challengeDescription": "Play one trivia game today",
      "completed": false,
      "currentProgress": 0,
      "targetProgress": 1,
      "pointsEarned": 50,
      "expiresAt": "2025-10-23T..."
    }
  ]
}
```

### Complete Challenge

Mark a challenge as completed.

**Endpoint**: `PUT /api/challenges/:challengeId/complete`

**Response**:
```json
{
  "success": true,
  "message": "Challenge completed successfully!",
  "data": {
    "challenge": { ... },
    "pointsEarned": 50,
    "totalPoints": 2500
  }
}
```

### Update Challenge Progress

Update progress on a challenge.

**Endpoint**: `PUT /api/challenges/:challengeId/progress`

**Request Body**:
```json
{
  "increment": 1
}
```

**Response**:
```json
{
  "success": true,
  "message": "Progress updated",
  "data": {
    "challenge": { ... },
    "pointsEarned": 0,
    "totalPoints": 2450
  }
}
```

---

## 🚨 Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Authentication required. Please provide a valid token."
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "Access denied. This action requires teacher role."
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "User profile not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error",
  "stack": "..." // Only in development
}
```

---

## 📝 Data Models

### User
```typescript
{
  clerkUserId: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  age?: number;
  school?: string;
  grade?: string;
  subject?: string;
  totalPoints: number;
  gamesPlayed: number;
  lessonsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
}
```

### GameResult
```typescript
{
  userId: string;
  gameCode: string;
  gameTitle: string;
  gameType: 'trivia' | 'quiz' | 'challenge';
  score: number;
  maxPossibleScore: number;
  accuracy: number;
  questionsAnswered: number;
  correctAnswers: number;
  timeTaken: number;
  completedAt: Date;
}
```

### LearningProgress
```typescript
{
  userId: string;
  moduleId: string;
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  quizScore?: number;
  timeSpent: number;
  completedAt?: Date;
}
```

### Challenge
```typescript
{
  userId: string;
  challengeId: string;
  challengeType: string;
  challengeName: string;
  completed: boolean;
  currentProgress: number;
  targetProgress: number;
  pointsEarned: number;
  expiresAt?: Date;
}
```

---

## 🔄 Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting for production:

```javascript
// Example with express-rate-limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api', limiter);
```

---

## 📊 Pagination

Endpoints that return lists support pagination with query parameters:

- `limit`: Number of items per page (default varies by endpoint)
- `skip`: Number of items to skip

**Example**:
```
GET /api/game/history?limit=20&skip=40
```

---

## 🧪 Testing Examples

### Using cURL

```bash
# Create user
curl -X POST http://localhost:5000/api/user \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","role":"student"}'

# Submit game result
curl -X POST http://localhost:5000/api/game/result \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"gameCode":"ABC123","gameTitle":"Test Game","score":500,"maxPossibleScore":1000,"questionsAnswered":10,"correctAnswers":5}'

# Get leaderboard
curl http://localhost:5000/api/leaderboard?limit=10
```

### Using JavaScript (Fetch API)

```javascript
// Get user profile
const getProfile = async (token) => {
  const response = await fetch('http://localhost:5000/api/user', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
};

// Submit game result
const submitGame = async (token, gameData) => {
  const response = await fetch('http://localhost:5000/api/game/result', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameData)
  });
  const data = await response.json();
  return data;
};
```

---

**Last Updated**: October 22, 2025  
**API Version**: 1.0.0

