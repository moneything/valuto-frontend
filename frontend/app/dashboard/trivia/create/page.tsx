"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { triviaApi } from '@/lib/api';

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
      const token = await getToken();
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Create Trivia Game ✨
        </h1>
        <p className="text-lg text-gray-600">
          Build an engaging Kahoot-style game for your students
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Game Title */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Game Title *
          </label>
          <input
            type="text"
            required
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none"
            placeholder="e.g., Introduction to Investing"
          />
        </div>

        {/* Questions */}
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
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
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Question *
              </label>
              <textarea
                required
                value={q.question}
                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600 focus:outline-none"
                rows={3}
                placeholder="Enter your question..."
              />
            </div>

            {/* Answer Options */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Answer Options *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="relative">
                    <input
                      type="text"
                      required
                      value={option}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none ${
                        q.correctAnswer === oIndex
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 focus:border-valuto-green-600'
                      }`}
                      placeholder={`Option ${oIndex + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                      className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                        q.correctAnswer === oIndex
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }`}
                      title="Mark as correct answer"
                    >
                      {q.correctAnswer === oIndex ? '✓' : '○'}
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Click the circle to mark the correct answer
              </p>
            </div>

            {/* Time Limit */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Time Limit: {q.timeLimit} seconds
              </label>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={q.timeLimit}
                onChange={(e) => updateQuestion(qIndex, 'timeLimit', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <button
          type="button"
          onClick={addQuestion}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl py-6 text-gray-600 hover:border-valuto-green-600 hover:text-valuto-green-600 transition-colors font-semibold"
        >
          + Add Another Question
        </button>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 px-8 py-4 rounded-lg font-bold text-lg transition-all ${
              submitting
                ? 'bg-gray-400 cursor-not-allowed'
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


