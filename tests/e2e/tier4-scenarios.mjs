/**
 * Tier 4: Real-World Application Scenarios Tests
 * Marketing Agency Site Skeleton E2E Suite
 */

import {
  OUT_DIR,
  EXPECTED_SERVICE_SLUGS,
  loadRouteContent,
  extractTitle,
  extractMetaByNameOrProperty,
  extractLinks,
  extractInputs,
  extractJsonLd,
  resolveRouteFile,
  exists,
  assert,
  assertMatch,
} from './helpers.mjs';

import fs from 'node:fs';
import path from 'node:path';

export const tier4Tests = [
  {
    id: 'T4.1_journey_client_exploration_to_contact',
    description: 'Workload 1: Prospective client explores Home value proposition, follows CTA to /contact, and accesses validated inquiry form',
    run: (baseDir = OUT_DIR) => {
      // Step 1: User lands on Home
      const homeHtml = loadRouteContent('/', baseDir);
      assert(homeHtml.length > 500, 'Home page must contain substantial rendered markup');

      // Step 2: User finds CTA leading to contact
      const homeLinks = extractLinks(homeHtml);
      const contactCta = homeLinks.find(
        (l) =>
          l.href.replace(/\/$/, '') === '/contact' ||
          l.href.replace(/\/$/, '').endsWith('/contact')
      );
      assert(Boolean(contactCta), 'Home page must provide direct CTA link to /contact');

      // Step 3: User arrives on /contact
      const contactHtml = loadRouteContent('/contact', baseDir);
      const inputs = extractInputs(contactHtml);

      // Verify contact inquiry form capabilities
      const hasName = inputs.some((i) => i.name.toLowerCase().includes('name'));
      const hasEmail = inputs.some((i) => i.name.toLowerCase().includes('email'));
      const hasMessage = inputs.some(
        (i) => i.name.toLowerCase().includes('message') || i.tag === 'textarea'
      );
      assert(hasName && hasEmail && hasMessage, 'Contact page must provide full inquiry form inputs (name, email, message)');
    },
  },

  {
    id: 'T4.2_journey_service_evaluation',
    description: 'Workload 2: Enterprise buyer evaluates service offerings from /services overview down to deep technical specifications and FAQ',
    run: (baseDir = OUT_DIR) => {
      // Step 1: Buyer opens /services
      const servicesHtml = loadRouteContent('/services', baseDir);
      const servicesLinks = extractLinks(servicesHtml);

      // Step 2: Buyer selects first service
      const targetSlug = EXPECTED_SERVICE_SLUGS[0];
      const targetLink = servicesLinks.find((l) => l.href.includes(targetSlug));
      assert(
        Boolean(targetLink),
        `/services overview must link directly to service "${targetSlug}"`
      );

      // Step 3: Deep inspection of service page
      const detailHtml = loadRouteContent(`/services/${targetSlug}`, baseDir);
      const detailLower = detailHtml.toLowerCase();

      // Check all 6 required content sections for enterprise decision making
      assert(
        detailLower.includes('deliver') || detailLower.includes('what we deliver'),
        `Service "${targetSlug}" missing Deliverables specification for client evaluation`
      );
      assert(
        detailLower.includes('process') || detailLower.includes('workflow'),
        `Service "${targetSlug}" missing delivery process steps`
      );
      assert(
        detailLower.includes('technolog') || detailLower.includes('stack'),
        `Service "${targetSlug}" missing tech stack breakdown`
      );
      assert(
        detailLower.includes('faq') || detailLower.includes('frequently'),
        `Service "${targetSlug}" missing FAQ decision support`
      );

      // Step 4: Final conversion button on service page
      const detailLinks = extractLinks(detailHtml);
      const inquiryCta = detailLinks.find((l) => l.href.includes('/contact'));
      assert(
        Boolean(inquiryCta),
        `Service detail "${targetSlug}" must provide conversion link back to /contact`
      );
    },
  },

  {
    id: 'T4.3_journey_portfolio_case_study_discovery',
    description: 'Workload 3: Client inspects past agency track record from Home featured projects to detailed case study metrics',
    run: (baseDir = OUT_DIR) => {
      // Step 1: Inspect Home featured projects
      const homeHtml = loadRouteContent('/', baseDir);
      const homeLinks = extractLinks(homeHtml);
      const portfolioLinks = homeLinks.filter((l) => l.href.includes('/portfolio'));
      assert(
        portfolioLinks.length >= 1,
        'Home page must link to portfolio showcase'
      );

      // Step 2: Inspect Portfolio overview
      const portfolioHtml = loadRouteContent('/portfolio', baseDir);
      assert(portfolioHtml.length > 500, 'Portfolio overview page must contain rendered markup');

      // Step 3: Inspect detailed case study
      const portfolioDir = path.join(baseDir, 'portfolio');
      if (fs.existsSync(portfolioDir)) {
        const entries = fs.readdirSync(portfolioDir, { withFileTypes: true });
        const subdirs = entries.filter((e) => e.isDirectory());
        if (subdirs.length > 0) {
          const projectSlug = subdirs[0].name;
          const caseStudyHtml = loadRouteContent(`/portfolio/${projectSlug}`, baseDir);
          const caseLower = caseStudyHtml.toLowerCase();
          assert(
            caseLower.includes('problem') || caseLower.includes('challenge') || caseLower.includes('solution'),
            `Case study "${projectSlug}" must explain problem and solution`
          );
        }
      }
    },
  },

  {
    id: 'T4.4_journey_mobile_local_market_whatsapp',
    description: 'Workload 4: Mobile visitor in Bangladesh accesses instant WhatsApp direct communication channel and local address',
    run: (baseDir = OUT_DIR) => {
      const contactHtml = loadRouteContent('/contact', baseDir);
      const links = extractLinks(contactHtml);

      // Verify WhatsApp action exists
      const waLink = links.find((l) => l.href.includes('wa.me'));
      assert(
        Boolean(waLink),
        'Contact page must feature direct WhatsApp messaging for rapid lead capture'
      );

      // Verify business operating context
      const lower = contactHtml.toLowerCase();
      assert(
        lower.includes('bangladesh') || lower.includes('dhaka') || lower.includes('gmt+6') || lower.includes('hours'),
        'Contact page must state physical/regional operating context or business hours'
      );
    },
  },

  {
    id: 'T4.5_journey_search_engine_social_crawler',
    description: 'Workload 5: Social media & search engine crawler harvests complete Open Graph, Twitter, and JSON-LD metadata',
    run: (baseDir = OUT_DIR) => {
      const keyRoutes = ['/', '/services', '/portfolio', '/about', '/contact'];
      for (const route of keyRoutes) {
        const html = loadRouteContent(route, baseDir);

        // SEO Title & Description
        const title = extractTitle(html);
        assert(Boolean(title) && title.length > 3, `${route} missing descriptive <title> tag`);

        const descMeta = extractMetaByNameOrProperty(html, 'description');
        assert(
          Boolean(descMeta?.content),
          `${route} missing <meta name="description"> tag`
        );

        // Open Graph Metadata
        const ogTitle = extractMetaByNameOrProperty(html, 'og:title');
        const ogDesc = extractMetaByNameOrProperty(html, 'og:description');
        assert(Boolean(ogTitle?.content), `${route} missing Open Graph og:title`);
        assert(Boolean(ogDesc?.content), `${route} missing Open Graph og:description`);

        // Twitter Card Metadata
        const twitterCard = extractMetaByNameOrProperty(html, 'twitter:card');
        assert(Boolean(twitterCard?.content), `${route} missing twitter:card metadata`);
      }

      // JSON-LD structured data on Home page
      const homeHtml = loadRouteContent('/', baseDir);
      const jsonLd = extractJsonLd(homeHtml);
      const hasOrgSchema = jsonLd.some(
        (data) =>
          data['@type'] === 'Organization' ||
          data['@type'] === 'WebSite' ||
          (Array.isArray(data['@graph']) &&
            data['@graph'].some((g) => g['@type'] === 'Organization' || g['@type'] === 'WebSite'))
      );
      assert(
        hasOrgSchema || homeHtml.includes('application/ld+json'),
        'Home page must provide JSON-LD structured data for Organization / WebSite'
      );
    },
  },

  {
    id: 'T4.6_journey_governance_and_legal',
    description: 'Workload 6: Auditor inspects legal governance pages (/privacy, /terms) and verifies return navigation',
    run: (baseDir = OUT_DIR) => {
      const privacyHtml = loadRouteContent('/privacy', baseDir);
      const termsHtml = loadRouteContent('/terms', baseDir);

      // Verify privacy policy content
      assert(
        privacyHtml.toLowerCase().includes('information') || privacyHtml.toLowerCase().includes('data'),
        '/privacy page must describe privacy practices'
      );

      // Verify terms of service content
      assert(
        termsHtml.toLowerCase().includes('intellectual property') ||
          termsHtml.toLowerCase().includes('limitation') ||
          termsHtml.toLowerCase().includes('agreement') ||
          termsHtml.toLowerCase().includes('terms'),
        '/terms page must describe user terms and conditions'
      );

      // Both pages retain global navigation headers
      const privacyLinks = extractLinks(privacyHtml);
      const termsLinks = extractLinks(termsHtml);
      assert(
        privacyLinks.some((l) => l.href === '/' || l.href.includes('/services')),
        '/privacy page must maintain navigation back to home or services'
      );
      assert(
        termsLinks.some((l) => l.href === '/' || l.href.includes('/services')),
        '/terms page must maintain navigation back to home or services'
      );
    },
  },
];
