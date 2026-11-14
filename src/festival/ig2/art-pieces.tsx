import { useId } from 'react';
import { AbsoluteFill, Freeze, Html5Video, OffthreadVideo, Img, Sequence, getRemotionEnvironment, staticFile, useCurrentFrame } from 'remotion';
import { CIRCULO } from '../pincel';
import { BrushStroke } from '../Brush';
import { WIDE, MONO } from '../ig/kit';
import { Canvas, BrandSeal, Headline, Label, PracticeClose, move, type PieceProps } from './kit';
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
    </AbsoluteFill>
  </Canvas>;
}
const PosterYellow=(p:PieceProps)=><Freeze frame={240}><ArtPoster {...p}/></Freeze>;
const PosterOchre=(p:PieceProps)=><Freeze frame={240}><ArtPoster {...p} variant={1}/></Freeze>;
const PosterGreen=(p:PieceProps)=><Freeze frame={240}><ArtPoster {...p} variant={2}/></Freeze>;

/** Keep the full transition before freezing its actual frame at 18 s. */
function FreezeArt({bold=false,...p}:PieceProps & {bold?:boolean}) {
 const frame=useCurrentFrame(),at=540,mono=move(frame,at,18);
 const Video=getRemotionEnvironment().isPlayer?Html5Video:OffthreadVideo;
 const geometry={position:'absolute' as const,left:24,top:430,width:1032,height:1376,objectFit:'contain' as const};
 return <Canvas {...p} dark signature={false}>
  {frame<at?<Video src={url('ig2-formas.mp4')} muted style={geometry}/>:<Img src={url('arte/formas-freeze-18.webp')} style={{...geometry,filter:`grayscale(${mono}) contrast(${1+.12*mono})`}}/>}
  <Label y={205} size={36} color={PAPER}>#HANDSTANDLIFE</Label>
  <Headline lines={frame<at?['PARADA?','SÓ NO NOME.']:['BALANCING:','AJUSTES CONTÍNUOS.']} y={275} size={72} accentLine={frame<at?-1:0} dark/>
  <BrandSeal x={65} y={1450} size={230}/>
 </Canvas>;
}
const FreezeOchre=(p:PieceProps)=><FreezeArt {...p}/>;
const FreezeBold=(p:PieceProps)=><FreezeArt {...p} bold/>;
export const ART_PIECES:Piece[]=[
  {id:'arte-gravura',title:'Corpo, tinta e papel',format:'Carrossel',description:'Três estudos estáticos e um fechamento com as figuras das referências de vocês: papel claro e fundo verde. Gravura, cerdas e arcos em camadas independentes.',look:'Papel × gesto × verde',movement:'Imagens estáticas. A arte tem textura; a tipografia preserva a leitura no celular.',slides:[PosterYellow,PosterOchre,PosterGreen,(p:PieceProps)=><PracticeClose {...p} body="O corpo desenha no espaço. Cada forma vem de uma prática, de uma tentativa, de uma pessoa. Qual gesto chama sua atenção?"/>].map((component,i)=>({name:['Corpo / papel','Gesto / papel','Verde / ousado','A conversa continua'][i],component,seconds:1,height:1440,cover:0,cues:[]}))},
  ...[false,true].map((bold):Piece=>({id:bold?'arte-freeze-amarelo':'arte-freeze-ocre',title:bold?'O gesto ocupa o quadro':'Do vídeo à tinta',format:'Reel',description:bold?'Teste mais ousado: verde profundo, pincelada ampla e o corpo em P&B.':'O vídeo congela; o P&B chega primeiro, seguido da pintura ocre, com o mesmo enquadramento amplo.',look:bold?'Verde + tinta':'Papel + ocre',movement:'18 s de movimento sem interromper a sequência → freeze exato → P&B e destaque ocre. Sem recorte de outra pose.',slides:[{name:'Vídeo → quadro → pintura',component:bold?FreezeBold:FreezeOchre,seconds:23,height:1920,cover:0,cues:[{label:'Vídeo',frame:0},{label:'Congela',frame:540},{label:'Pintura',frame:570},{label:'Arte',frame:600}]}]})),
];
