// Local storage helper functions for development

export interface UserProfile {
  clerkUserId: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  title?: string;
  age?: number;
  school?: string;
  grade?: string;
  subject?: string;
  completedOnboarding: boolean;
  subscriptionStatus?: 'inactive' | 'active' | 'past_due' | 'canceled' | 'trialing';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionCurrentPeriodEnd?: string;
  createdAt: string;
}

const PROFILE_KEY_PREFIX = 'valuto_user_profile';

const getProfileKey = (userId?: string) =>
  userId ? `${PROFILE_KEY_PREFIX}_${userId}` : PROFILE_KEY_PREFIX;

export const saveUserProfile = (profile: UserProfile, userId?: string): void => {
  if (typeof window !== 'undefined') {
    const key = getProfileKey(userId);
    localStorage.setItem(key, JSON.stringify(profile));
  }
};

export const getUserProfile = (userId?: string): UserProfile | null => {
  if (typeof window !== 'undefined') {
    const primaryKey = getProfileKey(userId);
    const data = localStorage.getItem(primaryKey);
    if (data) {
      return JSON.parse(data);
    }

    // Backward-compat: migrate legacy key if it matches this user.
    if (userId) {
      const legacyData = localStorage.getItem(getProfileKey());
      if (legacyData) {
        const legacyProfile = JSON.parse(legacyData);
        if (legacyProfile?.clerkUserId === userId) {
          localStorage.setItem(primaryKey, legacyData);
          localStorage.removeItem(getProfileKey());
          return legacyProfile;
        }
      }
    }
  }
  return null;
};

export const clearUserProfile = (userId?: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(getProfileKey(userId));
    if (!userId) {
      localStorage.removeItem(getProfileKey());
    }
  }
};

export const hasCompletedOnboarding = (userId?: string): boolean => {
  const profile = getUserProfile(userId);
  return profile?.completedOnboarding || false;
};
