"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ConversationProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Conversation({ className, children, ...props }: ConversationProps) {
  return (
    <div className={cn("flex flex-col flex-1 min-h-0", className)} {...props}>
      {children}
    </div>
  );
}

interface ConversationContentProps extends React.HTMLAttributes<HTMLDivElement> {
  autoScroll?: boolean;
}

export function ConversationContent({ 
  className, 
  children, 
  autoScroll = true,
  ...props 
}: ConversationContentProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (autoScroll && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [children, autoScroll]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex-1 overflow-y-auto space-y-4 py-4",
        "scrollbar-thin scrollbar-thumb-valuto-green-200 scrollbar-track-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

