"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ParticleBackground from "@/components/build-your-life/ParticleBackground";
import StartScreen from "@/components/build-your-life/StartScreen";
import AvatarCreator from "@/components/build-your-life/AvatarCreator";
import TraitSelector from "@/components/build-your-life/TraitSelector";
import BackgroundSelector from "@/components/build-your-life/BackgroundSelector";
import LifeDashboard from "@/components/build-your-life/LifeDashboard";
import DecisionPanel from "@/components/build-your-life/DecisionPanel";
import EventModal from "@/components/build-your-life/EventModal";
import LessonToast from "@/components/build-your-life/LessonToast";
import AchievementPopup from "@/components/build-your-life/AchievementPopup";
import Timeline from "@/components/build-your-life/Timeline";
import SummaryScreen from "@/components/build-your-life/SummaryScreen";
import AIAdvisor from "@/components/build-your-life/AIAdvisor";
import { useGameEngine } from "@/components/build-your-life/useGameEngine";
import {
  AvatarConfig,
  CareerPath,
  LivingSituation,
  PersonalityTrait,
  PlayerSetup,
  StartingFinances,
} from "@/components/build-your-life/types";

type SetupStep = "welcome" | "avatar" | "traits" | "background";

export default function BuildYourLifePage() {
  const { state, startGame, makeDecision, resolveEvent, dismissLesson, restart, skipYear } =
    useGameEngine();
  const [setupStep, setSetupStep] = useState<SetupStep>("welcome");
  const [avatar, setAvatar] = useState<AvatarConfig | null>(null);
  const [traits, setTraits] = useState<PersonalityTrait[]>([]);

  const handleWelcome = () => setSetupStep("avatar");

  const handleAvatar = (nextAvatar: AvatarConfig) => {
    setAvatar(nextAvatar);
    setSetupStep("traits");
  };

  const handleTraits = (nextTraits: PersonalityTrait[]) => {
    setTraits(nextTraits);
    setSetupStep("background");
  };

  const handleBackground = (
    career: CareerPath,
    livingSituation: LivingSituation,
    startingFinances: StartingFinances
  ) => {
    if (!avatar) return;

    const setup: PlayerSetup = {
      avatar,
      traits,
      career,
      livingSituation,
      startingFinances,
    };

    startGame(setup);
  };

  const handleRestart = () => {
    restart();
    setSetupStep("welcome");
    setAvatar(null);
    setTraits([]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07110d] text-white">
      <ParticleBackground />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 24%, rgba(34,211,153,0.09), transparent 58%)",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 82%, rgba(245,158,11,0.06), transparent 48%)",
        }}
      />

      {state.phase === "start" ? (
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
          {setupStep === "welcome" ? <StartScreen onStart={handleWelcome} /> : null}
          {setupStep === "avatar" ? <AvatarCreator onComplete={handleAvatar} /> : null}
          {setupStep === "traits" ? <TraitSelector onComplete={handleTraits} /> : null}
          {setupStep === "background" ? <BackgroundSelector onComplete={handleBackground} /> : null}
        </div>
      ) : null}

      {state.phase === "playing" || state.phase === "event" ? (
        <div className="relative z-10 flex min-h-screen flex-col items-center gap-5 px-4 py-6">
          <LifeDashboard state={state} />
          <Timeline history={state.history} currentAge={state.age} />

          {state.currentDecision ? (
            <DecisionPanel decision={state.currentDecision} onChoose={makeDecision} />
          ) : null}

          {!state.currentDecision && state.phase === "playing" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={skipYear}
                className="rounded-xl border border-emerald-400/30 bg-gradient-to-r from-emerald-400 to-emerald-300 px-6 py-3 font-display font-semibold text-[#04120c] shadow-[0_0_28px_rgba(52,211,153,0.35)]"
              >
                Next Year
              </motion.button>
            </motion.div>
          ) : null}

          <AIAdvisor state={state} />
        </div>
      ) : null}

      {state.phase === "event" && state.currentEvent ? (
        <EventModal event={state.currentEvent} onResolve={resolveEvent} />
      ) : null}

      {state.phase === "summary" ? (
        <SummaryScreen state={state} onRestart={handleRestart} />
      ) : null}

      <LessonToast lesson={state.lesson} onDismiss={dismissLesson} />
      <AchievementPopup achievements={state.achievements} />
    </div>
  );
}
