"use client";

import { motion } from "framer-motion";

interface ControlSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
}

export default function ControlSlider({
  label,
  value,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
  onChange,
}: ControlSliderProps) {
  const percentage = ((value - min) / (max - min || 1)) * 100;

  const formatValue = (input: number) => {
    if (input >= 1000000) return `${(input / 1000000).toFixed(1)}M`;
    if (input >= 1000) return `${(input / 1000).toFixed(input >= 10000 ? 0 : 1)}k`;
    return input.toFixed(step < 1 ? 1 : 0);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium uppercase tracking-[0.18em] text-[#8b9791]">
          {label}
        </span>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold text-white"
        >
          {prefix}
          {formatValue(value)}
          {suffix}
        </motion.span>
      </div>

      <div className="relative h-8">
        <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-white/10" />
        <motion.div
          className="absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,#f0b342,#36d67d)]"
          style={{ width: `${percentage}%` }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(parseFloat(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />

        <motion.div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${percentage}%` }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="h-5 w-5 rounded-full border border-white/50 bg-white shadow-[0_0_0_6px_rgba(54,214,125,0.15),0_8px_26px_rgba(54,214,125,0.32)]" />
        </motion.div>
      </div>

      <div className="flex justify-between text-xs text-[#7f8c86]">
        <span>
          {prefix}
          {formatValue(min)}
        </span>
        <span>
          {prefix}
          {formatValue(max)}
          {suffix}
        </span>
      </div>
    </div>
  );
}
