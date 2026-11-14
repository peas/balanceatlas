// Repo-native layout study. Reuses approved engraving/brush; no regenerated anatomy.
import fs from 'node:fs/promises';
import sharp from 'sharp';
if(process.argv.includes('--help')){console.log('Usage: node scripts/festival_instagram_profile.mjs\nRegenerates avatar studies and the fixed nine-post grid from current full-resolution covers, with thumbnail fallback.');process.exit(0);}
const out='design/instagram-profile-2026-11-14';
await fs.mkdir(out,{recursive:true});
const data=async(p,m)=>`data:${m};base64,${(await fs.readFile(p)).toString('base64')}`;
const figure='data:image/png;base64,'+(await sharp('public/festival/ig/arte/engraving-v1/gabriel-reta-profile.webp').png().toBuffer()).toString('base64');
const brush=(await fs.readFile('public/festival/ig/arte/engraving-v1/brush-v7.svg','utf8')).replaceAll('#0f3d33','#cb8b34');
const paint=`data:image/svg+xml;base64,${Buffer.from(brush).toString('base64')}`;
const green='#123d33',cream='#f3eddf',ochre='#cb8b34';
const H='M0 0H70V115H150V0H220V310H150V185H70V310H0Z';
const F='M0 0H220V70H70V122H180V192H70V310H0Z';
const letter=(d,x,y,scale,color)=>`<path d="${d}" transform="translate(${x} ${y}) scale(${scale})" fill="${color}"/>`;
const img=(href,x,y,w,h)=>`<image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
const variants=[
 {name:'01-h-corpo-f',bg:green,body:img(paint,40,40,1000,1000)+letter(H,180,405,.8,cream)+letter(F,710,405,.8,cream)+img(figure,440,110,165,860)},
 {name:'02-corpo-hf',bg:cream,body:img(paint,30,50,1010,1010)+img(figure,250,125,165,860)+`<path fill="${green}" transform="translate(485 420) scale(.68) translate(-491 -520)" d="M491 520 H585 V686 H690 V520 H783 V686 H865 V520 H1174 V618 H958 V686 H1109 V785 H958 V965 H865 V785 H783 V965 H690 V785 H585 V965 H491 Z"/>`},
 {name:'03-corpo-selo',bg:green,body:img(paint,30,30,1020,1020)+img(figure,385,100,175,910)+letter(H,655,660,.38,cream)+letter(F,755,660,.38,cream)},
 {name:'04-hf-corpo-ocre',bg:ochre,body:letter(H,165,400,.9,green)+letter(F,725,400,.9,green)+img(figure,443,105,170,885)},
];
for(const v of variants){const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><rect width="1080" height="1080" fill="${v.bg}"/>${v.body}</svg>`;await fs.writeFile(`${out}/${v.name}.svg`,svg);await sharp(Buffer.from(svg)).png().toFile(`${out}/${v.name}.png`);}
const comps=[];for(let i=0;i<variants.length;i++){const x=40+(i%2)*620,y=80+Math.floor(i/2)*690;const path=`${out}/${variants[i].name}.png`;const circle=await sharp(path).resize(480,480).composite([{input:Buffer.from('<svg width="480" height="480"><circle cx="240" cy="240" r="240" fill="white"/></svg>'),blend:'dest-in'}]).png().toBuffer();comps.push({input:circle,left:x,top:y});comps.push({input:await sharp(path).resize(64,64).png().toBuffer(),left:x+490,top:y+390});}
const labels=`<svg width="1280" height="1440"><style>text{font-family:Arial,sans-serif;fill:${green};font-weight:bold}</style><text x="40" y="40" font-size="27">AVATAR · GRAVURA + OCRE + HF</text>${variants.map((v,i)=>`<text x="${40+i%2*620}" y="${600+Math.floor(i/2)*690}" font-size="27">${v.name}</text>`).join('')}<text x="40" y="1395" font-size="20">Círculo: recorte do perfil · Miniatura: leitura em tamanho pequeno</text></svg>`;
await sharp({create:{width:1280,height:1440,channels:4,background:cream}}).composite([...comps,{input:Buffer.from(labels)}]).png().toFile(`${out}/avatars-comparacao.png`);
const shots=JSON.parse(await fs.readFile('src/festival/ig2/review-shots.json','utf8'));
// Nine available pieces, newest first in profile order. Editorial preview, not a live account screenshot.
const ids=['agustin-apresentacao','lugar','gabriel-transicoes-tela','exercicio-canoinha','natureza-deck-tuck-reta','natureza-piscina-press-solo','ed-festival','ed-formas','ed-comunidade'];
const layers=[];for(let i=0;i<ids.length;i++){const p=shots.find(p=>p.id===ids[i]);if(!p)throw Error(ids[i]);const candidate=`public/festival/ig/covers-v1/${ids[i]}.webp`;const image=await fs.access(candidate).then(()=>candidate.slice(6)).catch(()=>p.shots[0].url);layers.push({input:await sharp('public'+image).resize(360,480,{fit:'cover',position:'centre'}).png().toBuffer(),left:32+(i%3)*366,top:200+Math.floor(i/3)*486});}
const heading=`<svg width="1156" height="1730"><style>text{font-family:Arial,sans-serif;fill:${green}}</style><text x="32" y="65" font-size="36" font-weight="bold">HANDSTANDFEST</text><text x="32" y="108" font-size="25">Estudo de grid 3×3 · capas das peças atuais</text><text x="32" y="149" font-size="21">Mais recentes no alto · alternância de foto, gravura e informação</text><text x="32" y="1700" font-size="20">Prévia visual: recorte central 3:4. Capas finais podem receber ajustes próprios.</text></svg>`;
await sharp({create:{width:1156,height:1730,channels:4,background:cream}}).composite([...layers,{input:Buffer.from(heading)}]).png().toFile(`${out}/grid-3x3.png`);
await sharp({create:{width:1080,height:1440,channels:4,background:cream}}).composite(layers.map((layer,i)=>({...layer,left:(i%3)*360,top:Math.floor(i/3)*480}))).png().toFile(`${out}/grid-3x3-final.png`);
await fs.writeFile(`${out}/manifest.json`,JSON.stringify({figure:'gravura-gabriel-reta-profile',variants:variants.map(v=>v.name),gridNewestFirst:ids,note:'Separate layout studies; no change to official logo.'},null,2));
