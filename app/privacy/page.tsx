import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

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
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              <span>Governance & Compliance</span>
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Privacy Policy
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              Effective Date: January 1, 2025 | Last Updated: October 2026
            </p>
          </div>

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
            <Link href="/terms" className="text-sm font-semibold text-accent hover:underline">
              Read Terms of Service &rarr;
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
