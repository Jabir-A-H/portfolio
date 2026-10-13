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
    description: 'High-performance web applications, robust enterprise software architectures, and ongoing SLA maintenance.',
    iconName: 'Globe',
    serviceSlugs: ['web-design-development', 'software-design-development', 'website-software-maintenance'],
  },
  {
    id: 'mobile-games',
    title: 'Mobile & Games',
    description: 'Cross-platform iOS and Android mobile applications and captivating interactive 2D/3D game experiences.',
    iconName: 'Smartphone',
    serviceSlugs: ['mobile-app-development', 'game-development'],
  },
  {
    id: 'automation-integration',
    title: 'Automation & Integration',
    description: 'Intelligent business workflow automation, custom ETL data bridges, and fault-tolerant API middleware.',
    iconName: 'Cpu',
    serviceSlugs: ['business-automation', 'api-system-integration'],
  },
  {
    id: 'creative',
    title: 'Creative',
    description: 'Distinctive brand identity systems, high-converting digital marketing collateral, and cinematic video editing.',
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
    shortDescription: 'Modern, high-performance web applications and responsive corporate portals engineered with Next.js, React, and Tailwind CSS.',
    groupId: 'web-software',
    groupName: 'Web & Software',
    iconName: 'Code',
    overview: {
      headline: 'Bespoke Web Solutions Engineered for Speed, Scale, and Conversion',
      description:
        '// TODO(content): [PLACEHOLDER] We craft custom websites and full-featured web applications tailored to your business objectives. From enterprise landing platforms to complex SaaS applications, our web engineering pairs clean architecture with stunning visual interactions.',
      benefits: [
        'Blazing-fast load times with static export & server-side rendering',
        'Accessible, responsive layouts tested across 360px to 1440px viewports',
        'Clean TypeScript architecture with reusable design systems',
        'SEO-optimized structure with automated JSON-LD schemas',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'Custom Web Application Architecture',
          description: 'Production-grade Next.js/React frontend with robust state management and modular components.',
        },
        {
          title: 'High-Converting Marketing Portals',
          description: 'Pixel-perfect responsive designs optimized for lead generation and brand authority.',
        },
        {
          title: 'CMS & E-Commerce Implementations',
          description: 'Headless CMS integrations (Sanity, Strapi) and Shopify/Stripe setups tailored for scalability.',
        },
        {
          title: 'Performance & Core Web Vitals Optimization',
          description: '90+ Google Lighthouse scores across performance, SEO, accessibility, and best practices.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Wireframing & UX Architecture', description: 'Establishing user personas, information hierarchy, and responsive wireframes.' },
      { step: 2, title: 'High-Fidelity UI Design', description: 'Figma component libraries, design token specifications, and interactive prototypes.' },
      { step: 3, title: 'Component Engineering', description: 'Modular TypeScript and Tailwind CSS development adhering to strict linting rules.' },
      { step: 4, title: 'Quality & Performance Auditing', description: 'Automated testing, cross-browser audits, accessibility review, and responsive checks.' },
      { step: 5, title: 'Production Edge Deployment', description: 'Zero-downtime deployment configured for static edge CDN hosting.' },
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
        answer: 'We specialize in modern TypeScript ecosystems centered on Next.js, React, and Tailwind CSS, ensuring maximum performance, type safety, and maintainability.',
      },
      {
        question: 'Can you migrate our existing legacy site to Next.js?',
        answer: 'Yes. We regularly handle full-scale migrations from legacy CMS or monolithic platforms to modern decoupled Next.js architectures with zero SEO loss.',
      },
      {
        question: 'How do you ensure our website meets high accessibility and SEO standards?',
        answer: 'Every page is built semantic-first, verified with automated Lighthouse audits, and configured with dynamic metadata, OpenGraph cards, and schema structured data.',
      },
    ],
    cta: {
      headline: 'Ready to Build a High-Performance Web Platform?',
      subheadline: "Let's turn your vision into an ultra-fast, beautifully designed web experience.",
      buttonText: 'Discuss Your Web Project',
      buttonLink: '/contact',
    },
  },

  {
    id: 'software-design-dev',
    slug: 'software-design-development',
    title: 'Software Design & Development',
    shortDescription: 'Scalable backend systems, cloud-native microservices, and bespoke enterprise software built to automate operations and drive growth.',
    groupId: 'web-software',
    groupName: 'Web & Software',
    iconName: 'Server',
    overview: {
      headline: 'Enterprise-Grade Custom Software Architecture',
      description:
        '// TODO(content): [PLACEHOLDER] We architect and develop resilient software solutions designed to handle demanding enterprise workloads. From internal business tooling to customer-facing SaaS platforms, we build secure, maintainable software designed for scale.',
      benefits: [
        'Robust microservice and modular monolithic system architectures',
        'Type-safe end-to-end APIs with OpenAPI specifications',
        'Enterprise-grade database modeling and query optimization',
        'Comprehensive automated test suites with high unit and integration coverage',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'Custom SaaS Platforms',
          description: 'Multi-tenant SaaS products with user authentication, subscription billing, and administrative dashboards.',
        },
        {
          title: 'Enterprise Internal Tools',
          description: 'Custom internal dashboards, ERP extensions, and workflow management portals.',
        },
        {
          title: 'Cloud Infrastructure & Serverless APIs',
          description: 'Scalable microservices running on AWS, GCP, or Docker containers with high availability.',
        },
        {
          title: 'Database Architecture & Migration',
          description: 'Optimized relational and document datastores with automated backup and zero-downtime migrations.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Requirements Discovery & Scope', description: 'Domain modeling, user role mapping, and detailed technical specifications.' },
      { step: 2, title: 'System Architecture & Schema Design', description: 'Entity-relationship diagrams, API contracts, and security policies.' },
      { step: 3, title: 'Sprint-Based Engineering', description: 'Test-driven development with bi-weekly milestone demonstrations.' },
      { step: 4, title: 'Automated CI/CD & Security Audits', description: 'Static analysis, vulnerability scanning, and performance benchmarking.' },
      { step: 5, title: 'Cloud Deployment & Handover', description: 'Production provisioning with infrastructure-as-code and team training.' },
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
        answer: 'We adhere to industry-standard encryption protocols (TLS in transit, AES-256 at rest), role-based access control (RBAC), and automated vulnerability testing in our CI/CD pipelines.',
      },
      {
        question: 'Can you integrate with our existing legacy enterprise databases?',
        answer: 'Yes. We design decoupled adapter layers and ETL pipelines that interface cleanly with legacy SQL, Oracle, or proprietary backends.',
      },
      {
        question: 'What development methodology do you follow?',
        answer: 'We work in 2-week Agile sprints with transparent backlog tracking, code reviews, and working demo releases at each sprint boundary.',
      },
    ],
    cta: {
      headline: 'Build Scalable Software Built for Enterprise Demands',
      subheadline: 'Partner with our engineering team to develop resilient custom software.',
      buttonText: 'Start Software Project',
      buttonLink: '/contact',
    },
  },

  {
    id: 'web-software-maint',
    slug: 'website-software-maintenance',
    title: 'Website & Software Maintenance',
    shortDescription: 'Proactive 24/7 SLA-backed monitoring, dependency patches, security hardening, and performance tuning for critical web and software systems.',
    groupId: 'web-software',
    groupName: 'Web & Software',
    iconName: 'Wrench',
    overview: {
      headline: 'Continuous Reliability, Security, and Evolution for Your Digital Assets',
      description:
        '// TODO(content): [PLACEHOLDER] Software is never truly finished. Our dedicated maintenance and reliability engineering ensures your applications remain secure, lightning-fast, and updated against emerging vulnerabilities.',
      benefits: [
        'Guaranteed response time SLAs for critical incidents',
        'Proactive weekly dependency updates and security vulnerability patching',
        'Continuous uptime monitoring and real-time incident alerting',
        'Ongoing database indexing and performance optimization',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: '24/7 Monitoring & Alerting',
          description: 'Real-time tracking of uptime, error rates, and server resource health with automated notifications.',
        },
        {
          title: 'Security Patching & Vulnerability Mitigation',
          description: 'Proactive dependency audits, security hardening, and zero-day patch deployments.',
        },
        {
          title: 'Database Backups & Disaster Recovery',
          description: 'Automated encrypted daily snapshots and verified disaster recovery runbooks.',
        },
        {
          title: 'Feature Enhancements & Optimization',
          description: 'Ongoing UX tweaks, speed optimizations, and feature iterations handled by dedicated engineers.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Health Baseline Audit', description: 'Comprehensive inspection of code health, dependencies, and hosting logs.' },
      { step: 2, title: 'Monitoring & Alert Setup', description: 'Configuring APM, error tracking via Sentry, and uptime heartbeat checks.' },
      { step: 3, title: 'SLA Definition & Runbook', description: 'Documenting emergency escalation procedures and dedicated communication channels.' },
      { step: 4, title: 'Scheduled Maintenance Cycles', description: 'Bi-weekly staging updates, regression testing, and production rollouts.' },
      { step: 5, title: 'Monthly Health Reporting', description: 'Transparent summaries of uptime, issues resolved, and performance scores.' },
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
        answer: 'Depending on your plan, we offer critical incident response times as fast as 1 hour, with dedicated engineering support.',
      },
      {
        question: 'Do you maintain software built by other agencies or internal teams?',
        answer: 'Yes. We conduct a preliminary architectural audit and code onboarding phase before assuming operational maintenance.',
      },
      {
        question: 'How are software updates tested to avoid breaking production?',
        answer: 'All patches and feature upgrades are validated in staging environments with automated regression tests before being scheduled for zero-downtime production release.',
      },
    ],
    cta: {
      headline: 'Protect Your Digital Infrastructure with SLA-Backed Care',
      subheadline: 'Ensure 99.9% uptime, airtight security, and seamless continuous operations.',
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
    shortDescription: 'Native and cross-platform iOS & Android mobile applications crafted with Flutter, React Native, and Swift for fluid user experiences.',
    groupId: 'mobile-games',
    groupName: 'Mobile & Games',
    iconName: 'Smartphone',
    overview: {
      headline: 'Intuitive, High-Performance Mobile Applications for iOS & Android',
      description:
        '// TODO(content): [PLACEHOLDER] We engineer native and cross-platform mobile apps that users love to engage with daily. From consumer lifestyle apps to mission-critical field operations tools, we combine fluid 60fps animations with offline-first local data synchronization.',
      benefits: [
        'Cross-platform efficiency with native-quality performance',
        'Offline-first architectures with intelligent cloud sync',
        'Seamless push notification and background task management',
        'Frictionless App Store and Google Play compliance and release',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'Cross-Platform iOS & Android Apps',
          description: 'Single-codebase Flutter or React Native apps with pixel-perfect native UI widgets.',
        },
        {
          title: 'Native Modules & Hardware Integration',
          description: 'Deep platform integrations including biometrics, camera, Bluetooth, and GPS sensors.',
        },
        {
          title: 'Backend API Integration & Offline Sync',
          description: 'Real-time GraphQL/REST syncing with local encrypted SQLite storage.',
        },
        {
          title: 'App Store Deployment & ASO',
          description: 'End-to-end app store submission, metadata optimization, and approval management.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Mobile Product Strategy', description: 'User persona mapping, platform feature matrix, and prototype flows.' },
      { step: 2, title: 'Native UX/UI Design', description: 'Human Interface Guidelines & Material 3 compliant interface designs.' },
      { step: 3, title: 'Cross-Platform Mobile Engineering', description: 'State management, API integration, and native platform channels.' },
      { step: 4, title: 'Multi-Device QA & Emulation', description: 'Testing across iOS and Android form factors, screen resolutions, and OS versions.' },
      { step: 5, title: 'App Store Publishing', description: 'Signing, store listing review, and analytics monitoring.' },
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
        answer: 'For over 90% of business applications, modern cross-platform frameworks like Flutter provide 60fps native performance at nearly half the development and maintenance cost.',
      },
      {
        question: 'Do you handle App Store and Google Play submissions?',
        answer: 'Yes. We manage certificates, provisioning profiles, store listing assets, compliance requirements, and the review submission process.',
      },
      {
        question: 'Can the app function without an active internet connection?',
        answer: 'Yes. We build offline-first mobile apps using local encrypted caches that automatically synchronize whenever network connectivity resumes.',
      },
    ],
    cta: {
      headline: 'Launch a Mobile Experience Your Users Will Love',
      subheadline: 'Bring your mobile app concept to life on iOS and Android.',
      buttonText: 'Discuss Mobile App',
      buttonLink: '/contact',
    },
  },

  {
    id: 'game-dev',
    slug: 'game-development',
    title: 'Game Development',
    shortDescription: 'Immersive 2D and 3D games, gamified interactive experiences, and cross-platform game engineering built with Unity and Unreal Engine.',
    groupId: 'mobile-games',
    groupName: 'Mobile & Games',
    iconName: 'Gamepad2',
    overview: {
      headline: 'Captivating Game Worlds and Gamified Brand Experiences',
      description:
        '// TODO(content): [PLACEHOLDER] We blend imaginative storytelling with high-framerate real-time game engineering. Whether you are creating a standalone mobile game, a gamified marketing experience, or a WebGL browser showcase, our team delivers captivating interactive gameplay.',
      benefits: [
        'Optimized real-time 2D and 3D physics and rendering pipelines',
        'Cross-platform deployment to PC, Mobile (iOS/Android), and WebGL',
        'Engaging game economies, progression loops, and reward mechanics',
        'Integrated telemetry, analytics, and multiplayer networking',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'Mobile & Casual 2D/3D Games',
          description: 'Polished gameplay loops, intuitive touch controls, and fluid particle animations.',
        },
        {
          title: 'Gamified Corporate & Marketing Experiences',
          description: 'Interactive brand games that skyrocket audience engagement and retention.',
        },
        {
          title: 'WebGL Browser Games',
          description: 'Zero-install 3D/2D games playable instantly across modern mobile and desktop browsers.',
        },
        {
          title: 'Multiplayer Networking & Backend Services',
          description: 'Matchmaking, leaderboards, cloud saves, and in-game economy backends.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Game Design Document (GDD)', description: 'Mechanics, narrative structure, art style, and target player profiles.' },
      { step: 2, title: 'Rapid Prototyping & Greyboxing', description: 'Validating fun factor and mechanics before asset production.' },
      { step: 3, title: 'Asset Creation & Sound Design', description: '2D sprites, 3D low-poly models, shader creation, and audio scoring.' },
      { step: 4, title: 'Game Engineering & Optimization', description: 'C# scripting, memory profiling, draw call batching, and device testing.' },
      { step: 5, title: 'Publishing & LiveOps Setup', description: 'Store builds, monetization integration, and telemetry tracking.' },
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
        answer: 'Yes. Using lightweight WebGL and WebAssembly builds, we create zero-install interactive browser experiences that run directly on modern web pages.',
      },
      {
        question: 'What game engines do you specialize in?',
        answer: 'We primarily build in Unity (C#) for mobile and 2D/3D cross-platform titles, and Unreal Engine for high-fidelity 3D environments.',
      },
      {
        question: 'Do you handle game monetization and in-app purchases?',
        answer: 'Yes. We implement ethical, high-converting monetization models including rewarded ads, battle passes, and in-app currency stores.',
      },
    ],
    cta: {
      headline: 'Create an Unforgettable Interactive Game Experience',
      subheadline: "From hyper-casual to gamified brand journeys, let's create something extraordinary.",
      buttonText: 'Pitch Your Game Concept',
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
    shortDescription: 'Eliminate repetitive manual labor with intelligent workflow automation, CRM synchronization, document processing, and custom bots.',
    groupId: 'automation-integration',
    groupName: 'Automation & Integration',
    iconName: 'Cpu',
    overview: {
      headline: 'Streamline Operations and Eliminate Repetitive Manual Work',
      description:
        '// TODO(content): [PLACEHOLDER] Transform tedious manual operational processes into automated, error-free digital pipelines. We connect your software tools, synchronize customer data across departments, and automate critical workflows so your team can focus on high-value strategy.',
      benefits: [
        'Up to 80% reduction in manual data entry and processing overhead',
        'Zero-error data handoffs between marketing, sales, and fulfillment',
        'Automated document generation, invoice creation, and PDF signing',
        'Real-time Slack, Discord, and email operational notification alerts',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'End-to-End Workflow Orchestration',
          description: 'Automating cross-tool workflows across CRM, ERP, and communication hubs.',
        },
        {
          title: 'Automated Document & Invoice Pipelines',
          description: 'Auto-parsing receipts, generating contracts, and syncing with accounting systems.',
        },
        {
          title: 'Custom Operational Bots & Scripts',
          description: 'Python and Node.js microservices for scheduled data scraping, validation, and sync.',
        },
        {
          title: 'Lead Routing & Marketing Automation',
          description: 'Instant routing of inbound leads with scoring and automatic scheduling.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Operational Process Mapping', description: 'Identifying repetitive bottlenecks, time costs, and tool overlaps.' },
      { step: 2, title: 'Automation Architecture Blueprint', description: 'Mapping trigger events, failure recovery loops, and data payloads.' },
      { step: 3, title: 'Pipeline Development & Testing', description: 'Connecting APIs, writing custom transforms, and testing edge cases.' },
      { step: 4, title: 'Shadow Mode Validation', description: 'Running alongside human workflows to verify accuracy and error-handling.' },
      { step: 5, title: 'Deployment & Monitoring', description: 'Live launch with automated incident logging and team documentation.' },
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
        answer: 'Any software with an API or webhook support—including Salesforce, HubSpot, Stripe, QuickBooks, Google Workspace, Slack, Jira, and custom in-house databases.',
      },
      {
        question: 'What happens if an automated pipeline encounters an error?',
        answer: 'We build automated retry policies with exponential backoff and dead-letter alert queues, notifying your team immediately on Slack or email with actionable error context.',
      },
      {
        question: 'Can self-hosted automation engines be deployed for data privacy?',
        answer: 'Yes. We deploy self-hosted n8n and custom Python microservices in your private cloud to ensure sensitive company data never leaves your infrastructure.',
      },
    ],
    cta: {
      headline: 'Put Your Repetitive Workflows on Autopilot',
      subheadline: 'Save hundreds of team hours monthly with custom business automation.',
      buttonText: 'Schedule Automation Audit',
      buttonLink: '/contact',
    },
  },

  {
    id: 'api-sys-integration',
    slug: 'api-system-integration',
    title: 'API & System Integration',
    shortDescription: 'Connect disparate software ecosystems with resilient REST & GraphQL middleware, webhook pipelines, and secure enterprise ETL data bridges.',
    groupId: 'automation-integration',
    groupName: 'Automation & Integration',
    iconName: 'Network',
    overview: {
      headline: 'Unify Your Disparate Software into One Cohesive Ecosystem',
      description:
        '// TODO(content): [PLACEHOLDER] Break down data silos across your organization. We engineer robust middleware, webhook relays, and secure API gateways that allow disparate third-party SaaS tools, legacy mainframes, and modern web services to communicate reliably in real time.',
      benefits: [
        'Unified single-pane-of-glass data availability across organizational tools',
        'Sub-second webhook delivery with guaranteed at-least-once message delivery',
        'Standardized RESTful and GraphQL schemas across fragmented databases',
        'Air-tight authentication (OAuth2, JWT, mTLS) and rate limiting',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'Custom API Gateway & Middleware',
          description: 'High-throughput proxy layers handling authentication, caching, and rate limiting.',
        },
        {
          title: 'Webhook Ingestion & Event Bridges',
          description: 'Resilient webhook handlers with Redis message queues and idempotent processing.',
        },
        {
          title: 'Third-Party SaaS Connectors',
          description: 'Custom adapters for ERPs, payment gateways, shipping providers, and CRMs.',
        },
        {
          title: 'Data Synchronization & ETL Pipelines',
          description: 'Scheduled or real-time bi-directional database synchronization.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Interface & Protocol Audit', description: 'Analyzing endpoints, authentication protocols, rate limits, and schemas.' },
      { step: 2, title: 'Data Schema Mapping', description: 'Drafting unified data dictionaries and message transformation rules.' },
      { step: 3, title: 'Middleware Engineering', description: 'Building fault-tolerant message brokers with Redis/RabbitMQ.' },
      { step: 4, title: 'Load Testing & Failure Simulation', description: 'Testing network timeouts, unexpected payload shapes, and high concurrency.' },
      { step: 5, title: 'Production Cutover & Telemetry', description: 'Deploying with APM tracing, alerting dashboards, and runbook documentation.' },
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
        answer: 'We incorporate persistent message queues (e.g. Redis/RabbitMQ) and idempotency keys, guaranteeing that messages are safely retried until the downstream service recovers.',
      },
      {
        question: 'Can you connect modern cloud software to on-premise legacy servers?',
        answer: 'Yes. We configure secure VPN tunnels, reverse proxies, and agent-based middleware that bridge on-premise infrastructure with cloud services without compromising firewall security.',
      },
      {
        question: 'Do you supply documentation for integrated APIs?',
        answer: 'Always. Every integration includes interactive Swagger/OpenAPI documentation, test fixtures, and architectural topology diagrams.',
      },
    ],
    cta: {
      headline: 'Unify Your Systems with Fault-Tolerant Integrations',
      subheadline: 'Eliminate data silos with custom middleware and enterprise API bridges.',
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
    shortDescription: 'Memorable brand identities, digital design systems, marketing collateral, and UI/UX design assets that elevate brand credibility.',
    groupId: 'creative',
    groupName: 'Creative',
    iconName: 'Palette',
    overview: {
      headline: 'Distinctive Visual Identities and High-Conversion Design Systems',
      description:
        '// TODO(content): [PLACEHOLDER] Great design turns casual browsers into brand advocates. Our creative team develops comprehensive brand identities, vector asset libraries, social media creative kits, and high-converting marketing materials crafted with precision.',
      benefits: [
        'Distinctive, coherent brand identity guidelines and asset kits',
        'Vector-perfect SVG assets optimized for lightning-fast web rendering',
        'Consistent design language across print, digital, and social channels',
        'Production-ready Figma design system tokens and modular UI components',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'Brand Identity & Logo Systems',
          description: 'Logomarks, typography pairing, color palettes, and brand guidelines.',
        },
        {
          title: 'Digital Marketing & Social Collateral',
          description: 'High-impact ad banners, social templates, pitch decks, and email graphics.',
        },
        {
          title: 'Iconography & Custom Illustrations',
          description: 'Bespoke vector icon sets and editorial illustrations tailored to your brand voice.',
        },
        {
          title: 'Print & Packaging Collateral',
          description: 'Business stationery, event booth designs, merchandise, and product packaging.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Creative Discovery & Moodboards', description: 'Understanding brand values, competitive landscape, and visual aesthetics.' },
      { step: 2, title: 'Conceptual Sketching & Iteration', description: 'Exploring diverse logo and layout directions with client feedback loops.' },
      { step: 3, title: 'Vector Refinement & Polish', description: 'Precision mathematical vector alignment, typography kerning, and color contrast testing.' },
      { step: 4, title: 'Asset Toolkit Compilation', description: 'Exporting master files in all web and print formats (SVG, PNG, PDF, EPS).' },
      { step: 5, title: 'Brand Style Guide Delivery', description: 'Comprehensive brand guidelines documenting proper usage and typography.' },
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
        answer: 'We deliver full vector master files (.AI, .EPS, .SVG) as well as optimized raster exports (.PNG with transparency, .WEBP, .PDF) across all color variations (full color, monochrome, reverse dark).',
      },
      {
        question: 'Do we retain full commercial ownership of all designs created?',
        answer: 'Yes. 100% of intellectual property, copyright, and master source files belong entirely to you upon project sign-off.',
      },
      {
        question: 'Can you create a design system that our development team can use in code?',
        answer: 'Absolutely. We specialize in design-to-code pipelines, exporting Figma tokens directly to Tailwind CSS variables and modular component libraries.',
      },
    ],
    cta: {
      headline: 'Elevate Your Brand with World-Class Visual Design',
      subheadline: 'Stand out in crowded markets with memorable branding and digital assets.',
      buttonText: 'Request Design Portfolio',
      buttonLink: '/contact',
    },
  },

  {
    id: 'video-editing',
    slug: 'video-editing',
    title: 'Video Editing',
    shortDescription: 'High-impact video production, motion design, promotional trailers, and social video reels that captivate audiences and drive conversions.',
    groupId: 'creative',
    groupName: 'Creative',
    iconName: 'Video',
    overview: {
      headline: 'Dynamic Video Content and Motion Design That Captivates',
      description:
        '// TODO(content): [PLACEHOLDER] Video is the most powerful storytelling medium on the web. We edit cinematic product commercials, software SaaS explainers, dynamic social reels, and corporate presentations that stop the scroll and communicate complex ideas effortlessly.',
      benefits: [
        'Cinematic pacing, color grading, and dynamic audio sound design',
        'Multi-platform aspect ratios (16:9 widescreen, 9:16 vertical reels, 1:1 square)',
        'High-energy 2D/3D motion graphics and UI screen recordings',
        'Fast turnaround with collaborative frame-accurate review rounds',
      ],
    },
    whatWeDeliver: {
      headline: 'What We Deliver',
      items: [
        {
          title: 'SaaS Product Walkthroughs & Explainers',
          description: 'Crisp screen capture editing with animated cursor callouts and motion graphics.',
        },
        {
          title: 'Short-Form Social Reels',
          description: 'TikTok, Instagram Reels, and YouTube Shorts formatted for maximum viral watch time.',
        },
        {
          title: 'Commercial & Promotional Videos',
          description: 'Cinematic brand teasers, event recaps, and video ads with licensed music.',
        },
        {
          title: 'Motion Graphics & Title Animations',
          description: 'Logo reveals, kinetic typography, lower thirds, and animated infographic overlays.',
        },
      ],
    },
    process: [
      { step: 1, title: 'Creative Brief & Storyboard', description: 'Scripting, audio pacing, visual style references, and storyboard mapping.' },
      { step: 2, title: 'Assembly & Rough Cut', description: 'Footage ingestion, audio sync, narrative pacing, and basic transitions.' },
      { step: 3, title: 'Motion Graphics & Title Styling', description: 'Animated callouts, kinetic typography, and visual effect overlays.' },
      { step: 4, title: 'Color Grading & Audio Mastering', description: 'Professional color calibration, noise reduction, sound effects, and loudness mastering.' },
      { step: 5, title: 'Multi-Format Delivery', description: 'High-bitrate 4K master files and compressed, web-optimized MP4/WEBP exports.' },
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
        question: "Can you create videos if we don't have existing raw footage?",
        answer: 'Yes. We create 100% motion-graphic SaaS explainers using screen captures, animated vector UI illustrations, licensed stock footage, and kinetic typography.',
      },
      {
        question: 'What is the typical turnaround time for a promo video?',
        answer: 'Standard project turnarounds range from 5 to 10 business days, including two rounds of collaborative revision.',
      },
      {
        question: 'Do you supply licensed background music and sound effects?',
        answer: 'Yes. All delivered video assets include full commercial licensing for audio tracks, sound design elements, and voiceovers.',
      },
    ],
    cta: {
      headline: 'Tell Your Story with High-Impact Video & Motion',
      subheadline: 'Boost conversions and engagement with professional video editing.',
      buttonText: 'Discuss Video Project',
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
