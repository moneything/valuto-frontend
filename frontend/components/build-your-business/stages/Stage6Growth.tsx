"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { MARKETING_CHANNELS } from "@/components/build-your-business/data";
import BusinessDashboard from "@/components/build-your-business/BusinessDashboard";
import HiringPanel from "@/components/build-your-business/HiringPanel";
import AchievementsPanel from "@/components/build-your-business/AchievementsPanel";
import { Card, GameButton, GoldButton } from "@/components/build-your-business/ui";

type Tab = "dashboard" | "grow" | "hire" | "achievements";

export default function Stage6Growth() {
  const { state, advanceDay, advanceWeek, toggleMarketing } = useGame();
  const [tab, setTab] = useState<Tab>("dashboard");

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "grow", label: "Grow", icon: "📈" },
    { id: "hire", label: "Hire", icon: "👥" },
    { id: "achievements", label: "Awards", icon: "🏆" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl space-y-4">
      <div className="space-y-1 text-center">
        <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
          {state.businessName} <span className="text-emerald-300">HQ</span>
        </h2>
        <p className="text-xs text-[#94a8a0]">Week {state.week} • Day {state.day} • {state.selectedIdea?.name}</p>
      </div>

      <div className="flex gap-1 rounded-xl bg-white/[0.04] p-1">
        {tabs.map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 font-display text-xs font-medium transition-all ${
              tab === tabItem.id ? "bg-[rgba(27,31,39,0.96)] text-white shadow-[0_0_16px_rgba(16,185,129,0.12)]" : "text-[#94a8a0] hover:text-white"
            }`}
          >
            <span>{tabItem.icon}</span>
            <span className="hidden sm:inline">{tabItem.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "dashboard" ? (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BusinessDashboard />
          </motion.div>
        ) : null}

        {tab === "grow" ? (
          <motion.div key="grow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <Card className="space-y-3">
              <h3 className="font-display text-sm font-semibold text-white">Growth Actions</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <GameButton onClick={advanceDay}>Next Day</GameButton>
                <GameButton onClick={advanceWeek}>Advance 1 Week</GameButton>
                <GoldButton
                  onClick={() => {
                    advanceWeek();
                    advanceWeek();
                    advanceWeek();
                    advanceWeek();
                  }}
                >
                  Skip 4 Weeks
                </GoldButton>
              </div>
            </Card>

            <Card className="space-y-3">
              <h3 className="font-display text-sm font-semibold text-white">Marketing Channels</h3>
              {MARKETING_CHANNELS.map((channel) => {
                const active = state.activeMarketing.includes(channel.id);
                return (
                  <div
                    key={channel.id}
                    onClick={() => toggleMarketing(channel.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${
                      active ? "border-emerald-300/30 bg-emerald-300/10" : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <span className="text-sm font-medium text-white">
                      {channel.icon} {channel.name}
                    </span>
                    <span className={`font-display text-xs font-bold ${active ? "text-emerald-300" : "text-[#94a8a0]"}`}>
                      {active ? "Active" : channel.costPerWeek === 0 ? "Free" : `£${channel.costPerWeek}/wk`}
                    </span>
                  </div>
                );
              })}
            </Card>
          </motion.div>
        ) : null}

        {tab === "hire" ? (
          <motion.div key="hire" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HiringPanel />
          </motion.div>
        ) : null}

        {tab === "achievements" ? (
          <motion.div key="achievements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AchievementsPanel />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
