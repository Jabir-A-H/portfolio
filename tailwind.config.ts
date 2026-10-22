import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        text: 'hsl(var(--text) / <alpha-value>)',
        surface: {
          DEFAULT: 'hsl(var(--surface) / <alpha-value>)',
          foreground: 'hsl(var(--surface-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          hover: 'hsl(var(--primary-hover) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
          hover: 'hsl(var(--accent-hover) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // ----------------------------------------------------------------------
      // "High-End Architect" typographic system (ADR-006)
      // Serif = display voice. Mono = technical metadata. Sans = invisible UI.
      // ----------------------------------------------------------------------
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        display: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Fluid display scale: typography responds continuously to viewport.
        'display-xl': ['clamp(3.25rem, 7.5vw, 7rem)', { lineHeight: '0.94', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.25rem)', { lineHeight: '1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.875rem, 3.2vw, 2.75rem)', { lineHeight: '1.06', letterSpacing: '-0.01em' }],
        // Technical label scale: always uppercase + wide tracking.
        label: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.18em' }],
      },
      letterSpacing: {
        label: '0.18em',
        display: '-0.02em',
      },
      // ----------------------------------------------------------------------
      // Refined Brutalism geometry: depth comes from hard offsets and parallax,
      // never from blurred "AI glow" shadows.
      // ----------------------------------------------------------------------
      boxShadow: {
        'hard-sm': '2px 2px 0 0 hsl(var(--foreground))',
        hard: '4px 4px 0 0 hsl(var(--foreground))',
        'hard-lg': '8px 8px 0 0 hsl(var(--foreground))',
        'hard-accent': '4px 4px 0 0 hsl(var(--accent))',
      },
      // ----------------------------------------------------------------------
      // The Gallery motion: slow, precise, editorial easings.
      // ----------------------------------------------------------------------
      transitionTimingFunction: {
        architect: 'cubic-bezier(0.16, 1, 0.3, 1)',
        gallery: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        400: '400ms',
        700: '700ms',
        1000: '1000ms',
      },
      // ----------------------------------------------------------------------
      // The Gallerist rhythm: compositional silence, not uniform padding.
      // ----------------------------------------------------------------------
      spacing: {
        gutter: 'clamp(1.25rem, 5vw, 4rem)',
        section: 'clamp(5rem, 12vh, 9rem)',
        'section-lg': 'clamp(7rem, 18vh, 14rem)',
      },
    },
  },
  plugins: [],
};

export default config;
