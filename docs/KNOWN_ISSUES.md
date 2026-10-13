# Agency Marketing Portfolio: Known Issues & Fix Log

> **Trimming Rule:** When resolved entries exceed 5 items, run `npm run docs:trim` to automatically archive them into [`docs/archive/RESOLVED_ISSUES_ARCHIVE.md`](archive/RESOLVED_ISSUES_ARCHIVE.md).

---

## Active Issues & Operational Notes

| ID | Severity | Component | Summary | Workaround / Status |
|---|---|---|---|---|
| `KI-001` | Low | Contact Form | `NEXT_PUBLIC_FORM_ENDPOINT` is unconfigured locally | Form operates in simulated preview mode with instant feedback. Set in `.env.local` for live submissions. |

---

## Resolved Issues

| ID | Date | Component | Root Cause | Fix Summary |
|---|---|---|---|---|
| `RES-001` | 2026-10-13 | Node Build Worker | Consecutive `next build` caused memory pressure on Windows Node process | Added memory optimization guidelines (`--max-old-space-size=4096`) and clean `.next` cache handling. |
| `RES-002` | 2026-10-13 | Team Profiles | Hardcoded placeholder titles displayed under founder names | Updated [`content/team.ts`](file:///d:/WebDev/portfolio/content/team.ts) and [`app/team/page.tsx`](file:///d:/WebDev/portfolio/app/team/page.tsx) to make role optional and omit empty title tags. |
| `RES-003` | 2026-10-13 | WhatsApp Contact | Old placeholder +880 phone number across footers and contact links | Updated [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts) with active WhatsApp contact `+370 626 32643` (`37062632643`). |
| `RES-004` | 2026-10-13 | Anti-FOUC | Dark mode flicker on initial page load before hydration | Added inline synchronous theme script in `<head>` inspecting `localStorage` and `prefers-color-scheme`. |
| `RES-005` | 2026-10-13 | Dynamic Routes | Static export failing when query parameters were evaluated at build time | Declared `export const dynamicParams = false;` across all dynamic routes with `generateStaticParams()`. |
