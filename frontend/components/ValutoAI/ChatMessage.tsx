"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export default function ChatMessage({
  role,
  content,
  isStreaming,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-md border border-emerald-500/30 bg-emerald-500/12 text-white"
            : "rounded-bl-md text-white"
        }`}
        style={
          !isUser
            ? {
                background: "hsla(220,18%,10%,0.85)",
                backdropFilter: "blur(30px)",
                border: "1px solid hsla(155,80%,45%,0.1)",
              }
            : undefined
        }
      >
        {isUser ? (
          <p>{content}</p>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none text-[#d8e2dc] [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-emerald-300 [&_h1]:text-lg [&_h1]:text-white [&_h2]:text-base [&_h2]:text-white [&_h3]:text-sm [&_h3]:text-white [&_ul]:my-1 [&_li]:my-0.5 [&_code]:rounded [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-emerald-300 [&_blockquote]:border-l-2 [&_blockquote]:border-emerald-500/40 [&_blockquote]:pl-3 [&_blockquote]:text-[#b8c6be]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            {isStreaming ? (
              <motion.span
                className="ml-0.5 inline-block h-4 w-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            ) : null}
          </div>
        )}
      </div>
    </motion.div>
  );
}
