# Team NJS — studio portfolio

Team NJS is an independent studio in Dhaka designing and building web platforms, mobile products, and the systems behind them. This is its marketing site: a statically exported editorial document rather than a component catalogue, with one type-led composition, deliberate negative space, and five movements on the home page. See [ADR-007](docs/ADR/007-editorial-reset.md) for the composition, [ADR-006](docs/ADR/006-visual-identity-pivot.md) for the design DNA, and [ADR-008](docs/ADR/008-studio-consolidation-and-architectural-seams.md) for the 4-pillar navigation and architectural seams.

> “Team NJS” is a provisional trading name; the final brand name and legal entity are undecided. See [KNOWN_ISSUES](docs/KNOWN_ISSUES.md) and [CONTENT_DECISIONS](docs/CONTENT_DECISIONS.md) before treating any content as production truth.

## Stack

- Next.js 16 App Router, static export (`output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`)
- TypeScript strict mode
- Tailwind CSS 3.4 with a deliberately reduced scale: 2px micro-radius, hard offset shadows, one signature accent
- `next/font/google`: Cormorant Garamond (display), Space Mono (metadata), Inter (body)
- Framer Motion for optional entrance motion
- No backend. The contact form posts to `NEXT_PUBLIC_FORM_ENDPOINT` or runs in preview mode with instant feedback.
- Architecture Seams: Domain queries (`content/queries.ts`), metadata factory (`lib/metadata.ts`), decoupled intake (`lib/contact.ts`), and unified project rows (`components/portfolio/ProjectRow.tsx`).

## Navigation & Routes

The site features a focused **4-pillar main navigation**: **`Work`** (`/portfolio`), **`Services`** (`/services`), **`Studio`** (`/about`), and **`Contact`** (`/contact`).

28 pages are statically exported:

| Route | Output | Purpose |
|---|---|---|
| `/` | `out/index.html` | Five-movement editorial home: hero, work index, capabilities, studio statement, contact |
| `/services` | `out/services/index.html` | Four disciplines with all nine services as typographic entries |
| `/services/[slug]` | 9 pages | Overview, deliverables, method, tools, FAQ |
| `/portfolio` | `out/portfolio/index.html` | Filterable work index with unified project rows |
| `/portfolio/[slug]` | 6 pages | Metrics, problem/approach, stack, next project |
| `/about` | `out/about/index.html` | Multi-chapter Studio dossier: The Story & Philosophy, Leadership, Delivery Method & Standards, Commitments |
| `/team` | `out/team/index.html` | Three founders leadership page (cross-linked with Studio Chapter 2) |
| `/process` | `out/process/index.html` | Six-step method and delivery standards (cross-linked with Studio Chapter 3) |
| `/contact` | `out/contact/index.html` | Rule-field enquiry form, URL service pre-selection, and direct channels |
| `/privacy`, `/terms` | 2 pages | Legal governance copy |
| `/404` | `out/404.html` | Branded recovery page |
| `/sitemap.xml`, `/robots.txt` | metadata | Crawler routes |

## Design system

- **Canvas:** Warm Gallery in light mode, Cold Studio in dark mode. International Orange is the only accent and is used for marks, hover states, and metric figures.
- **Type:** `text-display-xl` for the hero, `text-display-lg` for page titles, `text-display-md` for section titles. Mono metadata never renders below 10px.
- **Geometry:** 2px micro-radius, hard offset shadows, borderless by default. Space and the hard shadow create depth; no blurred glows.
- **Composition:** `PageHeader` opens interior pages; `ProjectRow` renders projects across Home and Portfolio; `ContactBlock` closes every page. Home sections use The Gallerist spacing.
- **Forms:** transparent fields with a single bottom rule; the rule turns International Orange on focus. Auto-selects inquiry service via `?service=slug` URL parameter.

Full details in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [ADR-006](docs/ADR/006-visual-identity-pivot.md), [ADR-007](docs/ADR/007-editorial-reset.md), and [ADR-008](docs/ADR/008-studio-consolidation-and-architectural-seams.md).

## Commands

```bash
npm run dev            # local development with webpack
npm run clean          # remove .next/ and out/
npm run typecheck      # tsc --noEmit
npm run lint           # eslint app components content lib
npm run build          # static export into out/
npm start              # serve out/ at http://127.0.0.1:3000
npm run verify:routes  # 27 static route files must exist
npm run verify:brand   # no hardcoded brand strings in app/, components/, or lib/
npm run test:e2e       # 66 opaque-box assertions against out/
npm run verify:all     # typecheck, lint, build, routes, brand, E2E
```

On Windows, if `next build` fails with a webpack runtime or `no direct app page entry` invariant after editing, run `npm run clean` and rebuild. This is a known Next cache issue, not a source error.

The build and dev scripts pass `--webpack`. Next 16's Turbopack currently emits only the pages-router 404 for this static-export app, so webpack remains the stable builder until that is resolved (`KI-011`).

## Content Architecture

All copy is centralized. Do not hardcode brand or contact strings in components or libraries.

| File | Primary Export | Responsibility |
|---|---|---|
| `content/site.ts` | `siteConfig` | Brand, legal name, hero, studio statement, contact, 4-pillar navigation, stats, CTA |
| `content/queries.ts` | `getProjects()`, `getServices()`, `getTeamMembers()`, `getProcessSteps()` | Unified, typed query facade centralizing all data access |
| `content/services.ts` | `services`, `serviceGroups` | Nine services, four groups, deliverables, process, tools, FAQs |
| `content/projects.ts` | `projects` | Six case studies, featured flags, metrics, problem/approach |
| `content/team.ts` | `teamMembers` | Founders and leadership roles |
| `content/process.ts` | `processSteps` | Six-step delivery method |

## Project layout

```
app/                  routes, metadata factory integrations, static export constraints
components/
  layout/             Navbar, Footer, PageHeader, Container, Section, ThemeToggle
  sections/           Hero, WorkIndex, Capabilities, StudioStatement, ContactBlock
  portfolio/          PortfolioFilterGrid, ProjectRow
  forms/              ContactForm
  ui/                 Button, Input, Select, Textarea, utils
  motion/             MotionProvider, Reveal
content/              typed content modules and queries facade
lib/                  metadata factory (createPageMetadata), contact validation and helpers
styles/globals.css    tokens, base typography, focus and selection
docs/                 architecture, creative plan, content decisions, roadmap, known issues, ADRs
scripts/              route, brand, and context-hygiene verification
tests/                opaque-box runner and test inventory
```

## Deployment & Hosting

The site is configured for automatic static deployment to **Hostinger** via GitHub Actions on push to `main`. It includes `public/.htaccess` with LiteSpeed cache-busting on HTML (`X-LiteSpeed-Cache-Control: no-cache`), immutable 1-year asset caching, trailing slash normalization, and branded 404 handling. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for details.

## Status

Build, typecheck, lint, route verification, zero-brand-leak scanning, and all 66 E2E assertions pass. The site is currently in **Phase 4 (Content & Visual Ingestion)**: preparing authentic project imagery, founder portraits, verified brand details, and client outcomes per [docs/VISUAL_AND_FEATURE_PLAN.md](docs/VISUAL_AND_FEATURE_PLAN.md) and [docs/CONTENT_DECISIONS.md](docs/CONTENT_DECISIONS.md).
