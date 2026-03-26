import { ReactNode } from 'react';

interface StatsCardProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  className?: string;
  color?: 'green' | 'blue' | 'purple' | 'orange';
}

export default function StatsCard({ 
  value, 
  label, 
  icon,
  className = '',
  color = 'green'
}: StatsCardProps) {
  const colorClasses = {
    green: 'text-primary',
    blue: 'text-blue-400',
    purple: 'text-violet-400',
    orange: 'text-orange-400'
  };

  return (
    <div className={`rounded-2xl border border-white/10 bg-[#232324]/95 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)] transition-all duration-300 hover:shadow-[0_28px_70px_rgba(0,0,0,0.38)] ${className}`}>
      <div className="text-center">
        {icon && (
          <div className="text-4xl mb-4 flex justify-center">
            {icon}
          </div>
        )}
        <div className={`text-5xl font-numbers ${colorClasses[color]} mb-2`}>
          {value}
        </div>
        <p className="text-sm font-medium text-[#9a9a9d]">
          {label}
        </p>
      </div>
    </div>
  );
}
