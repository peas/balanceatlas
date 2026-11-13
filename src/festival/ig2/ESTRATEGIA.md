# Instagram como comunidade — ciclo editorial 01

Proposta de 12/11/2026. Paulo pediu comunidade de nicho, não viralização. A página de trabalho é
https://handstandfest.com.br/instagram/; dados canônicos do calendário em `editorial.ts`, peças novas em
`editorial-pieces.tsx`. Não é agendamento na conta. O início sugerido é 13/11, editável no navegador;
verificar a abertura de vendas em 18/11 antes de publicar e reposicionar o item se mudar a data inicial.

## Cadência e intenção

21 dias como piloto: um post + um story de apoio por dia, se houver material bom e tempo para responder.
Alternar comunidade, observação da prática, aprendizagem, exercícios, referências profissionais e evento.
A pauta nasce de uma pergunta útil, não de uma obrigação de preencher o feed. O dia 14 fica reservado para
uma pergunta real; respostas da comunidade podem mudar a ordem de qualquer semana.

Story não precisa ser uma segunda produção: compartilhar o post nativamente + pergunta, enquete ou bastidor.
Uma arte 9:16 opcional acompanha cada post com prévia, mas não substitui o compartilhamento clicável.
Adicionar stickers e links no Instagram; não desenhar controles falsos. Stories de captação podem anteceder
um tutorial, mas não prometer uma data sem a demonstração pronta. Não há horário mágico: usar Insights da
conta e uma janela em que seja possível responder às pessoas.

## Linguagem

- Ocre, papel quente e verde; peças estáticas alternam fotos do acervo com gravura pontual.
- Carrosséis só de imagens/texto, com cada lâmina visível na página e sem controles de reprodução.
- Alternar movimento real, freeze/P&B/pintura e gravura anatômica estática. Preservar cor em lugares e encontros.
- O freeze `arte-freeze-ocre` já existe e usa recorte P&B: não o chamar de hachura anatômica.
- Não forçar freeze no meio de uma demonstração quando impede entender a execução. Primeiro tempo real;
  depois congelamento/replay identificado para comentar um ponto.
- Figura e mancha independentes; guia de imagem em `../IMAGERY.md`. Não gerar posturas de exercício do zero.
  Para novos exercícios, usar foto/frame real e conferir mãos, articulações e alinhamento antes de ilustrar.
- Textos grandes e uma ideia por quadro. Todos os rascunhos precisam de leitura no telefone antes de exportar.
- Biblioteca antiga continua disponível no final, recolhida. Não é a ordem recomendada de publicação.

## Produção

O campo `missing` de cada dia é a lista concreta de captação/revisão. Consultar `PAUTAS.md` (oito exercícios
descritos pelo Paulo) e `../../../acervo/catalogo.yaml` via `scripts/festival_image_index.py` para encontrar
fotos. Preferir uma pessoa/corpo inteiro para ilustração; fotos de grupo naturais para comunidade.

Prioridade de gravação: canoinha inferior/superior no mesmo perfil; urso + close dos apoios; parede com
referência dos ângulos confirmada; shrug com apoio definido; gato-vaca. Gravar voz e execução separadamente.
Reservar urso→prancha alongada e chute suave para a parede para o ciclo 02, após a revisão das primeiras aulas.
Peças de ensino aguardam revisão do professor; não inventar séries, dosagem ou benefícios clínicos.

Para profissionais: fonte oficial, comentário próprio e imagem autorizada/entrevista, ou capa tipográfica.
Mikael/Emmet são referências editoriais, não convidados anunciados. Profissional brasileiro do dia 17 será
escolhido com a comunidade. Não gerar um retrato que se passe por uma foto da pessoa.

## Revisão a cada 7 dias

Anotar post, objetivo, alcance, salvamentos, compartilhamentos, respostas relevantes e dúvidas. Em evento,
anotar cliques no link e perguntas de inscrição; não atribuir vendas a um post sem medição. Comparar taxas
por alcance e a qualidade das conversas, sem metas inventadas ou competição com contas grandes. Leitura
após 48 h e revisão semanal são uma rotina proposta, não regra do algoritmo. Com pouca amostra, ouvir as
pessoas e manter a sequência flexível. Não publicar urgência/escassez sem conferência do lote real.

