'use client';

import * as React from 'react';
import { motion, type MotionProps } from 'framer-motion';

interface ScrollRevealProps extends Omit<MotionProps, 'variants' | 'initial' | 'whileInView' | 'viewport' | 'transition'> {
  /** Stagger delay for children (ms) */
  stagger?: number;
  /** Delay before starting the reveal (ms) */
  delay?: number;
  /** Animation variant for children */
  variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';
  /** Only animate once (default: true) */
  once?: boolean;
  /** Viewport margin for intersection observer */
  margin?: string;
  /** Custom className */
  className?: string;
  children: React.ReactNode;
}

interface RevealItemProps
  extends Omit<MotionProps, 'variants' | 'initial' | 'whileInView' | 'viewport' | 'transition'> {
  /** Animation delay (ms) */
  delay?: number;
  /** Animation variant to use */
  variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';
  /** Only animate once (default: true) */
  once?: boolean;
  /** Viewport margin for intersection observer */
  margin?: string;
  /** Custom className */
  className?: string;
  /** Element to render as (passed to motion.div as prop) */
  as?: React.ElementType;
  children: React.ReactNode;
}

const variantMap = {
  'fade-up': { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  'fade-in': { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  'slide-left': { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
  'slide-right': { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
  'scale-up': { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
};

const baseTransition = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function ScrollReveal({
  stagger = 100,
  delay = 0,
  variant = 'fade-up',
  once = true,
  margin = '0px 0px -100px 0px',
  className = '',
  children,
  ...props
}: ScrollRevealProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger / 1000,
        delayChildren: delay / 1000,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<{ variants?: unknown; transition?: unknown }>, {
          variants: variantMap[variant],
          transition: baseTransition,
        });
      })}
    </motion.div>
  );
}

export function RevealItem({
  delay = 0,
  variant = 'fade-up',
  once = true,
  margin = '0px 0px -100px 0px',
  className = '',
  as: Component = 'div',
  children,
  ...props
}: RevealItemProps) {
  // Use the appropriate motion component based on the 'as' prop
  const motionComponents = {
    div: motion.div,
    span: motion.span,
    p: motion.p,
    section: motion.section,
    article: motion.article,
    header: motion.header,
    footer: motion.footer,
    main: motion.main,
    aside: motion.aside,
    nav: motion.nav,
    button: motion.button,
    a: motion.a,
    li: motion.li,
    ul: motion.ul,
    ol: motion.ol,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    h4: motion.h4,
    h5: motion.h5,
    h6: motion.h6,
  } as const;

  const MotionComponent = motionComponents[Component as keyof typeof motionComponents] || motion.div;

  return (
    <MotionComponent
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      transition={{ ...baseTransition, delay: delay / 1000 }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}