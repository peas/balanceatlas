import { FEST, QUANDO } from '../data';

// Dedicated compositions exist for review; Instagram publication and pinning remain manual.
// Dedicated artwork must be created and reviewed before these receive a catalogue piece ID.
export type PinnedPost = {
  id:string; order:number; title:string; format:'Carrossel'|'Reel'; pillar:string;
  hook:string; objective:string; cover:string; visual:string; beats:string[];
  sources:string[]; caption:string; story:string; missing:string;
};

export const PINNED_POSTS:PinnedPost[] = [
  {
    id:'abertura-festival', order:1, title:'O que é o HandstandFest?', format:'Carrossel', pillar:'Evento',
    hook:'Três dias para praticar e trocar.',
    objective:'Apresentar o encontro para quem acabou de chegar: o que é, por que existe, quando e onde acontece.',
    cover:'Foto grande de prática real + “O que é o HandstandFest?”; marcar só “HandstandFest” com ocre. Data legível em segundo plano.',
    visual:'Carrossel de cinco fotos/imagens estáticas, fundo creme e cor natural. Sem selo em todas as lâminas: assinatura HF no fechamento. Não apresentar um retiro anterior como foto do festival futuro.',
    beats:[
      `1 · O que é o HandstandFest? Um encontro de parada de mão. ${QUANDO} · São Paulo.`,
      '2 · Praticar, aprender e trocar. Aulas, treinos e convivência em torno da parada de mão.',
      '3 · Gente em momentos diferentes da prática. Turmas de básico e de intermediário/avançado; critérios no site.',
      '4 · Nosso encontro: Trapézio Voador, São Paulo. Foto real do espaço; programação em preparação.',
      '5 · Vamos treinar juntos? Data, local, handstandfest.com.br e selo HF. Consultar informações e inscrições no site.',
    ],
    sources:['Acervo próprio/autorizado de prática e grupo: escolher foto de capa diferente da dos outros dois fixados.','Fotos do Trapézio Voador já cadastradas; fonte de datas e informações: data.ts.'],
    caption:`O 1º HandstandFest é um encontro para praticar, aprender e trocar em torno da parada de mão. De ${FEST.dias[0]} a ${FEST.dias[2]} de ${FEST.mes} de ${FEST.ano}, no Trapézio Voador, em São Paulo. Turmas para diferentes momentos da prática. Informações, critérios das turmas e inscrições em handstandfest.com.br.`,
    story:'Compartilhar a capa nativamente + link do evento. Pergunta: você viria sozinho ou com seu grupo de treino?',
    missing:'Composição montada com acervo existente. Revisar texto, enquadramento e informações antes de publicar; acrescentar música no Instagram se desejado.',
  },
  {
    id:'abertura-handstand', order:2, title:'O que é handstand?', format:'Reel', pillar:'Aprender',
    hook:'Parada de mão. Muitas possibilidades.',
    objective:'Mostrar a prática em movimento para quem não conhece: equilíbrio sobre as mãos, entradas e mudanças de forma. Uma apresentação, não uma aula de progressão.',
    cover:'Quadro real de parada reta com corpo inteiro + “O que é handstand?”; palavra “handstand” pincelada. Capa diferente do carrossel do evento.',
    visual:'Reel de 36s: vídeo quase inteiro, cortes entre tentativas assumidamente diferentes, selo HF discreto e legível. Uma única pausa curta com ocre para o termo-chave; restante em movimento e cor natural. Não fazer carrossel de vídeos nesta abertura.',
    beats:[
      '0–4s · Parada reta completa: “Handstand = parada de mão”.',
      '4–10s · Uma entrada em press, desde antes da subida: “Entrar também faz parte”. Se o movimento precisar, dar mais tempo em vez de acelerá-lo.',
      '10–17s · Uma mudança de forma legível: “Reta. Afastado. Outras formas.” Confirmar os nomes nos quadros escolhidos.',
      '17–21s · Uma pausa curta no mesmo enquadramento + ocre: “Equilíbrio que se pratica”. Retomar ou encerrar sem deslocar as mãos.',
      'Fecho · “Por aqui: prática, exercícios e encontros.” Handstand Life + assinatura HF. Não sugerir que o press é requisito para começar.',
    ],
    sources:['IMG_3574: candidato ao press em canes; escolher sequência inteira e verificar se um recorte preserva mãos, pés e suporte.','IMG_3587: candidato às mudanças de forma no deck; confirmar nomenclatura e enquadramento.','Gabriel em reta já aprovado no acervo, em plano diferente dos outros fixados.'],
    caption:'Handstand é parada de mão: equilibrar o corpo sobre as mãos. Essa nossa prática explora entradas, permanências e mudanças de forma. Mais: essa prática aparece em diversos outros esportes, não é à toa que agora merece seu próprio espaço!',
    story:'Compartilhar o Reel + enquete simples: já pratica / quero começar. Depois recolher uma dúvida concreta.',
    missing:'Composição montada com acervo existente. Revisar texto, enquadramento e informações antes de publicar; acrescentar música no Instagram se desejado.',
  },
  {
    id:'abertura-participar', order:3, title:'Ainda estou na parede. Posso participar?', format:'Carrossel', pillar:'Evento',
    hook:'Tem espaço para o seu momento da prática.',
    objective:'Responder à principal barreira de entrada e orientar o próximo passo: para quem é, como escolher a turma e onde encontrar informações.',
    cover:'Foto grande de treino na parede + “Ainda estou na parede. Posso participar?”; “posso participar?” com um highlight ocre curto. Não repetir a foto da primeira capa.',
    visual:'Quatro lâminas, com mais verde que o carrossel do evento. Fotos reais de apoio e treino; texto curto. HF apenas no último slide. Evitar montagem de certo/errado e promessa de resultado.',
    beats:[
      '1 · Ainda estou na parede. Posso participar? Sim: há turma de básico para quem ainda não sustenta o livre.',
      '2 · Já pratica no livre? Há turma de intermediário e avançado. Critérios completos no site; não decidir pelo formato de uma foto.',
      '3 · Na dúvida sobre a turma? Ao se inscrever, envie um vídeo curto para ajudar na escolha, conforme as orientações do evento.',
      '4 · Encontre as informações em handstandfest.com.br: turmas, programação e inscrições. Data/local + selo HF. Sem preço ou escassez na arte fixa; consultar condições atuais no site.',
    ],
    sources:['Novo lote Gabriel: entrada/apoio na parede como foto real de capa; escolher quadro com corpo inteiro.','Carrossel existente “turma” como referência de conteúdo, não como render pronto deste novo roteiro.','Critérios e orientação de envio de vídeo: FAQ em data.ts.'],
    caption:'Você não precisa chegar ao festival dominando a parada de mão livre. Há turma de básico para quem ainda usa a parede, e turma de intermediário e avançado para quem já sustenta o livre com consistência. Confira os critérios e as orientações no site; na dúvida, mande um vídeo curto ao se inscrever para ajudarmos na escolha.',
    story:'Compartilhar a capa + caixa: qual é sua dúvida sobre participar? Respostas reais podem alimentar o FAQ, sem inventar perguntas recebidas.',
    missing:'Composição montada com acervo existente. Revisar texto, enquadramento e informações antes de publicar; acrescentar música no Instagram se desejado.',
  },
];
