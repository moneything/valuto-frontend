"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CareerPath, LivingSituation, StartingFinances } from "@/components/build-your-life/types";
import { CAREER_OPTIONS } from "@/components/build-your-life/data";

interface Props {
  onComplete: (career: CareerPath, living: LivingSituation, finances: StartingFinances) => void;
}

const LIVING_OPTIONS: { id: LivingSituation; icon: string; title: string; desc: string; effect: string }[] = [
  { id: "parents", icon: "🏡", title: "Living with Parents", desc: "Save money while you find your feet", effect: "Low expenses, slower independence" },
  { id: "renting-friends", icon: "👥", title: "Renting with Friends", desc: "Split costs and enjoy social life", effect: "Moderate expenses, high happiness" },
  { id: "independent", icon: "🏢", title: "Living Independently", desc: "Full freedom at full price", effect: "High expenses, maximum independence" },
];

const FINANCE_OPTIONS: { id: StartingFinances; icon: string; title: string; desc: string; amount: string }[] = [
  { id: "modest", icon: "🌱", title: "Modest Start", desc: "GBP500 in savings from part-time work", amount: "GBP500" },
  { id: "comfortable", icon: "💎", title: "Comfortable Start", desc: "GBP2,000 saved from gifts and earnings", amount: "GBP2,000" },
  { id: "debt-risk", icon: "⚡", title: "Debt Risk Start", desc: "GBP1,000 saved but with existing commitments", amount: "GBP1,000 + debt risk" },
];

type Step = "career" | "living" | "finances";

export default function BackgroundSelector({ onComplete }: Props) {
  const [step, setStep] = useState<Step>("career");
  const [career, setCareer] = useState<CareerPath | null>(null);
  const [living, setLiving] = useState<LivingSituation | null>(null);

  const handleCareer = (nextCareer: CareerPath) => {
    setCareer(nextCareer);
    setStep("living");
  };

  const handleLiving = (nextLiving: LivingSituation) => {
    setLiving(nextLiving);
    setStep("finances");
  };

  const handleFinances = (finances: StartingFinances) => {
    if (career && living) onComplete(career, living, finances);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8 flex justify-center gap-2">
        {(["career", "living", "finances"] as Step[]).map((item, index) => (
          <div key={item} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-bold ${
                step === item
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-300 text-[#04120c]"
                  : ["career", "living", "finances"].indexOf(step) > index
                    ? "bg-emerald-300 text-[#04120c]"
                    : "bg-white/[0.08] text-[#8ea097]"
              }`}
            >
              {index + 1}
            </div>
            {index < 2 ? (
              <div
                className={`h-0.5 w-8 ${
                  ["career", "living", "finances"].indexOf(step) > index ? "bg-emerald-300" : "bg-white/10"
                }`}
              />
            ) : null}
          </div>
        ))}
      </div>

      {step === "career" ? (
        <motion.div key="career" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6 text-center">
            <h2 className="mb-2 font-display text-2xl font-bold text-white md:text-3xl">Choose Your Path</h2>
            <p className="text-sm text-[#8ea097]">Your education and career choice shapes everything</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CAREER_OPTIONS.map((option, index) => (
              <motion.button
                key={option.path}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCareer(option.path)}
                className="group rounded-xl border border-white/10 bg-[rgba(10,16,14,0.82)] p-5 text-left transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(52,211,153,0.18)]"
              >
                <div className="mb-2 text-3xl">{option.icon}</div>
                <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-emerald-300">
                  {option.title}
                </h3>
                <p className="mb-3 mt-1 text-sm text-[#8ea097]">{option.description}</p>
                <div className="flex gap-4 text-xs">
                  <span className="font-medium text-emerald-300">GBP{option.salary.toLocaleString()}/yr</span>
                  <span className={option.debt > 0 ? "text-rose-300" : "text-emerald-300"}>
                    {option.debt > 0 ? `GBP${option.debt.toLocaleString()} debt` : "No debt"}
                  </span>
                  <span className="text-[#8ea097]">{option.growth}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : null}

      {step === "living" ? (
        <motion.div key="living" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6 text-center">
            <h2 className="mb-2 font-display text-2xl font-bold text-white md:text-3xl">Where Will You Live?</h2>
            <p className="text-sm text-[#8ea097]">Your living situation affects your costs and happiness</p>
          </div>
          <div className="space-y-3">
            {LIVING_OPTIONS.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLiving(option.id)}
                className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-[rgba(10,16,14,0.82)] p-5 text-left transition-all hover:shadow-[0_0_28px_rgba(52,211,153,0.18)]"
              >
                <div className="text-3xl">{option.icon}</div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-white">{option.title}</h3>
                  <p className="text-sm text-[#8ea097]">{option.desc}</p>
                  <p className="mt-1 text-xs text-emerald-300">{option.effect}</p>
                </div>
                <div className="text-[#8ea097]">→</div>
              </motion.button>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button onClick={() => setStep("career")} className="font-display text-sm text-[#8ea097] hover:text-white">
              ← Back
            </button>
          </div>
        </motion.div>
      ) : null}

      {step === "finances" ? (
        <motion.div key="finances" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6 text-center">
            <h2 className="mb-2 font-display text-2xl font-bold text-white md:text-3xl">Starting Money</h2>
            <p className="text-sm text-[#8ea097]">How much have you saved so far?</p>
          </div>
          <div className="space-y-3">
            {FINANCE_OPTIONS.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFinances(option.id)}
                className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-[rgba(10,16,14,0.82)] p-5 text-left transition-all hover:shadow-[0_0_28px_rgba(52,211,153,0.18)]"
              >
                <div className="text-3xl">{option.icon}</div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-white">{option.title}</h3>
                  <p className="text-sm text-[#8ea097]">{option.desc}</p>
                </div>
                <div className="font-display font-bold text-emerald-300">{option.amount}</div>
              </motion.button>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button onClick={() => setStep("living")} className="font-display text-sm text-[#8ea097] hover:text-white">
              ← Back
            </button>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
