"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The speed of the marquee animation in seconds
   * @default 30
   */
  duration?: number;
  /**
   * Whether to reverse the direction of the marquee
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the marquee on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * The number of times to repeat the children
   * @default 2
   */
  repeat?: number;
}

export function Marquee({
  className,
  duration = 30,
  reverse = false,
  pauseOnHover = false,
  repeat = 2,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--duration:30s] [--gap:1rem]",
        className
      )}
      style={
        {
          "--duration": `${duration}s`,
        } as React.CSSProperties
      }
      {...props}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around gap-[var(--gap)]",
            "animate-marquee",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

