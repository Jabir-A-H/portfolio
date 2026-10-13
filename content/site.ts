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
    primaryCta: { title: string; href: string };
    secondaryCta: { title: string; href: string };
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
  // TODO(content): Replace [PLACEHOLDER] with official agency brand name
  name: '[PLACEHOLDER] Apex Digital',
  // TODO(content): Replace [PLACEHOLDER] with registered legal entity
  legalName: '[PLACEHOLDER] Apex Digital Solutions Ltd.',
  tagline: 'Engineering High-Performance Digital Products & Scalable Systems',
  description:
    'Full-service digital engineering and creative studio specializing in bespoke web applications, mobile platforms, enterprise automation, and brand media.',
  url: 'https://apex-digital.placeholder.example',
  locale: 'en',

  logo: {
    text: '[PLACEHOLDER] APEX',
    placeholderUrl: '/logo/placeholder.svg',
  },

  hero: {
    headline: 'Engineering High-Impact Digital Products for Forward-Thinking Teams',
    subheadline:
      'We design, build, and scale world-class web applications, mobile platforms, and automated workflows that transform modern businesses.',
    primaryCta: {
      title: 'Start a Project',
      href: '/contact',
    },
    secondaryCta: {
      title: 'View Our Work',
      href: '/portfolio',
    },
  },

  contact: {
    // TODO(content): Replace with official corporate contact email
    email: 'hello@example.com',
    // TODO(content): Replace with official phone number
    phone: '+880 1700-000000',
    // WhatsApp contact number (E.164 digits without +)
    whatsapp: '37062632643',
    whatsappDisplay: '+370 626 32643',
    whatsappUrl: 'https://wa.me/37062632643?text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project',
    address: {
      // TODO(content): Replace with physical registered office address
      street: '[PLACEHOLDER] Level 5, Tech Tower, 123 Innovation Boulevard',
      city: 'Dhaka',
      country: 'Bangladesh',
      formatted: '[PLACEHOLDER] Level 5, Tech Tower, 123 Innovation Boulevard, Dhaka, Bangladesh',
    },
    workingHours: 'Monday – Friday: 9:00 AM – 6:00 PM (GMT+6)',
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
      getQuote: { title: 'Get a Quote', href: '/contact' },
      startProject: { title: 'Start a Project', href: '/contact' },
      viewWork: { title: 'View Our Work', href: '/portfolio' },
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
    // TODO(content): Verify historical agency metrics before production release
    { label: 'Years in Industry', value: '5+', description: '// TODO(content): Verify years in operation [PLACEHOLDER]' },
    { label: 'Projects Delivered', value: '120+', description: '// TODO(content): Verify completed client projects [PLACEHOLDER]' },
    { label: 'Satisfied Clients', value: '80+', description: '// TODO(content): Verify unique client count [PLACEHOLDER]' },
    { label: 'Countries Served', value: '15+', description: '// TODO(content): Verify international client distribution [PLACEHOLDER]' },
  ],

  ctaBanner: {
    headline: 'Ready to Accelerate Your Digital Transformation?',
    subheadline:
      'Whether you need high-performance web software, mobile applications, or streamlined enterprise automation, our engineering team is ready.',
    primaryButtonText: 'Schedule a Consultation',
    primaryButtonHref: '/contact',
  },

  features: {
    // Hidden until authentic client testimonials exist (plan-01 line 62)
    showTestimonials: false,
  },
};
