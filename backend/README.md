# Valuto Backend API

> Production-ready Express.js + MongoDB backend with Clerk authentication for the Valuto financial education platform.

## 🎯 Overview

This backend provides a RESTful API for managing users, game results, learning progress, challenges, and leaderboards. It integrates seamlessly with Clerk for authentication and MongoDB for data persistence.

## 🏗️ Architecture

The project follows **MVC (Model-View-Controller)** principles:

```
backend/
├── src/
│   ├── models/         # MongoDB schemas (User, GameResult, etc.)
│   ├── controllers/    # Business logic for each route
│   ├── routes/         # Express route definitions
│   ├── middleware/     # Clerk auth & custom middleware
│   ├── utils/          # Validators, error handlers, helpers
│   ├── config/         # Database configuration
│   └── server.js       # Main application entry point
├── package.json
├── .env.example
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB** (local installation or MongoDB Atlas account)
- **Clerk** account with API keys

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/valuto-dev
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/valuto?retryWrites=true&w=majority

# Clerk Authentication
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 3. Start the Server

**Development mode** (with hot-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start at `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/verify` | Verify Clerk session token | Yes |
| GET | `/api/auth/session` | Get current session info | Yes |
| GET | `/api/auth/health` | Auth service health check | No |

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/user` | Create/update user profile | Yes |
| GET | `/api/user` | Get current user profile | Yes |
| PUT | `/api/user` | Update user profile | Yes |
| GET | `/api/user/stats` | Get user statistics | Yes |
| POST | `/api/user/points` | Add points to user | Yes |
| POST | `/api/user/game-played` | Increment game count | Yes |
| POST | `/api/user/lesson-completed` | Increment lesson count | Yes |
| POST | `/api/user/achievement` | Add achievement | Yes |
| DELETE | `/api/user` | Delete user account | Yes |

### Game Routes (`/api/game`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/game/result` | Submit game result | Yes |
| GET | `/api/game/history` | Get user's game history | Yes |
| GET | `/api/game/result/:id` | Get specific game result | Yes |
| GET | `/api/game/leaderboard/:gameCode` | Get game leaderboard | No |
| GET | `/api/game/stats` | Get user's game stats | Yes |
| GET | `/api/game/recent` | Get recent games | No |

### Leaderboard Routes (`/api/leaderboard`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/leaderboard` | Get global leaderboard | No |
| GET | `/api/leaderboard/rank` | Get user's rank | Yes |
| GET | `/api/leaderboard/school/:schoolName` | Get school leaderboard | No |
| GET | `/api/leaderboard/top` | Get top performers | No |
| GET | `/api/leaderboard/with-context` | Get leaderboard with user context | Yes |
| GET | `/api/leaderboard/stats` | Get leaderboard statistics | No |

### Learning Routes (`/api/learning`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/learning/progress` | Save learning progress | Yes |
| GET | `/api/learning/progress/:moduleId` | Get module progress | Yes |
| GET | `/api/learning/progress` | Get all progress | Yes |
| PUT | `/api/learning/complete/:moduleId/:lessonId` | Mark lesson completed | Yes |
| PUT | `/api/learning/time/:moduleId/:lessonId` | Update time spent | Yes |
| GET | `/api/learning/leaderboard/:moduleId` | Get module leaderboard | No |
| GET | `/api/learning/stats` | Get learning statistics | Yes |

### Challenge Routes (`/api/challenges`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/challenges/daily` | Get daily challenges | Yes |
| PUT | `/api/challenges/:id/progress` | Update challenge progress | Yes |
| PUT | `/api/challenges/:id/complete` | Complete challenge | Yes |
| GET | `/api/challenges/completed` | Get completed challenges | Yes |
| GET | `/api/challenges/stats` | Get challenge statistics | Yes |
| POST | `/api/challenges/create` | Create custom challenge | Yes (Teacher) |
| DELETE | `/api/challenges/:id` | Delete challenge | Yes |

## 🔐 Authentication

All protected routes require a Clerk session token in the Authorization header:

```http
Authorization: Bearer <clerk_session_token>
```

**Example using fetch:**

