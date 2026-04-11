"use client";

import { motion } from "framer-motion";
import { LifeEvent } from "@/components/build-your-life/types";

interface Props {
  event: LifeEvent;
  onResolve: () => void;
}

export default function EventModal({ event, onResolve }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="w-full max-w-md rounded-2xl border border-emerald-400/20 bg-[rgba(10,16,14,0.92)] p-8 text-center shadow-[0_0_36px_rgba(52,211,153,0.2)]"
      >
        <div className="mb-4 text-5xl">{event.icon}</div>
        <h2 className="mb-2 font-display text-2xl font-bold text-white">{event.title}</h2>
        <p className="mb-6 text-[#8ea097]">{event.description}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onResolve}
          className="rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-300 px-6 py-3 font-display font-semibold text-[#04120c]"
        >
          Continue
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
