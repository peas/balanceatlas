#!/usr/bin/env node
// Publishes the due post of social/queue.yaml on Instagram (@handstandfest).
// Adapted from ~/nordestenerd/social/postar.mjs (same flow, selectors calibrated there).
//
// ASSISTED tool: visible browser, one post per run. If Instagram's UI changed, the script
// stops with a screenshot in .ig-profile/error-<id>.png and marks nothing in the queue.
// Stories are not available on Instagram's desktop web: phone or Meta Business Suite.
//
// Setup: cd social && npm install && npx playwright install chromium
// Session: node post.mjs --login (once; saved in social/.ig-profile/, gitignored)

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import YAML from 'yaml';

const ACCOUNT = 'handstandfest';
const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(DIR, '..');
const QUEUE = join(DIR, 'queue.yaml');
const PROFILE = join(DIR, '.ig-profile');
const BROWSER = { headless: false, viewport: { width: 1280, height: 900 }, locale: 'pt-BR' };
const args = process.argv.slice(2);
const has = (f) => args.includes(f);

if (has('--help') || has('-h')) {
  console.log(`Publishes the due post of social/queue.yaml on Instagram (@${ACCOUNT}).

  node post.mjs              list the queue; if a post is due, ask and publish it
  node post.mjs --yes        publish without asking (the post was already approved)
  node post.mjs --dry-run    only list the queue
  node post.mjs --login      log in once (session saved in .ig-profile/)
  node post.mjs --whoami     open the saved session and print which account is logged in
  node post.mjs --test-only  upload, crop, cover and caption, take screenshots and STOP
                             before Share (.ig-profile/step-*.png)

One post per run. posted_at is written only after Instagram's confirmation is seen.
Stories: not supported on desktop web; use the phone or Meta Business Suite.`);
  process.exit(0);
}

// The profile link in the sidebar tells which account this session belongs to.
const loggedAs = async (page) => (await page.locator(`a[href="/${ACCOUNT}/"]`).count()) > 0;

if (has('--login')) {
  const ctx = await chromium.launchPersistentContext(PROFILE, BROWSER);
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  await page.goto('https://www.instagram.com/accounts/login/');
  console.log(`Log in as @${ACCOUNT} in the window, then close it.`);
  await ctx.waitForEvent('close', { timeout: 0 }).catch(() => {});
  process.exit(0);
}

if (has('--whoami')) {
  const ctx = await chromium.launchPersistentContext(PROFILE, { ...BROWSER, headless: true });
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  await page.goto('https://www.instagram.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);
  const ok = await loggedAs(page);
  console.log(ok ? `Logged in as @${ACCOUNT}.` : `NOT logged in as @${ACCOUNT} (current URL: ${page.url()}).`);
  await ctx.close();
  process.exit(ok ? 0 : 1);
}

const doc = YAML.parseDocument(readFileSync(QUEUE, 'utf8'));
const posts = doc.get('posts');
const now = new Date();
const state = [];
for (const item of posts?.items ?? []) {
  const data = item.toJSON();
  const when = new Date(String(data.when).replace(' ', 'T'));
  // `image` (one picture), `images` (list = carousel) or `video` (Reel .mp4 1080x1920)
  const files = (data.images ?? [data.image ?? data.video]).filter(Boolean).map((f) => resolve(ROOT, String(f)));
  state.push({
    item,
    id: data.id,
    when,
    files,
    posted: data.posted_at,
    video: Boolean(data.video),
    cover: data.cover ? resolve(ROOT, String(data.cover)) : null,
    due: !data.posted_at && !isNaN(+when) && when <= now && files.length > 0 && files.every(existsSync) && String(data.caption ?? '').trim() !== '',
  });
}

for (const p of state) {
  const missing = p.files.filter((f) => !existsSync(f));
  const st = p.posted ? `✓ posted at ${p.posted}` : p.due ? '▶ DUE' : missing.length ? `· missing file ${missing[0]}` : `· waiting for ${p.when.toLocaleString('pt-BR')}`;
  console.log(`${p.id}: ${st}`);
}
const due = state.filter((p) => p.due);
if (has('--dry-run') || due.length === 0) {
  if (!due.length) console.log('\nNo post is due now.');
  process.exit(0);
}

const target = due[0];
if (due.length > 1) console.log(`\n${due.length} posts are due; publishing only the first (${target.id}). Run again for the next.`);

if (!has('--yes') && !has('--test-only')) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const r = await rl.question(`\nPublish "${target.id}" now? [y/N] `);
  rl.close();
  if (!/^[ys]/i.test(r.trim())) {
    console.log('Ok, nothing was published.');
    process.exit(0);
  }
}

const ctx = await chromium.launchPersistentContext(PROFILE, BROWSER);
const page = ctx.pages()[0] ?? (await ctx.newPage());
const shot = (name) => page.screenshot({ path: join(PROFILE, `${name}-${target.id}.png`) }).catch(() => {});

