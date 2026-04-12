"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  lesson: string | null;
  onDismiss: () => void;
}

export default function LessonToast({ lesson, onDismiss }: Props) {
  useEffect(() => {
    if (!lesson) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, 1400);

    return () => clearTimeout(timer);
  }, [lesson, onDismiss]);

  return (
    <AnimatePresence>
      {lesson ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4"
        >
          <div className="rounded-xl border border-emerald-400/24 bg-[rgba(27,31,39,0.98)] p-4 shadow-[0_0_18px_rgba(16,185,129,0.14)] backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{lesson}</p>
              </div>
              <button onClick={onDismiss} className="text-sm text-[#94a8a0] hover:text-white">
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
