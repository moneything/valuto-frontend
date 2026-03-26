"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { triviaApi } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
}

export default function CreateTriviaPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const [gameTitle, setGameTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { question: '', options: ['', '', '', ''], correctAnswer: 0, timeLimit: 30 }
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: 0, timeLimit: 30 }
    ]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    // Validation
    if (!gameTitle.trim()) {
      setError('Please enter a game title');
      setSubmitting(false);
      return;
    }

    const validQuestions = questions.filter(q => 
      q.question.trim() && 
      q.options.every(opt => opt.trim())
    );

    if (validQuestions.length === 0) {
      setError('Please add at least one complete question');
      setSubmitting(false);
      return;
    }

    try {
      const token = await getToken({ template: "default" }); 
      if (!token) {
        setError('Authentication required');
        setSubmitting(false);
        return;
      }

      // Create session via API
      const response = await triviaApi.createSession(token, {
        title: gameTitle,
        questions: validQuestions.map(q => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          timeLimit: q.timeLimit,
        })),
      });

      if (response.success && response.data) {
        // Show success message with join code
        const joinCode = response.data.joinCode;
        alert(`✅ Game created successfully!\n\nJoin Code: ${joinCode}\n\nShare this code with your students.`);
        
        // Redirect to trivia hub
        router.push('/dashboard/trivia');
      } else {
        setError(response.error || 'Failed to create game');
      }
    } catch (err: any) {
      console.error('Failed to create session:', err);
      setError(err.message || 'Failed to create game');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">
          Create Trivia Game ✨
        </h1>
        <p className="text-lg text-[#9a9a9d]">
          Build an engaging Kahoot-style game for your students
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Game Title */}
        <div className="rounded-2xl border border-white/10 bg-[#232324]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
          <div className="space-y-2">
            <Label htmlFor="gameTitle" className="text-sm font-semibold text-[#d7d7db]">
              Game Title *
            </Label>
            <Input
              id="gameTitle"
              type="text"
              required
              value={gameTitle}
              onChange={(e) => setGameTitle(e.target.value)}
              className="h-12 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-[#7f7f84] focus-visible:ring-primary/40 focus-visible:ring-offset-0"
              placeholder="e.g., Introduction to Investing"
            />
          </div>
        </div>

        {/* Questions */}
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="rounded-2xl border border-white/10 bg-[#232324]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">
                Question {qIndex + 1}
              </h3>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Question Text */}
            <div className="mb-4 space-y-2">
              <Label htmlFor={`question-${qIndex}`} className="text-sm font-semibold text-[#d7d7db]">
                Question *
              </Label>
              <textarea
                id={`question-${qIndex}`}
                required
                value={q.question}
                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-[#7f7f84] focus:border-primary focus:outline-none"
                rows={3}
                placeholder="Enter your question..."
              />
            </div>

            {/* Answer Options */}
            <div className="mb-4 space-y-2">
              <Label className="text-sm font-semibold text-[#d7d7db]">
                Answer Options *
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="relative">
                    <Input
                      type="text"
                      required
                      value={option}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                      className={`h-12 w-full rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-[#7f7f84] ${
                        q.correctAnswer === oIndex
                          ? 'border border-green-500/70 bg-green-500/10'
                          : 'border border-white/10 bg-white/[0.04] focus-visible:ring-primary/40 focus-visible:ring-offset-0'
                      }`}
                      placeholder={`Option ${oIndex + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                      className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                        q.correctAnswer === oIndex
                          ? 'text-green-400'
                          : 'text-[#7f7f84]'
                      }`}
                      title="Mark as correct answer"
                    >
                      {q.correctAnswer === oIndex ? '✓' : '○'}
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-[#9a9a9d]">
                Click the circle to mark the correct answer
              </p>
            </div>

            {/* Time Limit */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#d7d7db]">
                Time Limit: {q.timeLimit} seconds
              </Label>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={q.timeLimit}
                onChange={(e) => updateQuestion(qIndex, 'timeLimit', parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-emerald-400"
              />
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <button
          type="button"
          onClick={addQuestion}
          className="w-full rounded-xl border-2 border-dashed border-white/15 py-6 font-semibold text-[#c6c6cb] transition-colors hover:border-primary hover:text-primary"
        >
          + Add Another Question
        </button>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-8 py-4 font-semibold text-white transition-colors hover:bg-white/[0.08]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 px-8 py-4 rounded-lg font-bold text-lg transition-all ${
              submitting
                ? 'cursor-not-allowed bg-white/15'
                : 'bg-gradient-to-r from-valuto-green-600 to-valuto-green-700 hover:shadow-xl'
            } text-white`}
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Game...
              </span>
            ) : (
              'Create Game 🎮'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

