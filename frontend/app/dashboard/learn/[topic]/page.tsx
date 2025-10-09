"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockLearningModules } from '@/lib/mockData';
import PageLayout from '@/components/theme/PageLayout';
import Card from '@/components/theme/Card';
import Button from '@/components/theme/Button';
import { BookOpenIcon, CheckCircleIcon, XCircleIcon } from '@/components/icons';

export default function TopicPage({ params }: { params: Promise<{ topic: string }> | { topic: string } }) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ topic: string } | null>(null);

  useEffect(() => {
    if (params && typeof params === 'object' && 'then' in params) {
      // params is a Promise
      (params as Promise<{ topic: string }>).then(setResolvedParams);
    } else {
      // params is already resolved
      setResolvedParams(params as { topic: string });
    }
  }, [params]);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [showIntroduction, setShowIntroduction] = useState(true);

  if (!resolvedParams) {
    return (
      <PageLayout
        title="Loading..."
        subtitle="Loading learning module"
        icon={<BookOpenIcon className="w-16 h-16 text-gray-400" />}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valuto-green-600 mx-auto"></div>
        </div>
      </PageLayout>
    );
  }

  const module = mockLearningModules.find(m => m.id === resolvedParams.topic);

  if (!module || !module.content) {
    return (
      <PageLayout
        title="Module Not Found"
        subtitle="The learning module you're looking for doesn't exist"
        icon={<BookOpenIcon className="w-16 h-16 text-gray-400" />}
      >
        <div className="text-center">
          <Button onClick={() => router.push('/dashboard/learn')}>
            Back to Learning
          </Button>
        </div>
      </PageLayout>
    );
  }

  const { content } = module;
  const currentLessonData = content.lessons[currentLesson];
  const isLastLesson = currentLesson === content.lessons.length - 1;
  const totalLessons = content.lessons.length;

  const handleNext = () => {
    if (currentLesson < content.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setQuizAnswer(null);
      setShowQuizResult(false);
    } else {
      // Mark module as completed
      router.push('/dashboard/learn');
    }
  };

  const handleQuizSubmit = () => {
    setShowQuizResult(true);
    setCompletedLessons(prev => new Set([...Array.from(prev), currentLesson]));
  };

  const handleStartLearning = () => {
    setShowIntroduction(false);
  };

  const progressPercentage = ((currentLesson + 1) / totalLessons) * 100;

  return (
    <PageLayout
      title={module.title}
      subtitle={module.description}
      icon={<BookOpenIcon className="w-16 h-16 text-valuto-green-600" />}
    >
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/dashboard/learn')}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Learning
          </Button>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Progress</div>
            <div className="text-lg font-bold text-valuto-green-600 font-numbers">
              {currentLesson + 1}/{totalLessons}
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-valuto-green-500 to-valuto-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-sm text-gray-600 text-center">
          {Math.round(progressPercentage)}% Complete
        </div>
      </div>

      {/* Introduction Screen */}
      {showIntroduction ? (
        <Card className="text-center">
          <div className="text-6xl mb-6">{module.icon}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to {module.title}!</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            {content.introduction}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-valuto-green-50 p-6 rounded-xl border border-valuto-green-200">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-semibold text-gray-900 mb-2">Lessons</h3>
              <p className="text-sm text-gray-600">{totalLessons} interactive lessons</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="text-2xl mb-2">⏱️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
              <p className="text-sm text-gray-600">{module.duration}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Difficulty</h3>
              <p className="text-sm text-gray-600 capitalize">{module.difficulty}</p>
            </div>
          </div>
          
          <Button size="lg" onClick={handleStartLearning}>
            Start Learning
          </Button>
        </Card>
      ) : (
        <>
          {/* Lesson Content */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{currentLessonData.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Lesson {currentLesson + 1} of {totalLessons}</span>
                {completedLessons.has(currentLesson) && (
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                )}
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-lg">{currentLessonData.content}</p>
            </div>

            {/* Quiz Section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Knowledge Check</h3>
              <p className="text-lg text-gray-700 mb-6">{currentLessonData.quiz.question}</p>
              
              <div className="space-y-3 mb-6">
                {currentLessonData.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setQuizAnswer(index)}
                    disabled={showQuizResult}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      showQuizResult
                        ? index === currentLessonData.quiz.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-900'
                          : index === quizAnswer
                          ? 'border-red-500 bg-red-50 text-red-900'
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                        : quizAnswer === index
                        ? 'border-valuto-green-600 bg-valuto-green-50 text-valuto-green-900'
                        : 'border-gray-200 hover:border-valuto-green-300 hover:bg-valuto-green-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showQuizResult
                          ? index === currentLessonData.quiz.correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : index === quizAnswer
                            ? 'border-red-500 bg-red-500'
                            : 'border-gray-300'
                          : quizAnswer === index
                          ? 'border-valuto-green-600 bg-valuto-green-600'
                          : 'border-gray-300'
                      }`}>
                        {showQuizResult ? (
                          index === currentLessonData.quiz.correctAnswer ? (
                            <CheckCircleIcon className="w-4 h-4 text-white" />
                          ) : index === quizAnswer ? (
                            <XCircleIcon className="w-4 h-4 text-white" />
                          ) : null
                        ) : quizAnswer === index ? (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        ) : null}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {!showQuizResult && quizAnswer !== null && (
                <Button onClick={handleQuizSubmit} className="w-full">
                  Submit Answer
                </Button>
              )}

              {showQuizResult && (
                <Card className={`${
                  quizAnswer === currentLessonData.quiz.correctAnswer
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">
                      {quizAnswer === currentLessonData.quiz.correctAnswer ? '🎉' : '💡'}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold mb-2 ${
                        quizAnswer === currentLessonData.quiz.correctAnswer
                          ? 'text-green-900'
                          : 'text-red-900'
                      }`}>
                        {quizAnswer === currentLessonData.quiz.correctAnswer ? 'Excellent!' : 'Not quite right'}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {currentLessonData.quiz.explanation}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
              disabled={currentLesson === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!showQuizResult}
              size="lg"
            >
              {isLastLesson ? 'Complete Module' : 'Next Lesson'}
            </Button>
          </div>
        </>
      )}
    </PageLayout>
  );
}

