"use client";

import { motion } from "framer-motion";
import { AvatarConfig } from "@/components/build-your-life/types";

interface Props {
  config: AvatarConfig;
  size?: number;
}

const SKIN_TONES = ["#FFDBB4", "#EDB98A", "#D08B5B", "#AE5D29", "#694D3D", "#3B2219"];
const HAIR_COLORS = ["#2C1B18", "#4A2912", "#8B4513", "#D4A76A", "#E8C07A", "#C41E3A", "#1B1464", "#36D1DC"];
const EYE_COLORS = ["#4A3728", "#2E5090", "#4F7942", "#8B7355", "#6B4C9A", "#1B7A6E"];
const OUTFIT_COLORS = ["#5B8C5A", "#2C3E50", "#E74C3C", "#1A1A2E"];

export default function AvatarPreview({ config, size = 120 }: Props) {
  const skin = SKIN_TONES[config.skinTone] || SKIN_TONES[0];
  const hair = HAIR_COLORS[config.hairColor] || HAIR_COLORS[0];
  const eyes = EYE_COLORS[config.eyeColor] || EYE_COLORS[0];
  const outfit = OUTFIT_COLORS[config.outfit] || OUTFIT_COLORS[0];

  const faceWidths = [48, 44, 46, 42];
  const faceHeights = [52, 56, 50, 54];
  const faceW = faceWidths[config.faceShape] || 48;
  const faceH = faceHeights[config.faceShape] || 52;

  const hairPaths = [
    `M${50 - faceW / 2 - 2},42 Q50,${42 - faceH / 2 - 8} ${50 + faceW / 2 + 2},42 Q${50 + faceW / 2 + 4},30 50,${42 - faceH / 2 - 12} Q${50 - faceW / 2 - 4},30 ${50 - faceW / 2 - 2},42Z`,
    `M${50 - faceW / 2 - 6},46 Q${50 - faceW / 2 - 8},20 50,${42 - faceH / 2 - 14} Q${50 + faceW / 2 + 8},20 ${50 + faceW / 2 + 6},46 Q${50 + faceW / 2 + 4},28 50,${42 - faceH / 2 - 10} Q${50 - faceW / 2 - 4},28 ${50 - faceW / 2 - 6},46Z`,
    `M${50 - faceW / 2 - 2},42 Q50,${42 - faceH / 2 - 10} ${50 + faceW / 2 + 2},42 L${50 + faceW / 2 + 4},70 Q50,68 ${50 - faceW / 2 - 4},70Z`,
    `M${50 - faceW / 2},${42 - faceH / 2 + 4} Q50,${42 - faceH / 2 - 4} ${50 + faceW / 2},${42 - faceH / 2 + 4} L${50 + faceW / 2},42 Q50,${42 - faceH / 2} ${50 - faceW / 2},42Z`,
    `M46,${42 - faceH / 2 - 16} Q50,${42 - faceH / 2 - 20} 54,${42 - faceH / 2 - 16} L54,${42 - faceH / 2 + 2} Q50,${42 - faceH / 2 - 2} 46,${42 - faceH / 2 + 2}Z`,
    `M${50 - faceW / 2 - 10},50 Q${50 - faceW / 2 - 14},20 50,${42 - faceH / 2 - 18} Q${50 + faceW / 2 + 14},20 ${50 + faceW / 2 + 10},50 Q${50 + faceW / 2 + 8},25 50,${42 - faceH / 2 - 14} Q${50 - faceW / 2 - 8},25 ${50 - faceW / 2 - 10},50Z`,
  ];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      animate={{ y: [0, -1, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      <ellipse cx="50" cy="92" rx="28" ry="14" fill={outfit} />
      <rect x="44" y={42 + faceH / 2 - 2} width="12" height="10" rx="4" fill={skin} />
      <ellipse cx="50" cy="42" rx={faceW / 2} ry={faceH / 2} fill={skin} />
      <path d={hairPaths[config.hairStyle] || hairPaths[0]} fill={hair} />

      <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}>
        <ellipse cx="41" cy="42" rx="4" ry="4.5" fill="white" />
        <ellipse cx="59" cy="42" rx="4" ry="4.5" fill="white" />
        <circle cx="41" cy="42" r="2.5" fill={eyes} />
        <circle cx="59" cy="42" r="2.5" fill={eyes} />
        <circle cx="42" cy="41" r="1" fill="white" />
        <circle cx="60" cy="41" r="1" fill="white" />
      </motion.g>

      <path
        d="M45,52 Q50,56 55,52"
        stroke={skin === "#3B2219" || skin === "#694D3D" ? "#FF9999" : "#D4756B"}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M49,46 Q50,49 51,46" stroke={`${skin}CC`} strokeWidth="1" fill="none" />

      {config.glasses ? (
        <g stroke="hsl(220, 15%, 40%)" strokeWidth="1.5" fill="none">
          <circle cx="41" cy="42" r="7" />
          <circle cx="59" cy="42" r="7" />
          <line x1="48" y1="42" x2="52" y2="42" />
          <line x1="34" y1="42" x2="30" y2="40" />
          <line x1="66" y1="42" x2="70" y2="40" />
        </g>
      ) : null}

      <line x1="37" y1="35" x2="45" y2="36" stroke={hair} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="55" y1="36" x2="63" y2="35" stroke={hair} strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  );
}
