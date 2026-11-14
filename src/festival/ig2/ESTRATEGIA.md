# Instagram como comunidade — ciclo editorial 01

Proposta de 12/11/2026. Paulo pediu comunidade de nicho, não viralização. A página de trabalho é
https://handstandfest.com.br/instagram/; dados canônicos do calendário em `editorial.ts`, peças novas em
`editorial-pieces.tsx`. Não é agendamento na conta. O início aprovado é quarta-feira, 18/11/2026, editável no navegador;
verificar a abertura de vendas em 18/11 antes de publicar e reposicionar o item se mudar a data inicial.

Direção consolidada: [CURRENT.md](../CURRENT.md). A revisão de 13–14/11 prevalece sobre os relatos datados abaixo.

## Atualização de 14/11: referências e pausa de “Em foco”

As quatro apresentações de handbalancers famosos saem do calendário e biblioteca ativos por decisão do Paulo. Estudos antigos ficam arquivados. Entram pautas próprias de compressão, punhos, tentativas reais e encontros. A pesquisa de 80 posts, hashtag e Shorts está em [Referências observadas](../../../docs/instagram/2026-11-14-handstand-references.md), com dados em JSON ao lado. Priorizar dúvidas específicas e ação visível; alternar ensino, prática, paisagem e comunidade. Compartilhamentos não disponíveis não significam zero, e popularidade não valida execução técnica.

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

## Revisão após os renders — 12/11/2026

Paulo achou o vídeo/corpo pequeno nas janelas do papel. O teste `gabriel-transicoes-tela` usa a mesma fonte,
quase toda a tela 9:16, moldura discreta, título sobre degradê e grifo ocre pontual no freeze. O corpo mantém
a escala ao congelar. `gabriel-transicoes` permanece para comparação; dia 2 aponta para o teste novo.
`gabriel-gravura-story` é uma adaptação 9:16 com figura maior, não um card do feed reduzido dentro do Story.
O teste foi aprovado por Paulo: tela inteira ou quase inteira é o padrão; exceções precisam preservar a presença da imagem. Demonstração pede corpo
legível; retrato/gravura pode ter respiro. Ajustar também a distância da câmera na captação: sapinho e
canoinha ficam minúsculos se filmados do ponto usado para uma parada alta. Guias de texto não substituem
revisar mãos/pés e o texto durante toda a execução. Confira o draft dentro do Instagram antes de publicar.

**Perguntas como abertura (pedido posterior do Paulo nesta rodada):** a maioria dos títulos/gancho do
calendário virou pergunta; os novos renders e os estáticos editoriais acompanham. Pergunta específica,
respondível ou que convide a um relato real. A sequência desenvolve a ideia com afirmações; não transformar
cada frase em pergunta nem prometer uma resposta ausente. Posts de serviço do festival podem ser diretos.
Legados na biblioteca continuam estudos, não todos revisados com esta regra.

### #handstandlife e comunidade

Usar #handstandlife em prática, exercícios, repertório e convivência; #handstandfest quando o assunto é o
evento. Não é renomeação da marca nem promessa de alcance. Frase aprovada como direção de convite:
“Estamos criando e mapeando encontros e lugares para treinar.” Pedir cidade/bairro, nome do grupo/lugar,
frequência e contato público; confirmar com organizadores, autorização de imagem e data de verificação
antes de divulgar. Não chamar coleta inicial de mapa pronto. Dias 1 e 7 já usam esse convite.

### Repetir o post nos Stories: decisão proposta

Já estava na pesquisa/plano anterior como apoio nativo; esta rodada torna a seleção explícita. Compartilhar
um Reel ou carrossel no dia quando ajuda a abrir conversa, responder dúvida ou divulgar informação útil.
Adicionar uma pergunta, contexto ou bastidor. O compartilhamento nativo permite chegar ao post; uma imagem
exportada de story não cria esse vínculo sozinha. Stickers e links entram no app, nunca como controles falsos.

Retomar em 2–3 dias somente se houver nova resposta, dúvida recorrente, informação relevante ou material
útil que vale revisitar. Esse intervalo é uma hipótese editorial nossa, não recomendação oficial. Não copiar
a mesma chamada todos os dias. Sem contexto novo, publicar bastidor ou não publicar. Escolher por utilidade,
conversas, salvamentos/compartilhamentos relativos ao alcance e necessidade real do evento; observar respostas,
cliques disponíveis e saídas dos Stories em séries comparáveis. Uma saída isolada não prova rejeição.

A [Meta descreve orientações personalizadas de frequência e engajamento no painel profissional](https://about.fb.com/news/2024/10/best-practices-education-hub-creators-instagram/).
Não encontramos evidência primária nesta rodada de que republicar todo post nos Stories aumente alcance,
nem uma quantidade universal de repetições. A página oficial de ranking retornou 429 e a ajuda de
compartilhamento exigiu login; não atribuímos à Meta regras que não pudemos verificar.

### Captação e novas pautas

`production-plan.ts` alimenta a lista legível na página (#para-filmar), com 12 grupos de captação e usos.
`PESQUISA-CAPTACAO.md` traz a mensagem ao Gabriel e pesquisa primária, inclusive observação real no Chrome
na grade HSF: perguntas técnicas, relatos e encontros. Contagens datadas são exemplos, não ranking de
viralidade. Dia 16 agora traz `ed-consistencia` (cinco PNGs); a peça de subida segue no Studio. Banco de
pautas inclui atenção, tempo de aprendizado, parede, dias difíceis e mapa da comunidade. Preparar as
variações básicas com Gabriel antes de transformar essas ideias em aulas.

Figuras processadas estão em `acervo/gravuras.json`: oito recortes/gravuras e duas composições, vinculados
às fontes/prompts. Reutilizar o PNG/WebP transparente e adicionar tinta em layer independente; não re-gerar
a pessoa a cada post. Marcar aprovação pendente honestamente e conferir impressão para camisetas.

## Ordem revista + captação em dupla — 14/11/2026

35 dias, começando em 18/11. Não é um curso linear: alternar utilidade, pessoas, natureza e evento, preservando a ordem de assuntos relacionados (saída antes de explorar livre; entrada na parede antes de retirar os apoios).

1. Semana 1: convite; punhos; treinar junto; sapinho; Gabriel; saída lateral; paisagem.
2. Semana 2: entrar e sair da parede; ombros; local; canoinha; tentativas reais; tirar um pé; níveis do festival.
3. Semana 3: formas; compressão; encontros; costelas; pike/tuck; mãos; futebol.
4. Semana 4: chute controlado; rever o treino; dúvidas do evento; urso/prancha; press na natureza; um exercício em dois pontos de vista; cultura do movimento.
5. Semana 5: urso; tuck/reta; comunidade; press no deck; tour; press em dupla; pergunta real da comunidade.

Gabriel **e Paulo** gravam os exercícios. Um take comparável de cada um e outro ângulo complementar; manter também a tentativa inteira em velocidade real. Não confundir pessoas com certo/errado, nem montagem de tentativas diferentes com multicâmera simultânea. Revisão técnica com Gabriel; voz depois. Aproveitar as prévias de Paulo quando aprovadas. A página de captação conserva a URL `/instagram/gabriel/`, agora com dois checkboxes por pauta. Compressão e a comparação de ângulos são pautas a produzir, não renders prontos. Se a gravação atrasar, mover a pauta e usar uma peça própria pronta, preservando a alternância.
