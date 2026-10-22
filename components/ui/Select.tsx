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
    <div className={`flex w-full flex-col gap-2 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
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
          className={`w-full appearance-none border-0 border-b bg-transparent py-2.5 pl-0 pr-8 text-[15px] text-foreground transition-colors focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? 'border-red-600' : 'border-input'
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
              className="bg-background text-foreground"
            >
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-muted-foreground" />
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
