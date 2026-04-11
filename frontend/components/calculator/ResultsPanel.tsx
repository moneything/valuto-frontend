"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ResultsPanelProps {
  totalInvested: number;
  totalValue: number;
  totalGrowth: number;
  compoundingGain: number;
  inflationAdjusted: number | null;
}

function AnimatedNumber({ value, prefix = "£" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);
  const previousRef = useRef(value);

  useEffect(() => {
    const start = previousRef.current;
    const end = value;
    const duration = 600;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    previousRef.current = value;
  }, [value]);

  const format = (input: number) => {
    if (input >= 1000000) return `${prefix}${(input / 1000000).toFixed(2)}M`;
    if (input >= 1000) return `${prefix}${(input / 1000).toFixed(1)}k`;
    return `${prefix}${input.toLocaleString("en-GB")}`;
  };

  return <span>{format(display)}</span>;
}

function ResultCard({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: number;
  variant?: "default" | "primary" | "accent";
}) {
  const colorClasses = {
    default: "text-white",
    primary: "text-[#36d67d]",
    accent: "text-[#f0b342]",
  };

  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-[#101816]/90 p-4 backdrop-blur-xl"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-[#8b9791]">{label}</p>
      <p className={`mt-2 text-xl font-bold sm:text-2xl ${colorClasses[variant]}`}>
        <AnimatedNumber value={value} />
      </p>
    </motion.div>
  );
}

export default function ResultsPanel({
  totalInvested,
  totalValue,
  totalGrowth,
  compoundingGain,
  inflationAdjusted,
}: ResultsPanelProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      <ResultCard label="Total Invested" value={totalInvested} />
      <ResultCard label="Total Value" value={totalValue} variant="primary" />
      <ResultCard label="Total Growth" value={totalGrowth} variant="primary" />
      <ResultCard label="Compounding Gain" value={compoundingGain} variant="accent" />
      {inflationAdjusted !== null ? (
        <ResultCard label="Inflation-Adjusted" value={inflationAdjusted} variant="accent" />
      ) : null}
    </div>
  );
}
