import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { getServices, getServiceBySlug } from '@/content/queries';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactBlock } from '@/components/sections/ContactBlock';

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((service) => ({
    slug: service.slug,
  }));
}

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return createPageMetadata({
      title: 'Service not found',
      description: 'The requested service could not be found.',
      path: `/services/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${service.title} | Services`,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: 'Worldwide',
  };

  return (
    <article className="flex w-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-border">
        <Container
          size="xl"
          className="flex flex-wrap items-center justify-between gap-3 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
        >
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/services" className="transition-colors hover:text-foreground">
              Services
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{service.title}</span>
          </nav>
          <Link href="/services" className="transition-colors hover:text-accent">
            All services
          </Link>
        </Container>
      </div>

      <PageHeader
        label={`${service.groupName} / Service`}
        title={service.title}
        lede={service.overview.headline}
        meta={`${service.process.length} phases / ${service.technologies.length} tools`}
      />

      <Section spacing="none" className="border-b border-border py-14 sm:py-20">
        <Container size="xl">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground lg:col-span-2">
              Overview
            </p>

            <div className="col-span-12 lg:col-span-6">
              <p className="text-[17px] leading-[1.75] text-foreground/85">
                {service.overview.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
                >
                  Discuss this service
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#deliverables"
                  className="border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
                >
                  What you get
                </a>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <ul className="border-t border-border">
                {service.overview.benefits.map((benefit, index) => (
                  <li key={benefit} className="flex gap-4 border-b border-border py-4">
                    <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[13px] leading-relaxed text-foreground/85">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        spacing="none"
        id="deliverables"
        className="scroll-mt-24 border-b border-border py-14 sm:py-20"
      >
        <Container size="xl">
          <div className="grid grid-cols-12 gap-x-6 gap-y-4 pb-8">
            <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground lg:col-span-2">
              Deliverables
            </p>
            <h2 className="col-span-12 font-display text-display-md text-foreground lg:col-span-8">
              {service.whatWeDeliver.headline}
            </h2>
          </div>

          <div className="grid gap-x-10 border-t border-border sm:grid-cols-2">
            {service.whatWeDeliver.items.map((item, index) => (
              <div key={item.title} className="border-b border-border py-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl text-foreground">{item.title}</h3>
                </div>
                <p className="mt-2 pl-8 text-[14px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="border-b border-border py-14 sm:py-20">
        <Container size="xl">
          <div className="grid grid-cols-12 gap-x-6 gap-y-4 pb-8">
            <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground lg:col-span-2">
              Method
            </p>
            <h2 className="col-span-12 font-display text-display-md text-foreground lg:col-span-8">
              How the work runs.
            </h2>
          </div>

          <div className="grid gap-x-8 gap-y-0 border-t border-border sm:grid-cols-2 lg:grid-cols-5">
            {service.process.map((step) => (
              <div key={step.step} className="border-b border-border py-6 lg:border-b-0 lg:pr-4">
                <span className="font-mono text-[10px] tracking-[0.14em] text-accent">
                  {String(step.step).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-xl leading-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="border-b border-border py-14 sm:py-20">
        <Container size="xl">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground lg:col-span-2">
              Tools
            </p>
            <div className="col-span-12 lg:col-span-9">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {service.technologies.map((tech) => (
                  <li key={tech.name} className="text-[14px] text-foreground/85">
                    {tech.name}
                    {tech.category && (
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                        {tech.category}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="border-b border-border py-14 sm:py-20">
        <Container size="xl">
          <div className="grid grid-cols-12 gap-x-6 gap-y-4 pb-8">
            <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground lg:col-span-2">
              FAQ
            </p>
            <h2 className="col-span-12 font-display text-display-md text-foreground lg:col-span-8">
              Asked before.
            </h2>
          </div>

          <div className="grid gap-x-10 border-t border-border sm:grid-cols-2">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-border py-6">
                <h3 className="max-w-[38ch] font-display text-xl text-foreground">{faq.question}</h3>
                <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ContactBlock />
    </article>
  );
}
