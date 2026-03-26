"use client";

import { useEffect, useState } from "react";
import "../investment.css";

interface Props {
  duration?: number; // how long to show the screen (ms)
  onComplete: () => void; // callback when done
}

export default function TimeSimulation({ duration = 4000, onComplete }: Props) {
  const [month, setMonth] = useState(0);

  useEffect(() => {
    const steps = 6;
    const stepTime = duration / steps;

    // Animate months incrementally
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setMonth(current);
      if (current >= steps) clearInterval(interval);
    }, stepTime);

    // After full duration, go to results
    const timeout = setTimeout(() => {
      onComplete();
    }, duration + 200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onComplete]);

  const progressPercent = Math.min((month / 6) * 100, 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#232324]/95 p-10 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
        <div className="text-5xl mb-3">⏰</div>
        <h2 className="mb-1 text-2xl font-bold text-white">Time is passing...</h2>
        <p className="mb-6 text-[#9a9a9d]">Your investments are working hard!</p>

        <p className="mb-4 text-3xl font-extrabold text-green-300">
          Month {month} / 6
        </p>

        <div className="mb-6 h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-3 rounded-full bg-green-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <ul className="space-y-1 text-sm text-[#9a9a9d]">
          <li>📊 Markets are moving...</li>
          <li>📰 News is breaking...</li>
          <li>💰 Your portfolio is changing...</li>
        </ul>
      </div>
    </div>
  );
}
