/**
 * Tier 1: Feature Coverage Tests
 * Marketing Agency Site Skeleton E2E Suite
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  OUT_DIR,
  EXPECTED_SERVICE_SLUGS,
  EXPECTED_SERVICE_GROUPS,
  resolveRouteFile,
  loadRouteContent,
  extractTitle,
  extractHeadings,
  extractLinks,
  extractForms,
  exists,
  assert,
  assertIncludes,
  assertMatch,
} from './helpers.mjs';

export const tier1Tests = [
  {
    id: 'T1.1_core_routes_html_exists',
    description: 'Pre-rendered HTML file exists for all core static routes in out/',
    run: (baseDir = OUT_DIR) => {
      const coreRoutes = [
        '/',
        '/services',
        '/portfolio',
        '/about',
        '/team',
        '/process',
        '/contact',
        '/privacy',
        '/terms',
      ];
      for (const route of coreRoutes) {
        const filePath = resolveRouteFile(route, baseDir);
        assert(
          exists(filePath),
          `Missing pre-rendered HTML for core route "${route}" at ${filePath}`
        );
      }
    },
  },

  {
    id: 'T1.2_dynamic_service_routes_html_exists',
    description: 'Pre-rendered HTML exists for all 9 dynamic services in out/services/[slug]/',
    run: (baseDir = OUT_DIR) => {
      for (const slug of EXPECTED_SERVICE_SLUGS) {
        const route = `/services/${slug}`;
        const filePath = resolveRouteFile(route, baseDir);
        assert(
          exists(filePath),
          `Missing pre-rendered HTML for service "${slug}" at ${filePath}`
        );
      }
    },
  },

  {
    id: 'T1.3_dynamic_portfolio_routes_html_exists',
    description: 'Pre-rendered HTML exists for at least one portfolio case study route in out/portfolio/[slug]/',
    run: (baseDir = OUT_DIR) => {
      // Dynamic portfolio routes should produce pre-rendered HTML
      const portfolioPath = resolveRouteFile('/portfolio', baseDir);
      assert(exists(portfolioPath), `Portfolio overview missing at ${portfolioPath}`);
      // Check that at least one project subfolder exists or project HTML is generated
      const portfolioDir = path.join(baseDir, 'portfolio');
      assert(exists(portfolioDir), `Portfolio export directory missing at ${portfolioDir}`);

      const entries = fs.readdirSync(portfolioDir, { withFileTypes: true });
      const subdirs = entries.filter((e) => e.isDirectory());
      assert(
        subdirs.length > 0,
        `Expected at least one case study subfolder under out/portfolio/, found ${subdirs.length}`
      );
    },
  },

  {
    id: 'T1.4_404_error_page_exists',
    description: 'Custom 404 error page is statically exported in out/404.html',
    run: (baseDir = OUT_DIR) => {
      const path404 = resolveRouteFile('/404', baseDir);
      assert(exists(path404), `Custom 404 page missing at ${path404}`);
      const html = loadRouteContent('/404', baseDir);
      assert(
        html.toLowerCase().includes('404') || html.toLowerCase().includes('page not found'),
        '404.html does not contain "404" or "page not found"'
      );
    },
  },

  {
    id: 'T1.5_valid_doctype_and_html_lang',
    description: 'Pre-rendered HTML files contain <!DOCTYPE html> and <html lang="en">',
    run: (baseDir = OUT_DIR) => {
      const sampleRoutes = ['/', '/services', '/contact', '/about'];
      for (const route of sampleRoutes) {
        const html = loadRouteContent(route, baseDir);
        assertMatch(html, /<!DOCTYPE\s+html>/i, `${route} missing <!DOCTYPE html>`);
        assertMatch(html, /<html[^>]*lang=["']en["']/i, `${route} missing <html lang="en">`);
      }
    },
  },

  {
    id: 'T1.6_home_navbar_structure',
    description: 'Home page renders Navbar with studio wordmark, navigation links, and "Start a project" action',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      assert(
        /<header[^>]*>/i.test(html) || /<nav[^>]*>/i.test(html),
        'Home page missing <header> or <nav> element'
      );
      assert(
        html.toLowerCase().includes('start a project'),
        'Navbar missing "Start a project" action text'
      );
      // Check essential navigation links
      const links = extractLinks(html);
      const linkHrefs = links.map((l) => l.href.replace(/\/$/, ''));
      assert(
        linkHrefs.some((h) => h.includes('/services') || h === 'services'),
        'Navbar missing link to /services'
      );
      assert(
        linkHrefs.some((h) => h.includes('/portfolio') || h === 'portfolio'),
        'Navbar missing link to /portfolio'
      );
      assert(
        linkHrefs.some((h) => h.includes('/contact') || h === 'contact'),
        'Navbar missing link to /contact'
      );
    },
  },

  {
    id: 'T1.7_home_hero_section',
    description: 'Home page renders Hero section with headline and dual CTAs ("Start a Project", "View Our Work")',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const headings = extractHeadings(html, 1);
      assert(headings.length >= 1, 'Home page must have at least one <h1> heading');

      const lower = html.toLowerCase();
      assert(
        lower.includes('start a project') || lower.includes('start project'),
        'Hero section missing primary CTA "Start a Project"'
      );
      assert(
        lower.includes('view our work') || lower.includes('view work') || lower.includes('portfolio'),
        'Hero section missing secondary CTA "View Our Work"'
      );
    },
  },

  {
    id: 'T1.8_home_trust_bar',
    description: 'Home page renders Trust Bar section with partner/client logos',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('trusted by') ||
          lower.includes('trust') ||
          lower.includes('clients') ||
          lower.includes('partner'),
        'Home page missing Trust Bar indicator or partner logos section'
      );
    },
  },

  {
    id: 'T1.9_home_services_overview',
    description: 'Home page renders Services Overview section with 4 group cards linking to services',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('services') || lower.includes('what we do'),
        'Home page missing Services overview section'
      );
      // Check for presence of group mentions or links to services
      const links = extractLinks(html);
      const serviceLinks = links.filter((l) => l.href.includes('/services'));
      assert(
        serviceLinks.length >= 4,
        `Expected at least 4 links in Services overview, found ${serviceLinks.length}`
      );
    },
  },

  {
    id: 'T1.10_home_featured_projects',
    description: 'Home page renders Featured Projects section displaying 3 curated cards',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('featured') || lower.includes('case studies') || lower.includes('recent work'),
        'Home page missing Featured Projects section'
      );
      // Links to portfolio items
      const links = extractLinks(html);
      const portfolioLinks = links.filter((l) => l.href.includes('/portfolio'));
      assert(
        portfolioLinks.length >= 3,
        `Home page should link to at least 3 featured portfolio items or portfolio overview, found ${portfolioLinks.length}`
      );
    },
  },

  {
    id: 'T1.11_home_stats_strip',
    description: 'Home page renders Stats Strip with agency metrics (years, projects, clients, countries)',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('projects') || lower.includes('clients') || lower.includes('years'),
        'Home page missing Stats Strip with agency metrics'
      );
    },
  },

  {
    id: 'T1.12_home_process_preview',
    description: 'Home page renders Process Preview section outlining 5-6 workflow steps with link to /process',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('process') || lower.includes('how we work'),
        'Home page missing Process Preview section'
      );
      const links = extractLinks(html);
      const processLink = links.find((l) => l.href.replace(/\/$/, '').endsWith('/process'));
      assert(Boolean(processLink), 'Process Preview must link to /process');
    },
  },

  {
    id: 'T1.13_home_tech_stack_strip',
    description: 'Home page renders Tech Stack Strip highlighting core technologies',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('technolog') || lower.includes('tech stack') || lower.includes('tools'),
        'Home page missing Tech Stack Strip section'
      );
    },
  },

  {
    id: 'T1.14_home_cta_banner',
    description: 'Home page renders pre-footer CTA Banner with link to /contact',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const links = extractLinks(html);
      const ctaContact = links.filter(
        (l) => l.href.includes('/contact') && (l.text.toLowerCase().includes('start') || l.text.toLowerCase().includes('get in touch') || l.text.toLowerCase().includes('talk') || l.text.toLowerCase().includes('quote'))
      );
      assert(
        ctaContact.length >= 1,
        'Home page CTA banner must contain an action link to /contact'
      );
    },
  },

  {
    id: 'T1.15_home_testimonials_suppressed',
    description: 'Home page suppresses testimonials until real client reviews exist',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      // Ensure dummy testimonials are not rendered
      assert(
        !html.includes('John Doe, CEO of FakeCorp') &&
          !html.includes('Lorem ipsum testimonial text'),
        'Suppressed testimonials section should not render fake testimonial data'
      );
    },
  },

  {
    id: 'T1.16_home_footer_structure',
    description: 'Home page renders Footer with multi-column links, contact details, socials, and copyright',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      assert(/<footer[^>]*>/i.test(html), 'Home page missing <footer> element');
      const lower = html.toLowerCase();
      assert(lower.includes('privacy'), 'Footer must contain link/mention of Privacy');
      assert(lower.includes('terms'), 'Footer must contain link/mention of Terms');
      assert(
        lower.includes('copyright') || lower.includes('©') || lower.includes('&copy;'),
        'Footer must contain copyright notice'
      );
    },
  },

  {
    id: 'T1.17_services_overview_groups',
    description: '/services page lists all 4 service groups: Web & Software, Mobile & Games, Automation & Integration, Creative',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/services', baseDir);
      const lower = html.toLowerCase();
      assert(lower.includes('web'), '/services missing Web & Software group');
      assert(lower.includes('mobile'), '/services missing Mobile & Games group');
      assert(lower.includes('automation'), '/services missing Automation & Integration group');
      assert(lower.includes('creative'), '/services missing Creative group');
    },
  },

  {
    id: 'T1.18_services_overview_links',
    description: '/services page contains links to all 9 individual services',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/services', baseDir);
      const links = extractLinks(html);
      for (const slug of EXPECTED_SERVICE_SLUGS) {
        const found = links.some((l) => l.href.includes(slug));
        assert(found, `/services page missing link to service slug "${slug}"`);
      }
    },
  },

  {
    id: 'T1.19_service_detail_overview_section',
    description: 'Service detail templates render an Overview section with heading and benefits',
    run: (baseDir = OUT_DIR) => {
      const sampleSlug = EXPECTED_SERVICE_SLUGS[0];
      const html = loadRouteContent(`/services/${sampleSlug}`, baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('overview') || lower.includes('about this service') || lower.includes('what is'),
        `Service page /services/${sampleSlug} missing Overview section`
      );
    },
  },

  {
    id: 'T1.20_service_detail_deliverables_section',
    description: 'Service detail templates render a "What We Deliver" section with deliverables list',
    run: (baseDir = OUT_DIR) => {
      const sampleSlug = EXPECTED_SERVICE_SLUGS[0];
      const html = loadRouteContent(`/services/${sampleSlug}`, baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('deliver') || lower.includes('what we deliver') || lower.includes('deliverables'),
        `Service page /services/${sampleSlug} missing "What We Deliver" section`
      );
    },
  },

  {
    id: 'T1.21_service_detail_process_section',
    description: 'Service detail templates render a Process section with step sequence',
    run: (baseDir = OUT_DIR) => {
      const sampleSlug = EXPECTED_SERVICE_SLUGS[0];
      const html = loadRouteContent(`/services/${sampleSlug}`, baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('process') || lower.includes('how we deliver') || lower.includes('workflow'),
        `Service page /services/${sampleSlug} missing Process section`
      );
    },
  },

  {
    id: 'T1.22_service_detail_technologies_section',
    description: 'Service detail templates render a Technologies section highlighting tools and stacks',
    run: (baseDir = OUT_DIR) => {
      const sampleSlug = EXPECTED_SERVICE_SLUGS[0];
      const html = loadRouteContent(`/services/${sampleSlug}`, baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('technolog') || lower.includes('stack') || lower.includes('tools'),
        `Service page /services/${sampleSlug} missing Technologies section`
      );
    },
  },

  {
    id: 'T1.23_service_detail_faq_section',
    description: 'Service detail templates render a FAQ section with questions and answers',
    run: (baseDir = OUT_DIR) => {
      const sampleSlug = EXPECTED_SERVICE_SLUGS[0];
      const html = loadRouteContent(`/services/${sampleSlug}`, baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('faq') || lower.includes('frequently asked') || lower.includes('questions'),
        `Service page /services/${sampleSlug} missing FAQ section`
      );
    },
  },

  {
    id: 'T1.24_service_detail_cta_section',
    description: 'Service detail templates render a CTA section linking to /contact',
    run: (baseDir = OUT_DIR) => {
      const sampleSlug = EXPECTED_SERVICE_SLUGS[0];
      const html = loadRouteContent(`/services/${sampleSlug}`, baseDir);
      const links = extractLinks(html);
      const contactLinks = links.filter((l) => l.href.includes('/contact'));
      assert(
        contactLinks.length >= 1,
        `Service page /services/${sampleSlug} missing CTA link to /contact`
      );
    },
  },

  {
    id: 'T1.25_portfolio_overview_project_cards',
    description: '/portfolio page renders project case study cards with titles and links',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/portfolio', baseDir);
      const links = extractLinks(html);
      const projectLinks = links.filter((l) => l.href.includes('/portfolio/'));
      assert(
        projectLinks.length >= 1,
        `/portfolio page must display links to individual case studies, found ${projectLinks.length}`
      );
    },
  },

  {
    id: 'T1.26_portfolio_category_filters',
    description: '/portfolio page contains category filters for project grouping',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/portfolio', baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('all') || lower.includes('filter') || lower.includes('categories'),
        '/portfolio page missing category filter controls'
      );
    },
  },

  {
    id: 'T1.27_portfolio_detail_case_study_structure',
    description: 'Project case study template renders problem, solution, tech stack, and results',
    run: (baseDir = OUT_DIR) => {
      const portfolioDir = path.join(baseDir, 'portfolio');
      const entries = fs.readdirSync(portfolioDir, { withFileTypes: true });
      const subdirs = entries.filter((e) => e.isDirectory());
      assert(subdirs.length > 0, 'No portfolio case study subdirectories found');

      const firstSlug = subdirs[0].name;
      const html = loadRouteContent(`/portfolio/${firstSlug}`, baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('problem') || lower.includes('challenge') || lower.includes('overview'),
        `Case study /portfolio/${firstSlug} missing Problem/Challenge section`
      );
      assert(
        lower.includes('solution') || lower.includes('approach'),
        `Case study /portfolio/${firstSlug} missing Solution section`
      );
      assert(
        lower.includes('technolog') || lower.includes('stack') || lower.includes('tools'),
        `Case study /portfolio/${firstSlug} missing Tech Stack section`
      );
    },
  },

  {
    id: 'T1.28_about_page_content',
    description: '/about page renders company story, mission statement, and core values',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/about', baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('story') || lower.includes('about us') || lower.includes('who we are'),
        '/about page missing company story / about heading'
      );
      assert(
        lower.includes('mission') || lower.includes('vision') || lower.includes('purpose'),
        '/about page missing mission / vision statement'
      );
      assert(
        lower.includes('values') || lower.includes('principles'),
        '/about page missing core values'
      );
    },
  },

  {
    id: 'T1.29_team_page_leadership',
    description: '/team page renders leadership profiles ("The three heads") with roles and bios',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/team', baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('team') || lower.includes('leadership'),
        '/team page missing team / leadership heading'
      );
      // Plan 01 specifies "The three heads"
      const headings = extractHeadings(html);
      assert(
        headings.length >= 3,
        'Team page should render headings for at least 3 team members / sections'
      );
    },
  },

  {
    id: 'T1.30_process_page_methodology',
    description: '/process page renders detailed 5-6 step delivery methodology',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/process', baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('process') || lower.includes('how we work') || lower.includes('methodology'),
        '/process page missing process / methodology heading'
      );
      // Check for step indicators (e.g. 1, 2, 3, 4, 5)
      assert(
        lower.includes('discovery') ||
          lower.includes('planning') ||
          lower.includes('step 1') ||
          lower.includes('step 01') ||
          lower.includes('design') ||
          lower.includes('development'),
        '/process page missing methodology steps'
      );
    },
  },

  {
    id: 'T1.31_legal_pages_rendered',
    description: 'Legal pages (/privacy and /terms) render policy text and company references',
    run: (baseDir = OUT_DIR) => {
      const privacyHtml = loadRouteContent('/privacy', baseDir);
      assert(
        privacyHtml.toLowerCase().includes('privacy policy'),
        '/privacy page must contain "Privacy Policy" title'
      );

      const termsHtml = loadRouteContent('/terms', baseDir);
      assert(
        termsHtml.toLowerCase().includes('terms of service') || termsHtml.toLowerCase().includes('terms & conditions'),
        '/terms page must contain "Terms of Service" or "Terms & Conditions"'
      );
    },
  },
];
