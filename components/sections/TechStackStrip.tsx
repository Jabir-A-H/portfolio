import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';

interface TechItem {
  name: string;
  category: string;
}

const technologies: TechItem[] = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Flutter', category: 'Mobile' },
  { name: 'Unity', category: 'Game Engine' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend / AI' },
  { name: 'FastAPI', category: 'APIs' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Redis', category: 'Cache' },
  { name: 'Docker', category: 'DevOps' },
];

export function TechStackStrip() {
  return (
    <Section index={7} label="STACK" spacing="md" id="tech-stack" className="bg-muted/20 border-t border-border/60">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <Badge variant="accent" size="sm" className="mb-2">
            Modern Tech Stack & Tools
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Technologies Engineered for Speed and Scale
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            We build with battle-tested frameworks, cloud infrastructure, and modern languages.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-border/60 bg-surface hover:border-accent hover:shadow-sm transition-all text-center"
            >
              <span className="font-semibold text-sm text-foreground">{tech.name}</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">{tech.category}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
