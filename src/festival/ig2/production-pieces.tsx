import {Freeze,Img,getRemotionEnvironment,staticFile} from 'remotion';
import {Canvas,Headline,Label,ShareClose,CHALK,type PieceProps} from './kit';
import type {Piece} from './pieces';
const frames=[
 {time:8,title:['UMA TENTATIVA','CONTA O TREINO','INTEIRO?'],body:'Na parada de mão, também vale olhar o caminho até chegar lá.'},
 {time:4,title:['COMO VOCÊ','CHEGA AO APOIO?'],body:'Antes da posição, tem uma entrada. Aqui, outro momento da mesma sequência do Gabriel.'},
 {time:12,title:['E QUANDO','OS PÉS VOLTAM?'],body:'O retorno também faz parte do treino. O que você percebe quando revê sua sequência?'}
];
function Attempt({index,...p}:PieceProps&{index:number}){const d=frames[index];const path=`festival/ig/producao-2026-11-26/tentativa-${d.time}.webp`;return <Freeze frame={90}><Canvas {...p} format="card" dark signature={false}>
 <Img src={getRemotionEnvironment().isPlayer?'/'+path:staticFile(path)} style={{position:'absolute',inset:0,width:1080,height:1440,objectFit:'cover'}}/>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(10,35,28,.94),rgba(10,35,28,.25) 26%,transparent 40%,transparent 78%,rgba(10,35,28,.93))'}}/>
 <Label y={55} size={28} color={CHALK}>PARADA DE MÃO · GABRIEL AGUSTIN</Label>
 <Headline lines={d.title} y={120} size={64} dark/>
 <Label y={365} size={37} color={CHALK} style={{width:930}}>{d.body}</Label>
 </Canvas></Freeze>}
export const PRODUCTION_PIECES:Piece[]=[{id:'ed-tentativas',title:'Uma tentativa não conta o treino inteiro',format:'Carrossel',description:'Três fotografias extraídas da mesma sequência real do Gabriel na varanda: posição, entrada e retorno. Sem antes/depois ou promessa de evolução.',look:'Fotografia natural com título ocre',movement:'Fotos estáticas com recorte fixo. A ordem editorial não é cronológica; os momentos vêm dos segundos 8, 4 e 12 do mesmo vídeo.',slides:[...frames.map((d,index)=>({name:['A tentativa','A entrada','O retorno'][index],component:(p:PieceProps)=><Attempt {...p} index={index}/>,height:1440,seconds:1,cover:0,cues:[]})),{name:'Envie para quem treina com você',component:(p:PieceProps)=><ShareClose {...p} body="Envie para quem também está construindo sua prática de parada de mão." context="Handstand Life: vamos observar o treino, conversar e aprender juntos. #handstandlife"/>,height:1440,seconds:1,cover:0,cues:[]}]}];
