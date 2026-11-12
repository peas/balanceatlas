#!/usr/bin/env node
// Post-build step (npm run build): the festival pages must not answer on balanceatlas.com (Paulo, 12/11/2026).
// Moves every built HTML page from dist/festival/ to dist/hf/, so balanceatlas.com/festival/ is a 404 while the
// Worker of handstandfest.com.br (worker-handstandfest/) reads the pages from /hf/. Images, video and other
// assets stay in dist/festival/: the pages reference them there. `astro dev` is untouched (/festival/ locally).
// Usage: node scripts/festival_hide.mjs [--help]
import { existsSync, readdirSync, rmSync, statSync, mkdirSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';

if (process.argv.includes('--help')) { console.log('Moves dist/festival/**/*.html to dist/hf/ after `astro build`. No options.'); process.exit(0); }
const from = 'dist/festival', to = 'dist/hf';
if (!existsSync(from)) { console.error(`${from} not found: run astro build first`); process.exit(1); }
let moved = 0;
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) {
      const target = join(to, path.slice(from.length));
      mkdirSync(dirname(target), { recursive: true });
      renameSync(path, target);
      moved++;
    }
  }
  if (dir !== from && readdirSync(dir).length === 0) rmSync(dir, { recursive: true });
};
walk(from);
console.log(`festival_hide: ${moved} pages moved to ${to}/`);
