import type { CSSProperties, ElementType } from 'react';

export type EngravingFigure = 'straight' | 'straddle' | 'profile' | 'diagonal' | 'overhead';
export type PaintShape = 'oval' | 'sweep' | 'arc';
type Props = {
  figure?: EngravingFigure;
  paint?: PaintShape | false;
  paintTone?: 'ochre' | 'light';
  background?: 'cream' | 'green' | 'none';
  paintProgress?: number;
  alt?: string;
  style?: CSSProperties;
  /** Remotion passes Img so exports wait for both independent assets. */
  imageComponent?: ElementType;
  resolveSource?: (path: string) => string;
};
const BASE = '/festival/ig/arte/engraving-v1';
const FIGURES = {
  straight: { file: 'reta-costas.webp', width: 941, height: 1672, alt: 'Ilustração de uma parada de mão com pernas juntas, vista de costas' },
  straddle: { file: 'straddle-montanha.webp', width: 1536, height: 1024, alt: 'Ilustração de uma parada de mão com pernas abertas e apoio nas duas mãos' },
  profile: { file: 'profile-greece.webp', width: 887, height: 1774, alt: 'Gravura de uma parada reta vista de perfil, com camiseta e bermuda' },
  diagonal: { file: 'diagonal-thailand.webp', width: 1122, height: 1402, alt: 'Gravura de uma parada de mãos vista de costas, com pernas em diagonais diferentes' },
  overhead: { file: 'straddle-overhead.webp', width: 1536, height: 1024, alt: 'Gravura de uma parada em straddle vista de cima' },
};

/** Approved photo-derived engravings. Paint is optional and never baked into the person. */
export default function EngravingArtwork({ figure = 'straight', paint = 'oval', paintTone, background = 'none', paintProgress = 1, alt, style, imageComponent: Image = 'img', resolveSource = path => path }: Props) {
  const person = FIGURES[figure];
  const progress = Math.min(1, Math.max(0, paintProgress));
  const common: CSSProperties = { position: 'absolute', display: 'block', objectFit: 'contain', filter: 'none', aspectRatio: 'auto', borderRadius: 0, maxWidth: 'none' };
  return <div data-engraving={figure} data-paint={paint || 'none'} style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', isolation: 'isolate', background: background === 'green' ? '#153d32' : background === 'cream' ? '#f3eddf' : 'transparent', ...style }}>
    {paint && <Image data-art-layer="paint" src={resolveSource(`${BASE}/${paint}${(paintTone ?? (background === 'green' ? 'light' : 'ochre')) === 'light' ? '-light' : ''}.svg`)} alt="" aria-hidden="true" width={1080} height={1440} style={{ ...common, inset: 0, width: '100%', height: '100%', clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)` }} />}
    <Image data-art-layer="figure" src={resolveSource(`${BASE}/${person.file}`)} alt={alt ?? person.alt} width={person.width} height={person.height} loading={Image === 'img' ? 'lazy' : undefined} style={{ ...common, left: `${65 / 1080 * 100}%`, top: `${90 / 1440 * 100}%`, width: `${950 / 1080 * 100}%`, height: `${1260 / 1440 * 100}%` }} />
  </div>;
}
