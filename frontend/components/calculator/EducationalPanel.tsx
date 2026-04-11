"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, X } from "lucide-react";

const educationalContent = [
  {
    title: "What is compound interest?",
    text: "Compound interest is when your earnings generate their own earnings. Instead of growing linearly, your money grows exponentially — the longer you leave it, the faster it accelerates.",
  },
  {
    title: "Why time matters more than amount",
    text: "Starting 10 years earlier can be worth more than doubling your monthly contribution. Time gives compounding the runway it needs to work its magic.",
  },
  {
    title: "Consistency beats timing",
    text: "Trying to 'time the market' rarely works. Regular, consistent investing (pound-cost averaging) smooths out volatility and builds wealth reliably over time.",
  },
];

export default function EducationalPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm text-[#8b9791] transition-colors hover:text-[#36d67d]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Lightbulb className="h-4 w-4" />
        Explain this
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4 rounded-2xl border border-white/10 bg-[#101816]/90 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#36d67d]">
                  How it works
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#8b9791] transition-colors hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {educationalContent.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-1"
                >
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-[#d7ece2]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
