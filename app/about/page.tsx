import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { getTeamMembers, getProcessSteps } from '@/content/queries';
import { createPageMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactBlock } from '@/components/sections/ContactBlock';

export const metadata: Metadata = createPageMetadata({
  title: 'Studio',
  description: `The dossier, leadership, delivery method, and core commitments of ${siteConfig.name}.`,
  path: '/about',
});

const commitments = [
  {
    title: 'Static first',
    detail:
      'Pages are generated ahead of time and served from the edge. Fewer moving parts, nothing to patch at 2am.',
  },
  {
    title: 'No lock-in',
    detail:
      'One content model, one design system, plain TypeScript. The code and the accounts stay yours.',
  },
  {
    title: 'Measured outcomes',
    detail:
      'Every engagement starts with a number that matters and ends with evidence of whether we moved it.',
  },
];

const values = [
  {
    title: 'Engineering rigor',
    detail:
      'Types, tests, and documentation are part of the work, not an afterthought. We build things that can be read six months later.',
  },
  {
    title: 'Direct talk',
    detail:
      'You hear about a slip the day we know about it. No status theatre, no invented certainty.',
  },
  {
    title: 'Care for the surface',
    detail:
      'Performance and usability are the same problem. A fast page that is confusing is still a bad page.',
  },
  {
    title: 'Longevity',
    detail:
      'We would rather ship a smaller system that survives than a large one that has to be replaced next year.',
  },
];

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

