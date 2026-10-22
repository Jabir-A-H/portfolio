// ============================================================================
// File: content/services.ts
// Purpose: Structured data registry for all 9 services across 4 groups.
//          Powers /services overview and dynamic /services/[slug] pre-rendering.
// ============================================================================

export type ServiceGroupId = 'web-software' | 'mobile-games' | 'automation-integration' | 'creative';

export interface ServiceDeliveryItem {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceTechItem {
  name: string;
  category?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  groupId: ServiceGroupId;
  groupName: string;
  iconName: string;
  overview: {
    headline: string;
    description: string;
    benefits: string[];
  };
  whatWeDeliver: {
    headline: string;
    items: ServiceDeliveryItem[];
  };
  process: ServiceProcessStep[];
  technologies: ServiceTechItem[];
  faqs: ServiceFAQ[];
  cta: {
    headline: string;
    subheadline: string;
    buttonText: string;
    buttonLink: string;
  };
}

export interface ServiceGroup {
  id: ServiceGroupId;
  title: string;
  description: string;
  iconName: string;
  serviceSlugs: string[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'web-software',
    title: 'Web & Software',
    description: 'Web applications, enterprise software, and the maintenance that keeps both online.',
    iconName: 'Globe',
    serviceSlugs: ['web-design-development', 'software-design-development', 'website-software-maintenance'],
  },
  {
    id: 'mobile-games',
    title: 'Mobile & Games',
    description: 'Cross-platform mobile apps and games for iOS, Android, and the browser.',
    iconName: 'Smartphone',
    serviceSlugs: ['mobile-app-development', 'game-development'],
  },
  {
    id: 'automation-integration',
    title: 'Automation & Integration',
    description: 'Workflow automation, ETL bridges, and API middleware that moves data between systems.',
    iconName: 'Cpu',
    serviceSlugs: ['business-automation', 'api-system-integration'],
  },
  {
    id: 'creative',
    title: 'Creative',
    description: 'Brand systems, marketing design, and video that give a company a recognizable voice.',
    iconName: 'Palette',
    serviceSlugs: ['graphics-design', 'video-editing'],
  },
];

export const services: ServiceItem[] = [
  // --------------------------------------------------------------------------
  // Group 1: Web & Software
  // --------------------------------------------------------------------------
  {
    id: 'web-design-dev',
    slug: 'web-design-development',
    title: 'Web Design & Development',
    shortDescription: 'Custom websites and web applications built on Next.js, React, and TypeScript. Fast to load and straightforward for your team to run.',
    groupId: 'web-software',
    groupName: 'Web & Software',
    iconName: 'Code',
    overview: {
      headline: 'Websites and Web Apps Built Around Real Use',
      description:
        'Custom sites and full web applications built around your business goals. The work ranges from marketing platforms to complex SaaS products. The code is clean, the interactions are considered, and the pages load quickly on a phone.',
      benefits: [
        'Fast first loads through static export and server rendering',
        'Layouts tested from 360px to 1440px',
        'A TypeScript codebase with reusable design tokens',
        'Structured metadata and schema markup for search',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'Custom Web Application Architecture',
          description: 'A production Next.js and React frontend with modular components and predictable state.',
        },
        {
          title: 'Marketing Portals That Earn Leads',
          description: 'Responsive pages designed to hold attention and collect inquiries.',
        },
        {
          title: 'CMS & E-Commerce Implementations',
          description: 'Headless CMS setups (Sanity, Strapi) and Shopify or Stripe stores that grow with the catalog.',
        },
        {
          title: 'Performance & Core Web Vitals Optimization',
          description: 'Lighthouse scores of 90 or above across performance, SEO, accessibility, and best practice checks.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Wireframing & UX Architecture', description: 'User personas, page hierarchy, and wireframes for every breakpoint.' },
      { step: 2, title: 'High-Fidelity UI Design', description: 'Figma component libraries, design tokens, and clickable prototypes.' },
      { step: 3, title: 'Component Engineering', description: 'Typed components in TypeScript and Tailwind, checked against strict lint rules.' },
      { step: 4, title: 'Quality & Performance Auditing', description: 'Automated tests, browser checks, accessibility review, and responsive passes.' },
      { step: 5, title: 'Production Edge Deployment', description: 'Deployment with no downtime, served from a global CDN.' },
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend' },
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Framer Motion', category: 'Animation' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Vercel / Edge CDN', category: 'DevOps' },
    ],
    faqs: [
      {
        question: 'What frontend stack do you use for web development?',
        answer: 'Next.js, React, TypeScript, and Tailwind CSS. That combination gives us type safety, fast pages, and a codebase your developers can read.',
      },
      {
        question: 'Can you migrate our existing legacy site to Next.js?',
        answer: 'Yes. We move sites from legacy CMS platforms and monoliths to Next.js. URL paths and metadata stay intact, so search rankings do too.',
      },
      {
        question: 'How do you ensure our website meets high accessibility and SEO standards?',
        answer: 'Pages start with semantic HTML. Lighthouse checks run on every build, and metadata, Open Graph cards, and schema markup go in before launch.',
      },
    ],
    cta: {
      headline: 'Build a Web Platform That Pulls Its Weight',
      subheadline: 'Tell us what the site needs to do, and we will map the build.',
      buttonText: 'Discuss Your Web Project',
      buttonLink: '/contact',
    },
  },

