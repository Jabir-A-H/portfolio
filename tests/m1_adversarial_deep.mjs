import vm from 'node:vm';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

console.log('=== Deep Adversarial Stress Testing ===\n');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${testName}: ${details}`);
  }
}

// 1. Theme Initializer Anti-FOUC Logic Matrix
console.log('--- 1. Anti-FOUC Script Simulation Matrix (VM) ---');
const indexHtml = fs.readFileSync(path.join(process.cwd(), 'out', 'index.html'), 'utf8');
const scriptMatch = indexHtml.match(/<script id="theme-initializer">([\s\S]*?)<\/script>/);

assert(Boolean(scriptMatch), 'Extracted inline anti-FOUC script from out/index.html');
const scriptCode = scriptMatch ? scriptMatch[1] : '';

function runThemeScriptInContext({ storedTheme, systemDark, throwOnStorage = false }) {
  const classList = new Set();
  const document = {
    documentElement: {
      classList: {
        add: (cls) => classList.add(cls),
        remove: (cls) => classList.delete(cls),
        contains: (cls) => classList.has(cls),
      },
    },
  };

  const localStorage = {
    getItem: (key) => {
      if (throwOnStorage) throw new Error('SecurityError: The operation is insecure.');
      return storedTheme;
    },
  };

  const window = {
    matchMedia: (query) => ({
      matches: systemDark,
      media: query,
    }),
  };

  const sandbox = {
    document,
    localStorage,
    window,
  };

  const context = vm.createContext(sandbox);
  vm.runInContext(scriptCode, context);

  return classList.has('dark');
}

assert(runThemeScriptInContext({ storedTheme: 'dark', systemDark: false }) === true,
  'Case A: localStorage="dark" -> adds "dark" class regardless of system');

assert(runThemeScriptInContext({ storedTheme: 'light', systemDark: true }) === false,
  'Case B: localStorage="light" -> removes "dark" class even if system is dark');

assert(runThemeScriptInContext({ storedTheme: null, systemDark: true }) === true,
  'Case C: localStorage=null, systemDark=true -> adds "dark" class');

assert(runThemeScriptInContext({ storedTheme: null, systemDark: false }) === false,
  'Case D: localStorage=null, systemDark=false -> removes "dark" class');

assert(runThemeScriptInContext({ storedTheme: 'system', systemDark: true }) === true,
  'Case E: localStorage="system", systemDark=true -> adds "dark" class');

assert(runThemeScriptInContext({ storedTheme: 'system', systemDark: false }) === false,
  'Case F: localStorage="system", systemDark=false -> removes "dark" class');

let threwInSandbox = false;
try {
  runThemeScriptInContext({ throwOnStorage: true, systemDark: true });
} catch (e) {
  threwInSandbox = true;
}
assert(!threwInSandbox, 'Case G: localStorage throws SecurityError -> caught by try/catch without crashing');


// 2. Trailing Slash and Routing File Structures
console.log('\n--- 2. Static Routing Directory Structure ---');
// With trailingSlash: true in next.config.ts:
// Next.js produces:
// out/index.html
// out/404.html
// out/404/index.html
const outDir = path.join(process.cwd(), 'out');
assert(fs.existsSync(path.join(outDir, 'index.html')), 'out/index.html exists');
assert(fs.existsSync(path.join(outDir, '404.html')), 'out/404.html exists for Apache/Nginx error_page');
assert(fs.existsSync(path.join(outDir, '404', 'index.html')), 'out/404/index.html exists for static directory index routers');


// 3. Static HTTP Web Server Delivery Simulation
console.log('\n--- 3. Static HTTP Delivery Simulation ---');
async function testStaticServer() {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
  };

  const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    if (reqUrl.endsWith('/')) reqUrl += 'index.html';
    const filePath = path.join(outDir, reqUrl);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(path.join(outDir, '404.html')));
    }
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;

  async function fetchUrl(subpath) {
    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}${subpath}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
      }).on('error', reject);
    });
  }

  try {
    const resRoot = await fetchUrl('/');
    assert(resRoot.status === 200, 'GET / returns HTTP 200 OK');
    assert(resRoot.headers['content-type'].includes('text/html'), 'GET / returns Content-Type text/html');
    assert(resRoot.body.includes('<!DOCTYPE html>'), 'GET / body contains pre-rendered DOCTYPE');

    const res404 = await fetchUrl('/non-existent-page-xyz/');
    assert(res404.status === 404, 'GET /non-existent-page-xyz/ returns HTTP 404');
    assert(res404.body.includes('404'), 'GET /non-existent-page-xyz/ serves 404 page content');

    const resLogo = await fetchUrl('/logo/placeholder.svg');
    assert(resLogo.status === 200, 'GET /logo/placeholder.svg returns HTTP 200 OK');
    assert(resLogo.headers['content-type'] === 'image/svg+xml', 'GET /logo/placeholder.svg returns image/svg+xml');

    // Extract css path from indexHtml
    const cssMatch = indexHtml.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/);
    if (cssMatch) {
      const resCss = await fetchUrl(cssMatch[1]);
      assert(resCss.status === 200, `GET ${cssMatch[1]} returns HTTP 200 OK`);
      assert(resCss.headers['content-type'].includes('text/css'), 'CSS returns Content-Type text/css');
      assert(resCss.body.includes('--primary'), 'CSS body contains --primary design token');
    }
  } finally {
    server.close();
  }
}

await testStaticServer();

console.log('\n=============================================');
console.log(`TOTAL PASSED: ${passedTests}`);
console.log(`TOTAL FAILED: ${failedTests}`);
console.log('=============================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
