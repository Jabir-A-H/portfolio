import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion';

export function Hero() {
  return (
    <Section spacing="none" aria-labelledby="hero-headline">
      <Container size="xl">
        <div className="flex items-center justify-between gap-4 py-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span className="sm:hidden">Digital studio</span>
          <span className="hidden sm:block">Independent digital studio</span>
          <span className="hidden md:block">Dhaka, Bangladesh</span>
        </div>
      </Container>

      <Container size="xl" className="pb-10 pt-16 sm:pb-16 sm:pt-24 lg:pt-32">
        <Reveal>
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
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 sm:mt-24">
            <p className="col-span-12 max-w-[40ch] text-[17px] leading-[1.65] text-muted-foreground sm:col-span-7 lg:col-span-4 lg:col-start-2">
              {siteConfig.hero.subheadline}
            </p>

            <div className="col-span-12 flex flex-col items-start gap-6 sm:col-span-5 lg:col-span-4 lg:col-start-9">
              <Link
                href={siteConfig.hero.primaryCta.href}
                className="group inline-flex items-center gap-3 rounded-[2px] bg-primary px-5 py-3 text-[13px] font-medium text-primary-foreground shadow-hard-sm transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-hard-accent active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
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
        </Reveal>
      </Container>

      <Container size="xl" className="mt-24 sm:mt-40">
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-between gap-4 py-8">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {siteConfig.hero.disciplines.map((discipline) => (
                <li key={discipline}>{discipline}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
