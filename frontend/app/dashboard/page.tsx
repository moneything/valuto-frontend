// frontend/app/dashboard/page.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser as useClerkUser, useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Zap, Flame, Target, Award } from "lucide-react";
import { useUser } from "@/lib/userContext"; 
import DashboardCard from "@/components/DashboardCard";
import NewsAndEvents from "@/components/NewsAndEvents";
import { userApi } from "@/lib/api";
import {
  GameControllerIcon,
  CalculatorIcon,
  BookOpenIcon,
  CrownIcon,
  TargetIcon,
  LightBulbIcon,
  PlusIcon,
  UserIcon,
  TrendingUpIcon,
} from "@/components/icons";

export default function DashboardPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { user: clerkUser, isLoaded: isClerkLoaded } = useClerkUser();

  // ✅ align names with userContext
  const { profile, isLoadingProfile, isTeacher } = useUser();

  const [userStats, setUserStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchStats = useCallback(async () => {
    if (!profile) return;

    try {
      setLoadingStats(true);
      const token = await getToken({ template: "default" });

      if (!token) return;

      const response = await userApi.getStats(token);
      if (response.success && response.data) {
        setUserStats({
          ...response.data,
          ...response.data.stats,
          ...response.data.progression,
          progression: response.data.progression,
          user: response.data.user,
        });
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

  const studentCards: Array<{
    title: string;
    description: string;
    icon: React.ReactElement;
    href: string;
    badge?: string;
    color?: string;
  }> = [
    {
      title: 'Trivia Games',
      description: 'Join exciting Kahoot-style games and test your financial knowledge',
      icon: <GameControllerIcon className="w-8 h-8" />,
      href: '/dashboard/trivia',
      badge: '2 Active'
    },
    {
      title: 'Investment Calculator',
      description: 'See how your money can grow with our interactive calculator',
      icon: <CalculatorIcon className="w-8 h-8" />,
      href: '/dashboard/calculator'
    },
    {
      title: 'Investment Simulation',
      description: 'Practice investing in a risk-free environment with real market scenarios',
      icon: <TrendingUpIcon className="w-8 h-8" />,
      href: '/dashboard/investment',
      badge: 'New'
    },
    {
      title: 'Interactive Learning Modules',
      description: 'Master financial concepts through interactive games, simulations, and quizzes',
      icon: <BookOpenIcon className="w-8 h-8" />,
      href: '/dashboard/learning-modules',
      badge: 'Interactive'
    },
    {
      title: 'Leaderboard',
      description: 'See how you rank against other students',
      icon: <CrownIcon className="w-8 h-8" />,
      href: '/dashboard/leaderboard'
    },
    {
      title: 'Challenges',
      description: 'Complete daily challenges and earn rewards',
      icon: <TargetIcon className="w-8 h-8" />,
      href: '/dashboard/challenges'
    },
    {
      title: 'Valuto AI',
      description: 'Get instant financial advice and answers from our friendly AI assistant',
      icon: <LightBulbIcon className="w-8 h-8" />,
      href: '/dashboard/ai-chat',
      badge: 'AI'
    }
  ];

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
      title: 'My Games',
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

  // Add News & Events as a special card that renders inline
  const newsAndEventsCard = {
    title: 'News & Events',
    description: 'Latest financial news & UK networking events',
    icon: <span className="text-2xl">📰</span>,
    href: null, // Special card - no href
    isSpecial: true
  };

  const cards = isTeacher ? teacherCards : studentCards;
  const progression = userStats?.progression;

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
      color: "text-accent",
    },
    {
      label: "Accuracy",
      value: loadingStats ? "..." : `${Math.round(progression?.accuracy ?? 0)}%`,
      icon: Target,
      color: "text-success",
    },
    {
      value: loadingStats ? "..." : `${progression?.level ?? 1}`,
      label: "Level",
      icon: Award,
      color: "text-secondary",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-[1800px] px-4 py-8 sm:px-6 lg:px-12 md:py-12">
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
                  <span className="font-display text-sm font-bold text-foreground">{stat.value}</span>
                  <span className="ml-1 hidden text-xs text-muted-foreground sm:inline">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

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

        {/* News & Events Section */}
        <div id="news-events" className="mt-16">
          <NewsAndEvents />
        </div>

        {/* Quick Tips Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-valuto-green-600 to-valuto-green-700 rounded-2xl p-8 text-white shadow-xl">
            <div className="text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold mb-4">
                {isTeacher ? 'Teaching Tip of the Day' : 'Financial Tip of the Day'}
              </h3>
              <p className="text-valuto-green-50 text-lg leading-relaxed">
                {isTeacher 
                  ? 'Make learning interactive! Students retain 75% more information when they actively participate in games and discussions.'
                  : 'Start investing early! Even small amounts can grow significantly over time thanks to compound interest.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
