import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Sparkles,
  ChevronRight,
  Workflow,
  PackageCheck,
} from 'lucide-react';
import { services, getServiceBySlug } from '@/content/services';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Static export enforcement
export const dynamicParams = false;

// Pre-render all 9 dynamic services
export function generateStaticParams() {
  return services.map((service) => ({
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
    return {
      title: `Service Not Found | ${siteConfig.name}`,
    };
  }

  return {
    title: `${service.title} | Services | ${siteConfig.name}`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.shortDescription,
      url: `${siteConfig.url}/services/${service.slug}`,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Schema.org structured data for service
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
    <article className="w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Return Navigation & Breadcrumbs */}
      <div className="w-full border-b border-border bg-surface/50 backdrop-blur-sm">
        <Container size="xl" className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/services" className="hover:text-foreground transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">{service.title}</span>
          </nav>

          <Button
            href="/services"
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            All Services
          </Button>
        </Container>
      </div>

      {/* Section 1: Overview */}
      <Section id="overview" spacing="md" className="border-b border-border bg-gradient-to-b from-surface via-background to-background">
        <Container size="xl">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <Badge variant="accent" size="md">
                {service.groupName}
              </Badge>
              <Badge variant="outline" size="sm">
                Service Overview
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {service.title}
            </h1>

            <p className="mt-4 text-xl sm:text-2xl font-semibold text-accent leading-snug">
              {service.overview.headline}
            </p>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {service.overview.description}
            </p>

            {/* Key Benefits */}
            <div className="mt-8 pt-6 border-t border-border/60">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Core Value & Strategic Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {service.overview.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-surface border border-border/60 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90 leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Jump Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start a Project
              </Button>
              <Button href="#deliverables" variant="outline" size="lg">
                View Deliverables
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 2: What We Deliver */}
      <Section id="deliverables" spacing="lg" className="border-b border-border bg-background">
        <Container size="xl">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-2">
              <PackageCheck className="w-5 h-5 text-accent" />
              <Badge variant="secondary" size="sm">Deliverables Specification</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {service.whatWeDeliver.headline}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Tangible, production-grade assets and documentation provided throughout the engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.whatWeDeliver.items.map((item, idx) => (
              <Card key={idx} variant="bordered" className="p-6 bg-surface hover:border-accent/40 transition-all shadow-sm">
                <div className="flex items-center gap-2 text-xs font-mono text-accent mb-2">
                  <span>DELIVERABLE 0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 3: Process */}
      <Section id="process" spacing="lg" className="border-b border-border bg-muted/20">
        <Container size="xl">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-2">
              <Workflow className="w-5 h-5 text-accent" />
              <Badge variant="accent" size="sm">Delivery Methodology</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              How We Deliver {service.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Our structured step-by-step workflow ensures transparency, rapid iterations, and predictable milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {service.process.map((step) => (
              <Card key={step.step} variant="default" className="p-5 flex flex-col justify-between border-border hover:border-accent/50 transition-all bg-surface">
                <div>
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent font-black text-xs flex items-center justify-center mb-3">
                    0{step.step}
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 4: Technologies & Tools */}
      <Section id="technologies" spacing="lg" className="border-b border-border bg-background">
        <Container size="xl">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-5 h-5 text-accent" />
              <Badge variant="secondary" size="sm">Tools & Stack</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Technologies & Tech Stack
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Battle-tested tools, modern frameworks, and cloud standards utilized to power this service.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {service.technologies.map((tech) => (
              <div
                key={tech.name}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-foreground shadow-sm hover:border-accent/40 transition-colors"
              >
                <span className="font-semibold text-sm">{tech.name}</span>
                {tech.category && (
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    {tech.category}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 5: FAQ */}
      <Section id="faq" spacing="lg" className="border-b border-border bg-muted/20">
        <Container size="xl">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-accent" />
              <Badge variant="outline" size="sm">FAQ</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Common questions about engagement scope, deliverables, timelines, and technical requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.faqs.map((faq, idx) => (
              <Card key={idx} variant="bordered" className="p-6 bg-surface shadow-sm">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 flex items-start gap-2">
                  <span className="text-accent font-bold">Q:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 6: CTA */}
      <Section id="cta" spacing="md" className="bg-background">
        <Container size="xl">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-sm">
            <Badge variant="accent" size="sm" className="mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>Let&apos;s Build Together</span>
            </Badge>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
              {service.cta.headline}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {service.cta.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href={service.cta.buttonLink || '/contact'}
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {service.cta.buttonText}
              </Button>
              <Button href="/services" variant="outline" size="lg">
                View All Services
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
