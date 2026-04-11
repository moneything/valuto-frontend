"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  lesson: string | null;
  onDismiss: () => void;
}

export default function LessonToast({ lesson, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {lesson ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4"
        >
          <div className="rounded-xl border border-emerald-400/30 bg-[rgba(10,16,14,0.92)] p-4 shadow-[0_0_24px_rgba(52,211,153,0.18)] backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{lesson}</p>
              </div>
              <button onClick={onDismiss} className="text-sm text-[#8ea097] hover:text-white">
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
