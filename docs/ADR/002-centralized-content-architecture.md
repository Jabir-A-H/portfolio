# ADR 002: Centralized Content Single Source of Truth

- **Status:** Accepted and Implemented
- **Date:** 2026-10-13
- **Deciders:** Engineering Architecture

## Context
Brand names, contact information, service details, and team leadership are subject to change during early-stage brand finalization. Hardcoding brand strings across React components leads to broken references, inconsistent copy, and tedious refactoring.

## Decision
Establish `content/site.ts` as the single source of truth for all branding and global contact details. Split domain-specific content into typed modules: `services.ts`, `projects.ts`, `team.ts`, and `process.ts`. Strictly ban literal brand strings in `app/` and `components/`, enforced by an automated script (`scripts/verify-no-hardcoded-brand.mjs`).

## Consequences
- **Positive:** Rebranding is a one-file change in `content/site.ts`. UI components remain generic and reusable. Copywriters and founders can edit copy without touching JSX.
- **Negative:** Developers must always import and access properties from `@/content/site` rather than typing literals directly.
