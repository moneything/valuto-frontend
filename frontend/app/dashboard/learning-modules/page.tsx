"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import PageLayout from "@/components/theme/PageLayout";
import Card from "@/components/theme/Card";
import Button from "@/components/theme/Button";
import { useUser } from "@/lib/userContext";
import {
  getFirstModuleTopicInCategory,
  hasActiveSubscription,
  sortLearningModulesForAccess,
} from "@/lib/subscriptionAccess";

import {
  useLearningModules,
  useUserLearningProgress,
  useLearningCategories,
} from "@/lib/hooks/useLearningModules";

import * as LucideIcons from "lucide-react";
import { ClockIcon, HelpCircle, Lock } from "lucide-react";

export default function LearningModulesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { profile } = useUser();
  const { modules, loading: modulesLoading } = useLearningModules();
  const { categories, loading: categoriesLoading } = useLearningCategories();
  const { progress, stats } = useUserLearningProgress();
  const hasSubscription = hasActiveSubscription(profile?.subscriptionStatus);

  const [grouped, setGrouped] = useState<any>({});
  const selectedCategoryId = searchParams.get("category");

  // Group modules by category after both load
  useEffect(() => {
    if (!modules || !categories) return;

    const group: any = {};
    categories.forEach((cat: any) => {
      group[cat.id] = {
        category: cat,
        modules: modules.filter((m: any) => m.categoryId === cat.id),
      };
    });

    setGrouped(group);
  }, [modules, categories]);

  // Progress helpers
  const getModuleProgress = (topic: string) =>
    progress?.find((p) => p.moduleId === topic);

  const getProgressPercentage = (topic: string) => {
    const p = getModuleProgress(topic);
    if (!p) return 0;
    if (p.status === "completed") return 100;
    if (p.status === "in_progress") return 50;
    return 0;
  };

  const getModuleStatus = (topic: string) =>
    getModuleProgress(topic)?.status || "not_started";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in_progress":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✅";
      case "in_progress":
        return "🔄";
      default:
        return "⏳";
    }
  };

  if (modulesLoading || categoriesLoading) {
    return (
      <PageLayout
        title="Learn Money Skills"
        subtitle="Master essential financial skills."
      >
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valuto-green-600 mx-auto" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Learn Money Skills"
      subtitle="Master essential financial skills with our student-friendly guides."
    >
      {selectedCategoryId && (
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-[#232324]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
          <p className="text-sm text-[#d7d7db]">
            Filtering modules for the selected category.
          </p>
          <Button variant="outline" onClick={() => router.push("/dashboard/learning-modules")}>
            Clear Filter
          </Button>
        </div>
      )}

      {/* Stats Card */}
      {stats && (
        <div className="mb-12 border-0">
          <div className="text-center mb-6">
            <h2 className="mb-2 text-3xl font-bold text-white">Your Learning Stats</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatItem 
            label="Modules Completed 🎯" 
            value={stats.completedModules} 
            tooltip="Quizzes are recorded as completed only when all quiz questions are answered correctly."
            />
            <StatItem
              label="In Progress 🚀"
              value={stats.inProgressModules}
            />
            <StatItem label="Average Score ⭐" value={Math.round(stats.averageQuizScore)} />
            <StatItem label="Minutes Spent ⏱️" value={Math.round((stats.totalTimeSpent || 0) / 60)} />
          </div>
        </div>
      )}

      {/* CATEGORY SECTIONS */}
      {Object.values(grouped)
        .filter((group: any) => !selectedCategoryId || group.category.id === selectedCategoryId)
        .map((group: any) => {
        const { category, modules } = group;

        if (!modules.length) return null; // Hide empty categories

        const sortedModules = [...modules].sort(sortLearningModulesForAccess);
        const freeModuleTopic = getFirstModuleTopicInCategory(sortedModules);

        // Try to get icon: Example "Wallet" → LucideIcons.Wallet
        const IconComponent =
          (LucideIcons as any)[category.icon] || HelpCircle;

        return (
          <section
            key={category.id}
            className="mb-12 rounded-2xl border border-white/10 bg-[#232324]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
          >

            {/* Category Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${category.color}`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                <p className="text-lg text-[#9a9a9d]">{category.description}</p>
              </div>
            </div>

            {/* Module Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedModules.map((module: any) => {
                const status = getModuleStatus(module.topic);
                const isCompleted = status === "completed";
                const isInProgress = status === "in_progress";
                const isFreeModule = module.topic === freeModuleTopic;
                const isLocked = !hasSubscription && !isFreeModule;

                const cardClassName = `
                  relative overflow-hidden rounded-2xl border p-6 transition shadow-[0_16px_40px_rgba(0,0,0,0.2)]
                  ${
                    isCompleted
                      ? "bg-green-500/10 border-green-500/30"
                      : isInProgress
                        ? "bg-yellow-500/10 border-yellow-400/80 shadow-[0_0_28px_rgba(250,204,21,0.18)]"
                        : "bg-white/[0.03] border-white/10"
                  }
                  ${isLocked ? "opacity-80" : "hover:bg-white/[0.05]"}
                `;

                return (
                  <div key={module.topic} className={cardClassName}>
                    {isInProgress && (
                      <>
                        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-yellow-300/60" />
                        <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(250,204,21,0.42),transparent)] animate-[module-card-shimmer_2.4s_linear_infinite]" />
                      </>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <ModuleTitle
                        moduleTitle={module.title}
                        className={
                          isCompleted
                            ? "text-green-300"
                            : isInProgress
                              ? "text-yellow-300"
                              : "text-white"
                        }
                      />

                      <div className="flex items-center gap-2">
                        {isLocked && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-1 text-xs text-red-300">
                            <Lock className="w-3 h-3" />
                            Subscriber only
                          </span>
                        )}
                        {isFreeModule && !hasSubscription && (
                          <span className="rounded-full bg-green-500/15 px-2 py-1 text-xs text-green-300">
                            Free
                          </span>
                        )}

                        <span className="flex items-center gap-1 rounded-full bg-white/[0.06] px-3 py-1 text-sm text-[#d7d7db]">
                          <ClockIcon className="w-4 h-4" />
                          {module?.visual?.readTime} min
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[#9a9a9d]">{module.description}</p>

                    {isLocked ? (
                      <Button
                        className="mt-4"
                        variant="primary"
                        onClick={() => router.push("/subscribe")}
                      >
                        Subscribe to Unlock
                      </Button>
                    ) : (
                      <Button
                        className=" mt-4"
                        variant="outline"
                        >
                        <Link
                          href={`/dashboard/learning-modules/${module.topic}`}
                          className="inline-block text-sm font-semibold"
                        >
                          Open Module
                        </Link>
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
      <style jsx global>{`
        .module-title-marquee {
          display: inline-block;
          will-change: transform;
          animation: module-title-marquee-scroll 6s ease-in-out infinite alternate;
        }

        @keyframes module-card-shimmer {
          0% {
            transform: translateX(-10%);
          }
          100% {
            transform: translateX(420%);
          }
        }

        @keyframes module-title-marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(var(--marquee-shift));
          }
        }
      `}</style>
    </PageLayout>
  );
}

type ModuleTitleProps = {
  moduleTitle: string;
  className: string;
};

function ModuleTitle({ moduleTitle, className }: ModuleTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const updateShift = () => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const textWidth = textRef.current?.scrollWidth ?? 0;
      const overflow = textWidth - containerWidth;
      const threshold = containerWidth * 0.9;

      if (overflow > 0) {
        setShift(-overflow);
        return;
      }

      if (textWidth > threshold) {
        setShift(-(textWidth - threshold));
        return;
      }

      setShift(0);
    };

    updateShift();

    const observer = new ResizeObserver(updateShift);
    if (containerRef.current) observer.observe(containerRef.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();
  }, [moduleTitle]);

  const shouldMarquee = shift < 0;
  const style = shouldMarquee
    ? ({ "--marquee-shift": `${shift}px` } as CSSProperties)
    : undefined;

  return (
    <div ref={containerRef} className="flex-1 min-w-0 overflow-hidden">
      <h3
        ref={textRef}
        style={style}
        className={`text-xl font-semibold whitespace-nowrap pr-8 ${className} ${shouldMarquee ? "module-title-marquee" : ""}`}
      >
        {moduleTitle}
      </h3>
    </div>
  );
}

type StatItemProps = {
  label: string;
  value: number;
  tooltip?: string;
};

function StatItem({ label, value, tooltip }: StatItemProps) {
  const isCompletedModulesCard = label === "Modules Completed 🎯";
  const cardContent = (
    <Card
      className={`relative overflow-hidden text-center ${
        isCompletedModulesCard
          ? "border-emerald-400/80 shadow-[0_0_28px_rgba(16,185,129,0.2)]"
          : ""
      }`}
    >
      {isCompletedModulesCard && (
        <>
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-emerald-300/60" />
          <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(52,211,153,0.4),transparent)] animate-[module-card-shimmer_2.4s_linear_infinite]" />
        </>
      )}
      <div className="mb-2 text-4xl font-bold text-primary">{value}</div>
      <div className="text-sm font-bold text-[#d7d7db]">{label}</div>
    </Card>
  );

  if (!tooltip) return cardContent;

  return (
    <div className="relative group">
      {cardContent}
      <div className="pointer-events-none absolute left-0 top-full translate-y-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-200 w-full">
        <div className="w-full rounded-2xl border border-white/10 bg-[#1b1b1d] px-3 py-3 text-center text-xs text-[#e5e5e7] shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          {tooltip}
          <div className="absolute left-1/2 -top-1.5 h-3 w-3 -translate-x-1/2 rotate-45 border border-white/10 border-b-0 border-r-0 bg-[#1b1b1d]" />
        </div>
      </div>
    </div>
  );
}
