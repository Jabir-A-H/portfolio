import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const STYLES_DIR = path.join(ROOT_DIR, 'styles');
const OUT_DIR = path.join(ROOT_DIR, 'out');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const findings = [];

function check(title, condition, detail = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`[PASS] ${title}`);
  } else {
    failedChecks++;
    findings.push({ title, detail });
    console.error(`[FAIL] ${title} => ${detail}`);
  }
}

console.log('================================================================');
console.log('  CHALLENGER DEEP AUDIT: BRAND ISOLATION & DESIGN TOKEN BINDING ');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// SECTION 1: Brand Isolation Scan across app/ and components/
// -----------------------------------------------------------------------------
console.log('>>> 1. AUDITING BRAND & CONTACT ISOLATION OUTSIDE content/site.ts');

function getCodeFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(getCodeFiles(fullPath));
    } else if (/\.(tsx|ts|jsx|js)$/.test(item.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

const uiFiles = [...getCodeFiles(APP_DIR), ...getCodeFiles(COMPONENTS_DIR)];
console.log(`Found ${uiFiles.length} UI files in app/ and components/.`);

// Extract exact brand and contact terms from content/site.ts
const siteContent = fs.readFileSync(path.join(CONTENT_DIR, 'site.ts'), 'utf-8');

const targetLiterals = [
  'Apex Digital',
  'Apex Digital Solutions Ltd',
  'apex-digital.placeholder.example',
  'hello@example.com',
  '+880 1700-000000',
  '8801700000000',
  '1700-000000',
  '123 Innovation Boulevard',
  'Tech Tower',
  'Dhaka, Bangladesh',
];

for (const lit of targetLiterals) {
  let matchedFiles = [];
  for (const file of uiFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes(lit)) {
      matchedFiles.push(path.relative(ROOT_DIR, file));
    }
  }
  check(
    `Zero instances of literal "${lit}" in UI files`,
    matchedFiles.length === 0,
    `Found in: ${matchedFiles.join(', ')}`
  );
}

// Regex leak check: Email addresses in UI code
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
let filesWithHardcodedEmails = [];
for (const file of uiFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  // Strip import statements and comments
  const stripped = content
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '');
  const matches = stripped.match(emailRegex);
  if (matches) {
    filesWithHardcodedEmails.push({ file: path.relative(ROOT_DIR, file), matches });
  }
}
check(
  'Zero hardcoded email addresses in UI code (outside comments)',
  filesWithHardcodedEmails.length === 0,
  `Detected in: ${JSON.stringify(filesWithHardcodedEmails)}`
);

// Regex leak check: Hardcoded WhatsApp wa.me links with hardcoded phone digits
let filesWithHardcodedWaNumber = [];
for (const file of uiFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  // wa.me followed by literal digits instead of variable
  if (/https:\/\/wa\.me\/\d{5,}/.test(content)) {
    filesWithHardcodedWaNumber.push(path.relative(ROOT_DIR, file));
  }
}
check(
  'Zero hardcoded wa.me links with static phone numbers in UI code',
  filesWithHardcodedWaNumber.length === 0,
  `Detected in: ${filesWithHardcodedWaNumber.join(', ')}`
);

// Check if Navbar and Footer import from @/content/site
const navbarContent = fs.readFileSync(path.join(COMPONENTS_DIR, 'layout', 'Navbar.tsx'), 'utf-8');
const footerContent = fs.readFileSync(path.join(COMPONENTS_DIR, 'layout', 'Footer.tsx'), 'utf-8');
const layoutContent = fs.readFileSync(path.join(APP_DIR, 'layout.tsx'), 'utf-8');

check(
  'Navbar imports and uses siteConfig from @/content/site',
  navbarContent.includes("from '@/content/site'") && navbarContent.includes('siteConfig.')
);
check(
  'Footer imports and uses siteConfig from @/content/site',
  footerContent.includes("from '@/content/site'") && footerContent.includes('siteConfig.')
);
check(
  'RootLayout imports and uses siteConfig from @/content/site',
  layoutContent.includes("from '@/content/site'") && layoutContent.includes('siteConfig.')
);


