import * as React from 'react';
import { ArrowRight, Layers, TrendingUp } from 'lucide-react';
import { getFeaturedProjects } from '@/content/projects';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <Section index={4} label="PROJECTS" spacing="lg" id="featured-projects" className="bg-muted/30 border-t border-border/60">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            Featured Case Studies
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Featured Projects & Case Studies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Real-world digital systems engineered for high performance, reliability, and business impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((project) => (
            <Card
              key={project.id}
              variant="elevated"
              className="flex flex-col h-full hover:border-accent/60 transition-all overflow-hidden group"
            >
              {/* Thumbnail Media Container */}
              <div className="aspect-video w-full bg-muted/60 relative flex items-center justify-center border-b border-border/50 overflow-hidden">
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <Layers className="w-8 h-8 text-muted-foreground/60 mb-2 transition-transform group-hover:scale-110" />
                  <span className="text-xs font-mono text-muted-foreground">
                    {`// TODO(content): [PLACEHOLDER: ${project.slug}]`}
                  </span>
                </div>
                <Badge variant="accent" size="sm" className="absolute top-3 left-3 shadow-sm">
                  {project.category}
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  {project.clientType}
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-accent transition-colors line-clamp-1">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm mt-2 leading-relaxed">
                  {project.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 pt-2 pb-4">
                {/* Metrics Highlight */}
                {project.results && project.results.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-surface border border-border/60 mb-4">
                    {project.results.slice(0, 2).map((res, i) => (
                      <div key={i} className="text-left">
                        <div className="text-sm sm:text-base font-bold text-accent flex items-center">
                          <TrendingUp className="w-3.5 h-3.5 mr-1 shrink-0" />
                          <span>{res.metric}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground leading-tight line-clamp-1 mt-0.5">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" size="sm" className="text-[11px]">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[11px] text-muted-foreground self-center ml-1">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t border-border/50">
                <Button
                  href={`/portfolio/${project.slug}`}
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="w-full justify-center group-hover:border-accent"
                >
                  View Case Study
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/portfolio" variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore All Portfolio Case Studies
          </Button>
        </div>
      </Container>
    </Section>
  );
}
