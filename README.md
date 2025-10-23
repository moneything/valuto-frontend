# Valuto - Financial Education Platform.

A comprehensive financial education platform teaching money skills to young people aged 11-18.

## 📁 Project Structure

This is a monorepo containing both frontend and backend applications:

```
valuto-frontend-test/
├── frontend/                               # Next.js frontend with Clerk auth
├── backend/                                # Express + MongoDB + Socket.IO backend
├── games-overview.md                       # Games and features analysis
├── trivia-overview.md                      # Trivia frontend discovery document
├── REAL-TIME_TRIVIA_IMPLEMENTATION.md     # Real-time trivia implementation summary
└── README.md                               # This file
```

## 🎨 Frontend

Modern Next.js application with:
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Professional green & white theme
- ✅ Times New Roman headers with italic accents
- ✅ Poppins body text
- ✅ Floating pill-shaped navigation
- ✅ Gradient backgrounds
- ✅ Professional SVG icons
- ✅ Optimized images
- ✅ Ready for Vercel deployment

[View Frontend Documentation](./frontend/README.md)

## 🔧 Backend

Production-ready Express.js + MongoDB + Socket.IO API with:
- ✅ Clerk authentication integration
- ✅ User profile management (students & teachers)
- ✅ Game results tracking and leaderboards
- ✅ Learning progress monitoring
- ✅ Daily challenges system
- ✅ **Real-time trivia game system (Socket.IO)**
- ✅ **Kahoot-style multiplayer gameplay**
- ✅ **Live leaderboards and scoring**
- ✅ RESTful API with comprehensive validation
- ✅ MVC architecture following best practices
- ✅ MongoDB with Mongoose ODM
- ✅ Error handling and logging
- ✅ CORS and security middleware
- ✅ Prettier code formatting

[View Backend Documentation](./backend/README.md) | [API Documentation](./backend/API_DOCUMENTATION.md) | [Socket.IO API](./backend/SOCKETS-API.md)

## 🎮 Real-Time Trivia System (NEW!)

**Fully functional Kahoot-style multiplayer trivia game!**

### Features
- ✅ **Live Multiplayer:** Teachers host, students join with 6-character codes
- ✅ **Real-Time Sync:** Questions broadcast simultaneously to all players
- ✅ **Live Leaderboards:** Scores update instantly after each question
- ✅ **Server-Authoritative:** All timing and scoring validated on server
- ✅ **Speed Bonus:** Faster correct answers earn more points
- ✅ **Reconnection:** Players can rejoin if disconnected
- ✅ **Results Persistence:** All games saved to MongoDB
- ✅ **User Statistics:** Track performance over time

### Tech Stack
- **WebSocket:** Socket.IO for real-time communication
- **Authentication:** Clerk token verification on socket connection
- **Database:** MongoDB for sessions, results, and stats
- **Backend:** Express + Socket.IO + MongoDB

### Documentation
- 📘 [Frontend Analysis](./trivia-overview.md) - UI components and integration guide
- 📗 [Socket.IO API](./backend/SOCKETS-API.md) - Complete WebSocket event reference
- 📙 [Implementation Summary](./REAL-TIME_TRIVIA_IMPLEMENTATION.md) - Overview and quick start

### Quick Start (Backend)
```bash
cd backend
npm install     # Includes socket.io@^4.7.2
npm run dev     # Server starts with WebSocket enabled
```

### Next Steps (Frontend Integration)
1. Install `socket.io-client` in frontend
2. Create Socket.IO hook with Clerk auth
3. Update trivia pages to use socket events
4. Test end-to-end multiplayer gameplay

**Status:** Backend complete ✅ | Frontend integration ready 🚀

---

## Getting Started

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend Development

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and Clerk keys
npm run dev
```

Open [http://localhost:5000/api/health](http://localhost:5000/api/health)

## Deployment

- **Frontend**: Optimized for Vercel deployment
- **Backend**: Ready for Render, Railway, Heroku, or DigitalOcean

See individual README files for detailed deployment instructions.

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18
- Clerk Authentication

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Clerk SDK for authentication
- Express Validator
- Helmet + CORS security
- Prettier formatting

## 🎨 Code Formatting

This project uses Prettier for consistent code formatting across frontend and backend.

**Format all code:**
```bash
# From project root
npx prettier --write "**/*.{js,jsx,ts,tsx,json,md}"

# Frontend only
cd frontend && npm run format

# Backend only
cd backend && npm run format
```

Configuration is in `.prettierrc` files.

## 📚 Documentation

- **[Games Overview](./games-overview.md)** - Complete analysis of all games and features
- **[Backend README](./backend/README.md)** - Backend setup and architecture
- **[API Documentation](./backend/API_DOCUMENTATION.md)** - Complete API reference
- **[Frontend README](./frontend/README.md)** - Frontend development guide

## 🚀 Quick Start (Full Stack)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd valuto-frontend-test
   ```

2. **Set up Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

3. **Set up Frontend** (in new terminal)
   ```bash
   cd frontend
   npm install
   # Configure Clerk keys in .env.local
   npm run dev
   ```

4. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - API Health: http://localhost:5000/api/health

## Team

Built by the Valuto team - entrepreneurs under 20, building the financial education we wish we had.

## License

© 2025 Valuto. All rights reserved.
