"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser as useClerkUser, useAuth } from '@clerk/nextjs';
import { useUser } from '@/lib/userContext';
import DashboardCard from '@/components/DashboardCard';
import RoleSwitcher from '@/components/RoleSwitcher';
import NewsAndEvents from '@/components/NewsAndEvents';
import { userApi } from '@/lib/api';
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
  UserIcon
} from '@/components/icons';
import StatsCard from '@/components/theme/StatsCard';

export default function DashboardPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { user: clerkUser, isLoaded: isClerkLoaded } = useClerkUser();
  const { userProfile, isLoadingProfile, isTeacher, isStudent } = useUser();
  const [userStats, setUserStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Fetch user stats from API
  useEffect(() => {
    const fetchStats = async () => {
      if (!userProfile) return;
      
      try {
        const token = await getToken();
        if (!token) return;
        
        const response = await userApi.getStats(token);
        if (response.success && response.data) {
          setUserStats(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [userProfile, getToken]);

  // Redirect to onboarding if user hasn't completed it
  useEffect(() => {
    if (isClerkLoaded && !isLoadingProfile) {
      if (clerkUser && !userProfile) {
        router.push('/onboarding');
      }
    }
  }, [isClerkLoaded, isLoadingProfile, clerkUser, userProfile, router]);

  // Show loading state
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

  // If no profile yet, don't render (will redirect)
  if (!userProfile) {
    return null;
  }

  const profile = userProfile;

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
      title: 'Interactive Learning Modules',
      description: 'Master financial concepts through interactive games, simulations, and quizzes',
      icon: <BookOpenIcon className="w-8 h-8" />,
      href: '/dashboard/learning-modules',
      badge: 'Interactive'
    },
    {
      title: 'My Progress',
      description: 'Track your achievements, badges, and learning journey',
      icon: <TrophyIcon className="w-8 h-8" />,
      href: '/dashboard/profile'
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
      title: 'Student Progress',
      description: 'Monitor student learning and participation',
      icon: <ChartBarIcon className="w-8 h-8" />,
      href: '/dashboard/students'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-valuto-green-50 via-white to-valuto-green-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-8 md:py-12 max-w-[1800px] mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Welcome back, <span className="text-valuto-green-600">{profile?.name?.split(' ')[0]}</span>! 👋
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isTeacher 
              ? 'Ready to create engaging financial lessons for your students?' 
              : 'Ready to level up your financial knowledge today?'
            }
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex justify-center mb-16">
          <RoleSwitcher />
        </div>

        {/* Stats Row (for students) */}
        {isStudent && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <StatsCard
              value={loadingStats ? '...' : (userStats?.gamesPlayed || 0).toString()}
              label="Games Played"
              icon={<GameControllerIcon className="w-12 h-12 text-valuto-green-600" />}
              color="green"
            />
            <StatsCard
              value={loadingStats ? '...' : `${userStats?.lessonsCompleted || 0}/20`}
              label="Lessons Completed"
              icon={<BookOpenIcon className="w-12 h-12 text-blue-600" />}
              color="blue"
            />
            <StatsCard
              value={loadingStats ? '...' : (userStats?.totalPoints || 0).toLocaleString()}
              label="Total Points"
              icon={<TrophyIcon className="w-12 h-12 text-orange-600" />}
              color="orange"
            />
          </div>
        )}

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

