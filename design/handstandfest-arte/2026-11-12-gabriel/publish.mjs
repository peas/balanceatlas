import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../../..');
const out=path.join(root,'public/festival/ig/gabriel');
await sharp(path.join(root,'local/festival/gabriel-2026-11-12/originals/IMG_7876.JPEG')).rotate().resize({height:1600,withoutEnlargement:true}).webp({quality:88}).toFile(path.join(out,'praia-reta.webp'));
await sharp(path.join(here,'assets/gabriel-arco.png')).webp({lossless:true}).toFile(path.join(out,'gabriel-arco.webp'));
for(const n of [3372,3377])await sharp(path.join(root,`local/festival/gabriel-2026-11-12/frames/export-img-${n}.png`)).webp({lossless:true}).toFile(path.join(out,`img-${n}-freeze.webp`));
console.log('Photo, transparent engraving and exact freeze frames exported.');

const mask=(await fs.readFile(path.join(root,'public/festival/ig/arte/engraving-v1/brush-v7.svg'),'utf8')).replace(/preserveAspectRatio="[^"]*"/,'').replace('<svg ','<svg preserveAspectRatio="none" ');
await fs.writeFile(path.join(out,'window-mask.svg'),mask);
