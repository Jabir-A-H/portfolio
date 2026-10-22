# Glossary: Visual Identity & "De-AI" Framework

Terms used to keep the site from drifting back toward generic agency-template patterns. The operative decision is [ADR-007](docs/ADR/007-editorial-reset.md); [ADR-006](docs/ADR/006-visual-identity-pivot.md) supplies the tokens.

## Core Concepts

### Editorial Reset
The decision to stop decorating a standard marketing template and recompose the site as an editorial document: five movements on the home page, hairline-separated rows, and typography carrying the hierarchy. See ADR-007.

### Hand-Curated Aesthetic
Intentional asymmetry, specific writing, and visible rules rather than sterile centered symmetry. It is measured by what was removed, not by what was added.

### Authorial Voice
The writing and the layout should sound like one studio. Short sentences, concrete nouns, no pitch-deck adjectives, no exclamation marks, no rhetorical questions.

### Intentional Silence
Large margins and short pages are allowed. Empty space is a composition decision, not a missing component. The page should not fill every band with a grid.

## Identity Terms

### Warm Paper
The light-mode canvas: `hsl(40 35% 94%)`. A low-contrast paper tone for long reading and large display type.

### Cold Ink
The dark-mode canvas: `hsl(40 6% 7%)`. Not pure black; it keeps the same warm bias as the paper.

### Bone
The dark-mode foreground: `hsl(38 26% 87%)`. A warm off-white used for text, rules, and the inverted studio band.

### Vermilion
The single signature: `hsl(15 88% 47%)`. Used for marks, hover states, metric figures, and the small square in a label. It never fills a large surface.

### Technical Hybrid
Cormorant Garamond for display, Space Mono for metadata, Inter for body. The serif is the voice; the mono is the filing system; the sans is invisible.

## Composition Terms

### Hairline
A one-pixel rule in `--border` that separates rows, sections, and page regions. It replaces the card border, the shadow, and the coloured panel.

### Work Index
The home and portfolio presentation of projects: ordinal, category, title, sector, year, one metric. The row is the link. No thumbnail, no card, no badge.

### Flat Card
A compartment with a top hairline and padding only. No fill, no frame, no radius, no shadow.

### Label, Not Pill
Badges are typographic: mono capitals, optional leading vermilion square, no background, no border, no radius.

### Page Header
The shared opening spread for interior pages: mono label, large serif title, right-margin lede, optional metadata. Implemented in `components/layout/PageHeader.tsx`.

### Inverted Band
The studio statement uses `bg-foreground text-background`. In light mode it is an ink band; in dark mode it becomes a bone insert. The inversion is intentional.

### Rule Fields
Form inputs are transparent with a single bottom rule. Focus turns the rule vermilion. There are no boxes or filled states.

## Motion

### The Gallery
Slow, sparse entrance motion. Currently limited to the existing `ScrollReveal` / `RevealItem` primitives; the editorial pages do not depend on animation to be legible.

## Retired Terms

The following ADR-006 terms described the previous decorative pass and are no longer in use: *Sharp Tag Badge*, *Press-Physics Button*, *Section Coordinates*, *Systemic Token Purge* (kept as a principle, not a feature), *Technical Blueprinting* (replaced by hairline composition).
