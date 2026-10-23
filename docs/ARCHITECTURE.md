# Architecture & System Manual

**Project:** Team NJS Studio Portfolio  
**Stack:** Next.js 16.4 (App Router, webpack builder, Static Export) | React 19.3 | TypeScript 5.9 | Tailwind CSS 3.4  
**Status:** Active. Single canonical architecture and design reference.

---

## 1. System Architecture & Static Export

The project is architected as a pure multi-page, statically exported marketing website designed for zero-server-maintenance hosting (e.g. Cloudflare Pages, GitHub Pages, Hostinger) with instant load times and high resilience.

### Core Architecture Invariants
- **Static Export**: Configured in [`next.config.ts`](file:///d:/WebDev/portfolio/next.config.ts) with `output: 'export'`.
- **Trailing Slashes**: `trailingSlash: true` ensures pre-rendered output produces clean directory index files (e.g., `out/services/index.html`) compatible with static file servers without rewrites.
- **Image Optimization**: `images: { unoptimized: true }` ensures `next/image` emits valid, responsive `<img>` tags during static export.
- **Dynamic Route Lockdown**: Every dynamic route (`/services/[slug]` and `/portfolio/[slug]`) exports `export const dynamicParams = false;` and supplies static paths via `generateStaticParams()`.
- **Client Isolation**: `'use client'` is reserved strictly for interactive leaves (`ContactForm`, `PortfolioFilterGrid`, `ThemeToggle`, motion providers). Route layouts and section wrappers stay pure Server Components.

### Toolchain & Dependency Policy
- **Next.js 16.4.2** & **React 19.3.1**: The project uses `--webpack` in `npm run build` and `npm run dev` because Next 16 Turbopack currently drops app routes during static export (tracked as `KI-011`).
- **ESLint**: Uses native Next 16 flat config ([`eslint.config.mjs`](file:///d:/WebDev/portfolio/eslint.config.mjs)) with `defineConfig` and `globalIgnores`.
- **Breaking Major Versions Deferred**: Tailwind 4, TypeScript 7, and ESLint 10 are deliberately deferred to dedicated upgrade passes.

---

## 2. Centralized Content Architecture

To prevent brand lock-in and enable seamless rebranding without touching UI components, all brand identity, leadership, services, projects, and process data are centralized in [`content/`](file:///d:/WebDev/portfolio/content):

| Content File | Primary Export | Responsibility |
|---|---|---|
| [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts) | `siteConfig: SiteConfig` | Brand name, legal entity, tagline, contact emails, phone, WhatsApp, address, socials, 4-pillar navigation (`Work`, `Services`, `Studio`, `Contact`). |
| [`content/queries.ts`](file:///d:/WebDev/portfolio/content/queries.ts) | `getProjects()`, `getServices()`, `getTeamMembers()`, `getProcessSteps()` | Unified, typed query facade centralizing content querying across the entire application. |
| [`content/services.ts`](file:///d:/WebDev/portfolio/content/services.ts) | `services: ServiceItem[]`, `serviceGroups` | 9 services across 4 groups (Web & Software, Mobile & Games, Automation & Integration, Creative). |
| [`content/projects.ts`](file:///d:/WebDev/portfolio/content/projects.ts) | `projects: ProjectItem[]` | Case study specifications (problem, solution, results, stack, metrics). |
| [`content/team.ts`](file:///d:/WebDev/portfolio/content/team.ts) | `teamMembers: TeamMember[]` | Leadership profiles (Nasib Mohammad Arif, Abu Sayed Md Saad, Jabir Abdullah Haian) with portrait assets, verified roles, skills, and LinkedIn links. |
| [`content/process.ts`](file:///d:/WebDev/portfolio/content/process.ts) | `processSteps: ProcessStep[]` | 6-step agency delivery methodology and standards. |

> **Brand Isolation Invariant:** Zero hardcoded brand names, legal entities, or contact strings in `app/`, `components/`, or `lib/`. Everything must be imported from `@/content/site`. Enforced automatically by `npm run verify:brand`.

---

## 3. Core Architectural Modules (`lib/` & Components)

- **Metadata Factory ([`lib/metadata.ts`](file:///d:/WebDev/portfolio/lib/metadata.ts))**: `createPageMetadata({ title, description, path, ogType, image })` standardizes title formatting (with absolute unwrapping), OpenGraph tags, Twitter summary large image cards, and canonical links across all routes.
- **Contact Intake Decoupling ([`lib/contact.ts`](file:///d:/WebDev/portfolio/lib/contact.ts))**: Isolates schema validation (`validateContactForm`), option constants (`BUDGET_OPTIONS`, `TIMELINE_OPTIONS`), WhatsApp link generation (`formatWhatsAppUrl`), and simulated/network submission (`submitInquiry`). Form search params are read inside an isolated `<Suspense>` boundary to preserve full static export generation.
- **Unified Project Row ([`components/portfolio/ProjectRow.tsx`](file:///d:/WebDev/portfolio/components/portfolio/ProjectRow.tsx))**: Encapsulates project row presentation (category short-label, title, clientType, completedDate, headline metric, arrow link, hover transitions, and responsive mobile layout) across both `WorkIndex` and `PortfolioFilterGrid`.
- **Tethered Traveling Viewfinder ([`components/portfolio/InteractiveWorkGallery.tsx`](file:///d:/WebDev/portfolio/components/portfolio/InteractiveWorkGallery.tsx) & [`components/portfolio/GalleryViewfinder.tsx`](file:///d:/WebDev/portfolio/components/portfolio/GalleryViewfinder.tsx))**: Interactive companion frame docking in row negative space. Orchestrated via Framer Motion `layoutId="gallery-viewfinder"` spring glides between project rows, nested scroll-linked micro-parallax drift (`useScroll`), and `IntersectionObserver` focal band tracking for mobile viewport parity.

---

## 4. Route Tree & Static Pages

Next.js App Router exports 26 pre-rendered static routes into `out/`:

```
/                         -> out/index.html (Editorial home: hero, work index, capabilities, statement, contact)
/services                 -> out/services/index.html (4 discipline groups overview)
/services/[slug]          -> out/services/*/index.html (9 dynamic service routes)
/portfolio                -> out/portfolio/index.html (Filterable category work index)
/portfolio/[slug]         -> out/portfolio/*/index.html (6 dynamic case study routes)
/about                    -> out/about/index.html (Focused 3-part Studio Dossier: Origin Story with studio workspace photo, Leadership with 3 founder portraits/bios/LinkedIn, and Measured Studio Outcomes)
/contact                  -> out/contact/index.html (Inquiry form with ?service= preselection & direct channels)
/privacy, /terms          -> out/*/index.html (Legal policies with dynamic brand)
/404                      -> out/404.html (Custom branded not-found error page)
/sitemap.xml, /robots.txt -> out/ (Dynamic XML sitemap & search crawler directives)
```

---

## 5. Design System & Visual Guidelines

The design identity is anchored by [ADR-006](file:///d:/WebDev/portfolio/docs/ADR/006-visual-identity-pivot.md) (DNA) and [ADR-007](file:///d:/WebDev/portfolio/docs/ADR/007-editorial-reset.md) (Composition). Visual guidelines evolve with ongoing design reviews.

### Palette & Tokens
- **Warm Gallery (Light):** Paper canvas `hsl(40 30% 98%)`, cream surface `hsl(40 30% 96%)`, deep ink text `hsl(20 10% 15%)`.
- **Cold Studio (Dark):** Cold ink canvas `hsl(240 10% 5%)`, deep slate surface `hsl(240 10% 10%)`, bone text `hsl(40 20% 90%)`.
- **International Orange Accent:** `hsl(18 100% 50%)` signature accent for marks, hover states, and key metrics.
- **Theming:** Defined via HSL CSS variables in [`styles/globals.css`](file:///d:/WebDev/portfolio/styles/globals.css), mapped in [`tailwind.config.ts`](file:///d:/WebDev/portfolio/tailwind.config.ts), toggled via `.dark` class + inline anti-FOUC script.

### Typography
- **Display / Architect:** Cormorant Garamond (300–600) for hero, page headers, section titles.
- **Technical / Filing:** Space Mono (400, 700) for ordinals, metadata, categories, timelines (minimum 10px floor).
- **Body / Clear:** Inter for body text, navigation, and form inputs.

### Composition & Layout
- **The Gallerist Spacing:** Deliberate negative space, fluid `py-section` / `py-section-lg` rhythm, and intentional silence rather than crowded grid boxes.
- **Shared Interior Spreads:** Interior pages open with `PageHeader` (mono label, serif headline, right lede) and close with `ContactBlock`.
- **Visual Assets & Interactive Innovations:** Governed by [`docs/VISUAL_AND_FEATURE_PLAN.md`](VISUAL_AND_FEATURE_PLAN.md) (monograph-quality photo inventory, traveling gallery viewfinder gliders, blueprint inspection grid, and print-to-PDF dossier).
- **Explicitly Banned:** Availability status indicators and live studio clock chips (explicitly rejected).

---

## 6. Verification Pipeline

Quality is enforced via automated gates executed in order:
1. `npm run typecheck` — 0 TypeScript errors.
2. `npm run lint` — 0 ESLint warnings/errors.
3. `npm run clean && npm run build` — Clean static build, 26 app routes in `out/`.
4. `npm run verify:routes` — All 25 expected route files verified.
5. `npm run verify:brand` — 0 hardcoded brand string leaks across monitored files.
6. `npm run test:e2e` — 66/66 opaque-box assertions pass across all 4 tiers.
7. `npm run verify:all` — Unified runner chaining all above gates.
