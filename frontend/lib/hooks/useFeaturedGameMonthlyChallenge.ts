"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

type ChallengeRecord = {
  _id: string;
  challengeType: string;
  currentProgress?: number;
  targetProgress?: number;
  completed?: boolean;
};

export function useFeaturedGameMonthlyChallenge(challengeType: string) {
  const { getToken } = useAuth();

  useEffect(() => {
    let cancelled = false;

    const syncMonthlyChallenge = async () => {
      try {
        const token = await getToken({ template: "default" });
        if (!token || cancelled) return;

        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const challengeResponse = await fetch(`${baseUrl}/api/challenges/daily`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const challengePayload = await challengeResponse.json();
        if (!challengeResponse.ok || !challengePayload.success || cancelled) return;

        const monthlyChallenge = (challengePayload.data || []).find(
          (challenge: ChallengeRecord) => challenge.challengeType === challengeType
        );

        if (!monthlyChallenge) return;
        if (monthlyChallenge.completed) return;
        if ((monthlyChallenge.currentProgress || 0) >= (monthlyChallenge.targetProgress || 1)) return;

        await fetch(`${baseUrl}/api/challenges/${monthlyChallenge._id}/progress`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ increment: 1 }),
        });
      } catch (error) {
        console.error("Failed to sync monthly featured game challenge:", error);
      }
    };

    syncMonthlyChallenge();

    return () => {
      cancelled = true;
    };
  }, [challengeType, getToken]);
}
