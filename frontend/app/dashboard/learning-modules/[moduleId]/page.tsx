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

  // Function to render markdown-like content with proper formatting
  const renderLessonContent = (content: string) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    
    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 text-gray-700">
            {currentList.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {Array.isArray(item) ? (
                  item.map((part, pi) => 
                    part.type === 'bold' ? (
                      <strong key={part.key} className="font-bold text-gray-900">{part.text}</strong>
                    ) : (
                      part
                    )
                  )
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };
    
    lines.forEach((line, index) => {
      // Handle headers
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-gray-800 mb-4 mt-6">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-gray-700 mb-3 mt-4">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        // Handle bullet points - remove the bullet and process bold text
        const listContent = line.replace('- ', '');
        // Process bold text in list items
        const parts = [];
        let lastIndex = 0;
        const boldRegex = /\*\*([^*]+)\*\*/g;
        let match;
        let keyCounter = 0;
        
        while ((match = boldRegex.exec(listContent)) !== null) {
          if (match.index > lastIndex) {
            parts.push(listContent.substring(lastIndex, match.index));
          }
          parts.push({ type: 'bold', text: match[1], key: keyCounter++ });
          lastIndex = match.index + match[0].length;
        }
        
        if (lastIndex < listContent.length) {
          parts.push(listContent.substring(lastIndex));
        }
        
        currentList.push(parts.length > 0 ? parts : listContent);
      } else if (line.trim() === '') {
        // Handle empty lines
        flushList();
        elements.push(<div key={index} className="h-4" />);
      } else {
        // Handle regular paragraphs
        flushList();
        // Process bold text and other formatting
        const processLine = (text: string) => {
          const parts = [];
          let lastIndex = 0;
          const boldRegex = /\*\*([^*]+)\*\*/g;
          let match;
          let keyCounter = 0;
          
          while ((match = boldRegex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
              parts.push(text.substring(lastIndex, match.index));
            }
            // Add the bold text
            parts.push(<strong key={`bold-${keyCounter++}`} className="font-bold text-gray-900">{match[1]}</strong>);
            lastIndex = match.index + match[0].length;
          }
          
          // Add remaining text
          if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
          }
          
          return parts.length > 0 ? parts : [text];
        };
        
        elements.push(
          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
            {processLine(line)}
          </p>
        );
      }
    });
    
    // Flush any remaining list items
    flushList();
    
    return elements;
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
        <Card className="p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b pb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900">{module.title}</h2>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4" />
                    {module.timeEstimate} min
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <StarIcon className="w-4 h-4" />
                    {module.points} pts
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-600">{module.description}</p>
              
              <div className="flex gap-4 mt-4">
                <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full capitalize">
                  {module.activityType}
                </span>
                <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full capitalize">
                  {module.difficultyLevel}
                </span>
                <span className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full capitalize">
                  {module.topic}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {renderLessonContent(module.lessonContent)}
            </div>

            {/* CTA */}
            <div className="pt-6 border-t">
              <Button 
                onClick={handleStartLearning} 
                size="lg" 
                className="w-full bg-valuto-green-600 hover:bg-valuto-green-700 text-white"
              >
                Let's Learn & Play! 🚀
              </Button>
            </div>
          </div>
        </Card>
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
