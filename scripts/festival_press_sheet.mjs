/** Slice a generated aligned 5x2 sprite sheet. Usage: node scripts/festival_press_sheet.mjs [--help] */
import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
if(process.argv.includes('--help')) {console.log('Slices the preserved 5x2 generated press sheet into 10 transparent WebP frames; writes provenance metadata. Run from repository root.');process.exit(0);}
const root='design/handstandfest-arte/2026-11-14-press-sequence';
const source=`${root}/engraved-sheet.png`, out='public/festival/ig/press-study-v1';
await mkdir(out,{recursive:true});const {width,height}=await sharp(source).metadata();
const frames=[];
for(let i=0;i<10;i++){
 const col=i%5,row=Math.floor(i/5),left=Math.round(col*width/5),top=Math.round(row*height/2);
 const w=Math.round((col+1)*width/5)-left,h=Math.round((row+1)*height/2)-top;
 await sharp(source).extract({left,top,width:w,height:h}).resize(512,544).webp({quality:95,alphaQuality:100}).toFile(`${out}/pose-${i+1}.webp`);
 frames.push({pose:i+1,approximateCutSeconds:1.4+i*1.2,cell:{left,top,width:w,height:h},url:`/festival/ig/press-study-v1/pose-${i+1}.webp`});
}
await writeFile(`${root}/manifest.json`,JSON.stringify({source:'public/festival/ig/natureza-v1/piscina-press-solo.mp4',catalogueId:'natureza-pxl-20241201-151159837',sourceOffsetSeconds:4.4,selection:'ffmpeg -ss 0.8, fps=1/1.2; approximate sampled times include half-period sampling',generator:'built-in image_gen, one transparent 5x2 sheet',review:'Experimental artistic interpretation; not biomechanically exact. First pose includes source occlusion. No interpolation of anatomy.',frames},null,2)+'\n');
