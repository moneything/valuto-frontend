// frontend/components/learning/QuizActivity.tsx
"use client";

import { useState, useEffect } from "react";
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
}

export default function QuizActivity({
  questions,
  onComplete,
  onProgress,
}: QuizActivityProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [questionStart, setQuestionStart] = useState(Date.now());

  const question = questions[index];
  const isLast = index === questions.length - 1;

  /* -----------------------------------------
   * Timer per question
   * ----------------------------------------- */
  useEffect(() => {
    setQuestionStart(Date.now());
  }, [index]);

  /* -----------------------------------------
   * Total timer
   * ----------------------------------------- */
  useEffect(() => {
    const timer = setInterval(() => setTimeSpent((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

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
        ? "border-valuto-green-600 bg-valuto-green-50"
        : "border-gray-200 hover:bg-valuto-green-50 hover:border-valuto-green-300";
    }

    const isCorrect = i === question.correctAnswer;
    const wasSelected = i === selected[index];

    if (isCorrect) return "border-green-500 bg-green-50";
    if (wasSelected) return "border-red-500 bg-red-50";

    return "border-gray-200 bg-gray-50 text-gray-500";
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
      <div className="bg-gray-200 rounded-full h-2">
        <div
          className="bg-valuto-green-600 h-2 rounded-full"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Counter */}
      <div className="text-center text-sm text-gray-600">
        Question {index + 1} / {questions.length}
      </div>

      {/* Question */}
      <Card className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
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
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="font-semibold mb-2">
                {selected[index] === question.correctAnswer
                  ? "Correct!"
                  : "Incorrect"}
              </div>

              <p className="text-sm text-gray-700">{question.explanation}</p>
            </div>

            <Button className="w-full" onClick={handleNext}>
              {isLast ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        )}
      </Card>

      {/* Timer */}
      <div className="text-center text-sm text-gray-500">
        Time spent: {Math.floor(timeSpent / 60)}:
        {(timeSpent % 60).toString().padStart(2, "0")}
      </div>
    </div>
  );
}
