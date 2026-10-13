import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
}

export function Textarea({
  label,
  error,
  hint,
  id,
  rows = 4,
  className = '',
  containerClassName = '',
  disabled,
  ...props
}: TextareaProps) {
  const generatedId = React.useId();
  const textareaId = id || generatedId;
  const errorId = `${textareaId}-error`;
  const hintId = `${textareaId}-hint`;

  return (
    <div className={`w-full flex flex-col space-y-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs sm:text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={`w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent resize-y min-h-[100px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          error
            ? 'border-red-500 focus:ring-red-500 text-red-950 dark:text-red-100'
            : 'border-input focus:ring-ring'
        } ${className}`}
        {...props}
      />

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
