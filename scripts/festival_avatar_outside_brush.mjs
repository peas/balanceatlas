// Native layout variant: preserve the approved engraving and connected HF geometry.
import fs from 'node:fs/promises';
import sharp from 'sharp';
const dir='design/instagram-profile-2026-11-14';
const original=await fs.readFile(`${dir}/02-corpo-hf.svg`,'utf8');
const images=[...original.matchAll(/<image href="([^"]+)"/g)].map(m=>m[1]);
const glyph=original.match(/ d="([^"]+)"/)[1];
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><rect width="1080" height="1080" fill="#f3eddf"/><g id="ochre-behind-hf"><image href="${images[0]}" x="400" y="245" width="620" height="620"/></g><g id="original-connected-hf"><path fill="#123d33" transform="translate(500 420) scale(.60) translate(-491 -520)" d="${glyph}"/></g><g id="gabriel-outside-paint"><image href="${images[1]}" x="230" y="130" width="165" height="820"/></g></svg>`;
const base=`${dir}/05-gabriel-fora-mancha-hf`;
await fs.writeFile(`${base}.svg`,svg);
await sharp(Buffer.from(svg)).png().toFile(`${base}.png`);
await sharp(Buffer.from(svg)).composite([{input:Buffer.from('<svg width="1080" height="1080"><circle cx="540" cy="540" r="540" fill="white"/></svg>'),blend:'dest-in'}]).png().toFile(`${base}-circular.png`);
