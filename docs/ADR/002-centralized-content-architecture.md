# ADR 002: Centralized Content Single Source of Truth

- **Status:** Accepted and Implemented
- **Date:** 2026-10-13 (Amended 2026-10-23)
- **Deciders:** Engineering Architecture

## Context
Brand names, contact information, service details, and team leadership are subject to change during early-stage brand finalization. Hardcoding brand strings across React components leads to broken references, inconsistent copy, and tedious refactoring.

## Decision
1. Establish `content/site.ts` as the single source of truth for all branding and global contact details. Split domain-specific content into typed modules: `services.ts`, `projects.ts`, `team.ts`, and `process.ts`.
2. Strictly ban literal brand strings in `app/`, `components/`, and `lib/`, enforced by an automated script (`scripts/verify-no-hardcoded-brand.mjs`).
3. **Amendment (2026-10-23):** Establish `content/queries.ts` as a typed query facade so that UI components and pages do not access raw data arrays directly or perform repetitive inline `.filter()` / `.map()` logic.

## Consequences
- **Positive:** Rebranding is a one-file change in `content/site.ts`. UI components remain generic and reusable. Copywriters and founders can edit copy without touching JSX. Derived domain queries are centralized in `content/queries.ts`.
- **Negative:** Developers must always import and access properties from `@/content/site` or `@/content/queries` rather than typing literals directly.
