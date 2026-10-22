import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = ['.next', 'out'];

for (const target of targets) {
  const resolved = path.resolve(root, target);
  if (!resolved.startsWith(root + path.sep)) {
    throw new Error(`Refusing to remove path outside the project: ${resolved}`);
  }
  if (fs.existsSync(resolved)) {
    fs.rmSync(resolved, { recursive: true, force: true });
    console.log(`removed ${target}/`);
  } else {
    console.log(`skipped ${target}/ (not present)`);
  }
}
