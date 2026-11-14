// Actual Remotion frames, shared bundle/browser; optimized thumbnails, no video exports.
import {bundle} from '@remotion/bundler';
import {getCompositions,renderStill,openBrowser} from '@remotion/renderer';
import sharp from 'sharp';
import path from 'node:path';
import {createHash} from 'node:crypto';
import fs from 'node:fs/promises';
if(process.argv.includes('--help')){console.log('Usage: node scripts/festival_review_stills.mjs [--only id-prefix]\nBuilds a fresh local/festival/review-bundle. Renders review thumbnails for every active piece and full-resolution covers (local PNG + public WebP) with a provenance manifest. No MP4 export or Instagram posting.');process.exit(0);}
await fs.mkdir('public/festival/ig/covers-v1',{recursive:true});
await fs.mkdir('local/festival/covers',{recursive:true});
const prefix=process.argv.includes('--only')?process.argv[process.argv.indexOf('--only')+1]:null;
if(process.argv.includes('--only')&&!prefix)throw Error('--only requires an ID prefix');
const covers=prefix?JSON.parse(await fs.readFile('public/festival/ig/covers-v1/manifest.json','utf8')).filter(p=>!p.id.startsWith(prefix)):[];
const serveUrl=await bundle({entryPoint:'src/festival/ig2/review-render.tsx',outDir:path.resolve('local/festival/review-bundle'),publicDir:path.resolve('local/festival/render-public')});
const browser=await openBrowser('chrome');
try {
 const comps=await getCompositions(serveUrl,{puppeteerInstance:browser});
 const pieces=new Map(prefix?JSON.parse(await fs.readFile('src/festival/ig2/review-shots.json','utf8')).filter(p=>!p.id.startsWith(prefix)).map(p=>[p.id,p]):[]);
 for(const c of comps){const r=c.props.review;if(prefix&&!r.id.startsWith(prefix))continue; if(!pieces.has(r.id))pieces.set(r.id,{...r,shots:[]});
 if(r.index===0){
 const frame=Math.max(0,Math.min(r.cover??90,c.durationInFrames-1));
 const output=`local/festival/covers/${r.id}.png`;
 await renderStill({serveUrl,composition:c,frame,output,puppeteerInstance:browser,imageFormat:'png'});
 await sharp(output).webp({quality:90}).toFile(`public/festival/ig/covers-v1/${r.id}.webp`);
 const coverBytes=await fs.readFile(`public/festival/ig/covers-v1/${r.id}.webp`);
 const coverName=`${r.id}-${createHash('sha256').update(coverBytes).digest('hex').slice(0,10)}.webp`;
 await fs.writeFile(`public/festival/ig/covers-v1/${coverName}`,coverBytes);
 covers.push({id:r.id,composition:c.id,frame,width:c.width,height:c.height,url:`/festival/ig/covers-v1/${coverName}`,status:'review',note:'Confirm crop in uploader; cover does not imply publication approval.'});
 }
 const indices=r.count>3?[0,Math.floor(r.count/2),r.count-1]:Array.from({length:r.count},(_,i)=>i);
 if(!indices.includes(r.index))continue;
 let frames=r.count>1||r.format==='Estático'?[Math.min(90,c.durationInFrames-1)]:[r.cover??30,Math.round(c.durationInFrames*.5),c.durationInFrames-25];
 if(r.count===1&&r.cues.length>=3)frames=[Math.min(r.cover??45,c.durationInFrames-1),r.cues[1].frame,r.cues.at(-1).frame];
 frames=[...new Set(frames.map(f=>Math.max(0,Math.min(f,c.durationInFrames-1))))];
 for(const [n,frame] of frames.entries()){
 let filename=`${c.id}-${n}.webp`;const tmp=`local/festival/review-${c.id}-${n}.png`;
 await renderStill({serveUrl,composition:c,frame,output:tmp,puppeteerInstance:browser,scale:.5,imageFormat:'png'});
 await sharp(tmp).webp({quality:82}).toFile(`public/festival/ig/review-v1/${filename}`);await fs.unlink(tmp);
 const bytes=await fs.readFile(`public/festival/ig/review-v1/${filename}`);
 const versioned=`${c.id}-${n}-${createHash('sha256').update(bytes).digest('hex').slice(0,10)}.webp`;
 await fs.writeFile(`public/festival/ig/review-v1/${versioned}`,bytes);filename=versioned;
 pieces.get(r.id).shots.push({url:`/festival/ig/review-v1/${filename}`,label:r.count>1?`Lâmina ${r.index+1} · ${r.name}`:r.format==='Estático'?'Imagem completa':`${(frame/30).toFixed(1)} s`,frame});
 }
 console.log(c.id);
 }
 await fs.writeFile('src/festival/ig2/review-shots.json',JSON.stringify([...new Set(comps.map(c=>c.props.review.id))].map(id=>pieces.get(id)),null,2));
 await fs.writeFile('public/festival/ig/covers-v1/manifest.json',JSON.stringify(covers,null,2));
 console.log('DONE',pieces.size,'covers',covers.length);
}finally{await browser.close({silent:true});}
