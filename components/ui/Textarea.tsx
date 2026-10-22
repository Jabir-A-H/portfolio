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
    <div className={`flex w-full flex-col gap-2 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
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
        className={`min-h-[120px] w-full resize-y border-0 border-b bg-transparent py-2.5 pl-0 pr-0 text-[15px] text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
          error ? 'border-red-600' : 'border-input'
        } ${className}`}
        {...props}
      />

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
