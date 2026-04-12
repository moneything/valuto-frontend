"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/components/build-your-business/GameContext";
import { BrandStyle, LaunchChannel } from "@/components/build-your-business/types";
import { Card, GameButton } from "@/components/build-your-business/ui";

const channels: { id: LaunchChannel; icon: string; name: string; desc: string }[] = [
  { id: "online-store", icon: "🛒", name: "Online Store", desc: "Sell directly through your own website. Low overhead, global reach." },
  { id: "social-media", icon: "📱", name: "Social Media Brand", desc: "Build your brand on TikTok and Instagram. Audience-first approach." },
  { id: "physical", icon: "🏪", name: "Physical Location", desc: "Pop-up shops, markets or a small space. Higher cost, local impact." },
  { id: "service", icon: "🤝", name: "Service-Based", desc: "Deliver your product as a service. Personal touch, high margins." },
];

const brandStyles: { id: BrandStyle; icon: string; name: string; colors: string }[] = [
  { id: "minimal", icon: "⬜", name: "Clean & Minimal", colors: "bg-white/10" },
  { id: "bold", icon: "🟥", name: "Bold & Vibrant", colors: "bg-rose-300/20" },
  { id: "luxury", icon: "🟡", name: "Luxury & Premium", colors: "bg-amber-300/20" },
  { id: "playful", icon: "🟣", name: "Playful & Fun", colors: "bg-sky-300/20" },
];

export default function Stage4Build() {
  const { state, setLaunchChannel, setBrandStyle, setStage } = useGame();
  const [channel, setChannel] = useState<LaunchChannel | null>(state.launchChannel);
  const [style, setStyle] = useState<BrandStyle | null>(state.brandStyle);
  const [step, setStep] = useState<"channel" | "brand">("channel");

  const handleContinue = () => {
    if (step === "channel" && channel) {
      setLaunchChannel(channel);
      setStep("brand");
    } else if (step === "brand" && style) {
      setBrandStyle(style);
      setStage(5);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2 text-center">
        <span className="text-3xl">🏗</span>
        <h2 className="font-display text-2xl font-bold text-white">Building Your Business</h2>
        <p className="text-sm text-[#94a8a0]">How will you launch and what will your brand look like?</p>
      </div>

      {step === "channel" ? (
        <div className="space-y-4">
          <h3 className="text-center font-display text-sm font-semibold text-white">Choose Your Launch Channel</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {channels.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setChannel(item.id)}
                className={`cursor-pointer rounded-2xl border p-4 transition ${
                  channel === item.id
                    ? "border-emerald-300/40 bg-emerald-300/10"
                    : "border-white/10 bg-[rgba(27,31,39,0.96)]"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <h4 className="mt-2 font-display text-sm font-semibold text-white">{item.name}</h4>
                <p className="mt-1 text-xs text-[#94a8a0]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ) : null}

      {step === "brand" ? (
        <div className="space-y-4">
          <h3 className="text-center font-display text-sm font-semibold text-white">Choose Your Brand Style</h3>
          <div className="grid grid-cols-2 gap-3">
            {brandStyles.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setStyle(item.id)}
                className={`cursor-pointer rounded-2xl border p-4 text-center transition ${
                  style === item.id ? "border-emerald-300/40 bg-emerald-300/10" : "border-white/10 bg-[rgba(27,31,39,0.96)]"
                }`}
              >
                <div className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl text-xl ${item.colors}`}>{item.icon}</div>
                <h4 className="font-display text-sm font-semibold text-white">{item.name}</h4>
              </motion.div>
            ))}
          </div>

          {style ? (
            <Card className="text-center">
              <p className="mb-2 text-xs text-[#94a8a0]">Brand Preview</p>
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/[0.04] px-4 py-2">
                <span className="text-lg">{state.selectedIdea?.icon}</span>
                <span className="font-display font-bold text-white">{state.businessName}</span>
              </div>
              <p className="mt-2 text-[10px] text-[#94a8a0]">
                {style === "minimal"
                  ? "Clean lines, whitespace, sophisticated"
                  : style === "bold"
                    ? "Eye-catching, energetic, unforgettable"
                    : style === "luxury"
                      ? "Premium feel, exclusive, aspirational"
                      : "Approachable, colourful, engaging"}
              </p>
            </Card>
          ) : null}
        </div>
      ) : null}

      <GameButton onClick={handleContinue} disabled={step === "channel" ? !channel : !style}>
        {step === "channel" ? "Choose Brand Style" : "Start Marketing"}
      </GameButton>
    </motion.div>
  );
}
