import { Freeze, Html5Video, OffthreadVideo, Img, useCurrentFrame, getRemotionEnvironment } from 'remotion';
import { Canvas, Headline, Label, BrandSeal, CHALK, type PieceProps } from './kit';
import { MEDIA } from '../ig/kit';
import briefs from './gabriel-filming.json';
import type { Piece } from './pieces';
const titles:Record<string,string[]>={'gato-vaca':['GATO-VACA.','PERCEBA A COLUNA.'],escapulas:['OMBROS:','EMPURRE O CHÃO.'],punhos:['MÃOS E PUNHOS.','PERCEBA O APOIO.'],'urso-prancha':['DO URSO','À PRANCHA.'],canoinha:['COMO ESTÁ','SUA CANOINHA?'],sapinho:['SAPINHO:','UM PÉ DE CADA VEZ.'],'ombros-cadeira':['ABERTURA','DE OMBROS.'],parede:['BARRIGA','PARA A PAREDE.'],'saida-estrela':['SAIR TAMBÉM','É PRATICAR.'],'chute-parede':['COMO CHEGA','O PRIMEIRO PÉ?'],costelas:['COSTELAS,','PEITO E PELVE.'],'ombros-box':['OMBROS','COM APOIO.'],'pike-box':['PIKE COM','PÉS APOIADOS.'],'abertura-chao':['BRAÇOS À FRENTE.','OBSERVE O TRONCO.']};
const available=briefs.filter(b=>b.sample);
function ExercisePreview({id,seconds,...props}:PieceProps&{id:string;seconds:number}){
 const frame=useCurrentFrame(),freezeAt=Math.round(seconds*30)-2;
 const Video=getRemotionEnvironment().isRendering?OffthreadVideo:Html5Video;
 return <Canvas {...props} dark signature={false}>
  <Freeze active={frame>=freezeAt} frame={freezeAt}><Video src={`${MEDIA}/gabriel-filming-v1/${id}.mp4`} muted style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',filter:'saturate(.65) contrast(1.08) brightness(1.08)'}}/></Freeze>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(10,35,28,.8),transparent 28%,transparent 70%,rgba(10,35,28,.75))'}}/>
  <Label y={275} color={CHALK} size={34}>HANDSTAND LIFE</Label>
  <Headline lines={titles[id]} y={340} size={72} dark/>
  <BrandSeal x={700} y={580} size={230}/>
 </Canvas>;
}
export const EXERCISE_PREVIEW_PIECES:Piece[]=available.map(b=>{const seconds=b.sample!.end-b.sample!.start;return {id:`exercicio-${b.id}`,title:`${b.title} · prévia com Paulo`,format:'Reel',description:`Gravação provisória do Paulo. ${b.subtitle} Correção leve de brilho, contraste e saturação; não é hachura gerada. Falta refilmagem e revisão técnica do Gabriel, texto e narração finais.`,look:'Imagem ampla / contraste suave / ocre',movement:'Demonstração completa do sample, seguida por 3 s de quadro congelado. Sem áudio original na peça.',slides:[{name:b.title,component:(p:PieceProps)=><ExercisePreview {...p} id={b.id} seconds={seconds}/>,height:1920,seconds:seconds+3,cover:Math.round(b.sample!.poster*30),cues:[{label:'Demonstração',frame:Math.round(b.sample!.poster*30)},{label:'Movimento',frame:Math.round(seconds*15)},{label:'Congela',frame:Math.round(seconds*30)+30}]}]}});
