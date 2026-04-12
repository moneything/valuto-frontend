"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { Card, GameButton } from "@/components/build-your-business/ui";

export default function Stage2Research() {
  const { state, setStage } = useGame();
  const idea = state.selectedIdea!;
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [pivotDecision, setPivotDecision] = useState<"continue" | "pivot" | null>(null);

  const customers = [
    { segment: "Teens (13-17)", fit: idea.category === "Fashion" || idea.category === "Media" ? 85 : 60 },
    { segment: "Young Adults (18-25)", fit: 75 },
    { segment: "Parents", fit: idea.category === "Education" ? 80 : 40 },
    { segment: "Small Businesses", fit: idea.category === "Technology" ? 70 : 30 },
  ];

  const competitors = [
    { name: "Big Brand Co.", price: "£" + (idea.startingCost * 0.8).toFixed(0), strength: "Large audience", weakness: "Impersonal" },
    { name: "Indie Startup", price: "£" + (idea.startingCost * 1.2).toFixed(0), strength: "Unique products", weakness: "Small reach" },
    { name: "Budget Option", price: "£" + (idea.startingCost * 0.4).toFixed(0), strength: "Cheapest", weakness: "Low quality" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2 text-center">
        <span className="text-3xl">🔍</span>
        <h2 className="font-display text-2xl font-bold text-white">Market Research</h2>
        <p className="text-sm text-[#94a8a0]">Understand your market before spending money. Smart founders research first.</p>
      </div>

      <Card className="space-y-4">
        <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-white">👥 Target Customers</h3>
        <div className="space-y-3">
          {customers.map((customer, index) => (
            <motion.div
              key={customer.segment}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="w-32 shrink-0 text-xs text-[#94a8a0]">{customer.segment}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${customer.fit}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                />
              </div>
              <span className="w-10 text-right font-display text-xs font-semibold text-emerald-300">{customer.fit}%</span>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-white">⚔️ Competitor Analysis</h3>
        <div className="grid gap-3">
          {competitors.map((competitor, index) => (
            <motion.div
              key={competitor.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex items-center justify-between rounded-lg bg-white/[0.04] p-3"
            >
              <div>
                <span className="font-display text-sm font-medium text-white">{competitor.name}</span>
                <div className="mt-1 flex gap-3 text-[10px]">
                  <span className="text-emerald-300">✓ {competitor.strength}</span>
                  <span className="text-rose-300">✗ {competitor.weakness}</span>
                </div>
              </div>
              <span className="font-display text-sm font-bold text-white">{competitor.price}</span>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-white">📊 Market Overview</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg bg-white/[0.04] p-3">
            <span className="font-display text-lg font-bold text-emerald-300">{idea.marketDemand}%</span>
            <p className="mt-1 text-[10px] text-[#94a8a0]">Demand</p>
          </div>
          <div className="rounded-lg bg-white/[0.04] p-3">
            <span className="font-display text-lg font-bold text-amber-300">{idea.competition}%</span>
            <p className="mt-1 text-[10px] text-[#94a8a0]">Competition</p>
          </div>
          <div className="rounded-lg bg-white/[0.04] p-3">
            <span className="font-display text-lg font-bold text-white">{Math.round((idea.marketDemand * (100 - idea.competition)) / 100)}%</span>
            <p className="mt-1 text-[10px] text-[#94a8a0]">Opportunity</p>
          </div>
        </div>

        {!analysisComplete ? <GameButton onClick={() => setAnalysisComplete(true)}>Complete Analysis</GameButton> : null}
      </Card>

      {analysisComplete ? (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="space-y-4">
            <h3 className="font-display text-sm font-semibold text-white">Decision Time</h3>
            <p className="text-sm text-[#94a8a0]">Based on your research, what will you do?</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { id: "continue", icon: "🚀", title: "Continue", text: "The market looks good. Press forward with confidence." },
                { id: "pivot", icon: "🔄", title: "Pivot Strategy", text: "Adjust your approach to stand out from competitors." },
              ].map((option) => (
                <div
                  key={option.id}
                  onClick={() => setPivotDecision(option.id as "continue" | "pivot")}
                  className={`cursor-pointer rounded-xl border p-4 transition ${
                    pivotDecision === option.id
                      ? "border-emerald-300/40 bg-emerald-300/10"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <span className="text-xl">{option.icon}</span>
                  <h4 className="mt-2 font-display text-sm font-semibold text-white">{option.title}</h4>
                  <p className="mt-1 text-xs text-[#94a8a0]">{option.text}</p>
                </div>
              ))}
            </div>

            {pivotDecision ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-4 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-3">
                  <p className="text-xs font-medium text-emerald-300">
                    💡{" "}
                    {pivotDecision === "continue"
                      ? "Great conviction. The best entrepreneurs commit fully to their research."
                      : "Smart move. The best entrepreneurs adapt their strategy based on data."}
                  </p>
                </div>
                <GameButton onClick={() => setStage(3)}>Move to Pricing</GameButton>
              </motion.div>
            ) : null}
          </Card>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
