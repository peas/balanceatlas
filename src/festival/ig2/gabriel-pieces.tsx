import { Freeze, Html5Video, Img, OffthreadVideo, Sequence, getRemotionEnvironment, staticFile, useCurrentFrame } from 'remotion';
import { Selo } from '../ig/kit';
import { Canvas, Headline, Label, CHALK, STAGE, move, type PieceProps } from './kit';
import { InkDisc } from './art-pieces';
import type { Piece } from './pieces';

const source=(name:string)=>getRemotionEnvironment().isPlayer?`/festival/ig/gabriel/${name}`:staticFile(`festival/ig/gabriel/${name}`);
const brush=()=>source('window-mask.svg');

/** Two native-video scenes, exact CFR freeze PNGs and an independent paint layer.
 * The brush masks the whole scene, retaining hands and source geometry. No AI pose replaces the video.
 */
function GabrielReel({beach=false,...props}:PieceProps & {beach?:boolean}) {
 const frame=useCurrentFrame(),freezeAt=beach?300:180;
 const frozen=frame>=freezeAt,mono=move(frame,freezeAt,12),paint=move(frame,freezeAt+5,30);
 const name=beach?'img-3377':'img-3372';
 const Video=getRemotionEnvironment().isPlayer?Html5Video:OffthreadVideo;
 const mediaStyle={position:'absolute' as const,inset:0,width:'100%',height:'100%',objectFit:'contain' as const};
 const headline=beach?(frozen?['MESMA PRÁTICA.','OUTRO CENÁRIO.']:['MUDA A FORMA.','FICA O APOIO.']):(frozen?['O CAMINHO','TAMBÉM CONTA.']:['UMA FORMA.','OUTRA FORMA.']);
 return <Canvas {...props} dark={beach}>
  <Label y={225} size={32} color={beach?CHALK:STAGE}>GABRIEL · PRÁTICA</Label>
  <Headline lines={headline} y={295} size={80} dark={beach}/>
  <div style={{position:'absolute',left:115,top:540,width:820,height:860}}>
   <div style={{position:'absolute',left:65,top:70,width:690,height:720,transform:'rotate(-13deg)'}}><InkDisc color={beach?'#dfab5b':'#cb8b34'} progress={paint}/></div>
   {!frozen ? <Video src={source(`${name}.mp4`)} muted style={mediaStyle}/> : <>
    <Img src={source(`${name}-freeze.webp`)} style={{...mediaStyle,filter:`grayscale(${mono}) contrast(${1+mono*.13})`,opacity:1-paint}}/>
    <div style={{position:'absolute',left:(820-860*9/16)/2,top:0,width:860*9/16,height:860,opacity:paint,maskImage:`url("${brush()}")`,WebkitMaskImage:`url("${brush()}")`,maskSize:'100% 100%',WebkitMaskSize:'100% 100%',maskRepeat:'no-repeat',WebkitMaskRepeat:'no-repeat'}}>
     <Img src={source(`${name}-freeze.webp`)} style={{...mediaStyle,filter:'grayscale(1) contrast(1.13)'}}/>
    </div>
   </>}
  </div>
  <Label y={1440} size={42} color={beach?CHALK:STAGE} style={{width:820}}>{beach?'Onde sua prática te leva?':'Que transição te desafia?'}</Label>
  {frozen && <Sequence from={freezeAt} layout="none"><div style={{position:'absolute',left:850,top:1540}}><Selo size={108} giro={28}/></div></Sequence>}
 </Canvas>;
}
const Transitions=(p:PieceProps)=><GabrielReel {...p}/>;
const Beach=(p:PieceProps)=><GabrielReel {...p} beach/>;

function Landscape(p:PieceProps) {
 return <Freeze frame={90}><Canvas {...p} format="card">
  <Label y={65} size={32}>GABRIEL · ACERVO PESSOAL</Label>
  <Headline lines={['OUTRO JEITO','DE VER O MAR.']} y={145} size={83}/>
  <Img src={source('praia-reta.webp')} style={{position:'absolute',left:200,top:370,width:680,height:900,objectFit:'contain'}}/>
  <Label y={1300} size={40}>Qual paisagem marcou seu treino?</Label>
 </Canvas></Freeze>;
}
function Engraving(p:PieceProps) {
 return <Freeze frame={90}><Canvas {...p} format="card" dark>
  <Label y={65} size={32} color={CHALK}>GABRIEL · CORPO & EXPRESSÃO</Label>
  <Headline lines={['O CORPO','TAMBÉM CRIA.']} y={145} size={91} dark/>
  <div style={{position:'absolute',left:160,top:455,width:730,height:730,transform:'rotate(17deg)'}}><InkDisc color="#dfab5b"/></div>
  <Img src={source('gabriel-arco.webp')} style={{position:'absolute',left:150,top:355,width:780,height:850,objectFit:'contain'}}/>
  <Label y={1260} size={42} color={CHALK}>Equilíbrio, formas e expressão.</Label>
  <div style={{position:'absolute',left:900,top:1310}}><Selo size={85}/></div>
 </Canvas></Freeze>;
}
export const GABRIEL_PIECES:Piece[]=[
 {id:'gabriel-transicoes',title:'Entre uma forma e outra',format:'Reel',description:'Gabriel alterna tuck e reta. Fonte IMG_3372: 0–6 s; congelamento exato em 6 s, P&B e janela de pincel com ocre.',look:'Congela e pinta / papel',movement:'6 s em velocidade real + 5 s de freeze editorial. Não é tutorial nem demonstração de entrada.',slides:[{name:'Tuck → reta → pintura',component:Transitions,seconds:11,height:1920,cover:0,cues:[{label:'Movimento',frame:0},{label:'Congela',frame:180},{label:'Pintura',frame:220}]}]},
 {id:'gabriel-praia',title:'A prática muda de cenário',format:'Reel',description:'Gabriel muda as formas na areia. Fonte IMG_3377: 0–10 s; congelamento exato em 10 s. Mantém cenário dentro da mancha.',look:'Congela e pinta / verde',movement:'10 s em velocidade real + 5 s de freeze P&B/ocre. Áudio original não incluído.',slides:[{name:'Praia → freeze → ocre',component:Beach,seconds:15,height:1920,cover:0,cues:[{label:'Movimento',frame:0},{label:'Congela',frame:300},{label:'Pintura',frame:340}]}]},
 {id:'gabriel-paisagem',title:'Outro jeito de ver o mar',format:'Estático',description:'IMG_7876: fotografia preservada em cor e corpo inteiro. Registro pessoal, não recomendação de treino em rochas.',look:'Fotografia natural / papel',movement:'PNG estático.',slides:[{name:'Gabriel e o mar',component:Landscape,seconds:1,height:1440,cover:0,cues:[]}]},
 {id:'gabriel-gravura',title:'O corpo também cria',format:'Estático',description:'Gravura gerada a partir de IMG_8751: figura transparente e tinta independente. Interpretação editorial, não medição anatômica.',look:'Gravura / verde / ocre',movement:'PNG estático; pessoa e pincel separados.',slides:[{name:'Gabriel / gravura',component:Engraving,seconds:1,height:1440,cover:0,cues:[]}]},
];
