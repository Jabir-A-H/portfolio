import type { Metadata } from 'next';
import { processSteps } from '@/content/process';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactBlock } from '@/components/sections/ContactBlock';

export const metadata: Metadata = {
  title: `Process | ${siteConfig.name}`,
  description: `The six-step method ${siteConfig.name} uses to take a product from discovery to maintenance.`,
  openGraph: {
    title: `Process | ${siteConfig.name}`,
    description: `The six-step method ${siteConfig.name} uses to take a product from discovery to maintenance.`,
    url: `${siteConfig.url}/process`,
    type: 'website',
  },
};

const standards = [
  {
    title: 'Type safety and tests',
    detail:
      'Strict TypeScript, no silent any, and an automated suite that runs on every change. If a regression gets through, the gate failed and the gate gets fixed.',
  },
  {
    title: 'Speed as a requirement',
    detail:
      'A static export, compressed assets, and no render-blocking debt. We measure Lighthouse before handover, not after launch.',
  },
  {
    title: 'Complete ownership',
    detail:
      'Repositories, environment configuration, and deployment credentials are handed over at the end. Nothing is held back.',
  },
];

export default function ProcessPage() {
  return (
    <div className="flex w-full flex-col">
      <PageHeader
        label="Method"
        title="How we work."
        lede="Six steps, in the same order every time. The scope changes; the sequence does not."
        meta="Typical engagement: 6 to 12 weeks"
      />

      <Section spacing="none" className="border-b border-border py-14 sm:py-20">
        <Container size="xl">
          <div className="border-t border-border">
            {processSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="grid grid-cols-12 gap-x-6 gap-y-4 border-b border-border py-8 sm:py-10"
              >
                <div className="col-span-12 sm:col-span-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Step {String(step.stepNumber).padStart(2, '0')}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60">
                    {step.timeline}
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-4">
                  <h2 className="max-w-[18ch] font-display text-[1.9rem] leading-[1.05] text-foreground sm:text-[2.1rem]">
                    {step.title}
                  </h2>
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <p className="max-w-[58ch] text-[15px] leading-[1.75] text-muted-foreground">
                    {step.detailedDescription}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/75">
                    {step.deliverables.map((deliverable, index) => (
                      <li key={deliverable}>
                        {index > 0 && <span className="mr-2 text-border">/</span>}
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="border-b border-border py-14 sm:py-20">
        <Container size="xl">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Standards
              </p>
              <h2 className="mt-4 max-w-[14ch] font-display text-3xl text-foreground">
                What does not change.
              </h2>
            </div>

            <div className="col-span-12 grid gap-8 sm:grid-cols-3 lg:col-span-9">
              {standards.map((standard) => (
                <div key={standard.title} className="border-t border-border pt-5">
                  <h3 className="font-display text-2xl text-foreground">{standard.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                    {standard.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <ContactBlock />
    </div>
  );
}
