# Agency Marketing Portfolio: Known Issues & Fix Log

> **Trimming Rule:** When resolved entries exceed 5 items, run `npm run docs:check` to monitor context budgets.
> Historical resolved issues are archived in [`docs/archive/RESOLVED_ISSUES_ARCHIVE.md`](archive/RESOLVED_ISSUES_ARCHIVE.md) when needed.

---

## Active Issues & Operational Notes

| ID | Severity | Component | Summary | Workaround / Status |
|---|---|---|---|---|
| `KI-001` | Low | Contact Form | `NEXT_PUBLIC_FORM_ENDPOINT` is unconfigured locally | Form operates in simulated preview mode with instant feedback. Set in `.env.local` for live submissions. |
| `KI-005` | Medium | Imagery | Founder portraits and studio workspace photography are live in `public/images/`; 6 project covers and 12 macro crops remain pending | Add project case study assets to `public/images/projects/` per [`docs/VISUAL_AND_FEATURE_PLAN.md`](VISUAL_AND_FEATURE_PLAN.md). Do not reintroduce fake gradient thumbnails. |
| `KI-006` | High | Brand & Contact | Trading name is “Team NJS” only as a working name; final brand, legal entity, email (`hello@teamnjs.example`), phone, and address are undecided | Record the decision in [`docs/CONTENT_DECISIONS.md`](CONTENT_DECISIONS.md), then replace in [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts). |
| `KI-008` | Medium | Test Gate | `tests/e2e/viewport.test.ts` cannot run because `@playwright/test` is not installed; `tsconfig` excludes `tests` | Install Playwright and re-add a `test:viewport` script, or rely on manual screenshot reviews. |
| `KI-009` | Medium | Content Claims | Agency stats (5+, 120+, 80+, 15+) and project metrics are illustrative and unverified | Verify or replace before launch per [`docs/CONTENT_DECISIONS.md`](CONTENT_DECISIONS.md). |
| `KI-010` | Low | Motion | The cinematic reveal is wired into the home sections, but the parallax layer is not yet used | Add a subtle `Parallax` layer to the studio band or a hero depth element per [`docs/VISUAL_AND_FEATURE_PLAN.md`](VISUAL_AND_FEATURE_PLAN.md). Motion must remain optional and respect `prefers-reduced-motion`. |
| `KI-011` | Medium | Build | Next 16 Turbopack emits only the pages-router 404 for this static-export app; `next build` with Turbopack produces no app routes | `build` and `dev` pass `--webpack`. Re-test Turbopack after the next Next.js patch; remove the flag only when all 28 app routes appear. |
| `KI-012` | Low | Dependencies | Tailwind 4, TypeScript 7, and ESLint 10 are not installed | Deliberately deferred breaking migrations. Do them in a dedicated upgrade pass with the full gate; do not bundle them into content work. |

---

## Resolved Issues

| ID | Date | Component | Root Cause | Fix Summary |
|---|---|---|---|---|
| `KI-002` | 2026-10-22 | Typography | Inconsistent heading scale | All headings migrated to `font-display text-display-*` via Phase 1.5 geometry sweep (see `docs/ROADMAP.md`). |
| `KI-003` | 2026-10-22 | Geometry | Cliché SaaS rounded corners and glow shadows | All components use 2px micro-radius, hard offset shadows, and borderless-by-space composition per ADR-006. |
| `KI-004` | 2026-10-22 | Hero / Layout | `Hero.tsx` was centered with a blurred accent aura | Rebuilt as an offset editorial spread with no aura; see ADR-007. |
| `KI-007` | 2026-10-23 | Dead Files | Unused legacy section components and dead motion primitives remained on disk | Deleted 8 orphan sections (`TrustBar`, `StatsStrip`, etc.) and unimported motion primitives in Phase 2 cleanup. |
| `KI-013` | 2026-10-23 | Brand Leaks | Hardcoded "Apex" brand strings remained in `app/about/page.tsx` and `content/site.ts` | Replaced with `siteConfig.name` and expanded `verify:brand` scanner to monitor `lib/`. |
| `RES-001` | 2026-10-13 | Node Build Worker | Consecutive `next build` caused memory pressure on Windows Node process | Added memory optimization guidelines (`--max-old-space-size=4096`) and clean `.next` cache handling. |
| `RES-002` | 2026-10-13 | Team Profiles | Hardcoded placeholder titles displayed under founder names | Updated [`content/team.ts`](file:///d:/WebDev/portfolio/content/team.ts) and [`app/team/page.tsx`](file:///d:/WebDev/portfolio/app/team/page.tsx) to make role optional. |
| `RES-003` | 2026-10-13 | WhatsApp Contact | Old placeholder +880 phone number across footers and contact links | Updated [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts) with active WhatsApp contact `+370 626 32643`. |
| `RES-004` | 2026-10-13 | Anti-FOUC | Dark mode flicker on initial page load before hydration | Added inline synchronous theme script in `<head>` inspecting `localStorage` and `prefers-color-scheme`. |
| `RES-005` | 2026-10-13 | Dynamic Routes | Static export failing when query parameters were evaluated at build time | Declared `export const dynamicParams = false;` across all dynamic routes with `generateStaticParams()`. |
| `RES-006` | 2026-10-22 | Home / Interior Pages | The site still read as an AI-generated agency template | Recomposed as an editorial document under ADR-007: five home movements, work index rows, flat UI primitives, shared PageHeader/ContactBlock, cleaned copy. |
| `RES-007` | 2026-10-22 | Design DNA | ADR-007's first implementation overrode ADR-006 tokens | Restored ADR-006 palette, 2px radius, hard-shadow scale, extreme spacing on the home page, and removed availability note. |
