# Project: Marketing Agency Site Skeleton

## Architecture
- **Framework**: Next.js 15+ (App Router) + TypeScript + Tailwind CSS (v3.4)
- **Deployment & Export**: Static export (`output: 'export'`), `trailingSlash: true`, `images: { unoptimized: true }`
- **Branding & Content Philosophy**: Single source of truth in `content/site.ts`. ZERO hardcoded brand/contact strings in UI components.
- **Theming**: CSS variables design tokens (`--primary`, `--accent`, `--background`, `--surface`, `--text`, `--muted`, `--border`) with class-based `.dark` toggle in Navbar, localStorage persistence, and inline anti-FOUC script.
- **Responsive Geometry**: Mobile-first across 360px, 768px, 1024px, 1440px with strict zero horizontal scrollbar leak enforcement.
- **Form Handling**: Client-validated static form with honeypot spam protection, `fetch` submission, WhatsApp action URL, and email fallback.
- **SEO & Quality Scaffolding**: Open Graph / Twitter metadata, dynamic `app/sitemap.ts`, `app/robots.ts`, JSON-LD (`Organization`, `Service`), and automated build & brand integrity verification scripts.

---

## Feature Inventory
Every feature discovered in the Survey phase is mapped to a milestone below.

| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Programmatic Project Setup | Bootstrap `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts` | M1 | explorer_1 |
| 2 | Static Export Configuration | Configure `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }` | M1 | explorer_1 / spec_miner_1 |
| 3 | Design Token CSS Variables | Define light & dark CSS variable palettes in `styles/globals.css` mapped to Tailwind | M1 | spec_miner_2 |
| 4 | Dark Mode Toggle & Anti-FOUC | Class-based dark mode toggle in navbar, localStorage persistence, inline `<head>` script | M1 | spec_miner_2 |
| 5 | Centralized Content Single Source of Truth | Create `content/site.ts` with brand, taglines, contact info, socials, and navigation items | M1 | spec_miner_1 |
| 6 | Services Data Model | Create `content/services.ts` defining all 9 services across 4 groups with uniform section models | M1 | spec_miner_1 |
| 7 | Projects Data Model | Create `content/projects.ts` defining portfolio case studies, filters, and featured flags | M1 | spec_miner_1 |
| 8 | Team Data Model | Create `content/team.ts` defining "The three heads" leadership bios, roles, socials | M1 | spec_miner_1 |
| 9 | Process Data Model | Create `content/process.ts` defining 5-6 step agency workflow | M1 | spec_miner_1 |
| 10 | UI Primitives: Container & Section | `Container` (max-width limiter) and `Section` (consistent vertical rhythm) | M1 | spec_miner_2 |
| 11 | UI Primitives: Button & Badge | Accessible multi-variant `Button` and status `Badge` | M1 | spec_miner_2 |
| 12 | UI Primitives: Card & Form Elements | `Card`, `Input`, `Textarea`, `Select` reusable components | M1 | spec_miner_2 |
| 13 | Global Layout: Navbar | Sticky navbar with brand placeholder from `site.ts`, links, dark toggle, "Get a Quote" CTA, mobile menu | M1 | spec_miner_1 / spec_miner_2 |
| 14 | Global Layout: Footer | Multi-column links, contact details from `site.ts`, social icons, copyright | M1 | spec_miner_1 |
| 15 | Home Page: Hero Section | Headline, subheadline, primary CTA ("Start a Project"), secondary CTA ("View Our Work") | M2 | spec_miner_1 |
| 16 | Home Page: Trust Bar | Placeholder client logos row with responsive wrap/marquee | M2 | spec_miner_1 |
| 17 | Home Page: Services Overview | 4 group cards mapping to service categories linking to `/services` | M2 | spec_miner_1 |
| 18 | Home Page: Featured Projects | 3 curated project cards sliced from `projects.ts` | M2 | spec_miner_1 |
| 19 | Home Page: Stats Strip | Key metrics (years, projects, clients, countries) clearly tagged TODO | M2 | spec_miner_1 |
| 20 | Home Page: Process Preview | 5-6 step overview progression with link to `/process` | M2 | spec_miner_1 |
| 21 | Home Page: Tech Stack Strip | Grid/strip of technologies used across services | M2 | spec_miner_1 |
| 22 | Home Page: Testimonials Suppression | Suppress testimonials section until real reviews exist (clean null render) | M2 | spec_miner_1 |
| 23 | Home Page: Final CTA Banner | Pre-footer high-contrast CTA banner linking to `/contact` | M2 | spec_miner_1 |
| 24 | Services Overview Route (`/services`) | Lists 4 categories and all 9 services with cards and links | M2 | spec_miner_1 |
| 25 | Service Dynamic Route (`/services/[slug]`) | 9 pre-rendered pages with overview, deliverables, process, tech, FAQ, CTA | M2 | spec_miner_1 |
| 26 | Portfolio Overview Route (`/portfolio`) | Filterable grid of case studies by category | M2 | spec_miner_1 |
| 27 | Portfolio Dynamic Route (`/portfolio/[slug]`) | Dynamic case study pages with problem, solution, metrics, tech, gallery | M2 | spec_miner_1 |
| 28 | About Route (`/about`) | Company story, mission, core values | M2 | spec_miner_1 |
| 29 | Team Route (`/team`) | Leadership profiles ("The three heads") | M2 | spec_miner_1 |
| 30 | Process Route (`/process`) | Detailed 5-6 step agency workflow breakdown | M2 | spec_miner_1 |
| 31 | Legal Routes (`/privacy`, `/terms`) | Pre-rendered privacy and terms pages using dynamic brand name from `site.ts` | M2 | spec_miner_1 |
| 32 | Custom 404 Route (`not-found.tsx`) | Custom branded error page rendering `out/404.html` | M2 | spec_miner_1 |
| 33 | Contact Form Component & Validation | Client-side validated form (name, email, company, service dropdown, budget, timeline, message) | M3 | spec_miner_2 |
| 34 | Honeypot & Anti-Spam | Hidden honeypot field rejecting bots without UI interruption | M3 | spec_miner_2 |
| 35 | Form Submission & State Banners | `fetch` to configurable endpoint (`NEXT_PUBLIC_FORM_ENDPOINT`), loading, success/error alerts | M3 | spec_miner_2 |
| 36 | Direct WhatsApp & Email Actions | Direct WhatsApp chat link (`https://wa.me/...`) and plain email fallback | M3 | spec_miner_1 / spec_miner_2 |
| 37 | SEO Metadata Scaffolding | Per-page Open Graph and Twitter metadata generation | M3 | spec_miner_2 |
| 38 | Dynamic Sitemap & Robots | `app/sitemap.ts` and `app/robots.ts` exporting `out/sitemap.xml` and `out/robots.txt` | M3 | spec_miner_1 / spec_miner_2 |
| 39 | JSON-LD Structured Data | Organization schema on Home, Service schema on service detail pages | M3 | spec_miner_2 |
| 40 | Verification Script: Pre-rendered Routes | `scripts/verify-routes.mjs` verifying all required HTML files exist in `out/` | M3 | spec_miner_2 |
| 41 | Verification Script: Zero Hardcoded Brands | `scripts/verify-no-hardcoded-brand.mjs` scanning for literal brand strings | M3 | spec_miner_2 |
| 42 | Full E2E Test Suite Pass (Tiers 1-4) | 100% pass of requirement-driven test suite | M4 | ORIGINAL_REQUEST / plan-01 |
| 43 | Adversarial Coverage Hardening (Tier 5) | White-box adversarial testing, edge-case hardening, and zero-defect audit | M4 | ORIGINAL_REQUEST / plan-01 |

