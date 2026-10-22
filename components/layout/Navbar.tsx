'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = siteConfig.nav.main.map((item) => ({
    label: item.title,
    href: item.href,
  }));

  const quoteCta = {
    label: siteConfig.nav.cta?.startProject?.title || 'Start a project',
    href: siteConfig.nav.cta?.startProject?.href || '/contact',
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] w-full max-w-sheet items-center justify-between px-gutter">
        <Link
          href="/"
          className="flex items-baseline gap-2.5 focus-visible:outline-none"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="font-display text-[1.45rem] leading-none tracking-[-0.02em] text-foreground">
            {siteConfig.name}
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
            Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-mono text-[10px] uppercase tracking-[0.14em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:text-foreground hover:after:scale-x-100 ${
                  isActive ? 'text-foreground after:scale-x-100' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={quoteCta.href}
            className="group hidden items-center gap-1.5 border-b border-foreground/30 pb-0.5 text-[13px] font-medium text-foreground transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            {quoteCta.label}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <ThemeToggle className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-1 text-foreground lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 flex flex-col overflow-y-auto border-t border-border bg-background px-gutter pb-10 pt-8 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {navItems.map((item, index) => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-baseline gap-4 border-b border-border py-5 ${
                    isActive ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-4xl leading-none">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 flex flex-col gap-6">
            <Link
              href={quoteCta.href}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-between border-b border-foreground pb-3 font-mono text-[11px] uppercase tracking-[0.14em]"
            >
              {quoteCta.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>{siteConfig.contact.address.formatted}</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
