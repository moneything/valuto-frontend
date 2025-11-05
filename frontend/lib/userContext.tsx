"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser as useClerkUser, useAuth } from '@clerk/nextjs';
import { UserProfile, getUserProfile, saveUserProfile } from './localStorage';

interface UserContextType {
  profile: UserProfile | null;
  userProfile: UserProfile | null;
  updateProfile: (profile: UserProfile) => Promise<void>;
  setUserProfile: (profile: UserProfile) => void;
  isTeacher: boolean;
  isStudent: boolean;
  loading: boolean;
  isLoadingProfile: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useClerkUser();
  const { getToken } = useAuth(); // ✅ useAuth is now used for JWT
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Sync Clerk user → backend MongoDB
  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && user) {
        try {
          const token = await getToken({ template: "default" }); // ✅ safer Clerk call

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/users/me`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const data = await res.json();

          if (data.success && data.data) {
            setProfile(data.data);
            saveUserProfile(data.data);
          } else {
            console.warn('Backend user sync failed:', data);
          }
        } catch (err) {
          console.error('Failed to sync user with backend:', err);
        } finally {
          setLoading(false);
        }
      } else if (isLoaded && !user) {
        setProfile(null);
        setLoading(false);
      }
    };

    syncUser();
  }, [user, isLoaded, getToken]);

  // 🔹 Update user profile both locally + on backend (used in onboarding)
  const updateProfile = async (newProfile: UserProfile) => {
    try {
      setProfile(newProfile);
      saveUserProfile(newProfile);

      const token = await getToken({ template: "default" });
      if (token) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/users/onboarding`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newProfile),
          }
        );

        const data = await res.json();
        if (!data.success) {
          console.warn('Backend onboarding update failed:', data);
        }
      }
    } catch (err) {
      console.error('Failed to update user profile on backend:', err);
    }
  };

  const value: UserContextType = {
    profile,
    userProfile: profile,
    updateProfile,
    setUserProfile: (p) => updateProfile(p),
    isTeacher: profile?.role === 'teacher',
    isStudent: profile?.role === 'student',
    loading,
    isLoadingProfile: loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserProfile() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProvider');
  }
  return context;
}

export { useUserProfile as useUser };
