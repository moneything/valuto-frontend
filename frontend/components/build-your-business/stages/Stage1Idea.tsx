"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { BUSINESS_IDEAS } from "@/components/build-your-business/data";
import { BusinessIdea } from "@/components/build-your-business/types";
import { Card, GameButton } from "@/components/build-your-business/ui";

export default function Stage1Idea() {
  const { selectIdea, setBusinessName, setStage, state } = useGame();
  const [selected, setSelected] = useState<BusinessIdea | null>(state.selectedIdea);
  const [name, setName] = useState(state.businessName);
  const [step, setStep] = useState<"learn" | "choose" | "name">(state.selectedIdea ? "name" : "learn");

  const handleContinue = () => {
    if (step === "learn") {
      setStep("choose");
    } else if (step === "choose" && selected) {
      selectIdea(selected);
      setStep("name");
    } else if (step === "name" && name.trim()) {
      setBusinessName(name.trim());
      setStage(2);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl space-y-6">
      {step === "learn" ? (
        <div className="space-y-6">
          <div className="space-y-3 text-center">
            <span className="text-4xl">💡</span>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Finding Your Business Idea</h2>
            <p className="mx-auto max-w-lg text-[#94a8a0]">
              Every great business starts with a problem worth solving. The best ideas come from spotting what people need and building something they will pay for.
            </p>
          </div>

          <Card className="space-y-4">
            <h3 className="font-display text-sm font-semibold text-white">Key Concepts</h3>
            <div className="grid gap-3">
              {[
                { title: "Problem Solving", desc: "The best businesses solve real problems. What frustrates people? What could be better?" },
                { title: "Demand", desc: "Are people willing to pay for this solution? Is there a big enough market?" },
                { title: "Niche Markets", desc: "Sometimes the best opportunity is a small, underserved market where you can dominate." },
              ].map((concept) => (
                <div key={concept.title} className="rounded-lg bg-white/[0.04] p-4">
                  <h4 className="font-display text-sm font-semibold text-emerald-300">{concept.title}</h4>
                  <p className="mt-1 text-xs text-[#94a8a0]">{concept.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          <GameButton onClick={handleContinue}>Choose Your Business Idea</GameButton>
        </div>
      ) : null}

      {step === "choose" ? (
        <div className="space-y-5">
          <div className="space-y-2 text-center">
            <h2 className="font-display text-2xl font-bold text-white">Choose Your Business</h2>
            <p className="text-sm text-[#94a8a0]">Each idea has different levels of demand, competition, and startup cost.</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {BUSINESS_IDEAS.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelected(idea)}
                className={`cursor-pointer rounded-2xl border p-4 transition ${
                  selected?.id === idea.id
                    ? "border-emerald-300/40 bg-emerald-300/10 shadow-[0_0_18px_rgba(16,185,129,0.16)]"
                    : "border-white/10 bg-[rgba(27,31,39,0.96)] hover:border-emerald-300/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{idea.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-semibold text-white">{idea.name}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          idea.difficulty === "easy"
                            ? "bg-emerald-300/15 text-emerald-300"
                            : idea.difficulty === "medium"
                              ? "bg-amber-300/15 text-amber-300"
                              : "bg-rose-300/15 text-rose-300"
                        }`}
                      >
                        {idea.difficulty}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#94a8a0]">{idea.description}</p>
                    <div className="mt-3 flex items-center gap-3 text-[10px] text-[#94a8a0]">
                      <span>💷 £{idea.startingCost}</span>
                      <span>📊 Demand: {idea.marketDemand}%</span>
                      <span>⚔️ Competition: {idea.competition}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <GameButton onClick={handleContinue} disabled={!selected}>
            Select This Idea
          </GameButton>
        </div>
      ) : null}

      {step === "name" ? (
        <div className="space-y-6">
          <div className="space-y-3 text-center">
            <span className="text-4xl">{selected?.icon || "🚀"}</span>
            <h2 className="font-display text-2xl font-bold text-white">Name Your Business</h2>
            <p className="text-sm text-[#94a8a0]">Your {selected?.name} needs a great name. Make it memorable.</p>
          </div>

          <Card className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your business name..."
              maxLength={30}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 font-display text-lg font-semibold text-white placeholder:text-[#7f9189] outline-none focus:border-emerald-300/30"
            />
            {name ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-center"
              >
                <span className="text-xs text-[#94a8a0]">Preview</span>
                <p className="mt-1 font-display text-xl font-bold text-emerald-300">{name}</p>
                <p className="mt-1 text-xs text-[#94a8a0]">{selected?.category}</p>
              </motion.div>
            ) : null}
          </Card>

          <GameButton onClick={handleContinue} disabled={!name.trim()}>
            Start Market Research
          </GameButton>
        </div>
      ) : null}
    </motion.div>
  );
}
