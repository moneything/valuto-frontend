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
  const [playerName, setPlayerName] = useState<string>('');

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

    // Get player name from localStorage or use socket user
    const storedName = localStorage.getItem('playerName') || 'Player';
    setPlayerName(storedName);

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
    const myEntry = leaderboard.find((p: any) => p.socketId === socket?.id || p.userId === socket?.id);
    const myRank = myEntry?.rank || 0;
    const topThree = leaderboard.slice(0, 3);
    
    return (
      <div className="min-h-screen animate-gradient flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl w-full text-center relative z-10">
          {/* Your Result */}
          <div className="mb-8">
            <div className="text-6xl md:text-8xl mb-4 animate-bounce">
              {myRank === 1 ? '🏆' : myRank === 2 ? '🥈' : myRank === 3 ? '🥉' : '⭐'}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {myRank === 1 ? '🎉 Champion!' : myRank === 2 ? 'Great Job!' : myRank === 3 ? 'Well Done!' : 'Game Complete!'}
            </h1>
            <div className="inline-block bg-gradient-to-r from-valuto-green-500 to-valuto-green-600 text-white px-8 py-4 rounded-2xl shadow-xl">
              <div className="text-5xl font-bold mb-1">{myScore}</div>
              <p className="text-sm opacity-90">points</p>
            </div>
            {myRank > 0 && (
              <div className="mt-4 text-2xl font-bold text-gray-700">
                You finished <span className="text-valuto-green-600">#{myRank}</span> out of {leaderboard.length} players
              </div>
            )}
          </div>

          {/* Podium - Top 3 */}
          {topThree.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
                🏆 Top Champions
              </h2>
              <div className="flex justify-center items-end gap-4 mb-6">
                {/* 2nd Place */}
                {topThree[1] && (
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-xl p-4 w-32 text-center shadow-xl">
                      <div className="text-4xl mb-2">🥈</div>
                      <div className="font-bold text-white text-sm truncate">{topThree[1].name}</div>
                      <div className="text-2xl font-bold text-white mt-1">{topThree[1].score}</div>
                    </div>
                    <div className="bg-gray-400 h-24 w-32 flex items-center justify-center rounded-b-lg">
                      <span className="text-white text-3xl font-bold">2</span>
                    </div>
                  </div>
                )}
                
                {/* 1st Place */}
                {topThree[0] && (
                  <div className="flex flex-col items-center -mt-8">
                    <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-t-xl p-6 w-36 text-center shadow-2xl border-4 border-yellow-400">
                      <div className="text-5xl mb-2">👑</div>
                      <div className="font-bold text-gray-800 text-base truncate">{topThree[0].name}</div>
                      <div className="text-3xl font-bold text-gray-800 mt-2">{topThree[0].score}</div>
                    </div>
                    <div className="bg-yellow-500 h-32 w-36 flex items-center justify-center rounded-b-lg shadow-xl">
                      <span className="text-white text-4xl font-bold">1</span>
                    </div>
                  </div>
                )}
                
                {/* 3rd Place */}
                {topThree[2] && (
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-orange-300 to-orange-500 rounded-t-xl p-4 w-32 text-center shadow-xl">
                      <div className="text-4xl mb-2">🥉</div>
                      <div className="font-bold text-white text-sm truncate">{topThree[2].name}</div>
                      <div className="text-2xl font-bold text-white mt-1">{topThree[2].score}</div>
                    </div>
                    <div className="bg-orange-500 h-20 w-32 flex items-center justify-center rounded-b-lg">
                      <span className="text-white text-3xl font-bold">3</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Full Leaderboard */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 max-h-80 overflow-y-auto">
            <h3 className="font-bold text-xl mb-4 text-gray-800 sticky top-0 bg-gray-50 pb-2">
              Final Standings
            </h3>
            <div className="space-y-2">
              {leaderboard.map((player: any, idx: number) => {
                const isMe = player.socketId === socket?.id || player.userId === socket?.id;
                const medals = ['🥇', '🥈', '🥉'];
                
                return (
                  <div
                    key={player.userId || idx}
                    className={`flex justify-between items-center p-4 rounded-lg transition-all ${
                      isMe 
                        ? 'bg-gradient-to-r from-valuto-green-100 to-valuto-green-50 border-2 border-valuto-green-500 shadow-lg scale-105' 
                        : idx < 3 
                          ? 'bg-yellow-50 border border-yellow-200' 
                          : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-3xl font-bold ${isMe ? 'text-valuto-green-600' : 'text-gray-400'} w-10 text-center`}>
                        {idx < 3 ? medals[idx] : `#${player.rank}`}
                      </span>
                      <div className="text-left">
                        <div className={`font-bold text-lg ${isMe ? 'text-valuto-green-700' : 'text-gray-800'}`}>
                          {player.name} {isMe && '(You)'}
                        </div>
                        {player.correctAnswers !== undefined && (
                          <div className="text-sm text-gray-500">
                            {player.correctAnswers} correct answers
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`font-bold text-2xl ${
                      isMe ? 'text-valuto-green-600' : idx < 3 ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {player.score}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push('/dashboard/trivia')}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 bg-valuto-green-600 hover:bg-valuto-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Back to Dashboard
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
              <div className="space-y-6">
                {/* Show all options with correct answer highlighted */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option: string, index: number) => {
                    const isCorrect = index === result?.correctIndex;
                    const wasSelected = index === selectedAnswer;
                    
                    let bgColor = 'bg-gray-200';
                    let borderColor = 'border-gray-300';
                    let icon = '';
                    
                    if (isCorrect) {
                      bgColor = 'bg-green-500';
                      borderColor = 'border-green-600';
                      icon = '✓';
                    } else if (wasSelected && !isCorrect) {
                      bgColor = 'bg-red-500';
                      borderColor = 'border-red-600';
                      icon = '✗';
                    }
                    
                    return (
                      <div
                        key={index}
                        className={`${bgColor} ${borderColor} border-4 p-6 md:p-8 rounded-xl font-bold text-lg md:text-2xl shadow-xl ${
                          isCorrect ? 'text-white' : wasSelected ? 'text-white' : 'text-gray-700'
                        } ${isCorrect || wasSelected ? 'scale-105' : ''} transition-all relative`}
                      >
                        {icon && (
                          <div className="absolute top-2 right-2 text-3xl">
                            {icon}
                          </div>
                        )}
                        {option}
                      </div>
                    );
                  })}
                </div>

                {/* Result Feedback */}
                <div className={`p-6 rounded-2xl text-center ${
                  result?.isCorrect ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'
                } text-white shadow-2xl`}>
                  <div className="text-5xl mb-3">
                    {result?.isCorrect ? '🎉 Awesome!' : '😔 Not quite'}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {result?.isCorrect ? 'You got it right!' : `Correct answer: ${currentQuestion.options[result?.correctIndex]}`}
                  </h3>
                  <p className="text-xl font-bold">
                    +{result?.pointsEarned || 0} points
                  </p>
                  {result?.explanation && (
                    <p className="mt-3 text-sm opacity-90 bg-white/20 rounded-lg p-3">
                      💡 {result.explanation}
                    </p>
                  )}
                </div>

                {/* Leaderboard */}
                {leaderboard.length > 0 && (
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-valuto-green-200">
                    <h3 className="font-bold text-xl mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
                      🏆 Current Standings
                    </h3>
                    <div className="space-y-2">
                      {leaderboard.slice(0, 5).map((player: any, idx: number) => {
                        const isMe = player.socketId === socket?.id || player.userId === socket?.id;
                        const medals = ['🥇', '🥈', '🥉'];
                        
                        return (
                          <div
                            key={player.userId}
                            className={`flex justify-between items-center p-3 rounded-lg ${
                              isMe ? 'bg-valuto-green-100 border-2 border-valuto-green-500' : 'bg-gray-50'
                            } transition-all`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl w-8">
                                {idx < 3 ? medals[idx] : `#${player.rank}`}
                              </span>
                              <span className={`font-semibold ${isMe ? 'text-valuto-green-700' : 'text-gray-700'}`}>
                                {player.name} {isMe && '(You)'}
                              </span>
                            </div>
                            <span className={`font-bold text-lg ${
                              isMe ? 'text-valuto-green-600' : 'text-gray-600'
                            }`}>
                              {player.score} pts
                            </span>
                          </div>
                        );
                      })}
                    </div>
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
