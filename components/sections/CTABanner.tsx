import * as React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

export function CTABanner() {
  const whatsappCleanNumber = (siteConfig.contact.whatsapp || '').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappCleanNumber}`;

  return (
    <Section index={8} label="CONTACT" spacing="none" className="my-12 sm:my-16 lg:my-20">
      <Container size="xl">
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 sm:p-12 lg:p-16 shadow-xl text-center flex flex-col items-center">
          {/* Subtle gradient overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/10 pointer-events-none"
          />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-primary-foreground max-w-3xl leading-tight">
            {siteConfig.ctaBanner.headline}
          </h2>

          <p className="mt-4 text-base sm:text-lg lg:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
            {siteConfig.ctaBanner.subheadline}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button
              href={siteConfig.ctaBanner.primaryButtonHref}
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-md"
            >
              Start a Project
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Get a Quote
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2 text-xs sm:text-sm text-primary-foreground/70">
            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Need direct consultation? Chat instantly on </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold hover:text-white transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
