import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'secondary' | 'outline' | 'success';
  size?: 'sm' | 'md';
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'text-muted-foreground',
  accent: "text-accent before:h-1 before:w-1 before:shrink-0 before:bg-accent before:content-['']",
  secondary: 'text-muted-foreground',
  outline: 'text-muted-foreground',
  success: 'text-emerald-700 dark:text-emerald-400',
};

const sizeClasses: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'text-[10px]',
  md: 'text-[11px]',
};

/**
 * A label, not a pill. Badges are typographic: a small vermilion square and a
 * line of mono capitals. No fill, no border, no radius.
 */
export function Badge({
  variant = 'default',
  size = 'sm',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap font-mono uppercase leading-none tracking-label ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
