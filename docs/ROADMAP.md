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
- [ ] Finalize official agency brand name, legal entity name, and tagline in [`content/site.ts`](file:///d:/WebDev/portfolio/content/site.ts)
- [ ] Drop SVG vector logos into [`public/logo/`](file:///d:/WebDev/portfolio/public/logo) (dark & light variants)
- [ ] Replace placeholder color tokens in [`styles/globals.css`](file:///d:/WebDev/portfolio/styles/globals.css) with official brand palette
- [ ] Add real founder portraits into `public/images/team/` and link in [`content/team.ts`](file:///d:/WebDev/portfolio/content/team.ts)
- [ ] Generate real Open Graph preview images (`og-image.png`) and custom favicon set

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
