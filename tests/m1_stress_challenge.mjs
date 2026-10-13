import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const OUT_DIR = path.join(ROOT_DIR, 'out');

let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedTests++;
    failures.push({ testName, details });
    console.error(`  [FAIL] ${testName}: ${details}`);
  }
}

console.log('=== Milestone 1 Empirical Stress Harness ===\n');

// 1. Verify out/ exists and core files
console.log('--- 1. Filesystem & Export File Existence ---');
assert(fs.existsSync(OUT_DIR), 'out directory exists');
const indexHtmlPath = path.join(OUT_DIR, 'index.html');
assert(fs.existsSync(indexHtmlPath), 'out/index.html exists');

const notFoundHtmlPath = path.join(OUT_DIR, '404.html');
assert(fs.existsSync(notFoundHtmlPath), 'out/404.html exists');

const notFoundDirPath = path.join(OUT_DIR, '404', 'index.html');
assert(fs.existsSync(notFoundDirPath), 'out/404/index.html exists (trailingSlash consistency)');

const logoSvgPath = path.join(OUT_DIR, 'logo', 'placeholder.svg');
assert(fs.existsSync(logoSvgPath), 'out/logo/placeholder.svg exists');

// 2. HTML Pre-rendering & Anti-FOUC
console.log('\n--- 2. Static HTML Pre-Rendering & Anti-FOUC ---');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

assert(indexHtml.startsWith('<!DOCTYPE html>'), 'out/index.html starts with <!DOCTYPE html>');
assert(indexHtml.includes('<html lang="en"'), 'out/index.html has <html lang="en"');
assert(indexHtml.includes('suppressHydrationWarning'), 'out/index.html has suppressHydrationWarning');
assert(indexHtml.includes('id="theme-initializer"'), 'out/index.html has theme-initializer script');

// Anti-FOUC position and logic
const themeScriptIndex = indexHtml.indexOf('id="theme-initializer"');
const bodyIndex = indexHtml.indexOf('<body');
assert(themeScriptIndex > -1 && themeScriptIndex < bodyIndex, 'Anti-FOUC script is placed in <head> BEFORE <body>');

assert(indexHtml.includes('localStorage.getItem(\'theme\')'), 'Anti-FOUC script checks localStorage.getItem("theme")');
assert(indexHtml.includes('window.matchMedia(\'(prefers-color-scheme: dark)\')'), 'Anti-FOUC script checks system dark mode preference');
assert(indexHtml.includes("document.documentElement.classList.add('dark')"), 'Anti-FOUC script applies .dark class synchronously');
assert(indexHtml.includes('try {') && indexHtml.includes('} catch (e) {}'), 'Anti-FOUC script wraps access in try/catch for sandbox resilience');

// Static content pre-rendered in HTML
console.log('\n--- 3. Pre-Rendered DOM Content Verification ---');
assert(indexHtml.includes('[PLACEHOLDER] Apex Digital'), 'Pre-rendered brand name exists');
assert(indexHtml.includes('Engineering High-Performance Digital Products &amp; Scalable Systems') ||
       indexHtml.includes('Engineering High-Performance Digital Products & Scalable Systems'),
       'Pre-rendered tagline exists in HTML');
assert(indexHtml.includes('Full-service digital engineering and creative studio'), 'Pre-rendered description exists in HTML');
assert(indexHtml.includes('Start a Project') && indexHtml.includes('View Our Work'), 'Hero action CTA buttons pre-rendered');
assert(indexHtml.includes('Services') && indexHtml.includes('Portfolio') && indexHtml.includes('Contact'), 'Main navigation links pre-rendered');
assert(indexHtml.includes('hello@example.com'), 'Pre-rendered contact email exists in HTML');
assert(indexHtml.includes('+880 1700-000000'), 'Pre-rendered contact phone exists in HTML');
assert(indexHtml.includes('https://wa.me/8801700000000'), 'Pre-rendered WhatsApp link exists and properly formatted');
assert(indexHtml.includes('https://github.com/example'), 'Pre-rendered social link (GitHub) exists');
assert(indexHtml.includes('https://linkedin.com/company/example'), 'Pre-rendered social link (LinkedIn) exists');
assert(indexHtml.includes('https://twitter.com/example'), 'Pre-rendered social link (Twitter) exists');
assert(indexHtml.includes('https://facebook.com/example'), 'Pre-rendered social link (Facebook) exists');

