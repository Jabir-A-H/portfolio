# ADR-006: Visual Identity Pivot to "High-End Architect"

## Status
Accepted. This ADR remains the authority for palette, typography, geometry, rhythm, and motion. [ADR-007](007-editorial-reset.md) changes page composition only. A same-day attempt to override these tokens was reverted; see ADR-007's amendment log.

## Date
2026-10-22

## Context
The initial site implementation followed a standard, symmetric SaaS template pattern, which created an "AI-generated" feel. To establish the agency as a hand-curated, premium studio, the site requires a visual identity that signals authorial intent and luxury.

## Decision
Pivot the visual identity to the **"High-End Architect"** persona.

### Design Pillars
1. **Layout (Bold Break)**: Abandon the standard 12-column centered grid. Implement asymmetric balance, overlapping elements, and intentional negative space.
2. **Aesthetic (The Gallery)**: Focus on immersive storytelling. Use cinematic transitions, cursor-driven reveals, and smooth, non-linear motion.
3. **Styling (Premium Minimalism)**: 
   - **Colors**: Use "Off-Whites" and "Deep Inks" rather than pure black/white.
   - **Typography**: Pair a high-contrast Serif (for headlines) with a clean, spacious Sans-Serif (for body).
   - **Geometry**: Mix sharp corners with organic, large-scale curves to avoid "template" symmetry.

## Alternatives Considered
- **The Technical Precisionist**: Rejected. Too "tool-like"; does not convey the "Premium Studio" feel.
- **The Bold Disruptor**: Rejected. Too "loud"; may alienate high-ticket enterprise clients.

## Consequences
- **Development Complexity**: Requires custom CSS/Framer Motion logic instead of standard Tailwind grid utilities.
- **Content Requirement**: Demands higher-quality imagery and more precise copywriting, as negative space amplifies the impact of every word.
- **Brand Positioning**: Shifts the agency from "just another dev shop" to a "premium digital partner."

## Implementation (Settled Tokens)

### Palette — dual-temperature canvas, single signature
- Light "Warm Gallery": paper `#FDFCFB` canvas, cream surfaces, deep-ink primary.
- Dark "Cold Studio": cold ink `#0D0E12` canvas, deep-slate surfaces, bone-white primary.
- Signature: **International Orange `#FF4F00`** — identical in both modes so the brand mark never shifts hue. Chosen for its industrial/architectural provenance (Golden Gate, NASA suits) rather than a generic tech-blue.

### Typography — Technical Hybrid
- **Cormorant Garamond** (display/architect voice) + **Space Mono** (metadata/engineer voice) + **Inter** (body/ghost voice).
- Rationale: the serif supplies luxury authority, the mono supplies engineering credibility, and the sans disappears. This pairing is structurally hard for a generic template to reproduce.
- Self-hosted via `next/font/google`; consumed as `--font-serif`, `--font-mono`, `--font-sans`.

### Geometry — Refined Brutalism
- 2px micro-radius (rejects pill/bubble SaaS shapes).
- Borderless by default: space divides, not hairlines.
- Depth from **hard offset shadows** plus **parallax** — explicitly no blurred glow shadows.

### Rhythm & Motion
- "The Gallerist" spacing: fluid `py-section` / `py-section-lg` / `px-gutter` tokens instead of uniform `py-20`.
- "The Gallery" motion: `ease-architect` and `ease-gallery` curves with 400–1000ms durations; cinematic reveals and staggered assembly.

## Status of Rollout
Tokens and typography are implemented (`styles/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, `Section.tsx`, `Container.tsx`). 
Hero refactored to Bold Break offset-axis layout with staggered reveals.
Motion layer implemented via framer-motion (`components/motion/` — `MotionProvider`, `ScrollReveal`, `RevealItem`, `Parallax`, `ParallaxLayer`).
Geometry conformance sweep (purge rounded/blurred SaaS surfaces), authorial details, and full typography rollout remain open — tracked in `docs/ROADMAP.md` Phase 1.5 and `KI-002`–`KI-004`.
