'use client';

import * as React from 'react';
import type { ProjectItem } from '@/content/queries';
import { ProjectRow } from '@/components/portfolio/ProjectRow';
import { GalleryViewfinder } from '@/components/portfolio/GalleryViewfinder';

export interface InteractiveWorkGalleryProps {
  projects: ProjectItem[];
  variant?: 'compact' | 'detailed';
  headingTag?: 'h2' | 'h3';
  showCompletedDate?: boolean;
}

export function InteractiveWorkGallery({
  projects,
  variant = 'compact',
  headingTag = variant === 'detailed' ? 'h2' : 'h3',
  showCompletedDate = true,
}: InteractiveWorkGalleryProps) {
  const [activeSlug, setActiveSlug] = React.useState<string>(projects[0]?.slug ?? '');
  const [hoveredSlug, setHoveredSlug] = React.useState<string | null>(null);

  // References to each row DOM node for intersection observer & scroll-linked parallax
  const rowElements = React.useRef<Map<string, HTMLDivElement>>(new Map());
  const activeRowRef = React.useRef<HTMLDivElement | null>(null);

  const currentActiveSlug = hoveredSlug ?? activeSlug;
  const activeProject = React.useMemo(() => {
    return projects.find((p) => p.slug === currentActiveSlug) ?? projects[0];
  }, [projects, currentActiveSlug]);

  // Keep activeRowRef synchronized with the active DOM element
  React.useEffect(() => {
    if (activeProject) {
      activeRowRef.current = rowElements.current.get(activeProject.slug) ?? null;
    }
  }, [activeProject]);

  // Viewport scroll-boundary observer: automatically tracks active row as user scrolls
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Collect intersecting entries
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          // Select entry with largest intersection ratio or topmost in focal window
          const bestEntry = intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          const slug = bestEntry.target.getAttribute('data-project-slug');
          if (slug) {
            setActiveSlug(slug);
          }
        }
      },
      {
        // Central 40% vertical viewport focal band
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0.1, 0.3, 0.6, 0.9],
      }
    );

    rowElements.current.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projects]);

  const setRowRef = React.useCallback((slug: string) => {
    return (el: HTMLDivElement | null) => {
      if (el) {
        rowElements.current.set(slug, el);
      } else {
        rowElements.current.delete(slug);
      }
    };
  }, []);

  return (
    <div
      onPointerLeave={() => setHoveredSlug(null)}
      className="relative w-full"
    >
      {projects.map((project, index) => {
        const isActive = project.slug === currentActiveSlug;

        return (
          <ProjectRow
            key={project.id}
            ref={setRowRef(project.slug)}
            project={project}
            index={index}
            variant={variant}
            headingTag={headingTag}
            showCompletedDate={showCompletedDate}
            isActive={isActive}
            onPointerEnter={() => setHoveredSlug(project.slug)}
            dockSlot={
              isActive && activeProject ? (
                <GalleryViewfinder
                  project={activeProject}
                  rowRef={activeRowRef}
                />
              ) : null
            }
          />
        );
      })}
    </div>
  );
}
