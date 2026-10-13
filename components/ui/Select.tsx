import * as React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
}

export function Select({
  label,
  error,
  hint,
  options,
  placeholder,
  id,
  className = '',
  containerClassName = '',
  disabled,
  ...props
}: SelectProps) {
  const generatedId = React.useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;
  const hintId = `${selectId}-hint`;

  return (
    <div className={`w-full flex flex-col space-y-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs sm:text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={selectId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={`w-full appearance-none rounded-lg border bg-background px-3.5 py-2.5 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? 'border-red-500 focus:ring-red-500 text-red-950 dark:text-red-100'
              : 'border-input focus:ring-ring'
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className="bg-surface text-foreground"
            >
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown className="absolute right-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>

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
