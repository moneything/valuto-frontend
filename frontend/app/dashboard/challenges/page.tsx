"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

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
        <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          Daily, Weekly and Monthly Challenges 🎯
        </h1>
        <p className="text-lg text-[#9a9a9d]">
          Complete challenges to earn bonus points
        </p>
        <div className="mt-3">
          <button
            onClick={fetchChallenges}
            className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#d7d7db] hover:bg-white/[0.08]"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 border-l-4 border-red-400 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-16 rounded-lg bg-white/[0.05]"></div>
          <div className="h-16 rounded-lg bg-white/[0.05]"></div>
          <div className="h-16 rounded-lg bg-white/[0.05]"></div>
        </div>
      ) : challenges.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#232324]/95 p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
          <div className="text-5xl mb-4">🎯</div>
          <p className="text-[#9a9a9d]">No challenges available right now. Check back soon.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge._id}
              className={`rounded-xl border border-white/10 bg-[#232324]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] ${
                challenge.completed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-bold text-white">{challenge.challengeName}</h3>
                  <p className="text-[#d7d7db]">{challenge.challengeDescription || 'No description provided.'}</p>
                  {challenge.targetProgress && (
                    <p className="mt-1 text-sm text-[#9a9a9d]">
                      Progress: {challenge.currentProgress || 0}/{challenge.targetProgress}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-valuto-green-300">
                    +{challenge.pointsEarned ?? 0}
                  </div>
                  <p className="text-sm text-[#9a9a9d]">points</p>
                </div>
              </div>
              {challenge.completed && (
                <div className="mt-4 flex items-center gap-2 font-semibold text-green-300">
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
