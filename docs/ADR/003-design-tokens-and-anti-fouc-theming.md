# ADR 003: CSS Variable Design Tokens and Anti-FOUC Theming

- **Status:** Accepted and Implemented
- **Date:** 2026-10-13
- **Deciders:** Engineering Architecture

## Context
The site requires dark and light mode support without flash-of-unstyled-content (FOUC), and needs flexible color swapping once the final brand palette is chosen.

## Decision
1. Define design tokens (`--background`, `--surface`, `--foreground`, `--primary`, `--accent`, `--border`) using HSL CSS variables in `styles/globals.css`.
2. Map Tailwind utility classes to these variables in `tailwind.config.ts`.
3. Implement an inline synchronous script in `<head>` (`app/layout.tsx`) that reads `localStorage.getItem('theme')` or system preference before DOM rendering to add or remove `.dark`.

## Consequences
- **Positive:** Zero FOUC flicker on page load. Global palette adjustments require editing only CSS variable values. User preferences persist across sessions.
- **Negative:** Inline `<head>` script must remain small and vanilla JS to avoid blocking initial render.
