"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AvatarPreview from "@/components/build-your-life/AvatarPreview";
import { AvatarConfig } from "@/components/build-your-life/types";

interface Props {
  onComplete: (avatar: AvatarConfig) => void;
}

const SKIN_TONES = ["#FFDBB4", "#EDB98A", "#D08B5B", "#AE5D29", "#694D3D", "#3B2219"];
const HAIR_COLORS = ["#2C1B18", "#4A2912", "#8B4513", "#D4A76A", "#E8C07A", "#C41E3A", "#1B1464", "#36D1DC"];
const EYE_COLORS = ["#4A3728", "#2E5090", "#4F7942", "#8B7355", "#6B4C9A", "#1B7A6E"];
const HAIR_STYLES = ["Classic", "Curly", "Long", "Buzz", "Mohawk", "Afro"];
const FACE_SHAPES = ["Round", "Oval", "Square", "Heart"];
const OUTFITS = ["Casual", "Smart", "Streetwear", "Business"];

type Tab = "face" | "hair" | "eyes" | "outfit";

export default function AvatarCreator({ onComplete }: Props) {
  const [avatar, setAvatar] = useState<AvatarConfig>({
    skinTone: 0,
    hairStyle: 0,
    hairColor: 0,
    faceShape: 0,
    eyeColor: 0,
    glasses: false,
    outfit: 0,
  });
  const [tab, setTab] = useState<Tab>("face");

  const update = (key: keyof AvatarConfig, value: number | boolean) => {
    setAvatar((previous) => ({ ...previous, [key]: value }));
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "face", label: "Face", icon: "😊" },
    { id: "hair", label: "Hair", icon: "💇" },
    { id: "eyes", label: "Eyes", icon: "👁" },
    { id: "outfit", label: "Outfit", icon: "👕" },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <h2 className="mb-2 font-display text-2xl font-bold text-white md:text-3xl">Design Your Avatar</h2>
        <p className="text-sm text-[#94a8a0]">Create the character who will live your financial life</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 flex justify-center"
      >
        <div className="relative">
          <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border border-white/8 bg-[rgba(27,31,39,0.92)] shadow-[0_0_28px_rgba(16,185,129,0.16)] backdrop-blur-xl">
            <AvatarPreview config={avatar} size={140} />
          </div>
          <motion.div
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-sm text-[#03110b]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ✨
          </motion.div>
        </div>
      </motion.div>

      <div className="mb-6 flex justify-center gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`rounded-lg px-4 py-2 font-display text-sm font-medium transition-all ${
              tab === item.id
                ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-[#03110b] shadow-[0_0_18px_rgba(16,185,129,0.2)]"
                : "border border-white/8 bg-[#1B1F27] text-[#a6b7b0] hover:text-white"
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 rounded-xl border border-white/8 bg-[rgba(27,31,39,0.94)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl"
      >
        {tab === "face" ? (
          <div className="space-y-5">
            <div>
              <label className="mb-3 block text-xs font-display uppercase tracking-widest text-[#94a8a0]">
                Skin Tone
              </label>
              <div className="flex justify-center gap-3">
                {SKIN_TONES.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => update("skinTone", index)}
                    className={`h-10 w-10 rounded-full transition-all ${
                      avatar.skinTone === index
                        ? "scale-110 ring-2 ring-emerald-300 ring-offset-2 ring-offset-[#1B1F27]"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="mb-3 block text-xs font-display uppercase tracking-widest text-[#94a8a0]">
                Face Shape
              </label>
              <div className="flex justify-center gap-3">
                {FACE_SHAPES.map((shape, index) => (
                  <button
                    key={shape}
                    onClick={() => update("faceShape", index)}
                    className={`rounded-lg px-4 py-2 text-sm font-display transition-all ${
                      avatar.faceShape === index
                        ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-[#03110b]"
                        : "border border-white/8 bg-[#1B1F27] text-[#a6b7b0] hover:text-white"
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {tab === "hair" ? (
          <div className="space-y-5">
            <div>
              <label className="mb-3 block text-xs font-display uppercase tracking-widest text-[#94a8a0]">
                Hair Style
              </label>
              <div className="flex flex-wrap justify-center gap-2">
                {HAIR_STYLES.map((style, index) => (
                  <button
                    key={style}
                    onClick={() => update("hairStyle", index)}
                    className={`rounded-lg px-4 py-2 text-sm font-display transition-all ${
                      avatar.hairStyle === index
                        ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-[#03110b]"
                        : "border border-white/8 bg-[#1B1F27] text-[#a6b7b0] hover:text-white"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-3 block text-xs font-display uppercase tracking-widest text-[#94a8a0]">
                Hair Colour
              </label>
              <div className="flex justify-center gap-3">
                {HAIR_COLORS.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => update("hairColor", index)}
                    className={`h-10 w-10 rounded-full transition-all ${
                      avatar.hairColor === index
                        ? "scale-110 ring-2 ring-emerald-300 ring-offset-2 ring-offset-[#1B1F27]"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {tab === "eyes" ? (
          <div className="space-y-5">
            <div>
              <label className="mb-3 block text-xs font-display uppercase tracking-widest text-[#94a8a0]">
                Eye Colour
              </label>
              <div className="flex justify-center gap-3">
                {EYE_COLORS.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => update("eyeColor", index)}
                    className={`h-10 w-10 rounded-full transition-all ${
                      avatar.eyeColor === index
                        ? "scale-110 ring-2 ring-emerald-300 ring-offset-2 ring-offset-[#1B1F27]"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="mb-3 block text-xs font-display uppercase tracking-widest text-[#8ea097]">
                Glasses
              </label>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => update("glasses", false)}
                  className={`rounded-lg px-6 py-2 text-sm font-display transition-all ${
                    !avatar.glasses
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-[#03110b]"
                      : "border border-white/8 bg-[#1B1F27] text-[#a6b7b0]"
                  }`}
                >
                  No Glasses
                </button>
                <button
                  onClick={() => update("glasses", true)}
                  className={`rounded-lg px-6 py-2 text-sm font-display transition-all ${
                    avatar.glasses
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-[#03110b]"
                      : "border border-white/8 bg-[#1B1F27] text-[#a6b7b0]"
                  }`}
                >
                  Glasses
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {tab === "outfit" ? (
          <div>
            <label className="mb-3 block text-xs font-display uppercase tracking-widest text-[#94a8a0]">Style</label>
            <div className="grid grid-cols-2 gap-3">
              {OUTFITS.map((outfit, index) => {
                const outfitIcons = ["👕", "👔", "🧥", "🤵"];
                return (
                  <button
                    key={outfit}
                    onClick={() => update("outfit", index)}
                    className={`rounded-lg p-4 text-center font-display transition-all ${
                      avatar.outfit === index
                        ? "border border-emerald-300/50 bg-[rgba(27,31,39,0.98)] text-white shadow-[0_0_24px_rgba(52,211,153,0.2)]"
                        : "border border-white/8 bg-[#1B1F27] text-[#a6b7b0] hover:text-white"
                    }`}
                  >
                    <div className="mb-1 text-2xl">{outfitIcons[index]}</div>
                    <div className="text-sm font-medium">{outfit}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </motion.div>

      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete(avatar)}
          className="rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-8 py-3 font-display text-lg font-bold text-[#03110b] shadow-[0_0_26px_rgba(16,185,129,0.28)]"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
