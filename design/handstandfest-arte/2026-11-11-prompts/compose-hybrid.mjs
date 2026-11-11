// Three independent SVG layers. The illustration/photo base was generated once;
// the v07 paint is native vector and opacity is freely adjustable without regeneration.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
const here = path.dirname(fileURLToPath(import.meta.url));
const opacity = Number(process.argv[2] ?? .65);
if (!(opacity >= 0 && opacity <= 1)) throw new Error('Opacity must be 0–1');
const image = (await fs.readFile(path.join(here, 'assets/straddle-landscape-hybrid.png'))).toString('base64');
const brush = (await fs.readFile(path.join(here, 'sources/brush-v7.svg'), 'utf8')).replace(/<\?xml[^>]*>/g, '').replace(/fill="[^"]*"/g, 'fill="#cb8b34"');
// This test has warm ivory/ink against cool blue/green scenery. A colour matte
// restores the person above paint without moving a single pixel. This is NOT a
// general person segmenter: another scene needs a reviewed mask of its own.
const { data, info } = await sharp(path.join(here, 'assets/straddle-landscape-hybrid.png')).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const mask = Buffer.alloc(info.width * info.height);
for (let y=430; y<1130; y++) for (let x=40; x<900; x++) {
 const i=y*info.width+x, r=data[i*3], g=data[i*3+1], b=data[i*3+2];
 mask[i] = r > g && g >= b && r-b > 3 ? 255 : 0;
}
const binary = await sharp(mask,{raw:{width:info.width,height:info.height,channels:1}}).blur(.7).threshold(90).greyscale().raw().toBuffer();
// Fill enclosed ink-line holes so the paint never tints the dark shorts/hatching.
const reached = new Uint8Array(binary.length), queue = new Int32Array(binary.length);
let head=0, tail=0;
const visit = i => { if (!binary[i] && !reached[i]) { reached[i]=1; queue[tail++]=i; } };
for(let x=0;x<info.width;x++){visit(x);visit((info.height-1)*info.width+x);}
for(let y=0;y<info.height;y++){visit(y*info.width);visit(y*info.width+info.width-1);}
while(head<tail){const i=queue[head++], x=i%info.width;if(x)visit(i-1);if(x<info.width-1)visit(i+1);if(i>=info.width)visit(i-info.width);if(i<binary.length-info.width)visit(i+info.width);}
for(let i=0;i<binary.length;i++)if(!reached[i])binary[i]=255;
const matte = await sharp(binary,{raw:{width:info.width,height:info.height,channels:1}}).png().toBuffer();
await fs.writeFile(path.join(here, 'assets/hybrid-person-mask.png'),matte);
const maskData=matte.toString('base64');
const drawing = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="941" height="1672" viewBox="0 0 941 1672"><defs><image id="scene" width="941" height="1672" href="data:image/png;base64,${image}"/><mask id="person"><image width="941" height="1672" href="data:image/png;base64,${maskData}"/></mask></defs><use href="#scene" data-layer="photographic-scene"/><g data-layer="ochre-paint" opacity="${opacity}" transform="translate(130 430) scale(.65 .65)">${brush}</g><g data-layer="engraved-person" mask="url(#person)"><use href="#scene"/></g></svg>`;
await fs.writeFile(path.join(here, 'previews/hybrid-paint.svg'), drawing);
await sharp(Buffer.from(drawing)).png().toFile(path.join(here, 'previews/hybrid-paint.png'));
if (process.argv.includes('--publish')) {
  const destination = path.resolve(here, '../../../public/festival/ig/arte/engraving-v1/landscape-paint.webp');
  await sharp(Buffer.from(drawing)).webp({ quality: 90 }).toFile(destination);
  console.log('Published', destination);
}
console.log('hybrid-paint.svg + PNG; paint opacity', opacity);
