// frontend/app/dashboard/trivia/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useUserProfile } from '@/lib/userContext';
import { triviaApi } from '@/lib/api';
import Link from 'next/link';
import PageLayout from '@/components/theme/PageLayout';
import Card from '@/components/theme/Card';
import Button from '@/components/theme/Button';
import { GameControllerIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';

export default function TriviaHubPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { isTeacher, isStudent } = useUserProfile();
  const [joinCode, setJoinCode] = useState('');
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch trivia sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = await getToken({ template: "default" }); 
        if (!token) return;

        const response = await triviaApi.getSessions(token);
        if (response.success && response.data) {
          setSessions(response.data);
        } else {
          setError(response.error || 'Failed to load games');
        }
      } catch (err: any) {
        console.error('Failed to fetch sessions:', err);
        setError(err.message || 'Failed to load games');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [getToken]);

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCode.trim()) {
      router.push(`/dashboard/trivia/play/${joinCode.toUpperCase()}`);
    }
  };

  return (
    <PageLayout
      title="Trivia Games"
      subtitle={isTeacher 
        ? 'Create and manage engaging financial literacy games for your students' 
        : 'Join live games and test your financial knowledge'
      }
      icon={<GameControllerIcon className="w-16 h-16 text-valuto-green-600" />}
    >
      {/* Student: Join Game Section */}
      {isStudent && (
        <Card className="mb-12 bg-gradient-to-r from-valuto-green-600 to-valuto-green-700 text-white border-0">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Join a Game</h2>
            <p className="mb-8 text-xl opacity-90">Enter the game code from your teacher to join</p>
            <form onSubmit={handleJoinGame} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Enter game code (e.g., ABC123)"
                className="flex-1 px-6 py-4 h-14 rounded-xl text-gray-900 font-semibold text-center text-xl tracking-wider uppercase focus:outline-none focus:ring-4 focus:ring-white/30"
                maxLength={6}
              />
              <Button
                type="submit"
                className="px-8 py-4 text-lg font-bold"
                variant='primary'
              >
                Join Game
              </Button>
            </form>
          </div>
        </Card>
      )}

      {/* Teacher: Create Game Button */}
      {isTeacher && (
        <div className="mb-12 text-center">
          <Link href="/dashboard/trivia/create">
            <Button size="lg" className="bg-gradient-to-r from-valuto-green-600 to-valuto-green-700 hover:from-valuto-green-700 hover:to-valuto-green-800 text-white px-8 py-4 text-lg font-bold">
              ✨ Create New Game
            </Button>
          </Link>
        </div>
      )}

      {/* Available Games */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {isTeacher ? 'Your Games' : 'Available Games'}
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-sm text-yellow-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valuto-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading games...</p>
          </div>
        ) : sessions.length === 0 ? (
          /* Empty State */
          <Card className="text-center py-16">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {isTeacher ? 'No Games Yet' : 'No Active Games'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isTeacher 
                ? 'Create your first trivia game to get started!'
                : 'Ask your teacher to create a game, or use the join code to enter an active game.'
              }
            </p>
            {isTeacher && (
              <Link href="/dashboard/trivia/create">
                <Button className="bg-valuto-green-600 hover:bg-valuto-green-700 text-white">
                  Create Your First Game
                </Button>
              </Link>
            )}
          </Card>
        ) : (
          /* Games Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sessions.map((session: any) => (
              <Card key={session.sessionId} className="h-full flex flex-col">
                {/* Game Header */}
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 flex-1">
                      {session.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      session.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : session.status === 'waiting'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {session.status === 'active' ? '🔴 Live' : 
                       session.status === 'waiting' ? '⏳ Waiting' : 
                       '✅ Ended'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Created by {session.hostName}
                  </p>
                </div>

                {/* Game Code */}
                <div className="bg-valuto-green-50 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-600 mb-1">Game Code</p>
                  <p className="text-3xl font-mono font-bold text-valuto-green-600 tracking-wider">
                    {session.joinCode}
                  </p>
                </div>

                {/* Game Stats */}
                <div className="flex gap-4 text-center mb-6 flex-1">
                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-gray-900">
                      {session.playerCount || 0}
                    </p>
                    <p className="text-xs text-gray-600">Players</p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-gray-900">
                      {session.questionCount || 0}
                    </p>
                    <p className="text-xs text-gray-600">Questions</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto">
                  {isTeacher ? (
                    <div className="flex gap-2">
                      {session.status === 'waiting' && (
                        <Button
                          onClick={() => router.push(`/dashboard/trivia/host/${session.sessionId}`)}
                          className="flex-1 bg-valuto-green-600 hover:bg-valuto-green-700 text-white"
                        >
                          Start Game
                        </Button>
                      )}
                      {session.status === 'ended' && (
                        <div className="flex gap-2 w-full">
                          <Button
                            onClick={() => router.push(`/dashboard/trivia/session/${session.sessionId}/results`)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                          >
                            View Results
                          </Button>
                          <Button
                            onClick={async () => {
                              try {
                                console.log("🟢 Restart button clicked:", session.sessionId); // <-- add this

                                const token = await getToken({ template: "default" });
                                if (!token) return;
                                console.log("token:", token);
                                const res = await triviaApi.restartSession(token, session.sessionId);
                                console.log("Restart response:", res);
                                if (res.success && res.data) {
                                  router.push(`/dashboard/trivia/host/${res.data.sessionId}`);
                                } else {
                                  console.log("Restart response:", res);
                                }
                              } catch (err) {
                                console.error("Failed to restart:", err);
                              }
                            }}
                            className="flex-1 bg-valuto-green-600 hover:bg-valuto-green-700 text-white"
                          >
                            🔁 Restart
                          </Button>
                        </div>
                      )}
                      {session.status === 'active' && (
                        <Button
                          onClick={() => router.push(`/dashboard/trivia/host/${session.sessionId}`)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          Manage
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button
                      onClick={() => router.push(`/dashboard/trivia/play/${session.joinCode}`)}
                      disabled={session.status === 'ended'}
                      className={`w-full ${
                        session.status === 'ended'
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-valuto-green-600 hover:bg-valuto-green-700 text-white'
                      }`}
                    >
                      {session.status === 'ended' ? 'Game Ended' : 'Join Game'}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      {!loading && sessions.length > 0 && (
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-2">How to Play</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• {isStudent ? 'Click "Join Game" or enter a game code above' : 'Create a game and share the code with students'}</li>
                <li>• {isStudent ? 'Wait for your teacher to start the game' : 'Wait for students to join, then click "Start Game"'}</li>
                <li>• {isStudent ? 'Answer questions as fast as you can for bonus points!' : 'Questions will be broadcast to all players automatically'}</li>
                <li>• Compete on the live leaderboard and track your progress!</li>
              </ul>
            </div>
          </div>
        </Card>
      )}
    </PageLayout>
  );
}
