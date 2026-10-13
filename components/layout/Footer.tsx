import * as React from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageSquare, MapPin } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z" />
    </svg>
  );
}

function TwitterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Social icon map
  const socialIcons: Record<string, React.ReactNode> = {
    github: <GithubIcon className="w-4 h-4" />,
    linkedin: <LinkedinIcon className="w-4 h-4" />,
    twitter: <TwitterIcon className="w-4 h-4" />,
    facebook: <FacebookIcon className="w-4 h-4" />,
  };

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

  const whatsappCleanNumber = (siteConfig.contact.whatsapp || '').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappCleanNumber}`;

  return (
    <footer className="w-full border-t border-border bg-surface text-foreground transition-colors mt-auto">
      <Container size="xl" className="py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-sm">
                {siteConfig.name.replace(/\[PLACEHOLDER\]\s*/, '').substring(0, 2).toUpperCase()}
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
            <p className="text-xs text-muted-foreground/80 max-w-sm">
              {siteConfig.description}
            </p>

            {/* Social profiles */}
            <div className="flex items-center space-x-3 pt-2">
              {siteConfig.socials.list.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.label} profile`}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  {socialIcons[social.platform] || <span className="text-xs capitalize">{social.platform[0]}</span>}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Services
            </h4>
            <ul className="flex flex-col space-y-2 text-sm text-muted-foreground">
              {servicesLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors break-words"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Company
            </h4>
            <ul className="flex flex-col space-y-2 text-sm text-muted-foreground">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors break-words"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Contact
            </h4>
            <ul className="flex flex-col space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center space-x-2 hover:text-primary transition-colors break-all"
                >
                  <Mail className="w-4 h-4 shrink-0 text-muted-foreground" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-muted-foreground" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <MessageSquare className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>{siteConfig.contact.whatsappDisplay || siteConfig.contact.whatsapp}</span>
                </a>
              </li>
              <li className="flex items-start space-x-2 pt-1">
                <MapPin className="w-4 h-4 shrink-0 text-muted-foreground mt-0.5" />
                <span className="text-xs leading-relaxed">
                  {siteConfig.contact.address.formatted}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground space-y-4 sm:space-y-0">
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
