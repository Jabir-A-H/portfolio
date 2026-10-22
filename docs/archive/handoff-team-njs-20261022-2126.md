# Handoff — Team NJS portfolio (session continuation)

**Repo:** `D:\WebDev\portfolio`  
**Date:** 2026-10-22 21:26 (Asia/Dhaka)  
**Branch:** `main`  
**Last commit:** `b2336a0 fix(design): restore the ADR-006 design DNA`  
**Working tree:** dirty. The current dependency, docs, and content changes are **not committed**. Do not assume `HEAD` contains them.

---

## 1. Read these first

1. `AGENTS.md` — principles, docs hierarchy, new architecture-review protocol (Principle 4), no-commit rule.
2. `README.md` — current stack, routes, commands, layout.
3. `PROJECT.md` — current architecture, design system, interfaces, component inventory.
4. `docs/TECHNICAL_MANUAL.md` — tokens, composition primitives, dependency policy, gates.
5. `docs/CONTENT_DECISIONS.md` — live content-decision log; untracked.
6. `docs/KNOWN_ISSUES.md` — active issues `KI-001` through `KI-012`.
7. `docs/ADR/006-visual-identity-pivot.md` and `docs/ADR/007-editorial-reset.md` — design authority. ADR-006 owns palette/type/geometry/rhythm/motion; ADR-007 owns composition only.
8. `docs/handoff.md` — repo-level current state; this file is the session-specific continuation.

Do not re-litigate ADR-006 or ADR-007. If a refactor conflicts, surface the concrete friction and ask before reopening.

---

## 2. Where the work stopped

The user asked for an architecture review and deferred the content question **Q3 (primary buyer)** until after that review.

State:

- Design identity is settled: Warm Gallery / Cold Studio, International Orange `#FF4F00`, Cormorant + Space Mono + Inter, The Gallerist spacing, 2px micro-radius, hard offset shadows, borderless home rows, `Reveal` motion, no availability indicator.
- Content phase started, not finished:
  - **Q1 brand name:** provisional **“Team NJS”** (standard capitalization). Final brand name and legal entity are **undecided**. Flagged in `KI-006` and `docs/CONTENT_DECISIONS.md`.
  - **Q2 positioning:** all three answers are in use, one main and two supporting:
    - Main hero: “We build digital products that *outlast* their launch.”
    - Positioning/description + About lede: “An independent studio in Dhaka designing and building web platforms, mobile products, and the systems behind them.”
    - Supporting hero subheadline: “A small studio for teams who care how things are made…”
  - **Q3 primary buyer:** **deferred by the user**. Do not ask again until the architecture decision is handled or the user reopens content.
- Architecture review generated. The user has **not chosen a candidate**. This is the immediate open decision.

### Architecture report

Path (temp, not in repo):

`C:\Users\ONE\AppData\Local\Temp\architecture-review-20261022-2120.html`

If the temp file is gone, rebuild it from the repo state or rerun the architecture-review workflow. Do not treat the report as a spec; it is a decision menu.

Six candidates, in report order:

1. **Content query module** — Strong. Top recommendation. Pages filter raw arrays; `getServicesByGroup`, `getAllServiceGroups`, `getServiceGroupById`, `getAllServices` exist but are unused.
2. **Project index row** — Strong. `WorkIndex` and `PortfolioFilterGrid` duplicate row grammar and `shortCategory`.
3. **Page metadata factory** — Strong. Eleven hand-built metadata blocks; brand/domain still changing.
4. **Contact intake** — Strong. `ContactForm.tsx` is ~390 lines combining validation, payload, status, options, and UI.
5. **Route manifest** — Worth exploring. Slugs duplicated across `scripts/verify-routes.mjs`, `app/sitemap.ts`, and `tests/e2e/helpers.mjs`.
6. **Delete legacy section modules** — Strong cleanup. Eight orphan modules plus unused `Section` props.

**Next action:** ask the user to pick 01–06. If they pick one, use `grilling` to settle constraints and `codebase-design` to shape the interface before writing code. Do not write interfaces yet.

---

## 3. Uncommitted changes (verify with `git diff`)

- **Dependency upgrade:** Next 16.4.2, React 19.3.1, `eslint-config-next` 16.4.2, lucide 1.61.0, postcss 8.5.31, `@types/node` 24.19.2. Lockfile updated.
- **Build workaround:** `build` and `dev` use `--webpack`. Next 16 Turbopack emits only the pages-router 404 for this static-export app; webpack builds all 28 app routes. Tracked as `KI-011`.
- **ESLint:** `.eslintrc.json` deleted; `eslint.config.mjs` uses Next 16 native flat config with `defineConfig`/`globalIgnores`.
- **React hook fixes:** removed `setState`-in-effect in `Navbar` and `ThemeToggle`; `ThemeToggle` is now CSS-driven.
- **Scripts:** added `scripts/clean.mjs`, `scripts/serve-out.mjs`; `package.json` has `clean`, `start`, `test:e2e`; `verify:all` chains all gates.
- **Docs:** README, PROJECT, TECHNICAL_MANUAL, ROADMAP, KNOWN_ISSUES, GATE_STATUS, TEST_READY, handoff, AGENTS, GEMINI updated. `docs/CONTENT_DECISIONS.md` is new and **untracked**.
- **Content:** `content/site.ts` now uses Team NJS, the Q2 copy, provisional email/domain, and no availability note. `app/about/page.tsx` uses `siteConfig.description` as its lede.
- **tsconfig:** Next 16 auto-set `jsx: react-jsx` and added `.next/dev/types/**/*.ts`.
- **Not touched:** `tests/e2e/viewport.test.ts` remains untracked and non-runnable (`@playwright/test` absent).

