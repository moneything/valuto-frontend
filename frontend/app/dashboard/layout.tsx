"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { useUserProfile } from '@/lib/userContext';
import Link from 'next/link';
import DashboardDock from '@/components/DashboardDock';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
  const { profile, loading } = useUserProfile();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    } else if (isLoaded && isSignedIn && profile && !profile.completedOnboarding) {
      router.push('/onboarding');
    }
  }, [isLoaded, isSignedIn, profile, router]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-valuto-green-50 via-white to-valuto-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-valuto-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const isMainDashboard = pathname === '/dashboard';

  return (
    <div className="min-h-screen animate-gradient relative overflow-hidden">
      {/* Decorative elements - adjusted to avoid dock area */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 left-40 translate-y-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
      
      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md shadow-sm border-b border-valuto-green-200/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:pl-32 lg:pr-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center group">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-valuto-green-500 to-valuto-green-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="text-2xl font-bold font-serif green-text-gradient">
                  Valuto
                </span>
              </div>
              <span className="ml-3 text-sm text-valuto-green-600 font-medium bg-valuto-green-50 px-3 py-1 rounded-full">
                {profile?.role === 'teacher' ? '👨‍🏫 Teacher' : '🎓 Student'}
              </span>
            </Link>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900">{profile?.name}</p>
                <p className="text-xs text-gray-500">{profile?.school || 'Valuto Student'}</p>
              </div>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      {!isMainDashboard && (
        <div className="relative bg-white/60 backdrop-blur-sm border-b border-valuto-green-200/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:pl-32 lg:pr-8 py-3">
            <Link 
              href="/dashboard"
              className="inline-flex items-center text-sm text-valuto-green-600 hover:text-valuto-green-700 font-medium transition-colors bg-valuto-green-50 hover:bg-valuto-green-100 px-3 py-2 rounded-lg"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      )}

      {/* Dashboard Dock */}
      <DashboardDock />

      {/* Main Content - Add left padding to accommodate dock on desktop */}
      <main className="relative lg:pl-24">
        {children}
      </main>
    </div>
  );
}


