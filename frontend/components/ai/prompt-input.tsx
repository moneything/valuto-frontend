"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PaperAirplaneIcon } from "@/components/icons";

interface PromptInputProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  onSend?: (value: string) => void;
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export function PromptInput({
  className,
  onSend,
  value,
  onChange,
  isLoading = false,
  placeholder = "Ask me anything about money, investing, or personal finance...",
  ...props
}: PromptInputProps) {
  const textareaRef = React.useRef<HTMLTextareaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextareaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading && onSend) {
        onSend(value);
      }
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 100) + "px";
    }
  };

  React.useEffect(() => {
    handleInput();
  }, [value]);

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-valuto-green-200/50 rounded-2xl p-3 shadow-xl flex-shrink-0 green-card-hover">
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className={cn(
              "w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-valuto-green-200/50 rounded-xl",
              "focus:ring-2 focus:ring-valuto-green-500/50 focus:border-valuto-green-500/50",
              "outline-none resize-none transition-all duration-200",
              "placeholder-valuto-green-500 text-gray-900 font-medium text-sm",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
            style={{ minHeight: "44px", maxHeight: "100px" }}
            {...props}
          />
        </div>
        <button
          onClick={() => value.trim() && !isLoading && onSend && onSend(value)}
          disabled={!value.trim() || isLoading}
          className={cn(
            "w-11 h-11 bg-gradient-to-br from-valuto-green-500 to-valuto-green-600",
            "hover:from-valuto-green-600 hover:to-valuto-green-700",
            "disabled:from-gray-300 disabled:to-gray-400",
            "text-white rounded-xl flex items-center justify-center",
            "shadow-lg hover:shadow-xl transition-all duration-200",
            "disabled:cursor-not-allowed green-glow"
          )}
        >
          <PaperAirplaneIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

