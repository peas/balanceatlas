import { Freeze, Img, Sequence, getRemotionEnvironment, staticFile } from 'remotion';
import { Canvas, ShareClose, Headline, Label, CHALK, BrandSeal, EndCard, VideoScene, type PieceProps } from './kit';
import { AGUSTIN_BIO, AGUSTIN_ORIGIN } from '../home-content';
import type { Piece } from './pieces';
const url=(path:string)=>getRemotionEnvironment().isPlayer?'/festival/ig/'+path:staticFile('festival/ig/'+path);
const cards=[
 {title:['GABRIEL','AGUSTIN'],label:'PROFESSOR DE PARADA DE MÃO',body:'Artista circense, acrobata e professor de movimento. Argentino radicado no Brasil.',image:'gabriel/img-3372-freeze.webp'},
 {title:['HÁ MAIS DE 10 ANOS,','GABRIEL ENSINA','E PRATICA MOVIMENTO.'],label:'MAIS DE 10 ANOS DE TRAJETÓRIA',body:'Acrobacia, parada de mãos e práticas corporais. Um caminho de investigação, expressão e transformação.',image:'arte/engraving-v1/gabriel-reta-profile.webp'},
 {title:['DA PRÁTICA','À IDEIA DE','UM FESTIVAL.'],label:'A IDEIA DO FESTIVAL',body:'Assim nasceu o HandstandFest: um festival de parada de mão para praticar, aprender e trocar.',image:'gabriel/img-3377-freeze.webp'},
];
function BioCard({index,...p}:PieceProps & {index:number}){const item=cards[index];return <Freeze frame={90}><Canvas {...p} format="card" dark signature={false}>
 <Img src={url(item.image)} style={{position:'absolute',inset:0,width:1080,height:1440,objectFit:index===1?'contain':'cover',padding:index===1?'120px 0 100px':0,boxSizing:'border-box'}}/>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(10,35,28,.85),transparent 32%,transparent 65%,rgba(10,35,28,.94))'}}/>
 <Label y={65} size={28} color={CHALK}>{item.label}</Label>
 <Headline lines={item.title} y={140} size={index===0?88:60} dark/>
 <Label y={1020} size={48} color={CHALK} style={{width:920}}>{item.body}</Label>

 </Canvas></Freeze>}
function Introduction(p:PieceProps){return <>
 <Sequence durationInFrames={180}><VideoScene {...p} src="gabriel/img-3372" lines={['GABRIEL','AGUSTIN']} note="PROFESSOR DE PARADA DE MÃO"/></Sequence>
 <Sequence from={180} durationInFrames={180}><VideoScene {...p} src="gabriel/img-3377" lines={['MOVIMENTO,','PESQUISA E TROCA.']} note="MAIS DE 10 ANOS DE TRAJETÓRIA"/></Sequence>
 <Sequence from={360} durationInFrames={120}><EndCard {...p} cta="Festival de parada de mão: uma ideia do Gabriel para praticar e trocar."/></Sequence>
 </>}
export const AGUSTIN_PIECES:Piece[]=[
 {id:'agustin-apresentacao',title:'Conheça Gabriel Agustin',format:'Carrossel',description:AGUSTIN_BIO+' '+AGUSTIN_ORIGIN,look:'Fotografia + gravura de perfil',movement:'Quatro lâminas estáticas; contexto do festival e convite para compartilhar na última. Bio fornecida por Paulo.',slides:cards.map((_,index)=>({name:['Gabriel Agustin','A trajetória','A origem do festival'][index],component:(p:PieceProps)=><BioCard {...p} index={index}/>,height:1440,seconds:1,cover:0,cues:[]})).concat([{name:'Envie para quem quer praticar',component:(p:PieceProps)=><ShareClose {...p} body="Quer praticar com o Gabriel? Envie para quem também quer aprender parada de mão!" context="1º HandstandFest · aulas e encontros de parada de mão. 16–18 abr 2027 · Trapézio Voador, São Paulo."/>,height:1440,seconds:1,cover:0,cues:[]}])},
 {id:'agustin-movimento',title:'Gabriel Agustin em movimento',format:'Reel',description:'Dois trechos reais de Gabriel: treino em casa e sequência na praia. A apresentação usa a biografia fornecida, sem áudio ou narração inventada.',look:'Cor natural / ocre',movement:'Dois planos de 6 s + convite de 4 s.',slides:[{name:'Gabriel em movimento',component:Introduction,height:1920,seconds:16,cover:30,cues:[{label:'Gabriel',frame:30},{label:'Movimento',frame:210},{label:'Festival',frame:400}]}]},
];
