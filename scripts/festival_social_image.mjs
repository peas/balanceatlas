#!/usr/bin/env node
// Recompose the approved engraving and brand assets; no image generation or source retouching.
import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
if (process.argv.includes('--help')) {
  console.log('Usage: node scripts/festival_social_image.mjs\nCreates public/festival/social/handstandfest-engraving-v1.jpg (1200x630), using approved assets and bundled fonts. Bump the filename when replacing a published design.');
  process.exit(0);
}
const out = 'public/festival/social';
await mkdir(out, {recursive:true});
const layer = async (file, width, height) => sharp(file).resize(width,height,{fit:'contain',background:'#00000000'}).png().toBuffer();
const text = async (value, size, mono=false) => sharp({text:{text:`<span foreground="#123d33">${value}</span>`,font:`${mono?'Space Mono Bold':'Archivo Heavy'} ${size}`,fontfile:`design/fonts/${mono?'space-mono-bold':'archivo'}.ttf`,rgba:true,dpi:72}}).png().toBuffer();
await sharp({create:{width:1200,height:630,channels:3,background:'#f3eddf'}}).composite([
  {input:await layer('public/festival/ig/arte/engraving-v1/arc.svg',570,570),left:600,top:35},
  {input:await layer('public/festival/ig/arte/engraving-v1/straddle-montanha.webp',590,455),left:580,top:125},
  {input:await layer(Buffer.from((await readFile('public/festival/brand/stroke-v7.svg','utf8')).replace('#000000','#cb8b34')),490,110),left:40,top:155},
  {input:await text('HAND',108),left:55,top:150},
  {input:await text('STAND',108),left:55,top:255},
  {input:await text('FEST',108),left:55,top:360},
  {input:await text('PARADA DE MÃO',22,true),left:58,top:86},
  {input:await text('handstandfest.com.br',20,true),left:58,top:548},
  {input:await layer('public/festival/brand/hf-green-ochre-v7-192.png',100,100),left:1038,top:38},
]).jpeg({quality:90,mozjpeg:true}).toFile(`${out}/handstandfest-engraving-v1.jpg`);
console.log(`${out}/handstandfest-engraving-v1.jpg`);
