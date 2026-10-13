import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms and conditions governing the use of ${siteConfig.name} digital services, proposals, and website.`,
  openGraph: {
    title: `Terms of Service | ${siteConfig.name}`,
    description: `Terms and conditions governing the use of ${siteConfig.name} digital services, proposals, and website.`,
    url: `${siteConfig.url}/terms`,
    type: 'website',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="w-full flex flex-col">
      {/* Return Navigation Bar */}
      <div className="w-full border-b border-border bg-surface/50 backdrop-blur-sm">
        <Container size="xl" className="py-3 flex items-center justify-between">
          <Button
            href="/"
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Return to Home
          </Button>

          <Button href="/services" variant="outline" size="sm">
            Explore Services
          </Button>
        </Container>
      </div>

      <Section spacing="lg" className="bg-background">
        <Container size="md">
          {/* Header */}
          <div className="mb-10 pb-8 border-b border-border">
            <Badge variant="accent" size="sm" className="mb-3">
              <FileText className="w-3.5 h-3.5 mr-1" />
              <span>Commercial Governance</span>
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Terms of Service
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              Effective Date: January 1, 2025 | Last Updated: October 2026
            </p>
          </div>

          {/* Terms Copy */}
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/90 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the website of {siteConfig.legalName} (&ldquo;{siteConfig.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) located at {siteConfig.url}, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our website or engage our digital services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">2. Intellectual Property Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Unless otherwise indicated in an executed Statement of Work (SOW):
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Website Content: All text, graphics, user interfaces, code samples, and trademarks on this site are owned by or licensed to {siteConfig.name} and are protected by applicable intellectual property copyright laws.</li>
                <li>Client Deliverables: Upon full settlement of agreed contract invoices, all bespoke source code, visual design assets, and database schemas created specifically for a client engagement are transferred 100% to the client.</li>
                <li>Agency Frameworks: Reusable underlying developer tooling, boilerplates, and open-source libraries remain licensed under their respective open-source or proprietary licenses.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">3. Acceptable Use & Conduct</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree not to use the website or contact interfaces to transmit any automated spam, malicious code, or unauthorized vulnerability scans. You agree not to harvest employee or leadership contact information for automated bulk marketing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">4. Commercial Proposals & Statements of Work</h2>
              <p className="text-muted-foreground leading-relaxed">
                Information provided on this website—including service descriptions, indicative pricing, and timeline estimates—does not constitute a binding legal contract. All official engineering engagements require a mutually signed Statement of Work defining exact deliverables, payment schedules, warranties, and service level agreements (SLAs).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Disclaimer & Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website and its preview materials are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. In no event shall {siteConfig.name}, its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or inability to access this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">6. Governing Law & Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service and any non-contractual disputes arising out of or related to this website shall be governed by and construed in accordance with the laws of Bangladesh, without regard to conflict of law principles. Any commercial disputes shall first be submitted to good-faith mediation prior to formal arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">7. Legal Notice & Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions regarding these Terms of Service or to request commercial agreements, please contact:
              </p>
              <div className="mt-4 p-4 rounded-xl border border-border bg-surface text-sm space-y-2">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <span>{siteConfig.legalName}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-accent" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-accent transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{siteConfig.contact.address.formatted}</span>
                </div>
              </div>
            </section>
          </div>

          {/* Recovery Navigation Footer */}
          <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 justify-between items-center">
            <Link href="/privacy" className="text-sm font-semibold text-accent hover:underline">
              Read Privacy Policy &rarr;
            </Link>
            <Button href="/" variant="outline" size="md">
              Return to Home
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
