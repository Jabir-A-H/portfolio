import type { Metadata } from 'next';
import { getAllProjects, getProjectCategories } from '@/content/projects';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PortfolioFilterGrid } from '@/components/portfolio/PortfolioFilterGrid';
import { ContactBlock } from '@/components/sections/ContactBlock';

export const metadata: Metadata = {
  title: `Case Studies & Portfolio | ${siteConfig.name}`,
  description: `Selected client work across web platforms, mobile products, automation, and brand systems by ${siteConfig.name}.`,
  openGraph: {
    title: `Case Studies & Portfolio | ${siteConfig.name}`,
    description: `Selected client work across web platforms, mobile products, automation, and brand systems by ${siteConfig.name}.`,
    url: `${siteConfig.url}/portfolio`,
    type: 'website',
  },
};

export default function PortfolioPage() {
  const allProjects = getAllProjects();
  const categories = getProjectCategories();

  return (
    <div className="flex w-full flex-col">
      <Section spacing="none" className="border-b border-border pb-10 pt-16 sm:pb-14 sm:pt-20">
        <Container size="xl">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
            <div className="col-span-12 lg:col-span-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Index
              </p>
              <h1 className="mt-4 text-balance font-display text-display-lg text-foreground">
                Case studies
              </h1>
            </div>
            <p className="col-span-12 max-w-[42ch] text-[15px] leading-[1.7] text-muted-foreground lg:col-span-4 lg:justify-self-end">
              Six projects across web, mobile, automation, and brand. Client names are withheld
              where the agreement requires it.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-16 pt-10 sm:pb-20">
        <Container size="xl">
          <PortfolioFilterGrid projects={allProjects} categories={categories} />
        </Container>
      </Section>

      <ContactBlock />
    </div>
  );
}
