import type { CSSProperties } from 'react';
import { Freeze, Html5Video, Img, OffthreadVideo, Sequence, getRemotionEnvironment, staticFile, useCurrentFrame } from 'remotion';
import { BrushStroke } from '../Brush';
import { Canvas, BrandSeal, Headline, Label, CHALK, move, type PieceProps } from './kit';
import type { Piece } from './pieces';
import batch from './natureza.json';
import { EngravedFreeze, FREEZE_ART } from './EngravedFreeze';
const artFor=(file:string)=>FREEZE_ART[file as keyof typeof FREEZE_ART];

export const NATURE_BATCH = batch;
type Item = typeof batch[number];
const mediaUrl = (name:string) => {
 const path=`festival/ig/natureza-v1/${name}`;
 return getRemotionEnvironment().isPlayer ? `/${path}` : staticFile(path);
};
const full:CSSProperties={position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain'};

/** One exact still from the encoded CFR source: identical geometry before and after freezing.
 * Selected cuts add a registered foreground engraving and independent intermediate paint.
 */
function NatureReel({item,...p}:PieceProps & {item:Item}) {
 const frame=useCurrentFrame(),at=item.freezeFrame!,frozen=frame>=at;
 const mono=move(frame,at,15),art=artFor(item.file);
 const titleY=item.lowerTitle?1175:275;
 const Video=getRemotionEnvironment().isPlayer?Html5Video:OffthreadVideo;
 return <Canvas {...p} dark signature={false}>
  <div style={{position:'absolute',inset:24,borderRadius:28,overflow:'hidden'}}>
   {!frozen?<Video src={mediaUrl(item.file+'.mp4')} muted style={full}/>:!art&&<Img src={mediaUrl(item.file+'-freeze.webp')} style={{...full,filter:`grayscale(${mono}) contrast(${1+.13*mono})`}}/>}
   {art&&<EngravedFreeze src={mediaUrl(item.file+'-freeze.webp')} art={art} at={at}/>}
   <div style={{position:'absolute',inset:0,background:item.lowerTitle?'linear-gradient(180deg,transparent 52%,rgba(8,29,24,.86) 59%,rgba(8,29,24,.86) 72%,rgba(8,29,24,.45))':'linear-gradient(180deg,rgba(8,29,24,.94),rgba(8,29,24,.80) 18%,transparent 28%,transparent 75%,rgba(8,29,24,.6))'}}/>
  </div>
  <Label y={titleY-70} size={34} color={CHALK}>#HANDSTANDLIFE</Label>
  {frozen?<Sequence from={at}><Headline lines={item.close!} y={titleY} size={72} accentLine={art?-1:0} dark/></Sequence>:<>
   <Headline lines={item.hook} y={titleY} size={72} accentLine={-1} dark/>
   <BrushStroke color="#dfab5b" style={{position:'absolute',left:65,top:titleY+175,width:780,height:14,clipPath:`inset(0 ${(1-move(frame,5,24))*100}% 0 0)`}}/>
  </>}
  {frozen?<Sequence from={at}><BrandSeal x={item.sealX} y={item.sealY} size={230}/></Sequence>:<BrandSeal x={item.sealX} y={item.sealY} size={230}/>}
 </Canvas>;
}

function NaturePhoto({item,...p}:PieceProps & {item:Item}) {
 return <Freeze frame={90}><Canvas {...p} format="story" dark signature={false}>
  <div style={{position:'absolute',inset:24,borderRadius:28,overflow:'hidden'}}>
   <Img src={mediaUrl(item.file+'.webp')} style={full}/>
   <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(8,29,24,.94),rgba(8,29,24,.8) 18%,transparent 28%,transparent 75%,rgba(8,29,24,.6))'}}/>
  </div>
  <Label y={205} size={34} color={CHALK}>#HANDSTANDLIFE</Label>
  <Headline lines={item.hook} y={275} size={72} accentLine={-1} dark/>
  <BrushStroke color="#dfab5b" style={{position:'absolute',left:65,top:450,width:780,height:24}}/>
  <BrandSeal x={item.sealX} y={item.sealY} size={230} still/>
 </Canvas></Freeze>;
}

export const NATURE_PIECES:Piece[]=batch.map(item=>({
 id:item.id,title:item.title,format:item.kind==='reel'?'Reel':'Estático',
 description:item.kind==='reel'?`Cor natural → congelamento em ${(item.freezeFrame!/30).toLocaleString('pt-BR')} s → ${artFor(item.file)?'pessoa hachurada, cenário colorido e tinta intermediária a 65%':'P&B, pergunta e pintura ocre'}. Enquadramento preservado.`:'Story estático: fotografia em cor, pergunta, pincelada ocre e selo HF.',
 look:artFor(item.file)?'Gravura / cenário / ocre':item.kind==='reel'?'Congela e pinta':'Fotografia / ocre',
 movement:'Sem trilha incorporada. Música e interação são escolhidas no Instagram.',
 slides:[{name:item.title,component:(p:PieceProps)=>item.kind==='reel'?<NatureReel {...p} item={item}/>:<NaturePhoto {...p} item={item}/>,
 seconds:item.kind==='reel'?item.freezeFrame!/30+5:1,height:1920,cover:item.kind==='reel'?Math.max(0,item.freezeFrame!-1):0,
 cues:item.kind==='reel'?[{label:'Movimento',frame:0},{label:'Congela',frame:item.freezeFrame!},{label:artFor(item.file)?'Hachura + ocre':'Ocre + selo',frame:item.freezeFrame!+45}]:[]}],
}));
