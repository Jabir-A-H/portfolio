'use client';

import * as React from 'react';
import type { ProjectItem } from '@/content/queries';
import { InteractiveWorkGallery } from '@/components/portfolio/InteractiveWorkGallery';

interface PortfolioFilterGridProps {
  projects: ProjectItem[];
  categories: string[];
}

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
        <InteractiveWorkGallery
          key={activeCategory}
          projects={filteredProjects}
          variant="detailed"
          headingTag="h2"
          showCompletedDate={true}
        />
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
