'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '@/content/queries';

export interface GalleryViewfinderProps {
  project: ProjectItem;
  rowRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

export function GalleryViewfinder({ project, rowRef, className = '' }: GalleryViewfinderProps) {
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked continuous micro-parallax within this active project's height
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  // Micro-parallax drift: drifts -18px to +18px as row scrolls across viewport
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-18, 18]
  );

  return (
    <motion.div
      layoutId="gallery-viewfinder"
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 28,
        mass: 0.5,
      }}
      className={`relative w-full aspect-[16/10] overflow-hidden border border-border bg-card shadow-hard-sm group/viewfinder ${className}`.trim()}
    >
      {/* Precision Corner Hairlines (Architectural Monograph Aesthetic) */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-accent" />
        <div className="absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-accent" />
        <div className="absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-accent" />
        <div className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-accent" />
      </div>

      {/* Top Telemetry Tag */}
      <div className="pointer-events-none absolute left-3 top-3 z-20 flex items-center gap-2">
        <span className="bg-background/85 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/90 backdrop-blur-sm border border-border/60">
          {project.category}
        </span>
      </div>

      {/* Bottom Action Tag */}
      <div className="pointer-events-none absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-background/85 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/90 backdrop-blur-sm border border-border/60 transition-colors group-hover/viewfinder:text-accent">
        <span>View Study</span>
        <ArrowUpRight className="h-3 w-3" />
      </div>

      {/* Parallax Container & Image Crossfade Engine */}
      <motion.div
        style={{ y: parallaxY }}
        className="relative h-[115%] w-full -top-[7.5%]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative h-full w-full"
          >
            <Image
              src={project.thumbnailUrl}
              alt={`${project.title} architectural case study preview`}
              fill
              sizes="(min-width: 1024px) 380px, 100vw"
              className="object-cover transition-transform duration-500 group-hover/viewfinder:scale-[1.02]"
              priority
              unoptimized
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
