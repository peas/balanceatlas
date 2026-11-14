import "./review-react";

// CLI-only entry: shared compositions, local fonts and the same CSS tokens as the website.
import { Composition, continueRender, delayRender, registerRoot, staticFile, cancelRender } from 'remotion';
import { CATALOG } from './catalog';
import '../../../local/festival/render.css';

const fontsReady = delayRender('Load local festival fonts');
Promise.all([
  new FontFace('Archivo', `url(${staticFile('fonts/archivo.ttf')})`, { weight: '100 900', stretch: '62% 125%' }),
  new FontFace('Space Mono', `url(${staticFile('fonts/space-mono-bold.ttf')})`, { weight: '700' }),
].map(async font => { document.fonts.add(await font.load()); }))
  .then(() => continueRender(fontsReady)).catch(cancelRender);

function RenderRoot() {
  return <>{CATALOG.flatMap(piece => piece.slides.map((slide, i) => ({piece,slide,i}))).map(({piece,slide,i}) => {
    return <Composition key={`${piece.id}-${i}`} id={piece.slides.length === 1 ? piece.id : `${piece.id}-${i+1}`}  component={slide.component} durationInFrames={Math.round(slide.seconds * 30)} fps={30} width={1080} height={slide.height} defaultProps={{ guides: false, palette:'ocre', treatment: 'direction' as const, review:{id:piece.id,title:piece.title,format:piece.format,description:piece.description,movement:piece.movement,name:slide.name,cues:slide.cues,cover:slide.cover,index:i,count:piece.slides.length} }} />;
  })}</>;
}
registerRoot(RenderRoot);
