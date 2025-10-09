"use client";

import { mockLearningModules } from '@/lib/mockData';
import Link from 'next/link';
import PageLayout from '@/components/theme/PageLayout';
import Card from '@/components/theme/Card';
import { BookOpenIcon } from '@/components/icons';

export default function LearnPage() {
  const difficultyColors = {
    beginner: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
    intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
    advanced: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  };

  return (
    <PageLayout
      title="Learning Modules"
      subtitle="Master financial concepts through interactive, gamified lessons"
      icon={<BookOpenIcon className="w-16 h-16 text-valuto-green-600" />}
    >

      {/* Progress Overview */}
      <Card className="mb-12 bg-gradient-to-r from-valuto-green-600 to-valuto-green-700 text-white border-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Your Learning Progress</h2>
            <p className="text-xl opacity-90">Keep going! You're making great progress</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold font-numbers">
              {mockLearningModules.filter(m => m.completed).length}/{mockLearningModules.length}
            </div>
            <p className="text-sm opacity-75">Modules Completed</p>
          </div>
        </div>
        <div className="mt-6 bg-white/20 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full transition-all"
            style={{ width: `${(mockLearningModules.filter(m => m.completed).length / mockLearningModules.length) * 100}%` }}
          />
        </div>
      </Card>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockLearningModules.map((module) => {
          const diffColor = difficultyColors[module.difficulty];
          
          return (
            <Link key={module.id} href={`/dashboard/learn/${module.id}`}>
              <Card className="group h-full flex flex-col relative overflow-hidden">
                {/* Completed Badge */}
                {module.completed && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center z-10">
                    ✓
                  </div>
                )}

                {/* Icon */}
                <div className="text-6xl mb-6 text-center">{module.icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-valuto-green-600 transition-colors text-center">
                  {module.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed text-center flex-grow">
                  {module.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-semibold px-4 py-2 rounded-full ${diffColor.bg} ${diffColor.text} ${diffColor.border} border`}>
                    {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {module.duration}
                  </span>
                </div>

                {/* Progress Bar (if not completed) */}
                {!module.completed && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Progress</span>
                      <span className="text-sm font-semibold text-gray-700">0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-valuto-green-600 h-2 rounded-full transition-all" style={{ width: '0%' }} />
                    </div>
                  </div>
                )}

                {/* Start Button */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 text-valuto-green-600 font-semibold group-hover:text-valuto-green-700 transition-colors">
                    <span>Start Learning</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Learning Tips */}
      <Card className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">💡 Learning Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">📖</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Read Carefully</h4>
            <p className="text-gray-600">Take your time to understand each concept</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">✍️</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Practice</h4>
            <p className="text-gray-600">Complete the quizzes to test your knowledge</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔁</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Review</h4>
            <p className="text-gray-600">Come back to modules to reinforce learning</p>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
}

