"use client";

import { motion } from "framer-motion";

interface Props {
  value: number;
  variant: "happiness" | "stress" | "emerald";
}

const variantStyles = {
  happiness: "bg-gradient-to-r from-amber-300 to-yellow-400",
  stress: "bg-rose-400",
  emerald: "bg-gradient-to-r from-emerald-400 to-emerald-300",
};

export default function ProgressBar({ value, variant }: Props) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className={`h-full rounded-full ${variantStyles[variant]}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
