import { useId } from 'react';
import { AbsoluteFill, Freeze, Html5Video, Img, Sequence, getRemotionEnvironment, staticFile, useCurrentFrame } from 'remotion';
import { CIRCULO } from '../pincel';
import { BrushStroke } from '../Brush';
import { Selo, WIDE, MONO } from '../ig/kit';
import { Canvas, move, type PieceProps } from './kit';
import type { Piece } from './pieces';

const PAPER = '#f3eddf', INK = '#202d26', GREEN = '#123d33';
const url = (name: string) => {
  const path = `festival/ig/${name}`;
  return getRemotionEnvironment().isPlayer ? `/${path}` : staticFile(path);
};
/** Actual v07 bristles, revealed as one circular gesture, independent from the body. */
export function InkDisc({ color, progress = 1 }: { color: string; progress?: number }) {
  const id = useId();
  const points = ['100,100', ...Array.from({length:49}, (_,i) => {
    const a = -2.5 + Math.PI * 2 * progress * i / 48;
    return `${100 + 155 * Math.cos(a)},${100 + 155 * Math.sin(a)}`;
  })];
  return <svg viewBox="0 0 200 200" style={{width:'100%',height:'100%',overflow:'visible'}}>
    <defs><clipPath id={id}><polygon points={points.join(' ')} /></clipPath></defs>
    <g clipPath={progress >= 1 ? undefined : `url(#${id})`}><path d={CIRCULO.corpo} transform={CIRCULO.transform} fill={color}/></g>
  </svg>;
}
function Orbits({color, progress=1}:{color:string;progress?:number}) {
  return <svg viewBox="0 0 1000 1100" style={{position:'absolute',inset:0,width:'100%',height:'100%'}} fill="none" stroke={color}>
    <path d="M134 530 C74 250 451 80 733 245 M834 352 C995 650 803 947 394 924" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress}/>
    <path d="M143 538 C104 257 456 89 719 238 M843 365 C975 658 798 938 408 930" opacity=".45" strokeWidth="1.4" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress}/>
    <path d="M485 115 L487 338 M488 946 L489 1000" strokeWidth="1.6"/><circle cx="485" cy="99" r="3" fill={color}/>
  </svg>;
}
export function ArtPoster({variant=0, ...p}:PieceProps & {variant?:number}) {
  const dark=variant===2, color=variant===1?'#cb8b34':'var(--ig2-art-paint, #ffd23f)';
  const text=dark?PAPER:INK;
  return <Canvas {...p} format="card" dark={dark}>
    <AbsoluteFill style={{background:dark?GREEN:PAPER,color:text}}>
      <div style={{position:'absolute',left:65,top:65,fontFamily:MONO,fontWeight:700,fontSize:36,letterSpacing:2}}>HANDSTANDFEST / CORPO & GESTO</div>
      <div style={{position:'absolute',left:65,top:133,...WIDE,fontSize:94,lineHeight:.98,letterSpacing:-4}}>{variant===0?'O CORPO':variant===1?'O GESTO':'FORA'}<br/>{variant===0?'DESENHA.':variant===1?'FICA.':'DO EIXO.'}</div>
      <div style={{position:'absolute',left:35,top:320,width:990,height:930}}>
        <div style={{position:'absolute',left:185,top:170,width:650,height:650,transform:dark?'rotate(-24deg) scale(1.22)':'rotate(13deg)'}}><InkDisc color={color}/></div>
        <Orbits color={text}/>
        <Img src={url(`arte/${variant===1?'stag':'straddle'}.webp`)} style={{position:'absolute',left:80,top:15,width:840,height:885,objectFit:'contain'}}/>
        <BrushStroke color={text} style={{position:'absolute',left:290,top:878,width:400,height:17,opacity:.75}}/>
      </div>
      <div style={{position:'absolute',left:65,top:1310,fontFamily:MONO,fontWeight:700,fontSize:38}}>handstandfest.com.br</div>
      <div style={{position:'absolute',right:65,top:1285}}><Freeze frame={35}><Selo size={92}/></Freeze></div>
    </AbsoluteFill>
  </Canvas>;
}
const PosterYellow=(p:PieceProps)=><Freeze frame={240}><ArtPoster {...p}/></Freeze>;
const PosterOchre=(p:PieceProps)=><Freeze frame={240}><ArtPoster {...p} variant={1}/></Freeze>;
const PosterGreen=(p:PieceProps)=><Freeze frame={240}><ArtPoster {...p} variant={2}/></Freeze>;

