'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Animation speed
   * @default 'normal'
   */
  speed?: 'slow' | 'normal' | 'fast';
  /**
   * Intensity of the effect
   * @default 'medium'
   */
  intensity?: 'subtle' | 'medium' | 'strong';
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className,
  speed = 'normal',
  intensity = 'medium',
  children,
  ...props
}) => {
  const speedClass = {
    slow: '[animation-duration:60s]',
    normal: '[animation-duration:40s]',
    fast: '[animation-duration:20s]',
  }[speed];

  const intensityOpacity = {
    subtle: 'opacity-30',
    medium: 'opacity-50',
    strong: 'opacity-70',
  }[intensity];

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)} {...props}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-valuto-green-50 via-white to-valuto-green-50" />
      
      {/* Aurora layer 1 - Main flow */}
      <div
        className={cn(
          'absolute inset-0 animate-aurora-1',
          speedClass,
          intensityOpacity
        )}
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(22, 163, 74, 0.3), transparent),
            radial-gradient(ellipse 60% 50% at 20% 40%, rgba(34, 197, 94, 0.2), transparent),
            radial-gradient(ellipse 50% 80% at 80% 50%, rgba(134, 239, 172, 0.2), transparent)
          `,
        }}
      />
      
      {/* Aurora layer 2 - Secondary flow */}
      <div
        className={cn(
          'absolute inset-0 animate-aurora-2',
          speedClass,
          intensityOpacity
        )}
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 30% 60%, rgba(22, 163, 74, 0.2), transparent),
            radial-gradient(ellipse 70% 50% at 70% 30%, rgba(21, 128, 61, 0.15), transparent)
          `,
        }}
      />
      
      {/* Aurora layer 3 - Accent highlights */}
      <div
        className={cn(
          'absolute inset-0 animate-aurora-3',
          speedClass,
          intensityOpacity
        )}
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 60% 70%, rgba(134, 239, 172, 0.15), transparent),
            radial-gradient(ellipse 40% 50% at 40% 20%, rgba(187, 247, 208, 0.1), transparent)
          `,
        }}
      />

      {/* Shimmer overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent animate-shimmer" />
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default AuroraBackground;

