// frontend/app/dashboard/layout.tsx

"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { useUserProfile } from '@/lib/userContext';
import Link from 'next/link';
import DashboardDock from '@/components/DashboardDock';
import Image from 'next/image';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
  const { profile, loading } = useUserProfile();
console.log("🔍 DEBUG: profile =", profile);
console.log("🔍 DEBUG: loading =", loading);
console.log("🔍 DEBUG: isLoaded =", isLoaded);
console.log("🔍 DEBUG: isSignedIn =", isSignedIn);

  useEffect(() => {

    if (!isLoaded || loading) return; // wait for both Clerk and profile to load

    if (!isSignedIn) {
      router.push('/');
      return;
    }

    if (!loading && isLoaded && profile == null) {
      router.push('/onboarding');
      return;
    }

    // only redirect if the user definitely has completedOnboarding === false
    if (profile && profile.completedOnboarding === false) {
      router.push('/onboarding');
    }
  }, [isLoaded, isSignedIn, loading, profile, router]);


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

  console.log('User profile in layout:', profile);

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
              <div className="flex items-center">
                  <span className="text-2xl font-bold font-serif bg-gradient-to-r from-valuto-green-600 to-valuto-green-400 bg-clip-text text-transparent flex items-end" style={{'height': "-webkit-fill-available"}}>{profile?.role === 'teacher' ? ' Teacher' : '🎓 Student'}</span>
                  <span className="`text-2xl font-bold font-cursive text-black flex items-end ml-2 mr-2  ${cursiveFont.className}` " style={{'height': "-webkit-fill-available"}} >for</span>
                  <Image src="/favicon.svg" alt="Valuto Logo" width={40} height={40} />
                  <span className="text-2xl font-bold font-serif bg-gradient-to-r from-valuto-green-600 to-valuto-green-400 bg-clip-text text-transparent flex items-end" style={{'height': "-webkit-fill-available"}}>aluto </span>
              </div>
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


      {/* Dashboard Dock */}
      <DashboardDock />

      {/* Main Content - Add left padding to accommodate dock on desktop */}
      <main className="relative lg:pl-24">
        {children}
      </main>
    </div>
  );
}


