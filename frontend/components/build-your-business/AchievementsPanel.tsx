"use client";

import { motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { Card } from "@/components/build-your-business/ui";

export default function AchievementsPanel() {
  const { state } = useGame();

  const unlocked = state.achievements.filter((achievement) => achievement.unlocked);
  const locked = state.achievements.filter((achievement) => !achievement.unlocked);

  return (
    <div className="space-y-4">
      <Card className="text-center">
        <span className="text-3xl">🏆</span>
        <p className="mt-2 font-display text-sm font-semibold text-white">
          {unlocked.length} / {state.achievements.length} Achievements
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-400"
            style={{ width: `${(unlocked.length / state.achievements.length) * 100}%` }}
          />
        </div>
      </Card>

      {unlocked.length > 0 ? (
        <div className="space-y-2">
          <h3 className="font-display text-sm font-semibold text-white">Unlocked</h3>
          {unlocked.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="flex items-center gap-3 border-amber-300/20 shadow-[0_0_18px_rgba(245,158,11,0.12)]">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <span className="font-display text-sm font-semibold text-amber-300">{achievement.title}</span>
                  <p className="text-[10px] text-[#94a8a0]">{achievement.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : null}

      {locked.length > 0 ? (
        <div className="space-y-2">
          <h3 className="font-display text-sm font-semibold text-white">Locked</h3>
          {locked.map((achievement) => (
            <Card key={achievement.id} className="flex items-center gap-3 opacity-50">
              <span className="text-2xl grayscale">🔒</span>
              <div>
                <span className="font-display text-sm font-semibold text-[#94a8a0]">{achievement.title}</span>
                <p className="text-[10px] text-[#94a8a0]">{achievement.description}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
