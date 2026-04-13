"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useUserProfile } from '@/lib/userContext';
import { UserProfile } from '@/lib/localStorage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userApi } from '@/lib/api';

export default function ProfilePage() {
  const { getToken } = useAuth();
  const { profile, updateProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: profile?.title || '',
    name: profile?.name || '',
    age: profile?.age || '',
    school: profile?.school || '',
    grade: profile?.grade || '',
    subject: profile?.subject || ''
  });

  // Real data states
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    totalPoints: 0,
    lessonsCompleted: 0,
    averageScore: 0,
    streak: 0,
    rank: 0
  });
  const [achievements, setAchievements] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real user data from API
  const fetchProfileData = useCallback(async () => {
    if (!profile) return;
    
    try {
      setLoading(true);
      const token = await getToken({ template: "default" }); 

      if (!token) return;

      // Fetch user stats
      const statsResponse = await userApi.getStats(token);
      if (statsResponse.success && statsResponse.data) {
        const data = statsResponse.data;
        const progression = data.progression || {};
        const nestedStats = data.stats || {};

        setStats({
          gamesPlayed: data.gamesPlayed ?? nestedStats.gamesPlayed ?? 0,
          totalPoints: data.totalPoints ?? nestedStats.totalPoints ?? progression.xp ?? 0,
          lessonsCompleted: data.lessonsCompleted ?? nestedStats.lessonsCompleted ?? 0,
          averageScore: data.averageScore ?? nestedStats.averageScore ?? progression.accuracy ?? 0,
          streak: data.streak ?? nestedStats.currentStreak ?? progression.streak ?? 0,
          rank: data.rank ?? nestedStats.rank ?? progression.rank ?? 0
        });
      }

      // Fetch achievements
      const achievementsResponse = await userApi.getAchievements(token);
      if (achievementsResponse.success && achievementsResponse.data) {
        setAchievements(achievementsResponse.data);
      } else {
        setAchievements([]);
      }

      // Fetch recent activity
      const activityResponse = await userApi.getActivity(token);
      if (activityResponse.success && activityResponse.data) {
        setRecentActivity(activityResponse.data);
      }
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    } finally {
      setLoading(false);
    }
  }, [profile, getToken]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // Refetch stats when page becomes visible (e.g., after completing a module)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchProfileData();
      }
    };

    const handleFocus = () => {
      fetchProfileData();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchProfileData]);

  const handleSave = () => {
    if (profile) {
      const updatedProfile: UserProfile = {
        ...profile,
        title: formData.title,
        name: formData.name,
        age: formData.age ? parseInt(formData.age.toString()) : undefined,
        school: profile.school,
        grade: formData.grade,
        subject: formData.subject
      };
      updateProfile(updatedProfile);
      setIsEditing(false);
    }
  };

  const inputClassName =
    "h-10 w-full rounded-lg border-2 border-white/10 bg-white/[0.04] px-4 py-2 text-white focus:border-valuto-green-600";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          My Profile 👤
        </h1>
        <p className="text-lg text-[#9a9a9d]">
          View your progress and manage your account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar Card */}
          <div className="rounded-xl border border-white/10 bg-[#232324]/95 p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-valuto-green-600 to-valuto-green-700 flex items-center justify-center text-4xl text-white font-bold">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
            {(() => {
              const parts = (profile?.name || '').trim().split(/\s+/).filter(Boolean);
              const lastName = parts.length ? parts[parts.length - 1] : profile?.name || '';
              const displayName = profile?.title ? `${profile.title} ${lastName}` : profile?.name;
              return <h2 className="mb-1 text-xl font-bold text-white">{displayName}</h2>;
            })()}
            <p className="mb-1 break-all text-sm text-[#9a9a9d]">{profile?.email}</p>
            <span className="inline-block rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-300">
              👤 Valuto Member
            </span>
          </div>

          {/* Quick Stats */}
          <div className="rounded-xl border border-white/10 bg-[#232324]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <h3 className="mb-4 font-bold text-white">Quick Stats</h3>
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="flex justify-between">
                  <div className="h-4 w-24 rounded bg-white/[0.08]"></div>
                  <div className="h-4 w-16 rounded bg-white/[0.08]"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-24 rounded bg-white/[0.08]"></div>
                  <div className="h-4 w-16 rounded bg-white/[0.08]"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-24 rounded bg-white/[0.08]"></div>
                  <div className="h-4 w-16 rounded bg-white/[0.08]"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#9a9a9d]">Total Points</span>
                  <span className="font-bold text-valuto-green-300">{stats.totalPoints.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9a9a9d]">Games Played</span>
                  <span className="font-bold text-white">{stats.gamesPlayed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9a9a9d]">Lessons Done</span>
                  <span className="font-bold text-white">{stats.lessonsCompleted}/20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9a9a9d]">Avg. Score</span>
                  <span className="font-bold text-white">{stats.averageScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9a9a9d]">Current Streak</span>
                  <span className="font-bold text-orange-400">{stats.streak} {stats.streak > 0 ? 'days 🔥' : 'days'}</span>
                </div>
                {stats.rank > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#9a9a9d]">Rank</span>
                    <span className="font-bold text-white">#{stats.rank}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Details & Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="rounded-xl border border-white/10 bg-[#232324]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Personal Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm font-semibold text-valuto-green-300 hover:text-valuto-green-200"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-sm font-semibold text-[#9a9a9d] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="text-sm font-semibold text-valuto-green-300 hover:text-valuto-green-200"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#d7d7db]">Title</Label>
                {isEditing ? (
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={inputClassName}
                  />
                ) : (
                  <p className="text-white">{profile?.title || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#d7d7db]">Name</Label>
                {isEditing ? (
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClassName}
                  />
                ) : (
                  <p className="text-white">
                    {(() => {
                      return profile?.name || 'Not set';
                    })()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#d7d7db]">Email</Label>
                <p className="break-all text-[#9a9a9d]">{profile?.email}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#d7d7db]">Age</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className={inputClassName}
                  />
                ) : (
                  <p className="text-white">{profile?.age || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#d7d7db]">School</Label>
                <p className="text-white">{profile?.school || 'Not set'}</p>
                <p className="text-xs text-[#9a9a9d]">School membership is locked after setup.</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#d7d7db]">Grade</Label>
                {isEditing ? (
                  <Input
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className={inputClassName}
                  />
                ) : (
                  <p className="text-white">{profile?.grade || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="rounded-xl border border-white/10 bg-[#232324]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <h3 className="mb-6 text-xl font-bold text-white">Achievements</h3>
            {achievements.length === 0 ? (
              <p className="text-sm text-[#9a9a9d]">No achievements yet. Play games and complete modules to earn badges!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.unlocked
                        ? 'border-valuto-green-500/20 bg-valuto-green-500/10'
                        : 'border-white/10 bg-white/[0.04] opacity-60'
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h4 className="mb-1 text-sm font-bold text-white">{achievement.title}</h4>
                    <p className="text-sm text-[#d7d7db]">{achievement.description}</p>
                    {achievement.unlocked && (
                      <span className="inline-block mt-2 text-sm font-semibold text-valuto-green-300">
                        ✓ Unlocked
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="rounded-xl border border-white/10 bg-[#232324]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <h3 className="mb-4 text-xl font-bold text-white">Recent Activity</h3>
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="flex items-start gap-3 border-b border-white/10 pb-3">
                  <div className="h-8 w-8 rounded bg-white/[0.08]"></div>
                  <div className="flex-1">
                    <div className="mb-2 h-4 w-3/4 rounded bg-white/[0.08]"></div>
                    <div className="h-3 w-1/2 rounded bg-white/[0.08]"></div>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-b border-white/10 pb-3">
                  <div className="h-8 w-8 rounded bg-white/[0.08]"></div>
                  <div className="flex-1">
                    <div className="mb-2 h-4 w-3/4 rounded bg-white/[0.08]"></div>
                    <div className="h-3 w-1/2 rounded bg-white/[0.08]"></div>
                  </div>
                </div>
              </div>
            ) : recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className={`flex items-start gap-3 ${index < recentActivity.length - 1 ? 'border-b border-white/10 pb-3' : ''}`}>
                    <span className="text-2xl">{activity.icon || '✨'}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{activity.title}</p>
                      <p className="text-sm text-[#9a9a9d]">
                        {activity.timeAgo}{activity.points ? ` • +${activity.points} points` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="mb-2 text-[#9a9a9d]">No recent activity yet</p>
                <p className="text-sm text-[#6f6f73]">Start playing games and learning to build your activity log!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
