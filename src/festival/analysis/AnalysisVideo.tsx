import React,{useEffect,useState} from 'react';
import {AbsoluteFill,OffthreadVideo,useCurrentFrame,useVideoConfig,staticFile,delayRender,continueRender,cancelRender} from 'remotion';
import {angle,connections,poseAt} from './geometry.mjs';
export type AnalysisProps={video:string;pose:string;side?:'left'|'right';overlay?:boolean;crop?:{x:number;y:number;w:number;h:number};duration?:number};
export default function AnalysisVideo({video,pose,side='left',overlay=true,crop={x:150,y:400,w:420,h:700}}:AnalysisProps){
 const frame=useCurrentFrame(),{fps}=useVideoConfig();const [data,setData]=useState<any>(null);
 const [handle]=useState(()=>delayRender('Load measured pose'));
 useEffect(()=>{fetch(pose).then(r=>{if(!r.ok)throw Error('Pose unavailable');return r.json();}).then(d=>{setData(d);continueRender(handle);}).catch(cancelRender);},[pose,handle]);
 const t=frame/fps,p=data?poseAt(data,t):null;
 const [wrist,elbow,shoulder,hip,knee,ankle]=side==='left'?[15,13,11,23,25,27]:[16,14,12,24,26,28];
 const metrics=[['OMBRO',wrist,shoulder,hip],['QUADRIL',shoulder,hip,knee],['COTOVELO',wrist,elbow,shoulder]] as const;
 const ink='#d9ab5b',green='#123e33';
 // One fixed contain transform for both footage and landmarks; no tracking crop.

 const box={x:90,y:170,w:900,h:1500};
 const sx=box.w/crop.w,sy=box.h/crop.h;
 const X=(i:number)=>box.x+(p[i][0]*720-crop.x)*sx;
 const Y=(i:number)=>box.y+(p[i][1]*1280-crop.y)*sy;
 return <AbsoluteFill style={{background:green,color:'#f4eedf',fontFamily:'Arial,sans-serif'}}>
 <div style={{position:'absolute',left:box.x,top:box.y,width:box.w,height:box.h,overflow:'hidden'}}><OffthreadVideo src={video} muted style={{position:'absolute',left:-crop.x*sx,top:-crop.y*sy,width:720*sx,height:1280*sy}}/></div>
 <div style={{position:'absolute',left:60,top:32,fontSize:28,letterSpacing:3,color:ink}}>HANDSTAND LIFE · ESTUDO DO MOVIMENTO</div>
 <div style={{position:'absolute',left:60,top:77,fontSize:48,fontWeight:800}}>PARADA NÃO É IMOBILIDADE.</div>
 {overlay&&p&&<svg width={1080} height={1920} style={{position:'absolute',inset:0}}>
 {p[wrist][3]>.65&&<line x1={X(wrist)} x2={X(wrist)} y1={box.y} y2={box.y+box.h} stroke="white" opacity={.5} strokeDasharray="12 12" strokeWidth={3}/>}
 {connections.map(([a,b])=>p[a][3]>.65&&p[b][3]>.65?<line key={`${a}-${b}`} x1={X(a)} y1={Y(a)} x2={X(b)} y2={Y(b)} stroke={ink} strokeWidth={5} opacity={.85}/>:null)}
 {[wrist,elbow,shoulder,hip,knee,ankle].map(i=>p[i][3]>.65?<circle key={i} cx={X(i)} cy={Y(i)} r={8} fill={ink} stroke={green} strokeWidth={3}/>:null)}
 </svg>}
 <div style={{position:'absolute',top:180,left:105,background:green,padding:'8px 14px',fontSize:30,fontVariantNumeric:'tabular-nums'}}>{t.toFixed(1)} s</div>
 <div style={{position:'absolute',left:60,right:60,bottom:60,display:'flex',justifyContent:'space-between'}}>{metrics.map(([name,a,b,c])=>{const n=data?angle(p,a,b,c,data.w,data.h):null;return <div key={name}><div style={{fontSize:23,color:ink}}>{name}</div><div style={{fontSize:48,fontWeight:700}}>{n===null?'—':`${Math.round(n)}°`}</div></div>;})}</div>
 <div style={{position:'absolute',bottom:18,left:60,fontSize:22}}>Estimativas 2D · sem nota de execução · linha vertical da imagem</div>
 </AbsoluteFill>;
}
