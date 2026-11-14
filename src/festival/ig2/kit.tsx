// Shared approved Instagram language: large media, ochre gesture, clear HF signature.
import type { CSSProperties, ReactNode } from 'react';
import { AbsoluteFill, Easing, Freeze, Html5Video, OffthreadVideo, Img, interpolate, useCurrentFrame, getRemotionEnvironment, staticFile } from 'remotion';
import { ACCENT, CHALK, INK, MONO, STAGE, WIDE, LOOK, Quadro, Selo, f, type Formato, type Look } from '../ig/kit';
import { BrushStroke } from '../Brush';
import { QUANDO } from '../data';
export { ACCENT, CHALK, INK, MONO, STAGE, WIDE, f };
export type Treatment = 'direction' | Look;
export type Palette = 'original' | 'ocre';
export type PieceProps = { guides?: boolean; treatment?: Treatment; palette?: Palette };
export const OCHRE_TOKENS = { '--accent': '#cb8b34', '--accent-ink': '#22332a', '--stage': '#123d33', '--white': '#f3eddf', '--paper': '#f3eddf', '--ig2-art-paint': '#cb8b34' } as CSSProperties;
export const move = (frame: number, start = 0, length = 18) => interpolate(frame, [start, start + length], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

export function Canvas({ children, guides, format = 'reel', dark = false, palette = 'ocre', signature = format !== 'card' }: PieceProps & { children: ReactNode; format?: Formato; dark?: boolean; signature?: boolean }) {
  return <Quadro formato={format} guides={guides} grain={false}><AbsoluteFill data-ig2-canvas style={{ ...(palette === 'ocre' ? {...OCHRE_TOKENS, '--accent': dark ? '#dfab5b' : '#cb8b34', '--ig2-art-paint': dark ? '#dfab5b' : '#cb8b34'} : {'--accent':'#ffd23f','--stage':'#0f3d33','--white':'#f6f1e4','--ig2-art-paint':'#ffd23f'}), background: dark ? STAGE : CHALK, color: dark ? CHALK : STAGE }}>{children}{signature && <BrandSeal y={format === 'card' ? 1160 : format === 'story' ? 1450 : 1410} />}</AbsoluteFill></Quadro>;
}
/** One restrained ochre mark for the technical term, not italics or an extra badge. */
export function TermHighlight({text}:{text:string}) {
 const match=/\b(straddle|balancing|pancake|one arm|tuck|pike|press|flow|drills?)\b/i.exec(text);
 if(!match)return <>{text}</>;
 const i=match.index;
 return <>{text.slice(0,i)}<span data-term-highlight style={{background:'linear-gradient(transparent 80%, #cb8b34 80%, #cb8b34 94%, transparent 94%)',paddingBottom:'.04em'}}>{match[0]}</span>{text.slice(i+match[0].length)}</>;
}
export function Label({ children, x = 65, y, color = STAGE, size = 48, style }: { children: ReactNode; x?: number; y: number; color?: string; size?: number; style?: CSSProperties }) {
  return <div data-ig2-text style={{ position: 'absolute', left: x, top: y, color, fontFamily: MONO, fontSize: size, lineHeight: 1.4, fontWeight: 700, ...style }}>{typeof children==='string'?<TermHighlight text={children}/>:children}</div>;
}
// The letters are visible from frame zero. Only the stroke reveals; one gesture per scene.
export function Headline({ lines, x = 65, y = 290, size = 80, accentLine = 0, dark = false, width = 885 }: { lines: string[]; x?: number; y?: number; size?: number; accentLine?: number; dark?: boolean; width?: number }) {
  const frame = useCurrentFrame();
  return <div style={{ position: 'absolute', left: x, top: y, width, ...WIDE, fontSize: size, lineHeight: 1.02, letterSpacing: '-.035em', textTransform: 'uppercase', color: dark ? CHALK : STAGE }}>
    {lines.map((line, i) => <div key={i} style={{ position: 'relative', width: 'fit-content', maxWidth: '100%', whiteSpace: 'nowrap', padding: '4px 0' }}>
      {i === accentLine && <BrushStroke color={ACCENT} style={{ position: 'absolute', left: -15, top: -4, width: 'calc(100% + 30px)', height: 'calc(100% + 10px)', clipPath: `inset(0 ${(1 - move(frame, 5, 18)) * 100}% 0 0)` }} />}
      <span data-ig2-text style={{ position: 'relative', display:'inline-block', color: i === accentLine && !dark ? STAGE : undefined }}>{i===accentLine?line:<TermHighlight text={line}/ >}{i === accentLine && dark && <span aria-hidden style={{position:'absolute',inset:0,color:STAGE,clipPath:`inset(0 ${(1-move(frame,5,18))*100}% 0 0)`}}>{line}</span>}</span>
    </div>)}
  </div>;
}
// Explicit windows, not the old full-canvas Clip: crop/contain choices are scene-specific.
export function Media({ src, photo = false, x = 65, y = 600, w = 885, h = 950, from = 0, treatment = 'direction', look = 'cor', contain = false }: {
  src: string; photo?: boolean; x?: number; y?: number; w?: number; h?: number; from?: number; treatment?: Treatment; look?: Look; contain?: boolean;
}) {
  const path = `/festival/ig/${src}${photo ? '' : '.mp4'}`;
  const mediaUrl = getRemotionEnvironment().isPlayer ? path : staticFile(path);
  const filter = LOOK[treatment === 'direction' ? look : treatment];
  const style: CSSProperties = { width: '100%', height: '100%', objectFit: contain ? 'contain' : 'cover', objectPosition: '50% 50%', filter };
  return <div data-ig2-media style={{ position: 'absolute', left: x, top: y, width: w, height: h, overflow: 'hidden', background: contain ? 'transparent' : STAGE }}>
    {photo ? <Img src={mediaUrl} alt="" style={style} /> : <Html5Video src={mediaUrl} trimBefore={f(from)} muted pauseWhenBuffering style={style} />}
  </div>;
}
export function Facts({ y = 505, dark = false }: { y?: number; dark?: boolean }) {
  return <Label y={y} size={48} color={dark ? CHALK : STAGE}>{QUANDO.toUpperCase()} · SÃO PAULO</Label>;
}
export function EndCard({ guides, format = 'reel', palette, cta = 'Vem junto.' }: PieceProps & { format?: Formato; cta?: string }) {
  const card = format === 'card';
  const frame = useCurrentFrame();
  return <Canvas guides={guides} palette={palette} format={format} dark signature={false}>
    <div style={{ position: 'absolute', left: 340, top: card ? 100 : 275, transform: `rotate(${interpolate(move(frame, 0, 26), [0, 1], [-12, 0])}deg)` }}><Selo size={340} giro={24} /></div>
    <Headline lines={['HANDSTAND', 'FEST']} y={card ? 510 : 720} size={97} dark />
    <Label y={card ? 775 : 990} size={48} color={ACCENT}>{QUANDO.toUpperCase()}</Label>
    <Label y={card ? 850 : 1065} size={48} color={CHALK}>TRAPÉZIO VOADOR<br />SÃO PAULO</Label>
    <Label y={card ? 1070 : 1240} size={48} color={CHALK} style={{ borderTop: `3px solid ${ACCENT}`, width: 885, paddingTop: 28 }}>{cta}</Label>
  </Canvas>;
}

/** One recognizable seal, sized for phone reading. Never automatically stamp carousel interiors. */
export function BrandSeal({x=770,y=1410,size=220,still=false}:{x?:number;y?:number;size?:number;still?:boolean}) {
 const seal=<Selo size={size} giro={24}/>;
 return <div data-hf-signature style={{position:'absolute',left:x,top:y,pointerEvents:'none'}}>{still?<Freeze frame={60}>{seal}</Freeze>:seal}</div>;
}
export function OchreGesture({y=410,width=720,from=5}:{y?:number;width?:number;from?:number}) {
 const frame=useCurrentFrame();
 return <BrushStroke color={ACCENT} style={{position:'absolute',left:65,top:y,width,height:18,clipPath:`inset(0 ${(1-move(frame,from,24))*100}% 0 0)`}}/>;
}
/** Full-size footage; 3:4 sources retain all pixels in a width-filling box below the title. */
export function VideoScene({src,from=0,lines,note,look='cor',side=false,wide=false,children,...p}:PieceProps & {src:string;from?:number;lines:string[];note?:string;look?:Look;side?:boolean;wide?:boolean;children?:ReactNode}) {
 const path=`festival/ig/${src}.mp4`,Video=getRemotionEnvironment().isPlayer?Html5Video:OffthreadVideo;
 return <Canvas {...p} dark signature={false}>
  <div style={{position:'absolute',inset:24,borderRadius:28,overflow:'hidden'}}>
   <Video src={getRemotionEnvironment().isPlayer?`/${path}`:staticFile(path)} trimBefore={f(from)} muted style={{position:'absolute',left:0,top:wide?410:0,width:'100%',height:wide?1376:'100%',objectFit:'contain',filter:LOOK[p.treatment==='direction'||!p.treatment?look:p.treatment]}}/>
   <div style={{position:'absolute',inset:0,background:side?'linear-gradient(90deg,rgba(8,29,24,.8),transparent 58%)':'linear-gradient(180deg,rgba(8,29,24,.94),rgba(8,29,24,.75) 20%,transparent 31%,transparent 82%,rgba(8,29,24,.7))'}}/>
  </div>
  <Headline lines={lines} y={275} size={side?59:78} width={side?450:885} accentLine={-1} dark/>
  <OchreGesture y={275+lines.length*(side?68:88)+18} width={side?330:720}/>
  {note&&<Label y={side?570:205} size={side?30:34} color={CHALK} style={{maxWidth:side?400:885}}>{note}</Label>}
  <BrandSeal x={65} y={side?1190:1420}/>
  {children}
 </Canvas>;
}
/** Informative signed close for practice carousels, independent of event ticket messaging. */
export function PracticeClose({title=['O QUE VOCÊ','QUER EXPLORAR?'],body='Formas, apoios e caminhos de prática. Que dúvida você quer trazer para a próxima conversa?',...p}:PieceProps & {title?:string[];body?:string}) {
 return <Freeze frame={90}><Canvas {...p} format="card" dark signature={false}>
  <Label y={90} size={36} color={CHALK}>#HANDSTANDLIFE</Label>
  <Headline lines={title} y={250} size={85} dark/>
  <Label y={600} size={48} color={CHALK} style={{width:880}}>{body}</Label>
  <BrandSeal x={65} y={1020} size={260} still/>
  <Label x={365} y={1100} size={38} color={CHALK}>HANDSTANDFEST<br/>handstandfest.com.br</Label>
 </Canvas></Freeze>;
}
