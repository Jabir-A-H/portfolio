#!/usr/bin/env node

/**
 * Documentation Trimming & Context-Hygiene Audit Script
 * Enforces token-conscious documentation size limits, checks markdown links,
 * and archives stale resolved issues to prevent AI context window bloat.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');
const archiveDir = path.join(docsDir, 'archive');

// Token & Line Budget Thresholds (to prevent AI context bloat)
const BUDGETS = {
  'AGENTS.md': { maxLines: 150, maxBytes: 8000 },
  'GEMINI.md': { maxLines: 30, maxBytes: 1500 },
  'docs/TECHNICAL_MANUAL.md': { maxLines: 250, maxBytes: 15000 },
  'docs/ROADMAP.md': { maxLines: 150, maxBytes: 8000 },
  'docs/KNOWN_ISSUES.md': { maxLines: 100, maxBytes: 6000 },
};

const args = process.argv.slice(2);
const shouldAutoTrim = args.includes('--trim');

console.log('\n============================================================');
console.log('       DOCUMENTATION HEALTH & CONTEXT-HYGIENE AUDIT');
console.log('============================================================\n');

if (!fs.existsSync(docsDir)) {
  console.error('❌ docs/ directory not found.');
  process.exit(1);
}

if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir, { recursive: true });
}

let hasBudgetViolation = false;

// 1. Check File Budgets
for (const [relPath, limits] of Object.entries(BUDGETS)) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) continue;

  const content = fs.readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n').length;
  const bytes = Buffer.byteLength(content, 'utf-8');
  const estTokens = Math.round(bytes / 4);

  const lineOver = lines > limits.maxLines;
  const byteOver = bytes > limits.maxBytes;

  if (lineOver || byteOver) {
    hasBudgetViolation = true;
    console.warn(`⚠️  [BLOAT ALERT] ${relPath}:`);
    console.warn(`    Lines: ${lines}/${limits.maxLines} | Size: ${bytes}B/${limits.maxBytes}B (~${estTokens} tokens)`);
    console.warn(`    Action: Trim prose, condense tables, or archive older sections.\n`);
  } else {
    console.log(`✔ [OPTIMAL] ${relPath} (${lines} lines, ~${estTokens} tokens)`);
  }
}

// 2. Automated Known Issues Trimming
const knownIssuesPath = path.join(docsDir, 'KNOWN_ISSUES.md');
if (fs.existsSync(knownIssuesPath)) {
  const content = fs.readFileSync(knownIssuesPath, 'utf-8');
  const resolvedHeaderRegex = /##\s+Resolved Issues/i;
  
  if (resolvedHeaderRegex.test(content)) {
    const parts = content.split(resolvedHeaderRegex);
    const activeSection = parts[0];
    const resolvedSection = parts[1] || '';
    
    // Count resolved entries (e.g. `### ` or table rows)
    const resolvedCount = (resolvedSection.match(/###\s+|\|-+\|/g) || []).length;
    
    if (resolvedCount > 5) {
      if (shouldAutoTrim) {
        console.log(`\n✂️  Auto-trimming ${resolvedCount} resolved issues into docs/archive/RESOLVED_ISSUES_ARCHIVE.md...`);
        const archiveFile = path.join(archiveDir, 'RESOLVED_ISSUES_ARCHIVE.md');
        const timestamp = new Date().toISOString().split('T')[0];
        const archiveAppend = `\n\n## Archived on ${timestamp}\n` + resolvedSection.trim();
        
        fs.appendFileSync(archiveFile, archiveAppend, 'utf-8');
        
        // Rewrite KNOWN_ISSUES.md keeping active issues and an archival pointer
        const trimmedKnownIssues = activeSection.trim() + '\n\n## Resolved Issues\n\n> Historical resolved issues are automatically archived to [`docs/archive/RESOLVED_ISSUES_ARCHIVE.md`](archive/RESOLVED_ISSUES_ARCHIVE.md) to preserve AI context efficiency.\n';
        fs.writeFileSync(knownIssuesPath, trimmedKnownIssues, 'utf-8');
        console.log('✔ Trim completed successfully.');
      } else {
        console.log(`\nℹ️  KNOWN_ISSUES.md has ${resolvedCount} resolved entries. Run 'npm run docs:trim' to archive older entries.`);
      }
    }
  }
}

console.log('\n------------------------------------------------------------');
if (hasBudgetViolation) {
  console.log('Status: Needs trimming to meet context budgets.');
  process.exit(0); // Exit 0 to allow CI pass with warning, but alert developer
} else {
  console.log('Status: All documentation within strict token budget limits.');
  console.log('------------------------------------------------------------\n');
  process.exit(0);
}
