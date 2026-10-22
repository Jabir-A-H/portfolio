# TEST_READY: Marketing Agency Site E2E Suite

**Owner**: Engineering  
**Status**: Active. Reconciled to the post-ADR-007 editorial site on 2026-10-22.  
**Target Runner**: `node tests/e2e/runner.mjs`  

> The suite remains 66 opaque-box assertions against `out/`. Tier 1 previously described the old nine-section home page; the home tests now assert the five current movements and the editorial typography.

---

## 1. Executive Summary

The complete, opaque-box E2E test suite for the Apex Digital site. It operates without external test framework dependencies, running natively on Node.js 24 with native ES modules. It evaluates the pre-rendered static export in `out/` as well as source contract integrity.

- **Total Test Cases**: 66 tests
- **Tier 1 (Feature Coverage)**: 31 tests
- **Tier 2 (Boundary & Corner Cases)**: 18 tests
- **Tier 3 (Cross-Feature Interactions)**: 11 tests
- **Tier 4 (Real-World Scenarios)**: 6 tests
- **Exit Code Contract**: `0` on 100% pass, `1` on any failure.

---

## 2. Test Execution Commands

### Primary Test Command (Full Suite against `out/`)
```bash
node tests/e2e/runner.mjs
```
*(When executed after `npm run build`, verifies all 29 exported routes, all 9 dynamic services, portfolio case studies, layout contracts, SEO, and responsive geometry.)*

### Filter by Specific Tier
```bash
# Tier 1 only (Feature Coverage)
node tests/e2e/runner.mjs --tier=1

# Tier 2 only (Boundary & Corner Cases)
node tests/e2e/runner.mjs --tier=2

# Tier 3 only (Cross-Feature Interactions)
node tests/e2e/runner.mjs --tier=3

# Tier 4 only (Real-World Scenarios)
node tests/e2e/runner.mjs --tier=4
```

### Inventory & Verification Commands
```bash
# List all 66 test cases and descriptions
node tests/e2e/runner.mjs --list

# Verify test harness with sample fixture export (self-validation)
node tests/e2e/runner.mjs --base-dir=tests/e2e/fixtures/sample_out
```

---

## 3. Tier Breakdown & Test Inventory

### Tier 1: Feature Coverage (31 Tests)
Focuses on happy-path pre-rendering, route availability, section sequence, service cards, project items, and layout components:
- `T1.1_core_routes_html_exists`: Pre-rendered HTML file exists for all core static routes (`/`, `/services`, `/portfolio`, `/about`, `/team`, `/process`, `/contact`, `/privacy`, `/terms`)
- `T1.2_dynamic_service_routes_html_exists`: Pre-rendered HTML exists for all 9 dynamic services in `out/services/[slug]/`
- `T1.3_dynamic_portfolio_routes_html_exists`: Pre-rendered HTML exists for portfolio case studies in `out/portfolio/[slug]/`
- `T1.4_404_error_page_exists`: Custom 404 error page is statically exported in `out/404.html`
- `T1.5_valid_doctype_and_html_lang`: Pre-rendered HTML files contain `<!DOCTYPE html>` and `<html lang="en">`
- `T1.6_home_navbar_structure`: Home page renders the studio wordmark, navigation links, and the "Start a project" action
- `T1.7_home_hero_section`: Home page renders the hero statement with primary and secondary actions
- `T1.8_home_work_index`: Home page renders the selected-work index with three case-study links
- `T1.9_home_capabilities`: Home page renders the capabilities index with four disciplines and service links
- `T1.10_home_studio_statement`: Home page renders the inverted studio statement and an about link
- `T1.11_home_project_metrics`: Home page work index surfaces three project outcome metrics with labels
- `T1.12_home_discipline_rule`: Home page renders the four studio disciplines in the hero baseline line
- `T1.13_home_editorial_typography`: Home page uses the display-serif and mono-label type system
- `T1.14_home_contact_block`: Home page closes with the contact statement, mailto link, and contact action
- `T1.15_home_testimonials_suppressed`: Home page suppresses testimonials until real client reviews exist
- `T1.16_home_footer_structure`: Home page renders Footer with multi-column links, contact details, socials, and copyright
- `T1.17_services_overview_groups`: `/services` page lists all 4 service groups (Web & Software, Mobile & Games, Automation & Integration, Creative)
- `T1.18_services_overview_links`: `/services` page contains links to all 9 individual services
- `T1.19_service_detail_overview_section`: Service detail templates render an Overview section with heading and benefits
- `T1.20_service_detail_deliverables_section`: Service detail templates render a "What We Deliver" section with deliverables list
- `T1.21_service_detail_process_section`: Service detail templates render a Process section with step sequence
- `T1.22_service_detail_technologies_section`: Service detail templates render a Technologies section highlighting tools and stacks
- `T1.23_service_detail_faq_section`: Service detail templates render a FAQ section with questions and answers
- `T1.24_service_detail_cta_section`: Service detail templates render a CTA section linking to `/contact`
- `T1.25_portfolio_overview_work_index`: `/portfolio` page renders the work index with titles and case-study links
- `T1.26_portfolio_category_filters`: `/portfolio` page contains category filters for project grouping
- `T1.27_portfolio_detail_case_study_structure`: Project case study template renders problem, solution, tech stack, and results
- `T1.28_about_page_content`: `/about` page renders company story, mission statement, and core values
- `T1.29_team_page_leadership`: `/team` page renders the three founders with their roles
- `T1.30_process_page_methodology`: `/process` page renders detailed 5-6 step delivery methodology
- `T1.31_legal_pages_rendered`: Legal pages (`/privacy` and `/terms`) render policy text and company references

