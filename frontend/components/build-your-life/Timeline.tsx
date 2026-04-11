"use client";

import { YearSnapshot } from "@/components/build-your-life/types";

interface Props {
  history: YearSnapshot[];
  currentAge: number;
}

const milestones = [18, 25, 30, 40, 50, 65];

export default function Timeline({ history, currentAge }: Props) {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-xl border border-white/10 bg-[rgba(10,16,14,0.82)] p-4 backdrop-blur-xl">
      <h3 className="mb-3 font-display text-xs uppercase tracking-widest text-[#8ea097]">Life Timeline</h3>
      <div className="relative">
        <div className="h-1 w-full rounded-full bg-white/10" />
        <div
          className="absolute left-0 top-0 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300 transition-all duration-500"
          style={{ width: `${Math.min(100, ((currentAge - 18) / (65 - 18)) * 100)}%` }}
        />
        <div className="mt-2 flex justify-between">
          {milestones.map((age) => {
            const reached = currentAge >= age;
            const snapshot = history.find((item) => item.age === age);
            const hasEvent = snapshot?.event;

            return (
              <div key={age} className="flex flex-col items-center">
                <div
                  className={`h-3 w-3 rounded-full border-2 transition-colors ${
                    reached ? "border-emerald-300 bg-emerald-300" : "border-[#71857b] bg-transparent"
                  } ${hasEvent ? "ring-2 ring-amber-300/70 ring-offset-1 ring-offset-[#07110d]" : ""}`}
                />
                <span className={`mt-1 font-display text-xs ${reached ? "text-white" : "text-[#8ea097]"}`}>{age}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
