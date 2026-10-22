import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

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
    <div className="flex w-full flex-col">
      <div className="border-b border-border">
        <Container
          size="xl"
          className="flex items-center justify-between py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Terms</span>
          </div>
          <Link href="/contact" className="transition-colors hover:text-accent">
            Contact
          </Link>
        </Container>
      </div>

      <Section spacing="none" className="py-14 sm:py-20">
        <Container size="md">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Legal / Terms
          </p>

          <h1 className="mt-4 font-display text-display-lg text-foreground">Terms of service</h1>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            Effective January 1, 2025 / Last updated October 2026
          </p>

          <div className="mt-10 border-t border-border pt-8">

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
              <div className="mt-4 border-t border-border pt-4 text-sm">
                <p className="font-medium text-foreground">{siteConfig.legalName}</p>
                <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-accent" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-accent">
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div className="mt-2 flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{siteConfig.contact.address.formatted}</span>
                </div>
              </div>
            </section>
          </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <Link
              href="/privacy"
              className="border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
            >
              Privacy policy
            </Link>
            <Link
              href="/"
              className="border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
            >
              Back home
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
