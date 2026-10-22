import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

export function ContactBlock() {
  return (
    <Section
      spacing="none"
      id="contact-block"
      className="pb-24 pt-32 sm:pb-36 sm:pt-44"
      aria-labelledby="contact-heading"
    >
      <Container size="xl">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground lg:col-span-2">
            Next
          </p>

          <div className="col-span-12 lg:col-span-10">
            <h2
              id="contact-heading"
              className="max-w-[18ch] text-balance font-display text-display-xl font-light text-foreground"
            >
              {siteConfig.ctaBanner.headline}
            </h2>

            <div className="mt-10 grid grid-cols-12 items-end gap-x-6 gap-y-8 sm:mt-14">
              <p className="col-span-12 max-w-[42ch] text-[15px] leading-[1.7] text-muted-foreground sm:col-span-7">
                {siteConfig.ctaBanner.subheadline}
              </p>

              <div className="col-span-12 flex flex-col items-start gap-5 sm:col-span-5 sm:items-end">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="border-b border-foreground/30 pb-1 text-xl transition-colors hover:border-accent hover:text-accent sm:text-2xl"
                >
                  {siteConfig.contact.email}
                </a>
                <Link
                  href={siteConfig.ctaBanner.primaryButtonHref}
                  className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground transition-colors hover:text-accent"
                >
                  {siteConfig.ctaBanner.primaryButtonText}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
