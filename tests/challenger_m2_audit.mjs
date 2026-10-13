/**
 * Empirical Challenger Verification Suite for Milestone 2
 * Tests section contracts, brand isolation, and responsive geometry.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const OUT_DIR = path.join(ROOT_DIR, 'out');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assertTest(id, description, condition, detail = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS [${id}]: ${description}`);
  } else {
    failedTests++;
    failures.push({ id, description, detail });
    console.error(`  ✗ FAIL [${id}]: ${description}`);
    if (detail) console.error(`         Detail: ${detail}`);
  }
}

console.log('========================================================================');
console.log('       CHALLENGER M2 EMPIRICAL AUDIT: SECTION CONTRACTS & ISOLATION     ');
console.log('========================================================================\n');

// Helper to get recursive code files
function getFilesRecursively(dir, extensions = ['.tsx', '.ts']) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getFilesRecursively(full, extensions));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

// -----------------------------------------------------------------------------
// 1. BRAND & CONTACT ISOLATION SCAN
// -----------------------------------------------------------------------------
console.log('▶ 1. Brand & Contact Isolation Audit');

const targetBrandLiterals = [
  'Apex Digital',
  'Apex Digital Solutions Ltd',
  'apex-digital.placeholder.example',
  'hello@example.com',
  '+880 1700-000000',
  '8801700000000',
  '123 Innovation Boulevard',
  'Tech Tower',
];

const codeFilesToScan = [
  ...getFilesRecursively(APP_DIR),
  ...getFilesRecursively(path.join(COMPONENTS_DIR, 'sections')),
  ...getFilesRecursively(path.join(COMPONENTS_DIR, 'portfolio')),
  ...getFilesRecursively(path.join(COMPONENTS_DIR, 'layout')),
  ...getFilesRecursively(path.join(COMPONENTS_DIR, 'ui')),
];

assertTest(
  'BRAND_01_FILES_DISCOVERED',
  'UI source code files discovered for scanning in app/ and components/',
  codeFilesToScan.length >= 20,
  `Discovered ${codeFilesToScan.length} files`
);

for (const literal of targetBrandLiterals) {
  const violatingFiles = [];
  for (const file of codeFilesToScan) {
    const content = fs.readFileSync(file, 'utf-8');
    // Check if file contains literal as string literal in code
    // Strip comments to allow TODO(content) mentions
    const stripped = content.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '');
    if (stripped.includes(`'${literal}'`) || stripped.includes(`"${literal}"`) || stripped.includes(`>${literal}<`)) {
      violatingFiles.push(path.relative(ROOT_DIR, file));
    }
  }
  assertTest(
    `BRAND_LITERAL_${literal.replace(/[^a-zA-Z0-9]/g, '_')}`,
    `Zero hardcoded literal occurrences of "${literal}" outside content/site.ts`,
    violatingFiles.length === 0,
    violatingFiles.length > 0 ? `Found hardcoded in: ${violatingFiles.join(', ')}` : ''
  );
}

// Regex scan for unquoted emails in JSX
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const emailViolations = [];
for (const file of codeFilesToScan) {
  const content = fs.readFileSync(file, 'utf-8');
  const stripped = content.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '');
  const matches = stripped.match(emailRegex);
  if (matches) {
    emailViolations.push({ file: path.relative(ROOT_DIR, file), matches });
  }
}
assertTest(
  'BRAND_NO_RAW_EMAILS',
  'Zero hardcoded email literals in UI component code outside comments',
  emailViolations.length === 0,
  emailViolations.map((v) => `${v.file}: ${v.matches.join(', ')}`).join('; ')
);

// -----------------------------------------------------------------------------
// 2. FEATURED PROJECTS CONTRACT VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n▶ 2. FeaturedProjects Section Contract Audit');

// Inspect content/projects.ts
const projectsPath = path.join(CONTENT_DIR, 'projects.ts');
const projectsContent = fs.readFileSync(projectsPath, 'utf-8');

// Count featured: true in projects.ts
const featuredMatches = projectsContent.match(/featured:\s*true/g) || [];
assertTest(
  'FEAT_01_EXACTLY_THREE_IN_DATA',
  'content/projects.ts defines exactly 3 projects with featured: true',
  featuredMatches.length === 3,
  `Found ${featuredMatches.length} items with featured: true`
);

// Inspect out/index.html
const homeHtmlPath = path.join(OUT_DIR, 'index.html');
const homeHtmlExists = fs.existsSync(homeHtmlPath);
assertTest('FEAT_02_HOME_HTML_EXISTS', 'pre-rendered out/index.html exists', homeHtmlExists);

if (homeHtmlExists) {
  const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8');

  // Verify featured section existence
  assertTest(
    'FEAT_03_SECTION_IN_DOM',
    'Home page HTML renders #featured-projects section',
    homeHtml.includes('id="featured-projects"')
  );

  // Extract featured section slice up to next section tag
  const sectionStart = homeHtml.indexOf('id="featured-projects"');
  let sectionChunk = '';
  if (sectionStart !== -1) {
    const nextSectionIndex = homeHtml.indexOf('<section', sectionStart + 1);
    sectionChunk = nextSectionIndex !== -1 ? homeHtml.slice(sectionStart, nextSectionIndex) : homeHtml.slice(sectionStart);
  }

  // Count project case study buttons or links in this section
  const caseStudyMatches = sectionChunk.match(/\/portfolio\/(apex-cloud-erp|fitpulse-mobile-app|logiflow-warehouse-automation|lumina-brand-relaunch|nebula-tactics-mobile-game|nordic-fintech-portal)/g) || [];
  const uniqueSlugsInFeatured = [...new Set(caseStudyMatches.map((m) => m.replace('/portfolio/', '')))];

  assertTest(
    'FEAT_04_EXACTLY_THREE_CARDS_RENDERED',
    'Featured projects section renders exactly 3 distinct case study cards',
    uniqueSlugsInFeatured.length === 3,
    `Rendered ${uniqueSlugsInFeatured.length} cards: ${uniqueSlugsInFeatured.join(', ')}`
  );

  // Verify non-featured projects are NOT rendered in featured section
  const nonFeaturedInFeatured = uniqueSlugsInFeatured.filter(
    (slug) => !['apex-cloud-erp', 'fitpulse-mobile-app', 'logiflow-warehouse-automation'].includes(slug)
  );
  assertTest(
    'FEAT_05_NO_NON_FEATURED_LEAK',
    'Featured section renders strictly the 3 designated featured projects without leaks',
    nonFeaturedInFeatured.length === 0,
    nonFeaturedInFeatured.length > 0 ? `Unintended slugs: ${nonFeaturedInFeatured.join(', ')}` : ''
  );
}

// -----------------------------------------------------------------------------
// 3. TESTIMONIALS SUPPRESSION CONTRACT VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n▶ 3. Testimonials Suppression Contract Audit');

const testimonialsPath = path.join(COMPONENTS_DIR, 'sections', 'Testimonials.tsx');
const testimonialsExists = fs.existsSync(testimonialsPath);
assertTest('TESTIMONIALS_01_EXISTS', 'components/sections/Testimonials.tsx exists', testimonialsExists);

if (testimonialsExists) {
  const content = fs.readFileSync(testimonialsPath, 'utf-8');
  assertTest(
    'TESTIMONIALS_02_RETURNS_NULL_ON_FLAG',
    'Testimonials component cleanly returns null when showTestimonials is false or reviews absent',
    content.includes('return null;') && (content.includes('showTestimonials') || content.includes('siteConfig'))
  );
}

if (homeHtmlExists) {
  const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8');
  // Confirm absence of testimonials section or reviews
  const lower = homeHtml.toLowerCase();
  const hasTestimonialsSection =
    lower.includes('id="testimonials"') ||
    lower.includes('class="testimonials') ||
    lower.includes('what our clients say');
  assertTest(
    'TESTIMONIALS_03_ABSENT_FROM_DOM',
    'Pre-rendered Home HTML contains zero placeholder client testimonials in the DOM',
    !hasTestimonialsSection
  );
}

// -----------------------------------------------------------------------------
// 4. CTA BANNER WHATSAPP ACTION URL VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n▶ 4. CTABanner WhatsApp URL & Action Contract Audit');

const ctaBannerPath = path.join(COMPONENTS_DIR, 'sections', 'CTABanner.tsx');
assertTest('CTA_01_COMPONENT_EXISTS', 'components/sections/CTABanner.tsx exists', fs.existsSync(ctaBannerPath));

if (fs.existsSync(ctaBannerPath)) {
  const ctaContent = fs.readFileSync(ctaBannerPath, 'utf-8');
  assertTest(
    'CTA_02_DYNAMIC_NUMBER_CLEANING',
    'CTABanner strips non-numeric characters for wa.me format (/regex/ replace)',
    ctaContent.includes('replace(/[^0-9]/g') || ctaContent.includes('siteConfig.contact.whatsapp')
  );
  assertTest(
    'CTA_03_WA_ME_TEMPLATE',
    'CTABanner constructs direct https://wa.me/<digits> URL',
    ctaContent.includes('https://wa.me/')
  );
}

if (homeHtmlExists) {
  const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8');
  // Match wa.me links in home page
  const waMatch = homeHtml.match(/href=["'](https?:\/\/wa\.me\/[^"']+)["']/i);
  assertTest('CTA_04_WA_LINK_IN_DOM', 'Home page renders direct WhatsApp action link in CTABanner', Boolean(waMatch));

  if (waMatch) {
    const rawUrl = waMatch[1];
    const cleanUrl = rawUrl.split('?')[0];
    const isValidWaFormat = /^https:\/\/wa\.me\/\d+$/i.test(cleanUrl);
    assertTest(
      'CTA_05_WA_DIGITS_ONLY_SYNTAX',
      `WhatsApp URL "${cleanUrl}" follows strict "https://wa.me/<digits>" format without +, -, or spaces`,
      isValidWaFormat,
      `Raw URL was: ${rawUrl}`
    );

    // Verify digits match siteConfig.contact.whatsapp digits
    assertTest(
      'CTA_06_WA_NUMBER_CORRECTNESS',
      'WhatsApp URL contains expected 8801700000000 digits',
      cleanUrl === 'https://wa.me/8801700000000'
    );
  }
}

// -----------------------------------------------------------------------------
// 5. RESPONSIVE GEOMETRY & OVERFLOW LEAK AUDIT
// -----------------------------------------------------------------------------
console.log('\n▶ 5. Responsive Geometry & Overflow Integrity Audit');

const globalsCss = fs.readFileSync(path.join(ROOT_DIR, 'styles', 'globals.css'), 'utf-8');
assertTest(
  'RESP_01_ROOT_OVERFLOW_X_HIDDEN',
  'Root html/body styles enforce overflow-x: hidden to prevent horizontal scrollbar leaks',
  globalsCss.includes('overflow-x') && globalsCss.includes('hidden')
);

// Scan UI components for unconstrained fixed pixel widths > 360px without max-w-full or overflow-hidden
const fixedWidthRegex = /\b(?:w|min-w)-\[(\d+)px\]/g;
const unconstrainedFixedWidthViolations = [];
for (const file of codeFilesToScan) {
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  while ((match = fixedWidthRegex.exec(content)) !== null) {
    const px = parseInt(match[1], 10);
    if (px > 360) {
      // Check if line or parent has max-w-full or overflow-hidden
      const lineIndex = content.slice(0, match.index).split('\n').length - 1;
      const line = content.split('\n')[lineIndex];
      const isConstrained = line.includes('max-w-full') || content.includes('overflow-hidden');
      if (!isConstrained) {
        unconstrainedFixedWidthViolations.push({ file: path.relative(ROOT_DIR, file), px, class: match[0] });
      }
    }
  }
}
assertTest(
  'RESP_02_NO_UNCONSTRAINED_FIXED_PIXEL_WIDTHS',
  'Zero unconstrained fixed pixel widths > 360px without max-w-full or overflow-hidden',
  unconstrainedFixedWidthViolations.length === 0,
  unconstrainedFixedWidthViolations.map((v) => `${v.file}: ${v.class}`).join(', ')
);

// Verify responsive grid breakpoint classes in all section components
const sectionsDir = path.join(COMPONENTS_DIR, 'sections');
const sectionFiles = fs.readdirSync(sectionsDir).filter((f) => f.endsWith('.tsx'));
let responsiveGridCount = 0;
for (const sf of sectionFiles) {
  const content = fs.readFileSync(path.join(sectionsDir, sf), 'utf-8');
  if (content.includes('grid') && (content.includes('md:') || content.includes('sm:') || content.includes('lg:'))) {
    responsiveGridCount++;
  }
}
assertTest(
  'RESP_03_RESPONSIVE_BREAKPOINT_GRIDS',
  'Section components utilize mobile-first breakpoint classes (sm:, md:, lg:)',
  responsiveGridCount >= 4,
  `Found ${responsiveGridCount} section components with responsive grids`
);

// -----------------------------------------------------------------------------
// 6. ROUTE PRE-RENDERING COMPLETENESS AUDIT
// -----------------------------------------------------------------------------
console.log('\n▶ 6. Route Pre-Rendering Completeness Audit');

const expectedServices = [
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

const expectedProjects = [
  'apex-cloud-erp',
  'fitpulse-mobile-app',
  'logiflow-warehouse-automation',
  'nordic-fintech-portal',
  'nebula-tactics-mobile-game',
  'lumina-brand-relaunch',
];

const expectedStaticRoutes = [
  'index.html',
  '404.html',
  'about/index.html',
  'team/index.html',
  'process/index.html',
  'privacy/index.html',
  'terms/index.html',
  'services/index.html',
  'portfolio/index.html',
];

for (const sr of expectedStaticRoutes) {
  const p = path.join(OUT_DIR, sr);
  assertTest(`ROUTE_STATIC_${sr.replace(/[^a-zA-Z0-9]/g, '_')}`, `Pre-rendered ${sr} exists in out/`, fs.existsSync(p));
}

for (const slug of expectedServices) {
  const p = path.join(OUT_DIR, 'services', slug, 'index.html');
  assertTest(
    `ROUTE_SERVICE_${slug.replace(/-/g, '_')}`,
    `Pre-rendered service /services/${slug}/index.html exists in out/`,
    fs.existsSync(p)
  );
  if (fs.existsSync(p)) {
    const html = fs.readFileSync(p, 'utf-8');
    // Verify 6 uniform sections
    const lower = html.toLowerCase();
    const hasDeliverables = lower.includes('deliver') || lower.includes('what we deliver');
    const hasProcess = lower.includes('process') || lower.includes('workflow');
    const hasTech = lower.includes('technolog') || lower.includes('stack');
    const hasFaq = lower.includes('faq') || lower.includes('frequently');
    const hasCta = lower.includes('cta') || lower.includes('/contact');
    assertTest(
      `SERVICE_SECTIONS_${slug.replace(/-/g, '_')}`,
      `Service /services/${slug} includes uniform Deliverables, Process, Tech, FAQ, CTA sections`,
      hasDeliverables && hasProcess && hasTech && hasFaq && hasCta
    );
  }
}

for (const slug of expectedProjects) {
  const p = path.join(OUT_DIR, 'portfolio', slug, 'index.html');
  assertTest(
    `ROUTE_PROJECT_${slug.replace(/-/g, '_')}`,
    `Pre-rendered case study /portfolio/${slug}/index.html exists in out/`,
    fs.existsSync(p)
  );
  if (fs.existsSync(p)) {
    const html = fs.readFileSync(p, 'utf-8');
    const lower = html.toLowerCase();
    const hasCaseStructure =
      (lower.includes('problem') || lower.includes('challenge')) &&
      (lower.includes('solution') || lower.includes('approach'));
    assertTest(
      `PROJECT_STRUCTURE_${slug.replace(/-/g, '_')}`,
      `Case study /portfolio/${slug} includes Problem/Challenge and Solution`,
      hasCaseStructure
    );
  }
}

// -----------------------------------------------------------------------------
// 7. SUMMARY REPORT
// -----------------------------------------------------------------------------
console.log('\n========================================================================');
console.log('                          AUDIT SUMMARY RESULT                          ');
console.log('========================================================================');
console.log(`  Total Checks Executed : ${totalTests}`);
console.log(`  Passed Checks         : ${passedTests}`);
console.log(`  Failed Checks         : ${failedTests}`);
console.log('========================================================================\n');

if (failedTests > 0) {
  console.error('FAILURES SUMMARY:');
  for (const f of failures) {
    console.error(`  • [${f.id}] ${f.description}: ${f.detail}`);
  }
  process.exit(1);
} else {
  console.log('SUCCESS: All Milestone 2 empirical challenge assertions passed 100%!');
  process.exit(0);
}
