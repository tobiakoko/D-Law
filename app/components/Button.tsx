import React from 'react';
import { cn } from '~/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  icon?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  icon = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = "font-raleway font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: `
      bg-primary text-white hover:bg-primary/90 
      focus:ring-primary disabled:bg-gray-300 disabled:text-gray-500
      active:bg-primary/80
    `,
    secondary: `
      border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 
      focus:ring-gray-300 disabled:bg-gray-100 disabled:text-gray-400
      active:bg-gray-100
    `,
    text: `
      text-primary hover:text-primary/80 hover:underline
      focus:ring-primary disabled:text-gray-400
    `
  };

  const sizeClasses = {
    small: icon ? "px-2 py-1 text-sm" : "px-3 py-1.5 text-sm",
    medium: icon ? "px-3 py-2 text-base" : "px-4 py-2 text-base",
    large: icon ? "px-4 py-3 text-lg" : "px-6 py-3 text-lg"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClass,
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};