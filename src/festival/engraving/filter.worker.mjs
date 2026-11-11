import {engrave} from './engine.mjs';
self.onmessage=({data:{rgba,width,height,settings,revision}})=>{
  try {
    const start=performance.now();
    const pixels=engrave(new Uint8ClampedArray(rgba),width,height,settings);
    self.postMessage({pixels,width,height,revision,ms:performance.now()-start},[pixels.buffer]);
  } catch(e) {self.postMessage({error:e.message});}
};
