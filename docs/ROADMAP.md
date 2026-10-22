# Agency Marketing Portfolio: Project Roadmap

> **Status:** Phase 0 Complete (100% Core Skeleton Verified)  
> **Target Release:** Hostinger Static Production Deployment

---

## Phase 0: Core Skeleton & Verification (Completed)
- [x] Next.js 15 App Router project setup with TypeScript and Tailwind CSS
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
- [x] Lock visual identity to the "High-End Architect" persona — light/dark tokens, International Orange signature, micro-radius geometry ([`ADR-006`](file:///d:/WebDev/portfolio/docs/ADR/006-visual-identity-pivot.md))
- [x] Install the Technical Hybrid typography trio (Cormorant Garamond + Space Mono + Inter) via `next/font`, with fluid display scale and technical label scale
- [x] Establish fluid compositional rhythm tokens (`py-section`, `py-section-lg`, `px-gutter`) in Section/Container primitives
- [ ] Finalize official agency brand name, legal entity name, and tagline in [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts)
- [ ] Drop SVG vector logos into [`public/logo/`](file:///d:/WebDev/portfolio/public/logo) (dark & light variants)
- [ ] Add real founder portraits into `public/images/team/` and link in [`content/team.ts`](file:///d:/WebDev/portfolio/content/team.ts)
- [ ] Generate real Open Graph preview images (`og-image.png`) and custom favicon set

---

## Phase 1.5: De-AI Visual Refactor (In Progress)
- [x] **Bold Break layout**: refactor `Hero` to the offset axis — serif statement anchored left, supporting copy in the void; removed centered-glow aura
- [ ] **Geometry conformance sweep**: purge `rounded-xl`/`rounded-2xl`/`rounded-full`/blurred `shadow-sm|md|lg|xl` from [`components/ui/Card.tsx`](file:///d:/WebDev/portfolio/components/ui/Card.tsx), [`components/ui/Badge.tsx`](file:///d:/WebDev/portfolio/components/ui/Badge.tsx), [`components/ui/Button.tsx`](file:///d:/WebDev/portfolio/components/ui/Button.tsx) and page templates in favour of micro-radius + hard-offset shadows
- [x] **The Gallery motion**: add a motion layer (framer-motion) for cinematic reveals, staggered assembly, and parallax depth — `MotionProvider`, `ScrollReveal`, `RevealItem`, `Parallax`, `ParallaxLayer` in [`components/motion/`](file:///d:/WebDev/portfolio/components/motion/)
- [ ] **Authorial details**: technical metadata labels (`text-label` mono captions, coordinates, section indices) and an availability status indicator in the Navbar
- [ ] **Typography rollout**: migrate headings from `font-extrabold` to `font-display text-display-*` across all routes (tracked as `KI-002`)
- [ ] Verify 360/768/1024/1440px viewports after each layout refactor (zero horizontal scroll)

---

## Phase 2: Authentic Content & Case Studies
- [ ] Populate authentic service deliverables, methodologies, and technical FAQs in [`content/services.ts`](file:///d:/WebDev/portfolio/content/services.ts)
- [ ] Insert real past & active client projects with metric outcomes in [`content/projects.ts`](file:///d:/WebDev/portfolio/content/projects.ts)
- [ ] Connect verified client testimonials in [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts) and flip `features.showTestimonials: true`
- [ ] Add official corporate email address and verify DNS records (SPF, DKIM, DMARC)

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
