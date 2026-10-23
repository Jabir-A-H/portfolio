/**
 * Test Utilities and DOM/HTML Parsing Helpers
 * E2E Test Suite for Marketing Agency Site Skeleton
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
export const OUT_DIR = path.resolve(PROJECT_ROOT, 'out');
export const APP_DIR = path.resolve(PROJECT_ROOT, 'app');
export const COMPONENTS_DIR = path.resolve(PROJECT_ROOT, 'components');
export const CONTENT_DIR = path.resolve(PROJECT_ROOT, 'content');
export const STYLES_DIR = path.resolve(PROJECT_ROOT, 'styles');

/**
 * Expected 9 Service Slugs
 */
export const EXPECTED_SERVICE_SLUGS = [
  'web-design-development',
  'software-design-development',
  'website-software-maintenance',
  'mobile-app-development',
  'game-development',
  'business-automation',
  'api-system-integration',
  'graphics-design',
  'video-editing',
];

/**
 * Expected 4 Service Groups
 */
export const EXPECTED_SERVICE_GROUPS = [
  'web-software',
  'mobile-games',
  'automation-integration',
  'creative',
];

/**
 * Expected 14 Core Routes
 */
export const EXPECTED_CORE_ROUTES = [
  '/',
  '/services',
  '/services/[slug]',
  '/portfolio',
  '/portfolio/[slug]',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/404',
  '/sitemap.xml',
  '/robots.txt',
];

/**
 * Check if a file or directory exists synchronously
 */
export function exists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Resolve an export route path in out/
 * Handles both trailingSlash (dir/index.html) and non-trailingSlash (dir.html)
 */
export function resolveRouteFile(route, customBaseDir = OUT_DIR) {
  const cleanRoute = route.replace(/^\//, '').replace(/\/$/, '');

  if (cleanRoute === '' || cleanRoute === '/') {
    return path.join(customBaseDir, 'index.html');
  }

  if (cleanRoute === '404' || cleanRoute === 'not-found') {
    const direct404 = path.join(customBaseDir, '404.html');
    if (fs.existsSync(direct404)) return direct404;
    const index404 = path.join(customBaseDir, '404', 'index.html');
    if (fs.existsSync(index404)) return index404;
    return direct404;
  }

  if (cleanRoute === 'sitemap.xml') {
    return path.join(customBaseDir, 'sitemap.xml');
  }

  if (cleanRoute === 'robots.txt') {
    return path.join(customBaseDir, 'robots.txt');
  }

  const asDirIndex = path.join(customBaseDir, cleanRoute, 'index.html');
  if (fs.existsSync(asDirIndex)) return asDirIndex;

  const asHtmlFile = path.join(customBaseDir, `${cleanRoute}.html`);
  if (fs.existsSync(asHtmlFile)) return asHtmlFile;

  // Default preferred static export convention with trailingSlash: true
  return asDirIndex;
}

/**
 * Read route HTML content or throw informative error
 */
export function loadRouteContent(route, customBaseDir = OUT_DIR) {
  const filePath = resolveRouteFile(route, customBaseDir);
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Pre-rendered file for route "${route}" not found at "${filePath}". (Ensure "npm run build" has succeeded.)`
    );
  }
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * HTML Extraction & Inspection Helpers
 */

export function extractTitle(html) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : null;
}

export function extractMetaTags(html) {
  const metaRegex = /<meta\s+([^>]+)>/gi;
  const metas = [];
  let match;
  while ((match = metaRegex.exec(html)) !== null) {
    const attrString = match[1];
    const attrs = parseAttributes(attrString);
    metas.push(attrs);
  }
  return metas;
}

export function extractMetaByNameOrProperty(html, nameOrProp) {
  const metas = extractMetaTags(html);
  return metas.find(
    (m) =>
      m.name?.toLowerCase() === nameOrProp.toLowerCase() ||
      m.property?.toLowerCase() === nameOrProp.toLowerCase()
  );
}

export function extractHeadings(html, level = null) {
  const tagPattern = level ? `h${level}` : 'h[1-6]';
  const headingRegex = new RegExp(`<(${tagPattern})[^>]*>([\\s\\S]*?)<\\/\\1>`, 'gi');
  const headings = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    headings.push({
      level: match[1].toLowerCase(),
      content: stripTags(match[2]).trim(),
      raw: match[0],
    });
  }
  return headings;
}

export function extractLinks(html) {
  const linkRegex = /<a\s+([^>]+)>([\s\S]*?)<\/a>/gi;
  const links = [];
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const attrs = parseAttributes(match[1]);
    links.push({
      href: attrs.href || '',
      text: stripTags(match[2]).trim(),
      attrs,
      raw: match[0],
    });
  }
  return links;
}

export function extractImages(html) {
  const imgRegex = /<img\s+([^>]+)>/gi;
  const imgs = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const attrs = parseAttributes(match[1]);
    imgs.push({
      src: attrs.src || '',
      alt: attrs.alt ?? null,
      class: attrs.class || attrs.className || '',
      attrs,
      raw: match[0],
    });
  }
  return imgs;
}

export function extractForms(html) {
  const formRegex = /<form\s*([^>]*)>([\s\S]*?)<\/form>/gi;
  const forms = [];
  let match;
  while ((match = formRegex.exec(html)) !== null) {
    const attrs = parseAttributes(match[1]);
    forms.push({
      attrs,
      innerHtml: match[2],
      raw: match[0],
    });
  }
  return forms;
}

export function extractInputs(html) {
  const inputRegex = /<(input|textarea|select)\s+([^>]+)>/gi;
  const inputs = [];
  let match;
  while ((match = inputRegex.exec(html)) !== null) {
    const tag = match[1].toLowerCase();
    const attrs = parseAttributes(match[2]);
    inputs.push({
      tag,
      name: attrs.name || '',
      type: attrs.type || (tag === 'textarea' ? 'textarea' : tag === 'select' ? 'select' : 'text'),
      required: 'required' in attrs || attrs.required === 'true',
      attrs,
      raw: match[0],
    });
  }
  return inputs;
}

export function extractJsonLd(html) {
  const scriptRegex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const jsonLdList = [];
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      jsonLdList.push(parsed);
    } catch {
      // Ignore JSON parse errors for robust harvesting
    }
  }
  return jsonLdList;
}

export function parseAttributes(attrString) {
  const attrs = {};
  const regex = /([a-zA-Z0-9_:-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;
  while ((match = regex.exec(attrString)) !== null) {
    const key = match[1];
    const val = match[2] ?? match[3] ?? match[4] ?? '';
    attrs[key] = val;
  }
  return attrs;
}

export function stripTags(str) {
  return str.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
}

/**
 * Scan source directory for files recursively
 */
export function getFilesRecursively(dir, extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.css']) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath, extensions));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Assertion utilities
 */
export function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

export function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected "${expected}", got "${actual}"`);
  }
}

export function assertIncludes(haystack, needle, message) {
  if (!haystack || !haystack.includes(needle)) {
    throw new Error(`${message}: expected target to contain "${needle}"`);
  }
}

export function assertMatch(text, regex, message) {
  if (!regex.test(text)) {
    throw new Error(`${message}: text did not match pattern ${regex}`);
  }
}
