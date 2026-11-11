import {clips,looks,controls,normalizeSettings,engineSettings,ENGINE_VERSION,readSession} from './settings.mjs';
import {createGpuFilter} from './gpu.mjs';
const STORE='hf-engraving-lab-v1';
const saveFile=(blob,name)=>{const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
export function initLab(){
  const notice=document.querySelector('#notice');
  const say=text=>notice.textContent=text;
  const initial=[{clip:clips[0].id,settings:{...looks.graphite}},{clip:clips[1].id,settings:{...looks.green}}];
  let saved=initial;
  try{const raw=localStorage.getItem(STORE);if(raw)saved=readSession(JSON.parse(raw));}catch{say('Não foi possível recuperar os ajustes anteriores.');}
  const panels=[];
  const serialize=()=>({engine:ENGINE_VERSION,processingWidth:480,panels:panels.map(p=>({clip:p.clip,settings:p.settings}))});
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(serialize()));say('Ajustes salvos neste navegador.');}catch{say('Armazenamento indisponível. Use Baixar ajustes.');}}
  for(const [i,el] of [...document.querySelectorAll('[data-panel]')].entries()){
    const video=el.querySelector('video'),canvas=el.querySelector('canvas'),screen=el.querySelector('.screen'),status=el.querySelector('.status');
    let gpu=null,ctx=null;
    try{gpu=createGpuFilter(canvas);}catch{canvas.replaceWith(canvas.cloneNode());}
    // A failed WebGL canvas cannot become 2D: use a fresh element for the fallback.
    const output=el.querySelector('canvas');
    if(!gpu)ctx=output.getContext('2d');
    const source=document.createElement('canvas'),sourceCtx=source.getContext('2d',{willReadFrequently:true});
    const worker=new Worker(new URL('./filter.worker.mjs',import.meta.url),{type:'module'});
    const panel={clip:saved[i].clip,settings:saved[i].settings,video,el,dirty:true,busy:false,revision:0,ready:false,wantsPlay:!matchMedia('(prefers-reduced-motion: reduce)').matches,failed:false};
    panels.push(panel);
    const playButton=el.querySelector('.pause');
    const updatePlay=()=>{playButton.textContent=video.paused?'Reproduzir':'Pausar';};
    panel.play=async()=>{try{await video.play();}catch{status.textContent='Clique em Reproduzir para iniciar.';}updatePlay();};
    panel.refresh=()=>{
      for(const input of el.querySelectorAll('[data-key]'))input.value=panel.settings[input.dataset.key];
      for(const [key] of controls)el.querySelector(`[data-output="${key}"]`).textContent=Number(panel.settings[key]).toFixed(key==='angle'?0:2);
      el.querySelector('h2').textContent=panel.settings.name;
      panel.dirty=true;panel.revision++;
    };
    panel.setClip=id=>{
      panel.clip=id;panel.ready=false;panel.revision++;screen.classList.remove('ready');
      el.querySelector('.clip').value=id;
      const selected=clips.find(c=>c.id===id);
      el.querySelector('.source-note').textContent=selected.detail;video.setAttribute('aria-label',selected.name);
      video.src=`/festival/ig/${id}.mp4`;video.load();status.textContent='Carregando vídeo…';
    };
    video.addEventListener('loadeddata',()=>{
      source.width=output.width=480;source.height=output.height=Math.round(480*video.videoHeight/video.videoWidth);
      panel.ready=true;panel.dirty=true;if(panel.wantsPlay&&!document.hidden)panel.play();else updatePlay();
    });
    video.addEventListener('error',()=>{panel.ready=false;status.textContent='Não foi possível carregar o vídeo. Escolha outro trecho.';});
    video.addEventListener('play',updatePlay);video.addEventListener('pause',updatePlay);
    let lastTime=-1,raf=0,lastStat=0,count=0,statStart=performance.now(),lastInputTime=0;
    worker.onmessage=({data})=>{
      panel.busy=false;if(data.error){panel.failed=true;status.textContent='Filtro indisponível: '+data.error;return;}
      if(data.revision!==panel.revision)return;
      ctx.putImageData(new ImageData(data.pixels,data.width,data.height),0,0);screen.classList.add('ready');
      count++;const now=performance.now();
      if(now-lastStat>1000){status.textContent=`${Math.round(count*1000/(now-statStart))} quadros filtrados/s · ${data.width} × ${data.height} · sem áudio`;count=0;statStart=lastStat=now;}
    };
    worker.onerror=()=>{panel.failed=true;panel.busy=false;screen.classList.remove('ready');status.textContent='O filtro não iniciou. Exibindo o vídeo original.';};
    function tick(now){
      raf=requestAnimationFrame(tick);
      if(document.hidden||panel.failed||!panel.ready||panel.busy||video.readyState<2||now-lastInputTime<32)return;
      if(!panel.dirty&&video.currentTime===lastTime)return;
      panel.dirty=false;lastTime=video.currentTime;lastInputTime=now;
      if(gpu){
        try{
          gpu.draw(video,engineSettings(panel.settings));screen.classList.add('ready');count++;
          if(now-lastStat>1000){status.textContent=`${Math.round(count*1000/(now-statStart))} quadros filtrados/s · GPU · sem áudio`;count=0;statStart=lastStat=now;}
        }catch(error){panel.failed=true;screen.classList.remove('ready');status.textContent=error.message+' Exibindo original.';}
        return;
      }
      sourceCtx.drawImage(video,0,0,source.width,source.height);
      const pixels=sourceCtx.getImageData(0,0,source.width,source.height).data;
      panel.busy=true;worker.postMessage({rgba:pixels.buffer,width:source.width,height:source.height,settings:engineSettings(panel.settings),revision:panel.revision},[pixels.buffer]);
    }
    raf=requestAnimationFrame(tick);
    panel.dispose=()=>{cancelAnimationFrame(raf);worker.terminate();gpu?.dispose();video.pause();};
    playButton.addEventListener('click',()=>{panel.wantsPlay=video.paused;if(panel.wantsPlay)panel.play();else video.pause();});
    const original=el.querySelector('.original');
    original.addEventListener('click',()=>{const show=original.getAttribute('aria-pressed')!=='true';original.setAttribute('aria-pressed',String(show));screen.classList.toggle('original',show);screen.querySelector('.badge').textContent=show?'ORIGINAL':'HACHURA CONTÍNUA';original.textContent=show?'Ver hachura':'Ver original';});
    el.querySelector('.clip').addEventListener('change',e=>{panel.setClip(e.target.value);persist();});
    el.querySelector('.look').addEventListener('change',e=>{panel.settings={...looks[e.target.value]};panel.refresh();persist();});
    for(const input of el.querySelectorAll('[data-key]'))input.addEventListener('input',()=>{
      panel.settings=normalizeSettings({...panel.settings,[input.dataset.key]:input.type==='color'?input.value:Number(input.value)});panel.refresh();persist();
    });
    el.querySelector('.reset').addEventListener('click',()=>{panel.settings={...initial[i].settings};el.querySelector('.look').value=i?'green':'graphite';panel.refresh();persist();});
    el.querySelector('.copy').addEventListener('click',()=>{const other=panels[1-i];other.settings={...panel.settings};other.refresh();persist();});
    el.querySelector('.still').addEventListener('click',()=>{
      if(!screen.classList.contains('ready')){say('Espere o primeiro quadro filtrado.');return;}
      output.toBlob(blob=>{if(blob)saveFile(blob,`hf-${panel.clip}-estudo-${i?'b':'a'}.png`);},'image/png');
    });
    panel.refresh();panel.setClip(panel.clip);
  }
  document.querySelector('#toggle-all').addEventListener('click',e=>{
    const play=panels.every(p=>p.video.paused);
    for(const p of panels){p.wantsPlay=play;if(play)p.play();else p.video.pause();}
    e.target.textContent=play?'Pausar os dois':'Reproduzir os dois';
  });
  document.querySelector('#download').addEventListener('click',()=>saveFile(new Blob([JSON.stringify(serialize(),null,2)],{type:'application/json'}),'handstand-life-hachura.json'));
  document.querySelector('#import').addEventListener('change',async e=>{
    try{const file=e.target.files[0];if(!file)return;const data=readSession(JSON.parse(await file.text()));for(const [i,p] of panels.entries()){p.settings=data[i].settings;p.refresh();p.setClip(data[i].clip);}persist();say('Dois estudos recuperados.');}catch(error){say(error.message);}finally{e.target.value='';}
  });
  document.addEventListener('visibilitychange',()=>{for(const p of panels){if(document.hidden)p.video.pause();else if(p.wantsPlay)p.play();}});
  window.addEventListener('pagehide',event=>{if(!event.persisted)panels.forEach(p=>p.dispose());});
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelector('#toggle-all').textContent='Reproduzir os dois';say('Movimento reduzido: clique para reproduzir.');}
}
