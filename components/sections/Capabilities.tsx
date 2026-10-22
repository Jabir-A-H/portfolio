import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { serviceGroups, services } from '@/content/services';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

export function Capabilities() {
  return (
    <Section
      spacing="none"
      id="capabilities"
      className="pb-16 pt-20 sm:pb-20 sm:pt-24"
      aria-labelledby="capabilities-heading"
    >
      <Container size="xl">
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-4 pb-8 sm:pb-10">
          <h2
            id="capabilities-heading"
            className="col-span-12 font-display text-display-md text-foreground sm:col-span-6"
          >
            What we do
          </h2>
          <p className="col-span-12 max-w-[38ch] text-sm leading-relaxed text-muted-foreground sm:col-span-4 sm:col-start-9 sm:justify-self-end sm:text-right">
            Four disciplines, one team. Most projects use two or three of them.
          </p>
        </div>

        <div className="border-t border-border">
          {serviceGroups.map((group, index) => {
            const groupServices = services.filter((service) => service.groupId === group.id);

            return (
              <Link
                key={group.id}
                href={`/services#${group.id}`}
                className="group block border-b border-border py-7 transition-colors hover:border-foreground/60 sm:py-8"
              >
                <div className="grid grid-cols-12 items-start gap-x-4 gap-y-3">
                  <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="col-span-10 font-display text-[1.9rem] leading-[1.02] text-foreground transition-colors group-hover:text-accent lg:col-span-4 lg:text-[2.35rem]">
                    {group.title}
                  </h3>

                  <p className="col-span-10 col-start-3 max-w-[42ch] text-[14px] leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-7">
                    {group.description}
                  </p>

                  <span className="col-span-8 col-start-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80 lg:col-span-1 lg:col-start-11">
                    {String(groupServices.length).padStart(2, '0')} services
                  </span>

                  <span className="col-span-2 flex justify-end text-foreground/50 transition-colors group-hover:text-accent lg:col-span-1">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[46ch] text-[13px] leading-relaxed text-muted-foreground">
            Not sure which of these you need? Start with the problem and we will tell you what it
            takes.
          </p>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Services and process
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
