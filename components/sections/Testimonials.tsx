import { siteConfig } from '@/content/site';

export function Testimonials() {
  // Suppressed per spec and test T1.15 until authentic client testimonials exist
  if (!siteConfig.features.showTestimonials) {
    return null;
  }

  return null;
}
