"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import {
  Send,
  ArrowLeft,
  Sparkles,
  Calculator,
  TrendingUp,
  FileText,
  Newspaper,
} from "lucide-react";
import ParticleField from "@/components/ValutoAI/ParticleField";
import AIOrb from "@/components/ValutoAI/AIOrb";
import ChatMessage from "@/components/ValutoAI/ChatMessage";
import TypingIndicator from "@/components/ValutoAI/TypingIndicator";
import SuggestionChip from "@/components/ValutoAI/SuggestionChip";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  { icon: "💷", text: "Break down a UK payslip for me." },
  { icon: "📊", text: "How much tax would I pay on £28,000?" },
  { icon: "📈", text: "Explain compound interest simply." },
  { icon: "💳", text: "Is Buy Now Pay Later a bad idea?" },
  { icon: "🏦", text: "What's a good savings rate at 18?" },
];

const MODES = [
  { icon: <Calculator className="h-4 w-4" />, label: "Tax Calc", prefix: "Calculate: " },
  { icon: <TrendingUp className="h-4 w-4" />, label: "Investing", prefix: "Explain this investment scenario: " },
  { icon: <FileText className="h-4 w-4" />, label: "Payslip", prefix: "Break down this payslip: " },
  { icon: <Newspaper className="h-4 w-4" />, label: "News", prefix: "Explain this headline for young people: " },
];

export default function ValutoAI() {
  const { getToken } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSend = useCallback(
    async (text?: string) => {
      const msg = text || input.trim();
      if (!msg || isTyping) return;

      const fullMsg = activeMode
        ? `${MODES.find((mode) => mode.label === activeMode)?.prefix || ""}${msg}`
        : msg;

      const nextHistory = [...messages, { role: "user" as const, content: msg }];

      setChatStarted(true);
      setInput("");
      setActiveMode(null);
      setMessages((previous) => [...previous, { role: "user", content: msg }]);
      setIsTyping(true);

      try {
        const token = await getToken({ template: "default" });
        if (!token) {
          throw new Error("Please sign in to use Valuto AI.");
        }

        const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const history = nextHistory.slice(-10).map((message) => ({
          role: message.role,
          text: message.content,
        }));

        const response = await fetch(`${apiBaseUrl}/api/ai/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: fullMsg,
            history,
          }),
        });

        const data = await response.json();
        if (!response.ok || !data?.success) {
          const errorMessage =
            data?.message ||
            (response.status === 429
              ? "Daily limit reached. Try again tomorrow."
              : "Something went wrong. Please try again.");
          throw new Error(errorMessage);
        }

        const responseText = data.data?.message || "Sorry, I could not generate a response.";
        setMessages((previous) => [...previous, { role: "assistant", content: responseText }]);
      } catch (error: any) {
        setMessages((previous) => [
          ...previous,
          {
            role: "assistant",
            content: error?.message || "Unable to reach Valuto AI right now.",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [activeMode, getToken, input, isTyping, messages]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#07110d] text-white">
      <ParticleField />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, hsla(155,80%,45%,0.04) 0%, transparent 60%)",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 80%, hsla(43,90%,55%,0.02) 0%, transparent 50%)",
        }}
      />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex items-center justify-between border-b border-white/10 px-5 py-4"
        style={{ background: "hsla(220,20%,7%,0.8)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          {chatStarted ? (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => {
                setChatStarted(false);
                setMessages([]);
                setActiveMode(null);
              }}
              className="rounded-lg p-1.5 text-[#8ea097] transition-colors hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
          ) : null}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10">
              <Sparkles className="h-4 w-4 text-emerald-300" />
            </div>
            <div>
              <h1 className="font-display text-sm font-semibold tracking-tight text-white">Valuto AI</h1>
              <p className="text-[10px] font-medium text-emerald-300">Financial Intelligence</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[10px] text-[#8ea097]">Online</span>
        </div>
      </motion.header>

      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {!chatStarted ? (
            <motion.div
              key="entry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <AIOrb isActive={false} size="lg" />
              </motion.div>

              <div className="max-w-md space-y-2 text-center">
                <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                  Your Personal Financial Intelligence.
                </h2>
                <p className="text-sm text-[#8ea097]">
                  Ask anything about money. UK-focused. No judgement.
                </p>
              </div>

              <div className="flex max-w-md flex-wrap justify-center gap-2">
                {MODES.map((mode) => (
                  <motion.button
                    key={mode.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveMode(mode.label);
                      inputRef.current?.focus();
                    }}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all ${
                      activeMode === mode.label
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                        : "border-white/10 bg-white/[0.04] text-[#8ea097] hover:border-emerald-500/30 hover:text-white"
                    }`}
                  >
                    {mode.icon}
                    {mode.label}
                  </motion.button>
                ))}
              </div>

              <div className="grid w-full max-w-md gap-2">
                {SUGGESTIONS.map((suggestion, index) => (
                  <SuggestionChip
                    key={suggestion.text}
                    text={suggestion.text}
                    icon={suggestion.icon}
                    delay={0.1 + index * 0.08}
                    onClick={() => handleSend(suggestion.text)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 overflow-y-auto px-4 py-4"
            >
              <div className="mb-6 flex justify-center">
                <AIOrb isActive={isTyping} size="sm" />
              </div>

              {messages.map((message, index) => (
                <ChatMessage key={`${message.role}-${index}`} role={message.role} content={message.content} />
              ))}
              {isTyping ? <TypingIndicator /> : null}
              <div ref={chatEndRef} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 border-t border-white/10 p-4"
          style={{ background: "hsla(220,20%,7%,0.9)", backdropFilter: "blur(20px)" }}
        >
          {activeMode ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-2 flex items-center gap-2 px-1"
            >
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                {activeMode} Mode
              </span>
              <button
                onClick={() => setActiveMode(null)}
                className="text-[10px] text-[#8ea097] transition-colors hover:text-white"
              >
                ✕ Clear
              </button>
            </motion.div>
          ) : null}

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#101816]/90 px-4 py-2.5 transition-colors focus-within:border-emerald-500/40">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={activeMode ? `Enter ${activeMode.toLowerCase()} query...` : "Ask Valuto AI anything..."}
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#7f9188]"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="rounded-lg bg-emerald-500 p-2 text-[#04120c] transition-all hover:bg-emerald-400 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-30"
              style={{ boxShadow: input.trim() ? "0 0 20px hsla(155,80%,45%,0.3)" : "none" }}
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
          <p className="mt-2 text-center text-[9px] text-[#8ea097] opacity-50">
            Valuto AI provides educational guidance, not financial advice.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
