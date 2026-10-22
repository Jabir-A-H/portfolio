import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

export function Hero() {
  return (
    <Section spacing="none" aria-labelledby="hero-headline">
      <Container size="xl">
        <div className="flex items-center justify-between gap-4 border-b border-border py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span className="sm:hidden">Digital studio</span>
          <span className="hidden sm:block">Independent digital studio</span>
          <span className="hidden md:block">Dhaka, Bangladesh</span>
          <span className="flex items-center gap-2 whitespace-nowrap text-foreground">
            <span className="h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
            {siteConfig.hero.note}
          </span>
        </div>
      </Container>

      <Container size="xl" className="pt-12 sm:pt-16 lg:pt-20">
        <h1
          id="hero-headline"
          className="max-w-[16ch] text-balance font-display text-display-xl font-light text-foreground"
        >
          {siteConfig.hero.headline.split('*').map((part, index) =>
            index % 2 === 1 ? (
              <em key={index} className="italic">
                {part}
              </em>
            ) : (
              <React.Fragment key={index}>{part}</React.Fragment>
            )
          )}
        </h1>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 sm:mt-16">
          <p className="col-span-12 max-w-[40ch] text-[17px] leading-[1.65] text-muted-foreground sm:col-span-7 lg:col-span-4 lg:col-start-2">
            {siteConfig.hero.subheadline}
          </p>

          <div className="col-span-12 flex flex-col items-start gap-6 sm:col-span-5 lg:col-span-4 lg:col-start-9">
            <Link
              href={siteConfig.hero.primaryCta.href}
              className="group inline-flex items-center gap-3 bg-primary px-5 py-3 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {siteConfig.hero.primaryCta.title}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={siteConfig.hero.secondaryCta.href}
              className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-[13px] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {siteConfig.hero.secondaryCta.title}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>

      <Container size="xl" className="mt-12 sm:mt-16 lg:mt-20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-5">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {siteConfig.hero.disciplines.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
