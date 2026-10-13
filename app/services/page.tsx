import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Code,
  Smartphone,
  Cpu,
  Palette,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { serviceGroups, services } from '@/content/services';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: `Services | Specialized Digital Engineering & Creative | ${siteConfig.name}`,
  description: `Explore our 9 specialized services across Web & Software, Mobile & Games, Automation & Integration, and Creative media engineered by ${siteConfig.name}.`,
  openGraph: {
    title: `Services | Specialized Digital Engineering & Creative | ${siteConfig.name}`,
    description: `Explore our 9 specialized services across Web & Software, Mobile & Games, Automation & Integration, and Creative media engineered by ${siteConfig.name}.`,
    url: `${siteConfig.url}/services`,
    type: 'website',
  },
};

export default function ServicesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Code className="w-6 h-6" />,
    Smartphone: <Smartphone className="w-6 h-6" />,
    Cpu: <Cpu className="w-6 h-6" />,
    Palette: <Palette className="w-6 h-6" />,
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Header */}
      <Section spacing="md" className="border-b border-border bg-gradient-to-b from-surface via-background to-background">
        <Container size="xl">
          <div className="max-w-3xl">
            <Badge variant="accent" size="md" className="mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>Full-Spectrum Capabilities</span>
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Specialized Digital Engineering & Creative Services
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              We architect, develop, and maintain high-impact digital solutions across four core disciplines.
              Every service is delivered with production-grade engineering, strict quality controls, and long-term support.
            </p>

            {/* Quick Navigation Pills */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {serviceGroups.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-surface text-muted-foreground hover:text-foreground border border-border hover:border-accent/40 transition-colors"
                >
                  <span className="text-accent">#</span>
                  <span>{group.title}</span>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 4 Service Group Categories */}
      <div className="w-full divide-y divide-border/60">
        {serviceGroups.map((group) => {
          const groupServices = services.filter((s) => s.groupId === group.id);

          return (
            <Section key={group.id} id={group.id} spacing="lg" className="scroll-mt-16">
              <Container size="xl">
                {/* Category Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-border">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                        {iconMap[group.iconName] || <Layers className="w-5 h-5" />}
                      </div>
                      <Badge variant="secondary" size="sm">
                        {groupServices.length} Specialized Offerings
                      </Badge>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      {group.title}
                    </h2>
                    <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Category: {group.id}
                  </span>
                </div>

                {/* Services Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {groupServices.map((service) => (
                    <Card
                      key={service.slug}
                      variant="interactive"
                      className="flex flex-col h-full border border-border hover:border-accent/50 transition-all duration-300 group"
                    >
                      <CardHeader className="p-6 pb-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <Badge variant="outline" size="sm">
                            {service.groupName}
                          </Badge>
                          <span className="font-mono text-[11px]">{service.slug}</span>
                        </div>

                        <CardTitle className="text-xl font-bold group-hover:text-accent transition-colors">
                          <Link href={`/services/${service.slug}`} className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded">
                            {service.title}
                          </Link>
                        </CardTitle>

                        <CardDescription className="line-clamp-2 text-sm text-muted-foreground mt-2 leading-relaxed">
                          {service.shortDescription}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-6 pt-2 flex-1 flex flex-col justify-between">
                        {/* What We Deliver Preview */}
                        <div className="mt-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2.5">
                            Key Deliverables:
                          </span>
                          <ul className="space-y-2">
                            {service.whatWeDeliver.items.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-foreground/80 leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{item.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Preview */}
                        <div className="mt-6 pt-4 border-t border-border/50">
                          <div className="flex flex-wrap gap-1.5">
                            {service.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech.name} variant="secondary" size="sm">
                                {tech.name}
                              </Badge>
                            ))}
                            {service.technologies.length > 3 && (
                              <Badge variant="outline" size="sm">
                                +{service.technologies.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="p-6 pt-3 border-t border-border/60">
                        <Button
                          href={`/services/${service.slug}`}
                          variant="outline"
                          size="sm"
                          rightIcon={<ChevronRight className="w-4 h-4" />}
                          className="w-full justify-between group-hover:border-accent group-hover:text-accent"
                        >
                          <span>Explore Service Details</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </Container>
            </Section>
          );
        })}
      </div>

      {/* Pre-Footer Conversion CTA Banner */}
      <Section spacing="md" className="border-t border-border bg-muted/20">
        <Container size="xl">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Need a Customized Digital Architecture?
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
              We tailor multi-disciplinary teams across engineering, automation, and design to meet your project specifications.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href="/contact"
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Discuss Your Requirements
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
