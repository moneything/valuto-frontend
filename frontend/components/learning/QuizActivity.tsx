"use client";

import { useState, useEffect } from 'react';
import Card from '@/components/theme/Card';
import Button from '@/components/theme/Button';
import { CheckCircleIcon, XCircleIcon } from '@/components/icons';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

interface QuizActivityProps {
  questions: QuizQuestion[];
  onComplete: (results: any[]) => void;
  onProgress?: (currentQuestion: number, totalQuestions: number) => void;
}

export default function QuizActivity({ questions, onComplete, onProgress }: QuizActivityProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [results, setResults] = useState<any[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) return;

    const answerTime = Math.floor((Date.now() - questionStartTime) / 1000);
    const isCorrect = selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer;
    const pointsEarned = isCorrect ? currentQuestion.points : 0;

    const result = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedAnswers[currentQuestionIndex],
      isCorrect,
      pointsEarned,
      timeSpent: answerTime,
      timestamp: new Date().toISOString()
    };

    const newResults = [...results, result];
    setResults(newResults);
    setShowResult(true);

    if (onProgress) {
      onProgress(currentQuestionIndex + 1, questions.length);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Include the current question's result in the completion data
      const finalResults = [...results];
      if (results.length === currentQuestionIndex) {
        // If we haven't added the current question result yet, add it
        const answerTime = Math.floor((Date.now() - questionStartTime) / 1000);
        const isCorrect = selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer;
        const pointsEarned = isCorrect ? currentQuestion.points : 0;

        finalResults.push({
          questionId: currentQuestion.id,
          selectedAnswer: selectedAnswers[currentQuestionIndex],
          isCorrect,
          pointsEarned,
          timeSpent: answerTime,
          timestamp: new Date().toISOString()
        });
      }
      onComplete(finalResults);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowResult(false);
    }
  };

  const getAnswerButtonClass = (index: number) => {
    if (!showResult) {
      return selectedAnswers[currentQuestionIndex] === index
        ? 'border-valuto-green-600 bg-valuto-green-50 text-valuto-green-900'
        : 'border-gray-200 hover:border-valuto-green-300 hover:bg-valuto-green-50';
    }

    const isCorrect = index === currentQuestion.correctAnswer;
    const wasSelected = index === selectedAnswers[currentQuestionIndex];

    if (isCorrect) {
      return 'border-green-500 bg-green-50 text-green-900';
    } else if (wasSelected && !isCorrect) {
      return 'border-red-500 bg-red-50 text-red-900';
    } else {
      return 'border-gray-200 bg-gray-50 text-gray-500';
    }
  };

  const getAnswerIcon = (index: number) => {
    if (!showResult) return null;

    const isCorrect = index === currentQuestion.correctAnswer;
    const wasSelected = index === selectedAnswers[currentQuestionIndex];

    if (isCorrect) {
      return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
    } else if (wasSelected && !isCorrect) {
      return <XCircleIcon className="w-5 h-5 text-red-600" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2">
        <div 
          className="bg-valuto-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Counter */}
      <div className="text-center text-sm text-gray-600">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>

      {/* Question */}
      <Card className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {currentQuestion.question}
        </h3>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${getAnswerButtonClass(index)}`}
            >
              <div className="flex-shrink-0">
                {getAnswerIcon(index)}
              </div>
              <span className="font-medium">{option}</span>
            </button>
          ))}
        </div>

        {/* Submit/Next Button */}
        {!showResult ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswers[currentQuestionIndex] === undefined}
            className="w-full"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="space-y-4">
            {/* Result Feedback */}
            <div className={`p-4 rounded-lg ${
              results[results.length - 1]?.isCorrect 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {results[results.length - 1]?.isCorrect ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircleIcon className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-semibold ${
                  results[results.length - 1]?.isCorrect ? 'text-green-900' : 'text-red-900'
                }`}>
                  {results[results.length - 1]?.isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {currentQuestion.explanation}
              </p>
              <p className="text-sm font-medium mt-2">
                +{results[results.length - 1]?.pointsEarned || 0} points
              </p>
            </div>

            <Button onClick={handleNextQuestion} className="w-full">
              {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
            </Button>
          </div>
        )}
      </Card>

      {/* Timer */}
      <div className="text-center text-sm text-gray-500">
        Time spent: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
}
