# Handoff — current state

**Date:** 2026-10-22  
**Branch:** `main`  
**Design authority:** [ADR-006](ADR/006-visual-identity-pivot.md) for palette, type, geometry, rhythm, and motion. [ADR-007](ADR/007-editorial-reset.md) for composition only.

> This replaces the earlier Phase 1.5 handoff, which described Section Coordinates and geometry work that the editorial reset removed. That document is preserved in git history.

## Settled design DNA (from the wayfinder session)

| Decision | Value |
|---|---|
| Persona | High-End Architect |
| Layout | Bold Break, offset axis |
| Interactivity | The Gallery |
| Light canvas | Warm Gallery: paper `hsl(40 30% 98%)`, cream surface |
| Dark canvas | Cold Studio: `hsl(240 10% 5%)`, deep slate surface |
| Signature | International Orange `#FF4F00` / `hsl(18 100% 50%)` |
| Display | Cormorant Garamond |
| Metadata | Space Mono |
| Body | Inter |
| Spacing | The Gallerist: `py-section` 5–9rem, `py-section-lg` 7–14rem; home uses larger explicit voids |
| Geometry | Refined Brutalism: 2px micro-radius, borderless by default, hard offset shadows |
| Motion | Cinematic reveals and parallax; reduced-motion respected |
| Availability status | **Explicitly rejected.** Do not add one. |

## What shipped

- Five-movement home page: Hero → Work index → Capabilities → Studio statement → Contact.
- Work is an index, not a card grid: ordinal, category, title, sector, metric.
- Shared `PageHeader` on interior pages and `ContactBlock` at page ends.
- Palette, radius, hard shadows, Gallerist spacing, and reveal motion restored to ADR-006 after the first ADR-007 pass overrode them.
- Availability note removed from the hero and from `SiteConfig`.
- Copy cleaned: no visible `[PLACEHOLDER]` or `TODO(content)` markers; project titles rewritten.
- Docs reconciled: README, PROJECT, TECHNICAL_MANUAL, GLOSSARY, ROADMAP, KNOWN_ISSUES, GATE_STATUS, TEST_READY, ADR-006, ADR-007.

## Verification

- `npm run build`: 29 routes
- `node scripts/verify-routes.mjs`: 27/27
- `node scripts/verify-no-hardcoded-brand.mjs`: 0 violations across 47 files
- `node tests/e2e/runner.mjs`: 66/66
- `npx tsc --noEmit`: clean
- `npm run lint`: clean
- Manual screenshots at 1440px and 390px, light and dark.

## Open work

1. **Imagery (`KI-005`)** — project covers, founder portraits, and studio photography. The current index is typographic by necessity.
2. **Real brand data (`KI-006`)** — name, legal entity, domain, email, phone, address.
3. **Verified metrics (`KI-009`)** — the `5+ / 120+ / 80+ / 15+` stats and project outcomes are illustrative.
4. **Parallax (`KI-010`)** — `Reveal` is wired into the home sections; the parallax layer is not yet used.
5. **Legacy components (`KI-007`)** — eight old section components remain on disk but are no longer imported.
6. **Viewport gate (`KI-008`)** — install `@playwright/test` and re-add the `test:viewport` script.

## Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
npm run verify:routes
npm run verify:brand
node tests/e2e/runner.mjs
```

On Windows, delete `.next/` before rebuilding if Next reports a webpack runtime or `no direct app page entry` error.
