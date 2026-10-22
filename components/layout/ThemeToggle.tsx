'use client';

import * as React from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const toggleTheme = () => {
    const root = document.documentElement;
    const nextDark = !root.classList.contains('dark');

    root.classList.toggle('dark', nextDark);

    try {
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    } catch {
      // Ignore errors in restricted environments
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
      className={`inline-flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground ${className}`}
    >
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="block h-4 w-4 dark:hidden" />
    </button>
  );
}
