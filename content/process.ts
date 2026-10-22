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
    summary: 'Workshops that define the scope, the user journeys, and what the build has to prove.',
    detailedDescription:
      'Every project starts with the business model, the audience, and the constraints already in place. Scoping sessions turn that into success criteria you can test against, plus a roadmap with dates.',
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
    summary: 'Wireframes, design tokens, and a Figma prototype that shows the real flow.',
    detailedDescription:
      'Design and engineering work together on the component system and the data contracts. The prototype clicks through the same paths the product will take, so decisions happen before code.',
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
    summary: 'Two-week sprints with a working demo at the end of each one.',
    detailedDescription:
      'Build work runs in two-week sprints: typed code, tests first where they help, and a deploy to a preview URL. You see the product every week and can redirect before the next sprint starts.',
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
    summary: 'Unit tests, responsive checks, Lighthouse scores, and a security scan before release.',
    detailedDescription:
      'Nothing ships without a pass through the test suite, viewports from 360px to 1440px, WCAG checks, and a static security scan. Problems get fixed in the sprint, not in a list after launch.',
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
    summary: 'Deployment to the edge, DNS cutover, and a handover your team can follow.',
    detailedDescription:
      'Production goes out with CDN caching, sitemaps, robots rules, and DNS verified. Handover includes documentation and a walkthrough so your team can run the release without us.',
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
    summary: 'Uptime monitoring, dependency patches, and tuning after launch.',
    detailedDescription:
      'After launch, we monitor uptime and error rates, patch dependencies, and keep an eye on performance. Response times are written into the agreement.',
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
