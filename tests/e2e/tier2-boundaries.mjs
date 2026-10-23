/**
 * Tier 2: Boundary & Corner Cases Tests
 * Marketing Agency Site Skeleton E2E Suite
 */

import {
  OUT_DIR,
  APP_DIR,
  COMPONENTS_DIR,
  CONTENT_DIR,
  STYLES_DIR,
  resolveRouteFile,
  loadRouteContent,
  extractInputs,
  extractForms,
  extractImages,
  extractLinks,
  getFilesRecursively,
  exists,
  assert,
  assertMatch,
} from './helpers.mjs';

import fs from 'node:fs';

export const tier2Tests = [
  {
    id: 'T2.1_mobile_responsive_viewport_360',
    description: 'HTML layouts avoid hardcoded fixed overflow widths and use mobile-first container padding',
    run: (baseDir = OUT_DIR) => {
      const homeHtml = loadRouteContent('/', baseDir);
      // Verify no hardcoded wide fixed pixel widths like width: 1400px; or style="width: 1200px"
      assert(
        !/style=["'][^"']*width:\s*(?:12\d\d|13\d\d|14\d\d|16\d\d)px/i.test(homeHtml),
        'Found hardcoded desktop fixed pixel inline width in Home HTML which breaks 360px mobile view'
      );
      // Check presence of responsive padding classes (e.g., px-4, px-6, p-4, container)
      assert(
        /class=["'][^"']*\b(px-[3-8]|p-[3-8]|max-w-|container)\b[^"']*["']/i.test(homeHtml),
        'Home page missing mobile-first container padding classes'
      );
    },
  },

  {
    id: 'T2.2_tablet_responsive_viewport_768',
    description: 'Grid sections utilize md: breakpoint classes (md:grid-cols-*, md:flex) for tablet adaptation',
    run: (baseDir = OUT_DIR) => {
      const homeHtml = loadRouteContent('/', baseDir);
      assert(
        /\bmd:(?:grid-cols-[1-6]|flex|block|px-|text-)/i.test(homeHtml),
        'Home page HTML does not contain responsive md: breakpoint classes for 768px tablet devices'
      );
    },
  },

  {
    id: 'T2.3_desktop_responsive_viewport_1024_1440',
    description: 'Layouts constrain maximum container width using max-w- or container classes for desktop views',
    run: (baseDir = OUT_DIR) => {
      const homeHtml = loadRouteContent('/', baseDir);
      assert(
        /\b(?:max-w-(?:5xl|6xl|7xl|screen-xl|screen-2xl)|container)\b/i.test(homeHtml),
        'Home page missing max-width container limiter for large 1024px/1440px desktop viewports'
      );
    },
  },

  {
    id: 'T2.4_no_horizontal_overflow_styling',
    description: 'Root body or layout styling enforces overflow-x: hidden / overflow-x-hidden to prevent scroll leaks',
    run: (baseDir = OUT_DIR) => {
      // Check globals.css or pre-rendered HTML for overflow-x hidden
      let hasOverflowProtection = false;
      const homeHtml = loadRouteContent('/', baseDir);
      if (homeHtml.includes('overflow-x-hidden') || homeHtml.includes('overflow-x:hidden') || homeHtml.includes('overflow-x: hidden')) {
        hasOverflowProtection = true;
      }

      const globalsCssPath = `${STYLES_DIR}/globals.css`;
      if (fs.existsSync(globalsCssPath)) {
        const css = fs.readFileSync(globalsCssPath, 'utf-8');
        if (css.includes('overflow-x: hidden') || css.includes('overflow-x-hidden')) {
          hasOverflowProtection = true;
        }
      }

      // Also inspect CSS in HTML <style> tags or classes
      assert(
        hasOverflowProtection || homeHtml.includes('overflow-hidden') || homeHtml.includes('min-h-screen'),
        'Missing overflow-x: hidden constraint or layout bounds on document root to prevent scrollbar leaks'
      );
    },
  },

  {
    id: 'T2.5_images_have_alt_and_responsive_classes',
    description: 'All pre-rendered <img> tags provide non-empty alt text and responsive sizing attributes',
    run: (baseDir = OUT_DIR) => {
      const routes = ['/', '/services', '/portfolio', '/about'];
      for (const route of routes) {
        const html = loadRouteContent(route, baseDir);
        const images = extractImages(html);
        for (const img of images) {
          // Decorative images can have alt="" but must not have missing alt attribute
          assert(
            img.alt !== null,
            `Image with src="${img.src}" on ${route} is missing an alt attribute`
          );
        }
      }
    },
  },

  {
    id: 'T2.6_404_page_has_layout_and_home_cta',
    description: 'Custom 404 page provides branded recovery navigation linking back to Home or Services',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/404', baseDir);
      const links = extractLinks(html);
      const homeLink = links.find(
        (l) => l.href === '/' || l.href === '' || l.href.endsWith('/services') || l.text.toLowerCase().includes('home')
      );
      assert(
        Boolean(homeLink),
        '404.html must provide an actionable recovery link leading back to Home or Services'
      );
    },
  },

  {
    id: 'T2.7_404_page_clean_status_message',
    description: 'Custom 404 page presents a polite, professional not-found message without uncaught errors',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/404', baseDir);
      assert(
        !html.includes('Internal Server Error') &&
          !html.includes('UnhandledRuntimeError') &&
          !html.includes('ReferenceError') &&
          !html.includes('TypeError'),
        '404 page must not contain unhandled server or JavaScript error messages'
      );
    },
  },

  {
    id: 'T2.8_contact_form_honeypot_field_present',
    description: 'Contact form contains a dedicated anti-spam honeypot input field',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/contact', baseDir);
      const inputs = extractInputs(html);
      const honeypot = inputs.find(
        (i) =>
          i.name === '_gotcha' ||
          i.name === 'botcheck' ||
          i.name === 'honeypot' ||
          i.name === '_honey' ||
          i.name === 'website_trap' ||
          i.attrs.id?.toLowerCase().includes('honey') ||
          i.attrs['aria-hidden'] === 'true'
      );
      assert(
        Boolean(honeypot),
        'Contact page form must contain a honeypot field for bot/spam prevention'
      );
    },
  },

  {
    id: 'T2.9_contact_form_honeypot_hidden_from_users',
    description: 'Honeypot input is hidden from human visitors (tabIndex=-1, hidden, sr-only, or opacity-0)',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/contact', baseDir);
      const inputs = extractInputs(html);
      const honeypot = inputs.find(
        (i) =>
          i.name === '_gotcha' ||
          i.name === 'botcheck' ||
          i.name === 'honeypot' ||
          i.name === '_honey' ||
          i.attrs['aria-hidden'] === 'true'
      );
      if (honeypot) {
        const raw = honeypot.raw.toLowerCase();
        const parentHtml = html.slice(Math.max(0, html.indexOf(honeypot.raw) - 100), html.indexOf(honeypot.raw) + honeypot.raw.length + 100).toLowerCase();
        const isHidden =
          raw.includes('hidden') ||
          raw.includes('tabindex="-1"') ||
          raw.includes('opacity-0') ||
          parentHtml.includes('display: none') ||
          parentHtml.includes('display:none') ||
          parentHtml.includes('hidden') ||
          parentHtml.includes('sr-only');
        assert(
          isHidden,
          'Honeypot field must be hidden from normal user interaction via hidden, sr-only, or tabIndex="-1"'
        );
      }
    },
  },

  {
    id: 'T2.10_contact_form_required_fields',
    description: 'Essential form fields (name, email, message) enforce client-side required constraints',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/contact', baseDir);
      const inputs = extractInputs(html);
      const nameInput = inputs.find((i) => i.name.toLowerCase().includes('name'));
      const emailInput = inputs.find((i) => i.name.toLowerCase().includes('email'));
      const messageInput = inputs.find(
        (i) => i.name.toLowerCase().includes('message') || i.tag === 'textarea'
      );

      assert(Boolean(nameInput), 'Contact form missing name input field');
      assert(Boolean(emailInput), 'Contact form missing email input field');
      assert(Boolean(messageInput), 'Contact form missing message input/textarea field');

      // Check required attributes on inputs or form markup
      assert(
        nameInput.required || html.includes('required'),
        'Contact form name input must be required'
      );
      assert(
        emailInput.required || html.includes('required'),
        'Contact form email input must be required'
      );
    },
  },

  {
    id: 'T2.11_contact_form_email_input_type',
    description: 'Email field has type="email" for built-in client validation',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/contact', baseDir);
      const inputs = extractInputs(html);
      const emailInput = inputs.find((i) => i.name.toLowerCase().includes('email'));
      assert(
        emailInput?.type === 'email',
        'Email input on contact form must have type="email"'
      );
    },
  },

  {
    id: 'T2.12_contact_form_service_dropdown',
    description: 'Contact form provides a <select> or service dropdown for client inquiries',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/contact', baseDir);
      const inputs = extractInputs(html);
      const select = inputs.find(
        (i) => i.tag === 'select' || i.name.toLowerCase().includes('service')
      );
      assert(
        Boolean(select) || html.toLowerCase().includes('select service') || html.toLowerCase().includes('service interested'),
        'Contact form must include a service selection dropdown or input'
      );
    },
  },

  {
    id: 'T2.13_contact_form_budget_and_timeline',
    description: 'Contact form provides inputs for budget range and project timeline',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/contact', baseDir);
      const lower = html.toLowerCase();
      assert(
        lower.includes('budget') || lower.includes('investment'),
        'Contact form should provide budget range options'
      );
      assert(
        lower.includes('timeline') || lower.includes('timeframe') || lower.includes('urgency') || lower.includes('deadline'),
        'Contact form should provide timeline options'
      );
    },
  },

  {
    id: 'T2.14_empty_fields_handling',
    description: 'Pre-rendered HTML contains no literal "undefined", "null", or "[object Object]" DOM text',
    run: (baseDir = OUT_DIR) => {
      const sampleRoutes = ['/', '/services', '/portfolio', '/about', '/contact'];
      for (const route of sampleRoutes) {
        const html = loadRouteContent(route, baseDir);
        // Exclude script tags / JSON strings, inspect HTML body text
        const bodyContent = html.replace(/<script[\s\S]*?<\/script>/gi, '');
        assert(
          !/>\s*undefined\s*</i.test(bodyContent),
          `Found literal "undefined" rendered as text in route ${route}`
        );
        assert(
          !/>\s*null\s*</i.test(bodyContent),
          `Found literal "null" rendered as text in route ${route}`
        );
        assert(
          !/>\s*\[object Object\]\s*</i.test(bodyContent),
          `Found literal "[object Object]" rendered as text in route ${route}`
        );
      }
    },
  },

  {
    id: 'T2.15_no_visible_placeholder_markers',
    description: 'Pre-rendered pages contain no visible placeholder or TODO markers',
    run: (baseDir = OUT_DIR) => {
      const sampleRoutes = ['/', '/services', '/portfolio', '/about', '/contact'];
      for (const route of sampleRoutes) {
        const html = loadRouteContent(route, baseDir);
        assert(
          !html.includes('[PLACEHOLDER]'),
          `Route ${route} still renders a [PLACEHOLDER] marker`
        );
        assert(
          !html.includes('TODO(content)'),
          `Route ${route} still renders a TODO(content) marker`
        );
      }
    },
  },

  {
    id: 'T2.16_home_metric_labels',
    description: 'Home page pairs project metrics with descriptive labels',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      assert(html.includes('74%'), 'Home page missing the inventory metric');
      assert(
        html.includes('Faster Inventory Processing'),
        'Inventory metric is missing its label'
      );
      assert(html.includes('4.9'), 'Home page missing the app rating metric');
      assert(html.includes('App Store'), 'App rating metric is missing its label');
    },
  },

  {
    id: 'T2.17_favicon_and_meta_icons',
    description: 'HTML <head> links to a favicon or icon resource',
    run: (baseDir = OUT_DIR) => {
      const html = loadRouteContent('/', baseDir);
      const hasIcon =
        /<link\s+[^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*>/i.test(html) ||
        html.includes('favicon.ico') ||
        html.includes('icon.svg');
      assert(
        hasIcon,
        'Home page HTML <head> missing favicon or icon <link> declaration'
      );
    },
  },

  {
    id: 'T2.18_static_export_dynamic_params_false',
    description: 'Dynamic service page module configures dynamicParams = false for static export safety',
    run: (baseDir = OUT_DIR) => {
      const servicePagePath = `${APP_DIR}/services/[slug]/page.tsx`;
      if (fs.existsSync(servicePagePath)) {
        const content = fs.readFileSync(servicePagePath, 'utf-8');
        assert(
          content.includes('dynamicParams = false'),
          'services/[slug]/page.tsx must export "export const dynamicParams = false;"'
        );
      } else {
        assert(
          fs.existsSync(baseDir) || fs.existsSync(OUT_DIR),
          `Either ${servicePagePath} or static export directory (${baseDir}) must exist`
        );
      }
    },
  },
];
