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

  // Separate active vs archived sessions
  const activeSessions = sessions.filter((s) => s.status !== 'archived');
  const archivedSessions = sessions.filter((s) => s.status === 'archived');

  return (
    <PageLayout
      title="Trivia Games"
      subtitle={
        isTeacher
          ? 'Create and manage engaging financial literacy games for your students'
          : 'Join live games and test your financial knowledge'
      }
      icon={<GameControllerIcon className="w-16 h-16 text-valuto-green-600" />}
    >
      {/* Student: Join Game Section */}
      {isStudent && (
        <Card className="mb-12 border border-valuto-green-500/20 bg-gradient-to-r from-[#163126] via-[#1a3a2d] to-[#12261d] text-white shadow-[0_0_30px_rgba(34,197,94,0.16)]">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Join a Game</h2>
            <p className="mb-8 text-xl text-white/80">Enter the game code from your teacher to join</p>
            <form
              onSubmit={handleJoinGame}
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
            >
              <Input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Enter game code (e.g., ABC123)"
                className="flex-1 h-14 rounded-xl border border-white/10 bg-black/30 px-6 py-4 text-center text-xl font-semibold uppercase tracking-wider text-white placeholder:text-white/35 focus:outline-none focus:ring-4 focus:ring-valuto-green-500/20"
                maxLength={6}
              />
              <Button type="submit" className="border border-white/10 px-8 py-4 text-lg font-bold shadow-[0_12px_30px_rgba(22,163,74,0.28)]" variant="primary">
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
            <Button
              size="lg"
              className="border border-valuto-green-500/20 bg-gradient-to-r from-[#163126] to-[#204332] px-8 py-4 text-lg font-bold text-white shadow-[0_12px_30px_rgba(22,163,74,0.24)] hover:from-[#1b3c2d] hover:to-[#28513d]"
            >
              ✨ Create New Game
            </Button>
          </Link>
        </div>
      )}

      {/* =============== Active Games Section =============== */}
      <Section
        title={isTeacher ? "Your Games" : "Available Games"}
        sessions={activeSessions}
        loading={loading}
        error={error}
        isTeacher={isTeacher}
        getToken={getToken}
        router={router}
      />

      {/* =============== Archived Games Section (if any) =============== */}
      {archivedSessions.length > 0 && (
        <div className="mt-16">
          <Section
            title="Past Games"
            sessions={archivedSessions}
            loading={false}
            error=""
            isTeacher={isTeacher}
            getToken={getToken}
            router={router}
            isArchived
          />
        </div>
      )}
    </PageLayout>
  );
}