  {
    id: 'software-design-dev',
    slug: 'software-design-development',
    title: 'Software Design & Development',
    shortDescription: 'Backend systems, cloud services, and internal tools built to carry real operational load.',
    groupId: 'web-software',
    groupName: 'Web & Software',
    iconName: 'Server',
    overview: {
      headline: 'Software for Work That Cannot Stop',
      description:
        'We design and build software for important work: internal tools, customer platforms, and services that talk to each other. Architecture decisions come with reasons, not just diagrams. The result is a system your team can operate and extend.',
      benefits: [
        'Modular services or a structured monolith, chosen for the job',
        'Typed APIs documented with OpenAPI',
        'Database models and queries tuned for real workloads',
        'Automated tests across unit and integration paths',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'Custom SaaS Platforms',
          description: 'Multi-tenant products with accounts, billing, and admin controls.',
        },
        {
          title: 'Enterprise Internal Tools',
          description: 'Dashboards, ERP extensions, and workflow portals that match how the team works.',
        },
        {
          title: 'Cloud Infrastructure & Serverless APIs',
          description: 'Services on AWS, GCP, or Docker with room to scale and health checks built in.',
        },
        {
          title: 'Database Architecture & Migration',
          description: 'Relational and document stores, backups, and migrations that run without downtime.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Requirements Discovery & Scope', description: 'Domain modeling, user roles, and written technical specifications.' },
      { step: 2, title: 'System Architecture & Schema Design', description: 'Entity diagrams, API contracts, and security rules.' },
      { step: 3, title: 'Sprint-Based Engineering', description: 'Test-driven work with a demo at the end of every two-week sprint.' },
      { step: 4, title: 'Automated CI/CD & Security Audits', description: 'Static analysis, dependency scanning, and benchmark runs.' },
      { step: 5, title: 'Cloud Deployment & Handover', description: 'Infrastructure as code, production provisioning, and training for your team.' },
    ],
    technologies: [
      { name: 'TypeScript', category: 'Language' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Python', category: 'Backend' },
      { name: 'Go', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Redis', category: 'Caching' },
      { name: 'Docker', category: 'DevOps' },
      { name: 'AWS', category: 'Cloud' },
    ],
    faqs: [
      {
        question: 'How do you handle data security and privacy in custom software?',
        answer: 'TLS in transit, AES-256 at rest, role-based access control, and dependency scanning in CI. Security reviews are part of the release process, not a separate audit.',
      },
      {
        question: 'Can you integrate with our existing legacy enterprise databases?',
        answer: 'Yes. We build adapter layers and ETL jobs that read from legacy SQL, Oracle, or proprietary systems without forcing a rewrite.',
      },
      {
        question: 'What development methodology do you follow?',
        answer: 'Two-week sprints, a shared backlog, code review on every change, and a working demo at each sprint boundary.',
      },
    ],
    cta: {
      headline: 'Build Software That Holds Up Under Load',
      subheadline: 'Bring us the workflow, the bottleneck, or the system that keeps falling over.',
      buttonText: 'Start a Software Project',
      buttonLink: '/contact',
    },
  },

  {
    id: 'web-software-maint',
    slug: 'website-software-maintenance',
    title: 'Website & Software Maintenance',
    shortDescription: 'Monitoring, security patches, and performance work for sites and systems that have to stay online.',
    groupId: 'web-software',
    groupName: 'Web & Software',
    iconName: 'Wrench',
    overview: {
      headline: 'Care for Software After Launch',
      description:
        'Software needs attention after launch. We watch uptime, apply security patches, and fix problems before users report them. Plans include response times and an engineer who knows your stack.',
      benefits: [
        'Response time commitments for critical incidents',
        'Weekly dependency updates and security patches',
        'Uptime and error monitoring with alerts that reach a person',
        'Database indexing and performance reviews',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: '24/7 Monitoring & Alerting',
          description: 'Uptime, error rates, and server health tracked around the clock.',
        },
        {
          title: 'Security Patching & Vulnerability Mitigation',
          description: 'Dependency audits, hardening, and patch releases when a zero-day lands.',
        },
        {
          title: 'Database Backups & Disaster Recovery',
          description: 'Encrypted daily snapshots and recovery steps that have been tested.',
        },
        {
          title: 'Feature Enhancements & Optimization',
          description: 'Small UX fixes, speed work, and new features from an engineer who knows the code.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Health Baseline Audit', description: 'A review of code health, dependencies, and hosting logs.' },
      { step: 2, title: 'Monitoring & Alert Setup', description: 'APM, Sentry error tracking, and uptime checks.' },
      { step: 3, title: 'SLA Definition & Runbook', description: 'Escalation paths, response targets, and a shared channel.' },
      { step: 4, title: 'Scheduled Maintenance Cycles', description: 'Bi-weekly staging updates, regression tests, and production releases.' },
      { step: 5, title: 'Monthly Health Reporting', description: 'Uptime, incidents resolved, and performance scores in one summary.' },
    ],
    technologies: [
      { name: 'Docker', category: 'DevOps' },
      { name: 'GitHub Actions', category: 'CI/CD' },
      { name: 'Sentry', category: 'Monitoring' },
      { name: 'Datadog', category: 'APM' },
      { name: 'AWS CloudWatch', category: 'Monitoring' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Linux', category: 'OS' },
      { name: 'Nginx', category: 'Web Server' },
    ],
    faqs: [
      {
        question: 'What response times are covered in your maintenance SLAs?',
        answer: 'Critical incidents are answered in as little as 1 hour, depending on the plan. Every plan has a written response target.',
      },
      {
        question: 'Do you maintain software built by other agencies or internal teams?',
        answer: 'Yes. We start with an architecture audit and a code walkthrough, then take over operations once the risks are clear.',
      },
      {
        question: 'How are software updates tested to avoid breaking production?',
        answer: 'Every patch runs in staging against the regression suite first. Production releases happen in a scheduled window with no downtime.',
      },
    ],
    cta: {
      headline: 'Keep the Platform Healthy',
      subheadline: 'Cover the gaps before they turn into incidents.',
      buttonText: 'Explore Maintenance Plans',
      buttonLink: '/contact',
    },
  },

  // --------------------------------------------------------------------------
  // Group 2: Mobile & Games
  // --------------------------------------------------------------------------
  {
    id: 'mobile-app-dev',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortDescription: 'Native and cross-platform iOS and Android apps in Flutter, React Native, Swift, or Kotlin.',
    groupId: 'mobile-games',
    groupName: 'Mobile & Games',
    iconName: 'Smartphone',
    overview: {
      headline: 'Mobile Apps That Feel Native on Both Platforms',
      description:
        'Native and cross-platform apps for consumers and field teams. Animation runs at 60 FPS, and data stays available when the signal drops. Releases are handled through App Store and Google Play review.',
      benefits: [
        'One codebase, with native performance where it matters',
        'Offline-first storage and sync when the network returns',
        'Push notifications and background jobs that behave',
        'App Store and Google Play submissions handled end to end',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'Cross-Platform iOS & Android Apps',
          description: 'A single Flutter or React Native codebase with native UI on both platforms.',
        },
        {
          title: 'Native Modules & Hardware Integration',
          description: 'Biometrics, camera, Bluetooth, and GPS wired into the app.',
        },
        {
          title: 'Backend API Integration & Offline Sync',
          description: 'GraphQL or REST sync backed by encrypted local storage.',
        },
        {
          title: 'App Store Deployment & ASO',
          description: 'Submission, store metadata, and approval issues handled.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Mobile Product Strategy', description: 'User personas, a platform feature matrix, and prototype flows.' },
      { step: 2, title: 'Native UX/UI Design', description: 'Screens that follow iOS Human Interface Guidelines and Material 3.' },
      { step: 3, title: 'Cross-Platform Mobile Engineering', description: 'State management, API integration, and native platform channels.' },
      { step: 4, title: 'Multi-Device QA & Emulation', description: 'Tested across screen sizes, form factors, and OS versions.' },
      { step: 5, title: 'App Store Publishing', description: 'Signing, listing review, and analytics after release.' },
    ],
    technologies: [
      { name: 'Flutter', category: 'Cross-Platform' },
      { name: 'React Native', category: 'Cross-Platform' },
      { name: 'Swift', category: 'Native iOS' },
      { name: 'Kotlin', category: 'Native Android' },
      { name: 'Firebase', category: 'Cloud/Auth' },
      { name: 'SQLite', category: 'Local DB' },
      { name: 'GraphQL', category: 'API' },
      { name: 'Fastlane', category: 'CI/CD' },
    ],
    faqs: [
      {
        question: 'Should we build cross-platform with Flutter or native apps?',
        answer: 'For more than 90% of business applications, Flutter delivers 60 FPS at nearly half the development and maintenance cost of two native apps.',
      },
      {
        question: 'Do you handle App Store and Google Play submissions?',
        answer: 'Yes. Certificates, provisioning profiles, listing assets, compliance requirements, and review submissions are part of the work.',
      },
      {
        question: 'Can the app function without an active internet connection?',
        answer: 'Yes. Data is cached locally in encrypted storage and syncs when the connection returns.',
      },
    ],
    cta: {
      headline: 'Get Your App Into Daily Use',
      subheadline: 'iOS, Android, and the release process that follows.',
      buttonText: 'Discuss a Mobile App',
      buttonLink: '/contact',
    },
  },

  {
    id: 'game-dev',
    slug: 'game-development',
    title: 'Game Development',
    shortDescription: '2D and 3D games in Unity and Unreal, from playable prototype to store release.',
    groupId: 'mobile-games',
    groupName: 'Mobile & Games',
    iconName: 'Gamepad2',
    overview: {
      headline: 'Games and Playable Brand Work',
      description:
        'We build games for phones, desktop, and the browser. Work starts with a prototype that proves the loop is fun, then moves into art, engineering, and release. Multiplayer and live operations are ready before launch, not bolted on after.',
      benefits: [
        'Rendering and physics tuned for the target device',
        'Builds for PC, iOS, Android, and WebGL',
        'Progression, currency, and reward systems that hold up',
        'Telemetry, analytics, and multiplayer networking',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'Mobile & Casual 2D/3D Games',
          description: 'Gameplay loops, touch controls, and particle work that feel finished.',
        },
        {
          title: 'Gamified Corporate & Marketing Experiences',
          description: 'Brand games people choose to play more than once.',
        },
        {
          title: 'WebGL Browser Games',
          description: 'Games that load in a browser with no install step.',
        },
        {
          title: 'Multiplayer Networking & Backend Services',
          description: 'Matchmaking, leaderboards, cloud saves, and economy backends.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Game Design Document (GDD)', description: 'Mechanics, narrative, art direction, and player profiles.' },
      { step: 2, title: 'Rapid Prototyping & Greyboxing', description: 'The loop gets tested before any art production starts.' },
      { step: 3, title: 'Asset Creation & Sound Design', description: 'Sprites, low-poly models, shaders, and score.' },
      { step: 4, title: 'Game Engineering & Optimization', description: 'C# scripting, memory profiling, draw call batching, and device testing.' },
      { step: 5, title: 'Publishing & LiveOps Setup', description: 'Store builds, monetization, and telemetry.' },
    ],
    technologies: [
      { name: 'Unity', category: 'Game Engine' },
      { name: 'C#', category: 'Language' },
      { name: 'Unreal Engine', category: 'Game Engine' },
      { name: 'Blender', category: '3D Modeling' },
      { name: 'WebGL', category: 'Web' },
      { name: 'Photon Engine', category: 'Multiplayer' },
      { name: 'FMOD', category: 'Audio' },
      { name: 'Spine 2D', category: 'Animation' },
    ],
    faqs: [
      {
        question: 'Can games be embedded directly into our marketing website?',
        answer: 'Yes. A WebGL or WebAssembly build runs directly in the page with no install step.',
      },
      {
        question: 'What game engines do you specialize in?',
        answer: 'Unity with C# for mobile and cross-platform 2D or 3D work. Unreal Engine for high-fidelity 3D environments.',
      },
      {
        question: 'Do you handle game monetization and in-app purchases?',
        answer: 'Yes. Rewarded ads, battle passes, and in-app stores, designed so they do not punish players.',
      },
    ],
    cta: {
      headline: 'Make Something People Play Twice',
      subheadline: 'From first prototype to store release.',
      buttonText: 'Pitch a Game Concept',
      buttonLink: '/contact',
    },
  },

  // --------------------------------------------------------------------------
  // Group 3: Automation & Integration
  // --------------------------------------------------------------------------
  {
    id: 'biz-automation',
    slug: 'business-automation',
    title: 'Business Automation',
    shortDescription: 'Workflow automation, document processing, and CRM sync that takes repetitive work out of the week.',
    groupId: 'automation-integration',
    groupName: 'Automation & Integration',
    iconName: 'Cpu',
    overview: {
      headline: 'Remove the Repetitive Work',
      description:
        'Manual processes become automated pipelines. We connect the tools your team already uses, move data between them, and flag anything that fails. The work left for people is the work that needs judgment.',
      benefits: [
        'Up to 80% less manual data entry and processing time',
        'Clean data handoffs between marketing, sales, and fulfillment',
        'Generated documents, invoices, and signed PDFs',
        'Slack, Discord, and email alerts when a run needs attention',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'End-to-End Workflow Orchestration',
          description: 'Cross-tool workflows across CRM, ERP, and messaging.',
        },
        {
          title: 'Automated Document & Invoice Pipelines',
          description: 'Receipts parsed, contracts generated, and accounting systems updated.',
        },
        {
          title: 'Custom Operational Bots & Scripts',
          description: 'Python and Node services for scheduled scraping, validation, and sync.',
        },
        {
          title: 'Lead Routing & Marketing Automation',
          description: 'Inbound leads scored, routed, and booked without a spreadsheet.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Operational Process Mapping', description: 'Where time goes, where tools overlap, and where errors start.' },
      { step: 2, title: 'Automation Architecture Blueprint', description: 'Triggers, failure paths, and payload shapes mapped before the build.' },
      { step: 3, title: 'Pipeline Development & Testing', description: 'APIs connected, data mapped, edge cases tested.' },
      { step: 4, title: 'Shadow Mode Validation', description: 'The pipeline runs beside the human process until the output matches.' },
      { step: 5, title: 'Deployment & Monitoring', description: 'Launch with incident logging and documentation for the team.' },
    ],
    technologies: [
      { name: 'Python', category: 'Language' },
      { name: 'Node.js', category: 'Runtime' },
      { name: 'Zapier', category: 'No-Code' },
      { name: 'Make (Integromat)', category: 'No-Code' },
      { name: 'n8n', category: 'Self-Hosted' },
      { name: 'OpenAI API', category: 'AI/LLM' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Docker', category: 'Container' },
    ],
    faqs: [
      {
        question: 'What tools can you automate between?',
        answer: 'Anything with an API or webhooks. Salesforce, HubSpot, Stripe, QuickBooks, Google Workspace, Slack, and in-house databases are common.',
      },
      {
        question: 'What happens if an automated pipeline encounters an error?',
        answer: 'Retries with exponential backoff, then a dead-letter queue. Your team gets an alert with the payload and a clear next step.',
      },
      {
        question: 'Can self-hosted automation engines be deployed for data privacy?',
        answer: 'Yes. n8n and Python services can run in your private cloud, so sensitive data never leaves your infrastructure.',
      },
    ],
    cta: {
      headline: 'Take the Repeatable Work Off the Team',
      subheadline: 'An audit shows where the hours go and what can be automated.',
      buttonText: 'Book an Automation Audit',
      buttonLink: '/contact',
    },
  },

  {
    id: 'api-sys-integration',
    slug: 'api-system-integration',
    title: 'API & System Integration',
    shortDescription: 'REST and GraphQL middleware, webhook pipelines, and ETL bridges that connect systems never designed to talk.',
    groupId: 'automation-integration',
    groupName: 'Automation & Integration',
    iconName: 'Network',
    overview: {
      headline: 'Make Separate Systems Behave Like One',
      description:
        'Data sits in tools that do not share a common language. We build the middleware, webhook relays, and API gateways that close the gap. Messages arrive in order, failures retry, and the interface is documented.',
      benefits: [
        'One consistent view of data across tools',
        'Sub-second webhook delivery with at-least-once guarantees',
        'Shared REST and GraphQL schemas across systems',
        'OAuth2, JWT, and mTLS with rate limiting',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'Custom API Gateway & Middleware',
          description: 'A proxy layer for authentication, caching, and rate limits.',
        },
        {
          title: 'Webhook Ingestion & Event Bridges',
          description: 'Webhook handlers backed by Redis queues and idempotent processing.',
        },
        {
          title: 'Third-Party SaaS Connectors',
          description: 'Adapters for ERPs, payment gateways, shipping providers, and CRMs.',
        },
        {
          title: 'Data Synchronization & ETL Pipelines',
          description: 'Scheduled or real-time sync in both directions.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Interface & Protocol Audit', description: 'Endpoints, auth, rate limits, and schema gaps reviewed.' },
      { step: 2, title: 'Data Schema Mapping', description: 'A shared data dictionary and mapping rules.' },
      { step: 3, title: 'Middleware Engineering', description: 'Message brokers in Redis or RabbitMQ, built to survive failure.' },
      { step: 4, title: 'Load Testing & Failure Simulation', description: 'Timeouts, malformed payloads, and high concurrency tested.' },
      { step: 5, title: 'Production Cutover & Telemetry', description: 'APM tracing, alert dashboards, and a runbook.' },
    ],
    technologies: [
      { name: 'Node.js', category: 'Runtime' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'GraphQL', category: 'API' },
      { name: 'REST', category: 'API' },
      { name: 'Redis', category: 'Message Queue' },
      { name: 'RabbitMQ', category: 'Message Queue' },
      { name: 'Docker', category: 'Container' },
      { name: 'OpenAPI / Swagger', category: 'Documentation' },
    ],
    faqs: [
      {
        question: 'How do you prevent data loss during third-party API outages?',
        answer: 'Messages land in a persistent queue and retry until the downstream service recovers. Idempotency keys keep duplicates out.',
      },
      {
        question: 'Can you connect modern cloud software to on-premise legacy servers?',
        answer: 'Yes. VPN tunnels, reverse proxies, and agent-based middleware connect on-premise systems to cloud services without opening the firewall.',
      },
      {
        question: 'Do you supply documentation for integrated APIs?',
        answer: 'Every integration ships with OpenAPI documentation, test fixtures, and a topology diagram.',
      },
    ],
    cta: {
      headline: 'Connect the Systems That Should Already Talk',
      subheadline: 'Middleware that survives outages and bad payloads.',
      buttonText: 'Discuss System Integration',
      buttonLink: '/contact',
    },
  },

  // --------------------------------------------------------------------------
  // Group 4: Creative
  // --------------------------------------------------------------------------
  {
    id: 'graphics-design',
    slug: 'graphics-design',
    title: 'Graphics Design',
    shortDescription: 'Brand identities, design systems, and marketing assets that hold together across every channel.',
    groupId: 'creative',
    groupName: 'Creative',
    iconName: 'Palette',
    overview: {
      headline: 'Design That Makes the Brand Recognizable',
      description:
        'Brand work starts with what the company actually is, then gets built into a system. That means a mark, type, color, and rules for using them. The assets work in print, on the web, and in a social feed.',
      benefits: [
        'Identity guidelines and assets a team can use',
        'SVG assets sized for fast web rendering',
        'One visual language across print, digital, and social',
        'Figma tokens and components ready for production',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'Brand Identity & Logo Systems',
          description: 'Marks, type pairing, color, and written brand rules.',
        },
        {
          title: 'Digital Marketing & Social Collateral',
          description: 'Ad banners, social templates, pitch decks, and email graphics.',
        },
        {
          title: 'Iconography & Custom Illustrations',
          description: 'Vector icon sets and editorial illustration in the brand voice.',
        },
        {
          title: 'Print & Packaging Collateral',
          description: 'Stationery, event stands, merchandise, and packaging.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Creative Discovery & Moodboards', description: 'Brand values, competitors, and a visual direction.' },
      { step: 2, title: 'Conceptual Sketching & Iteration', description: 'Logo and layout routes explored with your feedback.' },
      { step: 3, title: 'Vector Refinement & Polish', description: 'Paths aligned, type kerned, contrast checked.' },
      { step: 4, title: 'Asset Toolkit Compilation', description: 'Master files exported for web and print: SVG, PNG, PDF, EPS.' },
      { step: 5, title: 'Brand Style Guide Delivery', description: 'A guide covering usage, spacing, and type.' },
    ],
    technologies: [
      { name: 'Figma', category: 'UI/UX' },
      { name: 'Adobe Illustrator', category: 'Vector' },
      { name: 'Adobe Photoshop', category: 'Raster' },
      { name: 'Adobe InDesign', category: 'Layout' },
      { name: 'SVG Optimization', category: 'Web Assets' },
      { name: 'Canva Enterprise', category: 'Templates' },
    ],
    faqs: [
      {
        question: 'What formats do you provide when delivering logos and graphics?',
        answer: 'Vector masters (.AI, .EPS, .SVG) plus PNG, WebP, and PDF exports. Every mark comes in full color, mono, and reverse.',
      },
      {
        question: 'Do we retain full commercial ownership of all designs created?',
        answer: 'Yes. Copyright, intellectual property, and source files transfer to you on sign-off.',
      },
      {
        question: 'Can you create a design system that our development team can use in code?',
        answer: 'Yes. Figma tokens can be exported to Tailwind variables and used in the component library, so design and code stay aligned.',
      },
    ],
    cta: {
      headline: 'Give the Brand a Clear Visual System',
      subheadline: 'Identity, assets, and rules your team can apply without asking.',
      buttonText: 'Request a Design Portfolio',
      buttonLink: '/contact',
    },
  },

  {
    id: 'video-editing',
    slug: 'video-editing',
    title: 'Video Editing',
    shortDescription: 'Product films, motion graphics, and social edits that explain the work and hold attention.',
    groupId: 'creative',
    groupName: 'Creative',
    iconName: 'Video',
    overview: {
      headline: 'Video That Explains, Not Just Decorates',
      description:
        'We edit product films, SaaS walkthroughs, and short social cuts. Pacing, color, and sound are treated as part of the argument. Each deliverable is cut for the platform it runs on.',
      benefits: [
        'Pacing, color grading, and sound design handled together',
        'Deliverables in 16:9, 9:16, and 1:1',
        'Motion graphics and UI capture that read clearly',
        'Review rounds with frame-accurate comments',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'SaaS Product Walkthroughs & Explainers',
          description: 'Screen capture, cursor callouts, and motion graphics.',
        },
        {
          title: 'Short-Form Social Reels',
          description: 'TikTok, Instagram Reels, and YouTube Shorts cut to hold attention.',
        },
        {
          title: 'Commercial & Promotional Videos',
          description: 'Brand films, event recaps, and ads with licensed music.',
        },
        {
          title: 'Motion Graphics & Title Animations',
          description: 'Logo reveals, kinetic type, lower thirds, and animated data.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Creative Brief & Storyboard', description: 'Script, pacing, references, and a shot plan.' },
      { step: 2, title: 'Assembly & Rough Cut', description: 'Footage in, audio synced, story shaped.' },
      { step: 3, title: 'Motion Graphics & Title Styling', description: 'Callouts, kinetic type, and overlays.' },
      { step: 4, title: 'Color Grading & Audio Mastering', description: 'Color matched, noise removed, loudness set.' },
      { step: 5, title: 'Multi-Format Delivery', description: '4K masters plus compressed MP4 and WebP files for the web.' },
    ],
    technologies: [
      { name: 'Adobe Premiere Pro', category: 'NLE Editing' },
      { name: 'Adobe After Effects', category: 'Motion Graphics' },
      { name: 'DaVinci Resolve', category: 'Color Grading' },
      { name: 'Blender', category: '3D VFX' },
      { name: 'Cinema 4D', category: '3D Motion' },
      { name: 'Adobe Audition', category: 'Audio' },
    ],
    faqs: [
      {
        question: 'Can you create videos if we do not have existing raw footage?',
        answer: 'Yes. Explainers can be built from screen capture, animated UI, licensed stock, and kinetic type, with no shoot required.',
      },
      {
        question: 'What is the typical turnaround time for a promo video?',
        answer: 'Most promos take 5 to 10 business days, including two rounds of revision.',
      },
      {
        question: 'Do you supply licensed background music and sound effects?',
        answer: 'Yes. Music, sound effects, and voiceover come with commercial licensing for the delivered edit.',
      },
    ],
    cta: {
      headline: 'Tell the Story in Moving Pictures',
      subheadline: 'Product films and social cuts with a point of view.',
      buttonText: 'Discuss a Video Project',
      buttonLink: '/contact',
    },
  },
];

// Query helper functions
export function getAllServices(): ServiceItem[] {
  return services;
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByGroup(groupId: ServiceGroupId): ServiceItem[] {
  return services.filter((service) => service.groupId === groupId);
}

export function getAllServiceGroups(): ServiceGroup[] {
  return serviceGroups;
}

export function getServiceGroupById(id: ServiceGroupId): ServiceGroup | undefined {
  return serviceGroups.find((group) => group.id === id);
}
