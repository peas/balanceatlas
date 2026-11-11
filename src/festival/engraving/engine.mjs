/** Portable RGBA filter. No DOM, ML, network, random state or image generation.
 * Simplified DoG contours + tonal, screen-space hatching, NOT a full flow-XDoG implementation.
 * Alpha is preserved. Transparent pixels use paper luminance before convolution.
 * Settings are pixel-scale dependent: keep a fixed processing resolution for a series.
 */
export const presets = {
  mono: {mode:'mono',contrast:1.18,gamma:0.92,paper:[243,237,223],ink:[23,25,22]},
  ink: {mode:'ink',contrast:1.12,gamma:0.86,edge:1.4,spacing:5,paper:[243,237,223],ink:[23,25,22]},
  hatch: {mode:'hatch',contrast:1.1,gamma:0.9,edge:1.2,spacing:5,paper:[243,237,223],ink:[23,25,22]},
};
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
function blur(input,w,h,sigma){
  const r=Math.ceil(sigma*3), k=Array.from({length:r*2+1},(_,i)=>Math.exp(-((i-r)**2)/(2*sigma*sigma)));
  const sum=k.reduce((a,b)=>a+b,0); for(let j=0;j<k.length;j++)k[j]/=sum;
  const tmp=new Float32Array(w*h), out=new Float32Array(w*h);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    let v=0;for(let j=-r;j<=r;j++)v+=input[y*w+clamp(x+j,0,w-1)]*k[j+r];tmp[y*w+x]=v;
  }
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    let v=0;for(let j=-r;j<=r;j++)v+=tmp[clamp(y+j,0,h-1)*w+x]*k[j+r];out[y*w+x]=v;
  }return out;
}
export function engrave(rgba,w,h,options={}){
  if(!Number.isInteger(w)||!Number.isInteger(h)||w<1||h<1||rgba.length!==w*h*4)throw Error('Invalid RGBA dimensions');
  const p={...presets.hatch,hatching:1,color:0,angle:44,...options};
  if(!['mono','ink','hatch'].includes(p.mode))throw Error('Unknown mode');
  if(p.mode==='hatch'&&!(p.spacing>=2))throw Error('spacing must be >= 2 px');
  const angle=p.angle*Math.PI/180, ca=Math.cos(angle), sa=Math.sin(angle);
  const n=w*h,luma=new Float32Array(n),out=new Uint8ClampedArray(n*4);
  for(let i=0;i<n;i++){
    const a=rgba[i*4+3]/255;
    const y=(.2126*rgba[i*4]+.7152*rgba[i*4+1]+.0722*rgba[i*4+2])/255;
    luma[i]=a*Math.pow(clamp((y-.5)*p.contrast+.5),p.gamma)+(1-a);
  }
  const soft=p.mode==='mono'?luma:blur(luma,w,h,.8);
  const wide=p.mode==='mono'?luma:blur(luma,w,h,1.6);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const i=y*w+x,t=soft[i]; let value=t;
    if(p.mode!=='mono'){
      const contour=clamp((wide[i]-soft[i]-.006)*30*p.edge);
      const shadow=clamp((.22-t)/.16);
      if(p.mode==='ink') value=Math.min(1-contour,Math.round(t*4)/4);
      else {
        // Fixed gently curved strokes: stable seed in video, no per-frame random noise.
        const phase=(x*ca+y*sa+1.3*Math.sin(y*.025)+.8*Math.sin(x*.018))/p.spacing;
        const cross=(x*sa-y*ca+.7*Math.sin(y*.03))/(p.spacing*1.2);
        const line=(v,width)=>1-clamp((Math.abs((v-Math.floor(v))-.5)-width)*p.spacing*1.8);
        const hatch=line(phase,.055)*clamp((.88-t)*2.1);
        const hatch2=line(cross,.045)*clamp((.48-t)*3.2);
        const coverage=Math.max(contour,shadow, hatch*.83*p.hatching,hatch2*.8*p.hatching);
        value=clamp((1-coverage)*(0.88+.12*t));
      }
    }
    for(let c=0;c<3;c++){
      const base=p.ink[c]+(p.paper[c]-p.ink[c])*value;
      // Colour returns in the light areas; the ink stays visible over the footage.
      out[i*4+c]=base*(1-p.color*value)+rgba[i*4+c]*p.color*value;
    }
    out[i*4+3]=rgba[i*4+3];
  }return out;
}
