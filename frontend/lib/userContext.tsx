// frontend/lib/userContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser as useClerkUser, useAuth } from "@clerk/nextjs";
import { UserProfile, getUserProfile, saveUserProfile } from "./localStorage";

interface UserContextType {
  profile: UserProfile | null;
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
  const { getToken } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Sync Clerk user with backend on load
  useEffect(() => {
    async function syncUser() {
      if (!isLoaded || !user) return;

      try {
        const token = await getToken({ template: "default" });

        // 🔥 Correct endpoint that auto-creates user
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.ok) {
          const data = await res.json();
          setProfile(data.data);
          saveUserProfile(data.data);
        } else {
          console.warn("⚠️ User sync failed:", res.status);
        }
      } catch (err) {
        console.error("Failed to sync user:", err);
      } finally {
        setLoading(false);
      }
    }

    syncUser();
  }, [user, isLoaded]);

  // ✅ Update user profile both locally + on backend
  const updateProfile = async (newProfile: UserProfile) => {
    try {
      setProfile(newProfile);
      saveUserProfile(newProfile);

      const token = await getToken({ template: "default" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newProfile),
        }
      );

      const data = await res.json();

      if (data.success && data.data) {
        // 🔁 ensure we store the backend-confirmed version
        setProfile(data.data);
        saveUserProfile(data.data);
      } else {
        console.warn("Backend profile update failed:", data);
      }
    } catch (err) {
      console.error("Failed to update user profile:", err);
    }
  };

  const value: UserContextType = {
    profile,
    updateProfile,
    setUserProfile: (p) => updateProfile(p),
    isTeacher: profile?.role === "teacher",
    isStudent: profile?.role === "student",
    loading,
    isLoadingProfile: loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserProfile() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProvider");
  }
  return context;
}

export { useUserProfile as useUser };
