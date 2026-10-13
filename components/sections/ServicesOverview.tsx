import * as React from 'react';
import Link from 'next/link';
import { Globe, Smartphone, Cpu, Palette, ArrowRight, CheckCircle2 } from 'lucide-react';
import { serviceGroups, services } from '@/content/services';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function ServicesOverview() {
  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-6 h-6" />,
    Smartphone: <Smartphone className="w-6 h-6" />,
    Cpu: <Cpu className="w-6 h-6" />,
    Palette: <Palette className="w-6 h-6" />,
  };

  return (
    <Section spacing="lg" id="services" className="bg-background">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            What We Do
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Comprehensive Digital Services & Engineering
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            From enterprise web platforms to cross-platform mobile apps and automated workflows,
            we engineer robust, scalable solutions tailored for forward-thinking organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {serviceGroups.map((group) => {
            const groupServices = services.filter((s) => s.groupId === group.id);

            return (
              <Card
                key={group.id}
                variant="elevated"
                className="flex flex-col h-full hover:border-accent/60 transition-all group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center transition-transform group-hover:scale-105">
                      {iconMap[group.iconName] || <Globe className="w-6 h-6" />}
                    </div>
                    <Badge variant="secondary" size="sm">
                      {groupServices.length} Services
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-accent transition-colors">
                    {group.title}
                  </CardTitle>
                  <CardDescription className="text-sm mt-2 leading-relaxed">
                    {group.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Core Capabilities
                  </div>
                  <ul className="space-y-2.5 text-sm text-foreground/90">
                    {groupServices.map((service) => (
                      <li key={service.slug} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <Link
                          href={`/services/${service.slug}`}
                          className="hover:text-accent font-medium transition-colors"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4 border-t border-border/50">
                  <Button
                    href={`/services#${group.id}`}
                    variant="ghost"
                    size="sm"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full justify-between hover:text-accent font-semibold"
                  >
                    <span>Explore {group.title}</span>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button href="/services" variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View All 9 Services Overview
          </Button>
        </div>
      </Container>
    </Section>
  );
}
