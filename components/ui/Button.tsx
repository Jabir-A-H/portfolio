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
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm active:scale-[0.99]',
  accent:
    'bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm active:scale-[0.99]',
  secondary:
    'bg-muted text-foreground hover:bg-muted/80 shadow-none',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-muted/60',
  ghost:
    'bg-transparent text-foreground hover:bg-muted/60',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-xs font-medium rounded-md gap-1.5 min-h-[32px]',
  md: 'px-4 py-2 text-sm font-medium rounded-lg gap-2 min-h-[40px]',
  lg: 'px-6 py-3 text-base font-semibold rounded-lg gap-2.5 min-h-[48px]',
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
    'inline-flex items-center justify-center font-medium transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={combinedClasses}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
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
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
