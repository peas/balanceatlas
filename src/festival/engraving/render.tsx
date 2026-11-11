import {Composition, registerRoot, staticFile} from 'remotion';
import {EngravedVideo} from './EngravedVideo';
import {looks} from './settings.mjs';
function Root() {
  return <Composition id="EngravingStudy" component={EngravedVideo} width={480} height={854} fps={30} durationInFrames={180}
    defaultProps={{src: staticFile('festival/ig/p-desce.mp4'), settings: looks.graphite, processingWidth: 480}} />;
}
registerRoot(Root);
