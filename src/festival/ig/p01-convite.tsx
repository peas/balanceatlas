// 01 · Reel "O convite": the two organizers talk to camera, with burnt-in captions. Spec in PECAS.md.
// Faces at y 350–600: all text sits below them (y 760+), captions at y 1140.
import type { ReactNode } from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { FEST } from '../data';
import { Barras, Clip, Etiqueta, Fecho, Gancho, Legenda, Quadro, REEL, f, type Palavra, type PecaProps } from './kit';
import type { Slide } from './tipos';
import abre from './legendas/conv-abre.json';
import onde from './legendas/conv-onde.json';
import quem from './legendas/conv-quem.json';
import porque from './legendas/conv-porque.json';
import bora from './legendas/conv-bora.json';

const DIAS = `${FEST.dias[0]} a ${FEST.dias[2]} de ${FEST.mes}`;
const TOTAL = f(30.8);

/** 3-frame white flash on the incoming shot of a hard cut. */
const Flash = () => {
  const frame = useCurrentFrame();
  if (frame >= 3) return null;
  return <AbsoluteFill style={{ background: '#fff', opacity: interpolate(frame, [0, 3], [0.5, 0]) }} />;
};

/** One talking shot: clip with sound, captions from the same second, overlays, flash on the cut. */
const Fala = ({ src, from, words, flash = true, children }: { src: string; from: number; words: Palavra[]; flash?: boolean; children?: ReactNode }) => (
  <>
    <Clip src={src} from={from} volume={1} />
    {children}
    <Legenda words={words} from={from} y={1140} />
    {flash && <Flash />}
  </>
);

const Convite = ({ guides }: PecaProps) => (
  <Quadro formato="reel" guides={guides}>
    <Sequence from={0} durationInFrames={f(5.7)}>
      <Fala src="conv-abre" from={0} words={abre as Palavra[]} flash={false}>
        {/* size 80 (spec 86): "DE HANDSTAND" would pass x 950 */}
        <Gancho lines={['O 1º festival', 'de handstand', 'do Brasil']} size={80} y={760} tons={['chalk', 'accent', 'chalk']} outAt={f(3.4)} />
        <Barras side="left" outAt={f(5.2)} />
      </Fala>
    </Sequence>
    <Sequence from={f(5.7)} durationInFrames={f(6.9)}>
      <Fala src="conv-onde" from={0} words={onde as Palavra[]}>
        <Etiqueta text={DIAS} tom="accent" size={40} x={65} y={760} delay={4} />
        <Etiqueta text="Trapézio Voador · metrô Butantã" tom="chalk" size={34} x={65} y={850} delay={f(3.3)} />
      </Fala>
    </Sequence>
    <Sequence from={f(12.6)} durationInFrames={f(5.2)}>
      <Fala src="conv-quem" from={0.75} words={quem as Palavra[]}>
        <Etiqueta text="acroyoga" tom="chalk" size={38} x={65} y={760} delay={f(2.9)} />
        <Etiqueta text="yoga" tom="chalk" size={38} x={65} y={840} delay={f(3.8)} />
        <Etiqueta text="calistenia" tom="chalk" size={38} x={65} y={920} delay={f(4.25)} />
        <Barras side="right" />
      </Fala>
    </Sequence>
    <Sequence from={f(17.8)} durationInFrames={f(5.2)}>
      <Fala src="conv-porque" from={7.7} words={porque as Palavra[]}>
        {/* size 67 (spec 76): "DE PONTA-CABEÇA" would pass x 950 */}
      </Fala>
    </Sequence>
    <Sequence from={f(23.0)} durationInFrames={f(4.4)}>
      <Fala src="conv-bora" from={0.9} words={bora as Palavra[]}>
        {/* size 72 (spec 96): "HANDSTANDFEST" would pass x 950 */}
        <Gancho lines={['HandstandFest', 'Brasil!']} size={72} y={300} tom="accent" delay={f(2.1)} />
        <Barras side="left" />
      </Fala>
    </Sequence>
    <Sequence from={f(27.4)} durationInFrames={f(3.4)}>
      <Fecho cta="Link na bio" />
    </Sequence>
  </Quadro>
);

export const slides: Slide[] = [{ comp: Convite, frames: TOTAL, ...REEL, capa: 20 }];
