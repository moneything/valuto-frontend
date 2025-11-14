"use client";

import { useState, useEffect, useCallback } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { useUserProfile } from '@/lib/userContext';
import { UserProfile } from '@/lib/localStorage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userApi } from '@/lib/api';

export default function ProfilePage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { profile, updateProfile, isTeacher, isStudent } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
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
        setStats({
          gamesPlayed: statsResponse.data.gamesPlayed || 0,
          totalPoints: statsResponse.data.totalPoints || 0,
          lessonsCompleted: statsResponse.data.lessonsCompleted || 0,
          averageScore: statsResponse.data.averageScore || 0,
          streak: statsResponse.data.streak || 0,
          rank: statsResponse.data.rank || 0
        });
      }

      // Fetch achievements
      const achievementsResponse = await userApi.getAchievements(token);
      if (achievementsResponse.success && achievementsResponse.data) {
        setAchievements(achievementsResponse.data);
      } else {
        // Default achievements if API doesn't return any
        setAchievements([
          { 
            icon: '🏆', 
            title: 'First Game', 
            description: 'Play your first trivia game', 
            unlocked: statsResponse.data?.gamesPlayed > 0 
          },
          { 
            icon: '📚', 
            title: 'Knowledge Seeker', 
            description: 'Complete 5 learning modules', 
            unlocked: statsResponse.data?.lessonsCompleted >= 5 
          },
          { 
            icon: '💰', 
            title: 'Investment Pro', 
            description: 'Reach 1000 total points', 
            unlocked: statsResponse.data?.totalPoints >= 1000 
          },
          { 
            icon: '🔥', 
            title: 'On Fire!', 
            description: 'Maintain a 7-day learning streak', 
            unlocked: statsResponse.data?.streak >= 7 
          },
          { 
            icon: '⭐', 
            title: 'Perfect Score', 
            description: 'Get 100% on a trivia game', 
            unlocked: statsResponse.data?.averageScore === 100 
          },
          { 
            icon: '👑', 
            title: 'Top Student', 
            description: 'Reach #1 on leaderboard', 
            unlocked: statsResponse.data?.rank === 1 
          },
        ]);
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
        name: formData.name,
        age: formData.age ? parseInt(formData.age.toString()) : undefined,
        school: formData.school,
        grade: formData.grade,
        subject: formData.subject
      };
      updateProfile(updatedProfile);
      setIsEditing(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          My Profile 👤
        </h1>
        <p className="text-lg text-gray-600">
          View your progress and manage your account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-valuto-green-600 to-valuto-green-700 flex items-center justify-center text-4xl text-white font-bold">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{profile?.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{profile?.email}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              isTeacher ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
            }`}>
              {isTeacher ? '👨‍🏫 Teacher' : '🎓 Student'}
            </span>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Points</span>
                  <span className="font-bold text-valuto-green-600">{stats.totalPoints.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Games Played</span>
                  <span className="font-bold text-gray-900">{stats.gamesPlayed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons Done</span>
                  <span className="font-bold text-gray-900">{stats.lessonsCompleted}/20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Score</span>
                  <span className="font-bold text-gray-900">{stats.averageScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-bold text-orange-600">{stats.streak} {stats.streak > 0 ? 'days 🔥' : 'days'}</span>
                </div>
                {isStudent && stats.rank > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class Rank</span>
                    <span className="font-bold text-gray-900">#{stats.rank}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Details & Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-valuto-green-600 hover:text-valuto-green-700 font-semibold text-sm"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-600 hover:text-gray-700 font-semibold text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="text-valuto-green-600 hover:text-valuto-green-700 font-semibold text-sm"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Name</Label>
                {isEditing ? (
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 h-10 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.name || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Email</Label>
                <p className="text-gray-600">{profile?.email}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Age</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2 h-10 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.age || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">School</Label>
                {isEditing ? (
                  <Input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full px-4 py-2 h-10 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.school || 'Not set'}</p>
                )}
              </div>

              {isStudent && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Grade</Label>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full px-4 py-2 h-10 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
                    />
                  ) : (
                    <p className="text-gray-900">{profile?.grade || 'Not set'}</p>
                  )}
                </div>
              )}

              {isTeacher && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Subject</Label>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 h-10 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
                    />
                  ) : (
                    <p className="text-gray-900">{profile?.subject || 'Not set'}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked
                      ? 'border-valuto-green-200 bg-valuto-green-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{achievement.title}</h4>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                  {achievement.unlocked && (
                    <span className="inline-block mt-2 text-xs font-semibold text-valuto-green-600">
                      ✓ Unlocked
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ) : recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className={`flex items-start gap-3 ${index < recentActivity.length - 1 ? 'pb-3 border-b border-gray-100' : ''}`}>
                    <span className="text-2xl">{activity.icon || '✨'}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">
                        {activity.timeAgo}{activity.points ? ` • +${activity.points} points` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">No recent activity yet</p>
                <p className="text-sm text-gray-400">Start playing games and learning to build your activity log!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

