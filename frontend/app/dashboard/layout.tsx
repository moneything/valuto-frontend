// frontend/app/dashboard/layout.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { useUserProfile } from "@/lib/userContext";
import { formatDisplayName } from "@/lib/utils";
import { hasActiveSubscription, isFreeDashboardPath } from "@/lib/subscriptionAccess";
import Link from "next/link";
import DashboardDock from "@/components/DashboardDock";
import Image from "next/image";

const dashboardNavLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Trivia", href: "/dashboard/trivia" },
  { label: "Calculator", href: "/dashboard/calculator" },
  { label: "Modules", href: "/dashboard/learning-modules" },
  { label: "Investment", href: "/dashboard/investment" },
  { label: "AI Chat", href: "/dashboard/ai-chat" },
  { label: "Profile", href: "/dashboard/profile" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
  const { profile, loading } = useUserProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded || loading) return; // wait for both Clerk and profile to load

    if (!isSignedIn) {
      router.push("/");
      return;
    }

    if (!loading && isLoaded && profile == null) {
      router.push("/onboarding");
      return;
    }

    // only redirect if the user definitely has completedOnboarding === false
    if (profile && profile.completedOnboarding === false) {
      router.push("/onboarding");
      return;
    }

    const hasSubscription = hasActiveSubscription(profile?.subscriptionStatus);
    const freePath = isFreeDashboardPath(pathname);

    if (profile && !hasSubscription && !freePath) {
      router.push("/subscribe");
    }
  }, [isLoaded, isSignedIn, loading, pathname, profile, router]);

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

  return (
    <div className="min-h-screen animate-gradient relative overflow-hidden">
      {/* Decorative elements - adjusted to avoid dock area */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 left-40 translate-y-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 right-1/4 translate-y-12 w-80 h-80 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
        <nav className="mx-auto bg-hero/90 px-4 shadow-lg sm:px-6 lg:pl-32 lg:pr-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center">
              <Image src="/favicon.svg" alt="Valuto Logo" width={40} height={40} />
              <span className="flex items-end bg-gradient-to-r from-valuto-green-600 to-valuto-green-400 bg-clip-text text-2xl font-bold font-serif text-transparent">
                aluto
              </span>
              <span className="ml-3 hidden rounded-full border border-valuto-green-500/30 bg-valuto-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-valuto-green-100 lg:inline-flex">
                {profile?.role === "teacher" ? "Teacher Hub" : "Student Hub"}
              </span>
            </Link>

            <div className="hidden xl:flex xl:items-center lg:space-x-6 xl:space-x-8">
              {dashboardNavLinks.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors lg:text-base ${
                      isActive ? "text-primary" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-white">
                  {formatDisplayName(profile || {}, { useFirstNameForStudents: false })}
                </p>
                <p className="text-sm text-gray-300">
                  {profile?.school || (profile?.role === "teacher" ? "Valuto Teacher" : "Valuto Student")}
                </p>
              </div>

              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />

              <button
                className="xl:hidden pl-4 text-white"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label="Toggle dashboard navigation"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="py-4 xl:hidden">
              <div className="flex flex-col space-y-3">
                {dashboardNavLinks.map((link) => {
                  const isActive =
                    pathname === link.href || pathname.startsWith(`${link.href}/`);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base font-medium ${
                        isActive ? "text-primary" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Dashboard Dock */}
      <DashboardDock />

      {/* Main Content - Add left padding to accommodate dock on desktop */}
      <main className="relative pt-20 lg:pl-24">
        {children}
      </main>
    </div>
  );
}
