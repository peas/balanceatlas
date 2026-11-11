import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArtStories, STORIES, STORY_STEP, storyDuration, type StoryMode } from './ArtStories';
import './art-stories.css';

export default function ArtStoryPlayer({mode='event'}:{mode?:StoryMode}) {
  const player=useRef<PlayerRef>(null), box=useRef<HTMLDivElement>(null);
  const manualPause=useRef(false), visible=useRef(false), reduced=useRef(true);
  const [playing,setPlaying]=useState(false), [frame,setFrame]=useState(0), [ready,setReady]=useState(false);
  const input=useMemo(()=>({mode}),[mode]);
  const duration=storyDuration(mode), items=STORIES[mode], active=Math.min(items.length-1,Math.floor(frame/STORY_STEP));
  useEffect(()=>{
    let alive=true;
    document.fonts.ready.then(()=>{if(alive)setReady(true)});
    return()=>{alive=false};
  },[]);
  useEffect(()=>{
    if(!ready||!box.current||!player.current)return;
    const p=player.current, motion=matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>{
      reduced.current=motion.matches;
      if(visible.current&&!document.hidden&&!manualPause.current&&!reduced.current)p.play();else p.pause();
    };
    const observer=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting&&entry.intersectionRatio>=.25;update()},{threshold:.25});
    observer.observe(box.current);
    const onFrame=(e:{detail:{frame:number}})=>{if(e.detail.frame%3===0)setFrame(e.detail.frame)};
    const onPlay=()=>setPlaying(true), onPause=()=>setPlaying(false);
    p.addEventListener('frameupdate',onFrame);p.addEventListener('play',onPlay);p.addEventListener('pause',onPause);
    motion.addEventListener('change',update);document.addEventListener('visibilitychange',update);update();
    return()=>{observer.disconnect();p.removeEventListener('frameupdate',onFrame);p.removeEventListener('play',onPlay);p.removeEventListener('pause',onPause);motion.removeEventListener('change',update);document.removeEventListener('visibilitychange',update)};
  },[ready]);
  function toggle(){if(playing){manualPause.current=true;player.current?.pause()}else{manualPause.current=false;player.current?.play()}}
  function seek(index:number){player.current?.seekTo(((index+items.length)%items.length)*STORY_STEP);setFrame(((index+items.length)%items.length)*STORY_STEP)}
  return <div className="art-stories" ref={box} aria-label={mode==='event'?'Stories sobre o festival':'Stories dos professores'}>
    <div className="art-story-progress" aria-label="Escolher story">{items.map((item,i)=><button key={item.label} onClick={()=>seek(i)} aria-label={`Ver story: ${item.label}`} aria-current={i===active?'step':undefined}><span style={{width:`${Math.max(0,Math.min(1,(frame-i*STORY_STEP)/STORY_STEP))*100}%`}}/></button>)}</div>
    <div className="art-story-screen">{ready?<Player ref={player} component={ArtStories} inputProps={input} durationInFrames={duration} fps={30} compositionWidth={720} compositionHeight={900} loop initiallyMuted controls={false} clickToPlay={false} acknowledgeRemotionLicense style={{width:'100%',height:'100%'}}/>:<img src="/festival/teacher.webp" alt="Parada de mão"/>}</div>
    <div className="art-story-controls"><button onClick={()=>seek(active-1)} aria-label="Story anterior">←</button><button onClick={toggle} disabled={!ready} aria-label={playing?'Pausar stories':'Reproduzir stories'}>{playing?'Pausar':'Reproduzir'}</button><span>{active+1} / {items.length}</span><button onClick={()=>seek(active+1)} aria-label="Próximo story">→</button></div>
  </div>;
}
