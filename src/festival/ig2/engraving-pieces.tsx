import { Img, getRemotionEnvironment, staticFile } from 'remotion';
import EngravingArtwork, { type PaintShape } from '../EngravingArtwork';
import { Canvas, type PieceProps } from './kit';
import type { Piece } from './pieces';

const resolveSource = (path: string) => getRemotionEnvironment().isPlayer ? path : staticFile(path.slice(1));
// Static art only: these are the three approved applications, with no animated frame dependencies.
function ApprovedArt({ variant, ...props }: PieceProps & { variant: number }) {
  const paint: PaintShape = (['oval', 'sweep', 'arc'] as const)[variant];
  return <Canvas {...props} format="card" dark={variant === 1}>
    <EngravingArtwork figure={variant === 0 ? 'straight' : 'straddle'} paint={paint} background={variant === 1 ? 'green' : 'cream'} imageComponent={Img} resolveSource={resolveSource} />
  </Canvas>;
}
const Oval = (p: PieceProps) => <ApprovedArt {...p} variant={0} />;
const Sweep = (p: PieceProps) => <ApprovedArt {...p} variant={1} />;
const Arc = (p: PieceProps) => <ApprovedArt {...p} variant={2} />;
export const APPROVED_ENGRAVINGS: Piece[] = [{
  id: 'gravuras-aprovadas', title: 'Corpo e pincel', format: 'Carrossel',
  description: 'As três aplicações aprovadas: reta com oval ocre, pernas abertas com faixa sobre verde e arco aberto sobre creme.',
  look: 'Gravura / ocre / verde', movement: 'Três imagens estáticas. A figura e a mancha são independentes; a pintura pode ser omitida em outras aplicações.',
  slides: [Oval, Sweep, Arc].map((component, i) => ({ name: ['Reta / oval', 'Pernas abertas / faixa', 'Pernas abertas / arco'][i], component, seconds: 1, height: 1440, cover: 0, cues: [] })),
}];
