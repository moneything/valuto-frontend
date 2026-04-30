// frontend/app/dashboard/page.tsx

"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUser as useClerkUser, useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Zap, Trophy, Flame, Users, Plus as PlusLucide, Target, Award, ChevronRight, Clock, Star } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useUser } from "@/lib/userContext"; 
import DashboardCard from "@/components/DashboardCard";
import { leaderboardApi, triviaApi, userApi } from "@/lib/api";
import { useLearningCategories, useLearningModules } from "@/lib/hooks/useLearningModules";
import {
  GameControllerIcon,
  CalculatorIcon,
  BookOpenIcon,
  CrownIcon,
  TargetIcon,
  PlusIcon,
  UserIcon,
  TrendingUpIcon,
} from "@/components/icons";

export default function DashboardPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { user: clerkUser, isLoaded: isClerkLoaded } = useClerkUser();

  // ✅ align names with userContext
  const { profile, isLoadingProfile } = useUser();
  const { categories } = useLearningCategories();
  const { modules } = useLearningModules();

  const [userStats, setUserStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [platformStats, setPlatformStats] = useState({
    players: 0,
    gamesToday: 0,
    questions: 0,
  });
  const [leaderboardEntries, setLeaderboardEntries] = useState<any[]>([]);
  const arenaParticles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

  const fetchStats = useCallback(async () => {
    if (!profile) return;

    try {
      setLoadingStats(true);
      const token = await getToken({ template: "default" });

      if (!token) return;

      const [response, platformResponse, leaderboardResponse] = await Promise.all([
        userApi.getStats(token),
        triviaApi.getPlatformStats(token),
        leaderboardApi.getTop(token, 8),
      ]);

      if (response.success && response.data) {
        setUserStats({
          ...response.data,
          ...response.data.stats,
          ...response.data.progression,
          progression: response.data.progression,
          user: response.data.user,
        });
      }

      if (platformResponse.success && platformResponse.data) {
        setPlatformStats({
          players: platformResponse.data.players ?? 0,
          gamesToday: platformResponse.data.gamesToday ?? 0,
          questions: platformResponse.data.questions ?? 0,
        });
      }

      if (leaderboardResponse.success && Array.isArray(leaderboardResponse.data)) {
        setLeaderboardEntries(leaderboardResponse.data);
      }

    } catch (error) {
      console.error("Failed to fetch user stats:", error);
    } finally {
      setLoadingStats(false);
    }
  }, [profile, getToken]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchStats();
      }
    };
    window.addEventListener("focus", fetchStats);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("focus", fetchStats);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchStats]);

  // ✅ redirect logic stays same
  useEffect(() => {
    if (!isClerkLoaded || isLoadingProfile) return;
    if (clerkUser && profile?.completedOnboarding === false) {
      router.push("/onboarding");
    }
  }, [isClerkLoaded, isLoadingProfile, clerkUser, profile, router]);

  const progression = userStats?.progression;
  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDay = today.getDay();

  const battleCategories = useMemo(() => {
    if (!categories?.length) return [];

    return categories
      .map((category: any) => ({
        ...category,
        questionCount:
          modules?.filter((module: any) => module.categoryId === category.id).length || 0,
      }))
      .filter((category: any) => category.questionCount > 0);
  }, [categories, modules]);

  const streakDays = useMemo(() => {
    const streakCount = Math.max(0, Number(progression?.streak ?? 0));
    const days = Array(7).fill(false);

    for (let offset = 0; offset < Math.min(streakCount, 7); offset += 1) {
      const index = (currentDay - offset + 7) % 7;
      days[index] = true;
    }

    return days;
  }, [currentDay, progression?.streak]);

  // ✅ loading state (consistent)
  if (!isClerkLoaded || isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-valuto-green-600"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // ✅ this now works correctly
  if (!profile) return null;

  const teacherCards: Array<{
    title: string;
    description: string;
    icon: React.ReactElement;
    href: string;
    badge?: string;
    color?: string;
  }> = [
    {
      title: 'Create Trivia Game',
      description: 'Build engaging Kahoot-style games for your students',
      icon: <PlusIcon className="w-8 h-8" />,
      href: '/dashboard/trivia/create',
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'My Trivia Games',
      description: 'Manage and view all your created trivia games',
      icon: <GameControllerIcon className="w-8 h-8" />,
      href: '/dashboard/trivia'
    },
    {
      title: 'Leaderboard',
      description: 'Track class standings and top performers',
      icon: <CrownIcon className="w-8 h-8" />,
      href: '/dashboard/leaderboard'
    },
    {
      title: 'Interactive Learning Modules',
      description: 'Browse and assign interactive learning content to students',
      icon: <BookOpenIcon className="w-8 h-8" />,
      href: '/dashboard/learning-modules'
    },
    {
      title: 'Investment Calculator',
      description: 'Demonstrate investment concepts with interactive tools',
      icon: <CalculatorIcon className="w-8 h-8" />,
      href: '/dashboard/calculator'
    },
    {
      title: 'Build Your Life',
      description: 'Use an interactive future-planning simulator to discuss real-life tradeoffs with students',
      icon: <TargetIcon className="w-8 h-8" />,
      href: '/dashboard/build-your-life',
      badge: 'New'
    },
    {
      title: 'Build Your Business',
      description: 'Use a startup simulator to teach pricing, growth, cash flow, hiring, and competition',
      icon: <TrendingUpIcon className="w-8 h-8" />,
      href: '/dashboard/build-your-business',
      badge: 'New'
    },
    {
      title: 'Investment Simulation',
      description: 'Teach investing concepts through interactive market simulations',
      icon: <TrendingUpIcon className="w-8 h-8" />,
      href: '/dashboard/investment',
      badge: 'New'
    },
    {
      title: 'My Profile',
      description: 'Update your information and preferences',
      icon: <UserIcon className="w-8 h-8" />,
      href: '/dashboard/profile'
    }
  ];

  const cards = teacherCards;

  const progressionCards = [
    {
      label: "XP",
      value: loadingStats ? "..." : (progression?.xp ?? 0).toLocaleString(),
      icon: Zap,
      color: "text-primary",
    },
    {
      label: "Streak",
      value: loadingStats ? "..." : `${progression?.streak ?? 0} days`,
      icon: Flame,
      color: "text-yellow-500",
    },
    {
      label: "Accuracy",
      value: loadingStats ? "..." : `${Math.round(progression?.accuracy ?? 0)}%`,
      icon: Target,
      color: "text-primary",
    },
    {
      value: loadingStats ? "..." : `${progression?.level ?? 1}`,
      label: "Level",
      icon: Award,
      color: "text-blue-500",
    },
  ];

  const arenaStats = [
    {
      icon: Users,
      label: "Players",
      value: loadingStats ? "..." : platformStats.players.toLocaleString(),
    },
    {
      icon: Trophy,
      label: "Games Today",
      value: loadingStats ? "..." : platformStats.gamesToday.toLocaleString(),
    },
    {
      icon: Zap,
      label: "Questions",
      value: loadingStats ? "..." : platformStats.questions.toLocaleString(),
    },
  ];

  const battleColorMap: Record<string, string> = {
    "core-money-skills": "border-sky-500/40 hover:border-sky-400 shadow-[0_0_30px_rgba(14,165,233,0.2)]",
    "earning-income": "border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    "spending-wisely": "border-orange-500/40 hover:border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.2)]",
    "investing-assets": "border-violet-500/40 hover:border-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.2)]",
    "property-purchases": "border-indigo-500/40 hover:border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.2)]",
    entrepreneurship: "border-red-500/40 hover:border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]",
    "borrowing-debt": "border-yellow-500/40 hover:border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.2)]",
    "future-planning": "border-teal-500/40 hover:border-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.2)]",
    "money-society": "border-pink-500/40 hover:border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.2)]",
  };

  const dailyChallengeStats = {
    dayStreak: Number(progression?.streak ?? 0),
    bestStreak: Number(userStats?.longestStreak ?? 0),
    accuracy: Math.round(Number(progression?.accuracy ?? 0)),
  };
  const leaderboardAvatars = ["🏆", "👑", "📈", "💪", "🚀", "🏦", "🏗️", "📋"];
  const leaderboardData = leaderboardEntries.map((entry, index) => ({
    rank: Number(entry.rank ?? index + 1),
    name: entry.name || "Anonymous",
    avatar: leaderboardAvatars[index] || "⭐",
    score: Number(entry.totalPoints ?? 0),
    streak: Number(entry.currentStreak ?? 0),
  }));
  const podiumEntries = leaderboardData.length >= 3
    ? [
        { entry: leaderboardData[1], style: "second" },
        { entry: leaderboardData[0], style: "first" },
        { entry: leaderboardData[2], style: "third" },
      ]
    : leaderboardData.map((entry, index) => ({
        entry,
        style: index === 0 ? "first" : index === 1 ? "second" : "third",
      }));
  const podiumStyles: Record<string, { gradient: string; shadow: string; height: string }> = {
    second: {
      gradient: "from-zinc-500 via-zinc-400 to-zinc-600",
      shadow: "shadow-[0_0_45px_rgba(255,255,255,0.15)]",
      height: "h-36",
    },
    first: {
      gradient: "from-yellow-300 via-yellow-400 to-yellow-600",
      shadow: "shadow-[0_0_55px_rgba(250,204,21,0.35)]",
      height: "h-48",
    },
    third: {
      gradient: "from-orange-500 via-orange-600 to-amber-800",
      shadow: "shadow-[0_0_45px_rgba(249,115,22,0.28)]",
      height: "h-32",
    },
  };

  const handleStartQuiz = () => {
    router.push("/dashboard/trivia");
  };

  const handleDailyChallenge = () => {
    router.push("/dashboard/challenges");
  };

  const handleJoinGame = () => {
    router.push("/dashboard/trivia");
  };

  const handleCreateGame = () => {
    router.push("/dashboard/trivia/create");
  };

  const handleSelectBattleCategory = (categoryId: string) => {
    router.push(`/dashboard/learning-modules?category=${categoryId}`);
  };

  const handleStartDailyChallenge = () => {
    router.push("/dashboard/challenges");
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-12 py-1">
        <div className="mb-12 px-1 py-1 sm:px-4 sm:py-4">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-[#1b1b1d]/90 px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-md md:px-6">
            {progressionCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-2 whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <div>
                  <span className="font-display text-sm font-bold text-foreground text-white">{stat.value}</span>
                  <span> </span>
                  <span className="ml-1 hidden text-xs text-muted-foreground sm:inline ">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <section className="relative overflow-hidden px-4 pb-12 pt-1 md:pb-20">
          <div className="pointer-events-none absolute inset-0">
            {arenaParticles.map((particle, index) => (
              <motion.div
                key={`arena-particle-${index}`}
                className="absolute h-2 w-2 rounded-full bg-primary/30"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(152 100% 45% / 0.2)",
                    "0 0 40px hsl(152 100% 45% / 0.4)",
                    "0 0 20px hsl(152 100% 45% / 0.2)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="h-4 w-4 text-yellow-500" />
                <span className="font-body text-sm font-medium text-primary">
                  UK Financial Literacy - Live Now
                </span>
              </motion.div>

              <h1 className="mb-4 font-display text-5xl font-black uppercase tracking-tight md:text-7xl lg:text-8xl">
                <span className="text-gradient-primary">Valuto</span>{" "}
                <span className="text-white">Arena</span>
              </h1>

              <p className="mx-auto mb-8 max-w-4xl font-body text-lg text-[#9a9a9d] md:text-xl lg:text-[1.5rem] lg:leading-tight">
                The ultimate UK money trivia battleground. Master budgeting,
                investing, credit &amp; more. Compete with friends and level up your
                financial literacy.
              </p>

              <div className="mb-10 flex items-center justify-center gap-6 md:gap-10">
                {arenaStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <stat.icon className="h-5 w-5 text-primary" />
                    <span className="font-display text-xl font-bold text-white md:text-2xl">
                      {stat.value}
                    </span>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
                <motion.button
                  className="w-full rounded-2xl bg-primary px-8 py-4 font-display text-lg font-bold uppercase tracking-wider text-primary-foreground sm:w-auto"
                  onClick={handleStartQuiz}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(152 100% 45% / 0.5)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Zap className="h-5 w-5" />
                    Play Now
                  </span>
                </motion.button>

                <motion.button
                  className="w-full rounded-2xl border-2 border-yellow-500 bg-yellow-500/10 px-8 py-4 font-display text-lg font-bold uppercase tracking-wider text-yellow-500 sm:w-auto"
                  onClick={handleDailyChallenge}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(45 100% 55% / 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Flame className="h-5 w-5" />
                    Daily Challenge
                  </span>
                </motion.button>

                <motion.button
                  className="w-full rounded-2xl border border-border bg-muted/30 px-8 py-4 font-body text-lg font-semibold text-white sm:w-auto"
                  onClick={handleJoinGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Users className="h-5 w-5" />
                    Join Game
                  </span>
                </motion.button>

                <motion.button
                  className="w-full rounded-2xl border-2 border-primary/50 bg-primary/10 px-8 py-4 font-display text-lg font-bold uppercase tracking-wider text-primary sm:w-auto"
                  onClick={handleCreateGame}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(152 100% 45% / 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <PlusLucide className="h-5 w-5" />
                    Create Game
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="categories" className="px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <h2 className="mb-2 font-display text-3xl font-bold uppercase tracking-tight text-white md:text-4xl lg:text-6xl">
                Choose Your Battle
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Pick a topic and prove your knowledge
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {battleCategories.map((cat: any, i: number) => (
                (() => {
                  const IconComponent =
                    (LucideIcons as any)[cat.icon] || LucideIcons.HelpCircle;

                  return (
                    <motion.button
                      key={cat.id}
                      className={`group flex min-h-[220px] flex-col items-start gap-3 rounded-[1rem] border bg-[#242425]/95 p-8 text-left transition-all duration-300 ${
                        battleColorMap[cat.id] || battleColorMap["core-money-skills"]
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectBattleCategory(cat.id)}
                    >
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${cat.color || "bg-primary"}`}>
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                          {cat.title}
                        </h3>
                        <p className="mt-2 text-lg text-[#9a9a9d]">{cat.description}</p>
                      </div>
                      <div className="mt-auto flex w-full items-center justify-between pt-6">
                        <span className="text-base text-[#9a9a9d]">{cat.questionCount} questions</span>
                        <ChevronRight className="h-6 w-6 text-[#9a9a9d] transition-transform group-hover:translate-x-1" />
                      </div>
                    </motion.button>
                  );
                })()
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="mx-auto max-w-lg">
            <motion.div
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#232324] shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-r from-yellow-500/20 via-red-500/10 to-blue-500/20 p-6 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20">
                    <Flame className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">Daily Challenge</h3>
                    <p className="text-sm text-muted-foreground">5 questions • Build your streak</p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-4">
                <div className="mb-6">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    This Week
                  </p>
                  <div className="flex justify-between gap-2">
                    {dayNames.map((day, i) => (
                      <div key={day} className="flex flex-col items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">{day}</span>
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all ${
                            streakDays[i]
                              ? "bg-yellow-500/20 text-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.28)]"
                              : i === currentDay
                                ? "border-2 border-dashed border-primary/50 text-primary"
                                : "bg-white/[0.04] text-muted-foreground"
                          }`}
                        >
                          {streakDays[i] ? <Star className="h-4 w-4" /> : i === currentDay ? "?" : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-between rounded-2xl bg-white/[0.03] p-4">
                  <div className="text-center">
                    <div className="font-display text-2xl font-bold text-yellow-400">
                      {loadingStats ? "..." : dailyChallengeStats.dayStreak}
                    </div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="font-display text-2xl font-bold text-primary">
                      {loadingStats ? "..." : dailyChallengeStats.bestStreak}
                    </div>
                    <div className="text-xs text-muted-foreground">Best Streak</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="font-display text-2xl font-bold text-emerald-400">
                      {loadingStats ? "..." : `${dailyChallengeStats.accuracy}%`}
                    </div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                </div>

                <motion.button
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-4 font-display text-lg font-bold uppercase text-black shadow-[0_10px_30px_rgba(250,204,21,0.28)]"
                  onClick={handleStartDailyChallenge}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(45 100% 55% / 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Clock className="h-5 w-5" />
                  Start Today&apos;s Challenge
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[#151516]/80 px-4 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-sm sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-3 font-display text-3xl font-bold uppercase tracking-tight text-white md:text-4xl lg:text-6xl">
                <Trophy className="mr-3 inline h-8 w-8 text-yellow-400 md:h-10 md:w-10" />
                Leaderboard
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">This week&apos;s top players</p>
            </motion.div>

            {podiumEntries.length > 0 && (
              <div className="mb-10 flex flex-wrap items-end justify-center gap-4 md:gap-6">
                {podiumEntries.map(({ entry, style }, index) => (
                  <motion.div
                    key={entry.rank}
                    className="flex min-w-[150px] flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 }}
                  >
                    <span className="mb-3 text-4xl">{entry.avatar}</span>
                    <span className="mb-2 text-center font-body text-sm font-semibold text-[#a4a4a8] sm:text-base">
                      {entry.name}
                    </span>
                    <div
                      className={`flex w-36 flex-col items-center justify-end rounded-t-[1.75rem] bg-gradient-to-b px-4 py-5 text-black ${podiumStyles[style].gradient} ${podiumStyles[style].shadow} ${podiumStyles[style].height}`}
                    >
                      <Trophy className="mb-2 h-7 w-7" />
                      <span className="font-display text-3xl font-black">#{entry.rank}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mx-auto flex max-w-5xl flex-col gap-4">
              {leaderboardData.slice(3).map((entry, index) => (
                <motion.div
                  key={entry.rank}
                  className="flex items-center gap-4 rounded-[1.75rem] border border-white/10 bg-[#242425]/95 px-4 py-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:px-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.05] font-display text-2xl font-bold text-[#9a9a9d]">
                    {entry.rank}
                  </span>
                  <span className="text-3xl">{entry.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display text-2xl font-bold text-white">
                      {entry.name}
                    </div>
                    {entry.streak > 0 && (
                      <div className="mt-1 flex items-center gap-1 text-sm text-yellow-400 sm:text-base">
                        <Flame className="h-4 w-4" />
                        {entry.streak} day streak
                      </div>
                    )}
                  </div>
                  <span className="font-display text-3xl font-black text-primary sm:text-4xl">
                    {entry.score.toLocaleString()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Cards Grid - Full Width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              href={card.href}
              color={card.color || undefined}
              badge={card.badge || undefined}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
