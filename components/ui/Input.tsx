import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  id,
  className = '',
  containerClassName = '',
  disabled,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  return (
    <div className={`flex w-full flex-col gap-2 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="pointer-events-none absolute left-0 flex items-center text-muted-foreground">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={`w-full border-0 border-b bg-transparent py-2.5 text-[15px] text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            leftIcon ? 'pl-8' : 'pl-0'
          } ${rightIcon ? 'pr-8' : 'pr-0'} ${
            error ? 'border-red-600' : 'border-input'
          } ${className}`}
          {...props}
        />

        {rightIcon && (
          <div className="pointer-events-none absolute right-0 flex items-center text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-[12px] text-red-700 dark:text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-[12px] text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
