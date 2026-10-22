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
    title: 'Inventory at the speed of freight',
    category: 'Web & Software',
    clientType: 'Global logistics and supply chain',
    summary:
      'A freight platform that shows depot inventory as it moves. Reconciliation runs 74% faster across 14 international depots.',
    problem:
      'Fourteen freight depots depended on one aging monolith. Pages took over 6 seconds to load, inventory counts drifted, and daily dispatch fell behind schedule.',
    solution:
      'Rebuilt the portal on Next.js with static rendering first and optimistic updates on every scan. A Redis cache fed by events keeps counts current, and TypeScript contracts hold the data shape end to end.',
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
    title: 'FitPulse',
    category: 'Mobile & Games',
    clientType: 'Health technology and wearables',
    summary:
      'A fitness tracker that keeps recording when the gym has no signal. Workouts sync in the background once the phone reconnects.',
    problem:
      'The first build drained batteries and lost workout data whenever coverage dropped. Users left, and the store ratings showed it.',
    solution:
      'Rebuilt the app in Flutter with native Bluetooth bindings and a local SQLite store. Sessions write to the device first, then sync when a connection returns.',
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
    title: 'Customs, without the paperwork',
    category: 'Automation & Integration',
    clientType: 'Freight forwarding and customs brokerage',
    summary:
      'Document extraction and webhook relays for a customs brokerage. Agents stopped re-keying manifests and got 180 hours a week back.',
    problem:
      'Clearance agents retyped shipping manifests into four separate regulatory portals every week. Mistakes were common, and demurrage fines followed.',
    solution:
      'A Python pipeline reads incoming documents, checks every field against the portal, and files the entry through fault-tolerant webhook queues. Failed submissions retry on their own.',
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
    title: 'Settlement, without the ceremony',
    category: 'Web & Software',
    clientType: 'European corporate banking',
    summary:
      'A multi-currency portal for corporate banking clients. It handles more than €12M in daily settlements.',
    problem:
      'Corporate clients needed one place for balances, payments, and settlement. The interface had to meet PSD2 rules and WCAG AAA, not just look clean.',
    solution:
      'Built on Next.js with strict TypeScript, server-signed sessions, and high-contrast design tokens. Every screen was checked against the regulatory and accessibility requirements before release.',
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
    title: 'Nebula Tactics',
    category: 'Mobile & Games',
    clientType: 'Independent game studio',
    summary:
      'A turn-based sci-fi strategy game built for touch. Procedural maps and matchmaking hold a locked 60 FPS.',
    problem:
      'A desktop strategy game needed to reach phones without losing its tactical feel. The original rendering load was too heavy for budget hardware.',
    solution:
      'Rebatched Unity draw calls and wrote custom sprite atlas shaders to cut the per-frame cost. Photon handles lightweight multiplayer and matchmaking.',
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
    title: 'Lumina',
    category: 'Creative',
    clientType: 'Consumer electronics',
    summary:
      'Brand identity, a 3D motion package, and a launch film series for new hardware. The Kickstarter closed at $2.4M.',
    problem:
      'The hardware was ready, but the launch had no visual story and no film to carry it. A global crowdfunding campaign needed both.',
    solution:
      'Produced a 90-second launch film with photoreal 3D renders, motion typography, and a digital asset kit the client could extend without us.',
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
