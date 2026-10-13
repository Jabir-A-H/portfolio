import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/content/projects';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Cpu,
  ImageIcon,
} from 'lucide-react';

// Static export enforcement
export const dynamicParams = false;

// Pre-render all 6 project case studies from content/projects.ts
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
    return {
      title: `Case Study Not Found | ${siteConfig.name}`,
    };
  }

  const cleanSummary = project.summary.replace(/^\/\/\s*TODO\(content\):\s*\[PLACEHOLDER\]\s*/i, '');

  return {
    title: `${project.title} | Case Study | ${siteConfig.name}`,
    description: cleanSummary,
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: cleanSummary,
      url: `${siteConfig.url}/portfolio/${project.slug}`,
      type: 'article',
    },
  };
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
    <article className="w-full flex flex-col">
      {/* Return Navigation Bar */}
      <div className="w-full border-b border-border bg-surface/50 backdrop-blur-sm">
        <Container size="xl" className="py-4 flex items-center justify-between">
          <Button
            href="/portfolio"
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to All Case Studies
          </Button>

          <Badge variant="outline" size="sm">
            {project.category}
          </Badge>
        </Container>
      </div>

      {/* Case Study Hero Section */}
      <Section spacing="md" className="border-b border-border bg-gradient-to-b from-surface to-background">
        <Container size="xl">
          <div className="max-w-4xl">
            {/* Meta tags row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="accent" size="md">
                {project.category}
              </Badge>
              <Badge variant="secondary" size="md">
                {project.clientType}
              </Badge>
              <span className="inline-flex items-center text-xs text-muted-foreground ml-1">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                Completed {project.completedDate}
              </span>
            </div>

            {/* H1 Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {project.title}
            </h1>

            {/* High-level Executive Summary */}
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {project.summary}
            </p>

            {/* Action Buttons Row */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="accent"
                  size="md"
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                >
                  Visit Live Project
                </Button>
              )}
              <Button href="/contact" variant="outline" size="md">
                Request Similar Architecture
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Key Metrics / Results Section */}
      {project.results.length > 0 && (
        <Section spacing="sm" className="bg-muted/30 border-b border-border">
          <Container size="xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Measurable Results & Key Performance Indicators
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.results.map((result, idx) => (
                <Card
                  key={idx}
                  variant="elevated"
                  className="p-6 border border-border bg-surface text-center sm:text-left shadow-sm"
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-accent tracking-tight">
                    {result.metric}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-foreground mt-2">
                    {result.label}
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Problem and Solution Two-Column Grid */}
      <Section spacing="md">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Column 1: Problem Statement (Satisfies T1.27 "problem" / "challenge") */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Problem & Challenge
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Operational bottlenecks, technical debt, and scalability constraints faced by the client.
              </p>

              <Card variant="bordered" className="p-6 sm:p-8 flex-1 bg-surface border-border">
                <p className="text-base text-foreground leading-relaxed whitespace-pre-line">
                  {project.problem}
                </p>
              </Card>
            </div>

            {/* Column 2: Our Solution (Satisfies T1.27 "solution" / "approach") */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Our Solution & Approach
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Architecture decisions, implementation roadmap, and engineering practices applied.
              </p>

              <Card variant="bordered" className="p-6 sm:p-8 flex-1 bg-surface border-border">
                <p className="text-base text-foreground leading-relaxed whitespace-pre-line">
                  {project.solution}
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Technologies & Tech Stack Section (Satisfies T1.27 "technolog" / "stack") */}
      <Section spacing="md" className="border-t border-border bg-muted/20">
        <Container size="xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-5 h-5 text-accent" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Technologies & Tech Stack
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Production frameworks, programming languages, cloud infrastructure, and protocols utilized for this engagement.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-6">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="default"
                  size="md"
                  className="px-4 py-2 text-sm font-semibold border-border bg-surface text-foreground shadow-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Gallery & Visual Assets Showcase */}
      {project.galleryUrls && project.galleryUrls.length > 0 && (
        <Section spacing="md" className="border-t border-border bg-surface">
          <Container size="xl">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon className="w-5 h-5 text-accent" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Project Gallery & Visual Showcase
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              Visual artifacts, interface layouts, and architectural views from the project lifecycle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {project.galleryUrls.map((imageUrl, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-xl overflow-hidden border border-border bg-muted group shadow-sm"
                >
                  <Image
                    src={imageUrl}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-muted/40">
                    <span className="text-xs font-mono text-muted-foreground">
                      [Visual Asset {idx + 1}: {project.title}]
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Next Case Study Explorer Strip */}
      <Section spacing="sm" className="border-t border-border bg-muted/30">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl border border-border bg-surface shadow-sm">
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Next Case Study
              </span>
              <h3 className="text-lg font-bold text-foreground mt-1">
                {nextProject.title}
              </h3>
            </div>
            <Button
              href={`/portfolio/${nextProject.slug}`}
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Next Project
            </Button>
          </div>
        </Container>
      </Section>
    </article>
  );
}
