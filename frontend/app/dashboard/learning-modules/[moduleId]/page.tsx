"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLearningModule, useLearningProgress } from '@/lib/hooks/useLearningModules';
import PageLayout from '@/components/theme/PageLayout';
import Card from '@/components/theme/Card';
import Button from '@/components/theme/Button';
import QuizActivity from '@/components/learning/QuizActivity';
import SimulationActivity from '@/components/learning/SimulationActivity';
import ScenarioActivity from '@/components/learning/ScenarioActivity';
import InteractiveLearning from '@/components/learning/InteractiveLearning';
import { BookOpenIcon, TrophyIcon, ClockIcon, StarIcon } from '@/components/icons';

export default function LearningModulePage({ params }: { params: Promise<{ moduleId: string }> | { moduleId: string } }) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ moduleId: string } | null>(null);
  const [currentStep, setCurrentStep] = useState<'intro' | 'learning' | 'activity' | 'complete'>('intro');
  const [activityResult, setActivityResult] = useState<any>(null);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (params && typeof params === 'object' && 'then' in params) {
      (params as Promise<{ moduleId: string }>).then(setResolvedParams);
    } else {
      setResolvedParams(params as { moduleId: string });
    }
  }, [params]);

  const { module, loading, error } = useLearningModule(resolvedParams?.moduleId || '');
  const { progress, saveProgress, loading: progressLoading } = useLearningProgress(resolvedParams?.moduleId || '');

  useEffect(() => {
    if (module && !sessionStartTime) {
      setSessionStartTime(new Date());
    }
  }, [module, sessionStartTime]);

  const handleStartLearning = () => {
    setCurrentStep('learning');
  };

  const handleLearningComplete = () => {
    setCurrentStep('activity');
  };

  const handleActivityComplete = async (result: any) => {
    setActivityResult(result);
    setCurrentStep('complete');

    try {
      const sessionData = {
        startTime: sessionStartTime?.toISOString(),
        endTime: new Date().toISOString(),
        totalTime: sessionStartTime ? Math.floor((Date.now() - sessionStartTime.getTime()) / 1000) : 0
      };

      const progressResult = await saveProgress({
        activityType: module?.activityType || 'quiz',
        responses: result,
        simulationResult: result,
        scenarioResults: result,
        sessionData
      });

      // Update activity result with points earned from backend
      if (progressResult && progressResult.pointsEarned !== undefined) {
        setActivityResult({
          ...result,
          pointsEarnedTotal: progressResult.pointsEarned,
          totalUserPoints: progressResult.totalPoints
        });
      }
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const handleRetry = () => {
    setCurrentStep('intro');
    setActivityResult(null);
    setSessionStartTime(new Date());
  };

  const handleNextModule = () => {
    router.push('/dashboard/learning-modules');
  };

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

  if (loading) {
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

  if (error || !module) {
    return (
      <PageLayout
        title="Module Not Found"
        subtitle="The learning module you're looking for doesn't exist"
        icon={<BookOpenIcon className="w-16 h-16 text-gray-400" />}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Module Not Found</h3>
          <p className="text-gray-600 mb-6">{error || 'The learning module you\'re looking for doesn\'t exist.'}</p>
          <Button onClick={() => router.push('/dashboard/learning-modules')}>
            Back to Learning Modules
          </Button>
        </div>
      </PageLayout>
    );
  }

  const renderActivity = () => {
    switch (module.activityType) {
      case 'quiz':
        return (
          <QuizActivity
            questions={module.activityData.questions}
            onComplete={handleActivityComplete}
          />
        );
      case 'simulation':
        return (
          <SimulationActivity
            simulation={module.activityData}
            onComplete={handleActivityComplete}
          />
        );
      case 'scenario':
        return (
          <ScenarioActivity
            scenarios={module.activityData.scenarios}
            onComplete={handleActivityComplete}
          />
        );
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Activity type not supported yet.</p>
          </div>
        );
    }
  };

  const renderCompletion = () => {
    const totalScore = activityResult?.reduce((sum: number, r: any) => sum + (r.pointsEarned || r.finalScore || 0), 0) || 0;
    const maxScore = module.points;
    const percentage = Math.round((totalScore / maxScore) * 100);
    const pointsEarned = activityResult?.pointsEarnedTotal || totalScore;
    const totalUserPoints = activityResult?.totalUserPoints;

    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {percentage >= 80 ? 'Excellent Work!' : percentage >= 60 ? 'Good Job!' : 'Keep Learning!'}
          </h2>
          <p className="text-gray-600">
            {percentage >= 80 
              ? 'You\'ve mastered this topic! Ready for the next challenge?'
              : percentage >= 60 
              ? 'You\'re making great progress! Consider reviewing some concepts.'
              : 'Don\'t worry! Learning takes time. Review the material and try again.'
            }
          </p>
        </div>

        {/* Points Celebration */}
        {pointsEarned > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6 text-center">
            <div className="text-5xl mb-3">🏆</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              +{pointsEarned} Points Earned!
            </h3>
            {totalUserPoints !== undefined && (
              <p className="text-lg text-gray-700">
                Your total: <span className="font-bold text-orange-600">{totalUserPoints.toLocaleString()} points</span>
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-valuto-green-600 mb-2">{totalScore}</div>
            <div className="text-sm text-gray-600">Points This Activity</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{percentage}%</div>
            <div className="text-sm text-gray-600">Score</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {sessionStartTime ? Math.floor((Date.now() - sessionStartTime.getTime()) / 60000) : 0}
            </div>
            <div className="text-sm text-gray-600">Minutes</div>
          </Card>
        </div>

        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={handleRetry}>
            Try Again
          </Button>
          <Button onClick={handleNextModule}>
            Continue Learning
          </Button>
        </div>
      </div>
    );
  };

  return (
    <PageLayout
      title={module.title}
      subtitle={module.description}
      icon={<BookOpenIcon className="w-16 h-16 text-valuto-green-600" />}
    >
      {/* Back Button */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/dashboard/learning-modules')}
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Modules
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep === 'intro' ? 'bg-valuto-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <span className="text-sm font-medium">Introduction</span>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-4"></div>
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep === 'learning' ? 'bg-valuto-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <span className="text-sm font-medium">Learn & Play</span>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-4"></div>
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep === 'activity' ? 'bg-valuto-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
            <span className="text-sm font-medium">Challenge</span>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-4"></div>
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep === 'complete' ? 'bg-valuto-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              4
            </div>
            <span className="text-sm font-medium">Complete</span>
          </div>
        </div>
      </div>

      {/* Content */}
      {currentStep === 'intro' && (
        <div className="space-y-8">
          {/* Module Info */}
          <Card className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{module.title}</h2>
                <p className="text-gray-600 leading-relaxed">{module.lessonContent}</p>
              </div>
              <div className="flex flex-col gap-2 text-right">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {module.timeEstimate} min
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <StarIcon className="w-4 h-4" />
                  {module.points} points
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-valuto-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Activity Type</h4>
                <p className="text-sm text-gray-600 capitalize">{module.activityType}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Difficulty</h4>
                <p className="text-sm text-gray-600 capitalize">{module.difficultyLevel}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Topic</h4>
                <p className="text-sm text-gray-600 capitalize">{module.topic}</p>
              </div>
            </div>

            <Button onClick={handleStartLearning} size="lg" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              Let's Learn & Play! 🚀
            </Button>
          </Card>
        </div>
      )}

      {currentStep === 'learning' && (
        <Card className="p-8">
          {module.learningSteps && module.learningSteps.length > 0 ? (
            <InteractiveLearning
              steps={module.learningSteps}
              onComplete={handleLearningComplete}
            />
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Learn!</h3>
              <p className="text-gray-600 mb-6">This module doesn't have interactive learning steps yet.</p>
              <Button onClick={handleLearningComplete} className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white">
                Skip to Challenge 🎯
              </Button>
            </div>
          )}
        </Card>
      )}

      {currentStep === 'activity' && (
        <Card className="p-8">
          {renderActivity()}
        </Card>
      )}

      {currentStep === 'complete' && (
        <Card className="p-8">
          {renderCompletion()}
        </Card>
      )}
    </PageLayout>
  );
}