// -----------------------------------------------------------------------------
// SECTION 2: Mock Data Tagging in content/
// -----------------------------------------------------------------------------
console.log('\n>>> 2. AUDITING MOCK DATA TAGGING IN content/');

const contentFiles = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.ts'));

for (const file of contentFiles) {
  const fullPath = path.join(CONTENT_DIR, file);
  const code = fs.readFileSync(fullPath, 'utf-8');
  const todoCount = (code.match(/\/\/\s*TODO\(content\)/g) || []).length;
  const placeholderCount = (code.match(/\[PLACEHOLDER[^\]]*\]/g) || []).length;

  console.log(`  File: ${file} -> // TODO(content): ${todoCount}, [PLACEHOLDER]: ${placeholderCount}`);

  check(
    `content/${file} contains // TODO(content) tags`,
    todoCount > 0,
    `Count is ${todoCount}`
  );
  check(
    `content/${file} contains [PLACEHOLDER] tags`,
    placeholderCount > 0,
    `Count is ${placeholderCount}`
  );
}

// Deep check in content/services.ts
const servicesContent = fs.readFileSync(path.join(CONTENT_DIR, 'services.ts'), 'utf-8');
check(
  'content/services.ts defines all 9 required services',
  (servicesContent.match(/slug:\s*'/g) || []).length >= 9
);
check(
  'content/services.ts tags service descriptions or deliverables with TODO or PLACEHOLDER',
  servicesContent.includes('TODO(content)') || servicesContent.includes('[PLACEHOLDER]')
);

// Deep check in content/projects.ts
const projectsContent = fs.readFileSync(path.join(CONTENT_DIR, 'projects.ts'), 'utf-8');
check(
  'content/projects.ts tags case study titles with [PLACEHOLDER]',
  (projectsContent.match(/title:\s*['"`]\[PLACEHOLDER\]/g) || []).length >= 3
);
check(
  'content/projects.ts tags summaries with TODO(content)',
  projectsContent.includes('// TODO(content)')
);

// Deep check in content/team.ts
const teamContent = fs.readFileSync(path.join(CONTENT_DIR, 'team.ts'), 'utf-8');
check(
  'content/team.ts tags team member names with [PLACEHOLDER]',
  (teamContent.match(/name:\s*['"`]\[PLACEHOLDER\]/g) || []).length >= 3
);
check(
  'content/team.ts tags member bios with // TODO(content): [PLACEHOLDER]',
  teamContent.includes('// TODO(content): [PLACEHOLDER]')
);

// Deep check in content/process.ts
const processContent = fs.readFileSync(path.join(CONTENT_DIR, 'process.ts'), 'utf-8');
check(
  'content/process.ts tags step summaries with // TODO(content): [PLACEHOLDER]',
  (processContent.match(/\/\/\s*TODO\(content\):\s*\[PLACEHOLDER\]/g) || []).length >= 6
);


// -----------------------------------------------------------------------------
// SECTION 3: CSS Variable Tokens & Theming in styles/globals.css
// -----------------------------------------------------------------------------
console.log('\n>>> 3. AUDITING CSS VARIABLE TOKENS IN styles/globals.css');

const globalsCss = fs.readFileSync(path.join(STYLES_DIR, 'globals.css'), 'utf-8');

// Parse :root and .dark blocks
const rootBlockMatch = globalsCss.match(/:root\s*\{([^}]+)\}/);
const darkBlockMatch = globalsCss.match(/\.dark\s*\{([^}]+)\}/);

check(':root block exists in styles/globals.css', Boolean(rootBlockMatch));
check('.dark block exists in styles/globals.css', Boolean(darkBlockMatch));

const rootCss = rootBlockMatch ? rootBlockMatch[1] : '';
const darkCss = darkBlockMatch ? darkBlockMatch[1] : '';

const requiredTokens = [
  '--primary',
  '--accent',
  '--background',
  '--surface',
  '--foreground',
  '--muted',
  '--border',
];

for (const token of requiredTokens) {
  const tokenRegex = new RegExp(`${token}\\s*:\\s*([^;]+);`);
  const rootMatch = rootCss.match(tokenRegex);
  const darkMatch = darkCss.match(tokenRegex);

  check(
    `:root defines ${token}`,
    Boolean(rootMatch),
    rootMatch ? rootMatch[1].trim() : 'MISSING'
  );
  check(
    `.dark defines ${token}`,
    Boolean(darkMatch),
    darkMatch ? darkMatch[1].trim() : 'MISSING'
  );

  if (rootMatch && darkMatch) {
    const rootVal = rootMatch[1].trim();
    const darkVal = darkMatch[1].trim();
    check(
      `${token} has differentiated values between light and dark themes`,
      rootVal !== darkVal,
      `Light: ${rootVal} vs Dark: ${darkVal}`
    );
  }
}

// Check plan-01 text token requirement
check(
  ':root defines --text token (per plan-01)',
  /--text\s*:/.test(rootCss)
);
check(
  '.dark defines --text token (per plan-01)',
  /--text\s*:/.test(darkCss)
);

// Check tailwind.config.ts mappings
const tailwindConfig = fs.readFileSync(path.join(ROOT_DIR, 'tailwind.config.ts'), 'utf-8');
for (const tokenName of ['primary', 'accent', 'background', 'surface', 'foreground', 'muted', 'border']) {
  check(
    `tailwind.config.ts maps ${tokenName} to CSS variable var(--${tokenName})`,
    tailwindConfig.includes(`var(--${tokenName})`)
  );
}

// Check compiled CSS bundle in out/
if (fs.existsSync(OUT_DIR)) {
  const outCssFiles = [];
  function findCss(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) findCss(full);
      else if (e.name.endsWith('.css')) outCssFiles.push(full);
    }
  }
  findCss(OUT_DIR);
  check('Compiled CSS files exist in out/', outCssFiles.length > 0);
  if (outCssFiles.length > 0) {
    const compiledCss = fs.readFileSync(outCssFiles[0], 'utf-8');
    for (const token of requiredTokens) {
      check(
        `Compiled CSS contains token ${token}`,
        compiledCss.includes(token)
      );
    }
  }
}


// -----------------------------------------------------------------------------
// SECTION 4: Design Token Discipline & Hardcoded Color Audit
// -----------------------------------------------------------------------------
console.log('\n>>> 4. AUDITING DESIGN TOKEN USAGE DISCIPLINE IN UI COMPONENTS');

// Scan for arbitrary hardcoded hex color codes in UI components
let hexColorLeakedFiles = [];
for (const file of uiFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  // Match # followed by 3, 6, or 8 hex digits, excluding SVG paths or IDs
  const hexMatches = content.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
  // Filter out svg path d= strings or anything else that is not a color
  const actualColors = hexMatches.filter((h) => !/^#[0-9a-fA-F]{1,2}$/.test(h));
  if (actualColors.length > 0) {
    hexColorLeakedFiles.push({ file: path.relative(ROOT_DIR, file), actualColors });
  }
}
check(
  'Zero hardcoded hex color values in app/ and components/',
  hexColorLeakedFiles.length === 0,
  `Found: ${JSON.stringify(hexColorLeakedFiles)}`
);

// Check overflow leak protection in styles/globals.css
check(
  'styles/globals.css enforces overflow-x: hidden on html and body',
  globalsCss.includes('overflow-x: hidden')
);
check(
  'styles/globals.css enforces max-width: 100vw',
  globalsCss.includes('max-width: 100vw')
);
check(
  'styles/globals.css enforces box-sizing: border-box',
  globalsCss.includes('box-sizing: border-box')
);
check(
  'styles/globals.css enforces overflow-wrap: break-word',
  globalsCss.includes('overflow-wrap: break-word')
);


// -----------------------------------------------------------------------------
// SUMMARY & VERDICT
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL AUDIT CHECKS: ${totalChecks}`);
console.log(`PASSED: ${passedChecks}`);
console.log(`FAILED: ${failedChecks}`);
console.log('================================================================\n');

if (failedChecks > 0) {
  console.error('VERDICT: REJECT');
  console.error('Findings summary:', JSON.stringify(findings, null, 2));
  process.exit(1);
} else {
  console.log('VERDICT: APPROVE');
  process.exit(0);
}
