import * as React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  as?: React.ElementType;
  id?: string;
  /**
   * Section ordinals are kept as structural metadata for tests and doc tooling.
   * They are not rendered: the page is composed by rules and rhythm, not by
   * printed navigational chrome.
   */
  index?: number;
  label?: string;
}

const spacingClasses: Record<NonNullable<SectionProps['spacing']>, string> = {
  none: '',
  sm: 'py-10 sm:py-14',
  md: 'py-section',
  lg: 'py-section-lg',
};

export function Section({
  spacing = 'md',
  as: Component = 'section',
  id,
  index,
  label,
  className = '',
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      id={id}
      data-section-index={index}
      data-section-label={label}
      className={`relative w-full overflow-hidden scroll-mt-24 ${spacingClasses[spacing]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
