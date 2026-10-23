import fs from 'node:fs';
import path from 'node:path';

const PROJECTS = [
  {
    slug: 'apex-cloud-erp',
    thumbName: 'apex-erp-thumb',
    code: 'SYS-01',
    title: 'Apex Cloud ERP',
    category: 'Web & Software',
    metric: '-74% Sync Latency',
    diagramType: 'cluster',
  },
  {
    slug: 'fitpulse-mobile-app',
    thumbName: 'fitpulse-thumb',
    code: 'MOB-02',
    title: 'FitPulse Mobile',
    category: 'Mobile & Games',
    metric: '4.9★ Store Rating',
    diagramType: 'mobile',
  },
  {
    slug: 'logiflow-warehouse-automation',
    thumbName: 'logiflow-thumb',
    code: 'AUTO-03',
    title: 'LogiFlow Robotics',
    category: 'Automation & Integration',
    metric: '180 hrs / mo Saved',
    diagramType: 'pipeline',
  },
  {
    slug: 'nordic-fintech-portal',
    thumbName: 'nordic-pay-thumb',
    code: 'FIN-04',
    title: 'Nordic Pay FX',
    category: 'Web & Software',
    metric: '€12M+ Volume',
    diagramType: 'candlestick',
  },
  {
    slug: 'nebula-tactics-mobile-game',
    thumbName: 'nebula-tactics-thumb',
    code: 'GAME-05',
    title: 'Nebula Tactics',
    category: 'Mobile & Games',
    metric: '+38% D30 Retention',
    diagramType: 'hexgrid',
  },
  {
    slug: 'lumina-brand-relaunch',
    thumbName: 'lumina-brand-thumb',
    code: 'DSGN-06',
    title: 'Lumina Studio',
    category: 'Creative',
    metric: '+52% Conversion',
    diagramType: 'tokens',
  },
];

