import React from 'react';
import { cn } from '~/lib/utils';


interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isValid?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  isValid,
  className,
  ...props
}) => {
  const inputClasses = cn(
    "font-raleway w-full px-4 py-3 rounded border bg-form-bg text-white placeholder-form-placeholder",
    "focus:bg-form-bg-focus focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
    "transition-all duration-200",
    error ? "border-red-500" : "border-form-border",
    isValid && "border-green-500",
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label className="block font-raleway text-sm font-medium text-heading">
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 font-raleway">{error}</p>
      )}
    </div>
  );
};

// Form Wrapper Component
interface FormProps {
  children: React.ReactNode;
  className?: string;
}

export const Form: React.FC<FormProps> = ({ children, className }) => (
  <form className={cn("space-y-4", className)}>
    {children}
  </form>
);