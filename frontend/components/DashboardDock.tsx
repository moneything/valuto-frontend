"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GameControllerIcon, 
  CalculatorIcon, 
  BookOpenIcon, 
  TrophyIcon, 
  CrownIcon, 
  TargetIcon,
  LightBulbIcon,
  UserIcon,
  HomeIcon,
  NewspaperIcon,
  TrendingUpIcon
} from '@/components/icons';

const dockItems = [
  {
    title: 'Dashboard',
    icon: HomeIcon,
    href: '/dashboard',
    color: 'text-valuto-green-600 dark:text-valuto-green-400',
    bgColor: 'bg-valuto-green-100 hover:bg-valuto-green-200',
  },
  {
    title: 'Trivia Games',
    icon: GameControllerIcon,
    href: '/dashboard/trivia',
    color: 'text-valuto-green-600 dark:text-valuto-green-400',
    bgColor: 'bg-green-100 hover:bg-green-200',
  },
  {
    title: 'Calculator',
    icon: CalculatorIcon,
    href: '/dashboard/calculator',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 hover:bg-blue-200',
  },
  {
    title: 'Interactive Modules',
    icon: BookOpenIcon,
    href: '/dashboard/learning-modules',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 hover:bg-indigo-200',
  },
  {
    title: 'Investment Simulation',
    icon: TrendingUpIcon,
    href: '/dashboard/investment',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 hover:bg-emerald-200',
  },
  {
    title: 'News & Events',
    icon: NewspaperIcon,
    href: '/dashboard#news-events',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 hover:bg-purple-200',
  },
  {
    title: 'Leaderboard',
    icon: CrownIcon,
    href: '/dashboard/leaderboard',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 hover:bg-yellow-200',
  },
  {
    title: 'Challenges',
    icon: TargetIcon,
    href: '/dashboard/challenges',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 hover:bg-red-200',
  },
  {
    title: 'Valuto AI',
    icon: LightBulbIcon,
    href: '/dashboard/ai-chat',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 hover:bg-indigo-200',
  },
  {
    title: 'My Profile',
    icon: UserIcon,
    href: '/dashboard/profile',
    color: 'text-neutral-600 dark:text-neutral-300',
    bgColor: 'bg-gray-100 hover:bg-gray-200',
  },
];

function DockItem({ item }: { item: typeof dockItems[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <Link href={item.href} className="relative group">
      <motion.div
        className={`relative flex items-center justify-center rounded-full ${item.bgColor} transition-all duration-200 cursor-pointer border-2 border-white dark:border-neutral-700 shadow-md hover:shadow-xl`}
        initial={{ width: 48, height: 48 }}
        whileHover={{ 
          width: 64, 
          height: 64,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon className={`w-6 h-6 ${item.color}`} />
        
        {/* Tooltip */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none"
          >
            {item.title}
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900" />
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
}

export default function DashboardDock() {
  return (
    <div className='fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block'>
      <div className="flex flex-col gap-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg shadow-2xl border-2 border-valuto-green-200/50 rounded-2xl p-4">
        {dockItems.map((item, idx) => (
          <DockItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

