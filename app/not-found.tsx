import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Compass, MessageSquare, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: `404 - Page Not Found | ${siteConfig.name}`,
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-16 sm:py-24">
      <Section spacing="lg">
        <Container size="md" className="text-center">
          {/* Subtle error badge */}
          <Badge variant="accent" size="md" className="mb-6 inline-flex items-center gap-1.5 shadow-sm">
            <AlertCircle className="w-4 h-4 text-accent" />
            <span>Error 404 &bull; Resource Missing</span>
          </Badge>

          {/* Large decorative 404 graphic */}
          <div
            aria-hidden="true"
            className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-accent/20 select-none font-mono"
          >
            404
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mt-4">
            Page Not Found
          </h1>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            The page you are looking for does not exist, has been relocated, or is temporarily unavailable.
          </p>

          {/* Recovery navigation actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/"
              variant="accent"
              size="lg"
              leftIcon={<Home className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Return Home
            </Button>
            <Button
              href="/services"
              variant="outline"
              size="lg"
              leftIcon={<Compass className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Explore Services
            </Button>
            <Button
              href="/contact"
              variant="ghost"
              size="lg"
              leftIcon={<MessageSquare className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Contact Support
            </Button>
          </div>

          {/* Helpful route jump links */}
          <div className="mt-12 pt-8 border-t border-border/60 max-w-md mx-auto">
            <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mb-4">
              Quick Navigation
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/portfolio" className="text-muted-foreground hover:text-accent transition-colors">
                Case Studies
              </Link>
              <span className="text-border">&bull;</span>
              <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                About Us
              </Link>
              <span className="text-border">&bull;</span>
              <Link href="/team" className="text-muted-foreground hover:text-accent transition-colors">
                Leadership
              </Link>
              <span className="text-border">&bull;</span>
              <Link href="/process" className="text-muted-foreground hover:text-accent transition-colors">
                Process
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
