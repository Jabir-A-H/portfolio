# Agency Marketing Portfolio: Project Roadmap

> **Status:** Phase 0 Complete (100% Core Skeleton Verified)  
> **Target Release:** Hostinger Static Production Deployment

---

## Phase 0: Core Skeleton & Verification (Completed)
- [x] Next.js App Router project setup with TypeScript and Tailwind CSS (now Next 16 with the webpack builder)
- [x] Static export configuration (`output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`)
- [x] Centralized single source of truth (`content/site.ts`, `services.ts`, `projects.ts`, `team.ts`, `process.ts`)
- [x] Responsive layout suite: Navbar with dark mode toggle, Footer, Container, Section primitives
- [x] Core static routes: `/`, `/services`, `/portfolio`, `/about`, `/team`, `/process`, `/contact`, `/privacy`, `/terms`, `/404`
- [x] Dynamic static routes: all 9 `/services/[slug]` and 6 `/portfolio/[slug]` case study templates
- [x] Interactive contact inquiry form with anti-spam honeypot, field validation, and direct WhatsApp action
- [x] Automated quality & test gates: 66/66 E2E tests, zero hardcoded brand strings scanner, route verification
- [x] Team profiles updated with 3 founders (Nasib Mohammad Arif, Abu Sayed Md Saad, Jabir Abdullah Haian) and WhatsApp contact (`+370 626 32643`)

---

## Phase 1: Brand Identity & Visual Assets
- [x] Lock visual identity to the "High-End Architect" persona — Warm Gallery / Cold Studio, International Orange, 2px micro-radius, hard offset shadows, The Gallerist spacing ([`ADR-006`](file:///d:/WebDev/portfolio/docs/ADR/006-visual-identity-pivot.md)), recomposed as an editorial document under [`ADR-007`](file:///d:/WebDev/portfolio/docs/ADR/007-editorial-reset.md)
- [x] Install the Technical Hybrid typography trio (Cormorant Garamond + Space Mono + Inter) via `next/font`, with fluid display scale and technical label scale
- [x] Establish fluid compositional rhythm tokens (`py-section`, `py-section-lg`, `px-gutter`) in Section/Container primitives
- [ ] Finalize official agency brand name, legal entity name, and tagline in [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts)
- [ ] Drop SVG vector logos into [`public/logo/`](file:///d:/WebDev/portfolio/public/logo) (dark & light variants)
- [ ] Add real founder portraits into `public/images/team/` and link in [`content/team.ts`](file:///d:/WebDev/portfolio/content/team.ts)
- [ ] Generate real Open Graph preview images (`og-image.png`) and custom favicon set

---

## Phase 1.5: De-AI Visual Refactor (Completed via ADR-007)
- [x] **Editorial recomposition**: home page reduced from nine stacked marketing sections to five movements (Hero, Work index, Capabilities, Studio statement, Contact) — see [`ADR-007`](file:///d:/WebDev/portfolio/docs/ADR/007-editorial-reset.md)
- [x] **Remove the template grammar**: no centered badge + headline + subtitle formula, no card grids, no icon tiles, no checkmark lists, no gradients, no boxed CTAs
- [x] **Geometry conformance**: 2px micro-radius, hard offset shadows, borderless-by-space, parallax depth; default radius/shadow scales removed from `tailwind.config.ts`
- [x] **UI primitives reset**: flat Card, typographic Badge, flat Button, rule Fields (Input/Select/Textarea)
- [x] **Interior page consistency**: shared `PageHeader` on About, Services, Portfolio, Process, Team, Contact, and both detail templates; shared `ContactBlock` at page ends
- [x] **Work index**: projects presented as rows with sector, year, and one metric; fake thumbnails removed; portfolio filter converted from pills to text tabs
- [x] **Copy cleanup**: visible `[PLACEHOLDER]` / `// TODO(content)` markers removed from projects, services, process, team roles set; studio and project copy rewritten in plain English
- [x] **Typography corrections**: display scale widened; mono metadata raised to a 10px floor; body sizes set by role
- [x] **Mobile work rows**: ordinal, category, title, sector, and metric reflow without narrow-column wrapping
- [x] **Docs reconciliation**: README, PROJECT, TECHNICAL_MANUAL, GLOSSARY, ROADMAP, KNOWN_ISSUES, GATE_STATUS, TEST_READY, and ADR-007 describe the shipped composition; historical reports are labelled as snapshots
- [ ] **Real imagery**: project covers, founder portraits, and a studio image set; the typographic index is a holding pattern until these exist
- [ ] **Verified brand/contact**: final name, legal entity, domain, email, phone, and address in [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts)
- [ ] **Remove legacy components**: `TrustBar`, `StatsStrip`, `TechStackStrip`, `Testimonials`, `ProcessPreview`, `ServicesOverview`, `FeaturedProjects`, `CTABanner` are no longer imported but remain on disk (sandbox denied deletion)
- [ ] **Viewport CI gate**: install `@playwright/test`, then re-enable `tests/e2e/viewport.test.ts` (currently excluded from `tsc`)

---

## Phase 2: Authentic Content & Case Studies (In Progress)
> Working log: [`docs/CONTENT_DECISIONS.md`](file:///d:/WebDev/portfolio/docs/CONTENT_DECISIONS.md). Every answer from the content grill is recorded there before it is written into `content/`.
- [ ] Lock the brand name, legal entity, tagline, positioning, and studio description
- [ ] Lock the real contact details, address, working hours, and social profiles
- [ ] Populate authentic service deliverables, methodologies, and technical FAQs in [`content/services.ts`](file:///d:/WebDev/portfolio/content/services.ts)
- [ ] Insert real past and active client projects with verified metric outcomes in [`content/projects.ts`](file:///d:/WebDev/portfolio/content/projects.ts)
- [ ] Write the three founder bios and roles in [`content/team.ts`](file:///d:/WebDev/portfolio/content/team.ts)
- [ ] Verify the six-step process and delivery standards in [`content/process.ts`](file:///d:/WebDev/portfolio/content/process.ts)
- [ ] Replace or remove illustrative stats (`5+`, `120+`, `80+`, `15+`)
- [ ] Connect verified client testimonials in [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts) and flip `features.showTestimonials: true`
- [ ] Add official corporate email address and verify DNS records (SPF, DKIM, DMARC)
- [ ] Collect project covers, founder portraits, and studio photography into `public/images/`

---

## Phase 3: Deployment Pipeline & Forms Integration
- [ ] Configure `NEXT_PUBLIC_FORM_ENDPOINT` in production environment (Web3Forms or Formspree)
- [ ] Verify Hostinger hosting plan and `public_html` static upload directory
- [ ] Create GitHub Actions CI/CD workflow (`.github/workflows/deploy.yml`) to automatically build and upload `out/` via SFTP on push to `main`
- [ ] Enable SSL certificate and enforce HTTPS redirection on Hostinger

---

## Phase 4: Localization & Extensions (Future)
- [ ] Bangla localization (`/bn/*`) with i18n routing structure
- [ ] Downloadable Company Profile PDF generation or static asset delivery
- [ ] Client portal / project tracking integration
