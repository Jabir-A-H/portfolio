# Agency Marketing Portfolio: Technical Manual

> **Status:** Active & Production Verified  
> **Framework:** Next.js 15+ (App Router, Static Export) | TypeScript | Tailwind CSS v3.4  
> **Last Verified:** 2026-10-22 (29 routes built, 27 route files verified, 66/66 E2E assertions, brand scan clean, typecheck and lint clean)

---

## 1. Architectural Architecture & Static Export

The project is architected as a multi-page, static marketing website designed for ultra-fast load times, zero-server-maintenance deployment (e.g. Hostinger, Cloudflare Pages, GitHub Pages), and maximum security resilience.

### Key Configuration
- **Static Export**: Defined in [`next.config.ts`](file:///d:/WebDev/portfolio/next.config.ts) with `output: 'export'`.
- **Trailing Slashes**: `trailingSlash: true` ensures pre-rendered output produces clean directory index files (e.g., `out/services/index.html`) compatible with static web servers without rewrites.
- **Image Optimization**: `images: { unoptimized: true }` ensures `next/image` emits valid, responsive `<img>` elements during static export.
- **Dynamic Parameter Lockdown**: Every dynamic route (`/services/[slug]` and `/portfolio/[slug]`) exports `export const dynamicParams = false;` and provides pre-computed params via `generateStaticParams()`.

---

## 2. Centralized Content Hierarchy (Single Source of Truth)

To enable friction-free rebranding and content updates without modifying React components or layouts, all brand identity, navigation, leadership profiles, services, projects, and process data are centralized in [`content/`](file:///d:/WebDev/portfolio/content):

| Module | Interface / Export | Purpose & Responsibility |
|---|---|---|
| [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts) | `siteConfig: SiteConfig` | Company brand name, legal entity, tagline, contact emails, phones, WhatsApp number (`+370 626 32643`), physical address, social profiles, main navigation, and footer link groups. |
| [`content/team.ts`](file:///d:/WebDev/portfolio/content/team.ts) | `teamMembers: TeamMember[]` | Leadership team profiles ("The three heads" — Nasib Mohammad Arif, Abu Sayed Md Saad, Jabir Abdullah Haian) with bios, initials avatar fallbacks, and skills. |
| [`content/services.ts`](file:///d:/WebDev/portfolio/content/services.ts) | `services: ServiceItem[]`, `serviceGroups` | 9 discrete agency services across 4 core groups (Web & Software, Mobile & Games, Automation & Integration, Creative) with deliverables, process, and FAQs. |
| [`content/projects.ts`](file:///d:/WebDev/portfolio/content/projects.ts) | `projects: ProjectItem[]` | Case study specifications (problem, solution, results, tech stack, categories) powering the filter grid and individual dynamic case studies. |
| [`content/process.ts`](file:///d:/WebDev/portfolio/content/process.ts) | `processSteps: ProcessStep[]` | 6-step agency delivery methodology powering `/process` and the Home process preview. |

> **Brand Isolation Invariant:** Zero literal brand or contact strings may exist in `app/` or `components/`. All strings must be imported from `@/content/site`. Enforced via [`scripts/verify-no-hardcoded-brand.mjs`](file:///d:/WebDev/portfolio/scripts/verify-no-hardcoded-brand.mjs).

---

## 3. Route Tree & Pre-rendered Pages

The Next.js App Router statically exports 29 total HTML/XML pages into `out/`:

```
/                         -> out/index.html (five-movement editorial home page)
/services                 -> out/services/index.html (4 category groups overview)
/services/[slug]          -> out/services/*/index.html (9 pre-rendered service deep-dives)
/portfolio                -> out/portfolio/index.html (Filterable category grid)
/portfolio/[slug]         -> out/portfolio/*/index.html (6 detailed case study routes)
/about                    -> out/about/index.html (Company story, mission, core values)
/team                     -> out/team/index.html (The three heads profiles & avatar initials)
/process                  -> out/process/index.html (6-step delivery workflow)
/contact                  -> out/contact/index.html (Inquiry form & direct channels)
/privacy                  -> out/privacy/index.html (Privacy policy with dynamic brand)
/terms                    -> out/terms/index.html (Terms of service with dynamic brand)
/404                      -> out/404.html (Custom branded not-found error page)
/sitemap.xml              -> out/sitemap.xml (Dynamic SEO XML sitemap covering all routes)
/robots.txt               -> out/robots.txt (Crawler directives pointing to sitemap.xml)
```

---

## 4. Design System Tokens & Anti-FOUC Theming

**Visual identity:** "High-End Architect". [ADR-006](file:///d:/WebDev/portfolio/docs/ADR/006-visual-identity-pivot.md) is the authority for palette, type, geometry, rhythm, and motion. [ADR-007](file:///d:/WebDev/portfolio/docs/ADR/007-editorial-reset.md) changes composition only: the five-movement home page, work index, shared page header, rule fields, and content cleanup. See also [`GLOSSARY.md`](file:///d:/WebDev/portfolio/GLOSSARY.md).

### HSL CSS Variable Tokens
Defined in [`styles/globals.css`](file:///d:/WebDev/portfolio/styles/globals.css) and mapped to utility classes in [`tailwind.config.ts`](file:///d:/WebDev/portfolio/tailwind.config.ts):
- `--background`, `--surface`, `--foreground`, `--muted`, `--muted-foreground`
- `--primary`, `--primary-foreground`, `--accent`, `--accent-foreground`
- `--border`, `--ring`

| Token | Light ("Warm Gallery") | Dark ("Cold Studio") |
|---|---|---|
| `--background` | `40 30% 98%` — paper | `240 10% 5%` — cold ink |
| `--surface` | `40 30% 96%` — cream | `240 10% 10%` — deep slate |
| `--foreground` | `20 10% 15%` — ink | `40 20% 90%` — bone |
| `--primary` | ink | bone |
| `--accent` | `18 100% 50%` — International Orange | same |
| `--border` | `40 10% 90%` — warm rule | `240 10% 15%` — cool rule |
| `--radius` | `0.125rem` | `0.125rem` |

`tailwind.config.ts` removes the default radius and shadow scales. `borderRadius` exposes `DEFAULT` (2px), `none`, and `full`; `boxShadow` exposes only the hard offsets (`hard-sm`, `hard`, `hard-lg`, `hard-accent`) plus `none`. Do not reintroduce `rounded-lg` / `shadow-xl` / blurred shadows.

### Typography (Technical Hybrid)
Self-hosted via `next/font/google` in [`app/layout.tsx`](file:///d:/WebDev/portfolio/app/layout.tsx); exposed as CSS variables consumed by `tailwind.config.ts`.

| Role | Family | Variable | Utility |
|---|---|---|---|
| Display / Architect | Cormorant Garamond (300–600, italic) | `--font-serif` | `font-display`, `font-serif` |
| Metadata / Engineer | Space Mono (400, 700) | `--font-mono` | `font-mono`, `text-label` |
| Body / Ghost | Inter (variable) | `--font-sans` | `font-sans` (body default) |

- Fluid display scale: `text-display-xl` (clamp 3.4rem–8.75rem, line-height 0.9), `-lg` (2.6–4.75rem, 0.96), `-md` (1.9–2.9rem, 1.02).
- Technical label scale: `text-label` = 0.6875rem with `tracking-label` (0.16em). Labels are uppercase and never rendered below 10px.
- `h1–h3` default to the serif voice in the base layer; `font-synthesis: none` prevents faux-bold artefacts because Cormorant Garamond caps at 600.
- Hero emphasis uses a single italic word, authored in `content/site.ts` as `*outlast*` and rendered as `<em>` by `Hero.tsx`.

### Composition Primitives
- **`components/layout/PageHeader.tsx`** — interior page opening: mono label, `display-lg` serif title, right-margin lede, optional metadata. Every top-level page and both detail templates use it.
- **`components/layout/Section.tsx`** — spacing wrapper (`none | sm | md | lg`). `index` and `label` props are accepted only as `data-*` metadata; they are not rendered.
- **`components/layout/Container.tsx`** — `max-w-screen-2xl` with fluid `px-gutter`.
- **`components/ui/Card.tsx`** — borderless card: `bg-surface`, 2px radius, `shadow-hard`; interactive variants deepen to `shadow-hard-lg`.
- **`components/ui/Badge.tsx`** — label, not pill: mono capitals, optional International Orange square, no fill or border.
- **`components/ui/Button.tsx`** — 2px radius, hard shadow, pressed state (`active:translate(2px, 2px)` + shadow collapse). Variants keep the ADR-006 press physics.
- **`components/ui/Input.tsx` / `Select.tsx` / `Textarea.tsx`** — rule fields: transparent, bottom border, mono label, International Orange focus rule.

### Home Page Structure
Five movements, in order, in [`app/page.tsx`](file:///d:/WebDev/portfolio/app/page.tsx):
1. `Hero` — studio strip (no availability indicator), display statement, lede, two actions, discipline line.
2. `WorkIndex` — three featured projects as rows with sector and headline metric.
3. `Capabilities` — four service groups as rows with descriptions and counts.
4. `StudioStatement` — inverted band with statement, two paragraphs, about link.
5. `ContactBlock` — display question, email link, contact link.

### Motion Layer — "The Gallery" (framer-motion)
Implemented in [`components/motion/`](file:///d:/WebDev/portfolio/components/motion/):
- **MotionProvider** — client boundary wrapping all motion; centralizes `prefers-reduced-motion` via `useReducedMotion()`.
- **Reveal** — a single in-view entrance used by the five home movements. 700–800ms, `ease-architect`, respects reduced-motion.
- **ScrollReveal / RevealItem** — viewport-triggered entrance animations with staggered children. Variants: `fade-up`, `fade-in`, `slide-left`, `slide-right`, `scale-up`.
- **Parallax / ParallaxLayer** — scroll-linked depth using `useScroll` + `useTransform`. Available but not yet wired into the home page (`KI-010`).
- The editorial pages are legible without animation; motion is optional and must not be required to reveal content.

### Theming & Anti-FOUC Mechanism
1. **Inline Script**: An anti-FOUC script executes synchronously in `<head>` before body hydration in [`app/layout.tsx`](file:///d:/WebDev/portfolio/app/layout.tsx), inspecting `localStorage.getItem('theme')` and `window.matchMedia('(prefers-color-scheme: dark)')` to toggle `.dark` on `document.documentElement`.
2. **Interactive Toggle**: [`components/layout/ThemeToggle.tsx`](file:///d:/WebDev/portfolio/components/layout/ThemeToggle.tsx) switches between light and dark themes and writes the preference back to `localStorage`.

### Responsive Layout Geometry
- Visual verification at 360px (mobile), 768px (tablet), 1024px (laptop), and 1440px (desktop) via full-page screenshots in `.review/` (not committed).
- Zero horizontal overflow is enforced by `overflow-x: hidden`, `max-width: 100vw` on root, and `max-w-screen-2xl` on the `Container` primitive. The Navbar keeps `max-w-sheet` for its own frame.
- **Viewport CI Gate (pending):** `tests/e2e/viewport.test.ts` exists, but `@playwright/test` is not installed, there is no `test:viewport` script, and the file is excluded from `tsc`. Do not claim this gate is active.


---

## 5. Contact Form, Anti-Spam & Marketing Integrations

### Client-Side Inquiry Form ([`components/forms/ContactForm.tsx`](file:///d:/WebDev/portfolio/components/forms/ContactForm.tsx))
- **Validation**: Client-side validation on Name, Email, Service, Budget, Timeline, and Project. Company is optional.
- **Honeypot Anti-Spam**: Visually hidden field `_gotcha` with `tabIndex={-1}` and `aria-hidden="true"`. If populated by bot scrapers, submission is silently sunk with a simulated success response.
- **Configurable Endpoint**: Dispatches payloads via `fetch` to `process.env.NEXT_PUBLIC_FORM_ENDPOINT` (e.g. Web3Forms or Formspree). If unset, runs in simulated preview mode.
- **Direct WhatsApp Chat**: Dynamic link generator formats phone numbers into `https://wa.me/{digits}` with pre-populated inquiry text.

---

## 6. Pre-Flight Quality Gates & Testing Commands

To verify full system integrity, execute the following commands:

```bash
# 1. Typecheck (Strict TypeScript 5.7)
npm run typecheck

# 2. Linting (ESLint 9 Next Core Web Vitals)
npm run lint

# 3. Production Static Export Build
# If Next reports a webpack runtime or "no direct app page entry" error,
# delete .next/ first; it is a stale cache, not a source failure.
npm run build

# 4. Route Pre-rendering Verification Gate
node scripts/verify-routes.mjs

# 5. Brand Centralization & Zero-Leak Gate
node scripts/verify-no-hardcoded-brand.mjs

# 6. Master 4-Tier Opaque-Box E2E Runner (66 tests)
node tests/e2e/runner.mjs

# 7. Unified Pipeline
npm run verify:all
```
