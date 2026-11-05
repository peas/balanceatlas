// Glue: piece id -> its slides. One owner (do not edit from a piece file); a new piece adds one import and one line.
import type { Slide } from './tipos';
import { slides as p01 } from './p01-convite';
import { slides as p02 } from './p02-palmeiras';
import { slides as p03 } from './p03-lugar';
import { slides as p04 } from './p04-linha';
import { slides as p05 } from './p05-dupla';
import { slides as p06 } from './p06-jornada';
import { slides as p07 } from './p07-turma';
import { slides as p08 } from './p08-tres-dias';
import { slides as p09 } from './p09-lote';
import { slides as p10 } from './p10-pergunta';

export const REGISTRO: Record<string, Slide[]> = {
  'p01-convite': p01,
  'p02-palmeiras': p02,
  'p03-lugar': p03,
  'p04-linha': p04,
  'p05-dupla': p05,
  'p06-jornada': p06,
  'p07-turma': p07,
  'p08-tres-dias': p08,
  'p09-lote': p09,
  'p10-pergunta': p10,
};
