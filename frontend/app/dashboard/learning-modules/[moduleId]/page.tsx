// app/dashboard/learning-modules/[moduleId]/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import PageLayout from "@/components/theme/PageLayout";
import Card from "@/components/theme/Card";
import {  Card as UICard } from "@/components/ui/card" ;
import Button from "@/components/theme/Button";

import QuizActivity from "@/components/learning/QuizActivity";
import { BookOpenIcon, ClockIcon, StarIcon } from "@/components/icons";

import {
  useLearningModule,
  useLearningProgress,
  useLearningModules,
} from "@/lib/hooks/useLearningModules";
import { useUser } from "@/lib/userContext";
import { hasActiveSubscription, isFreeLearningModule } from "@/lib/subscriptionAccess";

import { JsonRenderer } from "@/components/JsonRenderer";
import * as LucideIcons from "lucide-react";
import LessonPageLayout from "@/components/learning/LessonPageLayout";

type StepState = "intro" | "quiz" | "complete";

export default function LearningModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const router = useRouter();
  const { moduleId } = use(params);
  const { profile, loading: profileLoading } = useUser();

  const { module, loading, error } = useLearningModule(moduleId);
  const { modules, loading: modulesLoading } = useLearningModules();
  const { saveProgress } = useLearningProgress(moduleId);
  const hasSubscription = hasActiveSubscription(profile?.subscriptionStatus);

  const [step, setStep] = useState<StepState>("intro");
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [pageElapsed, setPageElapsed] = useState<number>(0);
  const [quizResult, setQuizResult] = useState<any>(null);
  const lastReportedRef = useRef(0);
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (module && !sessionStart) {
      setSessionStart(new Date());
    }
  }, [module, sessionStart]);

  useEffect(() => {
    const start = new Date();
    setSessionStart(start);
    const timer = setInterval(() => {
      setPageElapsed(Math.floor((Date.now() - start.getTime()) / 1000));
    }, 1000);
    return () => {
      clearInterval(timer);
      setPageElapsed(Math.floor((Date.now() - start.getTime()) / 1000));
    };
  }, []);

  useEffect(() => {
    elapsedRef.current = pageElapsed;
  }, [pageElapsed]);

  useEffect(() => {
    if (profileLoading || loading || modulesLoading || !module) return;
    if (hasSubscription) return;
    if (!modules.length) return;

    const freeModule = isFreeLearningModule(modules, module.topic, module.categoryId);
    if (!freeModule) {
      router.replace("/subscribe");
    }
  }, [hasSubscription, loading, module, modules, modulesLoading, profileLoading, router]);

  const flushTimeSpent = useCallback(async () => {
    const current = elapsedRef.current;
    const delta = current - lastReportedRef.current;
    if (delta <= 0) return;

    const safeStart = sessionStart
      ? sessionStart.toISOString()
      : new Date(Date.now() - current * 1000).toISOString();

    try {
      await saveProgress({
        moduleId,
        status: "in_progress",
        timeSpent: delta,
        sessionData: {
          startTime: safeStart,
          endTime: new Date().toISOString(),
          totalTime: delta,
        },
      });
      lastReportedRef.current = current;
    } catch (err) {
      console.error("Failed to flush time spent", err);
    }
  }, [moduleId, saveProgress, sessionStart]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        flushTimeSpent();
      }
    };

    const handleBeforeUnload = () => {
      flushTimeSpent();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      flushTimeSpent();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [flushTimeSpent]);

  const handleQuizComplete = async (answers: any[]) => {
    setStep("complete");

    const safeStart = sessionStart
      ? sessionStart.toISOString()
      : new Date().toISOString();

    const totalTime = pageElapsed || (sessionStart
      ? Math.floor((Date.now() - sessionStart.getTime()) / 1000)
      : 0);

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
          <p className="text-[#9a9a9d]">{error || "Module not found"}</p>
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
      <UICard className="mt-8 border-white/10 bg-[#232324]/95 p-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
        <h1 className="mb-3 text-3xl font-bold text-white">
          What's Next?
        </h1>
        <p className="text-[#d7d7db]">Now that you understand budgeting basics, explore these related topics:</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {module.relatedLessons.map((lesson: any) => (
            <Link
              key={lesson.moduleId}
              href={`/dashboard/learning-modules/${lesson.moduleId}`}
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-[#e5e5e7] transition hover:bg-white/[0.08]"
            >
              <span className="text-sm uppercase tracking-wide text-[#9a9a9d]">
                {lesson.relationship?.replace("-", " ")}
              </span>
              <span className="font-medium">{lesson.title}</span>
            </Link>
          ))}
        </div>
      </UICard>
    );
  };

  /* ----------------- MAIN RENDER ----------------- */

  return (
    <LessonPageLayout
      title={module.title}
      subtitle={module.description}
      icon={
        <VisualIcon className="w-24 h-24 text-white" />
      }
      badges={
        <>
          {module.visual?.readTime && (
            <span className="flex items-center gap-1 rounded-full bg-white/[0.06] px-3 py-1 text-sm text-[#e5e5e7]">
              <ClockIcon className="w-4 h-4" />
              {module.visual.readTime} min read
            </span>
          )}

          {module.visual?.badge && (
            <span className="rounded-full bg-white/[0.06] px-3 py-1 text-sm text-[#e5e5e7]">
              {module.visual.badge}
            </span>
          )}

          {module.difficultyLevel && (
            <span className="rounded-full bg-white/[0.06] px-3 py-1 text-sm capitalize text-[#e5e5e7]">
              {module.difficultyLevel}
            </span>
          )}
          <span className="flex items-center gap-1 rounded-full bg-white/[0.06] px-3 py-1 text-sm text-[#e5e5e7]">
            <ClockIcon className="w-4 h-4" />
            {Math.floor(pageElapsed / 60)}:{(pageElapsed % 60).toString().padStart(2, "0")} elapsed
          </span>
        </>
      }
    >


      {/* CONTENT / QUIZ / COMPLETE FLOW */}
      {step === "intro" && (
        <>
          {/* Content sections */}
          {module.uiTree && (
            <JsonRenderer
              tree={module.uiTree}
              onAction={(action) => {
                // Use the action system for quiz + navigation + anything else
                if (action.type === "navigate") {
                  router.push(action.payload);
                }

                if (action.type === "quiz-start") {
                  setStep("quiz");
                }

                if (action.type === "quiz-answer") {
                  // your quiz logic
                  console.log("User selected answer:", action.payload);
                }
              }}
            />
          )}



          {/* Quiz CTA */}
          {module.quiz && (
            <UICard className="mt-8 border-white/10 bg-[#232324]/95 p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
              <h1 className="text-3xl text-white">Test Your Knowledge</h1>
              <p className="text-[#9a9a9d]">Quick question to check your understanding</p>
              <Button
                onClick={() => setStep("quiz")}
                className="mt-6 min-w-[-webkit-fill-available] rounded-[0.4em] bg-valuto-green-600 text-white"
              >
                Take Mini Quiz
              </Button>
            </UICard>
            
          )}

          {renderRelatedLessons()}
        </>
      )}

      {step === "quiz" && (
        <Card className="p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">
              Quiz: {module.title}
            </h2>
            <span className="text-sm text-[#9a9a9d]">
              Passing score: {module.quiz?.passingScore} correct
            </span>
          </div>
          <QuizActivity
            questions={module.quiz!.questions}
            onComplete={handleQuizComplete}
            elapsedSeconds={pageElapsed}
          />
        </Card>
      )}

      {step === "complete" && (
        <>
          <Card className="p-6 md:p-8 space-y-6 text-center">
            <h2 className="text-3xl font-bold text-white">
              Great work! 🎉
            </h2>
            <p className="text-[#d7d7db]">
              You&apos;ve completed <strong>{module.title}</strong>.
            </p>

            {quizResult?.pointsEarned > 0 && (
              <div className="mx-auto max-w-md rounded-2xl border border-yellow-400/30 bg-yellow-500/10 p-6">
                <div className="text-5xl mb-3">🏆</div>
                <h3 className="mb-1 text-2xl font-bold text-white">
                  +{quizResult.pointsEarned} points!
                </h3>
                <p className="text-[#e5e5e7]">
                  Total points:{" "}
                  <span className="font-bold text-orange-300">
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
                variant="secondary"
                onClick={() => router.push("/dashboard/learning-modules")}
              >
                Back to All Lessons
              </Button>
            </div>
          </Card>

          {renderRelatedLessons()}
        </>
      )}
    </LessonPageLayout>
  );
}
