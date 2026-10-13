// ============================================================================
// File: content/process.ts
// Purpose: 6-step agency delivery workflow.
//          Powers Home page ProcessPreview and full /process page breakdown.
// ============================================================================

export interface ProcessStep {
  stepNumber: number;
  title: string;
  summary: string; // Concise copy for Home page preview
  detailedDescription: string; // Detailed copy for /process page
  deliverables: string[];
  timeline: string;
  iconName: string; // Lucide icon name
}

export const processSteps: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Discovery & Strategic Architecture',
    summary: '// TODO(content): [PLACEHOLDER] Immersive workshops defining project scope, user journeys, and technical feasibility.',
    detailedDescription:
      '// TODO(content): [PLACEHOLDER] We begin every project by deeply understanding your business model, target audiences, and technical constraints. Through collaborative scoping sessions, we crystallize exact success criteria and build a concrete roadmap.',
    deliverables: [
      'Strategic Project Brief',
      'Technical Feasibility Analysis',
      'Information Architecture Map',
      'Milestone Roadmap & Timeline',
    ],
    timeline: 'Week 1 – 2',
    iconName: 'Compass',
  },
  {
    stepNumber: 2,
    title: 'UX/UI Design & System Architecture',
    summary: '// TODO(content): [PLACEHOLDER] Crafting accessible design tokens, wireframes, and interactive Figma prototypes.',
    detailedDescription:
      '// TODO(content): [PLACEHOLDER] Our design and engineering leads collaborate to build modular design systems and schema contracts. We create interactive prototypes that simulate exact user flows before writing production code.',
    deliverables: [
      'Interactive Figma Prototypes',
      'Design Token Library (Light/Dark)',
      'Database Schemas & API Contracts',
      'Design Approval Sign-Off',
    ],
    timeline: 'Week 2 – 4',
    iconName: 'Layers',
  },
  {
    stepNumber: 3,
    title: 'Agile Engineering & Sprint Iterations',
    summary: '// TODO(content): [PLACEHOLDER] Sprint-based implementation with weekly demos and automated CI/CD builds.',
    detailedDescription:
      '// TODO(content): [PLACEHOLDER] We build in rapid, two-week Agile sprints with clean TypeScript code, test-driven methodologies, and continuous deployment to preview environments. You get full visibility with live weekly demonstrations.',
    deliverables: [
      'Modular Production Codebase',
      'Weekly Staging Builds',
      'Automated CI/CD Pipelines',
      'Sprint Progress Reports',
    ],
    timeline: 'Week 4 – 8',
    iconName: 'Code',
  },
  {
    stepNumber: 4,
    title: 'Quality Engineering & Security Audits',
    summary: '// TODO(content): [PLACEHOLDER] End-to-end testing, responsive audits, Lighthouse 90+ checks, and security scans.',
    detailedDescription:
      '// TODO(content): [PLACEHOLDER] Before any release, we run rigorous quality assurance covering unit tests, responsive testing from 360px to 1440px viewports, WCAG accessibility validation, and static security vulnerability scans.',
    deliverables: [
      'Automated Test Suite Pass (Tiers 1-4)',
      'Cross-Device Verification Report',
      'Lighthouse 90+ Audit',
      'Vulnerability & Pen-Test Report',
    ],
    timeline: 'Week 8 – 9',
    iconName: 'ShieldCheck',
  },
  {
    stepNumber: 5,
    title: 'Production Deployment & Launch Handover',
    summary: '// TODO(content): [PLACEHOLDER] Zero-downtime static edge deployment, DNS cutover, and comprehensive training.',
    detailedDescription:
      '// TODO(content): [PLACEHOLDER] We orchestrate seamless production deployment configured for edge CDN performance, dynamic sitemaps, robots.txt, and DNS verification. We provide clear documentation and team onboarding.',
    deliverables: [
      'Live Production Release',
      'CDN & DNS Configuration',
      'Sitemap & Robots Verification',
      'Admin Runbook & Documentation',
    ],
    timeline: 'Week 9 – 10',
    iconName: 'Rocket',
  },
  {
    stepNumber: 6,
    title: 'Proactive Maintenance & SLA Support',
    summary: '// TODO(content): [PLACEHOLDER] Continuous uptime monitoring, dependency patching, and performance tuning.',
    detailedDescription:
      '// TODO(content): [PLACEHOLDER] Post-launch, our reliability engineers monitor uptime, application performance, and security patches with guaranteed SLA response times to keep your platform running at peak efficiency.',
    deliverables: [
      '24/7 Uptime & Error Alerting',
      'Bi-Weekly Security Patching',
      'Monthly Performance & Analytics Reports',
      'Dedicated SLA Incident Support',
    ],
    timeline: 'Ongoing',
    iconName: 'Activity',
  },
];

// Query helper functions
export function getProcessSteps(): ProcessStep[] {
  return processSteps;
}

export function getProcessStepByNumber(stepNumber: number): ProcessStep | undefined {
  return processSteps.find((step) => step.stepNumber === stepNumber);
}
