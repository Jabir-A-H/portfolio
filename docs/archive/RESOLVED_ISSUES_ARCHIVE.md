# Historical Resolved Issues Archive

Archived resolved issues from [`docs/KNOWN_ISSUES.md`](file:///d:/WebDev/portfolio/docs/KNOWN_ISSUES.md) to preserve context token budgets.

| ID | Date | Component | Root Cause | Fix Summary |
|---|---|---|---|---|
| `RES-001` | 2026-10-13 | Node Build Worker | Consecutive `next build` caused memory pressure on Windows Node process | Added memory optimization guidelines (`--max-old-space-size=4096`) and clean `.next` cache handling. |
| `RES-002` | 2026-10-13 | Team Profiles | Hardcoded placeholder titles displayed under founder names | Updated [`content/team.ts`](file:///d:/WebDev/portfolio/content/team.ts) to make role optional. |
| `RES-003` | 2026-10-13 | WhatsApp Contact | Old placeholder +880 phone number across footers and contact links | Updated [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts) with active WhatsApp contact `+370 626 32643`. |
| `RES-004` | 2026-10-13 | Anti-FOUC | Dark mode flicker on initial page load before hydration | Added inline synchronous theme script in `<head>` inspecting `localStorage` and `prefers-color-scheme`. |
| `RES-005` | 2026-10-13 | Dynamic Routes | Static export failing when query parameters were evaluated at build time | Declared `export const dynamicParams = false;` across all dynamic routes with `generateStaticParams()`. |
| `RES-006` | 2026-10-22 | Home / Interior Pages | The site still read as an AI-generated agency template | Recomposed as an editorial document under ADR-007: five home movements, work index rows, flat UI primitives, shared PageHeader/ContactBlock, cleaned copy. |
| `RES-007` | 2026-10-22 | Design DNA | ADR-007's first implementation overrode ADR-006 tokens | Restored ADR-006 palette, 2px radius, hard-shadow scale, extreme spacing on the home page, and removed availability note. |
