export const ENGINE_VERSION = 'hf-hatch-1';
export const controls = [
  ['contrast', 'Contraste', .65, 1.8, .05],
  ['gamma', 'Tons médios', .5, 1.5, .05],
  ['hatching', 'Força da hachura', 0, 1.6, .05],
  ['spacing', 'Espaço entre traços', 3, 12, .5],
  ['edge', 'Contornos', 0, 2.5, .1],
  ['angle', 'Ângulo dos traços', 0, 180, 1],
  ['color', 'Cor da filmagem', 0, 1, .05],
];
export const looks = {
  graphite: {name:'Grafite no papel',contrast:1.1,gamma:.85,hatching:.85,spacing:5,edge:1.2,angle:44,color:0,ink:'#191d19',paper:'#f3eddf'},
  green: {name:'Verde & cor',contrast:1.05,gamma:.8,hatching:.8,spacing:6,edge:1.1,angle:40,color:.55,ink:'#183e32',paper:'#f3eddf'},
  ochre: {name:'Tinta ocre',contrast:1.15,gamma:.85,hatching:1.1,spacing:5,edge:1.4,angle:60,color:0,ink:'#8c5724',paper:'#f3eddf'},
};
export const clips = [
  {id:'mural-reta',name:'Paulo · equilíbrio de perfil',detail:'13,6 s · sustentação e saída · recorte já usado no Instagram'},
  {id:'p-desce',name:'Paulo · descida em straddle',detail:'6,6 s · Paulo à frente, Gabriel ao fundo'},
  {id:'j-press',name:'Paulo e Gabriel · subida em press',detail:'5,4 s · mesmo treino no palco'},
];
export function normalizeSettings(input={}) {
  const out={...looks.graphite};
  for(const [key,,min,max] of controls) {
    const val=input[key];
    if(typeof val==='number' && Number.isFinite(val)) out[key]=Math.max(min,Math.min(max,val));
  }
  for(const key of ['ink','paper']) if(/^#[a-f\d]{6}$/i.test(input[key]??'')) out[key]=input[key];
  if(typeof input.name==='string') out.name=input.name.slice(0,60);
  return out;
}
export function engineSettings(settings) {
  const out=normalizeSettings(settings);
  for(const key of ['ink','paper']) out[key]=out[key].slice(1).match(/../g).map(x=>parseInt(x,16));
  return {...out,mode:'hatch'};
}
export function readSession(data) {
  if((data?.processingWidth!==undefined && data.processingWidth!==480) || data?.engine!==ENGINE_VERSION || !Array.isArray(data.panels) || data.panels.length!==2) throw Error('Arquivo de ajustes incompatível.');
  return data.panels.map((p,i)=>({clip:clips.some(c=>c.id===p.clip)?p.clip:clips[i].id,settings:normalizeSettings(p.settings)}));
}
