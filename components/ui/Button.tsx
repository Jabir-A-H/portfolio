import * as React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
  accent: 'bg-accent text-accent-foreground hover:bg-accent-hover',
  secondary: 'bg-muted text-foreground hover:bg-border',
  outline:
    'border border-foreground/35 text-foreground hover:border-foreground hover:bg-foreground hover:text-background',
  ghost: 'text-foreground hover:text-accent',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-[11px] gap-1.5',
  md: 'h-10 px-4 text-[13px] gap-2',
  lg: 'h-12 px-5 text-sm gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  href,
  target,
  rel,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex select-none items-center justify-center whitespace-nowrap font-medium tracking-[0.01em] transition-colors disabled:pointer-events-none disabled:opacity-40';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
        className={combinedClasses}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={combinedClasses}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
