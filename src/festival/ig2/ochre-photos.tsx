import { Freeze, Img, Sequence, getRemotionEnvironment, staticFile, useCurrentFrame } from 'remotion';
import { BrushStroke } from '../Brush';
import { Canvas, PracticeClose, Headline, Label, ACCENT, CHALK, STAGE, move, type PieceProps } from './kit';
import { InkDisc } from './art-pieces';
import type { Piece } from './pieces';

const photos = [
  {src:'ig2-estrela-aberta.webp',title:['UMA PARADA.', 'MUITAS FORMAS.'],note:'UMA FORMA. OUTRA PERSPECTIVA.'},
  {src:'ig2-estrela-reta.webp',title:['O MESMO TREINO.', 'OUTRO INSTANTE.'],note:'O EQUILÍBRIO MUDA DE DESENHO.'},
  {src:'ig2-estrela-transicao.webp',title:['ENTRE UMA', 'E OUTRA.'],note:'O MOVIMENTO ESTÁ NA TRANSIÇÃO.'},
];

// The colored intervention stays in the trees above the athletes, never over their bodies.
function PhotoStudy({index=0,motion=false,...p}:PieceProps & {index?:number;motion?:boolean}) {
  const frame=useCurrentFrame(), item=photos[index], dark=index===2, text=dark?CHALK:STAGE;
  const paint=motion?move(frame,18,38):1, gray=motion?move(frame,0,18):1;
  const path=`festival/ig/${item.src}`;
  const src=getRemotionEnvironment().isPlayer?`/${path}`:staticFile(path);
  const y=motion?500:350;
  return <Canvas {...p} palette="ocre" dark={dark} format={motion?'reel':'card'}>
    <Label x={65} y={motion?280:65} size={36} color={text}>HANDSTANDFEST / CORPO & GESTO</Label>
    <Headline dark={dark} x={65} y={motion?350:125} lines={item.title} size={index===1?73:motion?78:82} width={motion?885:950} accentLine={-1}/>
    <div style={{position:'absolute',left:motion?24:65,top:y,width:motion?1032:950,height:motion?1000:850}}>
      <BrushStroke color={ACCENT} style={{position:'absolute',left:60,top:45,width:830,height:770,transform:`rotate(${index===1?3:-3}deg)`,clipPath:`inset(0 ${(1-paint)*100}% 0 0)`}}/>
      <Img src={src} style={{position:'absolute',left:0,top:0,width:motion?1032:950,height:motion?1000:850,objectFit:'contain',filter:`grayscale(${gray}) contrast(1.07)`}}/>
      <div style={{position:'absolute',left:340,top:0,width:270,height:270,mixBlendMode:'multiply',opacity:.8}}>
        <div style={{width:270,height:270,transform:`rotate(${index*25-15}deg)`}}><InkDisc color="#cb8b34" progress={paint}/></div>
      </div>
    </div>
    <Label x={65} y={motion?1460:1240} size={40} color={text} style={{width:motion?680:885}}>{item.note}</Label>
    {!motion && <><Label x={65} y={1340} size={36} color={text}>{String(index+1).padStart(2,'0')} / 04</Label></>}
  </Canvas>;
}

function PhotoMotion(p:PieceProps) {
  return <>{photos.map((_,index)=><Sequence key={index} from={index*90} durationInFrames={90}><PhotoStudy {...p} index={index} motion/></Sequence>)}</>;
}

export const OCHRE_PHOTOS:Piece[]=[
  {id:'fotos-ocre',title:'Fotos, P&B e pincel ocre',format:'Carrossel',description:'Três fotos do carrossel do parque, com os corpos inteiros em preto e branco. A tinta atravessa as árvores e escapa pelas bordas.',look:'P&B + ocre + papel quente',movement:'Três PNGs estáticos. A pincelada não passa por mãos, pés ou rostos.',slides:photos.map((_,index)=>({name:['Uma parada, muitas formas','Outro instante','A transição'][index],component:(p:PieceProps)=><Freeze frame={75}><PhotoStudy {...p} index={index}/></Freeze>,seconds:1,height:1440,cover:0,cues:[]})).concat([{name:'A conversa continua',component:(p:PieceProps)=><PracticeClose {...p} body="Uma sequência de treino pode revelar muitas formas. Observar uma transição também é um jeito de conhecer o handstand. Qual detalhe você percebeu?"/>,seconds:1,height:1440,cover:0,cues:[]}])},
  {id:'fotos-ocre-motion',title:'A fotografia recebe a tinta',format:'Reel',description:'As mesmas três fotos em uma peça separada: a cor cede ao P&B e o pincel entra nas árvores. O corpo fotografado permanece imóvel.',look:'Cor → P&B + ocre',movement:'3 s por foto, cortes diretos e pintura de 1,3 s. Sem zoom, música ou movimento artificial do corpo.',slides:[{name:'Fotografia → P&B → tinta',component:PhotoMotion,seconds:9,height:1920,cover:60,cues:[{label:'Cor',frame:0},{label:'Pincel',frame:42},{label:'Foto 2',frame:150},{label:'Foto 3',frame:240}]}]},
];
