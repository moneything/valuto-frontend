"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";

interface MilestonePopupProps {
  totalValue: number;
}

const MILESTONES = [
  { value: 10000, label: "£10,000", emoji: "🎯" },
  { value: 50000, label: "£50,000", emoji: "🚀" },
  { value: 100000, label: "£100,000", emoji: "💎" },
  { value: 1000000, label: "£1,000,000", emoji: "🏆" },
];

export default function MilestonePopup({ totalValue }: MilestonePopupProps) {
  const [activeMilestone, setActiveMilestone] = useState<string | null>(null);
  const [shownMilestones, setShownMilestones] = useState<Set<number>>(new Set());

  useEffect(() => {
    for (const milestone of MILESTONES) {
      if (totalValue >= milestone.value && !shownMilestones.has(milestone.value)) {
        setActiveMilestone(`${milestone.emoji} Milestone: ${milestone.label}`);
        setShownMilestones((previous) => new Set(previous).add(milestone.value));

        const timeout = setTimeout(() => setActiveMilestone(null), 3000);
        return () => clearTimeout(timeout);
      }
    }
    return undefined;
  }, [shownMilestones, totalValue]);

  useEffect(() => {
    setShownMilestones((previous) => {
      const next = new Set<number>();
      previous.forEach((value) => {
        if (totalValue >= value) next.add(value);
      });
      return next;
    });
  }, [totalValue]);

  return (
    <AnimatePresence>
      {activeMilestone ? (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-amber-400/30 bg-[#201b11]/90 px-6 py-4 backdrop-blur-xl shadow-[0_0_60px_rgba(240,179,66,0.15)]">
            <Trophy className="h-6 w-6 text-[#f0b342]" />
            <span className="text-lg font-bold text-[#f0b342]">{activeMilestone}</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
