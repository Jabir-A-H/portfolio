import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getTeamMembers } from '@/content/queries';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactBlock } from '@/components/sections/ContactBlock';

export const metadata: Metadata = createPageMetadata({
  title: 'Leadership Team',
  description: `The founders of ${siteConfig.name}: Nasib Mohammad Arif, Abu Sayed Md Saad, and Jabir Abdullah Haian.`,
  path: '/team',
});

export default function TeamPage() {
  const teamMembers = getTeamMembers();

  return (
    <div className="flex w-full flex-col">
      <div className="border-b border-border bg-background">
        <Container
          size="xl"
          className="flex items-center justify-between py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Link href="/about" className="transition-colors hover:text-foreground">
              Studio Dossier
            </Link>
            <span>/</span>
            <span className="text-foreground">Leadership</span>
          </div>
          <Link
            href="/about#leadership"
            className="group inline-flex items-center gap-1 transition-colors hover:text-accent"
          >
            Studio Chapter 02
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Container>
      </div>

      <PageHeader
        label="People &amp; Leadership"
        title="Three founders, one room."
        lede="No account layer, no handover to a junior team. The people who scope the work are the people who make it."
        meta="Dhaka, Bangladesh"
      />

      <Section spacing="none" className="border-b border-border py-14 sm:py-20">
        <Container size="xl">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
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

                  <h2 className="mt-3 font-display text-2xl text-foreground sm:text-[1.85rem]">
                    {member.name}
                  </h2>

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

          <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-6 border-t border-border pt-12">
            <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground lg:col-span-2">
              How we run
            </p>
            <p className="col-span-12 max-w-[62ch] text-[17px] leading-[1.7] text-foreground/85 lg:col-span-8">
              Every project is led by a founder. That means the person who sold the work is in the
              code review, at the demo, and on the call when something goes wrong. The studio stays
              small so this remains true.
            </p>
          </div>
        </Container>
      </Section>

      <ContactBlock />
    </div>
  );
}
