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
    green: 'text-valuto-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600'
  };

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-valuto-green-100 ${className}`}>
      <div className="text-center">
        {icon && (
          <div className="text-4xl mb-4 flex justify-center">
            {icon}
          </div>
        )}
        <div className={`text-5xl font-numbers ${colorClasses[color]} mb-2`}>
          {value}
        </div>
        <p className="text-sm text-gray-500 font-medium">
          {label}
        </p>
      </div>
    </div>
  );
}

