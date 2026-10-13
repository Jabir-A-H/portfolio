import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
