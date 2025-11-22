// app/dashboard/learning-modules/[moduleId]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import PageLayout from "@/components/theme/PageLayout";
import Card from "@/components/theme/Card";
import Button from "@/components/theme/Button";

import QuizActivity from "@/components/learning/QuizActivity";
import { BookOpenIcon, ClockIcon, StarIcon } from "@/components/icons";

import {
  useLearningModule,
  useLearningProgress,
} from "@/lib/hooks/useLearningModules";

import SectionRenderer from "@/components/learning/sections/SectionRenderer";
import * as LucideIcons from "lucide-react";

type StepState = "intro" | "quiz" | "complete";

export default function LearningModulePage({
  params,
}: {
  params: { moduleId: string };
}) {
  const router = useRouter();
  const moduleId = params.moduleId;

  const { module, loading, error } = useLearningModule(moduleId);
  const { saveProgress } = useLearningProgress(moduleId);

  const [step, setStep] = useState<StepState>("intro");
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [quizResult, setQuizResult] = useState<any>(null);

  useEffect(() => {
    if (module && !sessionStart) {
      setSessionStart(new Date());
    }
  }, [module, sessionStart]);

  const handleQuizComplete = async (answers: any[]) => {
    setStep("complete");

    const safeStart = sessionStart
      ? sessionStart.toISOString()
      : new Date().toISOString();

    const totalTime = sessionStart
      ? Math.floor((Date.now() - sessionStart.getTime()) / 1000)
      : 0;

    const payload = JSON.parse(
      JSON.stringify({
        moduleId,
        responses: answers,
        sessionData: {
          startTime: safeStart,
          endTime: new Date().toISOString(),
          totalTime,
        },
      })
    );

    const result = await saveProgress(payload);
    setQuizResult(result);
  };

  /* ---------------- LOADING / ERROR STATES ---------------- */

  if (loading) {
    return (
      <PageLayout
        title="Loading..."
        subtitle="Fetching module"
        icon={<BookOpenIcon className="w-16 h-16 text-gray-400" />}
      >
        <div className="py-8 text-center">
          <div className="animate-spin h-12 w-12 mx-auto border-b-2 border-valuto-green-600 rounded-full" />
        </div>
      </PageLayout>
    );
  }

  if (error || !module) {
    return (
      <PageLayout
        title="Not Found"
        subtitle="This module doesn't exist"
        icon={<BookOpenIcon className="w-16 h-16 text-gray-400" />}
      >
        <div className="text-center py-8 space-y-4">
          <p className="text-gray-600">{error || "Module not found"}</p>
          <Button onClick={() => router.push("/dashboard/learning-modules")}>
            Back to Modules
          </Button>
        </div>
      </PageLayout>
    );
  }

  /* ---------------- VISUAL ICON (top-right) ---------------- */

  const visualIconName = module.visual?.icon as keyof typeof LucideIcons | undefined;
  const VisualIcon =
    (visualIconName && (LucideIcons as any)[visualIconName]) ||
    (LucideIcons as any)["BookOpen"] ||
    null;

  const visualColorClass = module.visual?.iconColor || "bg-blue-500";

  /* ----------------- RELATED LESSONS ----------------- */

  const renderRelatedLessons = () => {
    if (!module.relatedLessons?.length) return null;

    return (
      <Card className="mt-8 p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Continue Learning
        </h3>
        <div className="flex flex-wrap gap-2">
          {module.relatedLessons.map((lesson: any) => (
            <Link
              key={lesson.moduleId}
              href={`/dashboard/learning-modules/${lesson.moduleId}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 transition"
            >
              <span className="text-xs uppercase tracking-wide text-gray-500">
                {lesson.relationship?.replace("-", " ")}
              </span>
              <span className="font-medium">{lesson.title}</span>
            </Link>
          ))}
        </div>
      </Card>
    );
  };

  /* ----------------- MAIN RENDER ----------------- */

  return (
    <PageLayout
      title={module.title}
      subtitle={module.description}
      icon={<BookOpenIcon className="w-16 h-16 text-valuto-green-600" />}
    >
      {/* Back button */}
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/learning-modules")}
        >
          ← Back to all lessons
        </Button>
      </div>

      {/* Header / Summary Card */}
      <Card className="mb-8 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {module.visual?.badge && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-xs font-medium text-green-700">
                  {module.visual.badge}
                </span>
              )}
              {module.difficultyLevel && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700 capitalize">
                  {module.difficultyLevel}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {module.title}
            </h1>
            <p className="text-gray-600 mb-4 max-w-2xl">
              {module.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span>{module.visual?.readTime || module.timeEstimate} min read</span>
              </span>

              <span className="inline-flex items-center gap-1">
                <StarIcon className="w-4 h-4" />
                <span>{module.points} points</span>
              </span>
            </div>
          </div>

          {VisualIcon && (
            <div className="flex-shrink-0">
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center ${visualColorClass}`}
              >
                <VisualIcon className="w-10 h-10 text-white" />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* CONTENT / QUIZ / COMPLETE FLOW */}
      {step === "intro" && (
        <>
          <Card className="p-6 md:p-8 mb-6">
            {/* Content sections */}
            <div className="space-y-4">
              {module.contentSections?.map((section: any) => (
                <SectionRenderer key={section.id} section={section} />
              ))}
            </div>

            {/* Quiz CTA */}
            {module.quiz && (
              <div className="mt-8 pt-5 border-t border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Ready to test yourself?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Answer a few quick questions to lock in what you&apos;ve
                      learned and earn points.
                    </p>
                  </div>
                  <Button
                    onClick={() => setStep("quiz")}
                    size="lg"
                    className="w-full md:w-auto bg-valuto-green-600 text-white"
                  >
                    Start Quiz 🚀
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {renderRelatedLessons()}
        </>
      )}

      {step === "quiz" && (
        <Card className="p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Quiz: {module.title}
            </h2>
            <span className="text-sm text-gray-500">
              Passing score: {module.quiz?.passingScore} correct
            </span>
          </div>
          <QuizActivity
            questions={module.quiz!.questions}
            onComplete={handleQuizComplete}
          />
        </Card>
      )}

      {step === "complete" && (
        <>
          <Card className="p-6 md:p-8 space-y-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Great work! 🎉
            </h2>
            <p className="text-gray-600">
              You&apos;ve completed <strong>{module.title}</strong>.
            </p>

            {quizResult?.pointsEarned > 0 && (
              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-2xl max-w-md mx-auto">
                <div className="text-5xl mb-3">🏆</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  +{quizResult.pointsEarned} points!
                </h3>
                <p className="text-gray-700">
                  Total points:{" "}
                  <span className="text-orange-600 font-bold">
                    {quizResult.totalPoints}
                  </span>
                </p>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-3 justify-center mt-4">
              <Button
                className="bg-valuto-green-600 text-white"
                onClick={() => {
                  router.refresh();
                  setStep("intro")
                }
                }
              >
                Review Lesson
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard/learning-modules")}
              >
                Back to All Lessons
              </Button>
            </div>
          </Card>

          {renderRelatedLessons()}
        </>
      )}
    </PageLayout>
  );
}
