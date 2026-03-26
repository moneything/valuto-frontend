"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { leaderboardApi } from '@/lib/api';
import { useUser } from '@/lib/userContext';
import { formatDisplayName } from '@/lib/utils';

export default function LeaderboardPage() {
  const { getToken } = useAuth();
  const { isTeacher, isStudent, isLoadingProfile } = useUser();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoadingProfile) return;

    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError('');
        const token = await getToken({ template: "default" });

        if (!token) {
          setError('Authentication required');
          return;
        }

        if (isTeacher) {
          const enriched = await leaderboardApi.getEnrichedLeaderboard(token);
          setLeaderboard(enriched || []);
        } else {
          const response = await leaderboardApi.getGlobal(token, 10);
          if (response.success && response.data?.leaderboard) {
            setLeaderboard(response.data.leaderboard);
          } else {
            setError(response.error || 'Failed to load leaderboard');
          }
        }
      } catch (err: any) {
        console.error('Failed to fetch leaderboard:', err);
        setError(err.message || 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [getToken, isTeacher, isLoadingProfile]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valuto-green-600 mx-auto mb-4"></div>
            <p className="text-[#9a9a9d]">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          {isTeacher ? 'Class Leaderboard 👑' : 'Leaderboard 👑'}
        </h1>
        <p className="text-lg text-[#9a9a9d]">
          {isTeacher
            ? 'Track your students’ standings, activity, and progress'
            : 'See how you rank against other students'}
        </p>
      </div>

      {error && (
        <div className="mb-6 border-l-4 border-yellow-400 bg-yellow-500/10 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {leaderboard.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#232324]/95 p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="mb-2 text-xl font-bold text-white">
            {isTeacher ? 'No student activity yet' : 'No Rankings Yet'}
          </h3>
          <p className="mb-6 text-[#9a9a9d]">
            {isTeacher
              ? 'Invite your students to play trivia to populate the leaderboard.'
              : 'Be the first to play games and earn points!'}
          </p>
          <a
            href="/dashboard/trivia"
            className="inline-block rounded-lg border border-valuto-green-500/20 bg-valuto-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-valuto-green-700"
          >
            {isTeacher ? 'Create a Trivia Game' : 'Play Trivia Games'}
          </a>
        </div>
      ) : isTeacher ? (
        <div className="rounded-xl border border-white/10 bg-[#232324]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
          <div className="mb-3 grid grid-cols-10 px-2 text-sm font-semibold text-[#9a9a9d]">
            <div className="col-span-1 text-center">Place</div>
            <div className="col-span-4">Student</div>
            <div className="col-span-2 text-right">Games</div>
            <div className="col-span-2 text-right">Lessons</div>
            <div className="col-span-1 text-right">Points</div>
          </div>
          <div className="divide-y divide-white/10">
            {leaderboard.map((student: any, index: number) => (
              <div key={`${student.rank}-${student.name}-${index}`} className="grid grid-cols-10 items-center py-3 px-2">
                {/* Trophy for top 3 */}
                {index < 1 ? (
                  <div className="text-3xl text-center">
                    {index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}
                  </div>
                ) : (
                  <div 
                    className="col-span-1 w-fit items-center justify-self-center rounded-full bg-white/10 pl-2 pr-2 text-3xl font-bold text-white">
                    {student.rank}
                  </div>
                )}
                <div className="col-span-4">
                  <p className="font-semibold text-white">{student.name}</p>
                </div>
                <div className="col-span-2 text-right text-[#d7d7db]">{student.gamesPlayed}</div>
                <div className="col-span-2 text-right text-[#d7d7db]">{student.lessonsCompleted}</div>
                <div className="col-span-1 text-right font-bold text-valuto-green-300">
                  {student.points?.toLocaleString() || 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-[#232324]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
          <div className="space-y-4">
            {leaderboard.map((user: any, index: number) => (
              <div
                key={user.userId || index}
                className={`flex items-center gap-4 rounded-lg p-4 transition-all hover:scale-102 ${
                  index < 3 
                    ? 'border-2 border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-yellow-500/20' 
                    : 'border border-white/10 bg-white/[0.03] hover:bg-white/[0.05]'
                }`}
              >
                {/* Rank */}
                <div className={`text-2xl font-bold w-8 ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-[#c7c7cc]' :
                  index === 2 ? 'text-amber-600' :
                  'text-[#9a9a9d]'
                }`}>
                  {user.rank}
                </div>

                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-[#8e8e93]' :
                  index === 2 ? 'bg-amber-600' :
                  'bg-valuto-green-600'
                }`}>
                  {formatDisplayName(user).charAt(0).toUpperCase() || '?'}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <p className="font-bold text-white">{formatDisplayName(user)}</p>
                  {user.school && (
                    <p className="text-sm text-[#9a9a9d]">{user.school}</p>
                  )}
                </div>

                {/* Points */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-valuto-green-300">
                    {user.totalPoints?.toLocaleString() || 0}
                  </p>
                  <p className="text-sm text-[#9a9a9d]">points</p>
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
            <div className="mt-6 text-center text-sm text-[#9a9a9d]">
              Showing top 10 players
            </div>
          )}
        </div>
      )}
    </div>
  );
}
