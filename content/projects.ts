// ============================================================================
// File: content/projects.ts
// Purpose: Structured data registry for portfolio case studies.
//          Powers /portfolio grid, dynamic /portfolio/[slug], and Home featured.
// ============================================================================

export type ProjectCategory = 'Web & Software' | 'Mobile & Games' | 'Automation & Integration' | 'Creative';

export interface ProjectResult {
  metric: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  clientType: string;
  summary: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: ProjectResult[];
  featured: boolean; // EXACTLY 3 items set to true for Home page sequence
  thumbnailUrl: string;
  galleryUrls: string[];
  liveUrl?: string;
  completedDate: string;
}

export const projects: ProjectItem[] = [
  // --------------------------------------------------------------------------
  // Featured Project 1 (Web & Software)
  // --------------------------------------------------------------------------
  {
    id: 'proj-apex-cloud-erp',
    slug: 'apex-cloud-erp',
    title: '[PLACEHOLDER] Enterprise Cloud ERP Modernization',
    category: 'Web & Software',
    clientType: 'Global Logistics & Supply Chain SaaS',
    summary: '// TODO(content): [PLACEHOLDER] Architected a high-throughput Next.js and TypeScript portal reducing warehouse inventory reconciliation latency by 74%.',
    problem:
      '// TODO(content): [PLACEHOLDER] The client operated on an aging monolithic application where page transitions took over 6 seconds, leading to inventory discrepancies and daily operational delays across 14 international freight depots.',
    solution:
      '// TODO(content): [PLACEHOLDER] Re-engineered the platform with a static-first Next.js architecture, optimistic UI updates, and an event-driven Redis caching layer with strict TypeScript contracts.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    results: [
      { metric: '74%', label: 'Faster Inventory Processing' },
      { metric: '99.98%', label: 'System Uptime Across Global Nodes' },
      { metric: '3.2x', label: 'Increase in Daily Completed Shipments' },
    ],
    featured: true, // FEATURED ITEM 1/3
    thumbnailUrl: '/images/projects/apex-erp-thumb.jpg',
    galleryUrls: ['/images/projects/apex-erp-1.jpg', '/images/projects/apex-erp-2.jpg'],
    liveUrl: 'https://example.com/case-studies/apex-cloud-erp',
    completedDate: '2025',
  },

  // --------------------------------------------------------------------------
  // Featured Project 2 (Mobile & Games)
  // --------------------------------------------------------------------------
  {
    id: 'proj-fitpulse-mobile-app',
    slug: 'fitpulse-mobile-app',
    title: '[PLACEHOLDER] FitPulse: AI-Powered Fitness Tracker',
    category: 'Mobile & Games',
    clientType: 'HealthTech & Wearables Startup',
    summary: '// TODO(content): [PLACEHOLDER] Engineered a cross-platform Flutter application with offline biometric sync and real-time workout audio coaching.',
    problem:
      '// TODO(content): [PLACEHOLDER] The initial MVP suffered from excessive battery drain and failed to cache user metrics when gym cell coverage was poor, resulting in elevated user churn.',
    solution:
      '// TODO(content): [PLACEHOLDER] Rebuilt the mobile architecture with Flutter, native C++ Bluetooth low-energy bindings, and an offline-first SQLite database that syncs in the background upon reconnection.',
    technologies: ['Flutter', 'Dart', 'Swift', 'Kotlin', 'SQLite', 'Firebase', 'WebSockets'],
    results: [
      { metric: '4.9 ★', label: 'App Store & Google Play Rating' },
      { metric: '500K+', label: 'Active Monthly Mobile Users' },
      { metric: '65%', label: 'Reduction in Device Battery Consumption' },
    ],
    featured: true, // FEATURED ITEM 2/3
    thumbnailUrl: '/images/projects/fitpulse-thumb.jpg',
    galleryUrls: ['/images/projects/fitpulse-1.jpg', '/images/projects/fitpulse-2.jpg'],
    liveUrl: 'https://example.com/case-studies/fitpulse',
    completedDate: '2025',
  },

  // --------------------------------------------------------------------------
  // Featured Project 3 (Automation & Integration)
  // --------------------------------------------------------------------------
  {
    id: 'proj-logiflow-automation',
    slug: 'logiflow-warehouse-automation',
    title: '[PLACEHOLDER] LogiFlow: Intelligent Freight Pipeline',
    category: 'Automation & Integration',
    clientType: 'Multinational Freight & Customs Brokerage',
    summary: '// TODO(content): [PLACEHOLDER] Built automated document extraction and webhook relays eliminating 180+ hours of manual customs data entry weekly.',
    problem:
      '// TODO(content): [PLACEHOLDER] Customs clearance agents manually re-keyed thousands of international shipping manifests across four separate regulatory web portals every week, causing human errors and demurrage fines.',
    solution:
      '// TODO(content): [PLACEHOLDER] Deployed an automated Python ingestion pipeline with optical document recognition and fault-tolerant webhook queues that automatically validate and submit regulatory entries.',
    technologies: ['Python', 'FastAPI', 'RabbitMQ', 'PostgreSQL', 'Docker', 'AWS Lambda'],
    results: [
      { metric: '180 hrs', label: 'Weekly Manual Labor Saved' },
      { metric: '99.4%', label: 'Document Accuracy on First Pass' },
      { metric: '12 min', label: 'Average Clearance Time (down from 4 hours)' },
    ],
    featured: true, // FEATURED ITEM 3/3
    thumbnailUrl: '/images/projects/logiflow-thumb.jpg',
    galleryUrls: ['/images/projects/logiflow-1.jpg', '/images/projects/logiflow-2.jpg'],
    liveUrl: 'https://example.com/case-studies/logiflow',
    completedDate: '2024',
  },

  // --------------------------------------------------------------------------
  // Project 4 (Web & Software - Non-Featured)
  // --------------------------------------------------------------------------
  {
    id: 'proj-nordic-fintech',
    slug: 'nordic-fintech-portal',
    title: '[PLACEHOLDER] Nordic Pay: Institutional Banking Portal',
    category: 'Web & Software',
    clientType: 'European Financial Services Group',
    summary: '// TODO(content): [PLACEHOLDER] Developed a compliant, accessible multi-currency financial dashboard processing over €12M in daily corporate settlements.',
    problem:
      '// TODO(content): [PLACEHOLDER] Corporate clients required an intuitive web dashboard complying with strict European WCAG AAA accessibility and PSD2 regulatory guidelines.',
    solution:
      '// TODO(content): [PLACEHOLDER] Built a hardened Next.js web application with strict TypeScript types, server-side cryptographically signed sessions, and high-contrast accessible design tokens.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Go', 'PostgreSQL'],
    results: [
      { metric: '€12M+', label: 'Daily Transaction Volume Handled' },
      { metric: '100%', label: 'WCAG AAA Accessibility Compliance' },
      { metric: '0', label: 'Security Vulnerabilities in External Pen-Tests' },
    ],
    featured: false,
    thumbnailUrl: '/images/projects/nordic-pay-thumb.jpg',
    galleryUrls: ['/images/projects/nordic-pay-1.jpg', '/images/projects/nordic-pay-2.jpg'],
    liveUrl: 'https://example.com/case-studies/nordic-pay',
    completedDate: '2024',
  },

  // --------------------------------------------------------------------------
  // Project 5 (Mobile & Games - Non-Featured)
  // --------------------------------------------------------------------------
  {
    id: 'proj-nebula-tactics',
    slug: 'nebula-tactics-mobile-game',
    title: '[PLACEHOLDER] Nebula Tactics: Tactical Turn-Based Strategy',
    category: 'Mobile & Games',
    clientType: 'Indie Game Studio',
    summary: '// TODO(content): [PLACEHOLDER] Developed a cross-platform 2D sci-fi strategy game built with Unity, featuring smooth procedural maps and multiplayer matchmaking.',
    problem:
      '// TODO(content): [PLACEHOLDER] The indie studio needed to launch their desktop strategy game onto iOS and Android without sacrificing 60fps performance on budget mobile hardware.',
    solution:
      '// TODO(content): [PLACEHOLDER] Optimized Unity draw-call batching, implemented custom sprite atlas shaders, and integrated lightweight Photon cloud networking.',
    technologies: ['Unity', 'C#', 'Photon Engine', 'Spine 2D', 'FMOD', 'iOS', 'Android'],
    results: [
      { metric: '60 FPS', label: 'Locked Frame Rate Across Mobile Devices' },
      { metric: '250K+', label: 'Total Downloads in First Quarter' },
      { metric: '42 min', label: 'Average Daily Player Session Time' },
    ],
    featured: false,
    thumbnailUrl: '/images/projects/nebula-tactics-thumb.jpg',
    galleryUrls: ['/images/projects/nebula-tactics-1.jpg', '/images/projects/nebula-tactics-2.jpg'],
    liveUrl: 'https://example.com/case-studies/nebula-tactics',
    completedDate: '2024',
  },

  // --------------------------------------------------------------------------
  // Project 6 (Creative - Non-Featured)
  // --------------------------------------------------------------------------
  {
    id: 'proj-lumina-brand',
    slug: 'lumina-brand-relaunch',
    title: '[PLACEHOLDER] Lumina Studio: Global Brand & Video System',
    category: 'Creative',
    clientType: 'Consumer Electronics Brand',
    summary: '// TODO(content): [PLACEHOLDER] Crafted complete brand identity, 3D motion package, and high-energy product launch video series driving a $2.4M Kickstarter campaign.',
    problem:
      "// TODO(content): [PLACEHOLDER] The client's groundbreaking ergonomic hardware lacked cohesive visual storytelling and launch video collateral for their global crowdfunding launch.",
    solution:
      '// TODO(content): [PLACEHOLDER] Produced a cinematic 90-second launch video with photorealistic 3D product renders, dynamic motion typography, and an adaptable digital asset kit.',
    technologies: ['Adobe Premiere Pro', 'After Effects', 'Cinema 4D', 'Figma', 'Illustrator'],
    results: [
      { metric: '$2.4M', label: 'Raised in 30-Day Crowdfunding Campaign' },
      { metric: '1.8M', label: 'Organic Launch Video Views' },
      { metric: '340%', label: 'Target Funding Goal Exceeded' },
    ],
    featured: false,
    thumbnailUrl: '/images/projects/lumina-brand-thumb.jpg',
    galleryUrls: ['/images/projects/lumina-brand-1.jpg', '/images/projects/lumina-brand-2.jpg'],
    liveUrl: 'https://example.com/case-studies/lumina-studio',
    completedDate: '2023',
  },
];

// Query helper functions
export function getAllProjects(): ProjectItem[] {
  return projects;
}

export function getFeaturedProjects(): ProjectItem[] {
  // Always returns exactly 3 featured projects for the Home page
  const featured = projects.filter((p) => p.featured);
  if (featured.length >= 3) {
    return featured.slice(0, 3);
  }
  return [...featured, ...projects.filter((p) => !p.featured)].slice(0, 3);
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory | 'All'): ProjectItem[] {
  if (category === 'All') return projects;
  return projects.filter((project) => project.category === category);
}

export function getProjectCategories(): string[] {
  return ['All', 'Web & Software', 'Mobile & Games', 'Automation & Integration', 'Creative'];
}
