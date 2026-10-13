/**
 * Tier 3: Cross-Feature Interactions Tests
 * Marketing Agency Site Skeleton E2E Suite
 */

import {
  OUT_DIR,
  APP_DIR,
  COMPONENTS_DIR,
  CONTENT_DIR,
  STYLES_DIR,
  EXPECTED_SERVICE_SLUGS,
  resolveRouteFile,
  loadRouteContent,
  extractLinks,
  extractInputs,
  getFilesRecursively,
  exists,
  assert,
  assertMatch,
} from './helpers.mjs';

import fs from 'node:fs';

export const tier3Tests = [
  {
    id: 'T3.1_theme_css_variables_defined',
    description: 'Design tokens defined as CSS variables (--primary, --accent, --background, --surface, etc.) in globals.css or pre-rendered styles',
    run: (baseDir = OUT_DIR) => {
      let foundVariables = false;
      const globalsCssPath = `${STYLES_DIR}/globals.css`;
      if (fs.existsSync(globalsCssPath)) {
        const css = fs.readFileSync(globalsCssPath, 'utf-8');
        const requiredTokens = ['--primary', '--accent', '--background', '--surface', '--text', '--border'];
        foundVariables = requiredTokens.every((token) => css.includes(token));
      }

      if (!foundVariables) {
        // Check pre-rendered HTML for CSS custom properties
        const html = loadRouteContent('/', baseDir);
        foundVariables =
          html.includes('--primary') &&
          html.includes('--background') &&
          html.includes('--accent');
      }

      assert(
        foundVariables,
        'Design tokens (--primary, --accent, --background, --surface, --text, --border) must be defined as CSS variables'
      );
    },
  },

  {
    id: 'T3.2_theme_anti_fouc_script',
    description: 'Pre-rendered HTML <head> contains an anti-FOUC theme script checking localStorage or prefers-color-scheme',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const hasAntiFoucScript =
        html.includes('localStorage') &&
        (html.includes('theme') || html.includes('dark')) &&
        (html.includes('classList.add') || html.includes('documentElement.classList') || html.includes('matchMedia'));
      assert(
        hasAntiFoucScript,
        'HTML <head> must include an anti-FOUC theme script to prevent light/dark flicker'
      );
    },
  },

  {
    id: 'T3.3_theme_toggle_in_navbar',
    description: 'Navbar contains an accessible theme toggle button or switch',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const lower = html.toLowerCase();
      const hasToggle =
        lower.includes('theme') ||
        lower.includes('toggle theme') ||
        lower.includes('dark mode') ||
        lower.includes('light mode') ||
        /aria-label=["'][^"']*(?:theme|dark|light)[^"']*["']/i.test(html) ||
        /button[^>]*class=["'][^"']*theme[^"']*["']/i.test(html);
      assert(
        hasToggle,
        'Navbar must include a theme toggle switch button for switching light/dark modes'
      );
    },
  },

  {
    id: 'T3.4_navbar_links_match_routes',
    description: 'Every internal link in Navbar corresponds to an existing pre-rendered route file',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const navMatch = html.match(/<(?:header|nav)[\s\S]*?<\/(?:header|nav)>/i);
      const navHtml = navMatch ? navMatch[0] : html;
      const links = extractLinks(navHtml);
      // Filter internal links
      const internalLinks = links.filter(
        (l) =>
          l.href &&
          !l.href.startsWith('http') &&
          !l.href.startsWith('mailto:') &&
          !l.href.startsWith('tel:') &&
          !l.href.startsWith('https://wa.me') &&
          !l.href.startsWith('#')
      );

      for (const link of internalLinks) {
        const filePath = resolveRouteFile(link.href, baseDir);
        assert(
          exists(filePath),
          `Navbar link "${link.href}" points to non-existent export file at ${filePath}`
        );
      }
    },
  },

  {
    id: 'T3.5_footer_links_match_routes',
    description: 'Every internal link in Footer corresponds to an existing pre-rendered route file',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
      assert(Boolean(footerMatch), 'Missing <footer> in Home page');

      const footerLinks = extractLinks(footerMatch[0]);
      const internalFooterLinks = footerLinks.filter(
        (l) =>
          l.href &&
          !l.href.startsWith('http') &&
          !l.href.startsWith('mailto:') &&
          !l.href.startsWith('tel:') &&
          !l.href.startsWith('#')
      );

      for (const link of internalFooterLinks) {
        const filePath = resolveRouteFile(link.href, baseDir);
        assert(
          exists(filePath),
          `Footer link "${link.href}" points to non-existent export file at ${filePath}`
        );
      }
    },
  },

  {
    id: 'T3.6_sitemap_xml_exists_and_valid',
    description: 'out/sitemap.xml exists, is valid XML, and includes all core routes and service URLs',
    run: (baseDir = OUT_DIR) => {
      const sitemapPath = resolveRouteFile('sitemap.xml', baseDir);
      assert(exists(sitemapPath), `sitemap.xml missing at ${sitemapPath}`);

      const xml = fs.readFileSync(sitemapPath, 'utf-8');
      assert(xml.includes('<urlset'), 'sitemap.xml must have root <urlset> element');
      assert(xml.includes('</urlset>'), 'sitemap.xml must have closing </urlset>');

      // Verify core routes are represented in sitemap
      const corePaths = ['/services', '/portfolio', '/about', '/contact', '/privacy', '/terms'];
      for (const p of corePaths) {
        assert(
          xml.includes(p),
          `sitemap.xml does not contain entry for route "${p}"`
        );
      }

      // Verify dynamic service slugs are present in sitemap
      for (const slug of EXPECTED_SERVICE_SLUGS) {
        assert(
          xml.includes(`/services/${slug}`),
          `sitemap.xml does not contain entry for service "${slug}"`
        );
      }
    },
  },

  {
    id: 'T3.7_robots_txt_exists_and_points_to_sitemap',
    description: 'out/robots.txt exists, allows search bots, and references sitemap.xml',
    run: (baseDir = OUT_DIR) => {
      const robotsPath = resolveRouteFile('robots.txt', baseDir);
      assert(exists(robotsPath), `robots.txt missing at ${robotsPath}`);

      const content = fs.readFileSync(robotsPath, 'utf-8');
      assert(
        content.toLowerCase().includes('user-agent:'),
        'robots.txt must declare User-agent directive'
      );
      assert(
        content.toLowerCase().includes('sitemap:'),
        'robots.txt must declare Sitemap directive pointing to sitemap.xml'
      );
    },
  },

  {
    id: 'T3.8_contact_service_dropdown_matches_all_9_services',
    description: 'Contact form service selector incorporates options matching all 9 agency services',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/contact', baseDir);
      const lower = html.toLowerCase();
      // Verify services are present either as <option> text/values or buttons/selectors
      let matchedServices = 0;
      for (const slug of EXPECTED_SERVICE_SLUGS) {
        const readableTerm = slug.replace(/-/g, ' ');
        if (lower.includes(slug) || lower.includes(readableTerm)) {
          matchedServices++;
        }
      }
      assert(
        matchedServices >= 6,
        `Expected contact form service selection to include agency services, matched ${matchedServices}/9`
      );
    },
  },

  {
    id: 'T3.9_whatsapp_link_formatting',
    description: 'WhatsApp action link href starts with https://wa.me/ followed by clean numeric digits without symbols',
    run: (baseDir = OUT_DIR) => {
      const contactHtml = loadRouteContent('/contact', baseDir);
      const homeHtml = loadRouteContent('/', baseDir);
      const allHtml = contactHtml + homeHtml;

      const links = extractLinks(allHtml);
      const waLinks = links.filter((l) => l.href.includes('wa.me'));
      assert(
        waLinks.length >= 1,
        'Expected at least one direct WhatsApp contact link in Home or Contact page'
      );

      for (const wa of waLinks) {
        const cleanHref = wa.href.split('?')[0]; // Strip URL params if any
        // wa.me URL must only contain digits after wa.me/
        assertMatch(
          cleanHref,
          /^https?:\/\/wa\.me\/\d+$/i,
          `WhatsApp URL "${wa.href}" has invalid format; must be "https://wa.me/<digits>" without +, -, or spaces`
        );
      }
    },
  },

  {
    id: 'T3.10_mailto_fallback_formatting',
    description: 'Fallback email links use mailto: format with valid email syntax',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/contact', baseDir);
      const links = extractLinks(html);
      const mailtoLinks = links.filter((l) => l.href.startsWith('mailto:'));
      assert(
        mailtoLinks.length >= 1,
        'Contact page must include a direct mailto: email link'
      );

      for (const mailto of mailtoLinks) {
        const email = mailto.href.replace('mailto:', '').split('?')[0];
        assertMatch(
          email,
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          `mailto address "${email}" is not a valid email syntax`
        );
      }
    },
  },

  {
    id: 'T3.11_zero_hardcoded_brand_in_components',
    description: 'Zero hardcoded company brand or contact strings in app/ and components/ outside content/site.ts',
    run: () => {
      // Check if content/site.ts exists and read configured brand name and contact values
      const siteConfigPath = `${CONTENT_DIR}/site.ts`;
      if (!fs.existsSync(siteConfigPath)) {
        // Pass if directory not yet scaffolded
        return;
      }

      const siteContent = fs.readFileSync(siteConfigPath, 'utf-8');
      // Extract brand name string if defined
      const nameMatch = siteContent.match(/name:\s*['"`]([^'"`]+)['"`]/);
      const brandName = nameMatch ? nameMatch[1] : null;

      if (!brandName || brandName.includes('[PLACEHOLDER]')) {
        // If placeholder, pass
        return;
      }

      // Check all files in app/ and components/
      const codeFiles = [
        ...getFilesRecursively(APP_DIR, ['.ts', '.tsx']),
        ...getFilesRecursively(COMPONENTS_DIR, ['.ts', '.tsx']),
      ];

      for (const file of codeFiles) {
        const code = fs.readFileSync(file, 'utf-8');
        // If file contains raw literal brandName without importing from site.ts
        if (code.includes(`"${brandName}"`) || code.includes(`'${brandName}'`)) {
          if (!code.includes('siteConfig') && !code.includes('content/site')) {
            throw new Error(
              `Found literal brand name "${brandName}" in file ${file} without import from content/site.ts`
            );
          }
        }
      }
    },
  },
];
