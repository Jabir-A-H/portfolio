# Plan 01: Core Site Skeleton

> **Historical blueprint (2026-10-13).** Functional scope and technical constraints still apply. The visual composition, home-page section list, and UI primitives were replaced by [ADR-007](docs/ADR/007-editorial-reset.md). For current structure use [PROJECT.md](PROJECT.md) and [docs/TECHNICAL_MANUAL.md](docs/TECHNICAL_MANUAL.md).

Goal: a deployable, multi-page, professional-looking site with placeholder content, where the name, logo, projects and copy can be dropped in later without restructuring anything.

## 1. Decisions locked in

| Topic | Decision |
|---|---|
| Audience | Mainly international, also local (Bangladesh) |
| Site type | Multi-page marketing site |
| Hosting | Hostinger |
| Code | GitHub repository |
| Language | English first; structure ready for Bangla later |
| Brand | Name and logo undecided, so everything is placeholder-driven |

## 2. Recommended stack

- **Framework:** Next.js (App Router) + TypeScript, configured for **static export** (`output: 'export'`)
- **Styling:** Tailwind CSS, with design tokens as CSS variables
- **Content:** Typed data files (`/content/*.ts` or JSON) for services, projects, team. Case study pages can use MDX later.
- **Animation:** Framer Motion, used sparingly
- **Icons:** lucide-react
- **Forms:** static-friendly form handler (see section 8)

Why static export: it gives the best speed and SEO and works on almost any Hostinger plan, with no Node server to maintain. Verify the plan before committing; if the plan supports Node.js apps, SSR becomes possible later.

## 3. Sitemap (core)

```
/                      Home
/services              Services overview
/services/[slug]      One page per service (9 total, generated from data)
/portfolio             Project grid with filters
/portfolio/[slug]     Case study page (generated from data)
/about                 Company story, mission, values
/team                  The three heads
/process               How we work
/contact               Inquiry form + contact details
/privacy, /terms       Legal pages
/404                   Custom not-found page
```

Later phases: `/blog`, `/careers`, `/bn/*` (Bangla), client portal.

### Service grouping (for navigation and the overview page)

1. **Web & Software:** web design and development, software design and development, website and software maintenance
2. **Mobile & Games:** mobile app development, game development
3. **Automation & Integration:** business automation, API and system integration
4. **Creative:** graphics design, video editing

## 4. Home page sections (top to bottom)

1. Navbar (sticky) with logo placeholder, links, and a **Get a Quote** button
2. Hero: headline, subheadline, two CTAs (Start a Project, View Our Work)
3. Trust bar: client logos (placeholder row)
4. Services overview: four group cards linking to service pages
5. Featured projects: 3 cards pulled from project data
6. Stats strip: years, projects delivered, clients, countries (placeholder numbers, clearly marked TODO)
7. Process preview: 5 or 6 steps
8. Tech stack strip
9. Testimonials (hidden until real ones exist)
10. Final CTA banner
11. Footer: sitemap links, contact info, social links, legal links

## 5. Folder structure

```
/app
  layout.tsx
  page.tsx
  services/page.tsx
  services/[slug]/page.tsx
  portfolio/page.tsx
  portfolio/[slug]/page.tsx
  about/page.tsx
  team/page.tsx
  process/page.tsx
  contact/page.tsx
  privacy/page.tsx
  terms/page.tsx
  not-found.tsx
  sitemap.ts
  robots.ts
/components
  layout/  (Navbar, Footer, Container, Section)
  ui/      (Button, Card, Badge, Input, Textarea, Select)
  sections/ (Hero, ServicesGrid, FeaturedProjects, Stats, ProcessSteps, TechStrip, CTABanner)
/content
  site.ts        (company name, tagline, contact, socials: SINGLE source of truth)
  services.ts
  projects.ts
  team.ts
  process.ts
/public
  logo/ (placeholder logo files)
  images/
/styles
  globals.css    (design tokens)
```

**Rule:** no company name, tagline, email, phone, or social link may be hardcoded in a component. Everything comes from `content/site.ts`, so the name decision is a one-file change.

