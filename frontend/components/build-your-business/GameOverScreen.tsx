"use client";

import { motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { Card, GameButton } from "@/components/build-your-business/ui";

export default function GameOverScreen() {
  const { state, resetGame } = useGame();
  const { metrics } = state;

  const reasons: string[] = [];
  if (metrics.cash < -500) reasons.push("You ran out of cash. Managing cash flow is critical for survival.");
  if (metrics.stress >= 100) reasons.push("Stress overwhelmed you. Even entrepreneurs need balance.");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-lg space-y-6 py-12 text-center"
    >
      <span className="text-5xl">📉</span>
      <h2 className="font-display text-3xl font-bold text-white">Game Over</h2>
      <p className="text-[#94a8a0]">Your business journey has ended, but every failure is a lesson.</p>

      <Card className="space-y-3 text-left">
        <h3 className="font-display text-sm font-semibold text-white">Final Stats</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-[#94a8a0]">Weeks survived:</span>
          <span className="text-right font-display font-bold text-white">{state.week}</span>
          <span className="text-[#94a8a0]">Final day:</span>
          <span className="text-right font-display font-bold text-white">{state.day}</span>
          <span className="text-[#94a8a0]">Total revenue:</span>
          <span className="text-right font-display font-bold text-white">£{metrics.revenue.toLocaleString()}</span>
          <span className="text-[#94a8a0]">Total customers:</span>
          <span className="text-right font-display font-bold text-white">{metrics.customers}</span>
          <span className="text-[#94a8a0]">Peak valuation:</span>
          <span className="text-right font-display font-bold text-amber-300">£{metrics.valuation.toLocaleString()}</span>
        </div>
      </Card>

      {reasons.length > 0 ? (
        <Card className="space-y-2 text-left">
          <h3 className="font-display text-sm font-semibold text-white">What Went Wrong</h3>
          {reasons.map((reason, index) => (
            <div key={index} className="rounded-lg border border-rose-300/20 bg-rose-300/10 p-3">
              <p className="text-xs text-rose-300">{reason}</p>
            </div>
          ))}
        </Card>
      ) : null}

      <GameButton onClick={resetGame}>Try Again with a New Strategy</GameButton>
    </motion.div>
  );
}