function generateSvg({ code, title, category, metric, diagramType }) {
  // 640x400 aspect ratio 16:10
  const width = 640;
  const height = 400;

  let diagramMarkup = '';

  if (diagramType === 'cluster') {
    diagramMarkup = `
      <!-- Database Cluster Diagram -->
      <rect x="220" y="140" width="80" height="40" rx="2" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="260" y="165" font-family="monospace" font-size="11" fill="#e4e4e7" text-anchor="middle">PRIMARY</text>
      <rect x="340" y="100" width="80" height="40" rx="2" fill="#18181b" stroke="#f97316" stroke-width="1.5"/>
      <text x="380" y="125" font-family="monospace" font-size="11" fill="#f97316" text-anchor="middle">REPLICA 1</text>
      <rect x="340" y="180" width="80" height="40" rx="2" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="380" y="205" font-family="monospace" font-size="11" fill="#e4e4e7" text-anchor="middle">REPLICA 2</text>
      <path d="M 300 160 L 340 120" stroke="#f97316" stroke-width="1.5" stroke-dasharray="3 3"/>
      <path d="M 300 160 L 340 200" stroke="#52525b" stroke-width="1.5"/>
      <circle cx="300" cy="160" r="3" fill="#f97316"/>
      <circle cx="340" cy="120" r="3" fill="#f97316"/>
      <circle cx="340" cy="200" r="3" fill="#52525b"/>
    `;
  } else if (diagramType === 'mobile') {
    diagramMarkup = `
      <!-- Mobile Telemetry Frame -->
      <rect x="250" y="90" width="140" height="220" rx="12" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <rect x="290" y="100" width="60" height="6" rx="3" fill="#27272a"/>
      <!-- Pulse Line -->
      <path d="M 265 210 L 290 210 L 300 180 L 315 240 L 325 190 L 335 220 L 345 205 L 375 205" stroke="#f97316" stroke-width="2" fill="none"/>
      <text x="320" y="150" font-family="monospace" font-size="16" fill="#f43f5e" text-anchor="middle">138 BPM</text>
      <circle cx="300" cy="180" r="3" fill="#f97316"/>
      <circle cx="315" cy="240" r="3" fill="#f97316"/>
    `;
  } else if (diagramType === 'pipeline') {
    diagramMarkup = `
      <!-- Automation Pipeline Nodes -->
      <circle cx="200" cy="160" r="24" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="200" y="164" font-family="monospace" font-size="10" fill="#a1a1aa" text-anchor="middle">IN</text>
      <path d="M 224 160 L 296 160" stroke="#f97316" stroke-width="2"/>
      <polygon points="296,156 304,160 296,164" fill="#f97316"/>
      <rect x="304" y="136" width="64" height="48" rx="2" fill="#18181b" stroke="#f97316" stroke-width="1.5"/>
      <text x="336" y="165" font-family="monospace" font-size="11" fill="#f97316" text-anchor="middle">QUEUE</text>
      <path d="M 368 160 L 440 160" stroke="#3f3f46" stroke-width="1.5" stroke-dasharray="4 4"/>
      <circle cx="440" cy="160" r="24" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="440" y="164" font-family="monospace" font-size="10" fill="#a1a1aa" text-anchor="middle">OUT</text>
    `;
  } else if (diagramType === 'candlestick') {
    diagramMarkup = `
      <!-- Financial Market Chart -->
      <line x1="220" y1="120" x2="220" y2="220" stroke="#27272a" stroke-width="1"/>
      <rect x="210" y="150" width="20" height="40" fill="#10b981" rx="1"/>
      <line x1="270" y1="100" x2="270" y2="240" stroke="#27272a" stroke-width="1"/>
      <rect x="260" y="120" width="20" height="80" fill="#f97316" rx="1"/>
      <line x1="320" y1="110" x2="320" y2="210" stroke="#27272a" stroke-width="1"/>
      <rect x="310" y="130" width="20" height="50" fill="#10b981" rx="1"/>
      <line x1="370" y1="90" x2="370" y2="200" stroke="#27272a" stroke-width="1"/>
      <rect x="360" y="110" width="20" height="60" fill="#10b981" rx="1"/>
      <line x1="420" y1="80" x2="420" y2="180" stroke="#27272a" stroke-width="1"/>
      <rect x="410" y="90" width="20" height="50" fill="#f97316" rx="1"/>
    `;
  } else if (diagramType === 'hexgrid') {
    diagramMarkup = `
      <!-- Hexagon Tactical Grid -->
      <polygon points="320,100 350,117 350,152 320,170 290,152 290,117" fill="#18181b" stroke="#f97316" stroke-width="1.5"/>
      <polygon points="380,100 410,117 410,152 380,170 350,152 350,117" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
      <polygon points="260,100 290,117 290,152 260,170 230,152 230,117" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
      <polygon points="350,152 380,170 380,205 350,222 320,205 320,170" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
      <polygon points="290,152 320,170 320,205 290,222 260,205 260,170" fill="#18181b" stroke="#f97316" stroke-width="1.5"/>
      <circle cx="320" cy="135" r="5" fill="#f97316"/>
      <circle cx="290" cy="187" r="4" fill="#a1a1aa"/>
    `;
  } else {
    // tokens / design system
    diagramMarkup = `
      <!-- Token Specimen Grid -->
      <rect x="220" y="110" width="60" height="60" rx="2" fill="#f97316"/>
      <rect x="290" y="110" width="60" height="60" rx="2" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
      <rect x="360" y="110" width="60" height="60" rx="2" fill="#27272a"/>
      <rect x="220" y="180" width="200" height="24" rx="2" fill="#18181b" stroke="#f97316" stroke-width="1"/>
      <text x="320" y="196" font-family="monospace" font-size="10" fill="#f97316" text-anchor="middle">DISPLAY / 48PX / 1.05</text>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <!-- Background grid pattern -->
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#222429" stroke-width="0.75"/>
    </pattern>
    <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.6"/>
    </radialGradient>
  </defs>

  <!-- Deep architectural dark canvas -->
  <rect width="${width}" height="${height}" fill="#0d0e11"/>
  <!-- Precision grid lines -->
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <!-- Subtle vignette -->
  <rect width="${width}" height="${height}" fill="url(#vignette)"/>

  <!-- Border frame with 2px micro-radius feel -->
  <rect x="12" y="12" width="${width - 24}" height="${height - 24}" fill="none" stroke="#27272a" stroke-width="1"/>

  <!-- Corner registration crosshairs -->
  <g stroke="#f97316" stroke-width="1">
    <line x1="20" y1="28" x2="36" y2="28"/>
    <line x1="28" y1="20" x2="28" y2="36"/>
    
    <line x1="${width - 36}" y1="28" x2="${width - 20}" y2="28"/>
    <line x1="${width - 28}" y1="20" x2="${width - 28}" y2="36"/>

    <line x1="20" y1="${height - 28}" x2="36" y2="${height - 28}"/>
    <line x1="28" y1="${height - 36}" x2="28" y2="${height - 20}"/>

    <line x1="${width - 36}" y1="${height - 28}" x2="${width - 20}" y2="${height - 28}"/>
    <line x1="${width - 28}" y1="${height - 36}" x2="${width - 28}" y2="${height - 20}"/>
  </g>

  <!-- Top Metadata Bar -->
  <text x="48" y="44" font-family="monospace" font-size="11" letter-spacing="0.14em" fill="#f97316" font-weight="bold">${code}</text>
  <text x="120" y="44" font-family="monospace" font-size="10" letter-spacing="0.12em" fill="#71717a">// ${category.toUpperCase()}</text>
  <text x="${width - 48}" y="44" font-family="monospace" font-size="10" letter-spacing="0.12em" fill="#a1a1aa" text-anchor="end">ASPECT 16:10</text>

  <!-- Interactive Diagram Zone -->
  <g transform="translate(0, 20)">
    ${diagramMarkup}
  </g>

  <!-- Bottom Details Bar -->
  <line x1="24" y1="${height - 56}" x2="${width - 24}" y2="${height - 56}" stroke="#222429" stroke-width="1"/>
  <text x="48" y="${height - 34}" font-family="sans-serif" font-size="14" font-weight="600" fill="#fafafa">${title}</text>
  <text x="${width - 48}" y="${height - 34}" font-family="monospace" font-size="11" letter-spacing="0.1em" fill="#f97316" text-anchor="end">${metric}</text>
</svg>`;
}

const targetDir = path.resolve('public/images/projects');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Generate files
for (const p of PROJECTS) {
  const svgContent = generateSvg(p);
  
  // 1. Flat file matching content/projects.ts (both .svg and .jpg naming)
  const svgPath = path.join(targetDir, `${p.thumbName}.svg`);
  const jpgPath = path.join(targetDir, `${p.thumbName}.jpg`);
  
  fs.writeFileSync(svgPath, svgContent, 'utf8');
  // Write SVG content as .jpg too so that if a static request asks for .jpg it receives valid image content
  fs.writeFileSync(jpgPath, svgContent, 'utf8');

  // 2. Subfolder structure matching VISUAL_AND_FEATURE_PLAN.md: images/projects/[slug]/thumb.jpg & cover.jpg
  const projectSubDir = path.join(targetDir, p.slug);
  if (!fs.existsSync(projectSubDir)) {
    fs.mkdirSync(projectSubDir, { recursive: true });
  }
  fs.writeFileSync(path.join(projectSubDir, 'thumb.jpg'), svgContent, 'utf8');
  fs.writeFileSync(path.join(projectSubDir, 'cover.jpg'), svgContent, 'utf8');
  fs.writeFileSync(path.join(projectSubDir, 'detail-01.jpg'), svgContent, 'utf8');
  fs.writeFileSync(path.join(projectSubDir, 'detail-02.jpg'), svgContent, 'utf8');
}

console.log(`Generated architectural placeholder assets for all ${PROJECTS.length} projects in ${targetDir}`);
