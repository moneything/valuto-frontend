"use client";

import { motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { MARKETING_CHANNELS } from "@/components/build-your-business/data";
import { Card, GameButton } from "@/components/build-your-business/ui";

export default function Stage5Marketing() {
  const { state, toggleMarketing, setStage } = useGame();

  const totalCost = state.activeMarketing.reduce((sum, id) => {
    const channel = MARKETING_CHANNELS.find((item) => item.id === id);
    return sum + (channel?.costPerWeek || 0);
  }, 0);

  const totalReach = state.activeMarketing.reduce((sum, id) => {
    const channel = MARKETING_CHANNELS.find((item) => item.id === id);
    return sum + (channel?.reach || 0);
  }, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2 text-center">
        <span className="text-3xl">📣</span>
        <h2 className="font-display text-2xl font-bold text-white">Marketing Strategy</h2>
        <p className="text-sm text-[#94a8a0]">Choose your marketing channels. Each has different costs and results.</p>
      </div>

      <div className="grid gap-3">
        {MARKETING_CHANNELS.map((channel, index) => {
          const isActive = state.activeMarketing.includes(channel.id);
          return (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => toggleMarketing(channel.id)}
              className={`cursor-pointer rounded-2xl border p-4 transition ${
                isActive
                  ? "border-emerald-300/40 bg-emerald-300/10"
                  : "border-white/10 bg-[rgba(27,31,39,0.96)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{channel.icon}</span>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">{channel.name}</h4>
                    <p className="text-xs text-[#94a8a0]">{channel.description}</p>
                  </div>
                </div>
                <div className="ml-3 shrink-0 text-right">
                  <p className="font-display text-sm font-bold text-white">
                    {channel.costPerWeek === 0 ? "Free" : `£${channel.costPerWeek}/wk`}
                  </p>
                  <div className="mt-0.5 flex gap-2 text-[10px] text-[#94a8a0]">
                    <span>📊 {channel.conversionRate}%</span>
                    <span>👥 {(channel.reach / 1000).toFixed(1)}K</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Card>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <span className="font-display text-lg font-bold text-amber-300">£{totalCost}/wk</span>
            <p className="text-[10px] text-[#94a8a0]">Marketing Spend</p>
          </div>
          <div>
            <span className="font-display text-lg font-bold text-emerald-300">{(totalReach / 1000).toFixed(1)}K</span>
            <p className="text-[10px] text-[#94a8a0]">Weekly Reach</p>
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white">{state.activeMarketing.length}</span>
            <p className="text-[10px] text-[#94a8a0]">Channels</p>
          </div>
        </div>
      </Card>

      {state.activeMarketing.length === 0 ? (
        <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-3">
          <p className="text-xs font-medium text-amber-300">You can proceed without marketing, but great products still need visibility.</p>
        </div>
      ) : null}

      <GameButton onClick={() => setStage(6)}>Launch & Grow! 🚀</GameButton>
    </motion.div>
  );
}
