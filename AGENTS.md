# Team NJS Portfolio: AI Agent & Developer Principles

This document defines the core principles and operational invariants for AI agents and developers working on the **Team NJS Portfolio** codebase (`portfolio`).

## 🎯 Mission
Build and maintain a high-performance, statically exportable, responsive multi-page marketing agency website with centralized content, zero brand lock-in, and uncompromising visual and architectural polish—**targeted for high-speed static deployment on Hostinger (LiteSpeed / `public_html` via automated FTPS)**.

---

## 🏛️ Core Principles

### 📌 Principle 1: Single Source of Truth & Living Documentation
- Documentation must accurately reflect reality. When architecture, routes, or content models change, update the relevant docs before concluding work.
- **Living Guidance, Not Dogma:** Principles and architecture records provide consistency, but must never become dogma that blocks modern web advancements. When modern browser capabilities, platform primitives, CSS specifications, or evolving framework features offer a superior solution that conflicts with an existing rule, surface the conflict openly so the team can evolve the standard.
- Hierarchy of truth:
  1. [`docs/ARCHITECTURE.md`](file:///d:/WebDev/portfolio/docs/ARCHITECTURE.md) (Canonical system architecture, tokens, routes, and design reference)
  2. [`docs/VISUAL_AND_FEATURE_PLAN.md`](file:///d:/WebDev/portfolio/docs/VISUAL_AND_FEATURE_PLAN.md) (Asset inventory, media guidelines, and interactive quirks)
  3. [`docs/CONTENT_DECISIONS.md`](file:///d:/WebDev/portfolio/docs/CONTENT_DECISIONS.md) (Live content choices: brand name, positioning, copy)
  4. [`docs/KNOWN_ISSUES.md`](file:///d:/WebDev/portfolio/docs/KNOWN_ISSUES.md) (Active bug tracking & technical workarounds)
  5. [`docs/ROADMAP.md`](file:///d:/WebDev/portfolio/docs/ROADMAP.md) (Milestones and next steps)
- Delete dead weight immediately: orphaned components, unused assets, and unimported dependencies.

### 🏛️ Principle 2: Content Centralization (Zero Brand Lock-in)
- **Zero hardcoded brand, legal, or contact strings** in `app/`, `components/`, or `lib/`. Everything flows from [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts) and sister modules in [`content/`](file:///d:/WebDev/portfolio/content).
- Enforced automatically by `scripts/verify-no-hardcoded-brand.mjs` (`npm run verify:brand`).

### ⚡ Principle 3: Static Export & Technical Invariants (Hostinger Target)
- **Target Platform (Hostinger Static Web Hosting):** The site deploys to standard shared LiteSpeed hosting (`public_html`) without a persistent Node.js or Edge runtime. All architectural choices must respect this constraint:
  - **Static Export**: Configured for `output: 'export'`, `trailingSlash: true`, and `images: { unoptimized: true }`.
  - **Zero Server-Side Runtimes:** No Next.js Server Actions, dynamic Node API routes, or runtime middleware. Dynamic operations (such as contact form submissions) route to dedicated external endpoints (Web3Forms/Formspree).
  - **Cache & Server Control:** Relies on `public/.htaccess` for LiteSpeed cache-busting, immutable asset caching, and security headers.
- **Dynamic Routes**: `/services/[slug]` and `/portfolio/[slug]` must declare `dynamicParams = false` and provide `generateStaticParams()`.
- **Client Isolation**: `'use client'` is reserved strictly for interactive leaf components (`ContactForm`, `PortfolioFilterGrid`, `ThemeToggle`). Layouts, page wrappers, and section containers remain pure Server Components. Dynamic client state (such as `useSearchParams`) must be isolated in `<React.Suspense>` boundaries.
- **Visual Direction**: Living design guidelines are documented in [`docs/ARCHITECTURE.md`](file:///d:/WebDev/portfolio/docs/ARCHITECTURE.md) and ADRs, and evolve with direct UI review. Avoid generic SaaS cliché templates. Do not add an availability indicator (explicitly rejected).

### 🔍 Principle 4: Collaborative Planning & Competing Alternatives
- **Formulate options for non-trivial changes:** For any new feature addition, architectural adjustment, refactoring, or bug fix (big or small), do not jump into code or make unilateral decisions. Formulate **at least 2 to 3 distinct solution approaches based on gravity and complexity**.
- **Meaningful Technical Trade-offs (No Strawmen):**
  - **Why do it (benefits):** Real functional, architectural, performance, or UX advantages.
  - **Why not do it (risks & failure modes):** Real engineering risks—such as runtime failures, layout shifts (CLS), paint thread latency, memory leaks, accessibility barriers, browser compatibility/device quirks, or cognitive complexity, etc.
  - **Banned trivial cons:** NEVER cite normal development artifacts (such as "creates a new file", "adds a wrapper component", or "adds boilerplate") as a reason not to implement a solution.
  - **Multi-Option Expansion for High-Risk Decisions:** If an approach carries non-trivial risks or trade-offs that the user might prefer to avoid, present **at least 3 viable options** or explicitly isolate the risk areas so the user can make an informed decision.
- **Modern Standards First:** Benchmark solutions against modern platform standards. If an approach breaks an existing project rule or requires promoting a server component, explicitly explain the technical trade-off so the user can decide whether to evolve the rule.
- **Trivial-Change Exception:** Skip comparison only for completely obvious, single-path changes (e.g. deleting an unused import, fixing a typo, or updating an obvious path).
- **Favor Simplicity:** Favor simple, robust, high-density solutions over speculative abstraction layers.

### 🖼️ Principle 5: Active Development & Media Placeholders
- **Never Block on Missing Production Media:** During active development, the absence of final client photography, video clips, or finalized copy must never block feature delivery or verification.
- Use high-contrast editorial SVG placeholders, canvas stubs, or mock media files to verify layouts, responsive behavior, interactions, and performance end-to-end immediately.

### 🛡️ Principle 6: Verification Before Velocity
- A change is incomplete until verified. Always run the quality pipeline in order:
  1. `npm run typecheck` — 0 TypeScript errors
  2. `npm run lint` — 0 ESLint warnings/errors
  3. `npm run clean && npm run build` — Clean static build, 26 app routes in `out/`
  4. `npm run verify:routes` — All 25 expected route files verified
  5. `npm run verify:brand` — 0 hardcoded brand string leaks across monitored files
  6. `npm run test:e2e` — 66/66 opaque-box assertions pass across all 4 tiers
  7. `npm run verify:all` — Unified gate chaining all above steps

### 🔒 Principle 7: Safe Execution & User Trust
- **Never `git commit` or stage** without explicit user request. Deliver complete work; let the user review and commit.
- **Never run destructive git operations** (`checkout`, `restore`, `stash`, `reset --hard`) without explicit user permission.
- Link modified files and code symbols using `file:///` paths for easy navigation.
