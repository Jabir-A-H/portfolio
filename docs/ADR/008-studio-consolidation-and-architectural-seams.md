# ADR 008: 4-Pillar Studio Navigation & Architectural Seams

- **Status:** Accepted and Implemented
- **Date:** 2026-10-23
- **Deciders:** Product Innovation Lead, Engineering Architecture

## Context
Following the editorial reset ([ADR-007](007-editorial-reset.md)), two architectural challenges remained:
1. **Information Architecture Clutter:** The top navbar had 6 items (`Services`, `Portfolio`, `About`, `Team`, `Process`, `Contact`). For a 3-person studio without photos, standalone `/team` (77 lines) and `/process` (119 lines) pages felt thin and diluted brand authority.
2. **Repetitive Component & Domain Logic:** Multiple routes performed repetitive array filtering, 11 route files duplicated Next.js metadata objects, `ContactForm.tsx` bundled 390 lines of validation with UI presentation, and `WorkIndex.tsx` and `PortfolioFilterGrid.tsx` duplicated project row layouts.

## Decision

### 1. 4-Pillar Navigation Consolidation
Consolidate primary navigation into four clear pillars:
- **`Work`** (`/portfolio`)
- **`Services`** (`/services`)
- **`Studio`** (`/about`)
- **`Contact`** (`/contact`)

### 2. Consolidated Studio Dossier & Single-Page Pruning
Recompose [`app/about/page.tsx`](file:///d:/WebDev/portfolio/app/about/page.tsx) into a focused editorial studio dossier:
- **Movement 01:** The Story & Philosophy (studio origins in Dhaka + workspace photography proof)
- **Movement 02:** Leadership ("Three founders, one room" with authentic profiles, portraits, and LinkedIn links)
- **Movement 03:** Measured Outcomes (tangible studio metrics from `siteConfig.stats`)

Decommission redundant single-purpose `/team` and `/process` pages to eliminate duplicate content and thin standalone pages, consolidating all agency identity into the 4 core pillars (`Work`, `Services`, `Studio`, `Contact`).

### 3. Centralized Query Facade (`content/queries.ts`)
Centralize all derived domain logic (`getProjects()`, `getFeaturedProjects()`, `getProjectBySlug()`, `getServices()`, `getServiceOptionsForContact()`, `getTeamMembers()`, `getProcessSteps()`) in `content/queries.ts`. Pages and components no longer query raw arrays directly.

### 4. Unified `<ProjectRow />` Component
Extract [`components/portfolio/ProjectRow.tsx`](file:///d:/WebDev/portfolio/components/portfolio/ProjectRow.tsx) to unify project row layout, category short-labels, hover states, metrics, and responsive mobile reflow between Home and Portfolio.

### 5. Centralized Page Metadata Factory (`lib/metadata.ts`)
Implement `createPageMetadata({ title, description, path, ogType, image })` in `lib/metadata.ts`. Guarantees canonical URLs, OpenGraph tags, and Twitter cards across all routes without boilerplate.

### 6. Decoupled Contact Intake (`lib/contact.ts`)
Separate schema validation (`validateContactForm`), options constants, and WhatsApp URL generation into `lib/contact.ts`. Wire URL search param pre-selection (`/contact?service=slug`) with Next.js static export compatibility using `<React.Suspense>`.

## Consequences
- **Positive:** Greatly reduced cognitive load for prospective clients; eliminated thin-page impression; removed ~300 lines of duplicated code; unified data access behind a type-safe facade.
- **Negative:** Main navbar changed from 6 to 4 items (intentional UX improvement). Developers must use `content/queries.ts` rather than querying raw arrays.
