import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getServiceGroups, getServices } from '@/content/queries';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ContactBlock } from '@/components/sections/ContactBlock';

export const metadata: Metadata = createPageMetadata({
  title: 'Services',
  description: `Nine services across web, mobile, automation, and brand systems, delivered by ${siteConfig.name}.`,
  path: '/services',
});

export default function ServicesPage() {
  const serviceGroups = getServiceGroups();
  const services = getServices();
  return (
    <div className="flex w-full flex-col">
      <Section spacing="none" className="border-b border-border pb-8 pt-16 sm:pb-10 sm:pt-20">
        <Container size="xl">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
            <div className="col-span-12 lg:col-span-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Capabilities
              </p>
              <h1 className="mt-4 text-balance font-display text-display-lg text-foreground">
                Services
              </h1>
            </div>
            <p className="col-span-12 max-w-[42ch] text-[15px] leading-[1.7] text-muted-foreground lg:col-span-4 lg:justify-self-end">
              Nine services across four disciplines. We take a project from the first drawing to
              the long maintenance tail.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-4">
            {serviceGroups.map((group) => {
              const count = services.filter((service) => service.groupId === group.id).length;

              return (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="group inline-flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {group.title}
                  <span className="text-muted-foreground/50 group-hover:text-accent">{count}</span>
                </a>
              );
            })}
          </div>
        </Container>
      </Section>

      {serviceGroups.map((group, index) => {
        const groupServices = services.filter((service) => service.groupId === group.id);

        return (
          <Section
            key={group.id}
            id={group.id}
            spacing="none"
            className="scroll-mt-24 border-b border-border py-14 sm:py-20"
          >
            <Container size="xl">
              <div className="grid grid-cols-12 gap-x-6 gap-y-4">
                <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground lg:col-span-2">
                  {String(index + 1).padStart(2, '0')} / Discipline
                </p>

                <div className="col-span-12 lg:col-span-6">
                  <h2 className="font-display text-display-md text-foreground">{group.title}</h2>
                  <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.7] text-muted-foreground">
                    {group.description}
                  </p>
                </div>

                <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground lg:col-span-3 lg:col-start-10 lg:justify-self-end">
                  {groupServices.length} services
                </p>
              </div>

              <div className="mt-10 grid gap-x-10 border-t border-border sm:grid-cols-2">
                {groupServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group border-b border-border py-6 transition-colors hover:border-foreground/60"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-[1.75rem] leading-[1.05] text-foreground transition-colors group-hover:text-accent">
                        {service.title}
                      </h3>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>

                    <p className="mt-2 max-w-[48ch] text-[14px] leading-relaxed text-muted-foreground">
                      {service.shortDescription}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/70">
                      {service.whatWeDeliver.items.slice(0, 3).map((item, itemIndex) => (
                        <span key={item.title}>
                          {itemIndex > 0 && <span className="mr-2 text-border">/</span>}
                          {item.title}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      <ContactBlock />
    </div>
  );
}
