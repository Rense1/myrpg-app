import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses = {
  primary:   'bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold',
  secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
  danger:    'bg-red-600 hover:bg-red-500 text-white font-bold',
  ghost:     'bg-transparent hover:bg-gray-800 text-gray-300 border border-gray-700',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2.5 text-base rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-xl w-full',
};

export function Button({ variant = 'primary', size = 'md', className = '', disabled, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