## Pesquisa e limites

Consultas em 12/11/2026. A estratégia de 21 dias e a mistura de pilares são propostas nossas, não prescrição
oficial nem promessa de crescimento. Fontes primárias:

- [Meta: Best Practices no painel profissional](https://about.fb.com/news/2024/10/best-practices-education-hub-creators-instagram/): orientação de criação, engajamento e alcance, incluindo dicas personalizadas. Sustenta revisar os dados da conta em vez de impor uma frequência universal.
- [Meta: conteúdo original](https://about.fb.com/br/news/2024/04/ajudando-o-criador-de-conteudo-a-encontrar-novos-publicos/): originalidade e atribuição nas recomendações. Preferimos acervo próprio, conversa e referências comentadas a uma sequência de reposts de atletas.
- [Handstand Factory: equipe](https://handstandfactory.com/about/): referência para a pauta sobre Mikael Kristiansen e Emmet Louis. Confirmar o texto biográfico final antes de publicar.

Playbooks complementares: `~/.claude/skills/instagram-creation/SKILL.md` (editorial e composição) e
`~/.claude/skills/videos-remotion/SKILL.md` (implementação/render). A página não envia nada ao Instagram.

## Variedade de imagens — 12/11/2026

Paulo considerou o straddle hachurado repetitivo. Ele é uma ilustração editorial, não um carimbo obrigatório
da marca. `editorial-images.ts` seleciona dez fotos já catalogadas, com IDs, URLs, descrição e função;
`DAY_IMAGE` associa referências aos dias. O catálogo continua sendo a fonte das anotações visuais.

- Comunidade e encontros: fotografias naturais de grupos e aulas. Identificar como acervo de retiros,
  sem sugerir que sejam registros do festival futuro.
- Formas: reta de costas, perfil, straddle de cima e outras posições/enquadramentos. A gravura original
  fica na abertura do carrossel de formas; não serve de fundo automático a todos os stories.
- Candidatas a futuras gravuras: `photo-greece-2025-11` (perfil) e `photo-saopaulo-2024-106` (vista superior).
  Nenhuma nova hachura foi gerada nesta rodada; conferir anatomia e preservação de dedos ao produzir.
- Pautas pendentes mostram referências e o que ainda falta captar. Foto no chão não é canoinha;
  close dos punhos não é caminhada do urso; extensão do tronco não é gato-vaca.
- Manter mãos e pés no enquadramento (`object-fit: contain` nas novas peças), alternar pessoas,
  ângulos e contextos entre publicações; repetir a identidade, não sempre a mesma figura.

### Hachuras selecionadas — aplicação posterior em 12/11

A pedido do Paulo, duas candidatas receberam ImageGen + recorte transparente: perfil da Grécia (11) e
pernas diagonais da Tailândia (18). A gravura vista de cima (São Paulo 106), que já existia, foi reaproveitada.
As três entram no carrossel do dia 3; perfil e diagonal aparecem pontualmente nos stories dos dias 16 e 2.
A tinta continua em SVG separado, com oval, arco aberto e faixa, respectivamente; grupos mantêm fotografia.
Prompts executados, hashes, PNGs mestres, exportação e limites: `design/handstandfest-arte/2026-11-12-editorial/`.
Isso substitui a indicação anterior de que nenhuma nova gravura havia sido gerada.

### Acervo do Gabriel — quatro substituições no ciclo

Em 12/11, o novo lote de 9 vídeos + 11 imagens trouxe quatro peças: tuck/reta no dia 2, prática na praia
no dia 7, gravura de Gabriel no dia 17 e fotografia diante do mar no dia 21. Isso troca quatro materiais
da proposta anterior; o ciclo continua com 21 dias. Stories dessas peças reaproveitam o post nativamente
ou um trecho verdadeiro; não recebem a antiga figura genérica. As perguntas e pendências foram ajustadas.

Dois Reels congelam exatamente o quadro da fonte, passam a P&B e recebem a mancha como janela da cena.
A gravura anatômica gerada está somente no estático. Guia e renders: `design/handstandfest-arte/2026-11-12-gabriel/`.
O slot do dia 17 agora é Gabriel; outras referências brasileiras podem entrar no ciclo seguinte.
