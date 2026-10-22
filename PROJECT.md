# Project: Apex Digital Studio Portfolio

> Living architecture and feature spec. Last reconciled 2026-10-22 against commit `95c45c4`.
> Design rationale: [ADR-007](docs/ADR/007-editorial-reset.md). Operations: [TECHNICAL_MANUAL](docs/TECHNICAL_MANUAL.md).

## 1. What this is

A multi-page marketing site for an independent digital studio. It is a pure static export: no server runtime, no database, no auth. The visual direction is editorial, not dashboard-like: type-led hierarchy, hairline rules, asymmetric composition, and a single vermilion accent.

The content is provisionally branded. "Apex Digital", `hello@apexdigital.studio`, and the project metrics are placeholders until the real studio details are supplied.

## 2. Architecture

- **Framework:** Next.js 15 App Router, React 19, TypeScript strict.
- **Export:** `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`.
- **Dynamic routes:** `/services/[slug]` and `/portfolio/[slug]` declare `dynamicParams = false` and provide `generateStaticParams()`.
- **Brand isolation:** no brand or contact literals in `app/` or `components/`; everything imports from `content/site.ts`. Enforced by `scripts/verify-no-hardcoded-brand.mjs`.
- **Theming:** HSL variables in `styles/globals.css`, mapped in `tailwind.config.ts`, `.dark` class toggled by an inline anti-FOUC script and `ThemeToggle`.
- **Forms:** client-side validation, honeypot, `fetch` to `NEXT_PUBLIC_FORM_ENDPOINT`, simulated success when unset.
- **Motion:** framer-motion entrance primitives; the editorial pages remain legible without JavaScript animation.

## 3. Design system

### Tokens
| Role | Light | Dark |
|---|---|---|
| Canvas | `hsl(40 35% 94%)` warm paper | `hsl(40 6% 7%)` cold ink |
| Surface | `hsl(38 31% 90%)` | `hsl(32 8% 10%)` |
| Text | `hsl(30 14% 10%)` ink | `hsl(38 26% 87%)` bone |
| Accent | `hsl(15 88% 47%)` vermilion | `hsl(15 88% 53%)` |
| Border | `hsl(35 17% 78%)` | `hsl(33 8% 22%)` |
| Radius | `0` | `0` |

### Type
- Cormorant Garamond 300–600: hero, page titles, section titles, names, project titles.
- Space Mono 400/700: ordinals, labels, categories, timelines, technology lists. Minimum 10px.
- Inter: body copy and UI chrome.
- Scale: `display-xl` 3.4–8.75rem, `display-lg` 2.6–4.75rem, `display-md` 1.9–2.9rem, `label` 0.6875rem tracked 0.16em.
- Hero emphasis is authored as `*outlast*` in `content/site.ts` and rendered as `<em>`.

### Geometry
- Tailwind radius scale exposes only `DEFAULT`, `none`, `full`; shadow scale exposes only `none`.
- Composition relies on `border-t` / `border-b` hairlines, 12-column grids, and fluid `px-gutter` / `py-section` spacing.
- Cards are flat compartments: top rule and padding only.

## 4. Page composition

### Home (`app/page.tsx`)
1. `Hero` — studio strip, display statement, lede, two actions, discipline rule.
2. `WorkIndex` — three featured projects as index rows (ordinal, category, title, sector, metric).
3. `Capabilities` — four service groups as index rows with descriptions and counts.
4. `StudioStatement` — inverted band, statement, two paragraphs, about link.
5. `ContactBlock` — display question, email, contact link.

### Interior pages
Every top-level page and both detail templates open with `PageHeader` (label, display title, right-margin lede, metadata) and close with `ContactBlock`.

- `/services` — four discipline sections; services as two-column typographic entries.
- `/services/[slug]` — overview, deliverables, method, tools, FAQ.
- `/portfolio` — client-side category filter as text tabs, then the same row grammar as the home index.
- `/portfolio/[slug]` — metrics, problem, approach, stack, next project.
- `/about` — story, commitments, mission/vision, operating principles, stats.
- `/team` — three founders as rows, one studio statement.
- `/process` — six steps as rows, then delivery standards.
- `/contact` — rule-field form, direct channels as a definition list.
- `/privacy`, `/terms` — narrow legal documents with a breadcrumb strip.
- `/404` — oversized 404 plate, one sentence, three recovery links.

## 5. Content interfaces