```javascript
const response = await fetch('http://localhost:5000/api/user', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${sessionToken}`,
    'Content-Type': 'application/json'
  }
});
```

## 📊 Database Models

### User Schema
- User profile with Clerk integration
- Role-based access (student/teacher)
- Gamification stats (points, games played, lessons completed)
- Streak tracking
- Achievements

### GameResult Schema
- Individual game play results
- Score and accuracy tracking
- Question-level details
- Leaderboard support

### LearningProgress Schema
- Module and lesson completion tracking
- Quiz scores and attempts
- Time spent analytics

### Challenge Schema
- Daily challenges
- Progress tracking
- Points and rewards

## 🧪 Testing

### Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "API is healthy",
  "database": "connected",
  "timestamp": "2025-10-22T..."
}
```

### Test User Creation

```bash
curl -X POST http://localhost:5000/api/user \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "role": "student"
  }'
```

## 🎨 Code Formatting

Format code using Prettier:

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

Prettier configuration is in `.prettierrc`.

## 🚢 Deployment

### Environment Variables

Set these in your production environment:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
CLERK_SECRET_KEY=sk_live_...
CLERK_PUBLISHABLE_KEY=pk_live_...
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Platforms

#### Render.com

1. Create new Web Service
2. Connect your repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables from dashboard

#### Railway.app

1. Create new project from GitHub
2. Set root directory: `/backend`
3. Add environment variables
4. Deploy automatically

#### Heroku

```bash
cd backend
heroku create valuto-backend
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set CLERK_SECRET_KEY=your_key
git push heroku main
```

#### DigitalOcean App Platform

1. Create new app
2. Select GitHub repository
3. Set run command: `npm start`
4. Configure environment variables
5. Deploy

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use production Clerk keys (live, not test)
- [ ] Use MongoDB Atlas for database
- [ ] Enable MongoDB connection string encryption
- [ ] Set appropriate CORS origins
- [ ] Enable rate limiting (optional)
- [ ] Set up monitoring (e.g., Sentry, LogRocket)
- [ ] Configure backup strategy for database
- [ ] Use environment secrets management
- [ ] Enable HTTPS/TLS

## 🛠️ Development Guidelines

### Adding a New Model

1. Create schema in `src/models/YourModel.js`
2. Define schema with validation rules
3. Add indexes for performance
4. Add instance/static methods as needed

### Adding a New Endpoint

1. Create controller in `src/controllers/yourController.js`
2. Add validation in `src/utils/validators.js`
3. Create route in `src/routes/yourRoutes.js`
4. Import and mount route in `src/server.js`

### Error Handling

Use the `asyncHandler` wrapper for async routes:

```javascript
const { asyncHandler } = require('../utils/errorHandler');

const myController = asyncHandler(async (req, res) => {
  // Your code here
  // Errors are automatically caught and passed to error handler
});
```

Throw custom errors:

```javascript
const { AppError } = require('../utils/errorHandler');

if (!user) {
  throw new AppError('User not found', 404);
}
```

## 📝 API Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detail 1", "Detail 2"]
}
```

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error:** `MongooseServerSelectionError`

**Solutions:**
- Verify MongoDB is running: `mongod --version`
- Check connection string in `.env`
- For MongoDB Atlas: Whitelist your IP address
- Check firewall settings

### Clerk Authentication Errors

**Error:** `Invalid or expired session token`

**Solutions:**
- Verify `CLERK_SECRET_KEY` is set correctly
- Ensure token is sent in `Authorization` header
- Check token hasn't expired
- Verify you're using the correct Clerk instance

### Port Already in Use

**Error:** `EADDRINUSE: address already in use`

**Solutions:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=5001
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Clerk Documentation](https://clerk.com/docs)
- [REST API Best Practices](https://restfulapi.net/)

## 🤝 Contributing

1. Follow the existing code style
2. Use Prettier for formatting
3. Add JSDoc comments to functions
4. Test endpoints before committing
5. Update this README if adding new features

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

For issues or questions:
- Check the troubleshooting section above
- Review API documentation
- Contact the development team

---

**Built with ❤️ for Valuto Financial Education Platform**

**Version:** 1.0.0  
**Last Updated:** October 22, 2025
