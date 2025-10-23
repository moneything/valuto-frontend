"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/theme/Button';

interface MatchingItem {
  id: string;
  text: string;
  emoji?: string;
}

interface MatchingGameProps {
  terms: MatchingItem[];
  definitions: MatchingItem[];
  onComplete: (score: number) => void;
  title: string;
  description: string;
}

export default function MatchingGame({ terms, definitions, onComplete, title, description }: MatchingGameProps) {
  const [selectedTerm, setSelectedTerm] = useState<MatchingItem | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<MatchingItem | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Shuffle definitions to make it more challenging
  const [shuffledDefinitions, setShuffledDefinitions] = useState<MatchingItem[]>([]);

  // Color palette for different matches
  const matchColors = [
    { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-900' },
    { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-900' },
    { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-900' },
    { bg: 'bg-pink-100', border: 'border-pink-500', text: 'text-pink-900' },
    { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-900' },
    { bg: 'bg-indigo-100', border: 'border-indigo-500', text: 'text-indigo-900' },
    { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-900' },
    { bg: 'bg-teal-100', border: 'border-teal-500', text: 'text-teal-900' },
  ];

  useEffect(() => {
    setShuffledDefinitions([...definitions].sort(() => Math.random() - 0.5));
  }, [definitions]);

  const handleTermClick = (term: MatchingItem) => {
    if (matches[term.id]) return; // Already matched
    
    if (selectedTerm?.id === term.id) {
      // Deselect if clicking the same term
      setSelectedTerm(null);
    } else if (selectedDefinition) {
      // If a definition is already selected, try to match
      const isCorrect = term.id === selectedDefinition.id;
      if (isCorrect) {
        setMatches(prev => ({
          ...prev,
          [term.id]: selectedDefinition.id
        }));
        setScore(prev => prev + 1);
      } else {
        setAttempts(prev => prev + 1);
      }
      setSelectedTerm(null);
      setSelectedDefinition(null);
    } else {
      // Select this term
      setSelectedTerm(term);
    }
  };

  const handleDefinitionClick = (definition: MatchingItem) => {
    if (Object.values(matches).includes(definition.id)) return; // Already matched
    
    if (selectedDefinition?.id === definition.id) {
      // Deselect if clicking the same definition
      setSelectedDefinition(null);
    } else if (selectedTerm) {
      // If a term is already selected, try to match
      const isCorrect = selectedTerm.id === definition.id;
      if (isCorrect) {
        setMatches(prev => ({
          ...prev,
          [selectedTerm.id]: definition.id
        }));
        setScore(prev => prev + 1);
      } else {
        setAttempts(prev => prev + 1);
      }
      setSelectedTerm(null);
      setSelectedDefinition(null);
    } else {
      // Select this definition
      setSelectedDefinition(definition);
    }
  };

  const handleMarkComplete = () => {
    if (Object.keys(matches).length === terms.length) {
      setIsCompleted(true);
      setShowFeedback(true);
      const finalScore = Math.round((score / terms.length) * 100);
      setTimeout(() => {
        onComplete(finalScore);
      }, 2000);
    }
  };

  const resetGame = () => {
    setMatches({});
    setScore(0);
    setIsCompleted(false);
    setShowFeedback(false);
    setAttempts(0);
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setShuffledDefinitions([...definitions].sort(() => Math.random() - 0.5));
  };

  // Get the color for a matched pair based on match index
  const getMatchColor = (itemId: string) => {
    const matchedTerms = Object.keys(matches);
    const matchIndex = matchedTerms.indexOf(itemId);
    if (matchIndex >= 0) {
      return matchColors[matchIndex % matchColors.length];
    }
    // For definitions, find the term that matches this definition
    const termId = Object.keys(matches).find(key => matches[key] === itemId);
    if (termId) {
      const matchIndex = Object.keys(matches).indexOf(termId);
      return matchColors[matchIndex % matchColors.length];
    }
    return null;
  };

  const getItemClass = (item: MatchingItem, isTerm: boolean) => {
    const isMatched = isTerm ? matches[item.id] : Object.values(matches).includes(item.id);
    const isSelected = isTerm ? selectedTerm?.id === item.id : selectedDefinition?.id === item.id;
    
    if (isMatched) {
      const matchColor = getMatchColor(item.id);
      if (matchColor) {
        return `${matchColor.bg} ${matchColor.border} ${matchColor.text}`;
      }
      return 'bg-green-100 border-green-500 text-green-800';
    } else if (isSelected) {
      return 'bg-blue-100 border-blue-500 text-blue-800';
    } else {
      return 'bg-white border-gray-200 hover:border-indigo-400 hover:bg-indigo-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-lg text-gray-700">{description}</p>
        <p className="text-sm text-gray-600 mt-2">💡 Click a term, then click its matching definition. Each correct match gets a unique color!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Terms */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">Terms</h4>
          <div className="space-y-3">
            {terms.map((term) => (
              <motion.div
                key={term.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTermClick(term)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${getItemClass(term, true)}`}
              >
                <div className="flex items-center gap-3">
                  {term.emoji && <span className="text-2xl">{term.emoji}</span>}
                  <span className="font-medium">{term.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Definitions */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">Definitions</h4>
          <div className="space-y-3">
            {shuffledDefinitions.map((definition) => (
              <motion.div
                key={definition.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDefinitionClick(definition)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${getItemClass(definition, false)}`}
              >
                <div className="flex items-center gap-3">
                  {definition.emoji && <span className="text-2xl">{definition.emoji}</span>}
                  <span className="font-medium">{definition.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="text-center">
        <div className="bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(Object.keys(matches).length / terms.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600">
          {Object.keys(matches).length} of {terms.length} matches completed
        </p>
        {attempts > 0 && (
          <p className="text-sm text-orange-600 mt-1">
            Attempts: {attempts}
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!isCompleted ? (
          <>
            <Button
              onClick={handleMarkComplete}
              disabled={Object.keys(matches).length !== terms.length}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mark as Complete! ✅
            </Button>
            <Button
              onClick={resetGame}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Reset Game 🔄
            </Button>
          </>
        ) : (
          <Button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold text-lg"
          >
            Play Again! 🎮
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
            className={`text-center p-6 rounded-xl ${
              score >= 80 ? 'bg-green-50 border border-green-200' : 
              score >= 60 ? 'bg-yellow-50 border border-yellow-200' : 
              'bg-red-50 border border-red-200'
            }`}
          >
            <div className="text-4xl mb-4">
              {score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪'}
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">
              {score >= 80 ? 'Perfect Match!' : score >= 60 ? 'Great Job!' : 'Keep Learning!'}
            </h4>
            <p className="text-lg text-gray-700 mb-2">
              You matched {score}% of the terms correctly!
            </p>
            <p className="text-sm text-gray-600">
              {score >= 80 ? 'You really know your financial terms!' : 
               score >= 60 ? 'You\'re getting the hang of it!' : 
               'Practice makes perfect - try again!'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
