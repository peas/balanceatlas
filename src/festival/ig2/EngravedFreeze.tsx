import { Img, getRemotionEnvironment, staticFile, useCurrentFrame } from 'remotion';
import { InkDisc } from './art-pieces';
import { move } from './kit';

export const FREEZE_ART = {
 'piscina-press-solo': {figure:'piscina-solo', paint:[225,225,420,450]},
 'deck-pike-reta': {figure:'deck-pike', paint:[270,680,390,390]},
 'gabriel-reta': {figure:'gabriel-reta', paint:[140,440,410,480]},
} as const;
type Art = typeof FREEZE_ART[keyof typeof FREEZE_ART];

/** Three independently reusable layers, registered on the source 720 × 1280 canvas.
 * Keep mounted during playback so the transparent illustration is loaded before the freeze.
 * This is a reviewed, generated illustration of ONE frame, not a live anatomical video filter.
 */
export function EngravedFreeze({src,art,at,paintOpacity=.65,showPaint=true}:{
 src:string;art:Art;at:number;paintOpacity?:number;showPaint?:boolean;
}) {
 const frame=useCurrentFrame(), active=frame>=at;
 const [x,y,w,h]=art.paint;
 const path=`festival/ig/arte/freezes-v1/${art.figure}.webp`;
 return <div style={{position:'absolute',inset:0,opacity:active?1:0,pointerEvents:'none'}}>
  <Img src={src} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain'}}/>
  <svg viewBox="0 0 720 1280" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
   {showPaint&&<foreignObject x={x} y={y} width={w} height={h} opacity={paintOpacity}>
    <div style={{width:'100%',height:'100%'}}><InkDisc color="#cb8b34" progress={move(frame,at+5,30)}/></div>
   </foreignObject>}
  </svg>
  <Img src={getRemotionEnvironment().isPlayer?`/${path}`:staticFile(path)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',opacity:move(frame,at,10)}}/>
 </div>;
}
