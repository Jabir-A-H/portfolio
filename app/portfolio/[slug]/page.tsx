import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { getAllProjects, getProjectBySlug } from '@/content/queries';
import { createPageMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactBlock } from '@/components/sections/ContactBlock';

export const dynamicParams = false;

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createPageMetadata({
      title: 'Case study not found',
      description: 'The requested case study could not be found.',
      path: `/portfolio/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${project.title} | Case Study`,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
    ogType: 'article',
  });
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <article className="flex w-full flex-col">
      <div className="border-b border-border">
        <Container
          size="xl"
          className="flex flex-wrap items-center justify-between gap-3 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
        >
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/portfolio" className="transition-colors hover:text-foreground">
              Work
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{project.title}</span>
          </nav>
          <Link href="/portfolio" className="transition-colors hover:text-accent">
            All work
          </Link>
        </Container>
      </div>

      <PageHeader
        label={project.category}
        title={project.title}
        lede={project.summary}
        meta={`${project.clientType} / ${project.completedDate}`}
      />

      {project.results.length > 0 && (
        <Section spacing="none" className="border-b border-border py-12 sm:py-16">
          <Container size="xl">
            <div className="grid grid-cols-1 gap-y-8 border-t border-border pt-8 sm:grid-cols-3 sm:gap-x-10">
              {project.results.map((result) => (
                <div key={result.label}>
                  <p className="font-display text-4xl leading-none text-foreground sm:text-5xl">
                    {result.metric}
                  </p>
                  <p className="mt-3 max-w-[24ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">
                    {result.label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section spacing="none" className="border-b border-border py-14 sm:py-20">
        <Container size="xl">
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 lg:col-span-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Problem
              </p>
              <p className="mt-5 text-[17px] leading-[1.75] text-foreground/85">{project.problem}</p>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Approach
              </p>
              <p className="mt-5 text-[17px] leading-[1.75] text-foreground/85">
                {project.solution}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="border-b border-border py-10 sm:py-12">
        <Container size="xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Tech stack
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
              {project.technologies.map((tech, index) => (
                <li key={tech} className="text-[14px] text-foreground/85">
                  {index > 0 && <span className="mr-4 text-border">/</span>}
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="py-12 sm:py-16">
        <Container size="xl">
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-3 border-t border-border pt-8"
          >
            <span className="col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:col-span-2">
              Next project
            </span>
            <h2 className="col-span-10 font-display text-[2rem] leading-none text-foreground transition-colors group-hover:text-accent sm:col-span-8 sm:text-[3rem]">
              {nextProject.title}
            </h2>
            <span className="col-span-2 flex justify-end self-center text-foreground/50 transition-colors group-hover:text-accent sm:col-span-2">
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Container>
      </Section>

      <ContactBlock />
    </article>
  );
}
