// frontend/components/learning/QuizActivity.tsx
"use client";

import { useState } from "react";
import Card from "@/components/theme/Card";
import Button from "@/components/theme/Button";
import { CheckCircleIcon, XCircleIcon } from "@/components/icons";

/* ============================================
 * NEW BACKEND-ACCURATE QUIZ SCHEMA
 * ============================================ */
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizActivityProps {
  questions: QuizQuestion[];
  onComplete: (results: any[]) => void; // array of quiz responses
  onProgress?: (currentQuestion: number, totalQuestions: number) => void;
  elapsedSeconds?: number;
}

export default function QuizActivity({
  questions,
  onComplete,
  onProgress,
  elapsedSeconds = 0,
}: QuizActivityProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const question = questions[index];
  const isLast = index === questions.length - 1;

  /* -----------------------------------------
   * Select answer
   * ----------------------------------------- */
  const handleSelect = (optionIndex: number) => {
    if (showResult) return;

    const updated = [...selected];
    updated[index] = optionIndex;
    setSelected(updated);
  };

  /* -----------------------------------------
   * Submit answer for the current question
   * ----------------------------------------- */
  const handleSubmit = () => {
    if (selected[index] === undefined) return;

    const isCorrect = selected[index] === question.correctAnswer;

    const result = {
      question: question.question,
      selectedAnswer: selected[index],
      isCorrect,
    };

    setResults((prev) => [...prev, result]);
    setShowResult(true);

    if (onProgress) {
      onProgress(index + 1, questions.length);
    }
  };

  /* -----------------------------------------
   * Next question or complete quiz
   * ----------------------------------------- */
  const handleNext = () => {
    if (isLast) {
      // Final results sent to parent
      onComplete(results);
    } else {
      setIndex((i) => i + 1);
      setShowResult(false);
    }
  };

  /* -----------------------------------------
   * Button styling
   * ----------------------------------------- */
  const getBtnClass = (i: number) => {
    if (!showResult) {
      return selected[index] === i
        ? "border-valuto-green-500 bg-valuto-green-500/10 text-white"
        : "border-white/10 bg-white/[0.03] text-[#e5e5e7] hover:bg-white/[0.06] hover:border-valuto-green-400/50";
    }

    const isCorrect = i === question.correctAnswer;
    const wasSelected = i === selected[index];

    if (isCorrect) return "border-green-500 bg-green-500/10 text-white";
    if (wasSelected) return "border-red-500 bg-red-500/10 text-white";

    return "border-white/10 bg-white/[0.03] text-[#9a9a9d]";
  };

  const getIcon = (i: number) => {
    if (!showResult) return null;

    if (i === question.correctAnswer)
      return <CheckCircleIcon className="w-5 h-5 text-green-600" />;

    if (i === selected[index])
      return <XCircleIcon className="w-5 h-5 text-red-600" />;

    return null;
  };

  /* ----------------------------------------- */

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="h-2 rounded-full bg-white/10">
        <div
          className="bg-valuto-green-600 h-2 rounded-full"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Counter */}
      <div className="text-center text-sm text-[#9a9a9d]">
        Question {index + 1} / {questions.length}
      </div>

      {/* Question */}
      <Card className="p-8">
        <h3 className="mb-6 text-xl font-bold text-white">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 text-left ${getBtnClass(
                i
              )}`}
            >
              <div>{getIcon(i)}</div>
              <span>{opt}</span>
            </button>
          ))}
        </div>

        {!showResult ? (
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={selected[index] === undefined}
          >
            Submit Answer
          </Button>
        ) : (
          <div className="space-y-4">
            {/* Feedback box */}
            <div
              className={`p-4 rounded-lg ${
                selected[index] === question.correctAnswer
                  ? "border border-green-400/30 bg-green-500/10"
                  : "border border-red-400/30 bg-red-500/10"
              }`}
            >
              <div className="mb-2 font-semibold text-white">
                {selected[index] === question.correctAnswer
                  ? "Correct!"
                  : "Incorrect"}
              </div>

              <p className="text-sm text-[#d7d7db]">{question.explanation}</p>
            </div>

            <Button className="w-full" onClick={handleNext}>
              {isLast ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        )}
      </Card>

      {/* Timer */}
      <div className="text-center text-sm text-[#9a9a9d]">
        Time spent: {Math.floor(elapsedSeconds / 60)}:
        {(elapsedSeconds % 60).toString().padStart(2, "0")}
      </div>
    </div>
  );
}
