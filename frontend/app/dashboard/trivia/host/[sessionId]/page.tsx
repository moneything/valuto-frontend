// frontend/app/dashboard/trivia/host/[sessionId]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTrivia } from "@/lib/hooks/useTrivia";

export default function HostSessionPage() {
  const router = useRouter();
  const { sessionId } = useParams<{ sessionId: string }>();
  const { socket, isConnected } = useTrivia();

  const [session, setSession] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [status, setStatus] = useState<"loading" | "waiting" | "playing" | "ended">("loading");

  // 🔹 Connect & join as host
  useEffect(() => {
    if (!socket || !isConnected || !sessionId) return;

    socket.emit("host_session", { sessionId }, (res: any) => {
      if (res.success) {
        setSession(res.data);
        setStatus("waiting");
      } else {
        console.error("Failed to host session:", res.error);
        setStatus("ended");
      }
    });

    // Listen for socket updates
    socket.on("waiting_lobby", (data: any) => setSession(data));
    socket.on("game_started", () => setStatus("playing"));
    socket.on("new_question", (data: any) => setCurrentQuestion(data.question));
    socket.on("leaderboard_update", (data: any) => setLeaderboard(data.leaderboard));
    socket.on("game_over", (data: any) => {
      setStatus("ended");
      setLeaderboard(data.leaderboard);
    });

    return () => {
      socket.off("waiting_lobby");
      socket.off("game_started");
      socket.off("new_question");
      socket.off("leaderboard_update");
      socket.off("game_over");
    };
  }, [socket, isConnected, sessionId]);

  // 🔹 Control buttons
  const handleStart = () => socket?.emit("start_game", { sessionId });
  const handleNext = () => socket?.emit("next_question", { sessionId });
  const handleEnd = () => socket?.emit("end_game", { sessionId });

  // 🔹 Loading state
  if (status === "loading")
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Connecting to session...
      </div>
    );

  // 🔹 Ended state
  if (status === "ended")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Game Ended 🎉</h1>
        <div className="bg-white shadow rounded-xl p-6 max-w-lg w-full">
          <h2 className="text-xl font-semibold mb-4">Final Leaderboard</h2>
          <ul className="space-y-2">
            {leaderboard.map((p, i) => (
              <li
                key={p.userId || i}
                className="flex justify-between border-b border-gray-200 py-2"
              >
                <span className="font-semibold">
                  #{i + 1} {p.name}
                </span>
                <span>{p.score} pts</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => router.push("/dashboard/trivia")}
          className="mt-8 bg-valuto-green-600 text-white px-6 py-3 rounded-lg hover:bg-valuto-green-700"
        >
          Back to Trivia Hub
        </button>
      </div>
    );

  // 🔹 Waiting lobby
  if (status === "waiting")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-bold mb-4">{session?.title || "Trivia Session"}</h1>
        <p className="text-gray-600 mb-2">
          Join Code: <span className="font-mono text-2xl">{session?.joinCode}</span>
        </p>
        <p className="text-gray-500 mb-6">
          Players joined: {session?.playerCount || 0}
        </p>
        <button
          onClick={handleStart}
          className="bg-valuto-green-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-valuto-green-700"
        >
          Start Game 🎮
        </button>
      </div>
    );

  // 🔹 Playing
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">{session?.title}</h1>

      {currentQuestion ? (
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options.map((opt: string, i: number) => (
              <div
                key={i}
                className="bg-valuto-green-50 p-4 rounded-lg text-gray-800 font-semibold"
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 mb-6">Waiting for next question...</div>
      )}

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Next Question ➡️
        </button>
        <button
          onClick={handleEnd}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
          End Game 🏁
        </button>
      </div>

      <div className="mt-12 w-full max-w-2xl bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold mb-4">Leaderboard 🏆</h3>
        <ul className="space-y-2">
          {leaderboard.map((p, i) => (
            <li key={i} className="flex justify-between border-b border-gray-100 py-2">
              <span>
                #{i + 1} {p.name}
              </span>
              <span className="font-semibold">{p.score} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
