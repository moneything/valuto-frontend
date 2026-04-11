"use client";

import { motion } from "framer-motion";

interface SuggestionChipProps {
  text: string;
  icon?: string;
  onClick: () => void;
  delay?: number;
}

export default function SuggestionChip({
  text,
  icon,
  onClick,
  delay = 0,
}: SuggestionChipProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-white/10 bg-[#101816]/82 px-4 py-3 text-left transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/8"
    >
      <span className="text-xs leading-snug text-[#8ea097] transition-colors group-hover:text-white">
        {icon ? <span className="mr-1.5">{icon}</span> : null}
        {text}
      </span>
    </motion.button>
  );
}
