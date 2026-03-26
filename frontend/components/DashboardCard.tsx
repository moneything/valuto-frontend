import Link from 'next/link';
import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: string | ReactNode;
  href: string;
  color?: string;
  badge?: string;
}

export default function DashboardCard({
  title,
  description,
  icon,
  href,
  color = 'from-valuto-green-600 to-valuto-green-700',
  badge
}: DashboardCardProps) {
  return (
    <Link href={href}>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#232324]/95 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(0,0,0,0.38)]">
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl animate-border-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-[1px] rounded-2xl bg-[#232324]"></div>
        
        {/* Background gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 right-4 z-10 rounded-full bg-primary/15 px-3 py-1 text-sm font-semibold text-primary">
            {badge}
          </div>
        )}
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon - Centered */}
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-white/[0.05] to-primary/10 transition-transform group-hover:scale-110">
              {typeof icon === 'string' ? (
                <span className="text-4xl">{icon}</span>
              ) : (
                <div className="text-primary">
                  {icon}
                </div>
              )}
            </div>
          </div>
          
          {/* Title - Centered */}
          <h3 className="mb-3 text-center text-xl font-bold leading-tight text-white transition-colors group-hover:text-primary">
            {title}
          </h3>
          
          {/* Description - Centered */}
          <p className="mb-6 flex-grow text-center text-sm leading-relaxed text-[#9a9a9d]">
            {description}
          </p>
          
          {/* Arrow icon - Centered */}
          <div className="mt-auto flex items-center justify-center text-sm font-semibold text-primary">
            <span className="group-hover:translate-x-1 transition-transform">
              Get Started
            </span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
