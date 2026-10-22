import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

interface PageHeaderProps {
  label: string;
  title: string;
  lede: string;
  meta?: string;
}

/**
 * The opening spread for an interior page: a small ordinal, one large serif
 * statement, and the supporting note set in the right margin.
 */
export function PageHeader({ label, title, lede, meta }: PageHeaderProps) {
  return (
    <Section spacing="none" className="border-b border-border pb-10 pt-16 sm:pb-14 sm:pt-20">
      <Container size="xl">
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {label}
            </p>
            <h1 className="mt-4 max-w-[18ch] text-balance font-display text-display-lg text-foreground">
              {title}
            </h1>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:justify-self-end">
            <p className="max-w-[42ch] text-[15px] leading-[1.7] text-muted-foreground">{lede}</p>
            {meta && (
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                {meta}
              </p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
