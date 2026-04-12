"use client";

import { motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { GameStage, STAGE_ICONS, STAGE_NAMES } from "@/components/build-your-business/types";

const stages: GameStage[] = [1, 2, 3, 4, 5, 6];

export default function StageProgress() {
  const { state } = useGame();

  return (
    <div className="w-full px-2 py-4">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        {stages.map((stage, index) => {
          const isActive = state.stage === stage;
          const isCompleted = state.stage > stage;
          const isLocked = state.stage < stage;

          return (
            <div key={stage} className="flex items-center">
              <motion.div
                className="flex flex-col items-center gap-1.5"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm ${
                    isActive
                      ? "border-emerald-300 bg-emerald-400/20 text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.18)]"
                      : isCompleted
                        ? "border-emerald-300 bg-emerald-300 text-[#08110d]"
                        : "border-white/10 bg-white/[0.04] text-[#94a8a0]"
                  }`}
                >
                  {isCompleted ? "✓" : STAGE_ICONS[stage]}
                </div>
                <span
                  className={`max-w-[60px] text-center font-display text-[10px] font-medium leading-tight ${
                    isActive ? "text-emerald-300" : isCompleted ? "text-white" : "text-[#94a8a0]"
                  }`}
                >
                  {STAGE_NAMES[stage]}
                </span>
              </motion.div>
              {index < stages.length - 1 ? (
                <div className={`mx-1 h-0.5 w-6 rounded-full sm:w-10 ${isCompleted ? "bg-emerald-300" : "bg-white/10"}`} />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
