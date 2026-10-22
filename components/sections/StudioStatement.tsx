import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion';

export function StudioStatement() {
  return (
    <Section
      spacing="none"
      id="studio"
      className="bg-foreground py-32 text-background sm:py-44"
      aria-labelledby="studio-heading"
    >
      <Container size="xl">
        <Reveal>
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-background/55 lg:col-span-2">
            The studio
          </p>

          <div className="col-span-12 lg:col-span-8 lg:col-start-4">
            <h2
              id="studio-heading"
              className="max-w-[22ch] text-balance font-display text-display-lg font-light text-background"
            >
              {siteConfig.studio.statement}
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-10">
              {siteConfig.studio.body.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-[1.7] text-background/70">
                  {paragraph}
                </p>
              ))}
            </div>

            <Link
              href={siteConfig.studio.cta.href}
              className="group mt-10 inline-flex items-center gap-2 border-b border-background/35 pb-1 text-[13px] text-background transition-colors hover:border-accent hover:text-accent"
            >
              {siteConfig.studio.cta.title}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
