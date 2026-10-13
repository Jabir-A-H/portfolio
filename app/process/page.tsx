import type { Metadata } from 'next';
import {
  Compass,
  Layers,
  Code,
  ShieldCheck,
  Rocket,
  Activity,
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Award,
} from 'lucide-react';
import { processSteps } from '@/content/process';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: `Our Process | 6-Step Delivery Methodology | ${siteConfig.name}`,
  description: `Discover how ${siteConfig.name} plans, designs, builds, tests, and deploys high-performance digital products from Discovery to Maintenance.`,
  openGraph: {
    title: `Our Process | 6-Step Delivery Methodology | ${siteConfig.name}`,
    description: `Discover how ${siteConfig.name} plans, designs, builds, tests, and deploys high-performance digital products from Discovery to Maintenance.`,
    url: `${siteConfig.url}/process`,
    type: 'website',
  },
};

export default function ProcessPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="w-6 h-6" />,
    Layers: <Layers className="w-6 h-6" />,
    Code: <Code className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />,
    Rocket: <Rocket className="w-6 h-6" />,
    Activity: <Activity className="w-6 h-6" />,
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Header */}
      <Section spacing="md" className="border-b border-border bg-gradient-to-b from-surface via-background to-background">
        <Container size="xl">
          <div className="max-w-3xl">
            <Badge variant="accent" size="md" className="mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>Delivery Framework</span>
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Our Delivery Process — How We Work
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              We employ a disciplined 6-step engineering methodology engineered to eliminate ambiguity, guarantee predictable release cadence, and ship robust production software.
            </p>
          </div>
        </Container>
      </Section>

      {/* 6-Step Detailed Breakdown */}
      <Section spacing="lg" className="border-b border-border bg-background">
        <Container size="xl">
          <div className="max-w-3xl mb-12">
            <Badge variant="secondary" size="sm" className="mb-2">Methodology in Action</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              From Initial Discovery to Long-Term Maintenance
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Every phase is backed by verifiable artifacts, collaborative feedback loops, and transparent milestones.
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step) => (
              <Card
                key={step.stepNumber}
                variant="bordered"
                className="p-6 sm:p-8 lg:p-10 border border-border bg-surface shadow-sm hover:border-accent/40 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left Column: Step meta, heading, narrative */}
                  <div className="flex-1 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge variant="accent" size="sm" className="font-bold">
                        Step 0{step.stepNumber}
                      </Badge>
                      <Badge variant="outline" size="sm" className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span>{step.timeline}</span>
                      </Badge>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                      {step.detailedDescription}
                    </p>
                  </div>

                  {/* Right Column: Icon & Deliverables list */}
                  <div className="lg:w-80 shrink-0 p-5 rounded-xl bg-muted/40 border border-border/60">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                        {iconMap[step.iconName] || <Code className="w-5 h-5" />}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Phase Deliverables
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {step.deliverables.map((del, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/85 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Quality Standards & Guarantees */}
      <Section spacing="lg" className="border-b border-border bg-muted/20">
        <Container size="xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="accent" size="sm" className="mb-2">Delivery Guarantees</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Our Non-Negotiable Quality Standards
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Standards embedded directly into our CI/CD pipelines and definition of done.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="elevated" className="p-6 bg-surface shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Defensive Type Safety & Testing
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Zero `any` types in TypeScript, strict compiler mode enabled, and automated E2E test suites guaranteeing continuous regression prevention.
              </p>
            </Card>

            <Card variant="elevated" className="p-6 bg-surface shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                90+ Lighthouse Speed Score
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Static-first export optimization, pre-compiled static assets, responsive media containers, and zero render-blocking bundle debt.
              </p>
            </Card>

            <Card variant="elevated" className="p-6 bg-surface shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                100% IP & Code Ownership
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Complete handover of repositories, environment configurations, and deployment credentials with clean open-source architecture.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Pre-Footer Conversion CTA Banner */}
      <Section spacing="md" className="bg-background">
        <Container size="xl">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Ready to Kick Off Step 1 Discovery?
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
              Schedule an architecture scoping session to outline your timeline, budget, and system roadmap.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start Discovery Phase
              </Button>
              <Button href="/portfolio" variant="outline" size="lg">
                View Past Case Studies
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
