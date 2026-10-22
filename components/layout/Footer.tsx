import * as React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const servicesLinks = siteConfig.nav.footer.services.map((item) => ({
    label: item.title,
    href: item.href.includes('#') ? '/services' : item.href,
  }));

  const companyLinks = siteConfig.nav.footer.company.map((item) => ({
    label: item.title,
    href: item.href,
  }));

  const legalLinks = siteConfig.nav.footer.legal.map((item) => ({
    label: item.title,
    href: item.href,
  }));

  return (
    <footer className="border-t border-border bg-background text-foreground">
      <Container size="xl" className="py-14 sm:py-16">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <Link href="/" className="font-display text-3xl leading-none tracking-[-0.02em]">
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-7 inline-block border-b border-foreground/30 pb-0.5 text-[15px] transition-colors hover:border-accent hover:text-accent"
            >
              {siteConfig.contact.email}
            </a>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {siteConfig.contact.address.formatted}
            </p>
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2 lg:col-start-7">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Services
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm">
              {servicesLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-foreground/85 transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Company
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-foreground/85 transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Elsewhere
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm">
              {siteConfig.socials.list.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/85 transition-colors hover:text-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-foreground/85 transition-colors hover:text-accent"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {siteConfig.name}
          </p>
          <p className="hidden sm:block">{siteConfig.contact.workingHours}</p>
          <div className="flex items-center gap-5">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
