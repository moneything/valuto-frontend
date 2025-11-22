// frontend/lib/api/learningModules.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

/* ============================================================
 * BACKEND-ACCURATE TYPES
 * ============================================================ */

export interface ContentSection {
  id: string;
  type: string;
  title: string;
  content: string;
  icon?: string;
  colorScheme?: string;
  metadata?: any;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizData {
  questions: QuizQuestion[];
  passingScore: number;
}

export interface LearningModule {
  _id: string;
  topic: string;
  title: string;
  description: string;
  categoryId: string;

  visual: {
    icon: string;
    iconColor: string;
    badge: string;
    readTime: number;
  };

  contentSections: ContentSection[];

  quiz?: QuizData;

  activityType: "quiz" | "simulation" | "scenario";
  activityData?: any;

  relatedLessons?: any[];

  points: number;
  difficultyLevel: "beginner" | "intermediate" | "advanced";
  timeEstimate: number;
  order?: number;

  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface LearningProgress {
  _id?: string;
  userId: string;
  clerkUserId: string;
  moduleId: string;
  moduleName: string;
  status: "not_started" | "in_progress" | "completed";

  quizScore?: number;
  quizPassed?: boolean;
  quizAttempts: number;
  timeSpent: number;

  startedAt?: string;
  completedAt?: string;
  lastAccessedAt?: string;

  quizAnswers?: any[];
}

export interface ProgressStats {
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
  completionPercentage: number;
  totalTimeSpent: number;
  averageQuizScore: number;
  modulesStarted: number;
}

/* ============================================================
 * SAVE PROGRESS PAYLOAD + RESPONSE
 * ============================================================ */

export interface QuizResponse {
  question: string;
  selectedAnswer: number;
  isCorrect: boolean;
}

export interface SimulationResult {
  finalScore?: number;
  score?: number;
}

export interface ScenarioResult {
  scenarioId: string;
  isOptimal: boolean;
}

export interface SaveProgressPayload {
  moduleId: string;

  responses?: QuizResponse[];
  simulationResult?: SimulationResult;
  scenarioResults?: ScenarioResult[];

  sessionData?: {
    startTime: string;
    endTime: string;
    totalTime: number;
  };
}

export interface SaveProgressResponse {
  data: LearningProgress;
  pointsEarned: number;
  totalPoints: number;
  lessonsCompleted: number;
}

/* ============================================================
 * API RESPONSE WRAPPER (FIXES TS ERRORS)
 * ============================================================ */

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;

  // Optional fields the backend may include
  message?: string;
  pointsEarned?: number;
  totalPoints?: number;
  lessonsCompleted?: number;
};

/* ============================================================
 * API CLASS
 * ============================================================ */

class LearningModuleAPI {
  /* ---------------------------
   * INTERNAL REQUEST WRAPPER
   * --------------------------- */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      console.log("🔥 OUTGOING REQUEST:", {
        endpoint,
        method: options.method || "GET",
        headers: options.headers,
        body: options.body,
      });

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        ...options,
      });

      const json = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: json.error || "Request failed",
          ...json,               // keep backend error details if present
        };
      }

      return {
        success: true,
        ...json,                 // <-- THIS FIXES EVERYTHING
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || "Unknown error",
      };
    }
  }


  private async authRequest<T>(
    endpoint: string,
    token: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
  }

  /* ----------------------------------------------
   * MODULES
   * ---------------------------------------------- */

  async getModules() {
    return this.request<LearningModule[]>("/api/learning/modules");
  }

  async getModule(topic: string) {
    return this.request<LearningModule>(`/api/learning/modules/${topic}`);
  }

  /* ----------------------------------------------
   * PROGRESS
   * ---------------------------------------------- */

  async getModuleProgress(moduleId: string, token: string) {
    return this.authRequest<LearningProgress>(
      `/api/learning/progress/${moduleId}`,
      token
    );
  }

  async getUserProgress(token: string) {
    return this.authRequest<LearningProgress[]>(`/api/learning/progress`, token);
  }

  async getStats(token: string) {
    return this.authRequest<ProgressStats>(`/api/learning/stats`, token);
  }

  async saveProgress(payload: SaveProgressPayload, token: string) {
    console.log("📤 FRONTEND SENDING PAYLOAD TO BACKEND:", JSON.stringify(payload, null, 2));
    return this.authRequest<SaveProgressResponse>(`/api/learning/progress`, token, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  /* ----------------------------------------------
  * CATEGORIES
  * ---------------------------------------------- */
  async getCategories() {
    return this.request(`/api/categories`);
  }

}

export const learningModuleAPI = new LearningModuleAPI();
