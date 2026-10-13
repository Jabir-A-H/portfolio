# Agency Marketing Portfolio: Technical Manual

> **Status:** Active & Production Verified  
> **Framework:** Next.js 15+ (App Router, Static Export) | TypeScript | Tailwind CSS v3.4  
> **Last Verified:** 2026-10-13 (All 29 static routes pre-rendered, 66/66 E2E tests passing)

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
/                         -> out/index.html (10-section Home page)
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

### HSL CSS Variable Tokens
Defined in [`styles/globals.css`](file:///d:/WebDev/portfolio/styles/globals.css) and mapped to utility classes in [`tailwind.config.ts`](file:///d:/WebDev/portfolio/tailwind.config.ts):
- `--background`, `--surface`, `--foreground`, `--muted`, `--muted-foreground`
- `--primary`, `--primary-foreground`, `--accent`, `--accent-foreground`
- `--border`, `--ring`

### Theming & Anti-FOUC Mechanism
1. **Inline Script**: An anti-FOUC script executes synchronously in `<head>` before body hydration in [`app/layout.tsx`](file:///d:/WebDev/portfolio/app/layout.tsx), inspecting `localStorage.getItem('theme')` and `window.matchMedia('(prefers-color-scheme: dark)')` to toggle `.dark` on `document.documentElement`.
2. **Interactive Toggle**: [`components/layout/ThemeToggle.tsx`](file:///d:/WebDev/portfolio/components/layout/ThemeToggle.tsx) switches between light and dark themes and writes the preference back to `localStorage`.

### Responsive Layout Geometry
- Viewport break testing at 360px (mobile), 768px (tablet), 1024px (laptop), and 1440px (desktop).
- Enforced zero horizontal overflow through `overflow-x: hidden` and `max-w-` constraints on [`components/layout/Container.tsx`](file:///d:/WebDev/portfolio/components/layout/Container.tsx).

---

## 5. Contact Form, Anti-Spam & Marketing Integrations

### Client-Side Inquiry Form ([`components/forms/ContactForm.tsx`](file:///d:/WebDev/portfolio/components/forms/ContactForm.tsx))
- **Validation**: Strict client-side validation on Full Name, Email, Service Selection, Budget Range, Desired Timeline, and Project Description.
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
