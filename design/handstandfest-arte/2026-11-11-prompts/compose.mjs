#!/usr/bin/env node
/** Native SVG layout: preserve figure pixels; derive decorative variants from the v07 brush. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
const here=path.dirname(fileURLToPath(import.meta.url));
const help=`Usage: node compose.mjs [--figure FILE] [--shape oval|sweep|arc] [--background cream|green] [--output FILE.svg]
Without options, export the three study cards and three independent brush SVGs beside this script.
Outputs: SVG composition + PNG + WebP (1080x1440). Existing outputs are replaced deterministically.
Requires the repository's Sharp dependency. Does not generate or redraw people; preserves source alpha.
The seal/logo master is never changed. Decorative masks inherit real v07 bristles.
`;
if(process.argv.includes('--help')){console.log(help);process.exit(0)}
const args={};for(let i=2;i<process.argv.length;i+=2){const k=process.argv[i];if(!['--figure','--shape','--background','--output'].includes(k)||!process.argv[i+1])throw Error(help);args[k.slice(2)]=process.argv[i+1]}
const master=await fs.readFile(path.join(here,'sources/brush-v7.svg'),'utf8');
const brush=master.match(/<g\b[^>]*id="brush"[^>]*>[\s\S]*?<\/g>/)?.[0];
if(!brush)throw Error('v07 brush group not found');
const stroke=(await fs.readFile(path.join(here,'sources/stroke-v7.svg'),'utf8')).match(/<g\b[\s\S]*?<\/g>/)?.[0];
const circle=(fill)=>`<svg viewBox="0 0 1040 1040" width="1040" height="1040">${brush.replace(/fill="[^"]*"/g,`fill="${fill}"`)}</svg>`;
function mark(shape,color){
 if(shape==='oval')return `<g transform="translate(165 265) scale(.72 .89)">${circle(color)}</g>`;
 if(shape==='sweep')return `<g transform="translate(-25 680) rotate(-16) scale(2.8 4.2)"><svg width="400" height="100" viewBox="0 0 400 100">${stroke.replace(/fill="[^"]*"/g,`fill="${color}"`)}</svg></g>`;
 if(shape==='arc')return `<defs><mask id="open-arc" maskUnits="userSpaceOnUse" x="0" y="0" width="1040" height="1040"><rect width="1040" height="1040" fill="white"/><g transform="translate(150 150) scale(.71)">${circle('black')}</g><g transform="translate(510 -100) scale(1.8 6)"><svg width="400" height="100" viewBox="0 0 400 100">${stroke.replace(/fill="[^\"]*"/g,'fill="black"')}</svg></g></mask></defs><g transform="translate(80 285) scale(.88)"><g mask="url(#open-arc)">${circle(color)}</g></g>`;
 throw Error('Unknown shape');
}
const svg=(inner)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1440" viewBox="0 0 1080 1440">${inner}</svg>`;
const outputDir=path.join(here,'previews');await fs.mkdir(outputDir,{recursive:true});await fs.mkdir(path.join(here,'brushes'),{recursive:true});
async function render({figure,shape,background,output}){
 if(!['cream','green'].includes(background))throw Error('Unknown background');
 const bg=background==='green'?'#153d32':'#f3eddf';const paint=background==='green'?'#dfab5b':'#cb8b34';
 const file=await fs.readFile(figure), data=file.toString('base64');
 const drawing=svg(`<rect width="1080" height="1440" fill="${bg}"/>${mark(shape,paint)}<image href="data:image/png;base64,${data}" x="65" y="90" width="950" height="1260" preserveAspectRatio="xMidYMid meet"/>`);
 await fs.mkdir(path.dirname(output),{recursive:true});await fs.writeFile(output,drawing);
 await sharp(Buffer.from(drawing)).png().toFile(output.replace(/\.svg$/,'.png'));
 await sharp(Buffer.from(drawing)).webp({quality:90}).toFile(output.replace(/\.svg$/,'.webp'));
 console.log(path.basename(output));
}
if(Object.keys(args).length){if(!args.figure||!args.output?.endsWith('.svg'))throw Error(help);await render({shape:'oval',background:'cream',...args})}
else{
 for(const shape of ['oval','sweep','arc'])await fs.writeFile(path.join(here,'brushes',shape+'.svg'),svg(mark(shape,'#cb8b34')));
 for(const [name,figure,shape,background] of [['01-reta-oval','reta-costas','oval','cream'],['02-straddle-faixa','straddle-montanha','sweep','green'],['03-straddle-arco','straddle-montanha','arc','cream']])await render({figure:path.join(here,'assets',figure+'.png'),shape,background,output:path.join(outputDir,name+'.svg')});
 const cards=await Promise.all(['01-reta-oval','02-straddle-faixa','03-straddle-arco'].map(n=>fs.readFile(path.join(outputDir,n+'.png'))));
 const board=`<svg xmlns="http://www.w3.org/2000/svg" width="1620" height="720">${cards.map((b,i)=>`<image href="data:image/png;base64,${b.toString('base64')}" x="${540*i}" width="540" height="720"/>`).join('')}</svg>`;
 await sharp(Buffer.from(board)).png().toFile(path.join(outputDir,'comparison.png'));
}
