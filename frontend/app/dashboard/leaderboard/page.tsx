"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { leaderboardApi } from '@/lib/api';

export default function LeaderboardPage() {
  const { getToken } = useAuth();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = await getToken();
        if (!token) {
          setError('Authentication required');
          return;
        }

        const response = await leaderboardApi.getGlobal(token, 10);
        if (response.success && response.data) {
          setLeaderboard(response.data);
        } else {
          setError(response.error || 'Failed to load leaderboard');
        }
      } catch (err: any) {
        console.error('Failed to fetch leaderboard:', err);
        setError(err.message || 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [getToken]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valuto-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Leaderboard 👑
        </h1>
        <p className="text-lg text-gray-600">
          See how you rank against other students
        </p>
      </div>

      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {leaderboard.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Rankings Yet</h3>
          <p className="text-gray-600 mb-6">
            Be the first to play games and earn points!
          </p>
          <a
            href="/dashboard/trivia"
            className="inline-block bg-valuto-green-600 hover:bg-valuto-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Play Trivia Games
          </a>
        </div>
      ) : (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <div className="space-y-4">
            {leaderboard.map((user: any, index: number) => (
              <div
                key={user.userId || index}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:scale-102 ${
                  index < 3 
                    ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-200' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {/* Rank */}
                <div className={`text-2xl font-bold w-8 ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  index === 2 ? 'text-amber-600' :
                  'text-gray-400'
                }`}>
                  {user.rank}
                </div>

                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-amber-600' :
                  'bg-valuto-green-600'
                }`}>
                  {user.name?.charAt(0)?.toUpperCase() || '?'}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{user.name || 'Anonymous'}</p>
                  {user.school && (
                    <p className="text-sm text-gray-600">{user.school}</p>
                  )}
                </div>

                {/* Points */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-valuto-green-600">
                    {user.totalPoints?.toLocaleString() || 0}
                  </p>
                  <p className="text-xs text-gray-500">points</p>
                </div>

                {/* Trophy for top 3 */}
                {index < 3 && (
                  <div className="text-2xl">
                    {index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}
                  </div>
                )}
              </div>
            ))}
          </div>

          {leaderboard.length >= 10 && (
            <div className="mt-6 text-center text-sm text-gray-500">
              Showing top 10 players
            </div>
          )}
        </div>
      )}
    </div>
  );
}
