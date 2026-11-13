import { Freeze, Html5Video, Img, OffthreadVideo, getRemotionEnvironment, staticFile, useCurrentFrame } from 'remotion';
import { BrushStroke } from '../Brush';
import { Canvas, BrandSeal, Headline, Label, CHALK, STAGE, move, type PieceProps } from './kit';
import { InkDisc } from './art-pieces';
import { EngravedFreeze, FREEZE_ART } from './EngravedFreeze';
import type { Piece } from './pieces';

const source=(name:string)=>getRemotionEnvironment().isPlayer?`/festival/ig/gabriel/${name}`:staticFile(`festival/ig/gabriel/${name}`);
/** Exact-frame freezes preserve the full-size video geometry; ochre is a separate text gesture. */
function GabrielReel({beach=false,...p}:PieceProps & {beach?:boolean}) {
 const frame=useCurrentFrame(),at=beach?300:180,frozen=frame>=at,mono=move(frame,at,12),paint=move(frame,at+5,24);
 const name=beach?'img-3377':'img-3372',Video=getRemotionEnvironment().isPlayer?Html5Video:OffthreadVideo;
 const media={position:'absolute' as const,inset:0,width:'100%',height:'100%',objectFit:'contain' as const};
 return <Canvas {...p} dark signature={false}>
  <div style={{position:'absolute',inset:24,borderRadius:28,overflow:'hidden'}}>
   {!frozen?<Video src={source(name+'.mp4')} muted style={media}/>:beach&&<Img src={source(name+'-freeze.webp')} style={{...media,filter:`grayscale(${mono}) contrast(${1+.13*mono})`}}/>}
   {!beach&&<EngravedFreeze src={source(name+'-freeze.webp')} art={FREEZE_ART['gabriel-reta']} at={at}/>}
   <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(8,29,24,.92),rgba(8,29,24,.82) 18%,transparent 29%,transparent 77%,rgba(8,29,24,.8) 100%)'}}/>
  </div>
  <Label y={205} size={36} color={CHALK}>GABRIEL · #HANDSTANDLIFE</Label>
  <Headline lines={beach?(frozen?['MESMA PRÁTICA.','OUTRO CENÁRIO.']:['ONDE VOCÊ','PRATICA?']):(frozen?['O CAMINHO','TAMBÉM CONTA.']:['COMO VOCÊ','MUDA DE FORMA?'])} y={275} size={74} accentLine={-1} dark/>
  {(!frozen||beach)&&<BrushStroke color="#dfab5b" style={{position:'absolute',left:65,top:455,width:780,height:19,clipPath:`inset(0 ${(1-(frozen?paint:move(frame,5,24)))*100}% 0 0)`}}/>}
  <BrandSeal x={65} y={1390} size={230}/>
 </Canvas>;
}
const FullFrameTransitions=(p:PieceProps)=><GabrielReel {...p}/>;
function EngravingStory(p:PieceProps) {
 return <Freeze frame={90}><Canvas {...p} format="story" dark signature={false}>
  <Label y={235} size={36} color={CHALK}>GABRIEL · #HANDSTANDLIFE</Label>
  <Headline lines={['QUE FORMA','VOCÊ EXPLORA?']} y={285} size={76} accentLine={-1} dark/>
  <div style={{position:'absolute',left:70,top:640,width:940,height:910,transform:'rotate(17deg)'}}><InkDisc color="#dfab5b"/></div>
  <Img src={source('gabriel-arco.webp')} style={{position:'absolute',left:60,top:440,width:960,height:1130,objectFit:'contain'}}/>
  <BrandSeal x={800} y={1440} size={220} still/>
 </Canvas></Freeze>;
}
const Transitions=(p:PieceProps)=><GabrielReel {...p}/>;
const Beach=(p:PieceProps)=><GabrielReel {...p} beach/>;

