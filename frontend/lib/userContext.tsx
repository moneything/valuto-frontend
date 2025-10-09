"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser as useClerkUser } from '@clerk/nextjs';
import { UserProfile, getUserProfile, saveUserProfile } from './localStorage';

interface UserContextType {
  profile: UserProfile | null;
  userProfile: UserProfile | null; // Alias for compatibility
  updateProfile: (profile: UserProfile) => void;
  setUserProfile: (profile: UserProfile) => void; // Alias for compatibility
  isTeacher: boolean;
  isStudent: boolean;
  loading: boolean;
  isLoadingProfile: boolean; // Alias for compatibility
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useClerkUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      // Load profile from localStorage
      const savedProfile = getUserProfile();
      if (savedProfile && savedProfile.userId === user.id) {
        setProfile(savedProfile);
      } else if (!savedProfile) {
        // Create initial profile if none exists
        const initialProfile: UserProfile = {
          userId: user.id,
          name: user.fullName || '',
          email: user.primaryEmailAddress?.emailAddress || '',
          role: 'student', // default
          completedOnboarding: false,
          createdAt: new Date().toISOString()
        };
        setProfile(initialProfile);
        saveUserProfile(initialProfile);
      }
      setLoading(false);
    } else if (isLoaded && !user) {
      setProfile(null);
      setLoading(false);
    }
  }, [user, isLoaded]);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    saveUserProfile(newProfile);
  };

  const value: UserContextType = {
    profile,
    userProfile: profile, // Alias for compatibility
    updateProfile,
    setUserProfile: updateProfile, // Alias for compatibility
    isTeacher: profile?.role === 'teacher',
    isStudent: profile?.role === 'student',
    loading,
    isLoadingProfile: loading // Alias for compatibility
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProvider');
  }
  return context;
}

// Alias for compatibility
export { useUserProfile as useUser };