```ts
// content/site.ts
interface SiteConfig {
  name: string; legalName: string; tagline: string; description: string; url: string; locale: string;
  logo: { text: string; placeholderUrl: string };
  hero: {
    headline: string; subheadline: string; disciplines: string[]; note: string;
    primaryCta: NavLink; secondaryCta: NavLink;
  };
  studio: { statement: string; body: string[]; cta: NavLink };
  contact: { email: string; phone: string; whatsapp: string; whatsappDisplay: string; whatsappUrl: string; address: { street: string; city: string; country: string; formatted: string }; workingHours: string };
  socials: { github?: string; linkedin?: string; twitter?: string; facebook?: string; list: SocialLink[] };
  nav: { main: NavLink[]; cta: { getQuote: NavLink; startProject: NavLink; viewWork: NavLink }; footer: { services: NavLink[]; company: NavLink[]; legal: NavLink[] } };
  stats: StatItem[];
  ctaBanner: { headline: string; subheadline: string; primaryButtonText: string; primaryButtonHref: string };
  features: { showTestimonials: boolean };
}
```

```ts
// content/services.ts
type ServiceGroupId = 'web-software' | 'mobile-games' | 'automation-integration' | 'creative';
interface ServiceItem {
  id: string; slug: string; title: string; shortDescription: string;
  groupId: ServiceGroupId; groupName: string; iconName: string;
  overview: { headline: string; description: string; benefits: string[] };
  whatWeDeliver: { headline: string; items: { title: string; description: string }[] };
  process: { step: number; title: string; description: string }[];
  technologies: { name: string; category?: string }[];
  faqs: { question: string; answer: string }[];
  cta: { headline: string; subheadline: string; buttonText: string; buttonLink: string };
}
```

```ts
// content/projects.ts
interface ProjectItem {
  id: string; slug: string; title: string;
  category: 'Web & Software' | 'Mobile & Games' | 'Automation & Integration' | 'Creative';
  clientType: string; summary: string; problem: string; solution: string;
  technologies: string[]; results: { metric: string; label: string }[];
  featured: boolean; thumbnailUrl: string; galleryUrls: string[];
  liveUrl?: string; completedDate: string;
}
```

- `content/team.ts`: `TeamMember[]` with `id`, `name`, optional `role`, `bio`, `photoUrl`, `skills`, `socials`.
- `content/process.ts`: `ProcessStep[]` with `stepNumber`, `title`, `summary`, `detailedDescription`, `deliverables`, `timeline`, `iconName`.

## 6. Component inventory

| Area | Components |
|---|---|
| Layout | `Navbar`, `Footer`, `PageHeader`, `Container`, `Section`, `ThemeToggle` |
| Home | `Hero`, `WorkIndex`, `Capabilities`, `StudioStatement`, `ContactBlock` |
| Portfolio | `PortfolioFilterGrid` (client) |
| Forms | `ContactForm` (client), `Input`, `Select`, `Textarea` |
| UI | `Button`, `Badge`, `Card` and its subcomponents |
| Motion | `MotionProvider`, `ScrollReveal`, `RevealItem`, `Parallax`, `ParallaxLayer` |

`TrustBar`, `StatsStrip`, `TechStackStrip`, `Testimonials`, `ProcessPreview`, `ServicesOverview`, `FeaturedProjects`, and `CTABanner` are no longer imported. They remain on disk only because the agent sandbox denied deletions; remove them in a normal editor session.

## 7. Verification

| Gate | Command | Expected |
|---|---|---|
| Types | `npm run typecheck` | exit 0 |
| Lint | `npm run lint` | exit 0 |
| Export | `npm run build` | 29 routes, `out/` written |
| Route files | `npm run verify:routes` | 27/27 found |
| Brand isolation | `npm run verify:brand` | 0 violations |
| E2E | `node tests/e2e/runner.mjs` | 66/66 |
| Unified | `npm run verify:all` | all of the above except E2E |
| Viewport | pending | `@playwright/test` not installed; see KI-008 |

## 8. Current gaps

- No real project imagery, founder portraits, or studio photography (`KI-005`).
- Provisional brand, domain, email, phone, and address (`KI-006`).
- Illustrative metrics and stats (`KI-009`).
- Viewport test cannot run until Playwright is installed (`KI-008`).
- Legacy section components cannot be deleted from the agent sandbox (`KI-007`).

## 9. Code layout

```
app/                    routes, metadata, static export constraints
components/
  layout/               frame, page header, sections, theme
  sections/             home movements
  portfolio/            filter grid
  forms/                contact form
  ui/                   flat primitives
  motion/               optional entrance motion
content/                typed copy and data
styles/globals.css      tokens and base typography
scripts/                route and brand gates
tests/e2e/              opaque-box tiers plus runner
docs/                   ADRs, manual, roadmap, known issues
```
