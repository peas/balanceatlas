// Adapted from paulo.com.br-render/src/motor/pose.ts (25 Nov 2026).
export const connections=[[11,12],[11,13],[13,15],[12,14],[14,16],[11,23],[12,24],[23,24],[23,25],[25,27],[24,26],[26,28],[27,31],[28,32]];
export function angle(p,a,b,c,w,h,minVisibility=.65){
 if(!p||[a,b,c].some(i=>!p[i]||p[i][3]<minVisibility))return null;
 const u=[(p[a][0]-p[b][0])*w,(p[a][1]-p[b][1])*h],v=[(p[c][0]-p[b][0])*w,(p[c][1]-p[b][1])*h];
 const den=Math.hypot(...u)*Math.hypot(...v);if(den<1e-6)return null;
 return Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/den)))*180/Math.PI;
}
export function poseAt(data,t){
 const q=data.quadros;if(!q.length||t<q[0].t||t>q[q.length-1].t+.1)return null;
 let lo=0,hi=q.length-1;while(lo<hi){const m=(lo+hi+1)>>1;if(q[m].t<=t)lo=m;else hi=m-1;}
 const a=q[lo],b=q[Math.min(lo+1,q.length-1)];
 if(!a.pose||!b.pose||t-a.t>.15||b.t-a.t>.2)return null;
 const k=b.t===a.t?0:(t-a.t)/(b.t-a.t);
 return a.pose.map((p,i)=>[p[0]+(b.pose[i][0]-p[0])*k,p[1]+(b.pose[i][1]-p[1])*k,p[2],Math.min(p[3],b.pose[i][3])]);
}
