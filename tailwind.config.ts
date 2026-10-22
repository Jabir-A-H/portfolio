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
    /*
     * A page is a sheet of paper, not a stack of widgets. The only corners in
     * the system are square, and the only depth is the hairline between things.
     */
    borderRadius: {
      DEFAULT: '0rem',
      none: '0rem',
      full: '9999px',
    },
    boxShadow: {
      none: 'none',
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
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        display: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        /*
         * The scale is deliberately wide. A studio site needs one enormous
         * statement and then a long quiet drop to 11px metadata.
         */
        'display-xl': ['clamp(3.4rem, 8.8vw, 8.75rem)', { lineHeight: '0.9', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.6rem, 5.4vw, 4.75rem)', { lineHeight: '0.96', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.9rem, 3.2vw, 2.9rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        label: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.16em' }],
      },
      letterSpacing: {
        label: '0.16em',
        display: '-0.03em',
      },
      transitionTimingFunction: {
        architect: 'cubic-bezier(0.16, 1, 0.3, 1)',
        gallery: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        400: '400ms',
        700: '700ms',
        1000: '1000ms',
      },
      spacing: {
        gutter: 'clamp(1.25rem, 4vw, 4rem)',
        section: 'clamp(4.5rem, 9vw, 7.5rem)',
        'section-lg': 'clamp(6rem, 12vw, 10rem)',
      },
      maxWidth: {
        sheet: '100rem',
      },
    },
  },
  plugins: [],
};

export default config;
