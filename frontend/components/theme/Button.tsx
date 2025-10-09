import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-valuto-green-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-valuto-green-600 hover:bg-valuto-green-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm hover:shadow-md',
    outline: 'border-2 border-valuto-green-600 text-valuto-green-600 hover:bg-valuto-green-50 hover:border-valuto-green-700',
    ghost: 'text-valuto-green-600 hover:bg-valuto-green-50 hover:text-valuto-green-700'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}