function Landscape(p:PieceProps) {
 return <Freeze frame={90}><Canvas {...p} format="card" signature>
  <Label y={65} size={32}>GABRIEL · #HANDSTANDLIFE</Label>
  <Headline lines={['ONDE O TREINO','TE LEVA?']} y={145} size={83}/>
  <Img src={source('praia-reta.webp')} style={{position:'absolute',left:200,top:370,width:680,height:900,objectFit:'contain'}}/>
  <Label y={1280} size={40} style={{width:680}}>Qual paisagem marcou seu treino?</Label>
 </Canvas></Freeze>;
}
function Engraving(p:PieceProps) {
 return <Freeze frame={90}><Canvas {...p} format="card" dark signature>
  <Label y={65} size={32} color={CHALK}>GABRIEL · CORPO & EXPRESSÃO</Label>
  <Headline lines={['QUE FORMA','VOCÊ EXPLORA?']} y={145} size={77} accentLine={-1} dark/>
  <div style={{position:'absolute',left:160,top:455,width:730,height:730,transform:'rotate(17deg)'}}><InkDisc color="#dfab5b"/></div>
  <Img src={source('gabriel-arco.webp')} style={{position:'absolute',left:150,top:355,width:780,height:850,objectFit:'contain'}}/>
  <Label y={1260} size={42} color={CHALK} style={{width:680}}>Equilíbrio, formas e expressão.</Label>
 </Canvas></Freeze>;
}
export const GABRIEL_PIECES:Piece[]=[
 {id:'gabriel-transicoes-tela',title:'Entre formas — tela cheia',format:'Reel',description:'Enquadramento aprovado com IMG_3372: vídeo ocupa quase toda a tela; texto sobre degradê, sem cobrir mãos e pés. Em 6 s, o mesmo frame ganha figura hachurada e tinta ocre intermediária a 65%, sobre o cenário original colorido.',look:'Tela cheia / congela e pinta',movement:'6 s de vídeo + 5 s de freeze. Padrão aprovado: corpo amplo, ocre e selo HF.',slides:[{name:'Vídeo maior',component:FullFrameTransitions,seconds:11,height:1920,cover:0,cues:[{label:'Movimento',frame:0},{label:'Congela',frame:180},{label:'Pintura',frame:220}]}]},
 {id:'gabriel-gravura-story',title:'O corpo cria — story ampliado',format:'Estático',description:'Adaptação 9:16 própria: figura maior, título curto e espaço inferior para compartilhamento/sticker nativo.',look:'Gravura / story',movement:'PNG 1080×1920; não é o card do feed reduzido.',slides:[{name:'Story / figura maior',component:EngravingStory,seconds:1,height:1920,cover:0,cues:[]}]},
 {id:'gabriel-transicoes',title:'Entre uma forma e outra',format:'Reel',description:'Gabriel alterna tuck e reta. Fonte IMG_3372: 0–6 s; congelamento em 6 s, pessoa hachurada, fundo colorido, tinta intermediária a 65% e selo HF.',look:'Tela cheia / congela e pinta',movement:'6 s em velocidade real + 5 s de freeze editorial. Não é tutorial nem demonstração de entrada.',slides:[{name:'Tuck → reta → pintura',component:Transitions,seconds:11,height:1920,cover:0,cues:[{label:'Movimento',frame:0},{label:'Congela',frame:180},{label:'Pintura',frame:220}]}]},
 {id:'gabriel-praia',title:'A prática muda de cenário',format:'Reel',description:'Gabriel muda as formas na areia. Fonte IMG_3377: 0–10 s; congelamento exato em 10 s. Mantém todo o cenário no freeze.',look:'Congela e pinta / verde',movement:'10 s em velocidade real + 5 s de freeze P&B/ocre. Áudio original não incluído.',slides:[{name:'Praia → freeze → ocre',component:Beach,seconds:15,height:1920,cover:0,cues:[{label:'Movimento',frame:0},{label:'Congela',frame:300},{label:'Pintura',frame:340}]}]},
 {id:'gabriel-paisagem',title:'Outro jeito de ver o mar',format:'Estático',description:'IMG_7876: fotografia preservada em cor e corpo inteiro. Registro pessoal, não recomendação de treino em rochas.',look:'Fotografia natural / papel',movement:'PNG estático.',slides:[{name:'Gabriel e o mar',component:Landscape,seconds:1,height:1440,cover:0,cues:[]}]},
 {id:'gabriel-gravura',title:'O corpo também cria',format:'Estático',description:'Gravura gerada a partir de IMG_8751: figura transparente e tinta independente. Interpretação editorial, não medição anatômica.',look:'Gravura / verde / ocre',movement:'PNG estático; pessoa e pincel separados.',slides:[{name:'Gabriel / gravura',component:Engraving,seconds:1,height:1440,cover:0,cues:[]}]},
];
