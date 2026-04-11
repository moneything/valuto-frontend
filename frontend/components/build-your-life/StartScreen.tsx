"use client";

import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

export default function StartScreen({ onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-lg text-center"
    >
      <div className="mb-4 text-sm font-display uppercase tracking-[0.3em] text-emerald-300 [text-shadow:0_0_18px_rgba(52,211,153,0.45)]">
        Valuto Presents
      </div>
      <h1 className="mb-4 font-display text-5xl font-bold text-white md:text-7xl">Build Your Life</h1>
      <p className="mx-auto mb-3 max-w-lg text-lg text-[#b7c8c0] md:text-xl">
        Design your financial future. Every decision you make shapes your life.
      </p>
      <p className="mb-10 text-sm text-[#8ea097]">
        Create your avatar, choose your path, and see how your choices play out from age 18 to 65.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-300 px-10 py-4 font-display text-lg font-bold text-[#04120c] shadow-[0_0_30px_rgba(52,211,153,0.35)]"
      >
        Start Your Life
      </motion.button>

      <div className="mt-8 flex justify-center gap-6 text-xs text-[#8ea097]">
        <div className="flex items-center gap-1">
          <span>🎨</span> Create Avatar
        </div>
        <div className="flex items-center gap-1">
          <span>🧠</span> Choose Traits
        </div>
        <div className="flex items-center gap-1">
          <span>📊</span> Shape Your Future
        </div>
      </div>
    </motion.div>
  );
}
