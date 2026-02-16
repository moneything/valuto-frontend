"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const { profile } = useUser();
  const { modules, loading: modulesLoading } = useLearningModules();
  const { categories, loading: categoriesLoading } = useLearningCategories();
  const { progress, stats } = useUserLearningProgress();
  const hasSubscription = hasActiveSubscription(profile?.subscriptionStatus);

  const [grouped, setGrouped] = useState<any>({});

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
      {/* Stats Card */}
      {stats && (
        <div className="mb-12 border-0">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Your Learning Stats</h2>
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
      {Object.values(grouped).map((group: any) => {
        const { category, modules } = group;

        if (!modules.length) return null; // Hide empty categories

        const sortedModules = [...modules].sort(sortLearningModulesForAccess);
        const freeModuleTopic = getFirstModuleTopicInCategory(sortedModules);

        // Try to get icon: Example "Wallet" → LucideIcons.Wallet
        const IconComponent =
          (LucideIcons as any)[category.icon] || HelpCircle;

        return (
          <section key={category.id} className="mb-12 p-6 border rounded-2xl bg-white">

            {/* Category Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${category.color}`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              <div>
                <h2 className="text-3xl font-bold">{category.title}</h2>
                <p className="text-gray-600 text-lg">{category.description}</p>
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
                  p-6 border rounded-2xl transition
                  ${
                    isCompleted
                      ? "bg-green-50 border-green-200"
                      : isInProgress
                        ? "bg-yellow-50 border-yellow-200"
                        : "bg-white border-gray-200"
                  }
                  ${isLocked ? "opacity-80" : "hover:bg-gray-50"}
                `;

                return (
                  <div key={module.topic} className={cardClassName}>
                    <div className="flex items-center justify-between mb-2">
                      <ModuleTitle
                        title={module.title}
                        className={
                          isCompleted
                            ? "text-green-700"
                            : isInProgress
                              ? "text-yellow-800"
                              : "text-gray-900"
                        }
                      />

                      <div className="flex items-center gap-2">
                        {isLocked && (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full inline-flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Subscriber only
                          </span>
                        )}
                        {isFreeModule && !hasSubscription && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            Free
                          </span>
                        )}

                        <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          {module?.visual?.readTime} min
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm">{module.description}</p>

                    {isLocked ? (
                      <Button
                        className="mt-4"
                        variant="outline"
                        onClick={() => router.push("/subscribe")}
                      >
                        Subscribe to Unlock
                      </Button>
                    ) : (
                      <Link
                        href={`/dashboard/learning-modules/${module.topic}`}
                        className="inline-block mt-4 text-sm font-semibold text-valuto-green-700 hover:text-valuto-green-800"
                      >
                        Open Module
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
      <style jsx>{`
        .module-title-marquee {
          display: inline-block;
          will-change: transform;
          animation: module-title-marquee-scroll 6s ease-in-out infinite alternate;
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
  title: string;
  className: string;
};

function ModuleTitle({ title, className }: ModuleTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const updateShift = () => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const textWidth = textRef.current?.scrollWidth ?? 0;
      const overflow = textWidth - containerWidth;
      setShift(overflow > 0 ? -overflow : 0);
    };

    updateShift();

    const observer = new ResizeObserver(updateShift);
    if (containerRef.current) observer.observe(containerRef.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();
  }, [title]);

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
        {title}
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
  const cardContent = (
    <Card className="text-center">
      <div className="text-4xl font-bold mb-2 text-valuto-green-500 ">{value}</div>
      <div className="text-sm opacity-90 font-bold">{label}</div>
    </Card>
  );

  if (!tooltip) return cardContent;

  return (
    <div className="relative group">
      {cardContent}
      <div className="pointer-events-none absolute left-0 top-full translate-y-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-200 w-full">
        <div className="bg-white text-black text-xs rounded-2xl py-3 px-3 whitespace-normal shadow-lg backdrop-blur-sm border border-valuto-green-200 w-full text-center">
          {tooltip}
          <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-3 h-3 bg-white rotate-45 border border-valuto-green-200 border-b-0 border-r-0" />
        </div>
      </div>
    </div>
  );
}
