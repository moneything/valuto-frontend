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
      <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full flex flex-col">
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl animate-border-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
        
        {/* Background gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 right-4 bg-valuto-green-100 text-valuto-green-700 text-xs font-semibold px-3 py-1 rounded-full z-10">
            {badge}
          </div>
        )}
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon - Centered */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-valuto-green-50 to-valuto-green-100 group-hover:scale-110 transition-transform">
              {typeof icon === 'string' ? (
                <span className="text-4xl">{icon}</span>
              ) : (
                <div className="text-valuto-green-600">
                  {icon}
                </div>
              )}
            </div>
          </div>
          
          {/* Title - Centered */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-valuto-green-600 transition-colors text-center leading-tight">
            {title}
          </h3>
          
          {/* Description - Centered */}
          <p className="text-gray-600 text-sm leading-relaxed text-center mb-6 flex-grow">
            {description}
          </p>
          
          {/* Arrow icon - Centered */}
          <div className="flex items-center justify-center text-valuto-green-600 font-semibold text-sm mt-auto">
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

