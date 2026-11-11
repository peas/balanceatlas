import assert from 'node:assert/strict';
import {engrave} from './engine.mjs';
import {engineSettings,looks,normalizeSettings,readSession,ENGINE_VERSION} from './settings.mjs';
const w=40,h=40,src=new Uint8ClampedArray(w*h*4);
for(let i=0;i<w*h;i++){src[i*4]=i%230;src[i*4+1]=130;src[i*4+2]=70;src[i*4+3]=(i*11)%256;}
for(const look of Object.values(looks)){
  const settings=engineSettings(look),out=engrave(src,w,h,settings);
  assert.deepEqual(out,engrave(src,w,h,settings));
  for(let i=0;i<w*h;i++)assert.equal(out[i*4+3],src[i*4+3]);
}
const p=engineSettings(looks.graphite),base=engrave(src,w,h,p);
for(const change of [{hatching:0},{contrast:1.8},{color:1},{spacing:12},{edge:0},{angle:110},{gamma:1.5}])assert.notDeepEqual(base,engrave(src,w,h,{...p,...change}),JSON.stringify(change));
const normalized=normalizeSettings({spacing:0,contrast:NaN,color:100,ink:'bad',paper:'#AABBCC'});
assert.equal(normalized.spacing,3);assert.equal(normalized.color,1);assert.equal(normalized.contrast,looks.graphite.contrast);assert.equal(normalized.ink,looks.graphite.ink);
const session={engine:ENGINE_VERSION,panels:[{clip:'mural-reta',settings:looks.graphite},{clip:'p-desce',settings:looks.green}]};
assert.deepEqual(readSession(JSON.parse(JSON.stringify(session))),session.panels);
assert.throws(()=>readSession({engine:'future',panels:[]}));assert.throws(()=>engrave(src,41,h));
console.log('PASS: deterministic pixels, unchanged alpha, all sliders change output, bounded imports and preset round trip.');
