# ADR 001: Next.js Static HTML Export Architecture

- **Status:** Accepted and Implemented
- **Date:** 2026-10-13
- **Deciders:** Engineering Architecture

## Context
The marketing agency site needs fast load performance, excellent search engine visibility, robust DDoS resistance, and compatibility with standard shared hosting (e.g., Hostinger `public_html`) without maintaining a persistent Node.js runtime container.

## Decision
Configure Next.js (App Router) with `output: 'export'`, `trailingSlash: true`, and `images: { unoptimized: true }` in `next.config.ts`. Lock down all dynamic routes (`/services/[slug]` and `/portfolio/[slug]`) with `dynamicParams = false` and `generateStaticParams()`.

## Consequences
- **Positive:** Emits pure static HTML, CSS, and JS into `out/`. Zero server runtime vulnerabilities or cold starts. Can be deployed to any static host, CDN, or FTP destination.
- **Negative:** Server-side features (API routes, `getServerSideProps`, dynamic cookies) cannot be used. Forms and interactive elements must rely on client-side services or external endpoints.
