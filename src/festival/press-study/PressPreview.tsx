import React from 'react';
import {Player} from '@remotion/player';
import {PressStudy,PRESS_DURATION,PRESS_FPS} from './PressStudy';
const calm={mode:'calmo' as const},pulse={mode:'pulso' as const};
export default function PressPreview(){return <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:28}}>{[calm,pulse].map((props,i)=><section key={props.mode}><h2>{i?'02 · Pulso e tinta':'01 · Pausa e aproximação'}</h2><Player component={PressStudy} inputProps={props} durationInFrames={PRESS_DURATION} fps={PRESS_FPS} compositionWidth={1080} compositionHeight={1920} controls loop autoPlay initiallyMuted style={{width:'100%',maxWidth:430,borderRadius:12,overflow:'hidden'}}/><p>{i?'Zoom +30%, recuo de 10 pontos e retorno suave. A tinta entra e sai nas pausas.':'Zoom de até 7,5% durante a pausa. A tinta aparece brevemente em três posições.'}</p></section>)}</div>}