No commit was made for any of the above. Do not commit without an explicit user request.

---

## 4. Verification

Current expected state:

```bash
npm run typecheck        # pass
npm run lint             # pass
npm run clean            # removes .next/ and out/
npm run build            # next build --webpack, 28 app routes
npm run verify:routes    # 27/27
npm run verify:brand     # 0 leaks across 48 files
npm run test:e2e         # 66/66
npm run verify:all       # full chain including clean/build/E2E
```

Last verified on 2026-10-22 after the content Q2 and Next 16 changes. Home first-load JS is 158 kB because `Reveal` pulls framer-motion; interior routes are 108 kB. Production dependency audit is clean; dev audit reports 9 advisories.

If `next build` fails with a webpack runtime or `no direct app page entry` error, run `npm run clean` and rebuild. `out/` must exist before `test:e2e`.

---

## 5. Traps and known issues

- **`KI-011`:** Next 16 Turbopack build produces no app routes. Keep `--webpack` until re-tested and fixed.
- **`KI-012`:** Tailwind 4, TypeScript 7, and ESLint 10 are deliberately deferred. They are breaking migrations; do them in their own pass with a clean build and screenshot diff. Do not bundle with content work.
- **`KI-005`:** No project covers, founder portraits, or studio photography. Do not add fake gradients.
- **`KI-006`:** Brand, legal entity, domain, email, phone, address are provisional. `hello@teamnjs.example` is a placeholder.
- **`KI-007`:** Eight legacy section modules remain on disk. Full access is available now; delete them with candidate 06 or earlier.
- **`KI-008`:** `tests/e2e/viewport.test.ts` cannot run without Playwright; excluded from `tsc`.
- **`KI-009`:** Stats and project metrics are illustrative. Do not present them as verified.
- **`KI-010`:** Parallax is not wired; `Reveal` is.
- **No availability indicator:** explicitly rejected by the user. Do not add one.

---

## 6. Immediate next steps

1. Open the architecture report. Ask the user to choose **01–06**.
2. If they choose, run `grilling` first, then `codebase-design`; settle constraints, dependencies, the shape of the deepened module, what sits behind the seam, and which tests survive.
3. Use `domain-modeling` if a new concept gets a name; update `GLOSSARY.md` only when a term is resolved.
4. Do not write interfaces or code until the user confirms the shared understanding.
5. If the user instead wants content, resume at **Q3 primary buyer** from `docs/CONTENT_DECISIONS.md`.
6. Keep `docs/CONTENT_DECISIONS.md`, `docs/KNOWN_ISSUES.md`, `GATE_STATUS.md`, and `docs/handoff.md` current as decisions land.
7. Run the full gate after any architecture change. No “fix it later.”

---

## 7. Artifact map

| Artifact | Path | Role |
|---|---|---|
| Principles | `AGENTS.md` | Rules, docs hierarchy, architecture-review protocol |
| Current stack/commands | `README.md` | Onboarding |
| Architecture spec | `PROJECT.md` | Living system spec |
| Operations | `docs/TECHNICAL_MANUAL.md` | Tokens, primitives, gates, dependency policy |
| Content log | `docs/CONTENT_DECISIONS.md` | Q1/Q2 applied, Q3 deferred |
| Issues | `docs/KNOWN_ISSUES.md` | Active/resolved log |
| Gate log | `GATE_STATUS.md` | Verification history |
| Test inventory | `TEST_READY.md` | 66-test suite |
| Design authority | `docs/ADR/006-*`, `docs/ADR/007-*` | Tokens and composition |
| Repo handoff | `docs/handoff.md` | Current repo-level state |
| Architecture menu | `%TEMP%\architecture-review-20261022-2120.html` | Six candidates |

---

## 8. Suggested skills for the next agent

Call the Skill tool for:

- **`grilling`** — settle the chosen architecture candidate, or resume content Q3.
- **`codebase-design`** — exact vocabulary for module/interface/depth/seam/adapter/leverage/locality; design interfaces only after constraints are settled.
- **`domain-modeling`** — if a deepened module or content decision introduces a new term; keep `GLOSSARY.md` precise and free of implementation detail.
- **`build-loop`** — one change per verification cycle for the refactor.
- **`documentation-and-adrs`** — only if a decision is hard to reverse, surprising without context, and the result of a real trade-off.
- **`nextjs-app-router-patterns`** or **`react-best-practices`** — only while implementing the chosen refactor.

Avoid rerunning the architecture review unless the repo changes materially; the report is the current menu.

---

## 9. First command for Antigravity

```bash
cd /d/WebDev/portfolio
git status --short
git log -3 --oneline
npm run typecheck
npm run lint
npm run test:e2e
```

Then read `AGENTS.md` and the architecture report, and ask the user for their pick.
