# Original User Request

## 2026-10-13T14:14:15Z

Build a production-ready, deployable multi-page marketing agency site skeleton based on plan-01-core-skeleton.md using Next.js App Router, TypeScript, and Tailwind CSS configured for static export, with centralized placeholder configuration for branding and copy.

Working directory: d:\WebDev\portfolio
Integrity mode: development

Reference specification: plan-01-core-skeleton.md

## Requirements

### R1. Architecture & Centralized Content
Bootstrap a Next.js (App Router) project with TypeScript and Tailwind CSS configured for static export (output: 'export'). Implement a single source of truth (content/site.ts) providing all company names, taglines, contact details, social links, and navigation items so no brand strings are hardcoded across UI components.

### R2. Core Routes & Data-Driven Templates
Implement all specified routes:
- / (Home with full section sequence: Navbar, Hero, Trust bar, Services overview, Featured projects, Stats strip, Process preview, Tech stack strip, CTA banner, Footer)
- /services and dynamic route /services/[slug] (generating pages for all 9 services from structured content)
- /portfolio and dynamic route /portfolio/[slug] (grid with category filters and case study template)
- /about, /team, /process, /contact, /privacy, /terms, and /404
All placeholder content must use realistic copy tagged with // TODO(content) or [PLACEHOLDER].

### R3. Design System & Theming
Establish design tokens via CSS variables for light and dark palettes with a toggle in the navbar. Ensure fully responsive layout behavior across mobile (360px), tablet (768px), laptop (1024px), and desktop (1440px) without horizontal scrollbar leaks.

### R4. Contact Form & Marketing Integrations
Build a client-validated contact inquiry form wired to a static-friendly endpoint service (e.g. Web3Forms or Formspree configurable via environment variables) with honeypot spam protection, graceful submission/error states, and a direct WhatsApp contact action.

### R5. SEO, Metadata & Export Verification
Configure per-page Open Graph and metadata scaffolding, dynamic sitemap.xml, and robots.txt. Provide automated scripts verifying build integrity, type safety, linting, and zero hardcoded brand values.

## Acceptance Criteria

### Build & Export Verification
- [ ] npm run build succeeds cleanly without errors and generates static assets in out/.
- [ ] Every route (/, /services, /services/*, /portfolio, /portfolio/*, /about, /team, /process, /contact, /privacy, /terms, /404) has a corresponding pre-rendered HTML file in out/.
- [ ] npm run lint and npx tsc --noEmit pass with zero warnings and zero errors.
- [ ] An automated script or check confirms that zero brand/contact strings are hardcoded in app/ and components/ outside content/site.ts.

### Visual & Interactive Standards
- [ ] Responsive design verified: pages render without horizontal overflow at viewport widths 360px, 768px, 1024px, and 1440px.
- [ ] Dark and light theme toggle switches classes on the root document and persists user choice in localStorage.
- [ ] Contact form validates required fields on the client and displays success/error notification banners upon submission.


## 2026-10-13T16:11:12Z

just so you know, as the teamwork lead, use less tokens whenever possible. like reducing exploratory tasks and doing more implementations ones. or doing proper exploratory tasks and doing surgical short implementations to reduce tokens, or anything else, or whatever works better.


## 2026-10-13T16:41:34Z

why so many subagents for milestone 3? are there similar numbers of agents for each milestone? to reduce token usage, should this not be changed?


## 2026-10-13T16:42:59Z

stop some of the current ones as well to save tokens


## 2026-10-13T16:44:49Z

just keep track of the subagents we are skipping, including these killed ones, so we know where we might be lacking something.


## 2026-10-13T16:52:33Z

maybe ask me for some basic stuff to add as i am one of the 3 people of the site?


## 2026-10-13T16:53:11Z

maybe after you are done, report with a basic list of things to add and so on....?


## 2026-10-13T17:03:39Z

dont add positions, just use these 3 names- Nasib Mohammad Arif
Abu Sayed Md Saad
Jabir Abdullah Haian
use this number for whatsapp contact for now.
+370 626 32643
