"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { Card } from "@/components/build-your-business/ui";

export default function EventModal() {
  const { state, handleEventChoice } = useGame();
  const event = state.showEvent;

  if (!event) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "hsl(220 20% 10% / 0.8)", backdropFilter: "blur(8px)" }}
      >
        <Card className="w-full max-w-md border-emerald-300/20 shadow-[0_0_28px_rgba(16,185,129,0.16)]">
          <div className="mb-4 text-center">
            <span className="text-4xl">{event.icon}</span>
            <h3 className="mt-2 font-display text-xl font-bold text-white">{event.title}</h3>
            <p className="mt-2 text-sm text-[#94a8a0]">{event.description}</p>
          </div>

          <div className="space-y-2">
            {event.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleEventChoice(event.id, choice.id)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-emerald-300/30"
              >
                <p className="text-sm font-medium text-white">{choice.text}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.entries(choice.effects).map(([key, value]) => (
                    <span
                      key={key}
                      className={`rounded-full border px-2 py-1 text-[10px] ${
                        Number(value) < 0
                          ? "border-rose-300/20 bg-rose-300/10 text-rose-300"
                          : "border-emerald-300/20 bg-emerald-300/10 text-emerald-300"
                      }`}
                    >
                      {key}: {Number(value) > 0 ? "+" : ""}
                      {value}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
