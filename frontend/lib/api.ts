/**
 * API Client for Valuto Backend
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Make API request with Clerk authentication
 */
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || data.error || 'Request failed',
      };
    }

    return data;
  } catch (error: any) {
    console.error('API request error:', error);
    return {
      success: false,
      error: error.message || 'Network error',
    };
  }
}

// ==================== User API ====================

export const userApi = {
  /**
   * Create user profile
   */
  async createProfile(token: string, userData: {
    name: string;
    email: string;
    role: 'student' | 'teacher';
    age?: number;
    school?: string;
    grade?: string;
    subject?: string;
  }) {
    return apiRequest('/api/user', {
      method: 'POST',
      body: JSON.stringify(userData),
    }, token);
  },

  /**
   * Get user profile
   */
  async getProfile(token: string) {
    return apiRequest('/api/user', {
      method: 'GET',
    }, token);
  },

  /**
   * Update user profile
   */
  async updateProfile(token: string, updates: Partial<{
    name: string;
    age: number;
    school: string;
    grade: string;
    subject: string;
  }>) {
    return apiRequest('/api/user', {
      method: 'PUT',
      body: JSON.stringify(updates),
    }, token);
  },

  /**
   * Get user statistics
   */
  async getStats(token: string, userId?: string) {
    const endpoint = userId ? `/api/user/${userId}/stats` : '/api/user/stats';
    return apiRequest(endpoint, {
      method: 'GET',
    }, token);
  },
};

// ==================== Trivia API ====================

export const triviaApi = {
  /**
   * Create trivia session
   */
  async createSession(token: string, sessionData: {
    title: string;
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
      timeLimit: number;
      explanation?: string;
    }>;
    settings?: {
      pointsPerCorrect?: number;
      speedBonusEnabled?: boolean;
      maxSpeedBonus?: number;
    };
  }) {
    return apiRequest('/api/trivia/session', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    }, token);
  },

  /**
   * Get session by join code
   */
  async getSessionByCode(joinCode: string) {
    return apiRequest(`/api/trivia/session/code/${joinCode}`, {
      method: 'GET',
    });
  },

  /**
   * Get all sessions for current user
   */
  async getSessions(token: string, status?: 'waiting' | 'active' | 'ended') {
    const query = status ? `?status=${status}` : '';
    return apiRequest(`/api/trivia/sessions${query}`, {
      method: 'GET',
    }, token);
  },

  /**
   * Get session results
   */
  async getSessionResults(token: string, sessionId: string) {
    return apiRequest(`/api/trivia/session/${sessionId}/results`, {
      method: 'GET',
    }, token);
  },

  /**
   * Get user's trivia history
   */
  async getHistory(token: string, limit = 10, skip = 0) {
    return apiRequest(`/api/trivia/history?limit=${limit}&skip=${skip}`, {
      method: 'GET',
    }, token);
  },

  /**
   * Get user's trivia statistics
   */
  async getStats(token: string) {
    return apiRequest('/api/trivia/stats', {
      method: 'GET',
    }, token);
  },

  /**
   * Delete session
   */
  async deleteSession(token: string, sessionId: string) {
    return apiRequest(`/api/trivia/session/${sessionId}`, {
      method: 'DELETE',
    }, token);
  },
};

// ==================== Game API ====================

export const gameApi = {
  /**
   * Save game result
   */
  async saveResult(token: string, gameData: {
    gameType: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeTaken: number;
  }) {
    return apiRequest('/api/game', {
      method: 'POST',
      body: JSON.stringify(gameData),
    }, token);
  },

  /**
   * Get game history
   */
  async getHistory(token: string, gameId?: string) {
    const endpoint = gameId ? `/api/game/${gameId}/results` : '/api/game/history';
    return apiRequest(endpoint, {
      method: 'GET',
    }, token);
  },
};

// ==================== Leaderboard API ====================

export const leaderboardApi = {
  /**
   * Get global leaderboard
   */
  async getGlobal(token: string, limit = 10) {
    return apiRequest(`/api/leaderboard?limit=${limit}`, {
      method: 'GET',
    }, token);
  },

  /**
   * Get session leaderboard
   */
  async getSession(token: string, sessionId: string) {
    return apiRequest(`/api/trivia/leaderboard/${sessionId}`, {
      method: 'GET',
    }, token);
  },
};

// ==================== Learning API ====================

export const learningApi = {
  /**
   * Update learning progress
   */
  async updateProgress(token: string, progressData: {
    moduleId: string;
    lessonId: string;
    completed: boolean;
    score?: number;
  }) {
    return apiRequest('/api/learning', {
      method: 'POST',
      body: JSON.stringify(progressData),
    }, token);
  },

  /**
   * Get learning progress
   */
  async getProgress(token: string, moduleId?: string) {
    const endpoint = moduleId ? `/api/learning/${moduleId}` : '/api/learning';
    return apiRequest(endpoint, {
      method: 'GET',
    }, token);
  },
};

// ==================== Challenge API ====================

export const challengeApi = {
  /**
   * Complete challenge
   */
  async completeChallenge(token: string, challengeData: {
    challengeId: string;
    rewardPoints: number;
  }) {
    return apiRequest(`/api/challenges/${challengeData.challengeId}/complete`, {
      method: 'POST',
      body: JSON.stringify({ rewardPoints: challengeData.rewardPoints }),
    }, token);
  },

  /**
   * Get user challenges
   */
  async getChallenges(token: string) {
    return apiRequest('/api/challenges', {
      method: 'GET',
    }, token);
  },
};

// ==================== Health Check ====================

export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return await response.json();
  } catch (error) {
    return { success: false, error: 'Backend not reachable' };
  }
};

