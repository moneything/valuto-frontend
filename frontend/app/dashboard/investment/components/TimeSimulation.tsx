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
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full border border-gray-100">
        <div className="text-5xl mb-3">⏰</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Time is passing...</h2>
        <p className="text-gray-500 mb-6">Your investments are working hard!</p>

        <p className="text-3xl font-extrabold text-green-600 mb-4">
          Month {month} / 6
        </p>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-6">
          <div
            className="h-3 bg-green-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <ul className="text-gray-500 text-sm space-y-1">
          <li>📊 Markets are moving...</li>
          <li>📰 News is breaking...</li>
          <li>💰 Your portfolio is changing...</li>
        </ul>
      </div>
    </div>
  );
}
