import type { Metadata } from 'next';
import {
  Sparkles,
  Target,
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
} from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: `About Us | Our Story, Mission & Values | ${siteConfig.name}`,
  description: `Discover the mission, engineering philosophy, and core values driving ${siteConfig.name} across global digital engineering.`,
  openGraph: {
    title: `About Us | Our Story, Mission & Values | ${siteConfig.name}`,
    description: `Discover the mission, engineering philosophy, and core values driving ${siteConfig.name} across global digital engineering.`,
    url: `${siteConfig.url}/about`,
    type: 'website',
  },
};

export default function AboutPage() {
  const coreValues = [
    {
      title: 'Engineering Rigor',
      description:
        'We reject fragile shortcuts. Every architecture is built with strict type safety, defensive programming, automated testing, and comprehensive documentation.',
      icon: <ShieldCheck className="w-5 h-5 text-accent" />,
    },
    {
      title: 'Radical Transparency',
      description:
        'Direct access to senior engineers, unvarnished project health reports, and zero hidden technical debt. We partner as trusted technical co-pilots.',
      icon: <Zap className="w-5 h-5 text-accent" />,
    },
    {
      title: 'Human-Centric Craft',
      description:
        'Cutting-edge performance is useless without intuitive usability. We blend aesthetic refinement with micro-interactions that delight end users.',
      icon: <Users className="w-5 h-5 text-accent" />,
    },
    {
      title: 'Velocity with Longevity',
      description:
        'We ship production milestones with rapid agility while guaranteeing that our codebases remain maintainable, modular, and extensible for years to come.',
      icon: <Compass className="w-5 h-5 text-accent" />,
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Hero Header */}
      <Section spacing="md" className="border-b border-border bg-gradient-to-b from-surface via-background to-background">
        <Container size="xl">
          <div className="max-w-3xl">
            <Badge variant="accent" size="md" className="mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>About Us</span>
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Engineering High-Impact Systems with Global Perspective
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {siteConfig.name} is a digital engineering and creative technology agency. We partner with ambitious organizations worldwide to conceptualize, design, and scale resilient software architectures.
            </p>
          </div>
        </Container>
      </Section>

      {/* Our Story / Who We Are */}
      <Section spacing="lg" className="border-b border-border bg-background">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" size="sm">Our Story</Badge>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Who We Are & What We Stand For
              </h2>
              <div className="mt-6 space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  {'// TODO(content): [PLACEHOLDER] Founded by an agile leadership team of seasoned systems engineers, product strategists, and creative designers, '}
                  {siteConfig.name}
                  {' bridges global vision with elite technical execution.'}
                </p>
                <p>
                  We recognized that many organizations struggle between slow enterprise consultancies and fragmented freelance development. We established our delivery hub in Dhaka, Bangladesh with an international reach to deliver world-class velocity, enterprise-grade reliability, and cost-effective scalability.
                </p>
                <p>
                  Today, our distributed engineering culture serves clients spanning North America, Europe, and Asia-Pacific across financial technologies, logistics automation, mobile gaming, and digital brand media.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/team" variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Meet the Leadership Team
                </Button>
                <Button href="/process" variant="ghost" size="md">
                  View Our Delivery Process
                </Button>
              </div>
            </div>

            {/* Visual Callout Box */}
            <div className="p-8 sm:p-10 rounded-2xl border border-border bg-surface shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Our Engineering Commitments
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground block text-sm">Static-First Architecture</strong>
                    <span className="text-xs text-muted-foreground">Optimal edge distribution, zero server maintenance overhead, and maximum DDoS resilience.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground block text-sm">Zero Brand Lock-In</strong>
                    <span className="text-xs text-muted-foreground">Clean centralized configuration, modular primitives, and full IP transfer on project completion.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground block text-sm">Measurable Business Impact</strong>
                    <span className="text-xs text-muted-foreground">Every architecture engagement is grounded in quantifiable KPIs: throughput, latency, and operational efficiency.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section spacing="lg" className="border-b border-border bg-muted/20">
        <Container size="xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="accent" size="sm" className="mb-2">Purpose & Direction</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Our Mission and Vision
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Guiding every technical decision, architecture roadmap, and client partnership we form.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card variant="elevated" className="p-8 border border-border bg-surface shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                To empower forward-thinking businesses by engineering reliable, secure, and blazing-fast digital systems that remove operational friction and accelerate growth.
              </p>
            </Card>

            <Card variant="elevated" className="p-8 border border-border bg-surface shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Our Vision
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                To become the premier engineering partner globally recognized for architectural excellence, ethical engineering craft, and transforming complex requirements into elegant reality.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Core Values & Principles */}
      <Section spacing="lg" className="border-b border-border bg-background">
        <Container size="xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="secondary" size="sm" className="mb-2">Operating Principles</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Our Core Values & Principles
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              The fundamental standards that govern how we write code, communicate with stakeholders, and lead our teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val) => (
              <Card key={val.title} variant="bordered" className="p-6 bg-surface shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {val.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Agency Metrics Strip */}
      <Section spacing="md" className="border-b border-border bg-surface">
        <Container size="xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="p-4">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-accent tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-semibold text-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final Pre-Footer CTA */}
      <Section spacing="md" className="bg-muted/20">
        <Container size="xl">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Ready to Partner with {siteConfig.name}?
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
              Tell us about your product roadmap, engineering bottlenecks, or creative vision.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start a Project
              </Button>
              <Button href="/portfolio" variant="outline" size="lg">
                View Case Studies
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
