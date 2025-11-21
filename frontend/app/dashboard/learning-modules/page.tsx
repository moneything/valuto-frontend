"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useLearningModules, useUserLearningProgress } from '@/lib/hooks/useLearningModules';
import PageLayout from '@/components/theme/PageLayout';
import Card from '@/components/theme/Card';
import Button from '@/components/theme/Button';
import { BookOpenIcon, ClockIcon, StarIcon } from '@/components/icons';

const difficultyColors = {
  beginner: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
  advanced: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
};

const activityTypeIcons = {
  quiz: '📝',
  simulation: '🎮',
  scenario: '🎯'
};

const activityTypeLabels = {
  quiz: 'Quiz',
  simulation: 'Simulation',
  scenario: 'Scenario'
};

export default function LearningModulesPage() {
  const [filters, setFilters] = useState({
    topic: '',
    difficulty: '',
    activityType: ''
  });

  const { modules, loading, error } = useLearningModules(filters);
  const { progress, stats, loading: progressLoading } = useUserLearningProgress();

  const getModuleProgress = (moduleId: string) => {
    return progress?.find(p => p.moduleId === moduleId);
  };

  const getProgressPercentage = (moduleId: string) => {
    const moduleProgress = getModuleProgress(moduleId);
    return moduleProgress?.progressPercentage || 0;
  };

  const getModuleStatus = (moduleId: string) => {
    const moduleProgress = getModuleProgress(moduleId);
    return moduleProgress?.status || 'not_started';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in_progress': return '🔄';
      default: return '⏳';
    }
  };

  return (
    <PageLayout
      title="Learn Money Skills"
      subtitle="Master essential financial skills with our student-friendly guides. Each topic takes just 2-3 minutes to read!"
      icon={<BookOpenIcon className="w-16 h-16 text-valuto-green-600" />}
    >
      {/* Progress Overview */}
      {stats && (
        <Card className="mb-12 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white border-0">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold mb-2">Your Learning Stats</h2>
            <p className="text-lg opacity-90">Keep crushing those financial goals!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats?.completedModules || 0}</div>
              <div className="text-sm opacity-90">Modules Conquered! 🎯</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats?.inProgressModules || 0}</div>
              <div className="text-sm opacity-90">Currently Learning 🚀</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{Math.round(stats?.averageScore || 0)}</div>
              <div className="text-sm opacity-90">Average Score ⭐</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats?.totalPoints || 0}</div>
              <div className="text-sm opacity-90">Total Points Earned 💰</div>
            </div>
          </div>
        </Card>
      )}


      {/* Modules Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valuto-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading modules...</p>
        </div>
      ) : error ? (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Modules</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules?.map((module) => {
            const diffColor = difficultyColors[module.difficultyLevel];
            const progressPercentage = getProgressPercentage(module.id);
            const status = getModuleStatus(module.id);
            
            return (
              <Link key={module.id} href={`/dashboard/learning-modules/${module.id}`}>
                <Card className="group h-full flex flex-col relative overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                      {getStatusIcon(status)}
                    </span>
                  </div>

                  {/* Activity Type Icon */}
                  <div className="text-6xl mb-4 text-center">
                    {activityTypeIcons[module.activityType]}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-valuto-green-600 transition-colors">
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                    {module.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${diffColor.bg} ${diffColor.text} ${diffColor.border} border`}>
                        {module.difficultyLevel.charAt(0).toUpperCase() + module.difficultyLevel.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {module.timeEstimate} min
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        {activityTypeIcons[module.activityType]}
                        {activityTypeLabels[module.activityType]}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <StarIcon className="w-4 h-4" />
                        {module.points} pts
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {status !== 'not_started' && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs font-semibold text-gray-700">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-valuto-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="mt-auto">
                    <Button 
                      className={`w-full ${
                        status === 'completed' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-valuto-green-600 hover:bg-valuto-green-700'
                      }`}
                    >
                      {status === 'completed' ? 'Review' : status === 'in_progress' ? 'Continue' : 'Start Learning'}
                    </Button>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* Learning Tips */}
      <Card className="mt-16 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">🚀 Pro Tips to Level Up!</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Set Epic Goals!</h4>
            <p className="text-gray-700 text-lg">Complete modules regularly to build your money superpowers! Small steps = big wins! 🏆</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">🔄</div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Practice Makes Perfect!</h4>
            <p className="text-gray-700 text-lg">Replay completed modules to become a true money master! Repetition is the key to success! 💪</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Track Your Journey!</h4>
            <p className="text-gray-700 text-lg">Watch your scores climb and celebrate every victory! You're building your financial future! 🌟</p>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
}
