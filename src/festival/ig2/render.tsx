// CLI-only entry: shared compositions, local fonts and the same CSS tokens as the website.
import { Composition, continueRender, delayRender, registerRoot, staticFile, cancelRender } from 'remotion';
import { PIECES } from './pieces';
import { GABRIEL_PIECES } from './gabriel-pieces';
import { NATURE_PIECES } from './natureza-pieces';
import { EDITORIAL_PIECES } from './editorial-pieces';
import '../../../local/festival/render.css';

const fontsReady = delayRender('Load local festival fonts');
Promise.all([
  new FontFace('Archivo', `url(${staticFile('fonts/archivo.ttf')})`, { weight: '100 900', stretch: '62% 125%' }),
  new FontFace('Space Mono', `url(${staticFile('fonts/space-mono-bold.ttf')})`, { weight: '700' }),
].map(async font => { document.fonts.add(await font.load()); }))
  .then(() => continueRender(fontsReady)).catch(cancelRender);

function RenderRoot() {
  return <>{[...PIECES, ...EDITORIAL_PIECES, ...GABRIEL_PIECES, ...NATURE_PIECES].flatMap(piece => piece.slides.map((slide, i) => ({piece,slide,i}))).map(({piece,slide,i}) => {
    return <Composition key={`${piece.id}-${i}`} id={piece.slides.length === 1 ? piece.id : `${piece.id}-${i+1}`}  component={slide.component} durationInFrames={Math.round(slide.seconds * 30)} fps={30} width={1080} height={slide.height} defaultProps={{ guides: false, treatment: 'direction' as const }} />;
  })}</>;
}
registerRoot(RenderRoot);
