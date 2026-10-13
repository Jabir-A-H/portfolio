#!/usr/bin/env node

/**
 * E2E Master Test Runner
 * Marketing Agency Site Skeleton (Tiers 1 - 4)
 * Command: node tests/e2e/runner.mjs
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { OUT_DIR, exists } from './helpers.mjs';
import { tier1Tests } from './tier1-features.mjs';
import { tier2Tests } from './tier2-boundaries.mjs';
import { tier3Tests } from './tier3-interactions.mjs';
import { tier4Tests } from './tier4-scenarios.mjs';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
};

// Parse CLI flags
const args = process.argv.slice(2);
let selectedTier = null;
let customBaseDir = OUT_DIR;
let listOnly = false;

for (const arg of args) {
  if (arg.startsWith('--tier=') || arg.startsWith('-t=')) {
    selectedTier = parseInt(arg.split('=')[1], 10);
  } else if (arg === '-t' && args[args.indexOf(arg) + 1]) {
    selectedTier = parseInt(args[args.indexOf(arg) + 1], 10);
  } else if (arg.startsWith('--base-dir=')) {
    customBaseDir = path.resolve(arg.split('=')[1]);
  } else if (arg === '--list') {
    listOnly = true;
  } else if (arg === '--help' || arg === '-h') {
    printHelp();
    process.exit(0);
  }
}

function printHelp() {
  console.log(`
${colors.bright}Marketing Agency Site Skeleton E2E Test Runner${colors.reset}

${colors.cyan}Usage:${colors.reset}
  node tests/e2e/runner.mjs [options]

${colors.cyan}Options:${colors.reset}
  --tier=<1|2|3|4>    Execute only the specified tier
  --base-dir=<path>   Override static export directory (default: out/)
  --list              List all available test suites and cases
  --help, -h          Show this help message

${colors.cyan}Tiers:${colors.reset}
  Tier 1: Feature Coverage (${tier1Tests.length} tests)
  Tier 2: Boundary & Corner Cases (${tier2Tests.length} tests)
  Tier 3: Cross-Feature Interactions (${tier3Tests.length} tests)
  Tier 4: Real-World Scenarios (${tier4Tests.length} tests)
`);
}

const allTiers = [
  { tierNumber: 1, name: 'Tier 1: Feature Coverage', tests: tier1Tests },
  { tierNumber: 2, name: 'Tier 2: Boundary & Corner Cases', tests: tier2Tests },
  { tierNumber: 3, name: 'Tier 3: Cross-Feature Interactions', tests: tier3Tests },
  { tierNumber: 4, name: 'Tier 4: Real-World Scenarios', tests: tier4Tests },
];

if (listOnly) {
  console.log(`\n${colors.bright}Discovered E2E Tests Inventory:${colors.reset}\n`);
  for (const tier of allTiers) {
    console.log(`${colors.cyan}${tier.name} (${tier.tests.length} tests)${colors.reset}`);
    for (const test of tier.tests) {
      console.log(`  ${colors.yellow}${test.id}${colors.reset}: ${test.description}`);
    }
    console.log('');
  }
  process.exit(0);
}

async function runSuite() {
  const startTime = Date.now();
  console.log(`\n${colors.bright}========================================================================${colors.reset}`);
  console.log(`${colors.bright}          MARKETING AGENCY SITE SKELETON - E2E TEST SUITE${colors.reset}`);
  console.log(`${colors.bright}========================================================================${colors.reset}`);
  console.log(`${colors.gray}Target Directory : ${customBaseDir}${colors.reset}`);
  console.log(`${colors.gray}Output Directory Exists: ${exists(customBaseDir) ? `${colors.green}YES${colors.gray}` : `${colors.red}NO (Run "npm run build" first)${colors.gray}`}${colors.reset}`);
  if (selectedTier) {
    console.log(`${colors.yellow}Filter           : Tier ${selectedTier} only${colors.reset}`);
  }
  console.log(`${colors.bright}========================================================================${colors.reset}\n`);

  const activeTiers = selectedTier
    ? allTiers.filter((t) => t.tierNumber === selectedTier)
    : allTiers;

  let totalPassed = 0;
  let totalFailed = 0;
  const failureDetails = [];
  const tierSummaries = [];

  for (const tier of activeTiers) {
    console.log(`${colors.bright}${colors.cyan}▶ Running ${tier.name} [${tier.tests.length} tests]${colors.reset}`);
    let tierPassed = 0;
    let tierFailed = 0;

    for (const test of tier.tests) {
      try {
        await test.run(customBaseDir);
        console.log(`  ${colors.green}✓ PASS${colors.reset} ${colors.bright}${test.id}${colors.reset}: ${colors.dim}${test.description}${colors.reset}`);
        tierPassed++;
        totalPassed++;
      } catch (err) {
        console.log(`  ${colors.red}✗ FAIL${colors.reset} ${colors.bright}${test.id}${colors.reset}: ${test.description}`);
        console.log(`         ${colors.red}Error: ${err.message}${colors.reset}`);
        tierFailed++;
        totalFailed++;
        failureDetails.push({
          tier: tier.name,
          testId: test.id,
          description: test.description,
          error: err.message,
        });
      }
    }

    tierSummaries.push({
      name: tier.name,
      passed: tierPassed,
      failed: tierFailed,
      total: tier.tests.length,
    });
    console.log('');
  }

  const duration = Date.now() - startTime;

  // Print Summary Table
  console.log(`${colors.bright}========================================================================${colors.reset}`);
  console.log(`${colors.bright}                           TEST SUITE SUMMARY${colors.reset}`);
  console.log(`${colors.bright}========================================================================${colors.reset}`);
  for (const sum of tierSummaries) {
    const statusColor = sum.failed === 0 ? colors.green : colors.red;
    console.log(
      `  ${sum.name.padEnd(38)} : ${statusColor}${sum.passed}/${sum.total} passed${colors.reset} ${sum.failed > 0 ? `(${colors.red}${sum.failed} failed${colors.reset})` : ''}`
    );
  }
  console.log(`${colors.bright}------------------------------------------------------------------------${colors.reset}`);
  const overallColor = totalFailed === 0 ? colors.green : colors.red;
  console.log(
    `  ${colors.bright}TOTAL RESULT${colors.reset.padEnd(28)} : ${overallColor}${totalPassed}/${totalPassed + totalFailed} passed (${totalFailed} failed)${colors.reset}`
  );
  console.log(`  ${colors.gray}Execution Duration                     : ${duration}ms${colors.reset}`);
  console.log(`${colors.bright}========================================================================${colors.reset}\n`);

  if (failureDetails.length > 0) {
    console.log(`${colors.red}${colors.bright}FAILURES & DIAGNOSTICS:${colors.reset}`);
    for (const f of failureDetails) {
      console.log(`  ${colors.red}• [${f.testId}]${colors.reset} ${f.description}`);
      console.log(`    ${colors.yellow}Reason:${colors.reset} ${f.error}\n`);
    }
    process.exit(1);
  } else {
    console.log(`${colors.green}${colors.bright}✔ ALL TESTS PASSED SUCCESSFULLY!${colors.reset}\n`);
    process.exit(0);
  }
}

runSuite().catch((err) => {
  console.error(`\n${colors.red}Fatal Runner Exception:${colors.reset}`, err);
  process.exit(1);
});
