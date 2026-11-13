import sharp from 'sharp';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
for(const [name,out] of [['profile','profile-greece'],['diagonal','diagonal-thailand']]) {
 await sharp(path.join(here,`assets/${name}.png`)).webp({lossless:true}).toFile(path.resolve(here,`../../../public/festival/ig/arte/engraving-v1/${out}.webp`));
 console.log(`Exported ${out}.webp`);
}
