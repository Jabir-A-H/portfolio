import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactBlock } from '@/components/sections/ContactBlock';

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description: `The studio, the people, and the way ${siteConfig.name} works.`,
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: `The studio, the people, and the way ${siteConfig.name} works.`,
    url: `${siteConfig.url}/about`,
    type: 'website',
  },
};

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

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col">
      <PageHeader
        label="Studio"
        title="A studio for the long run."
        lede={siteConfig.studio.statement}
        meta="Dhaka, Bangladesh"
      />

      <Section spacing="none" className="border-b border-border py-14 sm:py-20">
        <Container size="xl">
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 lg:col-span-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                The story
              </p>
              <div className="mt-6 space-y-5 text-[16px] leading-[1.75] text-foreground/85">
                <p>
                  Apex is an independent digital studio working across design and engineering. We
                  are small on purpose: the people you meet are the people who make the work.
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
                <Link
                  href="/team"
                  className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
                >
                  The people
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/process"
                  className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
                >
                  How we work
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
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
                      <h2 className="font-display text-2xl text-foreground">{commitment.title}</h2>
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

      <Section spacing="none" className="border-b border-border py-14 sm:py-20">
        <Container size="xl">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Operating principles
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
                    <h2 className="col-span-10 font-display text-2xl text-foreground sm:col-span-4 sm:text-[1.65rem]">
                      {value.title}
                    </h2>
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

      <Section spacing="none" className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid grid-cols-2 gap-y-8 border-t border-border pt-8 md:grid-cols-4">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl text-foreground sm:text-5xl">{stat.value}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ContactBlock />
    </div>
  );
}
