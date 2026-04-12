"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";

export default function AchievementToast() {
  const { state, newAchievements, consumeNewAchievement } = useGame();
  const [showing, setShowing] = useState<string | null>(null);

  useEffect(() => {
    if (!showing && newAchievements.length > 0) {
      setShowing(newAchievements[0]);
    }
  }, [newAchievements, showing]);

  useEffect(() => {
    if (!showing) return;

    const timer = setTimeout(() => {
      setShowing(null);
      consumeNewAchievement();
    }, 1400);

    return () => clearTimeout(timer);
  }, [showing, consumeNewAchievement]);

  const achievement = state.achievements.find((item) => item.id === showing);

  return (
    <AnimatePresence>
      {achievement ? (
        <motion.div
          initial={{ y: -80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -80, opacity: 0, scale: 0.9 }}
          className="fixed left-1/2 top-20 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-xl border border-amber-300/20 bg-[rgba(27,31,39,0.98)] px-5 py-3 shadow-[0_0_22px_rgba(245,158,11,0.14)] backdrop-blur-xl"
        >
          <span className="text-2xl">{achievement.icon}</span>
          <div>
            <p className="font-display text-[10px] font-bold uppercase tracking-wider text-amber-300">Achievement Unlocked</p>
            <p className="font-display text-sm font-semibold text-white">{achievement.title}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
