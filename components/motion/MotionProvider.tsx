'use client';

import * as React from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';

interface MotionProviderProps {
  children: React.ReactNode;
}

/**
 * MotionProvider — thin client boundary for the motion layer.
 * - Centralizes reduced-motion preference
 * - Provides "The Gallery" default transition config
 * - Keeps 'use client' confined to this leaf + consumers
 */
export function MotionProvider({
  children,
}: MotionProviderProps) {
  const reducedMotion = useReducedMotion();

  return (
    <MotionConfig
      transition={{
        type: reducedMotion ? 'tween' : 'spring',
        stiffness: 120,
        damping: 18,
        mass: 0.8,
      }}
    >
      {children}
    </MotionConfig>
  );
}