---

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundations, Design Tokens & Centralized Content | Setup, configs, design tokens, `site.ts`, all content models, UI primitives, Navbar & Footer | none | DONE (Verified: build & types pass, tokens & models complete) |
| M2 | Core Marketing Routes & Dynamic Templates | All 14 routes, 9 service pages, portfolio pages, static pages, full 10-section Home page | M1 | DONE (Verified: 26 static pages pre-rendered, 5/5 gate pass) |
| M3 | Contact Form, Marketing Integrations & SEO/Verification Suite | Client-validated contact form, honeypot, WhatsApp link, SEO, sitemap/robots, verification scripts | M1, M2 | DONE (Verified: 29 static pages, routes & brand verification scripts pass) |
| M4 | Final Milestone: 100% E2E Test Suite Pass & Adversarial Hardening | Phase 1: Pass 100% of E2E test suite (Tiers 1-4). Phase 2: Adversarial coverage hardening (Tier 5). | M1, M2, M3, E2E Track | DONE (Verified: 66/66 tests pass, 100% pass rate, verify:all pass) |

In parallel:
- **E2E Testing Track**: Dispatched concurrently to build the requirement-driven opaque-box test suite (Tiers 1-4), publishing `TEST_READY.md`.

---

## Interface Contracts

### 1. `content/site.ts` ↔ UI Components
```typescript
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo: {
    text: string;
    placeholderUrl?: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string; // e.g. "8801700000000" (raw digits for wa.me)
    whatsappDisplay: string;
    address: {
      street: string;
      city: string;
      country: string;
    };
  };
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  nav: {
    main: Array<{ title: string; href: string }>;
    footer: {
      services: Array<{ title: string; href: string }>;
      company: Array<{ title: string; href: string }>;
      legal: Array<{ title: string; href: string }>;
    };
  };
  stats: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
  ctaBanner: {
    headline: string;
    subheadline: string;
    primaryButtonText: string;
    primaryButtonHref: string;
  };
}
```

