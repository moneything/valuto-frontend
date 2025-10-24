const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export interface LearningStep {
  id: string;
  type: 'explanation' | 'interactive' | 'example' | 'mini-game';
  title: string;
  content: string;
  interactiveData?: any;
  emoji: string;
  points: number;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  topic: string;
  lessonContent: string;
  activityType: 'quiz' | 'simulation' | 'scenario';
  activityData: any;
  learningSteps?: LearningStep[];
  points: number;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: number;
  prerequisites?: string[];
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface LearningProgress {
  userId: string;
  moduleId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score: number;
  maxScore: number;
  completionTime?: number;
  attempts: number;
  lastAttempt: string;
  quizResults?: any[];
  simulationResult?: any;
  scenarioResults?: any[];
  progressPercentage: number;
  strengths?: string[];
  areasForImprovement?: string[];
  recommendedNextModules?: string[];
}

export interface ProgressStats {
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
  averageScore: number;
  totalPoints: number;
}

export interface ModuleFilters {
  topic?: string;
  difficulty?: string;
  activityType?: string;
}

export interface QuizResponse {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  pointsEarned: number;
  timeSpent: number;
  timestamp: string;
}

export interface SimulationResult {
  finalScore: number;
  choices: any[];
  outcomes: any;
  efficiency: number;
  timeSpent: number;
}

export interface ScenarioResult {
  scenarioId: string;
  selectedChoice: string;
  isOptimal: boolean;
  pointsEarned: number;
  consequences: any;
  timeSpent: number;
}

class LearningModuleAPI {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async authenticatedRequest<T>(
    endpoint: string, 
    token: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    return this.request<T>(endpoint, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });
  }

  // Get all learning modules
  async getModules(filters: ModuleFilters = {}): Promise<{ success: boolean; data?: LearningModule[]; error?: string }> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/api/learning/modules${queryString ? `?${queryString}` : ''}`;
    
    return this.request<LearningModule[]>(endpoint);
  }

  // Get a specific learning module
  async getModule(moduleId: string): Promise<{ success: boolean; data?: LearningModule; error?: string }> {
    return this.request<LearningModule>(`/api/learning/modules/${moduleId}`);
  }

  // Get user's progress for a specific module
  async getModuleProgress(moduleId: string, token: string): Promise<{ success: boolean; data?: LearningProgress; error?: string }> {
    return this.authenticatedRequest<LearningProgress>(`/api/learning/progress/${moduleId}`, token);
  }

  // Save user progress for a module
  async saveProgress(
    moduleId: string, 
    token: string, 
    progressData: {
      activityType: 'quiz' | 'simulation' | 'scenario';
      responses?: QuizResponse[];
      simulationResult?: SimulationResult;
      scenarioResults?: ScenarioResult[];
      sessionData?: {
        startTime: string;
        endTime: string;
        totalTime: number;
      };
    }
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    return this.authenticatedRequest(`/api/learning/progress`, token, {
      method: 'POST',
      body: JSON.stringify({ 
        moduleId,
        ...progressData 
      }),
    });
  }

  // Get user's overall learning progress
  async getUserProgress(
    token: string, 
    filters: { topic?: string; status?: string } = {}
  ): Promise<{ success: boolean; data?: { progress: LearningProgress[]; stats: ProgressStats }; error?: string }> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/api/learning/progress${queryString ? `?${queryString}` : ''}`;
    
    return this.authenticatedRequest<{ progress: LearningProgress[]; stats: ProgressStats }>(endpoint, token);
  }

  // Create a new learning module (admin/teacher only)
  async createModule(
    token: string,
    moduleData: Omit<LearningModule, 'createdAt' | 'updatedAt' | 'isActive' | 'createdBy'>
  ): Promise<{ success: boolean; data?: LearningModule; error?: string }> {
    return this.authenticatedRequest<LearningModule>('/api/learning/modules', token, {
      method: 'POST',
      body: JSON.stringify(moduleData),
    });
  }
}

export const learningModuleAPI = new LearningModuleAPI();
