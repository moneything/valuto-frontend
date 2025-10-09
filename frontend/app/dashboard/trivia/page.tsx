"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/lib/userContext';
import { mockTriviaGames } from '@/lib/mockData';
import Link from 'next/link';
import PageLayout from '@/components/theme/PageLayout';
import Card from '@/components/theme/Card';
import Button from '@/components/theme/Button';
import { GameControllerIcon } from '@/components/icons';

export default function TriviaHubPage() {
  const router = useRouter();
  const { isTeacher, isStudent } = useUserProfile();
  const [joinCode, setJoinCode] = useState('');

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
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Enter game code (e.g., ABC123)"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 font-semibold text-center text-xl tracking-wider uppercase focus:outline-none focus:ring-4 focus:ring-white/30"
                maxLength={6}
              />
              <Button
                type="submit"
                className="bg-white text-valuto-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTriviaGames.map((game) => (
            <Card key={game.id} className="h-full flex flex-col">
              {/* Game Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{game.title}</h3>
                  <p className="text-sm text-gray-500">by {game.createdBy}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  game.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {game.status}
                </span>
              </div>

              {/* Game Stats */}
              <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span>📝</span>
                  <span>{game.questions.length} questions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>👥</span>
                  <span>{game.participants}</span>
                </div>
              </div>

              {/* Game Code */}
              <div className="mb-6 p-4 bg-gray-100 rounded-xl text-center">
                <p className="text-xs text-gray-500 mb-2 font-medium">Game Code</p>
                <p className="text-3xl font-bold text-valuto-green-600 tracking-wider font-numbers">
                  {game.code}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-auto">
                {isStudent && (
                  <Link href={`/dashboard/trivia/play/${game.code}`} className="flex-1">
                    <Button className="w-full">
                      Join Game
                    </Button>
                  </Link>
                )}
                {isTeacher && (
                  <>
                    <Button variant="secondary" className="flex-1">
                      Edit
                    </Button>
                    <Button className="flex-1">
                      Start
                    </Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockTriviaGames.length === 0 && (
          <Card className="text-center py-16">
            <div className="text-6xl mb-6">🎮</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No games available</h3>
            <p className="text-gray-600 mb-8 text-lg">
              {isTeacher 
                ? 'Create your first trivia game to get started!' 
                : 'Check back soon for new games from your teachers'
              }
            </p>
            {isTeacher && (
              <Link href="/dashboard/trivia/create">
                <Button size="lg">
                  Create Game
                </Button>
              </Link>
            )}
          </Card>
        )}
      </div>
    </PageLayout>
  );
}

