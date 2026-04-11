"use client";

import { motion } from "framer-motion";
import AvatarPreview from "@/components/build-your-life/AvatarPreview";
import NetWorthChart from "@/components/build-your-life/NetWorthChart";
import { GameState } from "@/components/build-your-life/types";

interface Props {
  state: GameState;
  onRestart: () => void;
}

export default function SummaryScreen({ state, onRestart }: Props) {
  const formatMoney = (value: number) => (value < 0 ? `-£${Math.abs(value).toLocaleString()}` : `£${value.toLocaleString()}`);
  const grade =
    state.netWorth > 500000
      ? "S"
      : state.netWorth > 200000
        ? "A"
        : state.netWorth > 100000
          ? "B"
          : state.netWorth > 50000
            ? "C"
            : "D";
  const gradeColor =
    grade === "S" || grade === "A"
      ? "text-amber-300 [text-shadow:0_0_20px_rgba(251,191,36,0.35)]"
      : grade === "B"
        ? "text-emerald-300 [text-shadow:0_0_20px_rgba(52,211,153,0.35)]"
        : "text-white";

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl text-center">
        <div className="mb-2 font-display text-sm uppercase tracking-[0.3em] text-emerald-300">Your Life Story</div>
        <h1 className="mb-8 font-display text-4xl font-bold text-white md:text-5xl">Life Complete</h1>

        {state.avatar ? (
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-amber-300/25 bg-[rgba(10,16,14,0.92)] shadow-[0_0_28px_rgba(251,191,36,0.15)]">
              <AvatarPreview config={state.avatar} size={90} />
            </div>
          </div>
        ) : null}

        <div className="mb-6 rounded-2xl border border-white/10 bg-[rgba(10,16,14,0.88)] p-8 backdrop-blur-xl">
          <div className={`mb-2 font-display text-7xl font-bold ${gradeColor}`}>{grade}</div>
          <div className="mb-2 text-sm text-[#8ea097]">Financial Life Grade</div>
          <div className="mb-6 font-display text-lg font-bold text-amber-300">Life Score: {state.lifeScore}</div>

          <div className="mb-6 grid grid-cols-2 gap-4 text-left">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <div className="font-display text-xs uppercase text-[#8ea097]">Final Net Worth</div>
              <div className="font-display text-xl font-bold text-emerald-300">{formatMoney(state.netWorth)}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <div className="font-display text-xs uppercase text-[#8ea097]">Final Salary</div>
              <div className="font-display text-xl font-bold text-white">{formatMoney(state.salary)}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <div className="font-display text-xs uppercase text-[#8ea097]">Happiness</div>
              <div className="font-display text-xl font-bold text-amber-300">{state.happiness}%</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <div className="font-display text-xs uppercase text-[#8ea097]">Achievements</div>
              <div className="font-display text-xl font-bold text-white">{state.achievements.length}</div>
            </div>
          </div>

          {state.traits.length > 0 ? (
            <div className="mb-4">
              <div className="mb-2 font-display text-xs uppercase text-[#8ea097]">Your Traits</div>
              <div className="flex flex-wrap justify-center gap-2">
                {state.traits.map((trait) => (
                  <span key={trait} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white capitalize">
                    {trait.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {state.achievements.length > 0 ? (
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {state.achievements.map((achievement) => (
                <span key={achievement.id} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white">
                  {achievement.icon} {achievement.title}
                </span>
              ))}
            </div>
          ) : null}

          <NetWorthChart history={state.history} />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-300 px-8 py-4 font-display text-lg font-bold text-[#04120c] shadow-[0_0_30px_rgba(52,211,153,0.35)]"
        >
          Play Again
        </motion.button>
        <p className="mt-3 text-sm text-[#8ea097]">New avatar, new traits, new strategy. Compare your outcomes.</p>
      </motion.div>
    </div>
  );
}
