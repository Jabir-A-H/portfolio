import * as React from 'react';
import { ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ScrollReveal, RevealItem } from '@/components/motion';

export function Hero() {
  return (
    <Section
      spacing="lg"
      className="relative overflow-hidden"
      aria-labelledby="hero-headline"
    >
      {/* Background depth layer — subtle gradient wash, no blur aura */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent dark:from-accent/10 dark:via-transparent pointer-events-none -z-10"
      />

      <Container size="xl" className="relative py-section-lg">
        {/* Offset axis layout — content anchored left, void on right */}
        <div className="max-w-3xl w-full">
          <ScrollReveal stagger={120} variant="fade-up" className="space-y-6">
            {/* Capability badge — micro label */}
            <RevealItem
              as="span"
              variant="scale-up"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-label uppercase tracking-label bg-accent/10 text-accent border border-accent/20 rounded-[2px]"
            >
              Digital Engineering & Creative Studio
            </RevealItem>

            {/* H1 Headline — display voice */}
            <h1
              id="hero-headline"
              className="font-display text-display-lg text-foreground leading-[0.96] tracking-display max-w-2xl"
            >
              {siteConfig.hero.headline}
            </h1>

            {/* Subheadline — ghost body */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal max-w-xl">
              {siteConfig.hero.subheadline}
            </p>

            {/* Dual CTAs — hard shadow depth */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <Button
                href={siteConfig.hero.primaryCta.href}
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shadow-hard hover:shadow-hard-lg transition-shadow duration-300"
              >
                {siteConfig.hero.primaryCta.title}
              </Button>
              <Button
                href={siteConfig.hero.secondaryCta.href}
                variant="outline"
                size="lg"
                rightIcon={<Eye className="w-4 h-4" />}
                className="border-foreground/20 hover:border-foreground hover:bg-foreground/5 transition-all duration-300"
              >
                {siteConfig.hero.secondaryCta.title}
              </Button>
            </div>

            {/* Architectural Highlights — mono metadata */}
            <div className="pt-6 border-t border-border/50 grid grid-cols-1 sm:grid-cols-3 gap-4 text-label uppercase tracking-label text-muted-foreground">
              <RevealItem variant="fade-up" delay={200} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>Static-First Edge Speed</span>
              </RevealItem>
              <RevealItem variant="fade-up" delay={320} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>Strict TypeScript Schemas</span>
              </RevealItem>
              <RevealItem variant="fade-up" delay={440} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>90+ Google Lighthouse</span>
              </RevealItem>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
