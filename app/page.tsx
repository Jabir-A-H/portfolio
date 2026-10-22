import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';
import { Hero } from '@/components/sections/Hero';
import { WorkIndex } from '@/components/sections/WorkIndex';
import { Capabilities } from '@/components/sections/Capabilities';
import { StudioStatement } from '@/components/sections/StudioStatement';
import { ContactBlock } from '@/components/sections/ContactBlock';

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
    <div className="flex w-full min-w-0 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <WorkIndex />
      <Capabilities />
      <StudioStatement />
      <ContactBlock />
    </div>
  );
}
