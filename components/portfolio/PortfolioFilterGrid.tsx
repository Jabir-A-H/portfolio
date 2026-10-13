'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FolderGit2, SlidersHorizontal, Sparkles } from 'lucide-react';
import type { ProjectItem } from '@/content/projects';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface PortfolioFilterGridProps {
  projects: ProjectItem[];
  categories: string[];
}

export function PortfolioFilterGrid({ projects, categories }: PortfolioFilterGridProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>('All');

  // Filter projects by active category pill
  const filteredProjects = React.useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [projects, activeCategory]);

  // Project count per category pill
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    categories.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = projects.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [projects, categories]);

  return (
    <div className="w-full">
      {/* Category Filter Pills Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="w-4 h-4 text-accent" />
          <span className="font-semibold text-foreground">Filter by Categories:</span>
        </div>

        <div
          role="tablist"
          aria-label="Filter case studies by category"
          className="flex flex-wrap items-center gap-2"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const count = categoryCounts[category] ?? 0;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-surface text-muted-foreground hover:text-foreground border border-border hover:border-accent/40'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Case Study Card Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              variant="interactive"
              className="group flex flex-col h-full overflow-hidden border border-border hover:border-accent/50 transition-all duration-300"
            >
              {/* Card Top: Visual Mockup / Thumbnail with Category Badge */}
              <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-muted via-surface to-muted/80 overflow-hidden flex items-center justify-center border-b border-border">
                {/* Fallback Graphic Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Visual Category Badge in Thumbnail */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="default" size="sm" className="backdrop-blur-md bg-surface/90 shadow-sm">
                    {project.category}
                  </Badge>
                </div>

                {project.featured && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="accent" size="sm" className="shadow-sm">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}

                <Image
                  src={project.thumbnailUrl}
                  alt={`${project.title} case study thumbnail`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />

                <div className="p-4 text-center z-0">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {project.clientType}
                  </span>
                </div>
              </div>

              {/* Card Header */}
              <CardHeader className="p-6 pb-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span className="font-medium text-accent">{project.clientType}</span>
                  <span>{project.completedDate}</span>
                </div>

                <CardTitle className="text-xl font-bold group-hover:text-accent transition-colors line-clamp-2">
                  <Link href={`/portfolio/${project.slug}`} className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded">
                    {project.title}
                  </Link>
                </CardTitle>
              </CardHeader>

              {/* Card Content */}
              <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-between">
                <CardDescription className="line-clamp-3 text-sm text-muted-foreground mt-2 leading-relaxed">
                  {project.summary}
                </CardDescription>

                {/* Key Metric Highlight */}
                {project.results.length > 0 && (
                  <div className="mt-5 p-3 rounded-lg bg-muted/50 border border-border flex items-baseline gap-2">
                    <span className="text-xl font-black text-accent">
                      {project.results[0].metric}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground line-clamp-1">
                      {project.results[0].label}
                    </span>
                  </div>
                )}

                {/* Tech Stack Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" size="sm">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" size="sm">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>

              {/* Card Footer with Direct Action Link */}
              <CardFooter className="p-6 pt-3 border-t border-border/60 flex items-center justify-between">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-hover group/link"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover/link:translate-x-1" />
                </Link>

                <span className="text-xs text-muted-foreground">
                  {project.results.length} metrics verified
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State Handling */
        <div className="py-20 px-6 text-center rounded-2xl border border-dashed border-border bg-surface/50 mt-10">
          <FolderGit2 className="w-12 h-12 mx-auto text-muted-foreground/60 mb-4" />
          <h3 className="text-xl font-bold text-foreground">No Case Studies Found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            There are currently no case studies published under the &ldquo;{activeCategory}&rdquo; category.
          </p>
          <Button
            variant="outline"
            size="md"
            className="mt-6"
            onClick={() => setActiveCategory('All')}
          >
            Reset to All Categories
          </Button>
        </div>
      )}
    </div>
  );
}
