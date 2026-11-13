#!/usr/bin/env node
// Enforce metadata on every built festival page, then generate the discovery files.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'parse5';
import sharp from 'sharp';
if (process.argv.includes('--help')) {
  console.log('Usage: node scripts/festival_metadata.mjs\nAfter festival_hide.mjs: validates every non-redirect dist/hf page, local OG images and JSON-LD; writes dist/festival/{robots.txt,sitemap.xml}. Indexable pages enter the sitemap automatically.');
  process.exit(0);
}
const origin = 'https://handstandfest.com.br';
const urls = []; let count = 0;
const checked = new Set();
function assert(value, message) { if (!value) throw new Error(message); }
async function walk(dir) {
  for (const item of await readdir(dir, {withFileTypes:true})) {
    const path = join(dir,item.name);
    if (item.isDirectory()) { await walk(path); continue; }
    if (!path.endsWith('.html')) continue;
    const doc = parse(await readFile(path,'utf8')); const tags = [];
    function visit(node) { if (node.tagName) tags.push(node); for (const child of node.childNodes || []) visit(child); }
    visit(doc);
    const attrs = node => Object.fromEntries((node.attrs || []).map(a=>[a.name,a.value]));
    const metas = tags.filter(n=>n.tagName==='meta').map(attrs);
    if (metas.some(m=>m['http-equiv']?.toLowerCase()==='refresh')) continue;
    const meta = key => metas.find(m=>m.property===key || m.name===key)?.content;
    const canonical = tags.filter(n=>n.tagName==='link').map(attrs).find(a=>a.rel==='canonical')?.href;
    const expected = origin + path.slice('dist/hf'.length).replace(/index\.html$/, '');
    assert(canonical===expected, `${path}: canonical must be ${expected}`);
    for (const key of ['description','robots','og:title','og:description','og:type','og:image','og:image:alt','twitter:card','twitter:image'])
      assert(meta(key)?.trim(), `${path}: missing ${key}`);
    assert(meta('og:url')===canonical, `${path}: og:url differs from canonical`);
    assert(meta('twitter:card')==='summary_large_image',`${path}: large Twitter card required`);
    const image = new URL(meta('og:image'));
    assert(image.origin===origin && image.pathname.startsWith('/festival/'),`${path}: OG image must use the festival domain and local assets`);
    assert(meta('twitter:image')===image.href,`${path}: inconsistent Twitter image`);
    if (!checked.has(image.href)) {
      const bytes=await readFile(join('dist',image.pathname));
      const info=await sharp(bytes).metadata();
      assert(info.format==='jpeg' && info.width===1200 && info.height===630,`${path}: use a 1200x630 JPEG social card`);
      assert(bytes.length<1000000,`${path}: social card exceeds 1 MB`);
      checked.add(image.href);
    }
    assert(meta('og:image:width')==='1200' && meta('og:image:height')==='630',`${path}: wrong image dimensions`);
    const ld=tags.filter(n=>n.tagName==='script' && attrs(n).type==='application/ld+json');
    assert(ld.length,`${path}: missing JSON-LD`);
    for (const node of ld) { const data=JSON.parse(node.childNodes.map(n=>n.value||'').join('')); assert(data['@context']==='https://schema.org' && data['@graph']?.length,`${path}: invalid JSON-LD graph`); }
    if (!meta('robots').includes('noindex')) urls.push(canonical);
    count++;
  }
}
await walk('dist/hf');
assert(urls.includes(origin+'/'), 'Home must be indexable');
const escape = s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
await writeFile('dist/festival/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.sort().map(url=>`  <url><loc>${escape(url)}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile('dist/festival/robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`festival_metadata: ${count} pages verified, ${checked.size} social image(s), ${urls.length} indexable URLs in sitemap`);
