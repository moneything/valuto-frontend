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

const categoryBorderEffects: Record<
  string,
  { ring: string; shadow: string; gradient: string }
> = {
  "bg-blue-500": {
    ring: "ring-sky-300/60",
    shadow: "shadow-[0_0_28px_rgba(56,189,248,0.16)]",
    gradient:
      "bg-[conic-gradient(from_0deg,rgba(56,189,248,0.1),rgba(125,211,252,0.82),rgba(56,189,248,0.1),rgba(56,189,248,0.1))]",
  },
  "bg-green-500": {
    ring: "ring-emerald-300/60",
    shadow: "shadow-[0_0_28px_rgba(16,185,129,0.16)]",
    gradient:
      "bg-[conic-gradient(from_0deg,rgba(16,185,129,0.1),rgba(52,211,153,0.86),rgba(16,185,129,0.1),rgba(16,185,129,0.1))]",
  },
  "bg-orange-500": {
    ring: "ring-orange-300/60",
    shadow: "shadow-[0_0_28px_rgba(249,115,22,0.16)]",
    gradient:
      "bg-[conic-gradient(from_0deg,rgba(249,115,22,0.1),rgba(253,186,116,0.86),rgba(249,115,22,0.1),rgba(249,115,22,0.1))]",
  },
  "bg-purple-500": {
    ring: "ring-violet-300/60",
    shadow: "shadow-[0_0_28px_rgba(168,85,247,0.16)]",
    gradient:
      "bg-[conic-gradient(from_0deg,rgba(168,85,247,0.1),rgba(196,181,253,0.86),rgba(168,85,247,0.1),rgba(168,85,247,0.1))]",
  },
  "bg-indigo-500": {
    ring: "ring-indigo-300/60",
    shadow: "shadow-[0_0_28px_rgba(99,102,241,0.16)]",
    gradient:
      "bg-[conic-gradient(from_0deg,rgba(99,102,241,0.1),rgba(165,180,252,0.86),rgba(99,102,241,0.1),rgba(99,102,241,0.1))]",
  },
  "bg-red-500": {
    ring: "ring-red-300/60",
    shadow: "shadow-[0_0_28px_rgba(239,68,68,0.16)]",
    gradient:
      "bg-[conic-gradient(from_0deg,rgba(239,68,68,0.1),rgba(252,165,165,0.86),rgba(239,68,68,0.1),rgba(239,68,68,0.1))]",
  },
  "bg-yellow-500": {
    ring: "ring-yellow-300/60",
    shadow: "shadow-[0_0_28px_rgba(234,179,8,0.16)]",
    gradient:
      "bg-[conic-gradient(from_0deg,rgba(234,179,8,0.1),rgba(253,224,71,0.88),rgba(234,179,8,0.1),rgba(234,179,8,0.1))]",
  },
  "bg-teal-500": {
    ring: "ring-teal-300/60",
    shadow: "shadow-[0_0_28px_rgba(20,184,166,0.16)]",
    gradient:
      "bg-[conic-gradient(from_0deg,rgba(20,184,166,0.1),rgba(94,234,212,0.86),rgba(20,184,166,0.1),rgba(20,184,166,0.1))]",
  },
  "bg-pink-500": {
    ring: "ring-pink-300/60",
    shadow: "shadow-[0_0_28px_rgba(236,72,153,0.16)]",
    gradient:
      "bg-[conic-gradient(from_0deg,rgba(236,72,153,0.1),rgba(249,168,212,0.86),rgba(236,72,153,0.1),rgba(236,72,153,0.1))]",
  },
};

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
        const categoryBorderEffect =
          categoryBorderEffects[category.color] || categoryBorderEffects["bg-blue-500"];

        // Try to get icon: Example "Wallet" → LucideIcons.Wallet
        const IconComponent =
          (LucideIcons as any)[category.icon] || HelpCircle;

        return (
          <section
            key={category.id}
            className={`relative mb-12 overflow-hidden rounded-2xl border border-white/10 bg-[#232324]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.28)] ${categoryBorderEffect.shadow}`}
          >
            <div
              className={`pointer-events-none absolute -inset-[1px] rounded-2xl border border-transparent ${categoryBorderEffect.gradient} animate-[average-score-border-spin_2.8s_linear_infinite]`}
            />
            <div className="pointer-events-none absolute inset-[1px] rounded-2xl bg-[#232324]" />
            <div
              className={`pointer-events-none absolute inset-0 rounded-2xl ring-1 ${categoryBorderEffect.ring}`}
            />

            {/* Category Header */}
            <div className="relative z-10 mb-6 flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${category.color}`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                <p className="text-lg text-[#9a9a9d]">{category.description}</p>
              </div>
            </div>

            {/* Module Grid */}
            <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {sortedModules.map((module: any) => {
                const status = getModuleStatus(module.topic);
                const isCompleted = status === "completed";
                const isInProgress = status === "in_progress";
                const isFreeModule = module.topic === freeModuleTopic;
                const isLocked = !hasSubscription && !isFreeModule;

                const cardClassName = `
                  relative overflow-hidden rounded-2xl border p-6 transition
                  ${
                    isCompleted
                      ? "bg-green-500/10 border-green-500/30"
                      : isInProgress
                        ? "bg-yellow-500/10 border-yellow-400/80 shadow-[0_0_28px_rgba(250,204,21,0.18)]"
                        : `bg-white/[0.03] border-white/10 ${categoryBorderEffect.shadow}`
                  }
                  ${isLocked ? "opacity-80" : "hover:bg-white/[0.05]"}
                `;

                return (
                  <div key={module.topic} className={cardClassName}>
                    {isInProgress && (
                      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-yellow-300/60" />
                    )}
                    <div className="relative z-10 flex items-center justify-between mb-2">
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

                    <p className="relative z-10 text-sm text-[#9a9a9d]">{module.description}</p>

                    {isLocked ? (
                      <Button
                        className="relative z-10 mt-4"
                        variant="primary"
                        onClick={() => router.push("/subscribe")}
                      >
                        Subscribe to Unlock
                      </Button>
                    ) : (
                      <Button
                        className="relative z-10 mt-4"
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

        @keyframes average-score-border-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
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
  const isInProgressCard = label === "In Progress 🚀";
  const isAverageScoreCard = label === "Average Score ⭐";
  const isDefaultAnimatedCard =
    !isCompletedModulesCard && !isInProgressCard && !isAverageScoreCard;
  const cardContent = (
    <Card
      className={`relative overflow-hidden text-center ${
        isCompletedModulesCard
          ? "border-emerald-400/80 shadow-[0_0_28px_rgba(16,185,129,0.2)]"
          : isInProgressCard
            ? "border-yellow-400/80 shadow-[0_0_28px_rgba(250,204,21,0.18)]"
            : isAverageScoreCard
              ? "border-violet-400/80 shadow-[0_0_28px_rgba(167,139,250,0.18)]"
              : isDefaultAnimatedCard
                ? "border-sky-400/80 shadow-[0_0_28px_rgba(56,189,248,0.16)]"
          : ""
      }`}
    >
      {isDefaultAnimatedCard && (
        <>
          <div className="pointer-events-none absolute -inset-[1px] rounded-2xl border border-transparent bg-[conic-gradient(from_0deg,rgba(56,189,248,0.1),rgba(125,211,252,0.82),rgba(56,189,248,0.1),rgba(56,189,248,0.1))] animate-[average-score-border-spin_2.4s_linear_infinite]" />
          <div className="pointer-events-none absolute inset-[1px] rounded-2xl bg-[#232324]" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-sky-300/60" />
        </>
      )}
      {isAverageScoreCard && (
        <>
          <div className="pointer-events-none absolute -inset-[1px] rounded-2xl border border-transparent bg-[conic-gradient(from_0deg,rgba(167,139,250,0.12),rgba(196,181,253,0.88),rgba(167,139,250,0.12),rgba(167,139,250,0.12))] animate-[average-score-border-spin_2.2s_linear_infinite]" />
          <div className="pointer-events-none absolute inset-[1px] rounded-2xl bg-[#232324]" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-violet-300/60" />
        </>
      )}
      {isCompletedModulesCard && (
        <>
          <div className="pointer-events-none absolute -inset-[1px] rounded-2xl border border-transparent bg-[conic-gradient(from_0deg,rgba(16,185,129,0.1),rgba(52,211,153,0.86),rgba(16,185,129,0.1),rgba(16,185,129,0.1))] animate-[average-score-border-spin_2.3s_linear_infinite]" />
          <div className="pointer-events-none absolute inset-[1px] rounded-2xl bg-[#232324]" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-emerald-300/60" />
        </>
      )}
      {isInProgressCard && (
        <>
          <div className="pointer-events-none absolute -inset-[1px] rounded-2xl border border-transparent bg-[conic-gradient(from_0deg,rgba(250,204,21,0.1),rgba(253,224,71,0.88),rgba(250,204,21,0.1),rgba(250,204,21,0.1))] animate-[average-score-border-spin_2.5s_linear_infinite]" />
          <div className="pointer-events-none absolute inset-[1px] rounded-2xl bg-[#232324]" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-yellow-300/60" />
        </>
      )}
      <div className="relative z-10 mb-2 text-4xl font-bold text-primary">{value}</div>
      <div className="relative z-10 text-sm font-bold text-[#d7d7db]">{label}</div>
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
