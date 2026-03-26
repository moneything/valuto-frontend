"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/theme/Button';

interface CalculatorGameProps {
  title: string;
  description: string;
  defaultAmount: number;
  defaultRate: number;
  examples: Array<{
    amount: number;
    rate: number;
    result: number;
    description: string;
  }>;
  onComplete: (score: number) => void;
}

export default function CalculatorGame({ 
  title, 
  description, 
  defaultAmount, 
  defaultRate, 
  examples, 
  onComplete 
}: CalculatorGameProps) {
  const [amount, setAmount] = useState(defaultAmount.toString());
  const [rate, setRate] = useState(defaultRate.toString());
  const [result, setResult] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [currentExample, setCurrentExample] = useState(0);

  const calculateResult = () => {
    const amountNum = parseFloat(amount);
    const rateNum = parseFloat(rate);
    
    if (isNaN(amountNum) || isNaN(rateNum) || amountNum <= 0 || rateNum <= 0) {
      return;
    }
    
    const calculatedResult = (amountNum * rateNum) / 100;
    setResult(calculatedResult);
    setAttempts(prev => prev + 1);
  };

  const checkAnswer = () => {
    if (result === null) return;
    
    const expectedResult = (parseFloat(amount) * parseFloat(rate)) / 100;
    const isCorrect = Math.abs(result - expectedResult) < 0.01;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setIsCompleted(true);
      setShowFeedback(true);
      
      setTimeout(() => {
        onComplete(score + 1);
      }, 2000);
    } else {
      setAttempts(prev => prev + 1);
    }
  };

  const tryExample = (example: typeof examples[0]) => {
    setAmount(example.amount.toString());
    setRate(example.rate.toString());
    setResult(null);
    setAttempts(0);
  };

  const resetCalculator = () => {
    setAmount(defaultAmount.toString());
    setRate(defaultRate.toString());
    setResult(null);
    setScore(0);
    setIsCompleted(false);
    setShowFeedback(false);
    setAttempts(0);
  };

  const nextExample = () => {
    if (currentExample < examples.length - 1) {
      setCurrentExample(prev => prev + 1);
      tryExample(examples[currentExample + 1]);
    }
  };

  const prevExample = () => {
    if (currentExample > 0) {
      setCurrentExample(prev => prev - 1);
      tryExample(examples[currentExample - 1]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
        <p className="text-lg text-[#d7d7db]">{description}</p>
      </div>

      {/* Calculator */}
      <div className="rounded-xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-pink-500/10 p-8">
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#d7d7db]">
                Amount (£)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                placeholder="Enter amount"
                disabled={isCompleted}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#d7d7db]">
                Rate (%)
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                placeholder="Enter rate"
                disabled={isCompleted}
              />
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={calculateResult}
              disabled={!amount || !rate || isCompleted}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold text-lg"
            >
              Calculate! 🧮
            </Button>
          </div>

          {result !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border-2 border-purple-400/40 bg-white/[0.05] p-6 text-center"
            >
              <h4 className="mb-2 text-lg font-semibold text-white">Result:</h4>
              <div className="text-3xl font-bold text-purple-600">
                £{result.toFixed(2)}
              </div>
              <p className="mt-2 text-sm text-[#d7d7db]">
                {parseFloat(rate)}% of £{amount} = £{result.toFixed(2)}
              </p>
            </motion.div>
          )}

          {result !== null && !isCompleted && (
            <div className="text-center">
              <Button
                onClick={checkAnswer}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Check Answer! ✅
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Examples */}
      {examples.length > 0 && (
        <div className="rounded-xl bg-white/[0.04] p-6">
          <h4 className="mb-4 text-center text-lg font-semibold text-white">
            Try These Examples:
          </h4>
          <div className="space-y-3">
            {examples.map((example, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => tryExample(example)}
                disabled={isCompleted}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  currentExample === index
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/10 bg-white/[0.04] hover:border-purple-400/50 hover:bg-white/[0.08]'
                } ${isCompleted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">
                      £{example.amount} at {example.rate}% = £{example.result}
                    </div>
                    <div className="text-sm text-[#9a9a9d]">{example.description}</div>
                  </div>
                  <div className="text-2xl">🧮</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="text-center">
        {attempts > 0 && (
          <p className="mb-2 text-sm text-[#9a9a9d]">
            Attempts: {attempts}
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!isCompleted ? (
          <Button
            onClick={resetCalculator}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Reset Calculator 🔄
          </Button>
        ) : (
          <Button
            onClick={resetCalculator}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold text-lg"
          >
            Try Again! 🎮
          </Button>
        )}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-xl border border-green-400/30 bg-green-500/10 p-6 text-center"
          >
            <div className="text-4xl mb-4">🎉</div>
            <h4 className="mb-2 text-2xl font-bold text-white">Excellent!</h4>
            <p className="mb-2 text-lg text-[#e5e5e7]">
              You calculated the percentage correctly!
            </p>
            <p className="text-sm text-[#9a9a9d]">
              You're getting the hang of financial calculations!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
