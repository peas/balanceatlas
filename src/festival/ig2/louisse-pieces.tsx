import { AbsoluteFill, Img, OffthreadVideo, Html5Video, Sequence, staticFile, getRemotionEnvironment, useCurrentFrame } from 'remotion';
import { Canvas, Headline, Label, move, CHALK, STAGE, ShareClose, type PieceProps } from './kit';
import { BrushStroke } from '../Brush';
import { QUANDO } from '../data';
import type { Piece } from './pieces';

const media=(name:string)=>getRemotionEnvironment().isPlayer?`/festival/ig/louisse-v1/${name}`:staticFile(`festival/ig/louisse-v1/${name}`);
const photoStyle={position:'absolute' as const,inset:0,width:'100%',height:1350,objectFit:'cover' as const};
function Photo({file}:{file:string}) {return <><Img src={media(file)} style={photoStyle}/><AbsoluteFill style={{background:'linear-gradient(transparent 58%,rgba(9,28,23,.4) 73%,#123d33 94%)'}}/></>;}
function Cover(p:PieceProps){return <Canvas {...p} format="card" dark signature={false}>
 <Photo file="foto-01.webp"/>
 <Label y={55} size={36} color={CHALK}>PROFESSORA LOUISSE ALDRIGUES</Label>
 <Headline lines={['OLHA O QUE','A LOUISSE FAZ','NA PARADA DE MÃO!']} y={1080} size={62} dark accentLine={1}/>
 <Label y={1335} size={40} color={CHALK}>@lou.handstand</Label>
</Canvas>;}
function Footage({which,from=0}:{which:number;from?:number}){const Video=getRemotionEnvironment().isPlayer?Html5Video:OffthreadVideo;return <Video src={media(`video-0${which}.mp4`)} trimBefore={from*30} muted style={{width:'100%',height:'100%',objectFit:'cover'}}/>;}
// Preserve the 9:16 source at a fixed 1080px width. Only empty ceiling/floor
// is cropped to 3:4, and the same transform is used for the frozen frame.
const videoBox={position:'absolute' as const,left:0,top:-120,width:1080,height:1920};
function Shapes(p:PieceProps){return <Canvas {...p} format="card" dark signature={false}>
 <div style={videoBox}><Footage which={1} from={3}/></div>
 <AbsoluteFill style={{background:'linear-gradient(transparent 68%,rgba(9,28,23,.85))'}}/>
 <Headline lines={['PROFESSORA','DESDE 2015.']} y={1230} size={64} dark accentLine={1}/>
</Canvas>;}
function Story(p:PieceProps){return <Canvas {...p} format="card" dark signature={false}>
 <Photo file="foto-04.webp"/>
 <Headline lines={['DO CIRCO À','PARADA DE MÃO.']} y={1080} size={76} dark/>
 <Label y={1240} size={40} color={CHALK} style={{width:940,lineHeight:1.25}}>Começou no circo em 2011 e se especializou na Escola Nacional de Circo.</Label>
</Canvas>;}
function Balance(p:PieceProps){const frame=useCurrentFrame();const hold=frame>=120&&frame<162;return <Canvas {...p} format="card" dark signature={false}>
 <div style={{...videoBox,top:-100}}>
  <Sequence durationInFrames={120}><Footage which={2} from={6}/></Sequence>
  <Sequence from={120} durationInFrames={42}><Img src={media('freeze.png')} style={{width:'100%',height:'100%',objectFit:'cover',filter:'grayscale(1) contrast(1.13)'}}/></Sequence>
  <Sequence from={162}><Footage which={2} from={10}/></Sequence>
 </div>
 <AbsoluteFill style={{background:'linear-gradient(transparent 68%,rgba(9,28,23,.9))'}}/>
 {hold&&<BrushStroke color="#cb8b34" style={{position:'absolute',left:55,top:1250,width:900,height:130,clipPath:`inset(0 ${(1-move(frame,120,14))*100}% 0 0)`}}/>}
 <Label y={1280} size={52} color={hold?STAGE:CHALK}>Conheça a prática da Lou.</Label>
</Canvas>;}
function Closing(p:PieceProps){return <Canvas {...p} format="card" dark signature={false}>
 <Img src={media('foto-04.webp')} style={{...photoStyle,opacity:.15}}/>
 <Headline lines={['PROFESSORA','CONFIRMADA!']} y={145} size={78} dark accentLine={1}/>
 <Label y={350} size={42} color={CHALK}>LOUISSE ALDRIGUES</Label>
 <Label y={460} size={48} color={CHALK}>NO HANDSTANDFEST, NOSSO<br/>FESTIVAL DE PARADA DE MÃO.</Label>
 <Label y={650} size={50} color={CHALK}>{QUANDO.toUpperCase()}</Label>
 <Label y={740} size={48} color={CHALK}>TRAPÉZIO VOADOR<br/>SÃO PAULO</Label>
 <Label y={950} size={42} color={CHALK} style={{width:850}}>Informações e inscrições<br/>no link da bio.</Label>


</Canvas>;}
export const LOUISSE_PIECES:Piece[]=[{id:'louisse-confirmada',title:'Olha o que a Louisse faz na parada de mão!',format:'Carrossel misto',description:'Seis lâminas: quatro fotos/artes e dois vídeos. Fotos da própria Louisse. Prévia muda; exports com trilha nos vídeos.',look:'Foto natural, um congelamento P&B e ocre',movement:'Uma pausa de 1,4 s, sem zoom ou deslocamento da câmera.',slides:[
 {name:'01 · Conheça a prática da Louisse',component:Cover,seconds:4,height:1440,cover:60,cues:[],media:'image'},
 {name:'02 · Mudanças de forma',component:Shapes,seconds:9,height:1440,cover:60,cues:[],media:'video'},
 {name:'03 · Do circo à parada de mão',component:Story,seconds:5,height:1440,cover:60,cues:[],media:'image'},
 {name:'04 · Um braço, pausa e retomada',component:Balance,seconds:12.4,height:1440,cover:135,cues:[{label:'Congelamento',frame:135}],media:'video'},
 {name:'05 · Professora confirmada no festival',component:Closing,seconds:5,height:1440,cover:60,cues:[],media:'image'},
 {name:'06 · Envie para quem vem praticar',component:ShareClose,seconds:5,height:1440,cover:60,cues:[],media:'image'},
]}];