/** Freeze at exactly clip frame 150. No generated pose replaces the live footage. */
function FreezeArt({bold=false,...p}:PieceProps & {bold?:boolean}) {
  const frame=useCurrentFrame(), freezeAt=150;
  const mono=move(frame,freezeAt,18), paint=move(frame,freezeAt+15,42);
  const color=bold?'var(--ig2-art-paint, #ffd23f)':'#cb8b34', paper=bold?GREEN:PAPER, ink=bold?PAPER:INK;
  const framing = {position:'absolute' as const,left:0,top:0,width:885,height:1030,transform:'translate(40px, -35px) scale(1.45)'};
  const media=<Html5Video src={url('ig2-formas.mp4')} muted style={{width:'100%',height:'100%',objectFit:'contain'}}/>;
  return <Canvas {...p} dark={bold}>
    <AbsoluteFill style={{background:paper,color:ink}}>
      <div style={{position:'absolute',left:65,top:285,...WIDE,fontSize:90,lineHeight:1.05,letterSpacing:-4}}>O MOVIMENTO<br/>{frame<freezeAt?'VIRA GESTO.':'DEIXA MARCA.'}</div>
      <div style={{position:'absolute',left:65,top:570,width:885,height:900,overflow:'hidden'}}>
        <div style={{...framing,filter:`grayscale(${mono}) contrast(${1+.15*mono})`,opacity:1-(bold?1:.88)*paint}}>
          <Freeze frame={freezeAt} active={frame>=freezeAt}>{media}</Freeze>
        </div>
        <div style={{position:'absolute',left:bold?-85:70,top:bold?0:65,width:bold?1050:740,height:bold?850:740,transform:bold?'rotate(-18deg)':'rotate(12deg)'}}><InkDisc color={color} progress={paint}/></div>
        <div style={{position:'absolute',inset:0,opacity:paint}}><Orbits color={ink} progress={paint}/></div>
        <BrushStroke color={ink} style={{position:'absolute',left:75,top:613,width:155,height:10,opacity:.6*paint}}/>
        <BrushStroke color={ink} style={{position:'absolute',left:625,top:527,width:120,height:8,opacity:.6*paint}}/>
        <Img src={url('arte/freeze-cutout.webp')} style={{...framing,objectFit:'contain',filter:'grayscale(1) contrast(1.12)',opacity:paint}}/>
      </div>
      <div style={{position:'absolute',left:65,top:1480,fontFamily:MONO,fontWeight:700,fontSize:42}}>HANDSTAND É MOVIMENTO.</div>
      {frame>=freezeAt && <Sequence from={freezeAt} layout="none"><div style={{position:'absolute',left:810,top:1370}}><Selo size={115} giro={32}/></div></Sequence>}
    </AbsoluteFill>
  </Canvas>;
}
const FreezeOchre=(p:PieceProps)=><FreezeArt {...p}/>;
const FreezeBold=(p:PieceProps)=><FreezeArt {...p} bold/>;
export const ART_PIECES:Piece[]=[
  {id:'arte-gravura',title:'Corpo, tinta e papel',format:'Carrossel',description:'Três estudos estáticos com as figuras das referências de vocês: papel claro e fundo verde. Gravura, cerdas e arcos em camadas independentes.',look:'Papel × gesto × verde',movement:'Imagens estáticas. A arte tem textura; a tipografia preserva a leitura no celular.',slides:[PosterYellow,PosterOchre,PosterGreen].map((component,i)=>({name:['Corpo / papel','Gesto / papel','Verde / ousado'][i],component,seconds:1,height:1440,cover:0,cues:[]}))},
  ...[false,true].map((bold):Piece=>({id:bold?'arte-freeze-amarelo':'arte-freeze-ocre',title:bold?'O gesto ocupa o quadro':'Do vídeo à tinta',format:'Reel',description:bold?'Teste mais ousado: verde profundo, pincelada ampla e o corpo em P&B.':'O vídeo congela; o P&B chega primeiro, seguido da pintura ocre e de um traço de órbita.',look:bold?'Verde + tinta':'Papel + ocre',movement:'5 s de vídeo real → congelamento no mesmo quadro → P&B → tinta em 1,4 s. Selo entra junto.',slides:[{name:'Vídeo → quadro → pintura',component:bold?FreezeBold:FreezeOchre,seconds:10,height:1920,cover:0,cues:[{label:'Vídeo',frame:0},{label:'Congela',frame:150},{label:'Pintura',frame:180},{label:'Arte',frame:240}]}]})),
];
