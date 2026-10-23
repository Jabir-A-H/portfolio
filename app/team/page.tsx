import type { Metadata } from 'next';
import Link from 'next/link';
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
          <div className="border-t border-border">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 border-b border-border py-8 sm:py-10"
              >
                <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:col-span-1">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h2 className="col-span-10 font-display text-[2.1rem] leading-[1.02] text-foreground sm:col-span-7 sm:text-[3.1rem]">
                  {member.name}
                </h2>

                <p className="col-span-10 col-start-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:col-span-2 sm:col-start-auto">
                  {member.role || 'Co-founder'}
                </p>

                {member.bio ? (
                  <p className="col-span-10 col-start-3 max-w-[34ch] text-[13px] leading-relaxed text-muted-foreground sm:col-span-2 sm:col-start-auto">
                    {member.bio}
                  </p>
                ) : (
                  <span className="hidden sm:block sm:col-span-2" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-6">
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
