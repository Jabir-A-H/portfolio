'use client';

import * as React from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxProps {
  /** Parallax speed multiplier (0.1 = subtle, 0.5 = strong) */
  speed?: number;
  /** Direction of parallax */
  direction?: 'vertical' | 'horizontal';
  /** Content to apply parallax to */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Additional style overrides */
  style?: React.CSSProperties;
}

export function Parallax({
  speed = 0.2,
  direction = 'vertical',
  children,
  className = '',
  style,
}: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `-${speed * 100}%`]);
  const x = useTransform(scrollYProgress, [0, 1], [`${speed * 50}%`, `-${speed * 50}%`]);

  const transformStyle = React.useMemo(() => {
    if (direction === 'vertical') {
      return { y } as { y: MotionValue<string>; x?: never };
    }
    return { x } as { x: MotionValue<string>; y?: never };
  }, [direction, x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        willChange: 'transform',
      } as React.CSSProperties}
    >
      <motion.div style={transformStyle}>{children}</motion.div>
    </motion.div>
  );
}

/**
 * ParallaxLayer — for layered depth effects (background, midground, foreground)
 * speed: 0 = fixed, 0.5 = half scroll speed, 1 = normal scroll, >1 = faster than scroll
 */
interface ParallaxLayerProps {
  speed: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxLayer({
  speed,
  children,
  className = '',
  style,
}: ParallaxLayerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${(1 - speed) * 100}%`, `-${(1 - speed) * 100}%`]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        willChange: 'transform',
      } as React.CSSProperties}
    >
      <motion.div style={{ y }}>{children}</motion.div>
    </motion.div>
  );
}