// Check no unhandled SSR error traces
assert(!indexHtml.includes('Application error: a client-side exception has occurred'), 'No client-side runtime exception banner in static HTML');
assert(!indexHtml.includes('Uncaught Error'), 'No uncaught error trace in static HTML');

// 4. Asset Links Integrity (CSS & JS bundles)
console.log('\n--- 4. Static Asset Links & Bundle Integrity ---');
const cssMatches = [...indexHtml.matchAll(/href="(\/_next\/static\/css\/[^"]+\.css)"/g)];
assert(cssMatches.length > 0, `Found ${cssMatches.length} stylesheet(s) linked in HTML`);
for (const match of cssMatches) {
  const cssRelPath = match[1].replace(/^\//, '');
  const cssFullPath = path.join(OUT_DIR, cssRelPath);
  const exists = fs.existsSync(cssFullPath);
  const size = exists ? fs.statSync(cssFullPath).size : 0;
  assert(exists && size > 0, `Linked stylesheet exists on disk and is non-empty: ${cssRelPath} (${size} bytes)`);
}

const jsMatches = [...indexHtml.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g)];
assert(jsMatches.length > 0, `Found ${jsMatches.length} JS chunk(s) linked in HTML`);
let allJsExist = true;
for (const match of jsMatches) {
  const jsRelPath = match[1].replace(/^\//, '');
  const jsFullPath = path.join(OUT_DIR, jsRelPath);
  if (!fs.existsSync(jsFullPath)) {
    allJsExist = false;
    assert(false, `Linked script missing on disk: ${jsRelPath}`);
  }
}
if (allJsExist) {
  assert(true, `All ${jsMatches.length} linked JavaScript chunks exist on disk`);
}

// 5. Brand String Leak Stress Test (outside content/)
console.log('\n--- 5. Brand String Isolation Stress Test ---');
function scanDir(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== 'out' && entry.name !== '.git' && entry.name !== '.agents') {
        scanDir(fullPath, fileList);
      }
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const filesToAudit = scanDir(path.join(ROOT_DIR, 'app')).concat(scanDir(path.join(ROOT_DIR, 'components')));
const forbiddenLiterals = ['Apex Digital', 'hello@example.com', '1700-000000'];
let leakFound = false;

for (const file of filesToAudit) {
  const content = fs.readFileSync(file, 'utf8');
  for (const lit of forbiddenLiterals) {
    if (content.includes(lit)) {
      leakFound = true;
      assert(false, `Brand leak in ${path.relative(ROOT_DIR, file)}: contains "${lit}"`);
    }
  }
}
if (!leakFound) {
  assert(true, `Zero hardcoded brand strings detected across ${filesToAudit.length} source files in app/ and components/`);
}

// 6. 404 Error Page Pre-rendering
console.log('\n--- 6. Custom 404 Error Page Pre-Rendering ---');
const notFoundHtml = fs.readFileSync(notFoundHtmlPath, 'utf8');
assert(notFoundHtml.startsWith('<!DOCTYPE html>'), 'out/404.html starts with <!DOCTYPE html>');
assert(notFoundHtml.includes('id="theme-initializer"'), 'out/404.html includes anti-FOUC script');
assert(notFoundHtml.includes('404'), 'out/404.html includes 404 text');
assert(notFoundHtml.includes('This page could not be found.'), 'out/404.html includes standard not-found notice');
assert(notFoundHtml.includes('<header') && notFoundHtml.includes('<footer'), 'out/404.html preserves root layout (Navbar & Footer)');

// Summary
console.log('\n=============================================');
console.log(`TOTAL PASSED: ${passedTests}`);
console.log(`TOTAL FAILED: ${failedTests}`);
console.log('=============================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
