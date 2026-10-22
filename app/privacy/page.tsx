import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy policy and data protection governance for ${siteConfig.name} and ${siteConfig.legalName}.`,
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Privacy policy and data protection governance for ${siteConfig.name} and ${siteConfig.legalName}.`,
    url: `${siteConfig.url}/privacy`,
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
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
            <span className="text-foreground">Privacy</span>
          </div>
          <Link href="/contact" className="transition-colors hover:text-accent">
            Contact
          </Link>
        </Container>
      </div>

      <Section spacing="none" className="py-14 sm:py-20">
        <Container size="md">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Legal / Privacy
          </p>

          <h1 className="mt-4 font-display text-display-lg text-foreground">Privacy policy</h1>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            Effective January 1, 2025 / Last updated October 2026
          </p>

          <div className="mt-10 border-t border-border pt-8">

          {/* Legal Copy */}
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/90 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy describes how {siteConfig.legalName} (&ldquo;{siteConfig.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and safeguards information when you visit our website at {siteConfig.url} or submit an inquiry through our contact interfaces. We are committed to transparency and data minimization across all operations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about our services or engineering consultations. This data includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Contact Data: Full name, business email address, company name, and phone or WhatsApp contact number.</li>
                <li>Project Specifications: Service interested in, estimated budget ranges, project timelines, and scope descriptions.</li>
                <li>Usage Information: Technical metadata including anonymized IP addresses, browser types, and referrer headers collected via edge servers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">3. How We Use Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We process your information for legitimate business purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Responding to inquiries and scheduling architecture consultations.</li>
                <li>Evaluating project requirements to generate custom Statements of Work (SOW).</li>
                <li>Protecting our services against malicious traffic, automated bots, and spam attacks.</li>
                <li>Fulfilling legal, contractual, and regulatory compliance obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">4. Static Architecture & Data Minimization</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our site is built using a pure static export architecture. We do not store session cookies or run persistent server-side user tracking databases. Inquiry forms transmit information securely to dedicated, compliant processing endpoints with honeypot spam protection.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Data Sharing & Third-Party Disclosures</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, rent, or trade your personal information to third parties. Information is shared only with verified technical infrastructure providers (such as secure email routing and cloud hosting providers) strictly for the purpose of executing requested communications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">6. International Transfers & Data Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                As a global agency headquartered in Dhaka, Bangladesh working with international clients, your information may be processed in countries outside your residence. You retain full rights under applicable data protection frameworks (including GDPR) to access, rectify, or request deletion of any personal data we hold.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">7. Contact & Privacy Inquiries</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions, comments, or requests regarding this Privacy Policy, please contact our data governance team directly:
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
              href="/terms"
              className="border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
            >
              Terms of service
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
