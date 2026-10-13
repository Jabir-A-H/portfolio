import * as React from 'react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

export function StatsStrip() {
  return (
    <Section spacing="md" className="bg-surface border-y border-border">
      <Container size="xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {siteConfig.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-muted/30 transition-colors"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-accent tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-sm sm:text-base font-semibold text-foreground">
                {stat.label}
              </div>
              {stat.description && (
                <div className="mt-1 text-xs text-muted-foreground/75 font-mono">
                  [PLACEHOLDER]
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
