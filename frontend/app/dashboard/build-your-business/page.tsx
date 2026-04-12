"use client";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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

function GameContent() {
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
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/favicon.svg" alt="Valuto" width={28} height={28} />
            <span className="font-display text-sm font-semibold text-white">Build Your Business</span>
          </Link>
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
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
