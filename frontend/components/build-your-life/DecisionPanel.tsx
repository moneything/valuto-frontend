"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Decision, DecisionOption } from "@/components/build-your-life/types";

interface Props {
  decision: Decision;
  onChoose: (option: DecisionOption) => void;
}

export default function DecisionPanel({ decision, onChoose }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={decision.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mx-auto w-full max-w-3xl"
      >
        <div className="rounded-xl border border-white/10 bg-[rgba(10,16,14,0.86)] p-6 backdrop-blur-xl">
          <div className="mb-6 text-center">
            <span className="mb-2 block text-3xl">{decision.icon}</span>
            <h2 className="font-display text-xl font-bold text-white">{decision.title}</h2>
            <p className="mt-1 text-sm text-[#8ea097]">{decision.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {decision.options.map((option, index) => (
              <motion.button
                key={option.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChoose(option)}
                className="group rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left transition-all duration-200 hover:border-emerald-400/40 hover:shadow-[0_0_20px_rgba(52,211,153,0.18)]"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-display font-semibold text-white transition-colors group-hover:text-emerald-300">
                    {option.label}
                  </span>
                </div>
                <p className="text-xs text-[#8ea097]">{option.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
