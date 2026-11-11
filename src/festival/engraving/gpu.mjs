/** GPU approximation of engine.mjs: same kernels and strokes; intermediate RGBA8 rounds blur values.
 * Canonical processing width remains 480px. Remotion uses the CPU reference for deterministic export.
 */
const vertex=`attribute vec2 position; varying vec2 uv; void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
const common=`precision highp float;varying vec2 uv;uniform sampler2D source;uniform vec2 size;uniform float contrast,gamma;float lum(vec3 c){return pow(clamp((dot(c,vec3(.2126,.7152,.0722))-.5)*contrast+.5,0.,1.),gamma);}`;
const weights=sigma=>{const r=Math.ceil(3*sigma);const k=Array.from({length:2*r+1},(_,i)=>Math.exp(-((i-r)**2)/(2*sigma*sigma)));const sum=k.reduce((a,b)=>a+b,0);return k.map(n=>n/sum);};
const soft=weights(.8),wide=weights(1.6);
const num=n=>n.toFixed(9);
const horizontal=common+`void main(){float a=0.,b=0.;`+wide.map((v,i)=>{const d=i-5;return `{float l=lum(texture2D(source,uv+vec2(${d.toFixed(1)}/size.x,0.)).rgb);b+=l*${num(v)};${Math.abs(d)<=3?`a+=l*${num(soft[d+3])};`:''}}`;}).join('')+`gl_FragColor=vec4(a,b,0.,1.);}`;
const final=common+`uniform sampler2D blurred;uniform float edge,spacing,hatching,angle,color;uniform vec3 ink,paper;
float line(float v,float w){return 1.-clamp((abs(fract(v)-.5)-w)*spacing*1.8,0.,1.);}
void main(){float a=0.,b=0.;`+wide.map((v,i)=>{const d=i-5;return `{vec2 l=texture2D(blurred,uv+vec2(0.,${d.toFixed(1)}/size.y)).rg;b+=l.g*${num(v)};${Math.abs(d)<=3?`a+=l.r*${num(soft[d+3])};`:''}}`;}).join('')+`
vec2 p=vec2(gl_FragCoord.x-.5,size.y-gl_FragCoord.y-.5);float ca=cos(angle),sa=sin(angle);
float phase=(p.x*ca+p.y*sa+1.3*sin(p.y*.025)+.8*sin(p.x*.018))/spacing;
float cross=(p.x*sa-p.y*ca+.7*sin(p.y*.03))/(spacing*1.2);
float hatch=line(phase,.055)*clamp((.88-a)*2.1,0.,1.)*.83*hatching;
float hatch2=line(cross,.045)*clamp((.48-a)*3.2,0.,1.)*.8*hatching;
float contour=clamp((b-a-.006)*30.*edge,0.,1.);float shadow=clamp((.22-a)/.16,0.,1.);
float value=clamp((1.-max(max(contour,shadow),max(hatch,hatch2)))*(.88+.12*a),0.,1.);
vec3 base=mix(ink,paper,value);gl_FragColor=vec4(mix(base,texture2D(source,uv).rgb,color*value),1.);}`;
export function createGpuFilter(canvas){
  const gl=canvas.getContext('webgl',{alpha:false,antialias:false,preserveDrawingBuffer:true});
  if(!gl)throw Error('WebGL indisponível');
  const shader=(type,code)=>{const s=gl.createShader(type);gl.shaderSource(s,code);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
  const program=code=>{const p=gl.createProgram();const vs=shader(gl.VERTEX_SHADER,vertex),fs=shader(gl.FRAGMENT_SHADER,code);gl.attachShader(p,vs);gl.attachShader(p,fs);gl.linkProgram(p);gl.deleteShader(vs);gl.deleteShader(fs);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));return p;};
  const first=program(horizontal),second=program(final),buffer=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const texture=()=>{const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return t;};
  const source=texture(),blurred=texture(),framebuffer=gl.createFramebuffer();let width=0,height=0;
  const setup=(p,s)=>{gl.useProgram(p);const pos=gl.getAttribLocation(p,'position');gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);gl.uniform2f(gl.getUniformLocation(p,'size'),width,height);gl.uniform1i(gl.getUniformLocation(p,'source'),0);for(const key of ['contrast','gamma','edge','spacing','hatching','angle','color'])gl.uniform1f(gl.getUniformLocation(p,key),key==='angle'?s[key]*Math.PI/180:s[key]);for(const key of ['ink','paper'])gl.uniform3fv(gl.getUniformLocation(p,key),s[key].map(n=>n/255));};
  return {
    draw(video,s){
      if(gl.isContextLost())throw Error('GPU desconectada. Recarregue a página.');
      if(width!==canvas.width||height!==canvas.height){width=canvas.width;height=canvas.height;gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,blurred);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,width,height,0,gl.RGBA,gl.UNSIGNED_BYTE,null);gl.bindFramebuffer(gl.FRAMEBUFFER,framebuffer);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,blurred,0);if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('Buffer da GPU indisponível');}
      gl.viewport(0,0,width,height);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,source);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video);
      gl.bindFramebuffer(gl.FRAMEBUFFER,framebuffer);setup(first,s);gl.drawArrays(gl.TRIANGLES,0,6);
      gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,blurred);setup(second,s);gl.uniform1i(gl.getUniformLocation(second,'blurred'),1);gl.drawArrays(gl.TRIANGLES,0,6);
    },
    dispose(){for(const p of [first,second])gl.deleteProgram(p);for(const t of [source,blurred])gl.deleteTexture(t);gl.deleteBuffer(buffer);gl.deleteFramebuffer(framebuffer);}
  };
}
