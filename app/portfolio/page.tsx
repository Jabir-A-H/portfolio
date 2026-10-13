import type { Metadata } from 'next';
import { getAllProjects, getProjectCategories } from '@/content/projects';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PortfolioFilterGrid } from '@/components/portfolio/PortfolioFilterGrid';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: `Case Studies & Portfolio | ${siteConfig.name}`,
  description: `Explore proven client case studies and digital engineering results across web, mobile, automation, and creative media delivered by ${siteConfig.name}.`,
  openGraph: {
    title: `Case Studies & Portfolio | ${siteConfig.name}`,
    description: `Explore proven client case studies and digital engineering results across web, mobile, automation, and creative media delivered by ${siteConfig.name}.`,
    url: `${siteConfig.url}/portfolio`,
    type: 'website',
  },
};

export default function PortfolioPage() {
  const allProjects = getAllProjects();
  const categories = getProjectCategories();

  return (
    <div className="w-full flex flex-col">
      {/* Portfolio Header Section */}
      <Section spacing="md" className="border-b border-border bg-gradient-to-b from-surface via-background to-background">
        <Container size="xl">
          <div className="max-w-3xl">
            <Badge variant="accent" size="md" className="mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>Proven Track Record & Client Results</span>
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Case Studies & Portfolio Showcase
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Discover how {siteConfig.name} partners with ambitious enterprises and startups to engineer scalable web platforms, high-performance mobile applications, intelligent workflow automations, and digital brand media.
            </p>
          </div>
        </Container>
      </Section>

      {/* Interactive Case Study Grid Section */}
      <Section spacing="md">
        <Container size="xl">
          <PortfolioFilterGrid projects={allProjects} categories={categories} />
        </Container>
      </Section>

      {/* Pre-Footer Project Inquiry Banner */}
      <Section spacing="md" className="border-t border-border bg-muted/20">
        <Container size="xl">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Have an Ambitious Project in Mind?
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
              Our engineering team is ready to analyze your architecture, identify bottlenecks, and design a customized roadmap for your team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href="/contact"
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Schedule an Architecture Consultation
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Explore All Services
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
