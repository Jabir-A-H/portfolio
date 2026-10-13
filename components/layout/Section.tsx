import * as React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  as?: React.ElementType;
  id?: string;
}

const spacingClasses: Record<NonNullable<SectionProps['spacing']>, string> = {
  none: 'py-0',
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16 md:py-20 lg:py-24',
  lg: 'py-16 sm:py-24 md:py-32',
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
