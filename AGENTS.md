# Agency Marketing Portfolio: AI Agent & Developer Principles

This document defines the guiding principles for all AI agents and developers contributing to the **Agency Marketing Portfolio** codebase (`portfolio`). Principles are not rigid rules—they are decision-making compasses. When a situation falls outside documented patterns, apply the principle that best serves the mission.

## 🎯 Mission
Build and maintain a high-performance, statically exportable, responsive multi-page marketing agency website with centralized content models, strict zero brand lock-in, and uncompromising visual and architectural polish.

---

## 📌 Principle 1: Documentation as a Living Contract

**Intent:** Documentation is the source of truth for the next agent (or human) who picks up this work. If it isn't current, it's worse than absent—it misleads.

**Practice:**
- Update `docs/TECHNICAL_MANUAL.md`, `docs/ROADMAP.md`, `docs/KNOWN_ISSUES.md`, and relevant ADRs *before* concluding any session where architecture, tokens, routes, or content models changed.
- Use the Antigravity Systemic Docs Directive: *"now add all these info that we decided on and actually implemented into the docs properly for a complete docs suite."*
- Keep docs high-density and zero-fluff. Link to code with `file:///` paths rather than dumping source.
- Archive resolved issues (`docs/KNOWN_ISSUES.md` > 10 entries or 2 milestones old) to `docs/archive/RESOLVED_ISSUES_ARCHIVE.md`.
- Delete dead weight immediately: orphaned components, unused assets, unimported dependencies.

---

## 🏛️ Principle 2: Single Source of Truth & Architectural Integrity

**Intent:** Ambiguity creates drift. One canonical definition per concept prevents silent divergence.

**Hierarchy of Trust** (highest to lowest):
1. `docs/TECHNICAL_MANUAL.md`
2. `docs/ADR/*`
3. `docs/ROADMAP.md`
4. `docs/KNOWN_ISSUES.md`
5. Live code (when docs lag)

**Invariants:**
- **Content Centralization**: Zero hardcoded brand/contact strings in `app/` or `components/`. Everything flows from `content/site.ts` (enforced by `scripts/verify-no-hardcoded-brand.mjs`).
- **Static Export**: Next.js configured for `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`. Dynamic routes declare `dynamicParams = false` and provide `generateStaticParams()`.
- **Responsive Geometry**: Verified at 360px, 768px, 1024px, 1440px. `overflow-x: hidden`, `width: 100%`, `max-width: 100vw`, `box-sizing: border-box` on root.
- **Design Tokens**: HSL CSS variables in `styles/globals.css` → mapped in `tailwind.config.ts`. Theme switching via `.dark` class + inline anti-FOUC script + `localStorage`.
- **Client Isolation**: `'use client'` only on interactive leaf components (`ContactForm`, `PortfolioFilterGrid`, `ThemeToggle`, motion providers). Route layouts and section wrappers stay pure Server Components.
- **Visual Identity (De-AI)**: "High-End Architect" persona—asymmetric balance, intentional negative space, bold breaks from centered grids. Interactivity follows "The Gallery" model: immersive, cinematic, cursor-aware. Zero tolerance for SaaS-generic patterns. See `GLOSSARY.md` and `docs/ADR/006-visual-identity-pivot.md`.

---

## 🛡️ Principle 3: Verification Before Velocity

**Intent:** A green pipeline is the only proof that the system still works. Skip nothing; automate everything.

**Pipeline (run in order, stop on first failure):**
1. `npm run typecheck` — 0 TypeScript errors
2. `npm run lint` — 0 ESLint warnings/errors
3. `npm run build` — clean exit, 29 static routes in `out/`
4. `node scripts/verify-routes.mjs` — 27 route files exist
5. `node scripts/verify-no-hardcoded-brand.mjs` — 0 brand leaks
6. `node tests/e2e/runner.mjs` — 66/66 tests pass (Tiers 1–4)
7. `npm run verify:all` — unified gate

**Philosophy:** If a change breaks the pipeline, the change is incomplete. Fix the break or revert the change. No "I'll fix it later" commits.

---

## 🔒 Principle 4: Safe Execution & User Trust

**Intent:** The user owns the repository state. Agents propose; users decide.

- **Never `git commit` or stage** without explicit user request. Deliver complete work; let the user review and commit.
- **Never destructive git operations** (`checkout`, `restore`, `stash`, `reset --hard`) without explicit permission.
- **Preserve documentation integrity**—don't delete comments or docs unless replacing obsolete content per the Trimming Policy.
- **Escalate uncertainty**. If a task requires judgment not covered by principles, ask. Don't assume.

---

## 💬 Principle 5: Communication That Respects Context

**Intent:** Downstream agents and humans read your output. Make it navigable.

- Be concise, direct, implementation-specific.
- Link modified files/symbols with `file:///...` paths.
- After updating docs, summarize—don't regurgitate. Point to the file.

---

## 🧭 Decision Heuristics (for uncharted territory)

When no principle directly applies:
1. **Favor the static export** — if it increases bundle or requires a server, question it.
2. **Favor the content model** — if it hardcodes what belongs in `content/`, refactor.
3. **Favor the visual identity** — if it looks like a template, it's wrong.
4. **Favor the pipeline** — if it breaks a gate, it's not done.
5. **Favor the user's time** — if you're uncertain, ask a focused question with a recommendation.
