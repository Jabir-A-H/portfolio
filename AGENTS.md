# Agency Marketing Portfolio: AI Agent & Developer Rules

This document defines mandatory operational rules and protocols for all AI agents and developers contributing to the **Agency Marketing Portfolio** codebase (`portfolio`).

## 🎯 Mission
Build and maintain a high-performance, statically exportable, responsive multi-page marketing agency website with centralized content models, strict zero brand lock-in, and uncompromising visual and architectural polish.

---

## 📌 RULE 1: Mandatory Post-Session Documentation Protocol

> **CRITICAL DIRECTIVE:** You MUST ALWAYS update, reconcile, and optimize the documentation in `docs/` after every coding, debugging, refactoring, or design session before concluding work.

### Antigravity Systemic Docs Directive
When implementation and architecture changes are decided or executed, execute this systemic documentation step:
> *"now add all these info that we decided on and actually implemented into the docs properly for a complete docs suite. use any skills as needed."*
Run this systemically for docs sync, ADR alignment, roadmap updates, and known-issues cleanup.

At the end of any session or significant milestone:

1. **Update `docs/TECHNICAL_MANUAL.md`**:
   - Reconcile architectural state, route tree, data models (`content/*.ts`), design tokens, and UI layout specifications.
   - Keep route inventories, components, form handlers, and static export mechanics synchronized with live code.

2. **Update `docs/ROADMAP.md`**:
   - Check off completed milestones and deliverables (`[x]`).
   - Add newly discovered tasks, edge cases, branding milestones, or client feedback to their respective phases.
   - Keep milestone progress percentages and status indicators accurate.

3. **Update `docs/KNOWN_ISSUES.md`**:
   - Move resolved bugs to **Resolved Historical Issues** with discovery date, resolution date, root cause, and exact fix summary.
   - Document active/deferred edge cases with issue IDs (`KI-xxx`) and reproducible symptoms.

4. **Record Architecture Decisions (`docs/ADR/*`)*:
   - For any significant architectural decision, state pattern shift, static export configuration, or routing pattern overhaul, record a new formal ADR following sequential numbering (`ADR 006+`).
   - Keep existing ADR statuses accurate (`Accepted and Implemented`, `Superseded`, etc.).

5. **Trimming & Anti-Bloat Feature (Context Hygiene Policy)**:
   - **High-Density, Zero-Fluff**: Keep all documentation concise, structured, and factual. Avoid verbose narrative filler that bloats context windows for downstream AI agents.
   - **No Full Code Dumps**: Never dump entire source files into markdown documentation. Use clickable github markdown links (`file:///...`) pointing directly to files or line ranges.
   - **Archival Trigger**: When resolved issues in `docs/KNOWN_ISSUES.md` exceed 10 entries or older than 2 milestones, archive them into `docs/archive/RESOLVED_ISSUES_ARCHIVE.md` to prevent document bloat.
   - **Zero Dead-Weight Policy**: Immediately delete replaced scratch scripts, orphaned components, unused assets, and unimported dependencies (`package.json`).

---

## 🏛️ RULE 2: Source-of-Truth Order & Architectural Standards

### Source-of-Truth Hierarchy (Mandatory)
1. `docs/TECHNICAL_MANUAL.md`
2. `docs/ADR/*`
3. `docs/ROADMAP.md`
4. `docs/KNOWN_ISSUES.md`
5. Live code when docs and implementation drift

If documentation and code conflict, do not guess. Flag the drift and align docs to implemented reality through explicit updates.

### Core Architectural Invariants
- **Single Source of Truth (`content/site.ts`)**:
  - ZERO hardcoded brand or contact strings in UI components (`app/` and `components/`).
  - Company name, legal entity, tagline, email, phone, WhatsApp number, street address, and navigation links MUST be imported from `@/content/site`.
  - Enforced programmatically by `node scripts/verify-no-hardcoded-brand.mjs`.
- **Static Export Conformance**:
  - Next.js must remain configured for static HTML export (`output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`).
  - All dynamic routes (`/services/[slug]` and `/portfolio/[slug]`) must declare `export const dynamicParams = false;` and provide pre-rendered parameters via `generateStaticParams()`.
- **Responsive Geometry & Zero Horizontal Scroll**:
  - Layouts must be verified mobile-first across 360px, 768px, 1024px, and 1440px viewports.
  - Root layout and body must enforce `overflow-x: hidden`, `width: 100%`, `max-width: 100vw`, and `box-sizing: border-box`.
- **Design Tokens & Theme Toggle**:
  - Styling is governed by HSL CSS variables in `styles/globals.css` mapped through `tailwind.config.ts`.
  - Theme switching is class-based (`.dark`), backed by an inline anti-FOUC script in `<head>` and persisted in `localStorage`.
- **Client Component Isolation**:
  - Keep `'use client'` strictly confined to interactive leaf components (`ContactForm.tsx`, `PortfolioFilterGrid.tsx`, `ThemeToggle.tsx`).
  - Keep route layouts and section wrappers as pure Server Components for optimal static rendering performance.

---

## 🛡️ RULE 3: Pre-Flight Verification & Quality Gates

Before completing any task or ending a work session, execute and verify the full verification pipeline:

1. **TypeScript Type Check**:
   ```bash
   npm run typecheck
   ```
   Must pass with 0 errors (`tsc --noEmit`).

2. **Linting Check**:
   ```bash
   npm run lint
   ```
   Must pass with 0 warnings and 0 errors (`eslint app components content`).

3. **Production Static Export Build**:
   ```bash
   npm run build
   ```
   Must compile cleanly with exit code `0` and pre-render all 29 static HTML and metadata routes into `out/`.

4. **Automated Verification Gates**:
   ```bash
   node scripts/verify-routes.mjs
   node scripts/verify-no-hardcoded-brand.mjs
   ```
   Must verify 27 route files exist and 0 hardcoded brand literals exist.

5. **Master Opaque-Box E2E Test Suite**:
   ```bash
   node tests/e2e/runner.mjs
   ```
   Must pass all 66 tests (100% pass rate across Tiers 1–4).

6. **Unified Quality Gate**:
   ```bash
   npm run verify:all
   ```

---

## 🔒 RULE 4: Execution Discipline & Safety (Mandatory)

1. **Never run `git commit`** (or stage changes in preparation for one) on your own initiative unless the user explicitly requests a commit. Finish the assigned goal and stop with changes uncommitted for user review.
2. **Never run destructive git commands** (`git checkout <file>`, `git restore`, `git stash`, `git reset --hard`) without explicit user permission.
3. **Preserve Documentation Integrity**: Do not delete existing comments or documentation unless explicitly requested or replacing obsolete content under the Trimming Policy.

---

## 💬 RULE 5: Communication Style & Context Hygiene

- Be concise, direct, and implementation-specific.
- Always provide clickable github markdown links (`file:///...`) for modified files and symbols.
- After creating or updating documentation artifacts, do NOT regurgitate full artifact text in chat; provide a concise summary and link directly to the docs.
