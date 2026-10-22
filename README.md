# Apex Digital — studio portfolio

A statically exported marketing site for an independent digital studio. The design is an editorial document rather than a component catalogue: one type-led composition, deliberate negative space, and five movements on the home page. See [ADR-007](docs/ADR/007-editorial-reset.md) for the composition and [ADR-006](docs/ADR/006-visual-identity-pivot.md) for the design DNA.

> The brand name, contact addresses, and project metrics are provisional. See [KNOWN_ISSUES](docs/KNOWN_ISSUES.md) before treating any content as production truth.

## Stack

- Next.js 15 App Router, static export (`output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`)
- TypeScript strict mode
- Tailwind CSS 3.4 with a deliberately reduced scale: 2px micro-radius, hard offset shadows, one accent
- `next/font/google`: Cormorant Garamond (display), Space Mono (metadata), Inter (body)
- Framer Motion for optional entrance motion
- No backend. The contact form posts to `NEXT_PUBLIC_FORM_ENDPOINT` or runs in preview mode.

## Routes

29 pages are exported:

| Route | Output | Purpose |
|---|---|---|
| `/` | `out/index.html` | Five-movement editorial home: hero, work index, capabilities, studio statement, contact |
| `/services` | `out/services/index.html` | Four disciplines with all nine services as typographic entries |
| `/services/[slug]` | 9 pages | Overview, deliverables, method, tools, FAQ |
| `/portfolio` | `out/portfolio/index.html` | Filterable work index |
| `/portfolio/[slug]` | 6 pages | Metrics, problem/approach, stack, next project |
| `/about` | `out/about/index.html` | Studio story, commitments, mission, principles |
| `/team` | `out/team/index.html` | Three founders |
| `/process` | `out/process/index.html` | Six-step method and delivery standards |
| `/contact` | `out/contact/index.html` | Rule-field enquiry form and direct channels |
| `/privacy`, `/terms` | 2 pages | Legal copy |
| `/404` | `out/404.html` | Recovery page |
| `/sitemap.xml`, `/robots.txt` | metadata | Crawler routes |

## Design system

- **Canvas:** Warm Gallery in light mode, Cold Studio in dark mode. International Orange is the only accent and is used for marks, hover states, and metric figures.
- **Type:** `text-display-xl` for the hero, `text-display-lg` for page titles, `text-display-md` for section titles. Mono metadata never renders below 10px.
- **Geometry:** 2px micro-radius, hard offset shadows, borderless by default. Space and the hard shadow create depth; no blurred glows.
- **Composition:** `PageHeader` opens interior pages; `WorkIndex` / `PortfolioFilterGrid` render projects as rows; `ContactBlock` closes every page. Home sections use The Gallerist spacing.
- **Forms:** transparent fields with a single bottom rule; the rule turns International Orange on focus.

Full details in [docs/TECHNICAL_MANUAL.md](docs/TECHNICAL_MANUAL.md), [GLOSSARY.md](GLOSSARY.md), and [ADR-007](docs/ADR/007-editorial-reset.md).

## Commands

```bash
npm run dev            # local development
npm run typecheck      # tsc --noEmit
npm run lint           # eslint app components content
npm run build          # static export into out/
npm run verify:routes  # 27 route files must exist
npm run verify:brand   # no hardcoded brand strings in app/ or components/
npm run verify:all     # typecheck, lint, build, route and brand gates
node tests/e2e/runner.mjs   # 66 opaque-box assertions against out/
```

On Windows, if `next build` fails with a webpack runtime or `no direct app page entry` invariant after editing, delete `.next/` and rebuild. This is a known Next 15 cache issue, not a source error.

## Content model

All copy is centralized. Do not hardcode brand or contact strings in components.

| File | Export | Owns |
|---|---|---|
| `content/site.ts` | `siteConfig` | Brand, legal name, hero, studio statement, contact, navigation, stats, CTA |
| `content/services.ts` | `services`, `serviceGroups` | Nine services, four groups, deliverables, process, tools, FAQs |
| `content/projects.ts` | `projects` | Six case studies, featured flags, metrics, problem/approach |
| `content/team.ts` | `teamMembers` | Founders and roles |
| `content/process.ts` | `processSteps` | Six-step delivery method |

## Project layout

```
app/                  routes, metadata, static export constraints
components/
  layout/             Navbar, Footer, PageHeader, Container, Section, ThemeToggle
  sections/           Hero, WorkIndex, Capabilities, StudioStatement, ContactBlock
  portfolio/          PortfolioFilterGrid
  forms/              ContactForm
  ui/                 Button, Badge, Card, Input, Select, Textarea
  motion/             MotionProvider, ScrollReveal, RevealItem, Parallax
content/              typed content modules
styles/globals.css    tokens, base typography, focus and selection
docs/                 ADRs, technical manual, roadmap, known issues
scripts/              route and brand verification
tests/e2e/            opaque-box runner and tiers
```

## Status

Build, typecheck, lint, route verification, brand isolation, and all 66 E2E assertions pass as of 2026-10-22. The site is not launch-ready: it needs real project imagery, founder portraits, verified brand details, and verified metrics. Those gaps are tracked in [docs/KNOWN_ISSUES.md](docs/KNOWN_ISSUES.md) and [docs/ROADMAP.md](docs/ROADMAP.md).