export default function AboutPage() {
  const teamMembers = getTeamMembers();
  const processSteps = getProcessSteps();

  return (
    <div className="flex w-full flex-col">
      <PageHeader
        label="Studio Dossier"
        title="A studio for the long run."
        lede={siteConfig.description}
        meta="Dhaka, Bangladesh"
      />

      {/* Chapter Navigation Anchors */}
      <div className="sticky top-[72px] z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <Container size="xl" className="flex items-center gap-6 overflow-x-auto py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60">
            Dossier Chapters:
          </span>
          <a
            href="#story"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            01 Story &amp; Philosophy
          </a>
          <a
            href="#leadership"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            02 Leadership
          </a>
          <a
            href="#method"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            03 Method &amp; Standards
          </a>
          <a
            href="#commitments"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            04 Commitments &amp; Metrics
          </a>
        </Container>
      </div>

      {/* ==================================================================== */}
      {/* CHAPTER 1: The Story & Philosophy                                    */}
      {/* ==================================================================== */}
      <section id="story" className="scroll-mt-32">
        <Section spacing="none" className="border-b border-border py-14 sm:py-20">
          <Container size="xl">
            <div className="grid grid-cols-12 gap-x-6 gap-y-12">
              <div className="col-span-12 lg:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Chapter 01 / The story
                </p>
                <div className="mt-6 space-y-5 text-[16px] leading-[1.75] text-foreground/85">
                  <p>
                    {siteConfig.name} is an independent digital studio working across design and
                    engineering. We are small on purpose: the people you meet are the people who
                    make the work.
                  </p>
                  <p>
                    The studio started in Dhaka with three founders and a shared frustration. Large
                    consultancies moved too slowly, and freelance teams left nothing behind. We
                    wanted a third option: a small group that could take responsibility for a system
                    from the first sketch to the years of maintenance after launch.
                  </p>
                  <p>
                    Today we work with teams in North America, Europe, and Asia-Pacific on web
                    platforms, mobile products, automation, and brand systems. The work is different
                    each time. The method is not.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  <a
                    href="#leadership"
                    className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
                  >
                    The people
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#method"
                    className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
                  >
                    How we work
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4 lg:col-start-9">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  What we hold to
                </p>
                <ul className="mt-6 border-t border-border">
                  {commitments.map((commitment, index) => (
                    <li key={commitment.title} className="border-b border-border py-5">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-display text-2xl text-foreground">{commitment.title}</h3>
                      </div>
                      <p className="mt-2 pl-8 text-[13px] leading-relaxed text-muted-foreground">
                        {commitment.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* Mission and Vision */}
        <Section spacing="none" className="border-b border-border py-14 sm:py-20">
          <Container size="xl">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="col-span-12 lg:col-span-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Mission and vision
                </p>
              </div>
              <div className="col-span-12 grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
                <div>
                  <h2 className="font-display text-3xl text-foreground">Mission</h2>
                  <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">
                    Make software that removes work instead of creating it. Reliable systems, plain
                    interfaces, and a maintenance plan that outlives the launch.
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-3xl text-foreground">Vision</h2>
                  <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">
                    A studio known for the things it declines as much as the things it ships. Small,
                    senior, and still answering the phone years after handover.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Operating Principles / Core Values */}
        <Section spacing="none" className="border-b border-border py-14 sm:py-20">
          <Container size="xl">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="col-span-12 lg:col-span-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Core values &amp; principles
                </p>
              </div>
              <div className="col-span-12 lg:col-span-9">
                <div className="border-t border-border">
                  {values.map((value, index) => (
                    <div
                      key={value.title}
                      className="grid grid-cols-12 gap-x-4 gap-y-2 border-b border-border py-6"
                    >
                      <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:col-span-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="col-span-10 font-display text-2xl text-foreground sm:col-span-4 sm:text-[1.65rem]">
                        {value.title}
                      </h3>
                      <p className="col-span-10 col-start-3 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground sm:col-span-7 sm:col-start-6">
                        {value.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </section>

      {/* ==================================================================== */}
      {/* CHAPTER 2: Leadership                                                */}
      {/* ==================================================================== */}
      <section id="leadership" className="scroll-mt-32">
        <Section spacing="none" className="border-b border-border py-14 sm:py-20">
          <Container size="xl">
            <div className="grid grid-cols-12 gap-x-6 gap-y-6 pb-10">
              <div className="col-span-12 lg:col-span-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Chapter 02 / Leadership
                </p>
                <h2 className="mt-4 font-display text-display-md text-foreground">
                  Three founders, one room.
                </h2>
              </div>
              <p className="col-span-12 max-w-[42ch] text-[15px] leading-[1.7] text-muted-foreground lg:col-span-4 lg:justify-self-end">
                No account layer, no handover to a junior team. The people who scope the work are
                the people who make it.
              </p>
            </div>

            <div className="border-t border-border">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 border-b border-border py-8 sm:py-10"
                >
                  <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:col-span-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="col-span-10 font-display text-[2.1rem] leading-[1.02] text-foreground sm:col-span-7 sm:text-[3.1rem]">
                    {member.name}
                  </h3>

                  <p className="col-span-10 col-start-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:col-span-2 sm:col-start-auto">
                    {member.role || 'Co-founder'}
                  </p>

                  <span className="hidden sm:block sm:col-span-2" aria-hidden="true" />
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <p className="max-w-[56ch] text-[15px] leading-[1.7] text-foreground/80">
                Every project is led by a founder from inception through deployment and ongoing SLA
                monitoring.
              </p>
              <Link
                href="/team"
                className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                View dedicated team page
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Container>
        </Section>
      </section>

      {/* ==================================================================== */}
      {/* CHAPTER 3: Delivery Method & Standards                               */}
      {/* ==================================================================== */}
      <section id="method" className="scroll-mt-32">
        <Section spacing="none" className="border-b border-border py-14 sm:py-20">
          <Container size="xl">
            <div className="grid grid-cols-12 gap-x-6 gap-y-6 pb-10">
              <div className="col-span-12 lg:col-span-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Chapter 03 / Method &amp; Standards
                </p>
                <h2 className="mt-4 font-display text-display-md text-foreground">
                  How we work.
                </h2>
              </div>
              <p className="col-span-12 max-w-[42ch] text-[15px] leading-[1.7] text-muted-foreground lg:col-span-4 lg:justify-self-end">
                Six steps, in the same order every time. Typical engagement runs 6 to 12 weeks.
              </p>
            </div>

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
                    <h3 className="max-w-[18ch] font-display text-[1.8rem] leading-[1.05] text-foreground sm:text-[2rem]">
                      {step.title}
                    </h3>
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

            {/* Standards block */}
            <div className="mt-16 border-t border-border pt-12">
              <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                <div className="col-span-12 lg:col-span-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Engineering Standards
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-foreground">
                    What does not change.
                  </h3>
                </div>

                <div className="col-span-12 grid gap-8 sm:grid-cols-3 lg:col-span-9">
                  {standards.map((standard) => (
                    <div key={standard.title} className="border-t border-border pt-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <h4 className="font-display text-xl text-foreground">{standard.title}</h4>
                      </div>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                        {standard.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <Link
                  href="/process"
                  className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  View standalone methodology page
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </section>

      {/* ==================================================================== */}
      {/* CHAPTER 4: Studio Commitments & Measured Metrics                     */}
      {/* ==================================================================== */}
      <section id="commitments" className="scroll-mt-32">
        <Section spacing="none" className="border-b border-border py-14 sm:py-20">
          <Container size="xl">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="col-span-12 lg:col-span-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Chapter 04 / Commitments &amp; Metrics
                </p>
                <h2 className="mt-4 font-display text-display-md text-foreground">
                  Measured outcomes.
                </h2>
                <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.7] text-muted-foreground">
                  Every metric reflects tangible production systems shipped and maintained across
                  international markets.
                </p>
              </div>

              <div className="col-span-12 lg:col-span-8">
                <div className="grid grid-cols-2 gap-y-10 border-t border-border pt-8 md:grid-cols-4">
                  {siteConfig.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display text-4xl text-foreground sm:text-5xl">{stat.value}</p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </section>

      <ContactBlock />
    </div>
  );
}
