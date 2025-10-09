// Local storage helper functions for development

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  age?: number;
  school?: string;
  grade?: string;
  subject?: string;
  completedOnboarding: boolean;
  createdAt: string;
}

const PROFILE_KEY = 'valuto_user_profile';

export const saveUserProfile = (profile: UserProfile): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }
};

export const getUserProfile = (): UserProfile | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const clearUserProfile = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(PROFILE_KEY);
  }
};

export const hasCompletedOnboarding = (): boolean => {
  const profile = getUserProfile();
  return profile?.completedOnboarding || false;
};


