"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useUserProfile } from '@/lib/userContext';
import { UserProfile } from '@/lib/localStorage';
import RoleSwitcher from '@/components/RoleSwitcher';

export default function ProfilePage() {
  const { user } = useUser();
  const { profile, updateProfile, isTeacher, isStudent } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    age: profile?.age || '',
    school: profile?.school || '',
    grade: profile?.grade || '',
    subject: profile?.subject || ''
  });

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

  const achievements = [
    { icon: '🏆', title: 'First Game', description: 'Played your first trivia game', unlocked: true },
    { icon: '📚', title: 'Knowledge Seeker', description: 'Completed 5 learning modules', unlocked: true },
    { icon: '💰', title: 'Investment Pro', description: 'Used the calculator 10 times', unlocked: false },
    { icon: '🔥', title: 'On Fire!', description: '7-day learning streak', unlocked: false },
    { icon: '⭐', title: 'Perfect Score', description: 'Got 100% on a trivia game', unlocked: false },
    { icon: '👑', title: 'Top Student', description: 'Reached #1 on leaderboard', unlocked: false },
  ];

  const stats = {
    gamesPlayed: 12,
    totalPoints: 2450,
    lessonsCompleted: 8,
    averageScore: 85,
    streak: 3,
    rank: 15
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

      {/* Role Switcher */}
      <div className="mb-8">
        <RoleSwitcher />
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
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Points</span>
                <span className="font-bold text-valuto-green-600">{stats.totalPoints}</span>
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
                <span className="font-bold text-orange-600">{stats.streak} days 🔥</span>
              </div>
              {isStudent && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Class Rank</span>
                  <span className="font-bold text-gray-900">#{stats.rank}</span>
                </div>
              )}
            </div>
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.name || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <p className="text-gray-600">{profile?.email}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.age || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">School</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.school || 'Not set'}</p>
                )}
              </div>

              {isStudent && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Grade</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-900">{profile?.grade || 'Not set'}</p>
                  )}
                </div>
              )}

              {isTeacher && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none"
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
            <div className="space-y-3">
              <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <span className="text-2xl">🎮</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Completed trivia game</p>
                  <p className="text-xs text-gray-500">2 hours ago • +250 points</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <span className="text-2xl">📚</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Finished "Stocks & Shares" module</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Used investment calculator</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

