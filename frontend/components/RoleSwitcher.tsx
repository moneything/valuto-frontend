"use client";

import { useState } from 'react';
import { useUser } from '@/lib/userContext';

export default function RoleSwitcher() {
  const { profile, setUserProfile } = useUser();
  const [isToggling, setIsToggling] = useState(false);

  const handleRoleSwitch = async () => {
    if (!profile || isToggling) return;
    
    setIsToggling(true);
    
    // Toggle role
    const newRole = profile.role === 'student' ? 'teacher' : 'student';
    
    // Update profile
    const updatedProfile = {
      ...profile,
      role: newRole as 'student' | 'teacher',
      // Reset role-specific fields when switching
      grade: newRole === 'student' ? profile.grade : undefined,
      subject: newRole === 'teacher' ? profile.subject : undefined,
    };
    
    setUserProfile(updatedProfile);
    
    // Small delay for smooth transition
    setTimeout(() => {
      setIsToggling(false);
    }, 300);
  };

  if (!profile) return null;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-valuto-green-100 shadow-lg max-w-3xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${profile.role === 'student' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-700 leading-tight">
              Currently viewing as: <span className="font-semibold capitalize text-valuto-green-600">{profile.role}</span>
            </p>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              {profile.role === 'student' 
                ? 'Access games, learning modules, and track progress' 
                : 'Create games, manage students, and view analytics'
              }
            </p>
          </div>
        </div>
        
        <button
          onClick={handleRoleSwitch}
          disabled={isToggling}
          className={`
            relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0
            ${isToggling 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-valuto-green-600 hover:bg-valuto-green-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
            }
          `}
        >
          {isToggling ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              Switching...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Switch to {profile.role === 'student' ? 'Teacher' : 'Student'}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
