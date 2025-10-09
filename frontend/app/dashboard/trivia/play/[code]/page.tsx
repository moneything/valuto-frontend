"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockTriviaGames } from '@/lib/mockData';
import GameSidebar from '@/components/GameSidebar';

export default function PlayTriviaPage({ params }: { params: Promise<{ code: string }> | { code: string } }) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ code: string } | null>(null);

  useEffect(() => {
    if (params && typeof params === 'object' && 'then' in params) {
      // params is a Promise
      (params as Promise<{ code: string }>).then(setResolvedParams);
    } else {
      // params is already resolved
      setResolvedParams(params as { code: string });
    }
  }, [params]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  if (!resolvedParams) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-gradient relative overflow-hidden">
        {/* Decorative elements - matching landing page */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valuto-green-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900">Loading game...</h2>
        </div>
      </div>
    );
  }

  // Find game by code
  const game = mockTriviaGames.find(g => g.code === resolvedParams.code.toUpperCase());

  useEffect(() => {
    if (!game) return;
    
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(selectedAnswer);
    }
  }, [timeLeft, showResult]);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-gradient relative overflow-hidden">
        {/* Decorative elements - matching landing page */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        
        <div className="text-center relative z-10">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Game Not Found</h2>
          <p className="text-gray-600 mb-6">The game code "{resolvedParams.code}" doesn't exist</p>
          <button
            onClick={() => router.push('/dashboard/trivia')}
            className="bg-valuto-green-600 hover:bg-valuto-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Trivia Hub
          </button>
        </div>
      </div>
    );
  }

  if (game.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-gradient relative overflow-hidden">
        {/* Decorative elements - matching landing page */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        
        <div className="text-center relative z-10">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Questions Yet</h2>
          <p className="text-gray-600 mb-6">This game doesn't have any questions yet</p>
          <button
            onClick={() => router.push('/dashboard/trivia')}
            className="bg-valuto-green-600 hover:bg-valuto-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Trivia Hub
          </button>
        </div>
      </div>
    );
  }

  const question = game.questions[currentQuestion];
  const isLastQuestion = currentQuestion === game.questions.length - 1;

  const handleAnswer = (answerIndex: number | null) => {
    const isCorrect = answerIndex === question.correctAnswer;
    if (isCorrect && answerIndex !== null) {
      setScore(score + question.points);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      setGameEnded(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(game.questions[currentQuestion + 1].timeLimit);
    }
  };

  const answerColors = [
    { bg: 'from-red-500 to-red-600', hover: 'hover:from-red-600 hover:to-red-700', text: 'text-white' },
    { bg: 'from-blue-500 to-blue-600', hover: 'hover:from-blue-600 hover:to-blue-700', text: 'text-white' },
    { bg: 'from-yellow-500 to-yellow-600', hover: 'hover:from-yellow-600 hover:to-yellow-700', text: 'text-white' },
    { bg: 'from-green-500 to-green-600', hover: 'hover:from-green-600 hover:to-green-700', text: 'text-white' },
  ];

  // Game Ended Screen
  if (gameEnded) {
    const maxPossibleScore = game.questions.reduce((acc, q) => acc + q.points, 0);
    const percentage = (score / maxPossibleScore) * 100;

    return (
      <div className="min-h-screen animate-gradient flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative elements - matching landing page */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center relative z-10">
          <div className="text-6xl md:text-8xl mb-6">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : percentage >= 40 ? '👍' : '📚'}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {percentage >= 80 ? 'Amazing!' : percentage >= 60 ? 'Great Job!' : percentage >= 40 ? 'Good Effort!' : 'Keep Learning!'}
          </h1>
          <div className="mb-8">
            <div className="text-6xl font-bold text-valuto-green-600 mb-2">{score}</div>
            <p className="text-gray-600">out of {maxPossibleScore} points</p>
            <div className="text-2xl font-semibold text-gray-700 mt-2">{percentage.toFixed(0)}%</div>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">Questions</p>
                <p className="text-2xl font-bold text-gray-900">{game.questions.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">{percentage.toFixed(0)}%</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push('/dashboard/trivia')}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Games
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 bg-valuto-green-600 hover:bg-valuto-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-gradient relative overflow-hidden">
      {/* Decorative elements - matching landing page */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
      
      {/* Game Sidebar */}
      <GameSidebar />

      {/* Main Game Area */}
      <div className="pl-0 md:pl-64 relative z-10">
        {/* Progress Bar */}
        <div className="bg-white/80 backdrop-blur-md border-b border-valuto-green-200/30 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-valuto-green-800 text-sm font-semibold bg-valuto-green-50 px-3 py-1 rounded-full">
                Question {currentQuestion + 1} of {game.questions.length}
              </span>
              <span className="text-valuto-green-800 text-sm font-semibold bg-valuto-green-50 px-3 py-1 rounded-full">Score: {score}</span>
            </div>
            <div className="w-full bg-valuto-green-100 rounded-full h-3 border border-valuto-green-200">
              <div
                className="bg-gradient-to-r from-valuto-green-500 to-valuto-green-600 h-3 rounded-full transition-all shadow-sm"
                style={{ width: `${((currentQuestion + 1) / game.questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Timer */}
          <div className="mb-8 text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
              timeLeft <= 5 ? 'bg-red-500 animate-pulse' : 'bg-valuto-green-500'
            } text-white text-3xl font-bold shadow-xl`}>
              {timeLeft}
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-8 text-center shadow-lg border border-valuto-green-200/50 green-card-hover">
            <h2 className="text-2xl md:text-4xl font-bold text-valuto-green-800 leading-tight">
              {question.question}
            </h2>
          </div>

          {/* Answer Options */}
          {!showResult ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedAnswer(index);
                    handleAnswer(index);
                  }}
                  disabled={showResult}
                  className={`group bg-gradient-to-r ${answerColors[index].bg} ${answerColors[index].hover} ${answerColors[index].text} p-6 md:p-8 rounded-xl font-bold text-lg md:text-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-transparent hover:border-valuto-green-300`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex-1 text-left">{option}</span>
                    <span className="text-3xl ml-4">
                      {index === 0 ? '🔺' : index === 1 ? '🔷' : index === 2 ? '🟡' : '✅'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Result Feedback */}
              <div className={`p-8 rounded-2xl text-center ${
                selectedAnswer === question.correctAnswer
                  ? 'bg-green-500'
                  : 'bg-red-500'
              } text-white`}>
                <div className="text-6xl mb-4">
                  {selectedAnswer === question.correctAnswer ? '✅' : '❌'}
                </div>
                <h3 className="text-3xl font-bold mb-2">
                  {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                </h3>
                {selectedAnswer !== question.correctAnswer && (
                  <p className="text-xl opacity-90">
                    Correct answer: {question.options[question.correctAnswer]}
                  </p>
                )}
                <p className="text-lg mt-4">
                  +{selectedAnswer === question.correctAnswer ? question.points : 0} points
                </p>
              </div>

              {/* Next Button */}
              <button
                onClick={nextQuestion}
                className="w-full bg-white hover:bg-gray-100 text-gray-900 py-4 px-8 rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
              >
                {isLastQuestion ? 'See Results' : 'Next Question'} →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


