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
        className={`${
          isUser ? "max-w-[72%] sm:max-w-[68%]" : "max-w-[78%] sm:max-w-[720px]"
        } rounded-2xl px-4 py-3 text-sm leading-relaxed sm:px-5 sm:py-4 ${
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
          <p className="leading-7">{content}</p>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none text-[15px] leading-7 text-[#d8e2dc] sm:text-[15px] [&_p]:my-0 [&_p]:leading-7 [&_p+*]:mt-4 [&_strong]:font-semibold [&_strong]:text-white [&_h1]:mb-3 [&_h1]:mt-0 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-white [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white [&_ul]:my-3 [&_ul]:space-y-1.5 [&_ol]:my-3 [&_ol]:space-y-1.5 [&_li]:pl-1 [&_li]:marker:text-emerald-300 [&_hr]:my-5 [&_hr]:border-white/10 [&_code]:rounded-md [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.92em] [&_code]:text-emerald-300 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-[#0b1411] [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-emerald-500/40 [&_blockquote]:pl-4 [&_blockquote]:text-[#b8c6be] [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_thead]:border-b [&_thead]:border-white/10 [&_tr]:border-b [&_tr]:border-white/5 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-white [&_td]:px-3 [&_td]:py-2">
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