async function fail(reason) {
  await shot('error');
  console.error(`✗ ${target.id}: ${reason}. Screenshot: ${join(PROFILE, `error-${target.id}.png`)}`);
  console.error('  Nothing was marked in the queue. The UI may have changed; recalibrate in a session.');
  await ctx.close();
  process.exit(1);
}
async function click(locs, timeout = 15000) {
  const end = Date.now() + timeout;
  while (Date.now() < end) {
    for (const l of locs) {
      try { await l.first().click({ timeout: 1500 }); return true; } catch {}
    }
  }
  return false;
}

await page.goto('https://www.instagram.com/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(5000);

// dialogs Instagram opens on top of everything ("Turn on notifications") hide the Create button
await click([page.getByRole('button', { name: /agora não|not now/i })], 4000);

if (!(await loggedAs(page))) await fail(`this session is not logged in as @${ACCOUNT} (run node post.mjs --login)`);

console.log(`\n→ publishing ${target.id}...`);
if (!(await click([page.locator('svg[aria-label="Novo post"], svg[aria-label="New post"]')]))) await fail('Create button not found');
await click([page.getByText(/^postar$|^post$/i).locator('visible=true')], 4000);

try {
  const input = page.locator('div[role="dialog"] input[type="file"], input[type="file"]');
  await input.first().waitFor({ state: 'attached', timeout: 15000 });
  await input.first().setInputFiles(target.files);
  if (target.files.length > 1) console.log(`  (carousel with ${target.files.length} images)`);
  if (target.video) console.log('  (video: becomes a Reel; the upload can take a while)');
} catch { await fail('upload input not found'); }

// video: Instagram says "videos are now shared as reels" and asks for OK
if (target.video) await click([page.getByRole('button', { name: /^ok$/i })], 8000);

// Crop step: choose "Original" explicitly. For video the web uploader defaults to 1:1, which
// cut the top and bottom of a Reel at Nordeste Nerd (14/09/2026). For a 4:5 photo, Original = 4:5.
await page.waitForTimeout(1500);
if (await click([page.locator('svg[aria-label="Selecionar corte"], svg[aria-label="Select crop"]')], 20000)) {
  if (!(await click([page.getByText(/^original$/i).locator('visible=true')], 6000))) await fail('crop menu opened but "Original" not found');
  await page.waitForTimeout(600);
  await shot('step-crop');
} else await fail('"Select crop" button not found');

const next = async (step) => {
  if (!(await click([page.getByRole('button', { name: /^avançar$|^next$/i }), page.getByText(/^avançar$|^next$/i).locator('visible=true')], target.video ? 120000 : 20000)))
    await fail(`Next not found (step ${step})`);
  await page.waitForTimeout(1200);
};

await next(1);

// Cover step (video only): Instagram uses a frame as the grid thumbnail; with `cover:` in the
// queue we upload the separate action-led cover instead.
if (target.video) {
  await shot('step-cover');
  if (target.cover) {
    if (!existsSync(target.cover)) await fail(`cover not found: ${target.cover}`);
    const button = page.getByText(/selecionar do computador|select from computer/i).locator('visible=true').first();
    if (await button.count()) {
      const [chooser] = await Promise.all([page.waitForEvent('filechooser', { timeout: 15000 }), button.click()]);
      await chooser.setFiles(target.cover);
      await page.waitForTimeout(3000);
      await shot('step-cover-sent');
      console.log('  cover sent:', target.cover.split('/').pop());
    } else {
      console.log('  ⚠ "Select from computer" not found at this step; the cover was NOT changed.');
      console.log('    check social/.ig-profile/step-cover-*.png and adjust the selector.');
    }
  }
}

await next(2);

const caption = page.locator('div[role="textbox"][contenteditable="true"], textarea[aria-label*="legenda" i], textarea[aria-label*="caption" i]');
try {
  await caption.first().click({ timeout: 10000 });
  await caption.first().fill(String(target.item.get('caption')).trim());
} catch { await fail('caption field not found'); }
await page.waitForTimeout(800);

if (has('--test-only')) {
  await shot('step-caption');
  console.log('--test-only: stopped before Share. See .ig-profile/step-*.png. Nothing marked in the queue.');
  await ctx.close();
  process.exit(0);
}

if (!(await click([page.getByRole('button', { name: /^compartilhar$|^share$/i }), page.getByText(/^compartilhar$|^share$/i).locator('visible=true')], 15000)))
  await fail('Share button not found');

// mark the queue only after SEEING Instagram's confirmation
try {
  await page.getByText(/foi compartilhad|post compartilhado|has been shared|post shared|reel shared/i).first().waitFor({ timeout: target.video ? 240000 : 90000 });
} catch { await fail('clicked Share but saw no confirmation; CHECK the profile before running again'); }
await shot('ok');

target.item.set('posted_at', new Date().toISOString());
writeFileSync(QUEUE, doc.toString());
console.log(`✓ ${target.id} published and marked in the queue.`);
await ctx.close();
