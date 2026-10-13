import * as React from 'react';
import { ArrowRight, Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function Hero() {
  return (
    <Section
      spacing="lg"
      className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 lg:pb-32"
    >
      {/* Decorative background aura (confined to container bounds to prevent horizontal scroll leaks) */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] max-w-full bg-accent/5 dark:bg-accent/10 blur-[100px] rounded-full pointer-events-none -z-10"
      />

      <Container size="xl" className="text-center flex flex-col items-center">
        {/* Capability badge */}
        <Badge variant="accent" size="md" className="mb-6 inline-flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{'// TODO(content): [PLACEHOLDER] Digital Engineering & Creative Studio'}</span>
        </Badge>

        {/* H1 Heading (Mandatory for T1.7 & SEO) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-5xl leading-[1.1] sm:leading-[1.15]">
          {siteConfig.hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-normal">
          {siteConfig.hero.subheadline}
        </p>

        {/* Dual CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button
            href={siteConfig.hero.primaryCta.href}
            variant="accent"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all"
          >
            {siteConfig.hero.primaryCta.title}
          </Button>
          <Button
            href={siteConfig.hero.secondaryCta.href}
            variant="outline"
            size="lg"
            rightIcon={<Eye className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            {siteConfig.hero.secondaryCta.title}
          </Button>
        </div>

        {/* Architectural Highlights */}
        <div className="mt-12 pt-8 border-t border-border/50 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-muted-foreground max-w-2xl w-full">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
            <span>Static-First Edge Speed</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
            <span>Strict TypeScript Schemas</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
            <span>90+ Google Lighthouse</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
