#!/usr/bin/env node

/**
 * Route Pre-rendering Verification Script
 * Validates that next build static export generated valid pre-rendered HTML
 * files in out/ for all core routes, dynamic services, dynamic portfolio items,
 * error recovery pages, and SEO artifacts.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');

// 9 Standard Service Slugs
const SERVICE_SLUGS = [
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

// 6 Standard Portfolio Slugs
const PORTFOLIO_SLUGS = [
  'apex-cloud-erp',
  'fitpulse-mobile-app',
  'logiflow-warehouse-automation',
  'nordic-fintech-portal',
  'nebula-tactics-mobile-game',
  'lumina-brand-relaunch',
];

// 14 Core route definitions to verify
const REQUIRED_ROUTES = [
  { name: 'Home Route (/)', candidates: ['index.html'] },
  { name: 'Services Overview (/services)', candidates: ['services/index.html', 'services.html'] },
  ...SERVICE_SLUGS.map((slug) => ({
    name: `Service Detail (/services/${slug})`,
    candidates: [`services/${slug}/index.html`, `services/${slug}.html`],
  })),
  { name: 'Portfolio Overview (/portfolio)', candidates: ['portfolio/index.html', 'portfolio.html'] },
  ...PORTFOLIO_SLUGS.map((slug) => ({
    name: `Portfolio Detail (/portfolio/${slug})`,
    candidates: [`portfolio/${slug}/index.html`, `portfolio/${slug}.html`],
  })),
  { name: 'About Page (/about)', candidates: ['about/index.html', 'about.html'] },
  { name: 'Team Page (/team)', candidates: ['team/index.html', 'team.html'] },
  { name: 'Process Page (/process)', candidates: ['process/index.html', 'process.html'] },
  { name: 'Contact Page (/contact)', candidates: ['contact/index.html', 'contact.html'] },
  { name: 'Privacy Policy (/privacy)', candidates: ['privacy/index.html', 'privacy.html'] },
  { name: 'Terms of Service (/terms)', candidates: ['terms/index.html', 'terms.html'] },
  { name: '404 Error Page (/404)', candidates: ['404.html', '404/index.html'] },
  { name: 'Sitemap XML (/sitemap.xml)', candidates: ['sitemap.xml'] },
  { name: 'Robots TXT (/robots.txt)', candidates: ['robots.txt'] },
];

console.log('\n============================================================');
console.log('         STATIC EXPORT ROUTE VERIFICATION GATE');
console.log('============================================================\n');

if (!fs.existsSync(outDir)) {
  console.error(`❌ FAILURE: Static export directory not found: ${outDir}`);
  console.error('Run "npm run build" before running route verification.');
  process.exit(1);
}

let missingCount = 0;
let validatedCount = 0;

for (const route of REQUIRED_ROUTES) {
  let resolvedPath = null;
  for (const candidate of route.candidates) {
    const fullCandidate = path.join(outDir, ...candidate.split('/'));
    if (fs.existsSync(fullCandidate)) {
      resolvedPath = candidate;
      break;
    }
  }

  if (resolvedPath) {
    const stat = fs.statSync(path.join(outDir, ...resolvedPath.split('/')));
    console.log(`  ✓ [FOUND] ${route.name.padEnd(46)} -> out/${resolvedPath} (${stat.size} bytes)`);
    validatedCount++;
  } else {
    console.error(`  ✗ [MISSING] ${route.name.padEnd(44)} -> looked for: ${route.candidates.join(' OR ')}`);
    missingCount++;
  }
}

console.log('\n------------------------------------------------------------');
console.log(`Summary: ${validatedCount} validated, ${missingCount} missing out of ${REQUIRED_ROUTES.length} routes.`);
console.log('------------------------------------------------------------\n');

if (missingCount > 0) {
  console.error(`❌ Route verification failed with ${missingCount} missing route export(s).\n`);
  process.exit(1);
}

console.log('✔ All static export routes verified successfully!\n');
process.exit(0);
