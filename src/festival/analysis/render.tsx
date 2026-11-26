import React from 'react';
import {registerRoot,Composition,staticFile} from 'remotion';
import AnalysisVideo from './AnalysisVideo';
registerRoot(()=> <Composition id="paulo-alinhamento" component={AnalysisVideo} durationInFrames={1788} calculateMetadata={({props})=>({durationInFrames:Math.floor((props.duration??59.6)*30)})} fps={30} width={1080} height={1920} defaultProps={{video:staticFile('video.mp4'),pose:staticFile('pose.json'),side:'left' as const,overlay:true,duration:59.6}}/>);
