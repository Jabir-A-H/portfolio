import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'interactive';
}

const variantClasses: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'border-t border-border',
  bordered: 'border-t border-border',
  elevated: 'border-t border-border',
  interactive: 'border-t border-border transition-colors hover:border-accent',
};

/**
 * A card is a compartment on a printed sheet: a hairline at the top and air
 * around the contents. No fill, no frame, no shadow.
 */
export function Card({
  variant = 'default',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div className={`overflow-hidden ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col gap-2 p-6 pb-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`font-display text-display-md text-foreground ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-[15px] leading-relaxed text-muted-foreground ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pt-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}
