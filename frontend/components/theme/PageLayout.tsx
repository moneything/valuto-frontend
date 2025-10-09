import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  icon?: ReactNode;
  className?: string;
}

export default function PageLayout({ 
  children, 
  title, 
  subtitle, 
  icon,
  className = "" 
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-valuto-green-50 via-white to-valuto-green-50">
      <div className={`w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 ${className}`}>
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            {icon && (
              <div className="text-5xl mr-4">
                {icon}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              {title}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

