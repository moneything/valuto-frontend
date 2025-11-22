// frontend/lib/hooks/useLearningModules.ts
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  learningModuleAPI,
  LearningModule,
  LearningProgress,
} from "@/lib/api/learningModules";

/* ============================================================
 * 1) FETCH ALL MODULES
 * ============================================================ */
export const useLearningModules = () => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await learningModuleAPI.getModules();

      if (result.success && "data" in result && result.data) {
        setModules(result.data);
      } else {
        setError(result.error || "Failed to fetch modules");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return {
    modules,
    loading,
    error,
    refetch: fetchModules,
  };
};

/* ============================================================
 * 2) FETCH A SINGLE MODULE
 * ============================================================ */
export const useLearningModule = (topic: string) => {
  const [module, setModule] = useState<LearningModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModule = useCallback(async () => {
    if (!topic) return;

    try {
      setLoading(true);
      setError(null);

      const result = await learningModuleAPI.getModule(topic);

      if (result.success && "data" in result && result.data) {
        setModule(result.data);
      } else {
        setError(result.error || "Failed to fetch module");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [topic]);

  useEffect(() => {
    fetchModule();
  }, [fetchModule]);

  return {
    module,
    loading,
    error,
    refetch: fetchModule,
  };
};

/* ============================================================
 * 3) FETCH PROGRESS FOR A SINGLE MODULE (topic slug)
 * ============================================================ */
export const useLearningProgress = (moduleId: string) => {
  const { getToken } = useAuth();
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!moduleId) return;

    try {
      const token = await getToken({ template: "default" });
      if (!token) return;

      setLoading(true);
      setError(null);

      const result = await learningModuleAPI.getModuleProgress(moduleId, token);

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch module progress");
      }

      // backend always returns { success, data }
      if (result.data) {
        setProgress(result.data);
      }

    } catch (err: any) {
      console.error("❌ Fetch progress error:", err);
      setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [moduleId, getToken]);

  /* -------------------------------------------------------
   * SAVE PROGRESS (Quiz, Scenario, Simulation)
   * ------------------------------------------------------- */
  const saveProgress = useCallback(
    async (progressData: any) => {
      try {
        setSaving(true);

        const token = await getToken({ template: "default" });
        if (!token) throw new Error("No authentication token");

        const result = await learningModuleAPI.saveProgress(
          { moduleId, ...progressData },
          token
        );

        if (!result.success) {
          throw new Error(result.error || "Failed to save progress");
        }

        // Extract correctly
        const updatedProgress = result.data?.data;         // LearningProgress
        const pointsEarned = result.pointsEarned;    // number
        const totalPoints = result.totalPoints;      // number
        const lessonsCompleted = result.lessonsCompleted;

        // Update local state
        if (updatedProgress) {
          setProgress(updatedProgress);
        }

        return {
          progress: updatedProgress,
          pointsEarned,
          totalPoints,
          lessonsCompleted,
        };

      } catch (err: any) {
        console.error("❌ Save progress error:", err);
        setError(err.message ?? "Unknown error");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [moduleId, getToken]
  );


  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return {
    progress,
    loading,
    saving,
    error,
    saveProgress,
    refetch: fetchProgress,
  };
};


/* ============================================================
 * 4) FETCH ALL USER PROGRESS + STATS
 * ============================================================ */
export const useUserLearningProgress = () => {
  const { getToken } = useAuth();

  const [progress, setProgress] = useState<LearningProgress[]>([]);
  const [stats, setStats] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProgress = useCallback(async () => {
    try {
      const token = await getToken({ template: "default" });
      if (!token) return;

      setLoading(true);
      setError(null);

      /* Progress list (array) */
      const result = await learningModuleAPI.getUserProgress(token);

      if (result.success && "data" in result && Array.isArray(result.data)) {
        setProgress(result.data);
      } else if (!result.success) {
        setProgress([]);
      }

      /* Stats */
      const statsResult = await learningModuleAPI.getStats(token);

      if (statsResult.success && "data" in statsResult && statsResult.data) {
        setStats(statsResult.data);
      } else {
        setStats(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchUserProgress();
  }, [fetchUserProgress]);

  return {
    progress,
    stats,
    loading,
    error,
    refetch: fetchUserProgress,
  };
};

/* ============================================================
 * 5) FETCH ALL LEARNING CATEGORIES
 * ============================================================ */
export const useLearningCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await learningModuleAPI.getCategories();

      if (result.success && Array.isArray(result.data)) {
        setCategories(result.data);
      } else {
        setError(result.error || "Failed to fetch categories");
      }
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
};
