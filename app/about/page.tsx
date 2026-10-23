import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { getTeamMembers } from '@/content/queries';
import { createPageMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactBlock } from '@/components/sections/ContactBlock';

export const metadata: Metadata = createPageMetadata({
  title: 'Studio',
  description: `The dossier, leadership, standards, and core commitments of ${siteConfig.name}.`,
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
      'Zero proprietary runtimes or single-vendor entrapments. Standard HTML, standard CSS, portable static output.',
  },
  {
    title: 'Plain contracts',
    detail:
      'Fixed-price agreements with measurable deliverables and verifiable milestones. No open-ended retainers without scope.',
  },
  {
    title: 'Complete ownership',
    detail:
      'Repositories, environment configuration, and deployment credentials are handed over at the end. Nothing is held back.',
  },
];

const values = [
  {
    title: 'Evidence over claims',
    detail:
      'Every number we publish comes from a running system. If we say 99.98% uptime, there is a dashboard behind it.',
  },
  {
    title: 'Code as documentation',
    detail:
      'Architecture that can be explained in five sentences or fewer. If an onboarding engineer cannot understand a module in ten minutes, it gets rewritten.',
  },
  {
    title: 'Quiet interfaces',
    detail:
      'We build tools people use for hours a day. Motion is subtle, typography is legible, and high-density layouts show signal over noise.',
  },
  {
    title: 'Delivery in the room',
    detail:
      'The three founders who scope your project are the same three who review every PR and answer emergency escalation calls.',
  },
];

const standards = [
  {
    title: 'Zero Brand Leaks',
    detail: 'Automated CI scanners verify all strings remain strictly decoupled from code.',
  },
  {
    title: '100% Type Soundness',
    detail: 'Zero TypeScript errors, strict mode enabled across every module without exceptions.',
  },
  {
    title: 'Edge-Prerendered',
    detail: 'Pre-rendered static HTML with instantaneous TTFB and zero client-side flicker.',
  },
];

export default function AboutPage() {
  const teamMembers = getTeamMembers();

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
            href="#commitments"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            03 Commitments &amp; Standards
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

            {/* Studio Workspace Environment Proof */}
            <div className="mt-16 border-t border-border pt-12">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2px] border border-border bg-muted">
                <Image
                  src="/images/studio/workspace-dhaka.jpg"
                  alt="Studio workspace in Dhaka, Bangladesh"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Studio Workspace &bull; Dhaka, Bangladesh
                </p>
                <p className="font-mono text-[11px] text-muted-foreground/80">
                  Where client platforms, automations, and engineering systems are built.
                </p>
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

            <div className="grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <div key={member.id} className="flex flex-col space-y-4">
                  {member.photoUrl && (
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] border border-border bg-muted">
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </div>
                  )}
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {String(index + 1).padStart(2, '0')} / {member.role || 'Co-founder'}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-foreground sm:text-[1.75rem]">
                    {member.name}
                  </h3>
                  {member.bio && (
                    <p className="text-[13px] leading-relaxed text-muted-foreground">
                      {member.bio}
                    </p>
                  )}
                  {member.socials && member.socials.length > 0 && (
                    <div className="pt-1">
                      {member.socials.map((social) => (
                        <a
                          key={social.url}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:text-accent"
                        >
                          <span>LinkedIn</span>
                          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      ))}
                    </div>
                  )}
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
      {/* CHAPTER 3: Studio Commitments, Standards & Metrics                   */}
      {/* ==================================================================== */}
      <section id="commitments" className="scroll-mt-32">
        <Section spacing="none" className="border-b border-border py-14 sm:py-20">
          <Container size="xl">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="col-span-12 lg:col-span-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Chapter 03 / Commitments &amp; Metrics
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

              {/* Seamless link to dedicated /process page */}
              <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
                <p className="max-w-[56ch] text-[14px] leading-relaxed text-muted-foreground">
                  Looking for our full 6-step engineering delivery methodology and deliverables breakdown?
                </p>
                <Link
                  href="/process"
                  className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Explore delivery methodology
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </section>

      <ContactBlock />
    </div>
  );
}
