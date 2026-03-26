"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/theme/Button';

interface DragItem {
  emoji: string;
  name: string;
  category: string;
  id: string;
}

interface DragDropGameProps {
  items: DragItem[];
  onComplete: (score: number) => void;
  title: string;
  description: string;
}

export default function DragDropGame({ items, onComplete, title, description }: DragDropGameProps) {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [droppedItems, setDroppedItems] = useState<Record<string, DragItem[]>>({
    needs: [],
    wants: [],
    savings: []
  });
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const categories = [
    { id: 'needs', name: 'Needs', emoji: '🎯', color: 'bg-red-50 border-red-200' },
    { id: 'wants', name: 'Wants', emoji: '🎮', color: 'bg-blue-50 border-blue-200' },
    { id: 'savings', name: 'Savings', emoji: '💰', color: 'bg-green-50 border-green-200' }
  ];

  const remainingItems = items.filter(item => 
    !Object.values(droppedItems).flat().some(dropped => dropped.id === item.id)
  );

  const handleDragStart = (item: DragItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    if (draggedItem) {
      setDroppedItems(prev => ({
        ...prev,
        [categoryId]: [...prev[categoryId], draggedItem]
      }));
      setDraggedItem(null);
    }
  };

  const handleItemClick = (item: DragItem) => {
    if (draggedItem) return;
    setDraggedItem(item);
  };

  const handleCategoryClick = (categoryId: string) => {
    if (draggedItem) {
      setDroppedItems(prev => ({
        ...prev,
        [categoryId]: [...prev[categoryId], draggedItem]
      }));
      setDraggedItem(null);
    }
  };

  const checkAnswers = () => {
    let correct = 0;
    let total = 0;

    Object.entries(droppedItems).forEach(([categoryId, items]) => {
      items.forEach(item => {
        total++;
        if (item.category === categoryId) {
          correct++;
        }
      });
    });

    const newScore = total > 0 ? Math.round((correct / total) * 100) : 0;
    setScore(newScore);
    setShowFeedback(true);
    setIsCompleted(true);
    
    setTimeout(() => {
      onComplete(newScore);
    }, 2000);
  };

  const resetGame = () => {
    setDroppedItems({ needs: [], wants: [], savings: [] });
    setScore(0);
    setIsCompleted(false);
    setShowFeedback(false);
    setDraggedItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
        <p className="text-lg text-[#d7d7db]">{description}</p>
      </div>

      {/* Items to drag */}
      <div className="rounded-xl bg-white/[0.04] p-6">
        <h4 className="mb-4 text-center text-lg font-semibold text-white">Drag these items to the right categories:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {remainingItems.map((item) => (
            <motion.div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              onClick={() => handleItemClick(item)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-lg border-2 border-dashed border-white/15 bg-white/[0.04] p-4 text-center cursor-pointer transition-all hover:border-indigo-400/60 hover:bg-white/[0.08] ${
                draggedItem?.id === item.id ? 'opacity-50' : ''
              }`}
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="text-sm font-semibold text-white">{item.name}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Drop zones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category.id)}
            onClick={() => handleCategoryClick(category.id)}
            className={`${category.color} border-2 border-dashed rounded-xl p-6 min-h-[200px] transition-all ${
              draggedItem ? 'border-solid border-indigo-400' : ''
            }`}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{category.emoji}</div>
              <h4 className="text-lg font-bold text-gray-900">{category.name}</h4>
            </div>
            
            <div className="space-y-2">
              <AnimatePresence>
                {droppedItems[category.id].map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] p-3"
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-sm font-medium text-white">{item.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDroppedItems(prev => ({
                          ...prev,
                          [category.id]: prev[category.id].filter(i => i.id !== item.id)
                        }));
                      }}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!isCompleted ? (
          <Button
            onClick={checkAnswers}
            disabled={remainingItems.length > 0}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg"
          >
            Check My Answers! 🎯
          </Button>
        ) : (
          <Button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold text-lg"
          >
            Play Again! 🔄
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
            className={`rounded-xl p-6 text-center ${
              score >= 80 ? 'border border-green-400/30 bg-green-500/10' : 
              score >= 60 ? 'border border-yellow-400/30 bg-yellow-500/10' : 
              'border border-red-400/30 bg-red-500/10'
            }`}
          >
            <div className="text-4xl mb-4">
              {score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪'}
            </div>
            <h4 className="mb-2 text-2xl font-bold text-white">
              {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Learning!'}
            </h4>
            <p className="mb-2 text-lg text-[#e5e5e7]">
              You scored {score}% on this activity!
            </p>
            <p className="text-sm text-[#9a9a9d]">
              {score >= 80 ? 'You really understand budgeting categories!' : 
               score >= 60 ? 'You\'re getting the hang of it!' : 
               'Practice makes perfect - try again!'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
