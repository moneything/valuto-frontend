"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GameSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { icon: '🏠', label: 'Dashboard', href: '/dashboard' },
    { icon: '🎮', label: 'Trivia', href: '/dashboard/trivia' },
    { icon: '💰', label: 'Calculator', href: '/dashboard/calculator' },
    { icon: '📚', label: 'Learn', href: '/dashboard/learn' },
    { icon: '👤', label: 'Profile', href: '/dashboard/profile' },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-md shadow-xl border-r border-gray-200 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-valuto-green-600 text-white rounded-full p-1.5 shadow-lg hover:bg-valuto-green-700 transition-colors"
      >
        <svg
          className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-valuto-green-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">V</span>
          </div>
          {!isCollapsed && (
            <span className="font-bold text-gray-900 font-serif">Valuto</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-valuto-green-100 text-valuto-green-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Quick Stats (when expanded) */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-br from-valuto-green-50 to-white">
          <div className="text-xs text-gray-600 mb-1">Quick Stats</div>
          <div className="flex justify-between text-sm">
            <span>Points:</span>
            <span className="font-bold text-valuto-green-600">2,450</span>
          </div>
        </div>
      )}
    </div>
  );
}

