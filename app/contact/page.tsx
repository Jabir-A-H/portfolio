import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { formatWhatsAppUrl } from '@/lib/contact';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description: `Start a project with ${siteConfig.name}.`,
  path: '/contact',
});

export default function ContactPage() {
  const cleanPhoneDigits = (siteConfig.contact.phone || '').replace(/[^0-9+]/g, '');
  const whatsappUrl = formatWhatsAppUrl(`Hello ${siteConfig.name}, I would like to discuss a project.`);
  const mailtoUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    `Project inquiry - ${siteConfig.name}`
  )}`;
  const telUrl = `tel:${cleanPhoneDigits}`;

  return (
    <div className="flex w-full flex-col">
      <PageHeader
        label="Contact"
        title="Start a conversation."
        lede="Tell us what you are building, what is in the way, and when it needs to be live. We reply to every serious enquiry within two working days."
        meta={siteConfig.contact.workingHours}
      />

      <Section spacing="none" className="py-14 sm:py-20">
        <Container size="xl">
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 lg:col-span-7">
              <h2 className="font-display text-3xl text-foreground">Project enquiry</h2>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
                A short brief is enough. Include the budget range and the deadline if you have
                them; we will ask for the rest.
              </p>
              <div className="mt-8 border-t border-border pt-8">
                <ContactForm />
              </div>
            </div>

            <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Direct
              </p>

              <div className="mt-6 border-t border-border">
                <a
                  href={mailtoUrl}
                  className="group flex items-baseline justify-between gap-4 border-b border-border py-4"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Email
                  </span>
                  <span className="text-right text-[14px] text-foreground transition-colors group-hover:text-accent">
                    {siteConfig.contact.email}
                  </span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 border-b border-border py-4"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    WhatsApp
                  </span>
                  <span className="flex items-center gap-2 text-right text-[14px] text-foreground transition-colors group-hover:text-accent">
                    {siteConfig.contact.whatsappDisplay}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>

                <a
                  href={telUrl}
                  className="group flex items-baseline justify-between gap-4 border-b border-border py-4"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Phone
                  </span>
                  <span className="text-right text-[14px] text-foreground transition-colors group-hover:text-accent">
                    {siteConfig.contact.phone}
                  </span>
                </a>

                <div className="flex items-baseline justify-between gap-4 border-b border-border py-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Studio
                  </span>
                  <span className="text-right text-[14px] text-foreground">
                    {siteConfig.contact.address.formatted}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-b border-border py-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Hours
                  </span>
                  <span className="max-w-[24ch] text-right text-[14px] text-foreground">
                    {siteConfig.contact.workingHours}
                  </span>
                </div>
              </div>

              <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">
                Prefer a call? Send a time that suits you and we will confirm.
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
