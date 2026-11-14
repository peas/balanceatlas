// Actual Remotion frames, shared bundle/browser; optimized thumbnails, no video exports.
import {getCompositions,renderStill,openBrowser} from '@remotion/renderer';
import sharp from 'sharp';
import fs from 'node:fs/promises';
const serveUrl='local/festival/review-bundle';
const browser=await openBrowser('chrome');
try {
 const comps=await getCompositions(serveUrl,{puppeteerInstance:browser});
 const pieces=new Map();
 for(const c of comps){const r=c.props.review; if(!pieces.has(r.id))pieces.set(r.id,{...r,shots:[]});
 const indices=r.count>3?[0,Math.floor(r.count/2),r.count-1]:Array.from({length:r.count},(_,i)=>i);
 if(!indices.includes(r.index))continue;
 let frames=r.count>1||r.format==='Estático'?[Math.min(90,c.durationInFrames-1)]:[r.cover??30,Math.round(c.durationInFrames*.5),c.durationInFrames-25];
 if(r.count===1&&r.cues.length>=3)frames=[Math.min(r.cover??45,c.durationInFrames-1),r.cues[1].frame,r.cues.at(-1).frame];
 frames=[...new Set(frames.map(f=>Math.max(0,Math.min(f,c.durationInFrames-1))))];
 for(const [n,frame] of frames.entries()){
 const filename=`${c.id}-${n}.webp`,tmp=`local/festival/review-${c.id}-${n}.png`;
 await renderStill({serveUrl,composition:c,frame,output:tmp,puppeteerInstance:browser,scale:.5,imageFormat:'png'});
 await sharp(tmp).webp({quality:82}).toFile(`public/festival/ig/review-v1/${filename}`);await fs.unlink(tmp);
 pieces.get(r.id).shots.push({url:`/festival/ig/review-v1/${filename}`,label:r.count>1?`Lâmina ${r.index+1} · ${r.name}`:r.format==='Estático'?'Imagem completa':`${(frame/30).toFixed(1)} s`,frame});
 }
 console.log(c.id);
 }
 await fs.writeFile('src/festival/ig2/review-shots.json',JSON.stringify([...pieces.values()],null,2));
 console.log('DONE',pieces.size);
}finally{await browser.close({silent:true});}
