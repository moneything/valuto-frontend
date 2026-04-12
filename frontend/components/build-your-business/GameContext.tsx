"use client";

import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import {
  BrandStyle,
  BusinessIdea,
  BusinessMetrics,
  Employee,
  GameStage,
  GameState,
  LaunchChannel,
} from "@/components/build-your-business/types";
import { BUSINESS_EVENTS, INITIAL_ACHIEVEMENTS, MARKETING_CHANNELS } from "@/components/build-your-business/data";

const initialMetrics: BusinessMetrics = {
  revenue: 0,
  profit: 0,
  expenses: 0,
  customers: 0,
  reputation: 50,
  stress: 10,
  satisfaction: 70,
  cash: 1000,
  valuation: 0,
  weeklyRevenue: 0,
  weeklyCosts: 0,
};

const initialState: GameState = {
  stage: 1,
  week: 0,
  businessName: "",
  selectedIdea: null,
  metrics: { ...initialMetrics },
  employees: [],
  activeMarketing: [],
  achievements: INITIAL_ACHIEVEMENTS.map((achievement) => ({ ...achievement })),
  decisions: [],
  lessons: [],
  launchChannel: null,
  brandStyle: null,
  pricePoint: 0,
  productionCost: 0,
  marketingBudget: 0,
  metricsHistory: [],
  eventsEncountered: [],
  gameOver: false,
  showEvent: null,
};

