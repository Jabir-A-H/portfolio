import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: `404 | ${siteConfig.name}`,
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <div className="flex w-full flex-1 items-center py-20 sm:py-28">
      <Container size="xl">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 border-t border-border pt-10">
          <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground lg:col-span-2">
            Error 404
          </p>

          <div className="col-span-12 lg:col-span-9">
            <p
              aria-hidden="true"
              className="font-display text-[7rem] leading-none text-muted-foreground/20 sm:text-[10rem]"
            >
              404
            </p>
            <h1 className="mt-10 max-w-[16ch] font-display text-display-lg text-foreground">
              This page is not here.
            </h1>
            <p className="mt-5 max-w-[48ch] text-[15px] leading-[1.7] text-muted-foreground">
              It may have moved, or the link may be out of date. The work and the studio are one
              click away.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
              >
                See the work
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/"
                className="border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
              >
                Back home
              </Link>
              <Link
                href="/contact"
                className="border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
