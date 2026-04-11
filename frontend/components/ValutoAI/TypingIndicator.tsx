"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mb-4 flex justify-start"
    >
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-bl-md px-5 py-3"
        style={{
          background: "hsla(220,18%,10%,0.85)",
          backdropFilter: "blur(30px)",
          border: "1px solid hsla(155,80%,45%,0.1)",
        }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="h-2 w-2 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