### 2. `content/services.ts` ↔ Service Routes & Components
```typescript
export type ServiceGroupId = 'web-software' | 'mobile-games' | 'automation-integration' | 'creative';

export interface ServiceGroup {
  id: ServiceGroupId;
  title: string;
  description: string;
  iconName: string;
  serviceSlugs: string[];
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  groupId: ServiceGroupId;
  overview: {
    headline: string;
    content: string[];
  };
  whatWeDeliver: string[];
  process: Array<{ step: number; title: string; description: string }>;
  technologies: string[];
  faqs: Array<{ question: string; answer: string }>;
  cta: {
    headline: string;
    buttonText: string;
  };
}
```

### 3. `content/projects.ts` ↔ Portfolio Routes & Home Featured
```typescript
export interface ProjectItem {
  slug: string;
  title: string;
  category: string; // e.g. "Web & Software", "Mobile", "Automation"
  clientType: string;
  summary: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: string[];
  featured: boolean; // Exactly 3 featured items or query helper selects top 3
  thumbnailUrl: string;
  galleryUrls?: string[];
  liveUrl?: string;
}
```

### 4. `content/team.ts` & `content/process.ts`
- `team.ts`: Array of 3 leadership members with `id`, `name`, `role`, `bio`, `skills`, `socials`, `imagePlaceholder`.
- `process.ts`: Array of 5-6 steps with `stepNumber`, `title`, `shortSummary`, `detailedDescription`, `deliverables`.

---

## Code Layout
```
/app
  layout.tsx
  page.tsx
  services/
    page.tsx
    [slug]/
      page.tsx
  portfolio/
    page.tsx
    [slug]/
      page.tsx
  about/page.tsx
  team/page.tsx
  process/page.tsx
  contact/page.tsx
  privacy/page.tsx
  terms/page.tsx
  not-found.tsx
  sitemap.ts
  robots.ts
/components
  layout/
    Navbar.tsx
    Footer.tsx
    Container.tsx
    Section.tsx
    ThemeToggle.tsx
  ui/
    Button.tsx
    Card.tsx
    Badge.tsx
    Input.tsx
    Textarea.tsx
    Select.tsx
  sections/
    Hero.tsx
    TrustBar.tsx
    ServicesOverview.tsx
    FeaturedProjects.tsx
    StatsStrip.tsx
    ProcessPreview.tsx
    TechStackStrip.tsx
    CTABanner.tsx
  forms/
    ContactForm.tsx
/content
  site.ts
  services.ts
  projects.ts
  team.ts
  process.ts
/public
  logo/
  images/
/styles
  globals.css
/scripts
  verify-routes.mjs
  verify-no-hardcoded-brand.mjs
```
