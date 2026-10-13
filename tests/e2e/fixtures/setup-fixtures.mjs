/**
 * Fixture Generator for Test Harness Self-Verification
 * Creates a compliant sample static export in tests/e2e/fixtures/sample_out
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXPECTED_SERVICE_SLUGS } from '../helpers.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FIXTURES_DIR = path.resolve(__dirname, 'sample_out');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function createSampleExport() {
  ensureDir(FIXTURES_DIR);

  const headCommon = `
    <title>Apex Digital | Modern Marketing Agency</title>
    <meta name="description" content="Award-winning marketing and engineering agency crafting high-impact digital solutions.">
    <meta property="og:title" content="Apex Digital | Modern Marketing Agency">
    <meta property="og:description" content="Award-winning marketing and engineering agency crafting high-impact digital solutions.">
    <meta property="og:url" content="https://example.com">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="/favicon.ico">
    <script>
      (function() {
        try {
          var t = localStorage.getItem('theme');
          if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          }
        } catch(e) {}
      })();
    </script>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Apex Digital",
        "url": "https://example.com"
      }
    </script>
  `;

  const navbarHtml = `
    <header class="sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a href="/" class="text-xl font-bold">Apex Digital</a>
        <div class="hidden md:flex gap-6">
          <a href="/services">Services</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/about">About</a>
          <a href="/team">Team</a>
          <a href="/process">Process</a>
          <a href="/contact">Contact</a>
        </div>
        <div class="flex items-center gap-4">
          <button aria-label="Toggle theme" class="theme-toggle p-2">Theme</button>
          <a href="/contact" class="btn-primary">Get a Quote</a>
        </div>
      </nav>
    </header>
  `;

  const footerHtml = `
    <footer class="bg-surface border-t">
      <div class="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <p class="font-bold">Apex Digital</p>
          <p class="text-sm">Dhaka, Bangladesh</p>
          <p class="text-sm">hello@example.com</p>
        </div>
        <div>
          <p class="font-semibold">Services</p>
          <a href="/services">All Services</a>
        </div>
        <div>
          <p class="font-semibold">Company</p>
          <a href="/about">About</a>
          <a href="/team">Team</a>
          <a href="/process">Process</a>
          <a href="/contact">Contact</a>
        </div>
        <div>
          <p class="font-semibold">Legal</p>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
      <div class="text-center py-4 border-t text-sm">
        &copy; 2026 Apex Digital. All rights reserved.
      </div>
    </footer>
  `;

  // 1. Home page (out/index.html)
  const homeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  ${headCommon}
</head>
<body class="overflow-x-hidden min-h-screen">
  ${navbarHtml}
  <main class="w-full">
    <!-- Hero -->
    <section class="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 class="text-5xl font-extrabold">Engineering Tomorrow's Digital Products Today</h1>
      <p class="mt-4 text-xl max-w-2xl mx-auto">We architect high-impact digital experiences for scale.</p>
      <div class="mt-8 flex justify-center gap-4">
        <a href="/contact" class="btn">Start a Project</a>
        <a href="/portfolio" class="btn">View Our Work</a>
      </div>
    </section>

    <!-- Trust bar -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <p class="text-center font-medium text-muted">Trusted by industry leaders and partners</p>
      <div class="flex justify-center gap-8 mt-4">
        <img src="/logo/p1.svg" alt="Partner 1" class="h-8 max-w-full">
        <img src="/logo/p2.svg" alt="Partner 2" class="h-8 max-w-full">
      </div>
    </section>

    <!-- Services Overview -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold">Services Overview</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div class="card p-6"><a href="/services">Web & Software</a></div>
        <div class="card p-6"><a href="/services">Mobile & Games</a></div>
        <div class="card p-6"><a href="/services">Automation & Integration</a></div>
        <div class="card p-6"><a href="/services">Creative</a></div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold">Featured Projects & Case Studies</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div class="card"><a href="/portfolio/fintech-app">Fintech Banking Platform</a></div>
        <div class="card"><a href="/portfolio/logistics-saas">Logistics SaaS</a></div>
        <div class="card"><a href="/portfolio/ai-automation">AI Automation Engine</a></div>
      </div>
    </section>

    <!-- Stats Strip -->
    <section class="max-w-7xl mx-auto px-4 py-12 bg-muted">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div><p class="text-3xl font-bold">5+ [PLACEHOLDER]</p><p>Years of Experience</p></div>
        <div><p class="text-3xl font-bold">120+ [PLACEHOLDER]</p><p>Projects Delivered</p></div>
        <div><p class="text-3xl font-bold">80+ [PLACEHOLDER]</p><p>Satisfied Clients</p></div>
        <div><p class="text-3xl font-bold">15+ [PLACEHOLDER]</p><p>Countries Served</p></div>
      </div>
    </section>

    <!-- Process Preview -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold">Our Process & How We Work</h2>
      <p class="mt-2">5-step agile workflow delivery.</p>
      <a href="/process" class="mt-4 inline-block text-accent">Learn full process &rarr;</a>
    </section>

    <!-- Tech Stack Strip -->
    <section class="max-w-7xl mx-auto px-4 py-12">
      <h2 class="text-2xl font-bold text-center">Technologies & Tools</h2>
      <p class="text-center mt-2">Next.js, TypeScript, Tailwind, Node.js, Python, PostgreSQL</p>
    </section>

    <!-- CTA Banner -->
    <section class="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 class="text-4xl font-bold">Ready to Start Your Next Project?</h2>
      <p class="mt-4">Let's talk about your vision and goals.</p>
      <a href="/contact" class="btn mt-6 inline-block">Get in Touch</a>
    </section>
  </main>
  ${footerHtml}
</body>
</html>`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'index.html'), homeHtml);

  // 2. Services Overview (out/services/index.html)
  ensureDir(path.join(FIXTURES_DIR, 'services'));
  const servicesHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headCommon}</head>
<body class="overflow-x-hidden min-h-screen">
  ${navbarHtml}
  <main class="max-w-7xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">Our Services</h1>
    <div class="mt-8">
      <h2>Web & Software</h2>
      <a href="/services/web-design-development">Web Design & Development</a>
      <a href="/services/software-design-development">Software Design & Development</a>
      <a href="/services/website-software-maintenance">Website & Software Maintenance</a>
      <h2>Mobile & Games</h2>
      <a href="/services/mobile-app-development">Mobile App Development</a>
      <a href="/services/game-development">Game Development</a>
      <h2>Automation & Integration</h2>
      <a href="/services/business-automation">Business Automation</a>
      <a href="/services/api-system-integration">API & System Integration</a>
      <h2>Creative</h2>
      <a href="/services/graphics-design">Graphics Design</a>
      <a href="/services/video-editing">Video Editing</a>
    </div>
  </main>
  ${footerHtml}
</body>
</html>`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'services', 'index.html'), servicesHtml);

  // 3. Dynamic Services (out/services/[slug]/index.html)
  for (const slug of EXPECTED_SERVICE_SLUGS) {
    const serviceDir = path.join(FIXTURES_DIR, 'services', slug);
    ensureDir(serviceDir);
    const serviceHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headCommon}</head>
<body class="overflow-x-hidden min-h-screen">
  ${navbarHtml}
  <main class="max-w-7xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">${slug.replace(/-/g, ' ')}</h1>
    <section>
      <h2>About this Service Overview</h2>
      <p>Comprehensive engineering overview and benefits for this service.</p>
    </section>
    <section>
      <h2>What We Deliver</h2>
      <ul><li>Custom architecture</li><li>Production deployment</li></ul>
    </section>
    <section>
      <h2>Delivery Process & Workflow</h2>
      <ol><li>Discovery</li><li>Implementation</li></ol>
    </section>
    <section>
      <h2>Technologies & Stack</h2>
      <p>Next.js, Node.js, Cloud</p>
    </section>
    <section>
      <h2>Frequently Asked Questions FAQ</h2>
      <p>Q: How long does it take? A: 4 to 8 weeks.</p>
    </section>
    <section>
      <a href="/contact" class="btn">Get a Quote for this Service</a>
    </section>
  </main>
  ${footerHtml}
</body>
</html>`;
    fs.writeFileSync(path.join(serviceDir, 'index.html'), serviceHtml);
  }

  // 4. Portfolio Overview & Case Study
  ensureDir(path.join(FIXTURES_DIR, 'portfolio'));
  const portfolioHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headCommon}</head>
<body class="overflow-x-hidden min-h-screen">
  ${navbarHtml}
  <main class="max-w-7xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">Portfolio Case Studies</h1>
    <div class="filters">Filter categories: All, Web & Software, Mobile, Automation</div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div class="card"><a href="/portfolio/fintech-app">Fintech Mobile App</a></div>
    </div>
  </main>
  ${footerHtml}
</body>
</html>`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'portfolio', 'index.html'), portfolioHtml);

  ensureDir(path.join(FIXTURES_DIR, 'portfolio', 'fintech-app'));
  const caseStudyHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headCommon}</head>
<body class="overflow-x-hidden min-h-screen">
  ${navbarHtml}
  <main class="max-w-7xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">Fintech Mobile App</h1>
    <section><h2>Problem & Challenge</h2><p>Legacy systems lacked modern UX.</p></section>
    <section><h2>Our Solution & Approach</h2><p>Engineered reactive microservices.</p></section>
    <section><h2>Technologies & Stack</h2><p>React Native, Node.js, AWS</p></section>
    <section><h2>Results & Metrics</h2><p>+300% user engagement.</p></section>
  </main>
  ${footerHtml}
</body>
</html>`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'portfolio', 'fintech-app', 'index.html'), caseStudyHtml);

  // 5. About page
  ensureDir(path.join(FIXTURES_DIR, 'about'));
  const aboutHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headCommon}</head>
<body class="overflow-x-hidden min-h-screen">
  ${navbarHtml}
  <main class="max-w-7xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">About Us</h1>
    <section><h2>Our Story</h2><p>Founded to engineer digital solutions.</p></section>
    <section><h2>Our Mission & Vision</h2><p>Empowering businesses globally.</p></section>
    <section><h2>Core Values & Principles</h2><p>Integrity, quality, performance.</p></section>
  </main>
  ${footerHtml}
</body>
</html>`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'about', 'index.html'), aboutHtml);

  // 6. Team page
  ensureDir(path.join(FIXTURES_DIR, 'team'));
  const teamHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headCommon}</head>
<body class="overflow-x-screen min-h-screen">
  ${navbarHtml}
  <main class="max-w-7xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">Leadership Team</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      <div><h2>Chief Technology Officer [PLACEHOLDER]</h2><p>Bio details</p></div>
      <div><h2>Creative Director [PLACEHOLDER]</h2><p>Bio details</p></div>
      <div><h2>Head of Product [PLACEHOLDER]</h2><p>Bio details</p></div>
    </div>
  </main>
  ${footerHtml}
</body>
</html>`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'team', 'index.html'), teamHtml);

  // 7. Process page
  ensureDir(path.join(FIXTURES_DIR, 'process'));
  const processHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headCommon}</head>
<body class="overflow-x-hidden min-h-screen">
  ${navbarHtml}
  <main class="max-w-7xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">Our Delivery Process & Methodology</h1>
    <div class="steps mt-8">
      <div><h2>Step 1: Discovery & Planning</h2><p>Deep requirements gathering.</p></div>
      <div><h2>Step 2: Architecture & Design</h2><p>Figma designs and specs.</p></div>
      <div><h2>Step 3: Development</h2><p>Production engineering.</p></div>
      <div><h2>Step 4: Quality Assurance</h2><p>Automated and manual testing.</p></div>
      <div><h2>Step 5: Launch & Handover</h2><p>Deployment and monitoring.</p></div>
    </div>
  </main>
  ${footerHtml}
</body>
</html>`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'process', 'index.html'), processHtml);

  // 8. Contact page
  ensureDir(path.join(FIXTURES_DIR, 'contact'));
  const contactHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headCommon}</head>
<body class="overflow-x-hidden min-h-screen">
  ${navbarHtml}
  <main class="max-w-7xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">Contact Us</h1>
    <p>Operating in Dhaka, Bangladesh (Mon - Fri: 9:00 AM - 6:00 PM GMT+6 hours).</p>
    <div class="mt-4 flex gap-4">
      <a href="https://wa.me/8801700000000" class="btn">Chat on WhatsApp</a>
      <a href="mailto:hello@example.com" class="btn">Send Email</a>
    </div>
    <form class="mt-8 max-w-xl">
      <!-- Honeypot -->
      <div class="hidden" style="display: none;">
        <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" />
      </div>
      <div>
        <label for="name">Name</label>
        <input id="name" type="text" name="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" name="email" required />
      </div>
      <div>
        <label for="service">Service Interested In</label>
        <select id="service" name="service">
          <option value="web-design-development">Web Design & Development</option>
          <option value="software-design-development">Software Design & Development</option>
          <option value="website-software-maintenance">Website & Software Maintenance</option>
          <option value="mobile-app-development">Mobile App Development</option>
          <option value="game-development">Game Development</option>
          <option value="business-automation">Business Automation</option>
          <option value="api-system-integration">API & System Integration</option>
          <option value="graphics-design">Graphics Design</option>
          <option value="video-editing">Video Editing</option>
        </select>
      </div>
      <div>
        <label for="budget">Budget Range</label>
        <input id="budget" type="text" name="budget" placeholder="Budget investment" />
      </div>
      <div>
        <label for="timeline">Project Timeline</label>
        <input id="timeline" type="text" name="timeline" placeholder="Expected timeline" />
      </div>
      <div>
        <label for="message">Message</label>
        <textarea id="message" name="message" required></textarea>
      </div>
      <button type="submit">Submit Inquiry</button>
    </form>
  </main>
  ${footerHtml}
</body>
</html>`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'contact', 'index.html'), contactHtml);

  // 9. Privacy page
  ensureDir(path.join(FIXTURES_DIR, 'privacy'));
  const privacyHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headCommon}</head>
<body class="overflow-x-hidden min-h-screen">
  ${navbarHtml}
  <main class="max-w-7xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">Privacy Policy</h1>
    <p>This Privacy Policy describes how Apex Digital collects and uses your information and data.</p>
  </main>
  ${footerHtml}
</body>
</html>`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'privacy', 'index.html'), privacyHtml);

  // 10. Terms page
  ensureDir(path.join(FIXTURES_DIR, 'terms'));
  const termsHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headCommon}</head>
<body class="overflow-x-hidden min-h-screen">
  ${navbarHtml}
  <main class="max-w-7xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">Terms of Service</h1>
    <p>These Terms of Service constitute an agreement with Apex Digital regarding intellectual property and limitations.</p>
  </main>
  ${footerHtml}
</body>
</html>`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'terms', 'index.html'), termsHtml);

  // 11. 404 page (out/404.html)
  const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headCommon}</head>
<body class="overflow-x-hidden min-h-screen">
  ${navbarHtml}
  <main class="max-w-7xl mx-auto px-4 py-20 text-center">
    <h1 class="text-6xl font-bold">404 - Page Not Found</h1>
    <p class="mt-4">The page you are looking for might have been moved or removed.</p>
    <a href="/" class="btn mt-6 inline-block">Back to Home</a>
  </main>
  ${footerHtml}
</body>
</html>`;
  fs.writeFileSync(path.join(FIXTURES_DIR, '404.html'), notFoundHtml);

  // 12. sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc></url>
  <url><loc>https://example.com/services</loc></url>
  ${EXPECTED_SERVICE_SLUGS.map((slug) => `<url><loc>https://example.com/services/${slug}</loc></url>`).join('\n  ')}
  <url><loc>https://example.com/portfolio</loc></url>
  <url><loc>https://example.com/portfolio/fintech-app</loc></url>
  <url><loc>https://example.com/about</loc></url>
  <url><loc>https://example.com/team</loc></url>
  <url><loc>https://example.com/process</loc></url>
  <url><loc>https://example.com/contact</loc></url>
  <url><loc>https://example.com/privacy</loc></url>
  <url><loc>https://example.com/terms</loc></url>
</urlset>`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'sitemap.xml'), sitemapXml);

  // 13. robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml
`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'robots.txt'), robotsTxt);

  console.log(`Generated compliant sample export in: ${FIXTURES_DIR}`);
}

// Auto-run if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createSampleExport();
}
