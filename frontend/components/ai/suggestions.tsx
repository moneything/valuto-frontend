"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SuggestionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function Suggestions({ 
  suggestions, 
  onSelect, 
  className, 
  ...props 
}: SuggestionsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 px-4 py-3",
        className
      )}
      {...props}
    >
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className={cn(
            "px-4 py-2 bg-white/70 backdrop-blur-sm",
            "border border-valuto-green-200/50 rounded-full",
            "text-sm font-medium text-gray-700",
            "hover:bg-valuto-green-50 hover:border-valuto-green-300",
            "transition-all duration-200 hover:shadow-md",
            "green-card-hover"
          )}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}

