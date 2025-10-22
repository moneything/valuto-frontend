"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTrivia } from '@/lib/hooks/useTrivia';
import GameSidebar from '@/components/GameSidebar';

export default function PlayTriviaPage({ params }: { params: Promise<{ code: string }> | { code: string } }) {
  const router = useRouter();
  const { socket, isConnected } = useTrivia();
  const [resolvedParams, setResolvedParams] = useState<{ code: string } | null>(null);
  const [gameState, setGameState] = useState<'loading' | 'joining' | 'waiting' | 'playing' | 'ended' | 'error'>('loading');
  const [sessionData, setSessionData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [myScore, setMyScore] = useState(0);

  // Resolve params
  useEffect(() => {
    if (params && typeof params === 'object' && 'then' in params) {
      (params as Promise<{ code: string }>).then(setResolvedParams);
    } else {
      setResolvedParams(params as { code: string });
    }
  }, [params]);

  // Join session when socket connects
  useEffect(() => {
    if (!socket || !isConnected || !resolvedParams) return;

    console.log('Attempting to join session with code:', resolvedParams.code);
    setGameState('joining');

    // Join session via socket
    socket.emit('join_session', { joinCode: resolvedParams.code }, (response: any) => {
      console.log('Join response:', response);
      
      if (response.success) {
        setSessionData(response.data);
        setGameState('waiting');
        
        // Store sessionId for reconnection
        localStorage.setItem('currentSessionId', response.data.sessionId);
      } else {
        setError(response.error || 'Failed to join game');
        setGameState('error');
      }
    });

    // Listen for game events
    socket.on('waiting_lobby', (data: any) => {
      console.log('Waiting lobby:', data);
      setSessionData(data);
      setGameState('waiting');
    });

    socket.on('game_started', () => {
      console.log('Game starting!');
      setGameState('playing');
    });

    socket.on('new_question', (data: any) => {
      console.log('New question:', data);
      setCurrentQuestion(data.question);
      setTimeLeft(data.question.timeLimit);
      setSelectedAnswer(null);
      setShowResult(false);
      
      // Start client timer
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = data.question.timeLimit - elapsed;
        setTimeLeft(Math.max(0, remaining));
        
        if (remaining <= 0) {
          clearInterval(interval);
        }
      }, 100);
    });

    socket.on('answer_result', (data: any) => {
      console.log('Answer result:', data);
      setResult(data);
      setShowResult(true);
      
      if (data.isCorrect) {
        setMyScore(prev => prev + data.pointsEarned);
      }
    });

    socket.on('leaderboard_update', (data: any) => {
      console.log('Leaderboard update:', data);
      setLeaderboard(data.leaderboard);
    });

    socket.on('game_over', (data: any) => {
      console.log('Game over:', data);
      setGameState('ended');
      setLeaderboard(data.leaderboard);
    });

    return () => {
      socket.off('waiting_lobby');
      socket.off('game_started');
      socket.off('new_question');
      socket.off('answer_result');
      socket.off('leaderboard_update');
      socket.off('game_over');
    };
  }, [socket, isConnected, resolvedParams]);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null || !socket || !currentQuestion) return;
    
    setSelectedAnswer(index);
    
    const timeSpent = (currentQuestion.timeLimit - timeLeft) * 1000;
    const sessionId = localStorage.getItem('currentSessionId');
    
    socket.emit('submit_answer', {
      sessionId,
      questionId: currentQuestion.id,
      selectedIndex: index,
      timeSpentMs: timeSpent,
    }, (response: any) => {
      if (!response.success) {
        console.error('Answer not accepted:', response.error);
      }
    });
  };

  const answerColors = [
    { bg: 'from-red-500 to-red-600', hover: 'hover:from-red-600 hover:to-red-700', text: 'text-white' },
    { bg: 'from-blue-500 to-blue-600', hover: 'hover:from-blue-600 hover:to-blue-700', text: 'text-white' },
    { bg: 'from-yellow-500 to-yellow-600', hover: 'hover:from-yellow-600 hover:to-yellow-700', text: 'text-white' },
    { bg: 'from-green-500 to-green-600', hover: 'hover:from-green-600 hover:to-green-700', text: 'text-white' },
  ];

  // Loading state
  if (!resolvedParams || gameState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center animate-gradient relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valuto-green-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900">
            {!isConnected ? 'Connecting to server...' : 'Loading game...'}
          </h2>
        </div>
      </div>
    );
  }

  // Error state
  if (gameState === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center animate-gradient relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        
        <div className="text-center relative z-10">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Join Game</h2>
          <p className="text-gray-600 mb-2">{error || `Game code "${resolvedParams.code}" not found`}</p>
          <p className="text-sm text-gray-500 mb-6">
            {!isConnected && 'Backend server not connected. Make sure it\'s running on http://localhost:5000'}
          </p>
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

  // Waiting lobby
  if (gameState === 'waiting') {
    return (
      <div className="min-h-screen animate-gradient relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
            <div className="text-6xl mb-6 animate-bounce">⏳</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {sessionData?.title || 'Waiting for Host...'}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Host: {sessionData?.hostName}
            </p>
            <p className="text-lg text-gray-500 mb-8">
              {sessionData?.playerCount || 0} players joined • {sessionData?.questionCount || 0} questions
            </p>
            <div className="bg-valuto-green-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Waiting for {sessionData?.hostName} to start the game...</p>
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-2 h-2 bg-valuto-green-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-valuto-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-valuto-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
            <button
              onClick={() => router.push('/dashboard/trivia')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Leave Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game ended
  if (gameState === 'ended') {
    const myRank = leaderboard.find((p: any) => p.userId === socket?.id);
    
    return (
      <div className="min-h-screen animate-gradient flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center relative z-10">
          <div className="text-6xl md:text-8xl mb-6">
            {myRank?.rank === 1 ? '🏆' : myRank?.rank === 2 ? '🥈' : myRank?.rank === 3 ? '🥉' : '⭐'}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Game Over!
          </h1>
          <div className="mb-8">
            <div className="text-6xl font-bold text-valuto-green-600 mb-2">{myScore}</div>
            <p className="text-gray-600">points</p>
            {myRank && <div className="text-2xl font-semibold text-gray-700 mt-2">Rank: #{myRank.rank}</div>}
          </div>

          <div className="bg-gray-100 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Final Leaderboard</h3>
            {leaderboard.slice(0, 5).map((player: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-3 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{player.rank}.</span>
                  <span>{player.name}</span>
                </div>
                <span className="font-bold text-valuto-green-600">{player.score} pts</span>
              </div>
            ))}
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

  // Playing state
  return (
    <div className="min-h-screen animate-gradient relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
      
      <GameSidebar />

      <div className="pl-0 md:pl-64 relative z-10">
        {currentQuestion && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Timer */}
            <div className="mb-8 text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                timeLeft <= 5 ? 'bg-red-500 animate-pulse' : 'bg-valuto-green-500'
              } text-white text-3xl font-bold shadow-xl`}>
                {timeLeft}s
              </div>
            </div>

            {/* Question */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-8 text-center shadow-lg border border-valuto-green-200/50">
              <h2 className="text-2xl md:text-4xl font-bold text-valuto-green-800 leading-tight">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Answer Options */}
            {!showResult ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`bg-gradient-to-r ${answerColors[index].bg} ${answerColors[index].hover} ${answerColors[index].text} p-6 md:p-8 rounded-xl font-bold text-lg md:text-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-8 rounded-2xl text-center ${
                  result?.isCorrect ? 'bg-green-500' : 'bg-red-500'
                } text-white`}>
                  <div className="text-6xl mb-4">
                    {result?.isCorrect ? '✅' : '❌'}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">
                    {result?.isCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                  <p className="text-lg">
                    +{result?.pointsEarned || 0} points
                  </p>
                </div>

                {/* Mini Leaderboard */}
                {leaderboard.length > 0 && (
                  <div className="bg-white/90 p-6 rounded-xl">
                    <h3 className="font-bold mb-4">Current Rankings</h3>
                    {leaderboard.slice(0, 3).map((player: any) => (
                      <div key={player.userId} className="flex justify-between text-sm mb-2">
                        <span>#{player.rank} {player.name}</span>
                        <span className="font-bold">{player.score} pts</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
