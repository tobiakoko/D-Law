import React from 'react';
import { cn } from '~/lib/utils';

interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'fancy';
  children: React.ReactNode;
}

export const TextLink: React.FC<TextLinkProps> = ({
  variant = 'default',
  children,
  className,
  ...props
}) => {
  const baseClasses = "font-raleway text-primary hover:text-primary/80 transition-colors duration-200";
  
  const variantClasses = {
    default: "underline hover:no-underline",
    fancy: "relative after:content-['→'] after:ml-1 after:transition-transform after:duration-200 hover:after:translate-x-1"
  };

  return (
    <a
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};
