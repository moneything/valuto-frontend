"use client";

import { useCallback, useState } from "react";
import {
  Achievement,
  DecisionOption,
  GameState,
  PlayerSetup,
  YearSnapshot,
} from "@/components/build-your-life/types";
import {
  ACHIEVEMENT_DEFINITIONS,
  CAREER_OPTIONS,
  DECISIONS_BY_AGE,
  LIFE_EVENTS,
} from "@/components/build-your-life/data";

const initialState: GameState = {
  phase: "start",
  age: 18,
  year: 1,
  netWorth: 0,
  salary: 0,
  savings: 500,
  investments: 0,
  monthlyExpenses: 400,
  happiness: 60,
  stress: 30,
  debt: 0,
  career: null,
  careerTitle: "",
  housing: "parents",
  lifestyle: "balanced",
  history: [],
  achievements: [],
  currentDecision: null,
  currentEvent: null,
  lesson: null,
  traits: [],
  avatar: null,
  livingSituation: null,
  startingFinances: null,
  relationshipStatus: "single",
  partnerIncome: 0,
  socialPressure: 0,
  lifeScore: 0,
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function useGameEngine() {
  const [state, setState] = useState<GameState>(initialState);

  const applyTraitBonuses = (nextState: GameState, option: DecisionOption) => {
    if (!option.traitBonus || !nextState.traits.includes(option.traitBonus)) return;

    switch (option.traitBonus) {
      case "risk-taker":
        if (option.effects.investments) {
          nextState.investments += Math.round(Math.abs(option.effects.investments) * 0.2);
        }
        break;
      case "careful-saver":
        nextState.savings += 200;
        nextState.stress = clamp(nextState.stress - 5, 0, 100);
        break;
      case "entrepreneurial":
        if (option.effects.salary && option.effects.salary > 0) {
          nextState.salary += Math.round(option.effects.salary * 0.15);
        }
        break;
      case "big-spender":
        nextState.happiness = clamp(nextState.happiness + 5, 0, 100);
        break;
      case "strategic-thinker":
        nextState.stress = clamp(nextState.stress - 5, 0, 100);
        if (option.effects.investments) {
          nextState.investments += Math.round(Math.abs(option.effects.investments) * 0.1);
        }
        break;
    }
  };

  const advanceYear = (input: GameState): GameState => {
    const nextState = { ...input };

    nextState.age += 1;
    nextState.year += 1;

    let growthRate =
      nextState.career === "university"
        ? 0.05
        : nextState.career === "business"
          ? 0.08
          : nextState.career === "apprenticeship"
            ? 0.04
            : 0.03;

    if (nextState.traits.includes("entrepreneurial")) growthRate += 0.01;
    nextState.salary = Math.round(nextState.salary * (1 + growthRate));

    if (nextState.partnerIncome > 0) {
      nextState.partnerIncome = Math.round(nextState.partnerIncome * 1.03);
    }

    const totalMonthlyIncome = (nextState.salary + nextState.partnerIncome) / 12;
    const monthlySavings = totalMonthlyIncome - nextState.monthlyExpenses;
    nextState.savings += Math.round(monthlySavings * 12);

    if (nextState.traits.includes("careful-saver")) {
      nextState.savings += 200;
    }

    let investmentGrowth = 1.07;
    if (nextState.traits.includes("risk-taker")) {
      investmentGrowth = 1.09 + (Math.random() * 0.06 - 0.03);
    }
    if (nextState.traits.includes("strategic-thinker")) {
      investmentGrowth = 1.08;
    }
    nextState.investments = Math.round(nextState.investments * investmentGrowth);

    if (nextState.debt > 0) {
      const debtPayment = Math.min(nextState.debt, Math.round(nextState.salary * 0.1));
      nextState.debt -= debtPayment;
      nextState.savings -= debtPayment;
    }

    nextState.socialPressure = Math.max(0, nextState.socialPressure - 2);

    if (nextState.socialPressure > 50) {
      nextState.happiness = clamp(nextState.happiness - 3, 0, 100);
      nextState.stress = clamp(nextState.stress + 2, 0, 100);
    }

    nextState.netWorth = nextState.savings + nextState.investments - nextState.debt;
    nextState.lifeScore = Math.round(
      nextState.happiness * 0.3 +
        Math.max(0, 100 - nextState.stress) * 0.2 +
        Math.min(100, nextState.netWorth / 5000) * 0.3 +
        nextState.achievements.length * 5 +
        (nextState.partnerIncome > 0 ? 10 : 0)
    );

    const snapshot: YearSnapshot = {
      age: nextState.age,
      netWorth: nextState.netWorth,
      salary: nextState.salary,
      savings: nextState.savings,
      investments: nextState.investments,
      happiness: nextState.happiness,
      stress: nextState.stress,
    };

    let eventChance = 0.2;
    if (nextState.traits.includes("entrepreneurial")) {
      eventChance = 0.25;
    }

    if (Math.random() < eventChance && nextState.age > 20) {
      const traitEvents = LIFE_EVENTS.filter(
        (event) => event.traitTrigger && nextState.traits.includes(event.traitTrigger)
      );
      const selectedEvent =
        traitEvents.length > 0 && Math.random() < 0.4
          ? traitEvents[Math.floor(Math.random() * traitEvents.length)]
          : LIFE_EVENTS[Math.floor(Math.random() * LIFE_EVENTS.length)];

      nextState.currentEvent = selectedEvent;
      nextState.phase = "event";
      snapshot.event = selectedEvent.title;
    } else {
      const nextDecision = DECISIONS_BY_AGE.find((entry) => entry.minAge === nextState.age);
      if (nextDecision) {
        nextState.currentDecision = nextDecision.decision;
      }
    }

    nextState.history = [...nextState.history, snapshot];

    const newAchievements: Achievement[] = [];
    for (const definition of ACHIEVEMENT_DEFINITIONS) {
      if (!definition.check) continue;
      if (!nextState.achievements.find((achievement) => achievement.id === definition.id) && definition.check(nextState)) {
        newAchievements.push({
          id: definition.id,
          title: definition.title,
          icon: definition.icon,
          description: definition.description,
          unlockedAt: nextState.age,
        });
      }
    }
    if (newAchievements.length > 0) {
      nextState.achievements = [...nextState.achievements, ...newAchievements];
    }

    if (nextState.age >= 65) {
      nextState.phase = "summary";
      nextState.currentDecision = null;
      nextState.currentEvent = null;
    }

    return { ...nextState };
  };

  const startGame = useCallback((setup: PlayerSetup) => {
    const careerInfo = CAREER_OPTIONS.find((career) => career.path === setup.career);
    if (!careerInfo) return;

    let startingSavings = 500;
    let startingDebt = careerInfo.debt;

    if (setup.startingFinances === "comfortable") startingSavings = 2000;
    else if (setup.startingFinances === "debt-risk") {
      startingSavings = 1000;
      startingDebt += 2000;
    }

    let livingExpenses = 400;
    let livingHappiness = 60;
    if (setup.livingSituation === "renting-friends") {
      livingExpenses = 600;
      livingHappiness = 65;
    } else if (setup.livingSituation === "independent") {
      livingExpenses = 900;
      livingHappiness = 70;
    }

    let traitSavingsBonus = 0;
    let traitHappinessBonus = 0;
    let traitStressBonus = 0;

    if (setup.traits.includes("careful-saver")) traitSavingsBonus += 300;
    if (setup.traits.includes("big-spender")) {
      traitHappinessBonus += 10;
      livingExpenses += 200;
    }
    if (setup.traits.includes("strategic-thinker")) traitStressBonus -= 10;

    const totalSavings = startingSavings + traitSavingsBonus;

    const snapshot: YearSnapshot = {
      age: 18,
      netWorth: -startingDebt + totalSavings,
      salary: careerInfo.salary,
      savings: totalSavings,
      investments: 0,
      happiness: livingHappiness + traitHappinessBonus,
      stress: 30 + traitStressBonus,
    };

    const nextState: GameState = {
      ...initialState,
      phase: "playing",
      career: setup.career,
      careerTitle: careerInfo.title,
      salary: careerInfo.salary,
      debt: startingDebt,
      savings: totalSavings,
      netWorth: -startingDebt + totalSavings,
      monthlyExpenses: livingExpenses,
      happiness: livingHappiness + traitHappinessBonus,
      stress: 30 + traitStressBonus,
      history: [snapshot],
      traits: setup.traits,
      avatar: setup.avatar,
      livingSituation: setup.livingSituation,
      startingFinances: setup.startingFinances,
      housing:
        setup.livingSituation === "parents"
          ? "parents"
          : setup.livingSituation === "renting-friends"
            ? "houseshare"
            : "renting",
    };

    setState(nextState);
  }, []);

  const makeDecision = useCallback((option: DecisionOption) => {
    setState((previous) => {
      const nextState = { ...previous };

      if (option.effects.salary) nextState.salary = Math.max(0, nextState.salary + option.effects.salary);
      if (option.effects.savings) nextState.savings += option.effects.savings;
      if (option.effects.investments) nextState.investments = Math.max(0, nextState.investments + option.effects.investments);
      if (option.effects.monthlyExpenses) nextState.monthlyExpenses = Math.max(0, nextState.monthlyExpenses + option.effects.monthlyExpenses);
      if (option.effects.happiness !== undefined) nextState.happiness = clamp(nextState.happiness + option.effects.happiness, 0, 100);
      if (option.effects.stress !== undefined) nextState.stress = clamp(nextState.stress + option.effects.stress, 0, 100);
      if (option.effects.debt) nextState.debt += option.effects.debt;
      if (option.effects.housing) nextState.housing = option.effects.housing;
      if (option.effects.lifestyle) nextState.lifestyle = option.effects.lifestyle;
      if (option.effects.partnerIncome) nextState.partnerIncome = option.effects.partnerIncome;
      if (option.effects.socialPressure) {
        nextState.socialPressure = clamp(nextState.socialPressure + option.effects.socialPressure, 0, 100);
      }

      applyTraitBonuses(nextState, option);

      if (option.effects.partnerIncome && option.effects.partnerIncome > 0) {
        nextState.relationshipStatus = option.label.includes("Married") ? "married" : "partnered";
      }

      nextState.lesson = option.lesson || null;
      nextState.currentDecision = null;

      return advanceYear(nextState);
    });
  }, []);

  const resolveEvent = useCallback(() => {
    setState((previous) => {
      const nextState = { ...previous };
      if (nextState.currentEvent) {
        const effects = nextState.currentEvent.effects;
        if (effects.salary) nextState.salary = Math.max(0, nextState.salary + effects.salary);
        if (effects.savings) nextState.savings += effects.savings;
        if (effects.investments) nextState.investments = Math.max(0, nextState.investments + effects.investments);
        if (effects.happiness) nextState.happiness = clamp(nextState.happiness + effects.happiness, 0, 100);
        if (effects.stress) nextState.stress = clamp(nextState.stress + effects.stress, 0, 100);
        if (effects.netWorth) nextState.netWorth += effects.netWorth;
        if (effects.socialPressure) {
          nextState.socialPressure = clamp(nextState.socialPressure + effects.socialPressure, 0, 100);
        }
        nextState.lesson = nextState.currentEvent.lesson;
      }

      nextState.currentEvent = null;
      nextState.phase = "playing";

      const nextDecision = DECISIONS_BY_AGE.find((entry) => entry.minAge === nextState.age);
      if (nextDecision) {
        nextState.currentDecision = nextDecision.decision;
      }

      return { ...nextState };
    });
  }, []);

  const dismissLesson = useCallback(() => {
    setState((previous) => ({ ...previous, lesson: null }));
  }, []);

  const restart = useCallback(() => {
    setState(initialState);
  }, []);

  const skipYear = useCallback(() => {
    setState((previous) => {
      const nextState = { ...previous, currentDecision: null };
      return advanceYear(nextState);
    });
  }, []);

  return { state, startGame, makeDecision, resolveEvent, dismissLesson, restart, skipYear };
}