### Tier 2: Boundary & Corner Cases (18 Tests)
Focuses on viewport widths, empty states, 404 recovery, honeypot inputs, and invalid contact states:
- `T2.1_mobile_responsive_viewport_360`: HTML layouts avoid hardcoded fixed overflow widths and use mobile-first container padding
- `T2.2_tablet_responsive_viewport_768`: Grid sections utilize `md:` breakpoint classes for tablet adaptation
- `T2.3_desktop_responsive_viewport_1024_1440`: Layouts constrain maximum container width using `max-w-` or `container` classes
- `T2.4_no_horizontal_overflow_styling`: Root body or layout styling enforces `overflow-x: hidden` to prevent scroll leaks
- `T2.5_images_have_alt_and_responsive_classes`: All pre-rendered `<img>` tags provide non-empty alt text and responsive sizing attributes
- `T2.6_404_page_has_layout_and_home_cta`: Custom 404 page provides branded recovery navigation linking back to Home or Services
- `T2.7_404_page_clean_status_message`: Custom 404 page presents a polite, professional not-found message without uncaught errors
- `T2.8_contact_form_honeypot_field_present`: Contact form contains a dedicated anti-spam honeypot input field
- `T2.9_contact_form_honeypot_hidden_from_users`: Honeypot input is hidden from human visitors (`tabIndex=-1`, `hidden`, `sr-only`, or `opacity-0`)
- `T2.10_contact_form_required_fields`: Essential form fields (name, email, message) enforce client-side required constraints
- `T2.11_contact_form_email_input_type`: Email field has `type="email"` for built-in client validation
- `T2.12_contact_form_service_dropdown`: Contact form provides a `<select>` or service dropdown for client inquiries
- `T2.13_contact_form_budget_and_timeline`: Contact form provides inputs for budget range and project timeline
- `T2.14_empty_fields_handling`: Pre-rendered HTML contains no literal `"undefined"`, `"null"`, or `"[object Object]"` DOM text
- `T2.15_no_visible_placeholder_markers`: Pre-rendered pages contain no visible `[PLACEHOLDER]` or `TODO(content)` text
- `T2.16_home_metric_labels`: Home page pairs project metrics with descriptive labels
- `T2.17_favicon_and_meta_icons`: HTML `<head>` links to a favicon or icon resource
- `T2.18_static_export_dynamic_params_false`: Dynamic service page module configures `dynamicParams = false` for static export safety

