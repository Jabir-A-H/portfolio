import type { Metadata } from 'next';
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: `Contact Us | Start a Project with ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name}. Request a project quotation, discuss digital engineering architectures, or schedule an executive consultation.`,
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description: `Connect with our engineering team to architect, build, and scale your digital software platforms. Fast 24-hour response guarantee.`,
    url: `${siteConfig.url}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact Us | ${siteConfig.name}`,
    description: `Connect with our engineering team to architect, build, and scale your digital software platforms. Fast 24-hour response guarantee.`,
  },
};

export default function ContactPage() {
  const cleanWhatsAppDigits = (siteConfig.contact.whatsapp || '').replace(/[^0-9]/g, '');
  const cleanPhoneDigits = (siteConfig.contact.phone || '').replace(/[^0-9+]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsAppDigits}?text=${encodeURIComponent(
    `Hello ${siteConfig.name}, I would like to discuss a project inquiry.`
  )}`;
  const mailtoUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    `Project Inquiry - ${siteConfig.name}`
  )}`;
  const telUrl = `tel:${cleanPhoneDigits}`;

  return (
    <div className="w-full flex flex-col">
      {/* Hero Header */}
      <Section
        spacing="md"
        className="border-b border-border bg-gradient-to-b from-surface via-background to-background"
      >
        <Container size="xl">
          <div className="max-w-3xl">
            <Badge variant="accent" size="md" className="mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>Let&apos;s Build Together</span>
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Start Your Next Project with {siteConfig.name}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {siteConfig.tagline}. Whether you have a detailed technical specification or an early-stage concept, our engineering team is here to help you scale.
            </p>
          </div>
        </Container>
      </Section>

      {/* Main 2-Column Section */}
      <Section spacing="lg" className="bg-background">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (7 cols): Client Contact Form */}
            <div className="lg:col-span-7">
              <Card variant="bordered" className="p-6 sm:p-8 md:p-10 bg-surface shadow-sm">
                <div className="mb-6 pb-6 border-b border-border">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    Project Inquiry Form
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Fill out the form below with your requirements and we will reply within 24 business hours.
                  </p>
                </div>

                <ContactForm />
              </Card>
            </div>

            {/* Right Column (5 cols): Direct Channels & Operating Details */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              {/* Response Time Guarantee Badge */}
              <div className="p-5 rounded-xl border border-accent/20 bg-accent/5 flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Response Time Guarantee
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    We respond to all qualified inquiries within 24 business hours with an initial architectural assessment and timeline estimate.
                  </p>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <Card variant="bordered" className="p-6 bg-surface shadow-sm space-y-5">
                <h3 className="text-base font-bold text-foreground">
                  Direct Communication Channels
                </h3>

                <div className="flex flex-col space-y-4">
                  {/* WhatsApp Direct Chat */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-lg border border-border bg-background/50 hover:bg-muted/60 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs text-muted-foreground font-medium">
                          WhatsApp Direct Chat
                        </span>
                        <span className="block text-sm font-semibold text-foreground truncate">
                          {siteConfig.contact.whatsappDisplay || siteConfig.contact.whatsapp}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* Direct Email */}
                  <a
                    href={mailtoUrl}
                    className="p-3.5 rounded-lg border border-border bg-background/50 hover:bg-muted/60 hover:border-accent/40 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs text-muted-foreground font-medium">
                          Direct Email
                        </span>
                        <span className="block text-sm font-semibold text-foreground truncate">
                          {siteConfig.contact.email}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* Direct Phone */}
                  <a
                    href={telUrl}
                    className="p-3.5 rounded-lg border border-border bg-background/50 hover:bg-muted/60 hover:border-accent/40 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs text-muted-foreground font-medium">
                          Phone Inquiries
                        </span>
                        <span className="block text-sm font-semibold text-foreground truncate">
                          {siteConfig.contact.phone}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </Card>

              {/* Physical Headquarters & Operating Hours */}
              <Card variant="bordered" className="p-6 bg-surface shadow-sm space-y-4">
                <h3 className="text-base font-bold text-foreground">
                  Headquarters & Hours
                </h3>

                <div className="space-y-3.5 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 shrink-0 text-muted-foreground mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-xs uppercase tracking-wider font-semibold mb-0.5">
                        Office Location
                      </strong>
                      <span className="text-xs sm:text-sm leading-relaxed">
                        {siteConfig.contact.address.formatted}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-2 border-t border-border/60">
                    <Clock className="w-4 h-4 shrink-0 text-muted-foreground mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-xs uppercase tracking-wider font-semibold mb-0.5">
                        Operating Hours
                      </strong>
                      <span className="text-xs sm:text-sm leading-relaxed">
                        {siteConfig.contact.workingHours}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
