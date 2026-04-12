"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PersonalityTrait } from "@/components/build-your-life/types";

interface Props {
  onComplete: (traits: PersonalityTrait[]) => void;
}

const TRAITS: { id: PersonalityTrait; icon: string; name: string; description: string; effect: string }[] = [
  { id: "risk-taker", icon: "💡", name: "Risk Taker", description: "You thrive on bold moves and big bets", effect: "+20% investment returns, +15% volatility" },
  { id: "careful-saver", icon: "💰", name: "Careful Saver", description: "You prioritise building a financial safety net", effect: "+GBP200/yr savings, lower stress from spending" },
  { id: "entrepreneurial", icon: "🚀", name: "Entrepreneurial", description: "You spot opportunities others miss", effect: "More business events, higher income potential" },
  { id: "big-spender", icon: "🛍", name: "Big Spender", description: "Life is for living and you spend to enjoy", effect: "+happiness, higher lifestyle costs" },
  { id: "strategic-thinker", icon: "📊", name: "Strategic Thinker", description: "You analyse every decision carefully", effect: "Better decision options, lower stress" },
];

export default function TraitSelector({ onComplete }: Props) {
  const [selected, setSelected] = useState<PersonalityTrait[]>([]);

  const toggle = (trait: PersonalityTrait) => {
    setSelected((previous) => {
      if (previous.includes(trait)) return previous.filter((item) => item !== trait);
      if (previous.length >= 2) return previous;
      return [...previous, trait];
    });
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <h2 className="mb-2 font-display text-2xl font-bold text-white md:text-3xl">Choose Your Traits</h2>
        <p className="text-sm text-[#94a8a0]">
          Select <span className="font-semibold text-emerald-300">2 personality traits</span> that define your financial personality
        </p>
      </motion.div>

      <div className="mb-8 space-y-3">
        {TRAITS.map((trait, index) => {
          const isSelected = selected.includes(trait.id);
          const isDisabled = selected.length >= 2 && !isSelected;

          return (
            <motion.button
              key={trait.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => toggle(trait.id)}
              disabled={isDisabled}
              className={`flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border border-emerald-300/40 bg-[rgba(27,31,39,0.98)] shadow-[0_0_20px_rgba(16,185,129,0.18)]"
                  : isDisabled
                    ? "cursor-not-allowed border border-white/5 bg-[#1B1F27] opacity-40"
                    : "border border-white/10 bg-[rgba(27,31,39,0.94)] hover:border-emerald-400"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg text-2xl ${
                  isSelected ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-[#03110b]" : "bg-[#1B1F27]"
                }`}
              >
                {trait.icon}
              </div>
              <div className="flex-1">
                <div className="font-display font-semibold text-white">{trait.name}</div>
                <div className="text-sm text-[#94a8a0]">{trait.description}</div>
                <div className="mt-1 text-xs text-emerald-300">{trait.effect}</div>
              </div>
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected ? "border-emerald-300 bg-emerald-300 text-[#03110b]" : "border-[#65796f]"
                }`}
              >
                {isSelected ? <span className="text-xs">✓</span> : null}
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <motion.button
          whileHover={{ scale: selected.length === 2 ? 1.05 : 1 }}
          whileTap={{ scale: selected.length === 2 ? 0.95 : 1 }}
          onClick={() => (selected.length === 2 ? onComplete(selected) : null)}
          disabled={selected.length !== 2}
          className={`rounded-xl px-8 py-3 font-display text-lg font-bold transition-all ${
            selected.length === 2
              ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-[#03110b] shadow-[0_0_26px_rgba(16,185,129,0.28)]"
              : "bg-[#1B1F27] text-[#7f9189]"
          }`}
        >
          {selected.length === 2 ? "Continue" : `Select ${2 - selected.length} more`}
        </motion.button>
      </motion.div>
    </div>
  );
}
