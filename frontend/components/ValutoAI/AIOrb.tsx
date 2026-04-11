"use client";

import { motion } from "framer-motion";

interface AIOrbProps {
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function AIOrb({ isActive = false, size = "lg" }: AIOrbProps) {
  const sizeMap = { sm: "w-12 h-12", md: "w-20 h-20", lg: "w-32 h-32" };
  const ringSize = { sm: "w-16 h-16", md: "w-28 h-28", lg: "w-44 h-44" };
  const outerRing = { sm: "w-20 h-20", md: "w-36 h-36", lg: "w-56 h-56" };

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className={`absolute ${outerRing[size]} rounded-full`}
        style={{
          background: "radial-gradient(circle, hsla(155,80%,45%,0.08) 0%, transparent 70%)",
        }}
        animate={{
          scale: isActive ? [1, 1.15, 1] : [1, 1.05, 1],
          opacity: isActive ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
        }}
        transition={{ duration: isActive ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className={`absolute ${ringSize[size]} rounded-full border`}
        style={{ borderColor: "hsla(155,80%,45%,0.15)" }}
        animate={{
          scale: isActive ? [1, 1.1, 1] : [1, 1.03, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: isActive ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      />

      <motion.div
        className={`${sizeMap[size]} relative rounded-full`}
        style={{
          background: "radial-gradient(circle at 35% 35%, hsl(155,80%,55%), hsl(155,80%,35%), hsl(155,60%,20%))",
        }}
        animate={{
          scale: isActive ? [1, 1.12, 1] : [1, 1.06, 1],
          boxShadow: isActive
            ? [
                "0 0 40px hsla(155,80%,45%,0.5), 0 0 80px hsla(155,80%,45%,0.25)",
                "0 0 60px hsla(155,80%,45%,0.7), 0 0 120px hsla(155,80%,45%,0.4)",
                "0 0 40px hsla(155,80%,45%,0.5), 0 0 80px hsla(155,80%,45%,0.25)",
              ]
            : [
                "0 0 30px hsla(155,80%,45%,0.3), 0 0 60px hsla(155,80%,45%,0.1)",
                "0 0 45px hsla(155,80%,45%,0.4), 0 0 90px hsla(155,80%,45%,0.15)",
                "0 0 30px hsla(155,80%,45%,0.3), 0 0 60px hsla(155,80%,45%,0.1)",
              ],
        }}
        transition={{ duration: isActive ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, hsla(155,90%,70%,0.4), transparent 60%)",
          }}
        />
      </motion.div>
    </div>
  );
}