## 6. Design system skeleton

- **Tokens (CSS variables):** primary, accent, background, surface, text, muted, border, with light and dark values
- **Placeholder palette:** neutral dark navy plus one accent. Swap when the logo is final.
- **Typography:** one display font and one body font via `next/font`. Pick placeholders now, finalize with the brand.
- **Spacing and layout:** one `Container` (max width), one `Section` wrapper with consistent vertical padding
- **Dark mode:** class-based, with a toggle in the navbar (default follows system)
- **Responsive:** mobile-first, tested at 360, 768, 1024, 1440 px

## 7. Content strategy for the skeleton

- Use realistic placeholder copy, not "Lorem ipsum," so layout is judged fairly
- Mark every placeholder with a `// TODO(content)` comment or a `[PLACEHOLDER]` tag so nothing ships by accident
- Each service gets the same template: overview, what we deliver, process, technologies, FAQ, CTA
- Project template: client or type, problem, solution, tech used, results, gallery, link (if public)

## 8. Contact form

Static export means no server for form handling. Options, pick one:

- A hosted form service (Formspree, Web3Forms, or similar) with spam protection
- A small PHP handler on Hostinger
- A serverless function (separate from the site) that sends mail

Form fields: name, email, company (optional), service interested in (dropdown from services data), budget range, timeline, message. Add a honeypot field plus CAPTCHA or Turnstile.

Also add: WhatsApp button (important for the local market) and a plain email link as fallback.

## 9. SEO and analytics basics

- Per-page `metadata` (title, description, Open Graph, Twitter card)
- `sitemap.xml` and `robots.txt` generated in code
- JSON-LD structured data: Organization (home), Service (service pages)
- Clean URLs, one H1 per page, alt text on all images
- Analytics (Google Analytics or a privacy-friendly alternative) added behind an env flag
- Favicon and OG image placeholders, replaced when the logo is final

## 10. Deployment and workflow

- **Repo:** GitHub, `main` is production, work happens on feature branches via pull requests
- **Environments:** local, optional preview, production
- **Deploy to Hostinger:** GitHub Actions builds the static export and uploads the `out/` folder via FTP/SFTP (or use Hostinger's Git integration if the plan supports it)
- **Secrets:** FTP credentials and form keys stored in GitHub Secrets, never in the repo
- **Domain and SSL:** connect the domain in Hostinger, enable SSL, force HTTPS
- **Hosting check:** confirm the Hostinger plan, and that uploads to `public_html` work with the static output

## 11. Build phases

| Phase | Output |
|---|---|
| 0. Setup | Repo, Next.js + Tailwind + TS, linting, formatting, folder structure, `site.ts` |
| 1. Foundations | Design tokens, layout (Navbar, Footer), UI primitives, dark mode |
| 2. Pages | All routes in the sitemap with placeholder content and data-driven templates |
| 3. Home | All home sections assembled |
| 4. Contact | Form, validation, spam protection, WhatsApp button |
| 5. SEO and polish | Metadata, sitemap, structured data, accessibility pass, performance pass |
| 6. Deploy | GitHub Actions pipeline, Hostinger upload, domain and SSL |

## 12. Definition of done (skeleton)

- All routes in the sitemap render with no errors
- No hardcoded brand strings outside `content/site.ts`
- Responsive at the four breakpoints, light and dark mode both usable
- Lighthouse: 90+ on Performance, Accessibility, Best Practices, SEO
- Contact form works end to end and delivers to the right inbox
- Automatic deploy from `main` to Hostinger works
- All placeholders are tagged so they can be found with one search

## 13. Open items (to be covered in later plan files)

- Company name, tagline, logo, brand colors (Plan 02: branding)
- Project list: past and running, with details and screenshots (Plan 03: portfolio)
- Team bios, photos, links for the three heads (Plan 04: team and about)
- Final service copy and pricing or engagement models
- Testimonials and client logos (only with permission)
- Bangla version and company profile PDF (later)
