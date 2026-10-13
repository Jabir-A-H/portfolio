#!/usr/bin/env node

/**
 * Zero Hardcoded Brand Strings Verification Script
 * Scans all source code in app/ and components/ to ensure zero brand/contact
 * strings are hardcoded outside the single source of truth in content/site.ts.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SCAN_DIRS = [
  path.join(rootDir, 'app'),
  path.join(rootDir, 'components'),
];

// Target brand identifiers that must NOT appear hardcoded in UI or routes
const FORBIDDEN_STRINGS = [
  'Apex Digital',
  'hello@example.com',
  '+880 1700-000000',
  '8801700000000',
  'Tech Tower',
  'Innovation Boulevard',
];

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs']);

function getFilesRecursively(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== 'out') {
        files.push(...getFilesRecursively(fullPath));
      }
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

console.log('\n============================================================');
console.log('       ZERO HARDCODED BRAND VALUES VERIFICATION GATE');
console.log('============================================================\n');

const filesToScan = SCAN_DIRS.flatMap(getFilesRecursively);
console.log(`Scanning ${filesToScan.length} files across app/ and components/...\n`);

const violations = [];

for (const filePath of filesToScan) {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Skip pure comment lines or import statements
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('import ')
    ) {
      return;
    }

    for (const forbidden of FORBIDDEN_STRINGS) {
      if (line.includes(forbidden)) {
        violations.push({
          file: relPath,
          line: index + 1,
          term: forbidden,
          snippet: trimmed,
        });
      }
    }
  });
}

if (violations.length > 0) {
  console.error(`❌ VIOLATIONS FOUND: ${violations.length} hardcoded brand string(s) detected outside content/site.ts:\n`);
  for (const v of violations) {
    console.error(`  [VIOLATION] ${v.file}:${v.line}`);
    console.error(`    Forbidden identifier: "${v.term}"`);
    console.error(`    Snippet: ${v.snippet}\n`);
  }
  console.error('All brand and contact values must be imported from "@/content/site".\n');
  process.exit(1);
}

console.log('✔ Verification passed: Zero hardcoded brand/contact strings found in app/ and components/!\n');
process.exit(0);
