'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile drawer on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is active
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = siteConfig.nav.main.map((item) => ({
    label: item.title,
    href: item.href,
  }));

  const quoteCta = {
    label: siteConfig.nav.cta?.getQuote?.title || 'Get a Quote',
    href: siteConfig.nav.cta?.getQuote?.href || '/contact',
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo Placeholder */}
        <Link
          href="/"
          className="flex items-center space-x-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg px-1 py-0.5"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-sm tracking-wider">
            {siteConfig.name.replace(/\[PLACEHOLDER\]\s*/, '').substring(0, 2).toUpperCase()}
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation Links (>= 1024px) */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary font-semibold bg-muted/60'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <ThemeToggle />
          <Button
            href={quoteCta.href}
            variant="accent"
            size="sm"
            rightIcon={<ArrowUpRight className="w-4 h-4" />}
          >
            {quoteCta.label}
          </Button>
        </div>

        {/* Mobile Hamburger & Theme Toggle (< 1024px) */}
        <div className="flex lg:hidden items-center space-x-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-lg border border-border text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-background/95 backdrop-blur-md border-b border-border z-40 px-6 py-6 overflow-y-auto">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-muted text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-border flex flex-col space-y-4">
            <Button
              href={quoteCta.href}
              variant="accent"
              size="lg"
              className="w-full justify-center"
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
              onClick={() => setMobileMenuOpen(false)}
            >
              {quoteCta.label}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
