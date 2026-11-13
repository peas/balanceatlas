import type { EngravingFigure, PaintShape } from '../EngravingArtwork';
// Curated from acervo/catalogo.yaml; reviewed at full size/contact sheet on 12 Nov 2026.
// Photographic references are not automatically approved exercise demonstrations.
const photo=(id:string,path:string,alt:string,note:string)=>({id,url:`https://media.balanceatlas.com/images/retreats/${path}.webp`,alt,note});
export const EDITORIAL_IMAGES={
 gabrielTuck:{id:'gabriel-img-3372',url:'/festival/ig/gabriel/img-3372-freeze.webp',alt:'Gabriel em parada reta de perfil no quadro de congelamento',note:'Vídeo IMG_3372: trecho 0–6 s, freeze em 6 s. Movimento real antes da pintura.'},
 gabrielBeach:{id:'gabriel-img-3377',url:'/festival/ig/gabriel/img-3377-freeze.webp',alt:'Gabriel em parada na areia',note:'Vídeo IMG_3377: trecho 0–10 s, freeze em 10 s. Cenário preservado dentro da janela de pincel.'},
 gabrielArt:{id:'gabriel-img-8751',url:'/festival/ig/gabriel/gabriel-arco.webp',alt:'Gravura de Gabriel em parada arqueada',note:'Derivada de IMG_8751 por ImageGen; figura com alpha e mancha em camada separada.'},
 gabrielSea:{id:'gabriel-img-7876',url:'/festival/ig/gabriel/praia-reta.webp',alt:'Gabriel em parada diante do mar',note:'IMG_7876: fotografia em cor. Confirmar crédito fotográfico; local exato não inferido.'},
 group:photo('photo-saopaulo-2024-96','saopaulo-2024/96','Três pessoas em parada de mãos no jardim','Foto de retiro anterior; não é registro do festival futuro.'),
 profile:photo('photo-greece-2025-11','greece-2025/11','Uma pessoa em parada de mãos de perfil, em sala com janelas','Gravura editorial de perfil disponível; não demonstra canoinha ou shrug.'),
 diagonal:photo('photo-thailand-2026-18','thailand-2026/18','Praticante com pernas abertas numa sala','Variação de enquadramento e forma; conferir nomenclatura antes de ensinar.'),
 hands:photo('photo-thailand-2026-26','thailand-2026/26','Detalhe dos punhos e mãos apoiados no chão','Referência de proximidade da câmera; não demonstra caminhada do urso.'),
 class:photo('photo-greece-2025-09','greece-2025/09','Professor conversa com participantes em roda','Usar para conversa e comunidade; não atribuir identidade pelo catálogo.'),
 floor:photo('photo-thailand-2026-42','thailand-2026/42','Grupo em prática no chão de um pavilhão','Contexto de trabalho no chão; não é demonstração da canoinha prescrita.'),
 tuck:photo('photo-thailand-2026-47','thailand-2026/47','Uma demonstração de parada agrupada diante da turma','Acervo para pauta sobre observar uma aula; confirmar professor antes de identificar.'),
 mobility:photo('photo-saopaulo-2024-101','saopaulo-2024/101','Grupo em extensão do tronco, apoiado nas mãos','Contexto de mobilidade; esta foto não é gato-vaca.'),
 straight:photo('photo-saopaulo-2024-98','saopaulo-2024/98','Parada reta de costas junto à piscina','Referência real de pernas juntas; preservar mãos e pés no enquadramento.'),
 overhead:photo('photo-saopaulo-2024-106','saopaulo-2024/106','Straddle fotografado de cima, em preto e branco','Nova referência de straddle: ângulo alto, mãos e pés visíveis; gravura própria disponível.'),
};
export type EditorialImageKey=keyof typeof EDITORIAL_IMAGES;
// Day -> candidate. Unmapped technical/portrait slots intentionally still need new footage.
export const DAY_IMAGE:Partial<Record<number,EditorialImageKey>>={1:'group',2:'gabrielTuck',3:'overhead',4:'class',5:'floor',6:'straight',7:'gabrielBeach',9:'floor',11:'hands',12:'profile',14:'class',15:'hands',16:'profile',18:'profile',20:'mobility',17:'gabrielArt',21:'gabrielSea'};

// A few selected applications, rather than a universal photo treatment.
export const DAY_ENGRAVING:Partial<Record<number,{figure:EngravingFigure;paint:PaintShape}>>={
 16:{figure:'profile',paint:'oval'},
};
