import * as React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  as?: React.ElementType;
  id?: string;
}

const spacingClasses: Record<NonNullable<SectionProps['spacing']>, string> = {
  // "The Gallerist" rhythm (ADR-006): vertical breathing room is fluid and
  // deliberately asymmetric between sections — no uniform py-* stamping.
  none: '',
  sm: 'py-8 sm:py-12',
  md: 'py-section',
  lg: 'py-section-lg',
};

export function Section({
  spacing = 'md',
  as: Component = 'section',
  id,
  className = '',
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      id={id}
      className={`relative w-full overflow-hidden scroll-mt-20 sm:scroll-mt-24 ${spacingClasses[spacing]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