type GameContextType = {
  state: GameState;
  selectIdea: (idea: BusinessIdea) => void;
  setBusinessName: (name: string) => void;
  setStage: (stage: GameStage) => void;
  setPricing: (price: number, cost: number) => void;
  setLaunchChannel: (channel: LaunchChannel) => void;
  setBrandStyle: (style: BrandStyle) => void;
  toggleMarketing: (channelId: string) => void;
  hireEmployee: (employee: Employee) => void;
  fireEmployee: (employeeId: string) => void;
  advanceWeek: () => void;
  handleEventChoice: (eventId: string, choiceId: string) => void;
  dismissEvent: () => void;
  resetGame: () => void;
  newAchievements: string[];
  consumeNewAchievement: () => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({ ...initialState });
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  const checkAchievements = useCallback((metrics: BusinessMetrics, current = state.achievements) => {
    const updated = current.map((achievement) => ({
      ...achievement,
      unlocked: achievement.unlocked || achievement.condition(metrics),
    }));
    const unlockedNow = updated.filter((achievement, index) => achievement.unlocked && !current[index].unlocked);
    if (unlockedNow.length > 0) {
      setNewAchievements((previous) => [...previous, ...unlockedNow.map((achievement) => achievement.id)]);
    }
    return updated;
  }, [state.achievements]);

  const selectIdea = (idea: BusinessIdea) => {
    setState((previous) => ({
      ...previous,
      selectedIdea: idea,
      metrics: {
        ...previous.metrics,
        cash: previous.metrics.cash - idea.startingCost,
        expenses: idea.startingCost,
      },
      decisions: [...previous.decisions, `Selected business idea: ${idea.name}`],
    }));
  };

  const setBusinessName = (name: string) => setState((previous) => ({ ...previous, businessName: name }));
  const setStage = (stage: GameStage) => setState((previous) => ({ ...previous, stage }));

  const setPricing = (price: number, cost: number) => {
    setState((previous) => ({
      ...previous,
      pricePoint: price,
      productionCost: cost,
      decisions: [...previous.decisions, `Set price: £${price}, production cost: £${cost}`],
    }));
  };

  const setLaunchChannel = (channel: LaunchChannel) => {
    setState((previous) => ({
      ...previous,
      launchChannel: channel,
      decisions: [...previous.decisions, `Launch channel: ${channel}`],
    }));
  };

  const setBrandStyle = (style: BrandStyle) => {
    setState((previous) => ({
      ...previous,
      brandStyle: style,
      decisions: [...previous.decisions, `Brand style: ${style}`],
    }));
  };

  const toggleMarketing = (channelId: string) => {
    setState((previous) => {
      const activeMarketing = previous.activeMarketing.includes(channelId)
        ? previous.activeMarketing.filter((id) => id !== channelId)
        : [...previous.activeMarketing, channelId];
      return { ...previous, activeMarketing };
    });
  };

  const hireEmployee = (employee: Employee) => {
    setState((previous) => ({
      ...previous,
      employees: [...previous.employees, employee],
      decisions: [...previous.decisions, `Hired: ${employee.name} (${employee.role})`],
    }));
  };

  const fireEmployee = (employeeId: string) => {
    setState((previous) => ({
      ...previous,
      employees: previous.employees.filter((employee) => employee.id !== employeeId),
    }));
  };

  const advanceWeek = () => {
    setState((previous) => {
      const { pricePoint, productionCost, activeMarketing, employees, metrics, selectedIdea } = previous;
      if (!selectedIdea) return previous;

      const baseDemand = (selectedIdea.marketDemand / 100) * 4.5;
      const marketingBoost = activeMarketing.reduce((sum, channelId) => {
        const channel = MARKETING_CHANNELS.find((item) => item.id === channelId);
        if (!channel) return sum;
        return sum + channel.conversionRate * 0.7;
      }, 0);
      const employeeBoost = employees.reduce((sum, employee) => sum + employee.productivity / 110, 0);
      const reputationBoost = Math.max(-1.5, (metrics.reputation - 50) / 20);
      const repeatCustomerDrag = Math.min(2.4, metrics.customers / 180);
      const saturationMultiplier = Math.max(0.35, 1 - metrics.customers / 2200);
      const rawCustomerGain = baseDemand + marketingBoost + employeeBoost + reputationBoost - repeatCustomerDrag;
      const newCustomers = Math.max(0, Math.round(rawCustomerGain * saturationMultiplier));

      const weeklyRevenue = Math.round(newCustomers * pricePoint);
      const marketingCosts = activeMarketing.reduce((sum, channelId) => {
        const channel = MARKETING_CHANNELS.find((item) => item.id === channelId);
        return sum + (channel?.costPerWeek || 0);
      }, 0);
      const employeeCosts = employees.reduce((sum, employee) => sum + employee.cost, 0);
      const productionCosts = newCustomers * productionCost;
      const weeklyCosts = marketingCosts + employeeCosts + productionCosts;
      const weeklyProfit = weeklyRevenue - weeklyCosts;
      const reputationDelta = weeklyProfit > 150 ? 1 : weeklyProfit < 0 ? -1 : 0;
      const stressDelta = weeklyProfit < 0 ? 4 : weeklyProfit < 120 ? 1 : -1;
      const satisfactionDelta = weeklyProfit > 200 ? 1 : weeklyProfit < -50 ? -2 : 0;

      const nextMetrics: BusinessMetrics = {
        revenue: metrics.revenue + weeklyRevenue,
        profit: metrics.profit + weeklyProfit,
        expenses: metrics.expenses + weeklyCosts,
        customers: metrics.customers + newCustomers,
        reputation: Math.min(100, Math.max(0, metrics.reputation + reputationDelta)),
        stress: Math.min(100, Math.max(0, metrics.stress + stressDelta)),
        satisfaction: Math.min(100, Math.max(0, metrics.satisfaction + satisfactionDelta)),
        cash: metrics.cash + weeklyProfit,
        valuation: Math.max(
          0,
          Math.round((metrics.revenue + weeklyRevenue) * 1.35 + Math.max(0, metrics.profit + weeklyProfit) * 2 + Math.max(0, metrics.reputation) * 75),
        ),
        weeklyRevenue,
        weeklyCosts,
      };

      const achievements = checkAchievements(nextMetrics, previous.achievements);

      let showEvent = null;
      if (Math.random() < 0.2 && previous.week > 1) {
        const available = BUSINESS_EVENTS.filter((event) => !previous.eventsEncountered.includes(event.id));
        if (available.length > 0) {
          showEvent = available[Math.floor(Math.random() * available.length)];
        }
      }

      const week = previous.week + 1;
      const gameOver = nextMetrics.cash < -500 || nextMetrics.stress >= 100;

      const lessons = [...previous.lessons];
      if (pricePoint < productionCost * 1.2 && !lessons.includes("low-price")) lessons.push("low-price");
      if (activeMarketing.length === 0 && week > 3 && !lessons.includes("no-marketing")) lessons.push("no-marketing");
      if (nextMetrics.stress > 70 && !lessons.includes("high-stress")) lessons.push("high-stress");

      return {
        ...previous,
        week,
        metrics: nextMetrics,
        metricsHistory: [...previous.metricsHistory, nextMetrics],
        achievements,
        showEvent,
        eventsEncountered: showEvent ? [...previous.eventsEncountered, showEvent.id] : previous.eventsEncountered,
        gameOver,
        lessons,
      };
    });
  };

  const handleEventChoice = (eventId: string, choiceId: string) => {
    setState((previous) => {
      const event = BUSINESS_EVENTS.find((item) => item.id === eventId);
      const choice = event?.choices.find((item) => item.id === choiceId);
      if (!choice) return previous;

      const nextMetrics = { ...previous.metrics };
      (Object.keys(choice.effects) as (keyof BusinessMetrics)[]).forEach((key) => {
        nextMetrics[key] += choice.effects[key] || 0;
      });

      return {
        ...previous,
        metrics: nextMetrics,
        showEvent: null,
        decisions: [...previous.decisions, `Event "${event?.title}": chose "${choice.text}"`],
        lessons: choice.lesson ? [...previous.lessons, choice.lesson] : previous.lessons,
      };
    });
  };

  const dismissEvent = () => setState((previous) => ({ ...previous, showEvent: null }));

  const resetGame = () => {
    setState({ ...initialState, achievements: INITIAL_ACHIEVEMENTS.map((achievement) => ({ ...achievement })) });
    setNewAchievements([]);
  };

  const consumeNewAchievement = () => {
    setNewAchievements((previous) => previous.slice(1));
  };

  const value = useMemo(
    () => ({
      state,
      selectIdea,
      setBusinessName,
      setStage,
      setPricing,
      setLaunchChannel,
      setBrandStyle,
      toggleMarketing,
      hireEmployee,
      fireEmployee,
      advanceWeek,
      handleEventChoice,
      dismissEvent,
      resetGame,
      newAchievements,
      consumeNewAchievement,
    }),
    [state, newAchievements]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
