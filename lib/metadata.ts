// ============================================================================
// File: lib/metadata.ts
// Purpose: Unified metadata factory for Next.js App Router routes.
//          Standardizes OpenGraph, Twitter Cards, canonical URLs, and titles.
// ============================================================================

import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

export interface PageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  ogType?: 'website' | 'article';
  image?: string;
}

export function createPageMetadata({
  title,
  description = siteConfig.description,
  path = '',
  ogType = 'website',
  image = siteConfig.logo.placeholderUrl,
}: PageMetadataOptions): Metadata {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const canonicalUrl = `${siteConfig.url}${cleanPath}`;

  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      type: ogType,
      siteName: siteConfig.name,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: image ? [image] : undefined,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
