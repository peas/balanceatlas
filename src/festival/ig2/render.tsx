// CLI-only entry: shared compositions, local fonts and the same CSS tokens as the website.
import { Composition, continueRender, delayRender, registerRoot, staticFile, cancelRender } from 'remotion';
import { PIECES } from './pieces';
import '../../../local/festival/render.css';

const fontsReady = delayRender('Load local festival fonts');
Promise.all([
  new FontFace('Archivo', `url(${staticFile('fonts/archivo.ttf')})`, { weight: '100 900', stretch: '62% 125%' }),
  new FontFace('Space Mono', `url(${staticFile('fonts/space-mono-bold.ttf')})`, { weight: '700' }),
].map(async font => { document.fonts.add(await font.load()); }))
  .then(() => continueRender(fontsReady)).catch(cancelRender);

function RenderRoot() {
  return <>{PIECES.filter(piece => piece.format === 'Reel').map(piece => {
    const slide = piece.slides[0];
    return <Composition key={piece.id} id={piece.id} component={slide.component} durationInFrames={Math.round(slide.seconds * 30)} fps={30} width={1080} height={slide.height} defaultProps={{ guides: false, treatment: 'direction' as const }} />;
  })}</>;
}
registerRoot(RenderRoot);
