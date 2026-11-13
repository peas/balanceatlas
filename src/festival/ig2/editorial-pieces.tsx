import { Freeze, Img, getRemotionEnvironment, staticFile } from 'remotion';
import EngravingArtwork from '../EngravingArtwork';
import { Canvas, Headline, Label, type PieceProps, CHALK, STAGE } from './kit';
import type { Piece } from './pieces';
import { EDITORIAL_IMAGES, type EditorialImageKey } from './editorial-images';
import { QUANDO } from '../data';

const resolveSource = (path:string) => getRemotionEnvironment().isPlayer ? path : staticFile(path.slice(1));
export function EditorialArt({title,sub,dark=false,straight=false,story=false,image,...p}:PieceProps & {title:string[];sub:string;dark?:boolean;straight?:boolean;story?:boolean;image?:EditorialImageKey}) {
 return <Freeze frame={90}><Canvas {...p} format={story?'story':'card'} dark={dark}>
  <Label y={story?230:70} size={30} color={dark?CHALK:STAGE}>HANDSTANDFEST · COMUNIDADE</Label>
  <Headline lines={title} y={story?320:160} size={85} dark={dark}/>
  {image ? <div style={{position:'absolute',left:65,top:story?590:420,width:950,height:story?800:740}}><Img src={EDITORIAL_IMAGES[image].url} alt={EDITORIAL_IMAGES[image].alt} style={{width:'100%',height:'100%',objectFit:'contain'}}/></div> : <EngravingArtwork figure={straight?'straight':'straddle'} paint={straight?'oval':'sweep'} background="none" imageComponent={Img} resolveSource={resolveSource} style={{position:'absolute',left:140,top:story?590:420,width:800,height:story?800:740}}/>}
  {image && <Label y={story?1410:1167} size={28} color={dark?CHALK:STAGE}>ACERVO DE RETIROS · BALANCE ATLAS</Label>}
  <Label y={story?1480:1210} size={40} color={dark?CHALK:STAGE} style={{width:885}}>{sub}</Label>
 </Canvas></Freeze>;
}
function piece(id:string,title:string,variants:{title:string[];sub:string;dark?:boolean;straight?:boolean;image?:EditorialImageKey}[]):Piece {
 return {id,title,format:variants.length>1?'Carrossel':'Estático',description:'Fotos selecionadas do catálogo alternadas com gravura pontual, ocre e texto grande.',look:'Acervo fotográfico / gravura pontual / ocre',movement:'Imagem estática; sem vídeo nas lâminas.',slides:variants.map((v,i)=>({name:`${title} · ${i+1}`,component:(p:PieceProps)=><EditorialArt {...p} {...v}/>,height:1440,seconds:1,cover:0,cues:[]}))};
}
export const EDITORIAL_PIECES = [
 piece('ed-comunidade','Gente para treinar junto',[{title:['GENTE PARA','TREINAR JUNTO.'],sub:'Onde você treina hoje?',dark:true,image:'group'}]),
 piece('ed-formas','Reta e straddle',[{title:['UMA PARADA.','MUITAS FORMAS.'],sub:'Reta e straddle: duas formas de olhar.'},{title:['RETA.'],sub:'Pernas juntas.',image:'straight'},{title:['STRADDLE.'],sub:'Pernas abertas.',dark:true,image:'overhead'}]),
 piece('ed-festival','Três dias. Um encontro.',[{title:['TRÊS DIAS.','UM ENCONTRO.'],sub:`${QUANDO} · São Paulo`,dark:true,image:'class'}]),
 piece('ed-mundo','Ninguém treina só',[{title:['NINGUÉM','TREINA SÓ.'],sub:'Que grupo ou encontro você indicaria?',image:'tuck'}]),
];
