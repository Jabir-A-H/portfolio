import * as React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: React.ElementType;
}

const sizeClasses: Record<NonNullable<ContainerProps['size']>, string> = {
  sm: 'max-w-[42rem]',
  md: 'max-w-[56rem]',
  lg: 'max-w-[72rem]',
  xl: 'max-w-screen-2xl',
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
      className={`mx-auto w-full px-gutter ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
