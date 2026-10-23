import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { getTeamMembers } from '@/content/queries';
import { createPageMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactBlock } from '@/components/sections/ContactBlock';

export const metadata: Metadata = createPageMetadata({
  title: 'Studio',
  description: `The dossier, leadership, and operational track record of ${siteConfig.name}.`,
  path: '/about',
});

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

      {/* ==================================================================== */}
      {/* SECTION 1: The Story & Workspace Proof                              */}
      {/* ==================================================================== */}
      <Section spacing="none" className="border-b border-border py-14 sm:py-20">
        <Container size="xl">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                The Story
              </p>
            </div>
            <div className="col-span-12 space-y-6 text-[16px] leading-[1.8] text-foreground/85 lg:col-span-8 lg:col-start-5">
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

      {/* ==================================================================== */}
      {/* SECTION 2: Leadership ("Three founders, one room")                    */}
      {/* ==================================================================== */}
      <section id="leadership" className="scroll-mt-32">
        <Section spacing="none" className="border-b border-border py-14 sm:py-20">
          <Container size="xl">
            <div className="grid grid-cols-12 gap-x-6 gap-y-6 pb-10">
              <div className="col-span-12 lg:col-span-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Leadership
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
                <article
                  key={member.id}
                  className="group flex flex-col justify-between border border-border bg-card/40 p-6 transition-colors hover:border-foreground/30"
                >
                  <div>
                    {member.photoUrl && (
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] border border-border bg-muted">
                        <Image
                          src={member.photoUrl}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}

                    <div className="mt-6 flex items-baseline justify-between gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                        {member.role || 'Co-founder'}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl text-foreground sm:text-[1.85rem]">
                      {member.name}
                    </h3>

                    {member.bio && (
                      <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
                        {member.bio}
                      </p>
                    )}

                    {member.skills && member.skills.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-[2px] border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {member.socials && member.socials.length > 0 && (
                    <div className="mt-6 border-t border-border pt-4">
                      {member.socials.map((social) => (
                        <a
                          key={social.url}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:text-accent"
                        >
                          <span>LinkedIn Profile</span>
                          <ArrowUpRight className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-12 border-t border-border/60 pt-8">
              <p className="max-w-[62ch] text-[15px] leading-[1.7] text-foreground/80">
                Every project is led by a founder from inception through deployment and ongoing
                maintenance. The studio stays small so this remains true.
              </p>
            </div>
          </Container>
        </Section>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 3: Measured Outcomes & Metrics                               */}
      {/* ==================================================================== */}
      <Section spacing="none" className="border-b border-border py-14 sm:py-20">
        <Container size="xl">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Outcomes
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

      <ContactBlock />
    </div>
  );
}
