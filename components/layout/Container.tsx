import * as React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: React.ElementType;
}

const sizeClasses: Record<NonNullable<ContainerProps['size']>, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export function Container({
  size = 'xl',
  as: Component = 'div',
  className = '',
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`w-full mx-auto px-gutter ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
