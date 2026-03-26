"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  from: "user" | "assistant" | "system";
}

export function Message({ from, className, children, ...props }: MessageProps) {
  return (
    <div
      className={cn(
        "flex animate-fadeIn",
        from === "user" ? "justify-end" : "justify-start",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface MessageContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MessageContent({ className, children, ...props }: MessageContentProps) {
  return (
    <div className={cn("max-w-[80%]", className)} {...props}>
      {children}
    </div>
  );
}

interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "user" | "assistant";
}

export function MessageBubble({ 
  variant = "assistant", 
  className, 
  children, 
  ...props 
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl px-5 py-3 shadow-lg backdrop-blur-sm",
        variant === "user"
          ? "bg-gradient-to-br from-valuto-green-500 to-valuto-green-600 text-white green-glow"
          : "border border-white/10 bg-[#232324]/95 text-[#e5e5e7] green-card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
