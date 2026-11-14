import { chromium } from '/Users/peas/paulo.com.br/node_modules/playwright/index.mjs';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 2560, height: 1440 } });
await p.goto('file://' + process.cwd() + '/banner.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
await p.screenshot({ path: 'banner.png' });
await p.screenshot({ path: 'banner-safe.png', clip: { x: 507, y: 508, width: 1546, height: 423 } }); await b.close();
