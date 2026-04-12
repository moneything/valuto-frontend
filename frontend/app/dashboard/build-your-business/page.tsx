"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { GameProvider, useGame } from "@/components/build-your-business/GameContext";
import StageProgress from "@/components/build-your-business/StageProgress";
import MetricsBar from "@/components/build-your-business/MetricsBar";
import EventModal from "@/components/build-your-business/EventModal";
import AchievementToast from "@/components/build-your-business/AchievementToast";
import GameOverScreen from "@/components/build-your-business/GameOverScreen";
import Stage1Idea from "@/components/build-your-business/stages/Stage1Idea";
import Stage2Research from "@/components/build-your-business/stages/Stage2Research";
import Stage3Pricing from "@/components/build-your-business/stages/Stage3Pricing";
import Stage4Build from "@/components/build-your-business/stages/Stage4Build";
import Stage5Marketing from "@/components/build-your-business/stages/Stage5Marketing";
import Stage6Growth from "@/components/build-your-business/stages/Stage6Growth";

function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#1B1F27] px-6 py-12 text-white">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 25% 20%, rgba(16,185,129,0.12), transparent 45%)",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 78%, rgba(245,158,11,0.08), transparent 40%)",
        }}
      />

      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg space-y-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <Image src="/favicon.svg" alt="Valuto" width={48} height={48} className="h-12 w-12" />
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl"
            >
              🚀 Build Your <span className="text-emerald-300">Business</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mx-auto max-w-sm text-sm text-[#94a8a0] sm:text-base"
            >
              Create, launch and grow your own startup. Make real business decisions and learn how entrepreneurs think.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <button
              onClick={onStart}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 py-4 text-base font-display font-bold text-[#08110d] shadow-[0_0_24px_rgba(16,185,129,0.26)]"
            >
              🚀 Start Your Journey
            </button>
            <p className="text-[10px] text-[#94a8a0]">Free • No account needed • Learn by doing</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-3 pt-4"
          >
            {[
              { icon: "💡", label: "Find Ideas" },
              { icon: "📊", label: "Real Strategy" },
              { icon: "🏆", label: "Earn Awards" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[rgba(27,31,39,0.96)] py-4 text-center shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="mt-2 text-[10px] font-medium text-[#94a8a0]">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function GameContent({ onExit }: { onExit: () => void }) {
  const { state, resetGame } = useGame();

  if (state.gameOver) {
    return <GameOverScreen />;
  }

  const renderStage = () => {
    switch (state.stage) {
      case 1:
        return <Stage1Idea />;
      case 2:
        return <Stage2Research />;
      case 3:
        return <Stage3Pricing />;
      case 4:
        return <Stage4Build />;
      case 5:
        return <Stage5Marketing />;
      case 6:
        return <Stage6Growth />;
      default:
        return <Stage1Idea />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1B1F27] text-white">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 25% 20%, rgba(16,185,129,0.12), transparent 45%)",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 78%, rgba(245,158,11,0.08), transparent 40%)",
        }}
      />

      <header className="sticky top-16 z-40 border-b border-white/10 bg-[rgba(27,31,39,0.92)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <button
            onClick={() => {
              resetGame();
              onExit();
            }}
            className="flex items-center gap-2"
          >
            <Image src="/favicon.svg" alt="Valuto" width={28} height={28} />
            <span className="font-display text-sm font-semibold text-white">Build Your Business</span>
          </button>
          <MetricsBar />
          <button
            onClick={resetGame}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-display text-xs text-[#a9bab3] transition-colors hover:text-white"
          >
            Reset
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4">
        <StageProgress />
      </div>

      <main className="mx-auto max-w-5xl px-4 py-6 pb-20">
        <AnimatePresence mode="wait">{renderStage()}</AnimatePresence>
      </main>

      <EventModal />
      <AchievementToast />
    </div>
  );
}

export default function BuildYourBusinessPage() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <LandingScreen onStart={() => setStarted(true)} />;
  }

  return (
    <GameProvider>
      <GameContent onExit={() => setStarted(false)} />
    </GameProvider>
  );
}
