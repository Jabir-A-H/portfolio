import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { teamMembers } from '@/content/team';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: `Leadership Team | The Three Heads | ${siteConfig.name}`,
  description: `Meet the leadership team behind ${siteConfig.name} — Nasib Mohammad Arif, Abu Sayed Md Saad, and Jabir Abdullah Haian.`,
  openGraph: {
    title: `Leadership Team | The Three Heads | ${siteConfig.name}`,
    description: `Meet the leadership team behind ${siteConfig.name} — Nasib Mohammad Arif, Abu Sayed Md Saad, and Jabir Abdullah Haian.`,
    url: `${siteConfig.url}/team`,
    type: 'website',
  },
};

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z" />
    </svg>
  );
}

function TwitterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function TeamPage() {
  const socialIcons: Record<string, React.ReactNode> = {
    github: <GithubIcon className="w-4 h-4" />,
    linkedin: <LinkedinIcon className="w-4 h-4" />,
    twitter: <TwitterIcon className="w-4 h-4" />,
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Header */}
      <Section spacing="md" className="border-b border-border bg-gradient-to-b from-surface via-background to-background">
        <Container size="xl">
          <div className="max-w-3xl">
            <Badge variant="accent" size="md" className="mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>Executive Leadership</span>
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Leadership Team — The Minds Behind the Architecture
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Meet &ldquo;The three heads&rdquo; steering {siteConfig.name}. We are active engineers, product strategists, and creative designers who remain directly involved in the design and delivery of every client engagement.
            </p>
          </div>
        </Container>
      </Section>

      {/* Leadership Profiles Grid */}
      <Section spacing="lg" className="border-b border-border bg-background">
        <Container size="xl">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Executive Leadership Profiles
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Three complementary disciplines united around engineering precision, strategic growth, and human-centric aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                variant="elevated"
                className="flex flex-col h-full border border-border bg-surface overflow-hidden shadow-sm hover:border-accent/50 transition-all duration-300"
              >
                {/* Visual Avatar / Photo Box */}
                <div className="relative aspect-square w-full bg-gradient-to-br from-muted via-surface to-muted overflow-hidden flex items-center justify-center border-b border-border">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:12px_12px]" />

                  {/* Fallback Initials & Icon */}
                  <div className="w-24 h-24 rounded-full bg-accent/15 border-2 border-accent/30 flex items-center justify-center text-accent text-3xl font-black shadow-inner z-0">
                    {member.name.replace(/\[PLACEHOLDER\]\s*/, '').substring(0, 2).toUpperCase()}
                  </div>

                  {/* Pre-rendered Image with Alt and Responsive Sizing */}
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover z-10"
                      unoptimized
                    />
                  ) : null}

                  <div className="absolute bottom-3 left-3 z-20">
                    <Badge variant="secondary" size="sm" className="shadow-sm backdrop-blur-md bg-surface/90">
                      Leadership
                    </Badge>
                  </div>
                </div>

                {/* Member Info */}
                <CardHeader className="p-6 pb-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {member.name}
                  </h3>
                  {member.role ? (
                    <p className="text-sm font-semibold text-accent mt-1">
                      {member.role}
                    </p>
                  ) : null}
                </CardHeader>

                <CardContent className="p-6 pt-2 flex-1 flex flex-col justify-between">
                  {member.bio ? (
                    <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                      {member.bio}
                    </CardDescription>
                  ) : null}

                  {/* Skills Badges */}
                  {member.skills && member.skills.length > 0 ? (
                    <div className="mt-6 pt-4 border-t border-border/50">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                        Core Expertise:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" size="sm" className="text-[11px]">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </CardContent>

                {/* Social Profiles Row */}
                {member.socials && member.socials.length > 0 ? (
                  <CardFooter className="p-6 pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Connect:</span>
                    <div className="flex items-center space-x-2">
                      {member.socials.map((social) => (
                        <a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${member.name} on ${social.platform}`}
                          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                        >
                          {socialIcons[social.platform] || <span className="text-xs uppercase">{social.platform[0]}</span>}
                        </a>
                      ))}
                    </div>
                  </CardFooter>
                ) : null}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Co-founder Hands-on Philosophy */}
      <Section spacing="md" className="border-b border-border bg-muted/20">
        <Container size="xl">
          <div className="p-8 sm:p-12 rounded-2xl border border-border bg-surface max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">
                Hands-on Engineering by Co-founders
              </h2>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Unlike traditional agencies where client briefs are handed off to junior freelancers, {siteConfig.name} is structured around active co-founder involvement. Our leadership directly reviews pull requests, architectures data models, and participates in weekly sprint demonstrations.
            </p>
          </div>
        </Container>
      </Section>

      {/* Pre-Footer Conversion CTA Banner */}
      <Section spacing="md" className="bg-background">
        <Container size="xl">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Work Directly with Our Leadership Team
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
              Schedule an architecture discovery session directly with our leadership team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start a Conversation
              </Button>
              <Button href="/process" variant="outline" size="lg">
                Explore How We Work
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
