"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Achievement } from "@/components/build-your-life/types";

interface Props {
  achievements: Achievement[];
}

export default function AchievementPopup({ achievements }: Props) {
  const [shown, setShown] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState<Achievement | null>(null);

  useEffect(() => {
    const nextAchievement = achievements.find((achievement) => !shown.has(achievement.id));
    if (!nextAchievement) return;

    setCurrent(nextAchievement);
    setShown((previous) => new Set(previous).add(nextAchievement.id));
    const timer = setTimeout(() => setCurrent(null), 3000);

    return () => clearTimeout(timer);
  }, [achievements, shown]);

  return (
    <AnimatePresence>
      {current ? (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-xl border border-amber-300/25 bg-[rgba(10,16,14,0.92)] px-6 py-4 shadow-[0_0_28px_rgba(251,191,36,0.2)] backdrop-blur-xl">
            <span className="text-3xl">{current.icon}</span>
            <div>
              <div className="font-display text-xs uppercase tracking-widest text-amber-300">Achievement Unlocked</div>
              <div className="font-display font-bold text-white">{current.title}</div>
              <div className="text-xs text-[#8ea097]">{current.description}</div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
