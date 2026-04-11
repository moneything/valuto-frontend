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
  createdAt: string;
}

type StoredUserProfile = Omit<
  UserProfile,
  "subscriptionStatus"
> & {
  subscriptionStatus?: UserProfile["subscriptionStatus"];
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionCurrentPeriodEnd?: string;
};

const PROFILE_KEY_PREFIX = 'valuto_user_profile';

const getProfileKey = (userId?: string) =>
  userId ? `${PROFILE_KEY_PREFIX}_${userId}` : PROFILE_KEY_PREFIX;

function sanitizeStoredProfile(profile: StoredUserProfile): UserProfile {
  return {
    clerkUserId: profile.clerkUserId,
    name: profile.name,
    email: profile.email,
    role: profile.role,
    title: profile.title,
    age: profile.age,
    school: profile.school,
    grade: profile.grade,
    subject: profile.subject,
    completedOnboarding: profile.completedOnboarding,
    subscriptionStatus: profile.subscriptionStatus,
    createdAt: profile.createdAt,
  };
}

function tryParseStoredProfile(raw: string | null): StoredUserProfile | null {
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredUserProfile;
  } catch {
    return null;
  }
}

export const saveUserProfile = (profile: UserProfile, userId?: string): void => {
  if (typeof window !== 'undefined') {
    const key = getProfileKey(userId);
    const sanitizedProfile = sanitizeStoredProfile(profile);
    localStorage.setItem(key, JSON.stringify(sanitizedProfile));
  }
};

export const getUserProfile = (userId?: string): UserProfile | null => {
  if (typeof window !== 'undefined') {
    const primaryKey = getProfileKey(userId);
    const storedProfile = tryParseStoredProfile(localStorage.getItem(primaryKey));
    if (storedProfile) {
      const sanitizedProfile = sanitizeStoredProfile(storedProfile);
      localStorage.setItem(primaryKey, JSON.stringify(sanitizedProfile));
      return sanitizedProfile;
    }

    // Backward-compat: migrate legacy key if it matches this user.
    if (userId) {
      const legacyData = localStorage.getItem(getProfileKey());
      const legacyProfile = tryParseStoredProfile(legacyData);
      if (legacyProfile) {
        if (legacyProfile?.clerkUserId === userId) {
          const sanitizedLegacyProfile = sanitizeStoredProfile(legacyProfile);
          localStorage.setItem(primaryKey, JSON.stringify(sanitizedLegacyProfile));
          localStorage.removeItem(getProfileKey());
          return sanitizedLegacyProfile;
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