### Tier 3: Cross-Feature Interactions (11 Tests)
Focuses on theming tokens, navigation consistency, dynamic sitemap/robots, contact options, and zero hardcoded brand values:
- `T3.1_theme_css_variables_defined`: Design tokens defined as CSS variables (`--primary`, `--accent`, `--background`, `--surface`, etc.)
- `T3.2_theme_anti_fouc_script`: Pre-rendered HTML `<head>` contains an anti-FOUC theme script checking `localStorage` or `prefers-color-scheme`
- `T3.3_theme_toggle_in_navbar`: Navbar contains an accessible theme toggle button or switch
- `T3.4_navbar_links_match_routes`: Every internal link in Navbar corresponds to an existing pre-rendered route file
- `T3.5_footer_links_match_routes`: Every internal link in Footer corresponds to an existing pre-rendered route file
- `T3.6_sitemap_xml_exists_and_valid`: `out/sitemap.xml` exists, is valid XML, and includes all core routes and service URLs
- `T3.7_robots_txt_exists_and_points_to_sitemap`: `out/robots.txt` exists, allows search bots, and references `sitemap.xml`
- `T3.8_contact_service_dropdown_matches_all_9_services`: Contact form service selector incorporates options matching all 9 agency services
- `T3.9_whatsapp_link_formatting`: WhatsApp action link href starts with `https://wa.me/` followed by clean numeric digits without symbols
- `T3.10_mailto_fallback_formatting`: Fallback email links use `mailto:` format with valid email syntax
- `T3.11_zero_hardcoded_brand_in_components`: Zero hardcoded company brand or contact strings in `app/` and `components/` outside `content/site.ts`

### Tier 4: Real-World Scenarios (6 Tests)
Focuses on realistic client and crawler user journeys:
- `T4.1_journey_client_exploration_to_contact`: Prospective client explores Home value proposition, follows CTA to `/contact`, and accesses validated inquiry form
- `T4.2_journey_service_evaluation`: Enterprise buyer evaluates service offerings from `/services` overview down to deep technical specifications and FAQ
- `T4.3_journey_portfolio_case_study_discovery`: Client inspects past agency track record from Home featured projects to detailed case study metrics
- `T4.4_journey_mobile_local_market_whatsapp`: Mobile visitor in Bangladesh accesses instant WhatsApp direct communication channel and local address
- `T4.5_journey_search_engine_social_crawler`: Social media & search engine crawler harvests complete Open Graph, Twitter, and JSON-LD metadata
- `T4.6_journey_governance_and_legal`: Auditor inspects legal governance pages (`/privacy`, `/terms`) and verifies return navigation

---

## 4. Test Suite Architecture

```
tests/e2e/
├── runner.mjs               # Master test runner with colorized reporter & CLI options
├── helpers.mjs              # DOM/HTML parser, file resolution, route loaders & assertion primitives
├── tier1-features.mjs       # Tier 1 Feature Coverage (31 tests)
├── tier2-boundaries.mjs     # Tier 2 Boundary & Corner Cases (18 tests)
├── tier3-interactions.mjs   # Tier 3 Cross-Feature Interactions (11 tests)
├── tier4-scenarios.mjs      # Tier 4 Real-World Application Scenarios (6 tests)
└── fixtures/
    ├── setup-fixtures.mjs   # Executable test fixture generator
    └── sample_out/          # Sample static export verifying 100% test pass rate
```

---

## 5. Verification Gate Status

- **Current export**: 66/66 PASSED against `out/` on 2026-10-22 after the editorial reset.
- **Harness self-test against sample fixtures**: 66/66 PASSED.
- **Execution against unbuilt repository**: Fails with Exit Code 1, with diagnostics pointing to missing pre-rendered files in `out/`.
- **Viewport suite**: `tests/e2e/viewport.test.ts` is separate and cannot run until `@playwright/test` is installed. See `docs/KNOWN_ISSUES.md` KI-008.
