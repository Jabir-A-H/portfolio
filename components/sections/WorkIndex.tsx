import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getFeaturedProjects } from '@/content/projects';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

const shortCategory: Record<string, string> = {
  'Web & Software': 'Web',
  'Mobile & Games': 'Mobile',
  'Automation & Integration': 'Automation',
  Creative: 'Creative',
};

export function WorkIndex() {
  const featured = getFeaturedProjects();

  return (
    <Section spacing="none" id="work" className="pt-20 sm:pt-24" aria-labelledby="work-heading">
      <Container size="xl">
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-4 pb-8 sm:pb-10">
          <h2
            id="work-heading"
            className="col-span-12 font-display text-display-md text-foreground sm:col-span-6"
          >
            Selected work
          </h2>
          <p className="col-span-12 max-w-[38ch] text-sm leading-relaxed text-muted-foreground sm:col-span-4 sm:col-start-9 sm:justify-self-end sm:text-right">
            Three recent projects. The rest of the archive includes fintech, games, and brand
            systems.
          </p>
        </div>

        <div className="border-t border-border">
          {featured.map((project, index) => {
            const headlineResult = project.results?.[0];
            const label = shortCategory[project.category] ?? project.category;

            return (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group block border-b border-border py-6 transition-colors hover:border-foreground/60 sm:py-9"
              >
                <div className="grid grid-cols-12 items-start gap-x-4 gap-y-2">
                  <div className="col-span-12 mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:hidden">
                    <span>
                      {String(index + 1).padStart(2, '0')}
                      <span className="ml-3 text-muted-foreground/70">{label}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-foreground/50" />
                  </div>

                  <span className="col-span-2 hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
                    {String(index + 1).padStart(2, '0')}
                    <span className="mt-1.5 block text-muted-foreground/70">{label}</span>
                  </span>

                  <h3 className="col-span-12 font-display text-[1.9rem] leading-[1.02] text-foreground transition-colors group-hover:text-accent sm:col-span-6 sm:text-[2.6rem]">
                    {project.title}
                  </h3>

                  <div className="col-span-12 flex flex-col gap-1 sm:col-span-3 sm:mt-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {project.clientType}
                    </span>
                    {headlineResult && (
                      <span className="text-[13px] leading-snug text-foreground/80">
                        <span className="font-mono text-[11px] text-accent">
                          {headlineResult.metric}
                        </span>{' '}
                        {headlineResult.label}
                      </span>
                    )}
                  </div>

                  <span className="hidden justify-end text-foreground/50 transition-colors group-hover:text-accent sm:col-span-1 sm:flex">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            All six projects
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
