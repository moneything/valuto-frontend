import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  title?: string;
}

export default function Card({ 
  children, 
  className = "", 
  hover = true,
  gradient = false,
  padding = 'md',
  title
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const baseClasses = `
    rounded-2xl border border-white/10 bg-[#232324]/95 text-white backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.28)]
    ${hover ? 'hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.38)] transition-all duration-300' : ''}
    ${gradient ? 'bg-gradient-to-br from-[#232324] via-[#1d1d1f] to-[#16211b]' : ''}
    ${paddingClasses[padding]}
    ${className}
  `;

  return (
    <div className={baseClasses} title={title}>
      {children}
    </div>
  );
}
