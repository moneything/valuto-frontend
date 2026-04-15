"use client";

import { useState, useEffect } from 'react';
import Card from '@/components/theme/Card';
import Button from '@/components/theme/Button';
import { motion, AnimatePresence } from 'framer-motion';
import DragDropGame from './DragDropGame';
import MatchingGame from './MatchingGame';
import CalculatorGame from './CalculatorGame';

interface LearningStep {
  id: string;
  type: 'explanation' | 'interactive' | 'example' | 'mini-game';
  title: string;
  content: string;
  interactiveData?: any;
  emoji: string;
  points: number;
}

interface InteractiveLearningProps {
  steps: LearningStep[];
  onComplete: () => void;
  onProgress?: (currentStep: number, totalSteps: number) => void;
}

export default function InteractiveLearning({ steps, onComplete, onProgress }: InteractiveLearningProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  useEffect(() => {
    if (onProgress) {
      onProgress(currentStepIndex + 1, steps.length);
    }
  }, [currentStepIndex, steps.length, onProgress]);

  const handleStepComplete = (points: number) => {
    setTotalPoints(prev => prev + points);
    
    if (isLastStep) {
      setShowCelebration(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleAnswer = (stepId: string, answer: any) => {
    setUserAnswers(prev => ({ ...prev, [stepId]: answer }));
  };

  const renderExplanation = (step: LearningStep) => (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="text-6xl mb-4">{step.emoji}</div>
        <h3 className="mb-4 text-2xl font-bold text-white">{step.title}</h3>
        <div className="rounded-xl border border-blue-400/20 bg-gradient-to-r from-blue-500/10 to-violet-500/10 p-6">
          <p className="text-lg leading-relaxed text-[#e5e5e7]">{step.content}</p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={() => handleStepComplete(step.points)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold text-lg"
        >
          Got it! Let's continue 🚀
        </Button>
      </div>
    </motion.div>
  );

  const renderInteractive = (step: LearningStep) => {
    const { interactiveData } = step;
    
    return (
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        {interactiveData?.type === 'drag-drop' && (
          <DragDropGame
            items={interactiveData.items}
            onComplete={(score) => {
              const points = Math.round((score / 100) * step.points);
              handleStepComplete(points);
            }}
            title={step.title}
            description={step.content}
          />
        )}

        {interactiveData?.type === 'matching' && (
          <MatchingGame
            terms={interactiveData.terms}
            definitions={interactiveData.definitions}
            onComplete={(score) => {
              const points = Math.round((score / 100) * step.points);
              handleStepComplete(points);
            }}
            title={step.title}
            description={step.content}
          />
        )}

        {interactiveData?.type === 'calculator' && (
          <CalculatorGame
            title={step.title}
            description={step.content}
            defaultAmount={interactiveData.defaultAmount || 1000}
            defaultRate={interactiveData.defaultRate || 5}
            examples={interactiveData.examples || []}
            onComplete={(score) => {
              const points = Math.round((score / 100) * step.points);
              handleStepComplete(points);
            }}
          />
        )}

        {!interactiveData && (
          <div className="text-center">
            <div className="text-6xl mb-4">{step.emoji}</div>
            <h3 className="mb-4 text-2xl font-bold text-white">{step.title}</h3>
            <p className="mb-6 text-lg text-[#d7d7db]">{step.content}</p>
            <Button
              onClick={() => handleStepComplete(step.points)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold text-lg"
            >
              Got it! Let's continue 🚀
            </Button>
          </div>
        )}
      </motion.div>
    );
  };

  const renderExample = (step: LearningStep) => (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="text-6xl mb-4">{step.emoji}</div>
        <h3 className="mb-4 text-2xl font-bold text-white">{step.title}</h3>
      </div>

      <div className="rounded-xl border border-orange-400/20 bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6">
        <div className="rounded-lg bg-white/[0.04] p-6">
          <h4 className="mb-4 text-xl font-bold text-white">Real Example:</h4>
          <p className="mb-4 text-lg leading-relaxed text-[#e5e5e7]">{step.content}</p>
          <div className="rounded-lg bg-white/[0.04] p-4">
            <p className="text-sm italic text-[#9a9a9d]">💡 Pro tip: This is how it works in real life!</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={() => handleStepComplete(step.points)}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 rounded-xl font-semibold text-lg"
        >
          Cool! I understand 💡
        </Button>
      </div>
    </motion.div>
  );

  const renderMiniGame = (step: LearningStep) => (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="text-6xl mb-4">{step.emoji}</div>
        <h3 className="mb-4 text-2xl font-bold text-white">{step.title}</h3>
        <p className="mb-6 text-lg text-[#d7d7db]">{step.content}</p>
      </div>

      <div className="rounded-xl border border-indigo-400/20 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 p-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🎮</div>
          <p className="mb-6 text-lg text-[#e5e5e7]">Quick game to test your understanding!</p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {step.interactiveData?.options?.map((option: any, index: number) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(step.id, option)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userAnswers[step.id]?.id === option.id
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-indigo-400/50 hover:bg-white/[0.06]'
                }`}
              >
                <div className="text-2xl mb-2">{option.emoji}</div>
                <div className="font-semibold text-white">{option.text}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={() => handleStepComplete(step.points)}
          disabled={!userAnswers[step.id]}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold text-lg disabled:opacity-50"
        >
          Fun! Let's keep going 🎉
        </Button>
      </div>
    </motion.div>
  );

  const renderStep = (step: LearningStep) => {
    switch (step.type) {
      case 'explanation':
        return renderExplanation(step);
      case 'interactive':
        return renderInteractive(step);
      case 'example':
        return renderExample(step);
      case 'mini-game':
        return renderMiniGame(step);
      default:
        return renderExplanation(step);
    }
  };

  if (showCelebration) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 0.6 }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        <h2 className="mb-4 text-4xl font-bold text-white">Amazing Work!</h2>
        <p className="mb-6 text-xl text-[#d7d7db]">
          You've earned <span className="font-bold text-valuto-green-600">{totalPoints}</span> points!
        </p>
        <p className="text-lg text-[#9a9a9d]">Ready for the quiz? Let's test your knowledge! 🧠</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="h-3 rounded-full bg-white/10">
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Step Counter */}
      <div className="text-center">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold">
          Step {currentStepIndex + 1} of {steps.length}
        </span>
      </div>

      {/* Current Step */}
      <Card className="p-8">
        <AnimatePresence mode="wait">
          {renderStep(currentStep)}
        </AnimatePresence>
      </Card>

      {/* Points Display */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 font-semibold text-yellow-300 border border-yellow-400/30">
          <span>⭐</span>
          <span>Total Points: {totalPoints}</span>
        </div>
      </div>
    </div>
  );
}
