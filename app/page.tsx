import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { ProcessPreview } from '@/components/sections/ProcessPreview';
import { TechStackStrip } from '@/components/sections/TechStackStrip';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    type: 'website',
  },
};

export default function HomePage() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressCountry: siteConfig.contact.address.country,
    },
  };

  return (
    <div className="flex flex-col w-full min-w-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <FeaturedProjects />
      <StatsStrip />
      <ProcessPreview />
      <TechStackStrip />
      <Testimonials />
      <CTABanner />
    </div>
  );
}
