"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { useUserProfile } from "@/lib/userContext";

type Challenge = {
  _id: string;
  challengeName: string;
  challengeDescription?: string;
  pointsEarned: number;
  completed: boolean;
  currentProgress?: number;
  targetProgress?: number;
};

export default function ChallengesPage() {
  const { getToken } = useAuth();
  const { isTeacher } = useUserProfile();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken({ template: "default" });
      if (!token) throw new Error("Missing auth token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/challenges/daily`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || "Failed to load challenges");
      }

      setChallenges(data.data || []);
    } catch (err: any) {
      console.error("Failed to load challenges", err);
      setError(err.message || "Failed to load challenges");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  useEffect(() => {
    const onFocus = () => fetchChallenges();
    const onVisibility = () => {
      if (document.visibilityState === "visible") fetchChallenges();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [fetchChallenges]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Daily Challenges 🎯
        </h1>
        <p className="text-lg text-gray-600">
          Complete challenges to earn bonus points
        </p>
        <div className="mt-3">
          <button
            onClick={fetchChallenges}
            className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-16 bg-gray-100 rounded-lg"></div>
          <div className="h-16 bg-gray-100 rounded-lg"></div>
          <div className="h-16 bg-gray-100 rounded-lg"></div>
        </div>
      ) : challenges.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center">
          <div className="text-5xl mb-4">🧑‍🏫</div>
          <p className="text-gray-600">
            {isTeacher
              ? "Teacher daily challenges are coming soon."
              : "No challenges available right now. Check back soon!"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge._id}
              className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 ${
                challenge.completed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{challenge.challengeName}</h3>
                  <p className="text-gray-600">{challenge.challengeDescription || 'No description provided.'}</p>
                  {challenge.targetProgress && (
                    <p className="text-sm text-gray-500 mt-1">
                      Progress: {challenge.currentProgress || 0}/{challenge.targetProgress}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-valuto-green-600">
                    +{challenge.pointsEarned ?? 0}
                  </div>
                  <p className="text-sm text-gray-500">points</p>
                </div>
              </div>
              {challenge.completed && (
                <div className="mt-4 text-green-600 font-semibold flex items-center gap-2">
                  <span>✓</span>
                  <span>Completed!</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
