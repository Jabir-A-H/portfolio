'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '@/content/projects';

interface PortfolioFilterGridProps {
  projects: ProjectItem[];
  categories: string[];
}

const shortCategory: Record<string, string> = {
  'Web & Software': 'Web',
  'Mobile & Games': 'Mobile',
  'Automation & Integration': 'Automation',
  Creative: 'Creative',
};

export function PortfolioFilterGrid({ projects, categories }: PortfolioFilterGridProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>('All');

  const filteredProjects = React.useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [projects, activeCategory]);

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
      <div className="flex flex-col gap-5 border-b border-border pb-5 sm:flex-row sm:items-baseline sm:justify-between">
        <div
          role="tablist"
          aria-label="Filter case studies by category"
          className="-mx-1 flex items-baseline gap-1 overflow-x-auto pb-1"
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
                className={`shrink-0 border-b px-2 pb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                  isActive
                    ? 'border-accent text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
                <span className="ml-2 text-muted-foreground/60">{count}</span>
              </button>
            );
          })}
        </div>

        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
        </p>
      </div>

      {filteredProjects.length > 0 ? (
        <div>
          {filteredProjects.map((project, index) => {
            const result = project.results?.[0];

            return (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group block border-b border-border py-7 transition-colors hover:border-foreground/60 sm:py-9"
              >
                <div className="grid grid-cols-12 items-start gap-x-4 gap-y-3">
                  <div className="col-span-12 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:hidden">
                    <span>
                      {String(index + 1).padStart(2, '0')}
                      <span className="ml-3 text-muted-foreground/70">
                        {shortCategory[project.category] ?? project.category}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-foreground/50" />
                  </div>

                  <span className="col-span-2 hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
                    {String(index + 1).padStart(2, '0')}
                    <span className="mt-1.5 block text-muted-foreground/70">
                      {shortCategory[project.category] ?? project.category}
                    </span>
                  </span>

                  <div className="col-span-12 sm:col-span-6">
                    <h2 className="font-display text-[1.9rem] leading-[1.02] text-foreground transition-colors group-hover:text-accent sm:text-[2.4rem]">
                      {project.title}
                    </h2>
                    <p className="mt-2 max-w-[54ch] text-[13px] leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/70">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span key={tech}>
                          {techIndex > 0 && <span className="mr-3 text-border">/</span>}
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-12 grid grid-cols-2 gap-4 sm:col-span-3 sm:mt-1 sm:block">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {project.clientType}
                      </span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60">
                        {project.completedDate}
                      </span>
                    </div>
                    {result && (
                      <div className="text-[13px] leading-snug text-foreground/80 sm:mt-3">
                        <span className="font-mono text-[11px] text-accent">{result.metric}</span>{' '}
                        {result.label}
                      </div>
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
      ) : (
        <div className="py-20 text-center">
          <p className="font-display text-3xl text-foreground">Nothing filed under {activeCategory}.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            That part of the archive is still being documented.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className="mt-6 border-b border-foreground/30 pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Show all projects
          </button>
        </div>
      )}
    </div>
  );
}
