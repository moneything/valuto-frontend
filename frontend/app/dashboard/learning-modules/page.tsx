"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PageLayout from "@/components/theme/PageLayout";
import Card from "@/components/theme/Card";

import {
  useLearningModules,
  useUserLearningProgress,
  useLearningCategories,
} from "@/lib/hooks/useLearningModules";

import * as LucideIcons from "lucide-react";
import { ClockIcon, HelpCircle } from "lucide-react";

export default function LearningModulesPage() {
  const { modules, loading: modulesLoading } = useLearningModules();
  const { categories, loading: categoriesLoading } = useLearningCategories();
  const { progress, stats } = useUserLearningProgress();

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
            <StatItem label="Modules Completed 🎯" value={stats.completedModules} />
            <StatItem label="In Progress 🚀" value={stats.inProgressModules} />
            <StatItem label="Average Score ⭐" value={Math.round(stats.averageQuizScore)} />
            <StatItem label="Minutes Spent ⏱️" value={Math.round((stats.totalTimeSpent || 0) / 60)} />
          </div>
        </div>
      )}

      {/* CATEGORY SECTIONS */}
      {Object.values(grouped).map((group: any) => {
        const { category, modules } = group;

        if (!modules.length) return null; // Hide empty categories

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
              {modules.map((module: any) => {
                const status = getModuleStatus(module.topic);
                const isSelected = status === "in_progress" || status === "completed";

                return (
                  <Link key={module.topic} href={`/dashboard/learning-modules/${module.topic}`}>
                    <div
                      className={`
                        p-6 border rounded-2xl transition
                        ${isSelected ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}
                        hover:bg-gray-50
                      `}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3
                          className={`
                            text-xl font-semibold
                            ${isSelected ? "text-green-700" : "text-gray-900"}
                          `}
                        >
                          {module.title}
                        </h3>

                        {/* Time badge */}
                        <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          {module.visual.readTime} min
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm">{module.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </PageLayout>
  );
}

type StatItemProps = {
  label: string;
  value: number;
};

function StatItem({ label, value }: StatItemProps) {
  return (
    <Card className="text-center">
      <div className="text-4xl font-bold mb-2 text-valuto-green-500 ">{value}</div>
      <div className="text-sm opacity-90 font-bold">{label}</div>
    </Card>
  );
}
