// frontend/app/dashboard/layout.tsx

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { useUserProfile } from "@/lib/userContext";
import { formatDisplayName } from "@/lib/utils";
import { hasActiveSubscription, isFreeDashboardPath } from "@/lib/subscriptionAccess";
import Link from "next/link";
import DashboardDock from "@/components/DashboardDock";
import Image from "next/image";

const dashboardNavGroups = [
  {
    label: null,
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Trivia", href: "/dashboard/trivia" },
      { label: "Calculator", href: "/dashboard/calculator" },
      { label: "Interactive Modules", href: "/dashboard/learning-modules" },
      { label: "News", href: "/news" },
      { label: "AI Chat", href: "/dashboard/ai-chat" },
      { label: "Profile", href: "/dashboard/profile" },
    ],
  },
];

const featuredGameLinks = [
  { label: "Build Your Life", href: "/dashboard/build-your-life" },
  { label: "Build Your Business", href: "/dashboard/build-your-business" },
  { label: "Investment Simulation", href: "/dashboard/investment" },
];

const floatingParticles = [
  { left: "6%", top: "18%", duration: 3.4, delay: 0.2 },
  { left: "14%", top: "72%", duration: 4.1, delay: 1.1 },
  { left: "21%", top: "36%", duration: 3.8, delay: 0.7 },
  { left: "28%", top: "12%", duration: 4.5, delay: 1.6 },
  { left: "33%", top: "64%", duration: 3.2, delay: 0.5 },
  { left: "39%", top: "28%", duration: 4.7, delay: 1.9 },
  { left: "45%", top: "82%", duration: 3.6, delay: 0.3 },
  { left: "52%", top: "20%", duration: 4.2, delay: 1.4 },
  { left: "57%", top: "58%", duration: 3.9, delay: 0.9 },
  { left: "63%", top: "10%", duration: 4.8, delay: 1.7 },
  { left: "68%", top: "76%", duration: 3.3, delay: 0.4 },
  { left: "72%", top: "34%", duration: 4.3, delay: 1.2 },
  { left: "78%", top: "52%", duration: 3.7, delay: 0.8 },
  { left: "83%", top: "16%", duration: 4.6, delay: 1.5 },
  { left: "88%", top: "68%", duration: 3.5, delay: 0.6 },
  { left: "92%", top: "26%", duration: 4.4, delay: 1.8 },
  { left: "10%", top: "48%", duration: 3.1, delay: 0.1 },
  { left: "26%", top: "88%", duration: 4.0, delay: 1.0 },
  { left: "61%", top: "42%", duration: 3.75, delay: 1.3 },
  { left: "86%", top: "90%", duration: 4.9, delay: 0.95 },
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
  const [featuredGamesOpen, setFeaturedGamesOpen] = useState(false);

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
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{
          backgroundColor: "hsl(0 0% 7%)",
          backgroundImage:
            "linear-gradient(160deg, hsl(0 0% 7%), hsl(0 0% 9%), hsl(152 20% 8%))",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-valuto-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="font-medium text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden text-white"
      style={{
        backgroundColor: "hsl(0 0% 7%)",
        backgroundImage:
          "linear-gradient(160deg, hsl(0 0% 7%), hsl(0 0% 9%), hsl(152 20% 8%))",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Decorative elements - adjusted to avoid dock area */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 h-72 w-72 rounded-full bg-valuto-green-400/10 blur-3xl"></div>
      <div className="absolute top-1/3 left-40 translate-y-12 h-96 w-96 rounded-full bg-emerald-300/8 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 translate-y-12 h-80 w-80 rounded-full bg-cyan-300/5 blur-3xl"></div>
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {floatingParticles.map((particle, index) => (
          <motion.div
            key={`${particle.left}-${particle.top}-${index}`}
            className="absolute h-3 w-3 rounded-full bg-valuto-green-400/70 shadow-[0_0_20px_rgba(74,222,128,0.9)]"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -34, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
        <nav className="mx-auto bg-hero/90 px-4 shadow-lg sm:px-6 lg:pl-8 lg:pr-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center">
              <Image src="/valuto-logo.png" alt="Valuto Logo" width={40} height={40} />
              <span className="ml-3 hidden rounded-full border border-valuto-green-500/30 bg-valuto-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-valuto-green-100 lg:inline-flex">
                {profile?.role === "teacher" ? "Teacher Hub" : "Student Hub"}
              </span>
            </Link>

            <div className="hidden xl:flex xl:items-center xl:gap-8">
              <div className="flex items-center gap-6">
                {dashboardNavGroups[0].links.map((link) => {
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

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setFeaturedGamesOpen((open) => !open)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                    featuredGameLinks.some((link) => pathname === link.href || pathname.startsWith(`${link.href}/`))
                      ? "border-violet-300/40 bg-violet-400/10 text-violet-100"
                      : "border-violet-400/25 bg-violet-400/10 text-violet-200 hover:text-white"
                  }`}
                >
                  Featured Games
                  <svg
                    className={`h-4 w-4 transition-transform ${featuredGamesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {featuredGamesOpen ? (
                  <div className="absolute left-0 top-full mt-3 min-w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-[#14181f]/95 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                    <div className="flex flex-col">
                      {featuredGameLinks.map((link) => {
                        const isActive =
                          pathname === link.href || pathname.startsWith(`${link.href}/`);

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setFeaturedGamesOpen(false)}
                            className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-violet-400/10 text-violet-100"
                                : "text-gray-300 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
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
                {dashboardNavGroups[0].links.map((link) => {
                  const isActive =
                    pathname === link.href || pathname.startsWith(`${link.href}/`);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-base font-medium ${
                        isActive ? "text-primary" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <div className="space-y-3">
                  <div className="pt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-200">
                    Featured Games
                  </div>
                  {featuredGameLinks.map((link) => {
                    const isActive =
                      pathname === link.href || pathname.startsWith(`${link.href}/`);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-base font-medium ${
                          isActive ? "text-primary" : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>

              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Dashboard Dock */}
      <DashboardDock />

      {/* Main Content - Add left padding to accommodate dock on desktop */}
      <main className="relative z-20 pt-20 lg:pl-24">
        {children}
      </main>
    </div>
  );
}
