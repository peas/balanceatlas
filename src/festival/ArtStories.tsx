import { AbsoluteFill, Freeze, Html5Video, Img, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { BrushStroke } from './Brush';
import { Selo, WIDE, MONO } from './ig/kit';
import { QUANDO } from './data';
import { lineup } from './home-content';

export type StoryMode = 'event' | 'teachers';
type Story = { label:string; title:string[]; note:string; src:string; photo?:boolean; freeze?:boolean; dark?:boolean };
export const STORY_LENGTH = 180;
export const STORY_STEP = 168;
export const STORIES:Record<StoryMode,Story[]> = {
  event:[
    {label:'O encontro',title:['3 DIAS.', 'UM ENCONTRO.'],note:QUANDO.toUpperCase()+' · SÃO PAULO',src:'/festival/seg-1.mp4',freeze:true},
    {label:'O professor',title:['GABRIEL', 'AGUSTIN.'],note:'PROFESSOR · PARADA DE MÃOS',src:'/festival/teacher.mp4',freeze:true,dark:true},
    {label:'A prática',title:['DO BÁSICO', 'AO AVANÇADO.'],note:'PARADA DE MÃO NA SUA TURMA',src:'/festival/ig/ig2-formas.mp4'},
    {label:'O lugar',title:['TRAPÉZIO', 'VOADOR.'],note:'BUTANTÃ · SÃO PAULO',src:'/festival/ig/tour-vidro.mp4',dark:true},
  ],
  teachers:[
    ...lineup.map((t,i)=>({label:`${t.poster.first} ${t.poster.last}`.trim(),title:[t.poster.first.toUpperCase(),t.poster.last.toUpperCase()].filter(Boolean),note:t.poster.handle,src:t.teacher?'/festival/teacher.mp4':t.poster.img!,photo:!t.teacher,freeze:!!t.teacher,dark:i%2===0})),
  ],
};
export const storyDuration = (mode:StoryMode) => (STORIES[mode].length-1)*STORY_STEP+STORY_LENGTH;
const ease=(frame:number,start:number,end:number)=>interpolate(frame,[start,end],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});

function StoryScene({story,first}:{story:Story;first:boolean}) {
  const frame=useCurrentFrame(), freezeAt=120;
  const paint=story.freeze?ease(frame,freezeAt+5,freezeAt+35):ease(frame,8,36);
  const gray=story.freeze?ease(frame,freezeAt,freezeAt+15):story.photo?1:0;
  const ink=story.dark?'#f3eddf':'#123d33', color=story.dark?'#dfab5b':'#cb8b34';
  return <AbsoluteFill style={{background:story.dark?'#123d33':'#f3eddf',color:ink,opacity:first?1:ease(frame,0,12),overflow:'hidden'}}>
    <div style={{position:'absolute',left:38,top:40,...WIDE,fontSize:50,lineHeight:1.02,letterSpacing:-1.8}}>{story.title.map(t=><div key={t}>{t}</div>)}</div>
    <div style={{position:'absolute',left:38,top:185,width:644,height:580}}>
      <BrushStroke color={color} style={{position:'absolute',inset:'-10px -13px',width:670,height:600,transform:'rotate(-2deg)',clipPath:`inset(0 ${(1-paint)*100}% 0 0)`}}/>
      <div style={{position:'absolute',inset:0,background:story.dark?'#123d33':'#f3eddf',filter:`grayscale(${gray})`}}>
        {story.photo?<Img src={story.src} style={{width:'100%',height:'100%',objectFit:'contain'}}/>:<Freeze active={!!story.freeze&&frame>=freezeAt} frame={freezeAt}><Html5Video src={story.src} muted loop pauseWhenBuffering style={{width:'100%',height:'100%',objectFit:'contain'}}/></Freeze>}
      </div>
    </div>
    <div style={{position:'absolute',left:38,top:800,width:560,font: `700 23px/1.4 ${MONO}`}}>
      <BrushStroke color={color} style={{position:'absolute',left:-8,top:-5,width:565,height:47,clipPath:`inset(0 ${(1-paint)*100}% 0 0)`}}/>
      <span style={{position:'relative'}}>{story.note}</span><span aria-hidden style={{position:'absolute',inset:0,color:'#123d33',clipPath:`inset(0 ${(1-paint)*100}% 0 0)`}}>{story.note}</span>
    </div>
    {story.freeze&&frame>=freezeAt&&<Sequence from={freezeAt} layout="none"><div style={{position:'absolute',right:25,top:70,'--accent':color,'--stage':story.dark?'#123d33':'#123d33'} as React.CSSProperties}><Selo size={88}/></div></Sequence>}
  </AbsoluteFill>;
}

export function ArtStories({mode='event'}:{mode?:StoryMode}) {
  return <AbsoluteFill>{STORIES[mode].map((story,i)=><Sequence key={story.label} from={i*STORY_STEP} durationInFrames={STORY_LENGTH}><StoryScene story={story} first={i===0}/></Sequence>)}</AbsoluteFill>;
}
