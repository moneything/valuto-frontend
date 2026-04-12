"use client";

import { motion } from "framer-motion";

interface Props {
  icon: string;
  label: string;
  value: string;
  color?: "emerald" | "gold" | "red" | "default";
  delay?: number;
}

const colorMap = {
  emerald: "text-emerald-300",
  gold: "text-amber-300",
  red: "text-rose-300",
  default: "text-white",
};

export default function StatCard({ icon, label, value, color = "default", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="rounded-lg border border-white/8 bg-[rgba(27,31,39,0.94)] p-3 backdrop-blur-xl md:p-4"
    >
      <div className="mb-1 flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="font-display text-xs uppercase tracking-wider text-[#94a8a0]">{label}</span>
      </div>
      <div className={`font-display text-lg font-bold md:text-xl ${colorMap[color]}`}>{value}</div>
    </motion.div>
  );
}
