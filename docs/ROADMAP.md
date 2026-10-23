# Agency Marketing Portfolio: Project Roadmap

> **Status:** Phase 0, 1, 1.5, 2, and 3 Completed (Full Static Pipeline, Editorial Studio, & Architectural Seams Verified)  
> **Target Release:** Hostinger Static Production Deployment  
> **Creative & Feature Blueprint:** [`docs/VISUAL_AND_FEATURE_PLAN.md`](VISUAL_AND_FEATURE_PLAN.md)  
> **Content Decision Log:** [`docs/CONTENT_DECISIONS.md`](CONTENT_DECISIONS.md)  

---

## ✅ Completed Milestones (Phases 0 – 3)

- [x] **Phase 0: Core Skeleton & Verification:** Next 16 static export (`output: 'export'`), centralized content models, responsive layout suite, 28 exported routes, 66/66 E2E tests passing.
- [x] **Phase 1 & 1.5: Brand Identity & De-AI Editorial Reset ([ADR-006](ADR/006-visual-identity-pivot.md), [ADR-007](ADR/007-editorial-reset.md)):** High-End Architect persona, Cormorant Garamond + Space Mono + Inter typography trio, 2px micro-radius, hard offset shadows, five-movement editorial home page, flat UI primitives, and deletion of 12 orphan components.
- [x] **Phase 2: CI/CD & LiteSpeed Caching ([DEPLOYMENT.md](DEPLOYMENT.md)):** GitHub Actions quality CI (`ci.yml`), automated FTPS deploy (`deploy.yml`), and LiteSpeed cache-busting `.htaccess` with immutable static asset caching.
- [x] **Phase 3: Architectural Deepening & Studio Consolidation ([ADR-008](ADR/008-studio-consolidation-and-architectural-seams.md)):** 4-pillar main navigation (`Work`, `Services`, `Studio`, `Contact`), multi-chapter Studio dossier in `/about`, domain query seam (`content/queries.ts`), unified `<ProjectRow />`, metadata factory (`lib/metadata.ts`), decoupled intake (`lib/contact.ts`) with `?service=slug` preselection, and zero brand leaks across 39 monitored files.

---

## ⏳ Phase 4: Authentic Content, Visual Assets & Proof (IN PROGRESS)
> Complete asset breakdown and wireframe guidelines: [`docs/VISUAL_AND_FEATURE_PLAN.md`](VISUAL_AND_FEATURE_PLAN.md)  
> Active question log: [`docs/CONTENT_DECISIONS.md`](CONTENT_DECISIONS.md)

- [ ] **4.1 Finalize Brand & Legal Entity ([`KI-006`](file:///d:/WebDev/portfolio/docs/KNOWN_ISSUES.md#L16))**:
  - Replace provisional "Team NJS" working name with final agency brand name, legal entity, and official corporate email in [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts).
- [ ] **4.2 Resolve Q3 Primary Buyer Persona**:
  - Lock target customer profile to tune copy across capability offerings and hero statement.
- [ ] **4.3 Photo Inventory Intake ([`KI-005`](file:///d:/WebDev/portfolio/docs/KNOWN_ISSUES.md#L15))**:
  - Add 3 founder editorial duotone portraits into `public/images/team/` (`nasib.jpg`, `saad.jpg`, `haian.jpg`).
  - Add 1 studio workspace ambient photograph into `public/images/studio/workspace-dhaka.jpg`.
  - Add 6 authentic 16:9 case study covers and 12 macro interface crops into `public/images/projects/[slug]/`.
- [ ] **4.4 Vector Branding & Social Assets**:
  - Drop SVG vector logos into `public/logo/` (`logo-light.svg`, `logo-dark.svg`).
  - Generate customized high-contrast OpenGraph preview (`public/images/og-image.png`) and favicon suite.
- [ ] **4.5 Authentic Case Study Metrics & Proof ([`KI-009`](file:///d:/WebDev/portfolio/docs/KNOWN_ISSUES.md#L19))**:
  - Verify and replace illustrative stats (`5+`, `120+`, `80+`, `15+`) with defensible figures.
- [ ] **4.6 Service Taxonomy Refinement**:
  - Reframe low-ticket gig categories ("Graphics Design", "Video Editing") into "Brand Systems & Interactive Media" to align with high-ticket engineering positioning.

---

## ⏳ Phase 5: Interactive Quirks, Motion & Studio Features (UPCOMING)
> Detailed specifications: [`docs/VISUAL_AND_FEATURE_PLAN.md`](VISUAL_AND_FEATURE_PLAN.md)

- [ ] **5.1 The "Gallery Hover" (Cursor-Driven Thumbnail Reveal)**:
  - Add floating, spring-damped project preview on row hover for desktop viewports in `WorkIndex` and `PortfolioFilterGrid`.
- [ ] **5.2 Live Studio Clock & Global Status**:
  - Add discrete real-time monospace chip (`DHAKA [TIME] GMT+6 · STUDIO OPEN`) to header/footer for international timezone assurance.
- [ ] **5.3 Executive Dossier Print Stylesheet (`@media print`)**:
  - Implement print-to-PDF formatting stripping navigation/chrome for boardroom executive presentations on `/about` and `/portfolio/[slug]`.
- [ ] **5.4 Metric Split-Flap / Scramble Typography**:
  - Implement 350ms mechanical character roll on key metrics (`74%`, `€12M+`, `180 hrs`) when scrolling into view.
- [ ] **5.5 Blueprint Inspection Mode (`[GRID]` / `⌘+G`)**:
  - Add architectural layout grid overlay with 12-column lines, token tags, and margin callouts.
- [ ] **5.6 Silent Looping WebM Micro-Videos**:
  - Embed 5s 60fps silent interaction clips in complex case studies (e.g. mobile workout sync and logistics event stream).
- [ ] **5.7 Interactive Scoping Terminal**:
  - 3-step terminal brief estimator on `/contact` that pre-formats client briefs directly into the inquiry form.

---

## ⏳ Phase 6: Production Launch & Future Extensions
- [ ] **Forms Production Cutover ([`KI-001`](file:///d:/WebDev/portfolio/docs/KNOWN_ISSUES.md#L11))**:
  - Configure `NEXT_PUBLIC_FORM_ENDPOINT` in production environment (Web3Forms or Formspree).
- [ ] **Domain & DNS Cutover**:
  - Verify Hostinger DNS, SSL certificate, SPF/DKIM/DMARC records.
- [ ] **Viewport CI Gate ([`KI-008`](file:///d:/WebDev/portfolio/docs/KNOWN_ISSUES.md#L18))**:
  - Install `@playwright/test` and wire `tests/e2e/viewport.test.ts` into CI pipeline.
- [ ] **Bangla Localization (`/bn/*`)**:
  - Internationalized routing structure for domestic Bangladeshi enterprise market.
