import * as React from 'react';
import { ArrowRight, Compass, Layers, Code, ShieldCheck, Rocket, Activity } from 'lucide-react';
import { processSteps } from '@/content/process';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function ProcessPreview() {
  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Code: <Code className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
    Rocket: <Rocket className="w-5 h-5" />,
    Activity: <Activity className="w-5 h-5" />,
  };

  return (
    <Section index={6} label="PROCESS" spacing="lg" id="process-preview" className="bg-background">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            How We Work
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Our 6-Step Delivery Process
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            An agile, predictable engineering framework that transforms requirements into resilient production systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {processSteps.map((step) => (
            <Card
              key={step.stepNumber}
              variant="bordered"
              className="relative flex flex-col h-full hover:border-accent transition-all p-2 group"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-xs flex items-center justify-center">
                      0{step.stepNumber}
                    </span>
                    <span className="text-accent/80">
                      {iconMap[step.iconName] || <Code className="w-5 h-5" />}
                    </span>
                  </div>
                  <Badge variant="secondary" size="sm" className="text-[11px]">
                    {step.timeline}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold group-hover:text-accent transition-colors">
                  {step.title}
                </CardTitle>
                <CardDescription className="text-sm mt-2 leading-relaxed">
                  {step.summary}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/process" variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View Detailed Delivery Process
          </Button>
        </div>
      </Container>
    </Section>
  );
}
