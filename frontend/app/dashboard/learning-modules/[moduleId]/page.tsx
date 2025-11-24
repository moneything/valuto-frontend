// app/dashboard/learning-modules/[moduleId]/page.tsx
"use client";

import { useState, useEffect } from "react";
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
} from "@/lib/hooks/useLearningModules";

import { JsonRenderer } from "@/components/JsonRenderer";
import * as LucideIcons from "lucide-react";
import LessonPageLayout from "@/components/learning/LessonPageLayout";

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
      <UICard className="mt-8 p-5">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          What's Next?
        </h1>
        <p>Now that you understand budgeting basics, explore these related topics:</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {module.relatedLessons.map((lesson: any) => (
            <Link
              key={lesson.moduleId}
              href={`/dashboard/learning-modules/${lesson.moduleId}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-gray-50 border border-gray-200 text-sm text-gray-800 hover:bg-green-200 hover:opacity-75 transition"
            >
              <span className="text-xs uppercase tracking-wide text-gray-500">
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
            <span className="px-3 py-1 rounded-full bg-gray-100 text-sm flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {module.visual.readTime} min read
            </span>
          )}

          {module.visual?.badge && (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
              {module.visual.badge}
            </span>
          )}

          {module.difficultyLevel && (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-sm capitalize">
              {module.difficultyLevel}
            </span>
          )}
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
            <UICard className="mt-8 p-4">
              <h1 className="text-3xl">Test Your Knowledge</h1>
              <p className="text-gray-500">Quick question to check your understanding</p>
              <Button
                onClick={() => setStep("quiz")}
                className="bg-valuto-green-600 text-white min-w-[-webkit-fill-available] rounded-[0.4em] mt-6"
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
    </LessonPageLayout>
  );
}
