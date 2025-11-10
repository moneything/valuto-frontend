// frontend/app/dashboard/trivia/session/[sessionId]/results/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

export default function TriviaResultsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const router = useRouter();
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = await getToken({ template: "default" });
        if (!token) {
          setError("Authentication token missing");
          setLoading(false);
          return;
        }

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const res = await axios.get(
          `${baseUrl}/api/trivia/session/${sessionId}/results`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setResults(res.data.data);
        } else {
          setError(res.data.error || "Failed to load results");
        }
      } catch (err: any) {
        console.error("Error loading results:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized. Please sign in again.");
        } else {
          setError("Unable to fetch results");
        }
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) fetchResults();
  }, [sessionId, getToken]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading results...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen items-center justify-center text-center px-6">
        <h1 className="text-2xl font-bold mb-4 text-red-600">{error}</h1>
        <button
          onClick={() => router.push("/dashboard/trivia")}
          className="bg-valuto-green-600 hover:bg-valuto-green-700 text-white px-6 py-3 rounded-lg"
        >
          Back to Trivia Hub
        </button>
      </div>
    );
  }

  // Handle both host & player result structures
  const leaderboard =
    results?.leaderboard || results?.results || [];

  const playerResult = results?.playerResult;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-2 text-center">
        {results.sessionTitle || "Trivia Results"}
      </h1>

      <p className="text-gray-600 mb-8 text-center">
        {playerResult
          ? "Your performance summary"
          : "Full session leaderboard"}
      </p>

      {/* Player personal summary */}
      {playerResult && (
        <div className="bg-white shadow rounded-xl p-6 w-full max-w-md mb-10 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            {playerResult.userName}
          </h2>
          <p className="text-gray-600 mb-1">
            Rank: #{playerResult.rank}
          </p>
          <p className="text-gray-600 mb-1">
            Score: {playerResult.score} pts
          </p>
          <p className="text-gray-600">
            Accuracy: {playerResult.accuracy}%
          </p>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-white shadow rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Final Leaderboard 🏆
        </h2>
        {leaderboard.length === 0 ? (
          <p className="text-gray-500 text-center">
            No results available yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {leaderboard.map((player: any, i: number) => (
              <li
                key={player.userId || i}
                className={`flex justify-between border-b border-gray-200 py-2 ${
                  playerResult?.userId === player.userId
                    ? "bg-green-50 font-semibold"
                    : ""
                }`}
              >
                <span>
                  #{player.rank || i + 1} {player.userName || player.name}
                </span>
                <span className="font-semibold">{player.score} pts</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => router.push("/dashboard/trivia")}
        className="mt-8 bg-valuto-green-600 hover:bg-valuto-green-700 text-white px-6 py-3 rounded-lg"
      >
        Back to Trivia Hub
      </button>
    </div>
  );
}
