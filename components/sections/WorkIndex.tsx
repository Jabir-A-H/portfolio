import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getFeaturedProjects } from '@/content/queries';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion';
import { ProjectRow } from '@/components/portfolio/ProjectRow';

export function WorkIndex() {
  const featured = getFeaturedProjects();

  return (
    <Section spacing="none" id="work" className="pt-32 sm:pt-44" aria-labelledby="work-heading">
      <Container size="xl">
        <Reveal>
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-4 pb-12 sm:pb-16">
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
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            {featured.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                variant="compact"
                headingTag="h3"
                showCompletedDate={false}
              />
            ))}
          </div>
        </Reveal>

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
