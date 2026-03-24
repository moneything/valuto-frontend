// frontend/app/dashboard/page.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser as useClerkUser, useAuth } from "@clerk/nextjs";
import { useUser } from "@/lib/userContext"; 
import DashboardCard from "@/components/DashboardCard";
import NewsAndEvents from "@/components/NewsAndEvents";
import { userApi } from "@/lib/api";
import {
  GameControllerIcon,
  CalculatorIcon,
  BookOpenIcon,
  TrophyIcon,
  CrownIcon,
  TargetIcon,
  LightBulbIcon,
  PlusIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  AcademicCapIcon,
  UserIcon,
  TrendingUpIcon,
} from "@/components/icons";
import { formatDisplayName } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { user: clerkUser, isLoaded: isClerkLoaded } = useClerkUser();

  // ✅ align names with userContext
  const { profile, isLoadingProfile, isTeacher, isStudent } = useUser();

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

  const teacherDisplayName = formatDisplayName(profile, { useFirstNameForStudents: true });

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
      icon: <TrophyIcon className="w-7 h-7 text-amber-300" />,
      accent: "from-amber-500/20 to-orange-500/10 border-amber-400/30",
    },
    {
      label: "Day Streak",
      value: loadingStats ? "..." : `${progression?.streak ?? 0} days`,
      icon: <TargetIcon className="w-7 h-7 text-rose-300" />,
      accent: "from-rose-500/20 to-pink-500/10 border-rose-400/30",
    },
    {
      label: "Accuracy",
      value: loadingStats ? "..." : `${Math.round(progression?.accuracy ?? 0)}%`,
      icon: <ChartBarIcon className="w-7 h-7 text-cyan-300" />,
      accent: "from-cyan-500/20 to-sky-500/10 border-cyan-400/30",
    },
    {
      label: "Level",
      value: loadingStats ? "..." : `${progression?.level ?? 1}`,
      icon: <CrownIcon className="w-7 h-7 text-valuto-green-200" />,
      accent: "from-valuto-green-500/20 to-emerald-500/10 border-valuto-green-400/30",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-valuto-green-50 via-white to-valuto-green-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-8 md:py-12 max-w-[1800px] mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Welcome back, <span className="text-valuto-green-600">{teacherDisplayName}</span>! 👋
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isTeacher 
              ? 'Ready to create engaging financial lessons for your students?' 
              : 'Ready to level up your financial knowledge today?'
            }
          </p>
        </div>

        <div className="mb-12 overflow-hidden rounded-[28px] border border-white/50 bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.28),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_24%)] p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-valuto-green-200/80">
                  Progression Snapshot
                </p>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Your dashboard is now tracking platform-wide progress.
                </h2>
              </div>
              <div className="text-sm text-slate-300">
                XP maps directly to your existing total points.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {progressionCards.map((card) => (
                <div
                  key={card.label}
                  className={`rounded-2xl border bg-gradient-to-br p-5 backdrop-blur-sm ${card.accent}`}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm font-medium uppercase tracking-[0.18em] text-slate-300">
                      {card.label}
                    </span>
                    {card.icon}
                  </div>
                  <div className="text-3xl font-bold sm:text-4xl">{card.value}</div>
                </div>
              ))}
            </div>
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
