import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { learningModuleAPI, LearningModule, LearningProgress, ModuleFilters } from '@/lib/api/learningModules';

export const useLearningModules = (filters: ModuleFilters = {}) => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await learningModuleAPI.getModules(filters);
      
      if (result.success && result.data) {
        setModules(result.data);
      } else {
        setError(result.error || 'Failed to fetch modules');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return {
    modules,
    loading,
    error,
    refetch: fetchModules
  };
};

export const useLearningModule = (moduleId: string) => {
  const [module, setModule] = useState<LearningModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModule = useCallback(async () => {
    if (!moduleId) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await learningModuleAPI.getModule(moduleId);
      
      if (result.success && result.data) {
        setModule(result.data);
      } else {
        setError(result.error || 'Failed to fetch module');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [moduleId]);

  useEffect(() => {
    fetchModule();
  }, [fetchModule]);

  return {
    module,
    loading,
    error,
    refetch: fetchModule
  };
};

export const useLearningProgress = (moduleId: string) => {
  const { getToken } = useAuth();
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!moduleId) return;
    
    try {
      const token = await getToken({ template: "default" }); 
      if (!token) return;
      
      setLoading(true);
      setError(null);
      const result = await learningModuleAPI.getModuleProgress(moduleId, token);
      
      if (result.success && result.data) {
        setProgress(result.data);
      } else {
        setError(result.error || 'Failed to fetch progress');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [moduleId, getToken]);

  const saveProgress = useCallback(async (progressData: any) => {
    try {
      const token = await getToken({ template: "default" }); 
      if (!token) throw new Error('No authentication token');
      
      const result = await learningModuleAPI.saveProgress(moduleId, token, progressData);
      
      if (result.success && result.data) {
        // Update local progress state
        setProgress(prev => ({
          ...prev,
          ...result.data,
          moduleId,
          userId: '' // Will be set by backend
        } as LearningProgress));
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to save progress');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [moduleId, getToken]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return {
    progress,
    loading,
    error,
    saveProgress,
    refetch: fetchProgress
  };
};

export const useUserLearningProgress = (filters: { topic?: string; status?: string } = {}) => {
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
      const result = await learningModuleAPI.getUserProgress(token, filters);
      
      if (result.success && result.data) {
        setProgress(result.data.progress);
        setStats(result.data.stats);
      } else {
        setError(result.error || 'Failed to fetch user progress');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [getToken, filters]);

  useEffect(() => {
    fetchUserProgress();
  }, [fetchUserProgress]);

  return {
    progress,
    stats,
    loading,
    error,
    refetch: fetchUserProgress
  };
};
