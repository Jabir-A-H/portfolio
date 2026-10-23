import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '@/content/queries';

export const SHORT_CATEGORY_MAP: Record<string, string> = {
  'Web & Software': 'Web',
  'Mobile & Games': 'Mobile',
  'Automation & Integration': 'Automation',
  Creative: 'Creative',
};

export interface ProjectRowProps {
  project: ProjectItem;
  index: number;
  variant?: 'compact' | 'detailed';
  headingTag?: 'h2' | 'h3';
  showCompletedDate?: boolean;
  className?: string;
}

export function ProjectRow({
  project,
  index,
  variant = 'compact',
  headingTag: HeadingTag = variant === 'detailed' ? 'h2' : 'h3',
  showCompletedDate = true,
  className = '',
}: ProjectRowProps) {
  const headlineResult = project.results?.[0];
  const shortCategory = SHORT_CATEGORY_MAP[project.category] ?? project.category;
  const isDetailed = variant === 'detailed';

  const defaultWrapperClass = isDetailed
    ? 'group block border-b border-border py-7 transition-colors hover:border-foreground/60 sm:py-9'
    : 'group block py-10 transition-colors sm:py-14';

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={`${defaultWrapperClass} ${className}`.trim()}
    >
      <div className={`grid grid-cols-12 items-start gap-x-4 ${isDetailed ? 'gap-y-3' : 'gap-y-2'}`}>
        {/* Mobile Header: Index + Short Category + Arrow */}
        <div className="col-span-12 mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:hidden">
          <span>
            {String(index + 1).padStart(2, '0')}
            <span className="ml-3 text-muted-foreground/70">{shortCategory}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 text-foreground/50" />
        </div>

        {/* Desktop Index Column */}
        <span className="col-span-2 hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
          {String(index + 1).padStart(2, '0')}
          <span className="mt-1.5 block text-muted-foreground/70">{shortCategory}</span>
        </span>

        {/* Main Content Column */}
        <div className={isDetailed ? 'col-span-12 sm:col-span-6' : 'col-span-12 sm:col-span-6'}>
          <HeadingTag
            className={`font-display text-[1.9rem] leading-[1.02] text-foreground transition-colors group-hover:text-accent ${
              isDetailed ? 'sm:text-[2.4rem]' : 'sm:text-[2.6rem]'
            }`}
          >
            {project.title}
          </HeadingTag>

          {isDetailed && project.summary && (
            <p className="mt-2 max-w-[54ch] text-[13px] leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          )}

          {isDetailed && project.technologies && project.technologies.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/70">
              {project.technologies.slice(0, 4).map((tech, techIndex) => (
                <span key={tech}>
                  {techIndex > 0 && <span className="mr-3 text-border">/</span>}
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Metadata & Metric Column */}
        <div
          className={
            isDetailed
              ? 'col-span-12 grid grid-cols-2 gap-4 sm:col-span-3 sm:mt-1 sm:block'
              : 'col-span-12 flex flex-col gap-1 sm:col-span-3 sm:mt-1'
          }
        >
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {project.clientType}
            </span>
            {showCompletedDate && project.completedDate && (
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60">
                {project.completedDate}
              </span>
            )}
          </div>

          {headlineResult && (
            <div
              className={`text-[13px] leading-snug text-foreground/80 ${
                isDetailed ? 'sm:mt-3' : ''
              }`}
            >
              <span className="font-mono text-[11px] text-accent">
                {headlineResult.metric}
              </span>{' '}
              {headlineResult.label}
            </div>
          )}
        </div>

        {/* Desktop Arrow Column */}
        <span className="hidden justify-end text-foreground/50 transition-colors group-hover:text-accent sm:col-span-1 sm:flex">
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
