"use client";

import { motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { Card } from "@/components/build-your-business/ui";

export default function MetricsBar() {
  const { state } = useGame();
  const { metrics } = state;

  const stats = [
    { label: "Cash", value: `£${metrics.cash.toLocaleString()}`, color: metrics.cash >= 0 ? "text-emerald-300" : "text-rose-300" },
    { label: "Revenue", value: `£${metrics.revenue.toLocaleString()}`, color: "text-emerald-300" },
    { label: "Customers", value: metrics.customers.toString(), color: "text-white" },
    { label: "Reputation", value: `${metrics.reputation}%`, color: metrics.reputation >= 60 ? "text-emerald-300" : "text-amber-300" },
  ];

  return (
    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="min-w-[78px] px-3 py-2 text-center">
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#94a8a0]">{stat.label}</span>
          <div className={`font-display text-sm font-bold sm:text-base ${stat.color}`}>{stat.value}</div>
        </Card>
      ))}
      {state.week > 0 ? (
        <Card className="min-w-[78px] px-3 py-2 text-center">
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#94a8a0]">Week</span>
          <div className="font-display text-sm font-bold text-white sm:text-base">{state.week}</div>
        </Card>
      ) : null}
    </motion.div>
  );
}
