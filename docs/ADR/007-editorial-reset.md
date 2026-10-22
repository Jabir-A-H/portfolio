# ADR-007: Editorial Reset — Composition Over Decoration

## Status
Accepted and implemented. **Composition only.** The palette, typography, geometry, rhythm, and motion settled in [ADR-006](006-visual-identity-pivot.md) remain in force. Where this ADR and ADR-006 disagree on a token, ADR-006 wins.

## Date
2026-10-22

## Context

ADR-006 established a deliberate visual identity (Cormorant Garamond, Space Mono, warm paper, International Orange, 2px micro-radius, hard shadows, extreme negative space, cinematic reveals). It was applied to the existing page structures, but the structures themselves were still the original template: nine stacked marketing sections, each opening with a centered badge + headline + paragraph, each built from card grids, icon tiles, checkmark lists, and boxed calls to action.

The result read as a template wearing a new typeface. The problem was not the palette or the fonts. It was the composition: a catalogue of components arranged in the same order as every other agency site. Placeholder strings (`[PLACEHOLDER]`, `// TODO(content)`) also remained visible in the interface, which made the site look unfinished rather than designed.

ADR-007 is the correction: stop decorating the template and recompose the page as an editorial document. It does not replace ADR-006's design language.

## Decision

### 1. The page is a sheet, not a dashboard
- The home page is five movements instead of nine sections: **Hero → Work index → Capabilities → Studio statement → Contact**.
- Sections are separated by rhythm first. The home page is borderless; interior pages keep structural hairlines only where scanning a long index requires them.
- No section opens with a centered eyebrow + headline + subtitle formula. Headings sit left; supporting text sits in a right margin or a later column.
- No blurred shadows, no pills, no icon tiles, no checkmark bullet lists, no decorative gradients. Micro-radius and hard offset shadows follow ADR-006.

### 2. Typography carries the hierarchy
- One display size for the hero (`text-display-xl`, up to 8.75rem), one for page titles (`text-display-lg`), one for section titles (`text-display-md`).
- The hero headline uses a single italic emphasis, expressed in content with `*asterisks*` and rendered as `<em>`.
- Metadata is mono, uppercase, tracked, and never smaller than 10px. Content-bearing metadata (categories, timelines, technology lists) is set at 10–11px with reduced tracking.
- Body copy is 14–17px depending on role, with a maximum measure of roughly 60 characters.

### 3. Work is an index, not a card grid
- Projects are rows with ordinal, category, title, sector, year, and one metric. The row is the link; hover moves the title, turns the arrow, and shifts the metric to International Orange.
- Client names are withheld; sector descriptors stand in their place. No fake thumbnails, no gradient placeholder boxes, no "featured" badges.
- The same row grammar is used on `/portfolio`, with a text-based category filter in place of pills.

### 4. Services are a table of contents
- `/services` lists four disciplines, each with its services as two-column typographic entries.
- `/services/[slug]` uses the same page header, then overview, deliverables, method, tools, and questions as separated rows.
- Case studies follow the same pattern: header, metrics, problem/approach, stack, next project.

### 5. Interior pages share one opening spread
- `PageHeader` renders a mono label, a large serif title, a right-margin lede, and optional metadata. About, Services, Portfolio, Process, Team, Contact, and all detail pages use it.
- Every page ends with the same `ContactBlock` instead of a boxed CTA with two buttons.

### 6. Forms are part of the document
- Inputs, selects, and text areas are transparent with a single bottom rule; labels are mono and small; focus turns the rule International Orange.
- Validation errors sit under the field in plain language. Success is a confirmation line, not a green panel.

### 7. Palette and geometry
These are ADR-006 values, restated here so the composition ADR cannot drift them:
- Light: Warm Gallery, paper `hsl(40 30% 98%)`, ink `hsl(20 10% 15%)`, surface `hsl(40 30% 96%)`.
- Dark: Cold Studio, ink `hsl(240 10% 5%)`, bone `hsl(40 20% 90%)`, surface `hsl(240 10% 10%)`.
- Signature: International Orange `hsl(18 100% 50%)`, identical in both modes.
- Radius: `0.125rem` (2px). Depth: hard offset shadows (`shadow-hard-sm`, `hard`, `hard-lg`, `hard-accent`) plus parallax. No blurred glow shadows.
- Rhythm: The Gallerist. `py-section` is `clamp(5rem, 12vh, 9rem)`; `py-section-lg` is `clamp(7rem, 18vh, 14rem)`. The home page uses explicit larger paddings to keep the voids deliberate.

### 8. No availability indicator
An availability status (nav badge, status bar, or hero note) was proposed and explicitly rejected. Do not add one.

### 9. Content cleanup
- Visible `[PLACEHOLDER]` and `// TODO(content)` markers removed from projects, services, and process copy.
- Project titles rewritten as short human names; summaries and narratives rewritten in plain, specific English.
- The trading name is provisionally set to "Team NJS" so the chrome no longer displays a placeholder string. The final name and legal entity remain undecided. Contact details are provisional.

## Amendment log

### 2026-10-22: restore ADR-006 DNA
The first implementation of this ADR overrode four settled ADR-006 decisions: it changed International Orange to a deeper vermilion, set radius to zero, removed the hard-shadow scale, collapsed the Gallerist spacing, and re-added an availability note. That was outside the scope of a composition change.

Corrections applied:
- Palette and International Orange restored to ADR-006.
- `--radius` returned to `0.125rem`; hard-shadow utilities restored in `tailwind.config.ts`.
- Home sections returned to extreme spacing; work and capability rows use space instead of rules.
- Availability note removed from the hero and from the content model.
- Primary actions use micro-radius, hard shadow, and the pressed state from ADR-006.

## Consequences

- **Positive:** The site reads as a composed document rather than a component demo. Every page shares a coherent grammar. The code has fewer presentation variants: one Card, one Badge, one Button, one PageHeader.
- **Negative:** The site is almost entirely typographic. It now depends on real project imagery, founder portraits, and client-approved copy to reach its intended quality. Those assets are still missing (see `docs/KNOWN_ISSUES.md`).
- **Trade-off:** Some former components (`TrustBar`, `StatsStrip`, `TechStackStrip`, `Testimonials`, `ProcessPreview`, `ServicesOverview`, `FeaturedProjects`, `CTABanner`) are no longer imported. They remain on disk because the sandbox denies deletions; remove them in a normal editor session.
- **Governance:** ADR-006 remains the token authority. This ADR may change structure and page grammar, not palette, geometry, rhythm, or motion. Any future deviation must be recorded here first.

## Files of record
- `app/page.tsx`, `app/portfolio/page.tsx`, `app/services/page.tsx`, `app/about/page.tsx`, `app/process/page.tsx`, `app/team/page.tsx`, `app/contact/page.tsx`
- `app/services/[slug]/page.tsx`, `app/portfolio/[slug]/page.tsx`, `app/not-found.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`
- `components/sections/` — Hero, WorkIndex, Capabilities, StudioStatement, ContactBlock
- `components/layout/` — Navbar, Footer, PageHeader, Container, Section
- `components/ui/` — Button, Badge, Card, Input, Select, Textarea
- `styles/globals.css`, `tailwind.config.ts`
- `content/site.ts`, `content/projects.ts`, `content/services.ts`, `content/process.ts`, `content/team.ts`
