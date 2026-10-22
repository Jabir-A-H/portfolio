# ADR-007: Editorial Reset — Composition Over Decoration

## Status
Accepted and implemented.

## Date
2026-10-22

## Context

ADR-006 established a deliberate visual identity (Cormorant Garamond, Space Mono, warm paper, International Orange, 2px geometry). It was applied to the existing page structures, but the structures themselves were still the original template: nine stacked marketing sections, each opening with a centered badge + headline + paragraph, each built from card grids, icon tiles, checkmark lists, and boxed calls to action.

The result read as a template wearing a new typeface. The problem was not the palette or the fonts. It was the composition: a catalogue of components arranged in the same order as every other agency site. Placeholder strings (`[PLACEHOLDER]`, `// TODO(content)`) also remained visible in the interface, which made the site look unfinished rather than designed.

ADR-007 is the correction: stop decorating the template and recompose the page as an editorial document.

## Decision

### 1. The page is a sheet, not a dashboard
- The home page is five movements instead of nine sections: **Hero → Work index → Capabilities → Studio statement → Contact**.
- Sections are separated by hairlines and rhythm, not by cards, panels, gradients, or coloured bands.
- No section opens with a centered eyebrow + headline + subtitle formula. Headings sit left; supporting text sits in a right margin or a later column.
- No shadows, no rounded corners, no pills, no icon tiles, no checkmark bullet lists, no decorative gradients.

### 2. Typography carries the hierarchy
- One display size for the hero (`text-display-xl`, up to 8.75rem), one for page titles (`text-display-lg`), one for section titles (`text-display-md`).
- The hero headline uses a single italic emphasis, expressed in content with `*asterisks*` and rendered as `<em>`.
- Metadata is mono, uppercase, tracked, and never smaller than 10px. Content-bearing metadata (categories, timelines, technology lists) is set at 10–11px with reduced tracking.
- Body copy is 14–17px depending on role, with a maximum measure of roughly 60 characters.

### 3. Work is an index, not a card grid
- Projects are rows with ordinal, category, title, sector, year, and one metric. The row is the link; hover moves the title and marks the rule.
- Client names are withheld; sector descriptors stand in their place. No fake thumbnails, no gradient placeholder boxes, no "featured" badges.
- The same row grammar is used on `/portfolio`, with a text-based category filter in place of pills.

### 4. Services are a table of contents
- `/services` lists four disciplines, each with its services as two-column typographic entries.
- `/services/[slug]` uses the same page header, then overview, deliverables, method, tools, and questions as hairline-separated rows.
- Case studies follow the same pattern: header, metrics, problem/approach, stack, next project.

### 5. Interior pages share one opening spread
- `PageHeader` renders a mono label, a large serif title, a right-margin lede, and optional metadata. About, Services, Portfolio, Process, Team, Contact, and all detail pages use it.
- Every page ends with the same `ContactBlock` instead of a boxed CTA with two buttons.

### 6. Forms are part of the document
- Inputs, selects, and text areas are transparent with a single bottom rule; labels are mono and small; focus turns the rule vermilion.
- Validation errors sit under the field in plain language. Success is a confirmation line, not a green panel.

### 7. Palette and geometry
- Light: warm paper `hsl(40 35% 94%)`, ink `hsl(30 14% 10%)`, surface `hsl(38 31% 90%)`.
- Dark: ink `hsl(40 6% 7%)`, bone `hsl(38 26% 87%)`, surface `hsl(32 8% 10%)`.
- Vermilion `hsl(15 88% 47%)` remains the single signature, used for marks, hover states, and metric figures.
- Radius is zero. Shadows are removed from the Tailwind scale. Depth comes from rules and type weight.

### 8. Content cleanup
- Visible `[PLACEHOLDER]` and `// TODO(content)` markers removed from projects, services, and process copy.
- Project titles rewritten as short human names; summaries and narratives rewritten in plain, specific English.
- The trading name is provisionally set to "Apex Digital" so the chrome no longer displays a placeholder string. Contact details are provisional.

## Consequences

- **Positive:** The site now reads as a composed document rather than a component demo. Page length dropped by roughly 40%. Every page shares a coherent grammar. The code has fewer presentation variants: one Card, one Badge, one Button, one PageHeader.
- **Negative:** The site is almost entirely typographic. It now depends on real project imagery, founder portraits, and client-approved copy to reach its intended quality. Those assets are still missing (see `docs/KNOWN_ISSUES.md`).
- **Trade-off:** Some former components (`TrustBar`, `StatsStrip`, `TechStackStrip`, `Testimonials`, `ProcessPreview`, `ServicesOverview`, `FeaturedProjects`, `CTABanner`) are no longer imported. They remain on disk because the sandbox denies deletions; remove them in a normal editor session.
- **Governance:** Phase 1.5 of the roadmap is superseded by this ADR. `GLOSSARY.md` and `docs/TECHNICAL_MANUAL.md` have been updated to match.

## Files of record
- `app/page.tsx`, `app/portfolio/page.tsx`, `app/services/page.tsx`, `app/about/page.tsx`, `app/process/page.tsx`, `app/team/page.tsx`, `app/contact/page.tsx`
- `app/services/[slug]/page.tsx`, `app/portfolio/[slug]/page.tsx`, `app/not-found.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`
- `components/sections/` — Hero, WorkIndex, Capabilities, StudioStatement, ContactBlock
- `components/layout/` — Navbar, Footer, PageHeader, Container, Section
- `components/ui/` — Button, Badge, Card, Input, Select, Textarea
- `styles/globals.css`, `tailwind.config.ts`
- `content/site.ts`, `content/projects.ts`, `content/services.ts`, `content/process.ts`, `content/team.ts`
