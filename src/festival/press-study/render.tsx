import '../ig2/review-react';
import {Composition,registerRoot,staticFile,delayRender,continueRender,cancelRender} from 'remotion';
import {PressStudy,PRESS_DURATION,PRESS_FPS} from './PressStudy';
const ready=delayRender('fonts');
Promise.all([new FontFace('Archivo',`url(${staticFile('fonts/archivo.ttf')})`,{weight:'100 900'}),new FontFace('Space Mono',`url(${staticFile('fonts/space-mono-bold.ttf')})`,{weight:'700'})].map(async f=>document.fonts.add(await f.load()))).then(()=>continueRender(ready)).catch(cancelRender);
registerRoot(()=> <>{(['calmo','pulso'] as const).map(mode=><Composition key={mode} id={`press-${mode}`} component={PressStudy} durationInFrames={PRESS_DURATION} fps={PRESS_FPS} width={1080} height={1920} defaultProps={{mode}}/>)}</>);
