// ============================================================================
// File: content/site.ts
// Purpose: Single source of truth for all branding, navigation, contact info,
//          and global configuration. ZERO brand strings hardcoded in UI.
// ============================================================================

export interface NavLink {
  title: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  items: NavLink[];
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube';
  label: string;
  url: string;
}

export interface StatItem {
  label: string;
  value: string;
  description?: string;
}

export interface SiteConfig {
  // Brand identity
  // TODO(content): Replace with official brand name once decided
  name: string;
  // TODO(content): Replace with registered legal entity name
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;

  // Logo configuration
  logo: {
    text: string;
    placeholderUrl: string;
  };

  // Hero section defaults
  hero: {
    headline: string;
    subheadline: string;
    /** Disciplines listed along the base of the hero. */
    disciplines: string[];
    /** Small availability note, set in the margin. */
    note: string;
    primaryCta: { title: string; href: string };
    secondaryCta: { title: string; href: string };
  };

  // Studio statement, used on the home page and the about page
  studio: {
    statement: string;
    body: string[];
    cta: NavLink;
  };

  // Contact points & actions
  contact: {
    email: string;
    phone: string;
    whatsapp: string; // Raw numerical string for wa.me URL
    whatsappDisplay: string; // Formatted for visual UI display
    whatsappUrl: string; // Full formatted link
    address: {
      street: string;
      city: string;
      country: string;
      formatted: string;
    };
    workingHours: string;
  };

  // Social links
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    list: SocialLink[];
  };

  // Navigation hierarchies
  nav: {
    main: NavLink[];
    cta: {
      getQuote: NavLink;
      startProject: NavLink;
      viewWork: NavLink;
    };
    footer: {
      services: NavLink[];
      company: NavLink[];
      legal: NavLink[];
    };
  };

  // Metrics / Stats
  stats: StatItem[];

  // Global CTA Banner
  ctaBanner: {
    headline: string;
    subheadline: string;
    primaryButtonText: string;
    primaryButtonHref: string;
  };

  // Feature flags
  features: {
    showTestimonials: boolean;
  };
}

export const siteConfig: SiteConfig = {
  // Provisional trading name. Replace with the registered brand when decided.
  name: 'Apex Digital',
  legalName: 'Apex Digital Studio Ltd.',
  tagline: 'Independent digital studio, Dhaka',
  description:
    'A digital engineering and design studio building web platforms, mobile products, and the systems behind them.',
  url: 'https://apex-digital.placeholder.example',
  locale: 'en',

  logo: {
    text: 'Apex Digital',
    placeholderUrl: '/logo/placeholder.svg',
  },

  hero: {
    headline: 'We build digital systems that *outlast* their launch.',
    subheadline:
      'A small studio for teams who care how things are made. We design, engineer, and maintain the products your business runs on.',
    disciplines: ['Web platforms', 'Mobile products', 'Automation', 'Brand and motion'],
    note: 'Open for Q1 2027',
    primaryCta: {
      title: 'Start a project',
      href: '/contact',
    },
    secondaryCta: {
      title: 'Selected work',
      href: '/portfolio',
    },
  },

  studio: {
    statement:
      'We take on a small number of projects each year, and stay with them long after launch.',
    body: [
      'Apex is an independent studio working across design and engineering. We are small on purpose: the people you meet are the people who make the work.',
      'Most of our clients arrive with something that has outgrown its first version. We rebuild the foundation, then keep improving it.',
    ],
    cta: { title: 'About the studio', href: '/about' },
  },

  contact: {
    // Provisional studio address. Swap for the registered office before launch.
    email: 'hello@apexdigital.studio',
    phone: '+370 626 32643',
    // WhatsApp contact number (E.164 digits without +)
    whatsapp: '37062632643',
    whatsappDisplay: '+370 626 32643',
    whatsappUrl: 'https://wa.me/37062632643?text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project',
    address: {
      street: 'Dhaka',
      city: 'Dhaka',
      country: 'Bangladesh',
      formatted: 'Dhaka, Bangladesh',
    },
    workingHours: 'Monday to Friday, 9:00 to 18:00 (GMT+6)',
  },

  socials: {
    github: 'https://github.com/example',
    linkedin: 'https://linkedin.com/company/example',
    twitter: 'https://twitter.com/example',
    facebook: 'https://facebook.com/example',
    list: [
      { platform: 'github', label: 'GitHub', url: 'https://github.com/example' },
      { platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/company/example' },
      { platform: 'twitter', label: 'Twitter', url: 'https://twitter.com/example' },
      { platform: 'facebook', label: 'Facebook', url: 'https://facebook.com/example' },
    ],
  },

  nav: {
    main: [
      { title: 'Services', href: '/services' },
      { title: 'Portfolio', href: '/portfolio' },
      { title: 'About', href: '/about' },
      { title: 'Team', href: '/team' },
      { title: 'Process', href: '/process' },
      { title: 'Contact', href: '/contact' },
    ],
    cta: {
      getQuote: { title: 'Get a quote', href: '/contact' },
      startProject: { title: 'Start a project', href: '/contact' },
      viewWork: { title: 'View our work', href: '/portfolio' },
    },
    footer: {
      services: [
        { title: 'Web & Software', href: '/services#web-software' },
        { title: 'Mobile & Games', href: '/services#mobile-games' },
        { title: 'Automation & Integration', href: '/services#automation-integration' },
        { title: 'Creative & Media', href: '/services#creative' },
      ],
      company: [
        { title: 'About Us', href: '/about' },
        { title: 'Leadership Team', href: '/team' },
        { title: 'Our Process', href: '/process' },
        { title: 'Case Studies', href: '/portfolio' },
        { title: 'Contact', href: '/contact' },
      ],
      legal: [
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' },
      ],
    },
  },

  stats: [
    { label: 'Years in Industry', value: '5+' },
    { label: 'Projects Delivered', value: '120+' },
    { label: 'Satisfied Clients', value: '80+' },
    { label: 'Countries Served', value: '15+' },
  ],

  ctaBanner: {
    headline: 'Have something worth building?',
    subheadline:
      'Tell us what you are working on. We reply to every serious enquiry within two working days.',
    primaryButtonText: 'Start a conversation',
    primaryButtonHref: '/contact',
  },

  features: {
    // Hidden until authentic client testimonials exist (plan-01 line 62)
    showTestimonials: false,
  },
};
