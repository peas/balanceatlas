import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame, getRemotionEnvironment, staticFile} from 'remotion';
import {BrushStroke} from '../Brush';
import {Selo} from '../ig/kit';
export const PRESS_FPS=60;
export const PRESS_DURATION=600;
const hold=[45,30,35,80,30,95,35,35,40,175];
export function poseAt(frame:number){let start=0;for(let i=0;i<hold.length;i++){if(frame<start+hold[i])return {index:i,local:frame-start,duration:hold[i]};start+=hold[i];}return {index:9,local:174,duration:175};}
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const PressStudy=({mode='calmo'}:{mode?:'calmo'|'pulso'})=>{
 const frame=useCurrentFrame(),{index,local,duration}=poseAt(frame),accent=index===5,pulse=mode==='pulso';
 const zoom=accent?(pulse?interpolate(local,[0,8,19,duration-1],[1,1.30,1.20,1.03],clamp):interpolate(local,[0,duration-1],[1,1.075],clamp)):1;
 const paint=accent?interpolate(local,[4,14,Math.min(40,duration-22),Math.min(54,duration-5)],[0,1,1,0],clamp):0;
 const url=`/festival/ig/press-study-v1/pose-${index+1}.webp`;
 const src=getRemotionEnvironment().isPlayer?url:staticFile(url.slice(1));
 const ink=pulse?'#f3eddf':'#123d33';
 return <AbsoluteFill style={{background:pulse?'#123d33':'#f3eddf',color:ink,fontFamily:'Archivo, sans-serif',overflow:'hidden','--accent':pulse?'#dfab5b':'#cb8b34','--accent-ink':'#123d33'} as React.CSSProperties}>
  <div style={{position:'absolute',left:65,top:170,fontFamily:'Space Mono, monospace',fontSize:32,fontWeight:700}}>HANDSTAND LIFE</div>
  <div style={{position:'absolute',left:65,top:230,fontSize:78,fontWeight:900,lineHeight:1.02}}>UM PRESS.<br/>DEZ INSTANTES.</div>
  <div style={{position:'absolute',left:40,top:450,width:960,height:1020,transform:`scale(${zoom})`,transformOrigin:'53% 92%'}}>
   <div style={{position:'absolute',left:100,top:390,width:780,height:330,transform:'rotate(-12deg)',clipPath:`inset(0 ${100-paint*100}% 0 0)`,opacity:paint}}><BrushStroke color={pulse?'#dfab5b':'#cb8b34'} style={{width:'100%',height:'100%'}}/></div>
   <Img src={src} style={{position:'absolute',inset:0,width:'100%',height:'100%',filter:'grayscale(1) sepia(.16)'}}/>
  </div>
  <div style={{position:'absolute',left:65,top:1510,fontSize:44,fontWeight:700,lineHeight:1.3,width:640}}>O mesmo movimento.<br/>Outro ritmo para olhar.</div>
  <div style={{position:'absolute',left:785,top:1480}}><Selo size={225}/></div>
 </AbsoluteFill>;
};
