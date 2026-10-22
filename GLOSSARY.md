# Glossary: Visual Identity & "De-AI" Framework

Terms used to keep the site from drifting back toward generic agency-template patterns. [ADR-006](docs/ADR/006-visual-identity-pivot.md) is the authority for palette, geometry, rhythm, and motion. [ADR-007](docs/ADR/007-editorial-reset.md) changes composition only.

## Core Concepts

### Editorial Reset
The decision to stop decorating a standard marketing template and recompose the site as an editorial document: five movements on the home page, work as an index, and typography carrying the hierarchy. See ADR-007.

### Hand-Curated Aesthetic
Intentional asymmetry, specific writing, and deliberate voids rather than sterile centered symmetry. It is measured by what was removed, not by what was added.

### Authorial Voice
The writing and the layout should sound like one studio. Short sentences, concrete nouns, no pitch-deck adjectives, no exclamation marks, no rhetorical questions.

### Intentional Silence
Large margins and short pages are allowed. Empty space is a composition decision, not a missing component. The page should not fill every band with a grid.

## Identity Terms

### Warm Gallery
The light-mode canvas: paper `hsl(40 30% 98%)`, cream surface `hsl(40 30% 96%)`, deep ink `hsl(20 10% 15%)`.

### Cold Studio
The dark-mode canvas: cold ink `hsl(240 10% 5%)`, deep slate surface `hsl(240 10% 10%)`, bone text `hsl(40 20% 90%)`.

### International Orange
The single signature: `hsl(18 100% 50%)`, identical in both modes. Used for marks, hover states, metric figures, and the small square in a label. It never fills a large surface.

### Technical Hybrid
Cormorant Garamond for display, Space Mono for metadata, Inter for body. The serif is the voice; the mono is the filing system; the sans is invisible.

## Composition Terms

### The Gallerist
The spacing philosophy: extreme negative space, fluid `py-section` / `py-section-lg` rhythm, and one statement per room. Home sections use explicit larger paddings on top of the tokens.

### Offset Axis
The Bold Break layout: content anchors to a strong left or right axis, and supporting material floats in the void instead of centering.

### Refined Brutalism
The geometry: 2px micro-radius, borderless surfaces by default, hard offset shadows plus parallax. No blurred glow shadows, no pill shapes.

### Work Index
The home and portfolio presentation of projects: ordinal, category, title, sector, year, one metric. The row is the link. No thumbnail, no card, no badge.

### Hard-Shadow Card
A borderless compartment with 2px radius and a hard offset shadow. Depth comes from the physical offset, not a frame or blur.

### Label, Not Pill
Badges are typographic: mono capitals, optional leading International Orange square, no background, no border, no radius.

### Page Header
The shared opening spread for interior pages: mono label, large serif title, right-margin lede, optional metadata. Implemented in `components/layout/PageHeader.tsx`.

### Inverted Band
The studio statement uses `bg-foreground text-background`. In light mode it is an ink band; in dark mode it becomes a bone insert. The inversion is intentional.

### Rule Fields
Form inputs are transparent with a single bottom rule. Focus turns the rule International Orange. There are no boxes or filled states.

## Motion

### The Gallery
Cinematic reveals, staggered assembly, and parallax depth. The primitives live in `components/motion/` (`ScrollReveal`, `RevealItem`, `Parallax`, `ParallaxLayer`). Motion must never be required to read the page.

## Explicitly Rejected

### Availability Indicator
A nav badge, status bar, or hero note announcing availability. Proposed and rejected. Do not add one.

## Retired Terms

*Sharp Tag Badge*, *Section Coordinates*, and *Technical Blueprinting* described the previous decorative pass and are no longer used. *Press-Physics Button* is back: micro-radius, hard shadow, and a pressed state are part of ADR-006.
