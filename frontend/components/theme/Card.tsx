import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({ 
  children, 
  className = "", 
  hover = true,
  gradient = false,
  padding = 'md'
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const baseClasses = `
    bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-valuto-green-100
    ${hover ? 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300' : ''}
    ${gradient ? 'bg-gradient-to-br from-valuto-green-50 to-white' : ''}
    ${paddingClasses[padding]}
    ${className}
  `;

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}