// ======================
// Section Component
// ======================
function Section({ title, sessions, loading, error, isTeacher, getToken, router, isArchived = false }: any) {
  if (error) {
    return (
      <div className="mb-6 border-l-4 border-yellow-400 bg-yellow-500/10 p-4">
        <p className="text-sm text-yellow-300">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valuto-green-600 mx-auto mb-4"></div>
        <p className="text-[#9a9a9d]">Loading games...</p>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <Card className="text-center py-16">
        <div className="text-6xl mb-4">🎮</div>
        <h3 className="mb-2 text-2xl font-bold text-white">
          {isTeacher ? 'No Games Yet' : 'No Active Games'}
        </h3>
        <p className="mb-6 text-[#9a9a9d]">
          {isTeacher
            ? 'Create your first trivia game to get started!'
            : 'Ask your teacher to create a game, or use the join code to enter an active game.'}
        </p>
        {isTeacher && !isArchived && (
          <Link href="/dashboard/trivia/create">
            <Button className="border border-valuto-green-500/20 bg-valuto-green-600 text-white hover:bg-valuto-green-700">
              Create Your First Game
            </Button>
          </Link>
        )}
      </Card>
    );
  }

  return (
    <div>
      <h2 className="mb-8 text-center text-3xl font-bold text-white">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sessions.map((session: any) => (
          <Card key={session.sessionId} className="flex h-full flex-col border border-white/10 bg-white/[0.03]">
            {/* Header */}
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="flex-1 text-xl font-bold text-white">{session.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    session.status === 'active'
                      ? 'border border-green-500/20 bg-green-500/10 text-green-300'
                      : session.status === 'waiting'
                      ? 'border border-yellow-500/20 bg-yellow-500/10 text-yellow-300'
                      : session.status === 'archived'
                      ? 'border border-white/10 bg-white/5 text-[#9a9a9d]'
                      : 'border border-blue-500/20 bg-blue-500/10 text-blue-300'
                  }`}
                >
                  {session.status === 'active'
                    ? '🔴 Live'
                    : session.status === 'waiting'
                    ? '⏳ Waiting'
                    : session.status === 'archived'
                    ? '📁 Archived'
                    : '✅ Ended'}
                </span>
              </div>
              <p className="text-sm text-[#9a9a9d]">Created by {session.hostName}</p>
            </div>

            {/* Game Code */}
            <div className="mb-4 rounded-lg border border-valuto-green-500/20 bg-valuto-green-500/10 p-4">
              <p className="mb-1 text-sm text-[#9a9a9d]">Game Code</p>
              <p className="text-3xl font-mono font-bold text-valuto-green-600 tracking-wider">
                {session.joinCode}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-center mb-6 flex-1">
              <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <p className="text-2xl font-bold text-white">{session.playerCount || 0}</p>
                <p className="text-sm text-[#9a9a9d]">Players</p>
              </div>
              <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <p className="text-2xl font-bold text-white">{session.questionCount || 0}</p>
                <p className="text-sm text-[#9a9a9d]">Questions</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto">
              {isTeacher ? (
                <TeacherButtons
                  session={session}
                  getToken={getToken}
                  router={router}
                />
              ) : (
                <StudentButtons session={session} router={router} />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ======================
// Teacher Buttons
// ======================
function TeacherButtons({ session, getToken, router }: any) {
  return (
    <div className="flex gap-2">
      {session.status === 'waiting' && (
        <Button
          onClick={() => router.push(`/dashboard/trivia/host/${session.sessionId}`)}
          className="flex-1 bg-valuto-green-600 hover:bg-valuto-green-700 text-white"
        >
          Start Game
        </Button>
      )}

      {session.status === 'active' && (
        <Button
          onClick={() => router.push(`/dashboard/trivia/host/${session.sessionId}`)}
          className="flex-1 border border-green-500/20 bg-green-600 text-white hover:bg-green-700"
        >
          Manage
        </Button>
      )}

      {session.status === 'ended' && (
        <div className="flex gap-2 w-full">
          <Button
            onClick={() => router.push(`/dashboard/trivia/session/${session.sessionId}/results`)}
            className="flex-1 border border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            View Results
          </Button>
          <Button
            onClick={async () => {
              try {
                console.log("🟢 Restart button clicked:", session.sessionId);
                const token = await getToken({ template: "default" });
                if (!token) return;
                const res = await triviaApi.restartSession(token, session.sessionId);
                if (res.success && res.data) {
                  router.push(`/dashboard/trivia/host/${res.data.sessionId}`);
                } else {
                  alert(res.message || "Failed to restart game");
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

      {session.status === 'archived' && (
        <Button
          onClick={() => router.push(`/dashboard/trivia/session/${session.sessionId}/results`)}
          className="flex-1 border border-white/10 bg-white/5 text-[#9a9a9d] hover:bg-white/10"
        >
          View Results (Archived)
        </Button>
      )}
    </div>
  );
}

// ======================
// Student Buttons
// ======================
function StudentButtons({ session, router }: any) {
  const isEndedOrArchived = session.status === 'ended' || session.status === 'archived';
  return (
    <Button
      onClick={() => router.push(`/dashboard/trivia/play/${session.joinCode}`)}
      disabled={isEndedOrArchived}
      className={`w-full ${
        isEndedOrArchived
          ? 'cursor-not-allowed border border-white/10 bg-white/5 text-[#6f6f73]'
          : 'border border-valuto-green-500/20 bg-valuto-green-600 text-white hover:bg-valuto-green-700'
      }`}
    >
      {isEndedOrArchived ? 'Game Ended' : 'Join Game'}
    </Button>
  );
}
