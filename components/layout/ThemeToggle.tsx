'use client';

import * as React from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDark(hasDarkClass);

    // Sync if OS theme updates while browsing
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem('theme');
        if (!stored || stored === 'system') {
          if (e.matches) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
          } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
          }
        }
      } catch {
        // Ignore errors in restricted environments
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch {
        // Ignore errors in restricted environments
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch {
        // Ignore errors in restricted environments
      }
    }
  };

  // Render neutral placeholder before mount to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`inline-flex h-8 w-8 items-center justify-center text-muted-foreground ${className}`}
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`inline-flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground ${className}`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
