import type { CSSProperties } from 'react';
import { TRACO } from './pincel';

/** Shared dry-brush shape, derived from the seal's edge. Keep lettering above it. */
export const BrushStroke = ({ color, style }: { color: string; style?: CSSProperties }) => (
  <svg viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true" style={style}>
    <path d={TRACO.corpo} transform={TRACO.transform} fill={color} />
  </svg>
);
