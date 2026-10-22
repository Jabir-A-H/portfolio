import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ShieldCheck, Building2, Globe, Cpu, Zap } from 'lucide-react';

interface PartnerPlaceholder {
  id: string;
  name: string;
  sector: string;
  icon: React.ReactNode;
}

// TODO(content): Replace placeholder partner brands with authorized client logos [PLACEHOLDER]
const placeholderPartners: PartnerPlaceholder[] = [
  { id: '1', name: '[PLACEHOLDER] Alpha Logistics', sector: 'Enterprise SaaS', icon: <Globe className="w-4 h-4" /> },
  { id: '2', name: '[PLACEHOLDER] Nordic FinPay', sector: 'FinTech Banking', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: '3', name: '[PLACEHOLDER] PulseHealth AI', sector: 'HealthTech Platform', icon: <Cpu className="w-4 h-4" /> },
  { id: '4', name: '[PLACEHOLDER] Horizon Media', sector: 'Digital Entertainment', icon: <Zap className="w-4 h-4" /> },
  { id: '5', name: '[PLACEHOLDER] CoreCloud Dynamics', sector: 'Supply Chain Tech', icon: <Building2 className="w-4 h-4" /> },
];

export function TrustBar() {
  return (
    <Section index={2} label="TRUST" spacing="sm" className="border-y border-border/60 bg-muted/20">
      <Container size="xl">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground text-center mb-6">
          Trusted by forward-thinking teams, high-growth startups, and global clients
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 items-center justify-items-center">
          {placeholderPartners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border/40 bg-surface/60 text-muted-foreground hover:text-foreground hover:border-border transition-all w-full max-w-[200px] justify-center"
            >
              <span className="shrink-0 text-accent/80">{partner.icon}</span>
              <span className="font-semibold text-xs tracking-tight truncate">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
