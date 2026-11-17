// Fixed, source-specific framing. The clean exercise masters remain untouched.
// The video and photographic hold MUST use the same transform/origin.
export type TrainingArtDirection = {
  zoom: number;
  origin: string;
  paint: 'highlight' | 'underline';
  hold: 'mono' | 'natural';
  note: {x:number;y:number;width:number};
  rationale: string;
};
const standard: TrainingArtDirection = {
  zoom: 1, origin: '50% 50%', paint: 'highlight', hold: 'mono',
  note: {x:65,y:700,width:650},
  rationale: 'Corpo e apoios completos; não ampliar automaticamente.',
};
const directions: Record<string, Partial<TrainingArtDirection>> = {
  'gato-vaca': {zoom:1.3,origin:'55% 60%',note:{x:65,y:680,width:650},rationale:'Aproximação fixa de 30%: retirar céu e gramado, preservando mãos, joelhos e pés.'},
  'gato-vaca-perfil': {zoom:1.15,origin:'70% 70%',paint:'underline',hold:'natural',note:{x:65,y:680,width:650},rationale:'Aproximação de 15%, ancorada à direita para manter os pés; ângulo complementar.'},
  'escapulas': {paint:'underline',note:{x:65,y:700,width:650},rationale:'A prancha já ocupa boa parte da largura; ampliar cortaria cabeça ou pés.'},
  'escapulas-perfil': {paint:'highlight',hold:'natural',note:{x:65,y:700,width:650},rationale:'Pés próximos à borda: manter escala, aproveitar como vista lateral complementar.'},
  'ombros-apoio': {paint:'underline',hold:'natural',note:{x:65,y:700,width:650},rationale:'O apoio à direita é parte da explicação; não cortá-lo para dar zoom.'},
  'chute-parede': {note:{x:65,y:850,width:480},rationale:'Preservar toda a entrada e retorno; no fecho a observação fica à esquerda do corpo.'},
  'saida-parede': {paint:'underline',note:{x:460,y:1000,width:480},rationale:'A saída percorre o quadro; manter escala fixa e observação no espaço livre à direita.'},
  'saida-cadeira': {hold:'natural',note:{x:460,y:900,width:480},rationale:'Preservar mãos, perna e cadeira. Usar como preparação, sem zoom que elimine o apoio.'},
};
export const trainingArtDirection=(id:string):TrainingArtDirection=>({...standard,...directions[id]});
