# Marca do HandstandFest: decisões, dúvidas abertas e brief para design

Em pt-BR, como o texto do festival: é o documento que o Paulo leva para outras ferramentas de design (Astra) e
lê com o Gabriel. Atualizar aqui a cada decisão; o `CLAUDE.md` do repo aponta para cá.

## Proposta de Instagram 02 — 10/11/2026

Paulo pediu uma página alternativa combinando Remotion, tratamento de imagem, posição das frases e o novo selo de pincel. Proposta local em `/festival/instagram2/` (atalho `/instagram2/`), código e notas em `src/festival/ig2/`. Usa a **paleta verde/amarelo já fechada e o círculo de pincel atual**, sem redesenhar o logo.

Cinco peças: três reels, um carrossel de cinco lâminas e três stories. Pincelada pontual na palavra, letras estáveis, selo animado no encerramento; cor natural e P&B por cena. Texto e imagem em áreas separadas, sem grão adicional ou música. Controles para comparar filtros, navegar pelos momentos e ver as áreas seguras. A `/instagram` original permanece disponível para comparação.

**Feedback do Paulo durante a revisão:** a tipografia parecia pequena. Refeitas as quebras de linha; informações principais em 40–48 px e títulos geralmente em 80–125 px no arquivo de 1080. A peça “A linha” passou a ter título grande acima do vídeo, preservando o corpo inteiro. Proposta ainda em avaliação; sem publicar ou renderizar MP4 nesta etapa.

## Histórico da seleção de paletas — rodada 5 de 10/11/2026

Paulo enviou dois prints do site e disse: “essas duas versões são as que o Gabriel mais gostou” e “acho que vou tentar ir por aí mesmo”. Os seletores nos prints são **E (verde/amarelo)** e **C (verde/rosa)**, nas cores originais. Esta é a direção atual; as versões dessaturadas da rodada 4 ficam como exploração anterior. Ainda não houve escolha entre E e C.

Escopo desta revisão: **somente logo e registro**. HF em pé com moldura, refinado com barra central contínua, espessuras uniformes e proporção 4:3. O desenho refinado ainda é proposta para avaliação. Kit em `design/handstandfest-logo-05/`, com SVG/PNG, contorno, monocromático, assinaturas e comparação antes/depois. Edição permanece fora da marca. Site não alterado.

## Pincelada vetorizada da referência — rodada 7, 10/11/2026

Paulo considerou a pincelada do site simples demais e enviou uma referência com cerdas e falhas mais ricas.
Vetor guardado em `design/handstandfest-selo-07/`: `hf-brush.svg` transparente, versão sobre creme e PNG.
Contorno traçado da imagem com Potrace; HF reconstruído em um caminho geométrico com a barra contínua.
Paleta atual verde/amarelo. Sem bitmap embutido: os vazios são transparência real. A granulação do papel e as
variações de pigmento da referência não fazem parte deste SVG de duas cores. Referência e receita regenerável
em `scripts/festival_trace_seal.py` guardadas no repo. Proposta arquivada; ainda não substitui o selo do site.

## Círculo de pincel — ideia do Gabriel, aplicada em 10/11/2026

O Gabriel propôs o HF sobre um círculo pintado a pincel. Leitura do Paulo: as letras retas mantêm a força do
handstand, e a tinta traz giro e equilíbrio, tirando o ar estático. A imagem dele era um mock-up em bitmap, então as
formas foram redesenhadas em vetor por `scripts/festival_pincel.py` (semente fixa; gera `src/festival/pincel.ts`,
`public/festival/traco.svg`, o favicon e `design/handstandfest-selo-06/avatar.svg` + PNG de 1080 para o Instagram).

Regra de uso: **uma textura só, grande e rara.**
- Círculo verde com HF amarelo é o selo principal: hero da home (colado no canto do vídeo), favicon (sem cerdas),
  avatar. Círculo amarelo com HF verde vai sobre fundo escuro: cartão final das peças, onde o pincel dá um giro e as
  letras pousam em cima (`Selo` no kit).
- Uma pincelada amarela atrás de uma palavra por cabeçalho ("HAND" na home, segunda linha do título nas subpáginas).
- **Revisto no mesmo dia, a pedido do Paulo:** o círculo virou o logo também no menu, na barra fixa e no rodapé
  (versão sem cerdas, que em tamanho pequeno viram sujeira). O HF no retângulo (`HFMark.astro`) ficou sem uso no
  site, guardado como versão alternativa. Nas peças de Instagram, cada linha do gancho é uma pincelada no lugar do
  bloco reto (linhas alternadas espelhadas para não parecer carimbo).
- Grade, ingressos, botões, etiquetas e abas seguem com a geometria reta: é o contraste que faz a tinta aparecer.
- Se o Gabriel mandar o arquivo original da pincelada, troca-se a forma no script e tudo acompanha.

## Palheta fechada e fotos tratadas — 10/11/2026 (decisão mais recente)

- **Palheta fechada pelo Paulo: verde + amarelo** (a antiga E): paper `#f6f1e4`, ink `#0f2a24`, stage `#0f3d33`,
  accent `#ffd23f`, accent-ink `#0f2a24`, muted `#ffb86b`. A verde + rosa (C) saiu do site junto com o seletor de
  palheta e o parâmetro `?paleta=`. O que as seções abaixo dizem sobre "duas palhetas" e "escolha em aberto" é histórico.
- **Tratamento de fotos aplicado por CSS**, sem recortar mídia: cor natural suavizada como base
  (`saturate(.86) contrast(.96) brightness(1.02)`) e preto e branco moderado (`grayscale(1) contrast(1.06)
  brightness(1.03)`) em 8 das 23 imagens dos bentos, 2 das 5 fotos do texto de handstand e nos fundos atrás de texto
  das peças de Instagram 07 a 10 (identidade colorida sobre foto P&B). Pôsteres dos professores perderam o sépia.
  Valores em `--foto-cor` / `--foto-pb` (festival.css) e `LOOK` (ig/kit.tsx); escolher P&B = `pb: true` no dado do
  bento, classe `pb` na figura, `look="pb"` em `Clip`/`Foto`.
- **Clipes recortados (10/11/2026, mais tarde):** a conversão HDR → SDR passou para pico de 100 nits com curva hable
  (antes 203 com mobius), escolhida comparando cinco quadros; céu e paredes de vidro voltaram a ter detalhe. Os 26
  clipes das peças de Instagram e o tour do local foram refeitos. Os clipes do hero e do cartão do professor
  perderam o grade antigo (tom quente, vinheta, P&B duro) e seguem o mesmo look do site. Os proxies locais ainda
  estão na conversão antiga (só afetam a página de vocabulário). O grão animado das composições segue ligado.

## Aplicado no site em 10/11/2026

A pedido do Paulo, o site ficou só com as duas palhetas de fundo verde: **E (verde + amarelo, padrão)** e **C (verde +
rosa)**, no seletor como "Amarelo" e "Rosa" (`?paleta=e|c`). A, B, D, F e G saíram do CSS; os tokens seguem na tabela
abaixo como registro. O símbolo **HF** do kit `design/handstandfest-logo-05/` entrou no menu, na barra fixa, no rodapé,
no favicon e no cartão final das peças de Instagram (`src/components/fest/HFMark.astro`; o desenho ainda está em
avaliação). O "1º" ficou fora do símbolo, como selo.

Para o site não ficar escuro o tempo todo, o hero e os cabeçalhos das subpáginas passaram para o papel (classe
`.claro`): o verde vira momento (professores, ingressos, barra fixa, molduras de vídeo). Como acento não serve de texto
sobre o papel, nos cabeçalhos claros ele vira bloco atrás da palavra ("HAND", segunda linha dos títulos).

Ainda não aplicado: o tratamento de fotos abaixo (nenhuma foto ou vídeo foi regradado).

## Tratamento das fotos — direção registrada em 10/11/2026

Paulo gostou da possibilidade de usar preto e branco e pediu registrar a proposta abaixo, considerando as paletas originais E (verde/amarelo) e C (verde/rosa). É uma direção de tratamento; os ajustes devem ser avaliados em cada foto real, sem um filtro numérico único definido nesta etapa.

- **Cor natural levemente suavizada como base:** reduzir discretamente a saturação, especialmente dos verdes do parque; conter as áreas muito claras e abrir um pouco as sombras quando o arquivo permitir. Preservar pele natural, sem tingir a foto de verde, rosa ou amarelo. Uso principal: professores, espaço e convivência.
- **Preto e branco com meios-tons como segundo tratamento:** contraste moderado, com detalhes da pele e do ambiente preservados. Evitar pretos esmagados e aparência de publicidade de academia. Uso pontual: movimento, retratos e chamadas.
- **Identidade colorida sobre fotos P&B:** manter logo, datas e pequenos blocos no acento da paleta, sempre em áreas livres. Nenhum elemento cobre corpo, mãos ou pés de quem está na parada.
- **Ritmo inicial sugerido:** aproximadamente duas fotos coloridas para cada uma em P&B; orientação flexível, não regra para cada sequência.
- **Evitar nesta direção:** sépia, duotone forte e grão aparente. A fotografia real já fornece textura.

Preferência sugerida pelo assistente: P&B com fundo verde e rosa pontual, pela combinação mais delicada; amarelo como alternativa mais energética. Isso não fecha a escolha entre C e E. Nenhuma foto foi editada nesta etapa.

## O que é o projeto (estado em 10/11/2026)

- **1º HandstandFest**: três dias de parada de mão (handstand) em São Paulo, 16 a 18 de abril de 2027 (sexta a
  domingo), no Trapézio Voador (R. Alvarenga 150, Butantã). 60 vagas em três lotes (R$490 / 590 / 690), venda pelo
  Sympla (link ainda não existe). Níveis básico, intermediário e avançado, uma trilha compartilhada: yoga de manhã,
  aquecimento e handstand por nível, aula temática à tarde, jam no fim do dia. Organizadores: Paulo e Gabriel.
- É o primeiro festival de handstand do Brasil. Tom: comunidade e energia, não competição e não venda agressiva.
- Site no ar em `balanceatlas.com/festival` (vai para `handstandfest.com.br`, domínio livre e ainda não comprado):
  home, `/sobre/`, `/handstand/`, `/mundo/`, mais `/instagram` (página de trabalho com dez peças de Reels, carrossel
  e stories em Remotion, ainda sem render). Instagram `@handstandfest` ainda não criado.
- O material visual é o nosso: filmagem de treino no Trapézio Voador e no parque (04/11/2026), fotos do espaço,
  pôsteres dos professores. Nada de foto gerada por IA no produto final.

## Decisões já tomadas

| Quando | Decisão |
|---|---|
| 05/11/2026 | Data: 16 a 18 de abril de 2027. |
| 10/11/2026 | **Uma marca só: HandstandFest.** Sem "Handstand Lab" nem "Casa do Handstand" por cima. O mesmo site e o mesmo Instagram publicam artigos, notícias e encontros no tempo entre edições; o festival é o pico, o resto é a vida da marca. Estudo dos nomes alternativos fica arquivado (Drive `pesquisas/handstand-lab-nomes.md`). |
| 10/11/2026 — rodada 5 | **E e C originais são as favoritas do Gabriel; Paulo quer seguir nessa direção.** Criar apenas o logo e registrar. Escolha entre as duas e aprovação do HF refinado ainda abertas. |
| 10/11/2026 — rodada 2 | Paulo pediu comparar **F invertido** e **HF em pé**, mantendo a grossura/estilo, com nova paleta livre das candidatas anteriores. Achou a primeira aplicação **bruta/neon demais**: a direção passa a ser mais suave, com fundo claro e fotografia natural. Contraste continua importante, mas não determina saturação alta. Nenhuma paleta ou símbolo final aprovado. |
| 04/11/2026 | Tipografia: **Archivo** 900 estendida (125%) para títulos, **Space Mono** para datas, etiquetas e números. Geometria dura: barras, blocos, Ts. Pistas de rede social no site (barras de story, selos ▶, destaques de perfil como abas, ponto "agora" no lote aberto). |
| 04/11/2026 | Regra de sobreposição: barra, T ou bloco nunca cobre texto nem o corpo de quem está na parada. Os pés ficam no topo-centro das fotos, então nomes vão no canto superior esquerdo. |
| 05/11/2026 | Peças de Instagram aprovadas como direção; seguem o seletor de palheta até a palheta fechar. |

## Dúvidas abertas (o que o Astra pode ajudar a resolver)

### 1. Palheta

Sete candidatas vivem no site como tokens CSS; dá para comparar ao vivo com `?paleta=a` … `?paleta=g`
(ex.: `https://balanceatlas.com/festival/?paleta=c`). Tokens: `paper` (fundo claro), `ink` (texto), `stage` (fundo
escuro das fotos e do hero), `accent` (cor de ação), `accent-ink` (texto sobre o acento), `muted` (apoio), `live`
(pistas de rede social: selo ▶, "agora"; por padrão igual ao acento).

| Palheta | paper | ink | stage | accent | accent-ink | muted | Leitura |
|---|---|---|---|---|---|---|---|
| A | #f4f1ea | #151515 | #222220 | #ff3b30 | #151515 | #8a8986 | concreto + vermelho; acento sobre stage = 4,493:1, abaixo de 4,5 sem arredondar (recalculado em 10/11/2026) |
| B (padrão) | #f2efe6 | #111111 | #2b3cf0 | #d7f55a | #111111 | #c9c5ba | cobalto + lima; 1º na pesquisa (energia, 5,7:1, lê como rede social) |
| C | #f4f1ea | #0f2a24 | #0f3d33 | #ff8fb8 | #0f2a24 | #8ed8e8 | verde profundo + rosa; **o Gabriel gostou**, o Paulo achou séria |
| D | #edebe6 | #0b0b0c | #0b0b0c | #7c5cff | #ffffff | #5cf2b5 | preto + violeta; acento/stage 4,527:1, mas branco/acento 4,346:1 reprova texto normal de botão |
| E | #f6f1e4 | #0f2a24 | #0f3d33 | #ffd23f | #0f2a24 | #ffb86b | verde + amarelo sol; melhor contraste (8,4:1), mas vira bandeira do Brasil |
| F | #f4f1ea | #0b2a21 | #1b7a5a | #ff6a4d | #0b2a21 | #ffd9c9 | verde médio + coral; reprova contraste (1,9:1) |
| G | #f4f1ea | #0f2a24 | #0f3d33 | #ff8fb8 | #0f2a24 | #8ed8e8 | C com `live` = lima #d7f55a (9,9:1 sobre o verde): tentativa de tirar a seriedade da C |

O que a pesquisa de 04/11/2026 (Drive `pesquisas/paleta-festival-esporte.md`) concluiu: evento de competição usa preto
+ uma cor ácida (HYROX, Spartan); evento de comunidade usa cor quente sobre fundo claro. Para nós: stage escuro mas
não preto, acento ácido, papel quente. Evitar laranja, que é a cor do festival de Rosario (Argentina), a referência
mais próxima. Nenhum acento serve como texto sobre o papel. Lima nunca sobre o papel.

**Pergunta:** qual das sete, ou uma oitava? Critérios: energia sem competição, contraste WCAG (acento sobre stage
≥ 4,5:1), funcionar sobre a filmagem (ginásio de paredes de vidro, luz lateral, corpos pequenos no quadro), e ler
bem em miniatura de Instagram.

### 2. Logo

Hoje o logo é só tipografia: "HAND / STAND / FEST" em Archivo estendida, com "Hand" no acento, uma barra vertical à
esquerda e um quadrado com "1º" em Space Mono. Funciona no hero do site; falta um **símbolo** que sirva de avatar
do Instagram, selo no cartão final dos vídeos, carimbo no pôster e estampa de camiseta.

Pontos a decidir:
- Símbolo figurativo (corpo em parada de mão, mãos, pés) ou geométrico (as barras e blocos que já usamos)? Marcas
  de handstand costumam usar a silhueta invertida; queremos algo que não pareça academia nem circo.
- Como tratar o **"1º"**: faz parte do logo (e muda a cada edição) ou é um selo separado?
- Versões: horizontal, empilhada, símbolo só, monocromática, sobre stage e sobre paper.
- Convivência com conteúdo que não é o festival (artigos, encontros), já que é uma marca só.

### 3. Fotografia e tratamento

- Alguns clipes ficaram com brilho estourado depois do tone-map HDR → SDR (notas em `src/festival/ig/PECAS.md`).
- O Paulo quer testar preto e branco, sépia ou outro grade em algumas peças, não em todas. Qual look de foto combina
  com a palheta escolhida? (Hoje o hero e o cartão dos professores usam um grade com grão.)
- Próxima filmagem: mais perto, celular na altura do quadril, uma tomada por figura.

### 4. Fora do design (pendências do Paulo)

Comprar `handstandfest.com.br` (Registro.br), criar `@handstandfest`, criar o evento no Sympla, checar o nome no
INPI (classes 41 e 35), confirmar quem é quem nos vídeos (ver `CLAUDE.md`), texto longo do FAQ.

## Estudo visual local — 10/11/2026 (proposta, não aprovado)

- Prancha e assets: `design/handstandfest-identity-01/index.html` (abrir localmente).
- Recomendação do estudo: **B**, mantendo os sete tokens atuais. Símbolo preferido para desenvolver: **Apoio**,
  comparado a **Corpo aberto** e **F invertido**. Paleta e logo continuam abertos à decisão de Paulo e Gabriel.
- `1º` proposto como selo de edição separado; assinatura permanente sem data ou cidade.
- Entregas: hero, story 1080×1920, prova A3, avatar, três famílias de logo (horizontal, empilhada, símbolo,
  monocromáticas, sobre paper e stage), SVGs em curvas, PNGs, tokens e contrastes recalculados.
- Foto real: `public/festival/ig/still-dupla.webp`; nenhum corpo gerado. Looks são simulações sobre o derivado SDR,
  não recuperação de altas luzes. A3 ainda precisa de original de maior resolução, sangria e prova de cor.
- Auditoria: A = **4,493:1** (o antigo 1,5 não corresponde aos hex atuais); B = **5,685:1**;
  C/G = **5,689:1**; D = **4,527:1** acento/stage, mas **4,346:1** branco/acento; E = **8,379:1**;
  F = **1,865:1**. Todos os pares ink/paper superam 7:1. Não arredondar para aprovar um limiar.
- Nada publicado e nenhum CSS/componente de produção alterado. Scripts de geração e instruções ficam junto do estudo.

## Rodada 2 — F invertido e HF em pé (proposta, não aprovada)

- Estudo: `design/handstandfest-identity-02/index.html`. Seletores independentes de logo e paleta mostram quatro
  combinações, cada uma com hero, story, pôster A3 e avatar, além das assinaturas horizontal/empilhada e monocromáticas.
- O **F invertido** mantém o desenho da rodada anterior. O **HF em pé** usa duas letras separadas, hastes de 20,
  altura de 80 e intervalo de 16 unidades; não há letra virada ou ligatura.
- Nova paleta **ameixa + manteiga + creme**: paper `#f6f0e8`, ink `#302b32`, stage `#4c3b49`, accent `#e5cc91`,
  accent-ink `#302b32`, muted `#d7cbd0`, live `#e5cc91`. Contrastes: acento/stage **6,593:1**, ink/paper
  **12,224:1**, texto/acento **8,817:1**. B fica como comparação, com lima restrito a pequenos detalhes.
- A mudança é também de composição: mais papel, títulos menores, menos blocos chapados, foto real em cor natural.
  Após a revisão de visibilidade do acento, os avatares padrão usam accent sobre stage; a versão sobre paper segue disponível. A exigência antiga de acento ácido não é mais uma restrição nesta exploração.
- Recomendação desta rodada: desenvolver **HF + ameixa**; é uma opinião do estudo, não uma escolha de Paulo/Gabriel.
- Correção da comparação: a prancha de logos e a interface agora acompanham o seletor; lima/manteiga ganharam
  presença no avatar, no selo da edição, no play e na data do pôster.
- Rodada 1 preservada. Nada publicado; A3 segue como prova visual RGB, sem preparação final para gráfica.

## Prompt para o Astra (brief da rodada 1; considerar a revisão da rodada 2 acima)

Copiar daqui para baixo. Ele pode abrir o site (os links são públicos) e ver as palhetas ao vivo.

---

Estou organizando o **1º HandstandFest**, o primeiro festival de handstand (parada de mão) do Brasil: três dias em
São Paulo, de 16 a 18 de abril de 2027, num ginásio de circo chamado Trapézio Voador, 60 vagas, para quem treina
handstand em qualquer nível. Somos dois organizadores. A marca é uma só, HandstandFest, e vai durar além do evento:
o mesmo site e o mesmo Instagram vão publicar artigos, notícias e encontros entre uma edição e outra. O tom é
comunidade e energia, não competição e não venda agressiva.

Quero sua ajuda com três coisas: julgar as palhetas candidatas (ou propor outra), propor um logo e sugerir o
tratamento das fotos. Trabalhe só com o que descrevo aqui; não invente fatos sobre o evento.

**O que já está decidido e não muda:**
- Tipografia: Archivo peso 900 estendida (largura 125%) em caixa alta para títulos; Space Mono para datas, etiquetas e
  números. Geometria dura: barras, blocos e formas em T. Cantos pouco arredondados.
- Linguagem de rede social dentro do site: barras de progresso de story, selos de play, "destaques" de perfil usados
  como abas, um ponto "agora" no lote de ingressos aberto.
- As fotos e vídeos são nossos, de treino real (ginásio com paredes de vidro, luz lateral, corpos pequenos no quadro).
  Nada de imagem gerada por IA no produto final; mockups seus são bem-vindos só para avaliar.
- Regra: nenhuma barra, bloco ou texto cobre o corpo de quem está na parada. Os pés ficam no topo-centro das fotos.
- Site atual, com as palhetas ao vivo: https://balanceatlas.com/festival/?paleta=b (troque a letra de `a` a `g`).
  Peças de Instagram em andamento: https://balanceatlas.com/festival/instagram/?paleta=b

**Tokens de cor que o site usa** (me devolva propostas nesses mesmos nomes): `paper` (fundo claro), `ink` (texto),
`stage` (fundo escuro das fotos e do hero), `accent` (cor de ação: botões, "Hand" do logo, barras), `accent-ink`
(texto sobre o acento), `muted` (cor de apoio), `live` (pistas de rede social; pode ser igual ao acento).

**Candidatas:**
- A: paper #f4f1ea, ink #151515, stage #222220, accent #ff3b30, accent-ink #151515, muted #8a8986. Concreto escuro
  com vermelho. Problema: o vermelho sobre o stage tem contraste 4,493:1, abaixo de 4,5:1 sem arredondar.
- B (padrão hoje): paper #f2efe6, ink #111111, stage #2b3cf0, accent #d7f55a, accent-ink #111111, muted #c9c5ba.
  Cobalto com lima. Foi a primeira numa pesquisa de marcas de evento esportivo: energia, 5,7:1, lê como rede social.
- C: paper #f4f1ea, ink #0f2a24, stage #0f3d33, accent #ff8fb8, accent-ink #0f2a24, muted #8ed8e8. Verde profundo com
  rosa. Um organizador gostou; o outro achou séria demais.
- D: paper #edebe6, ink #0b0b0c, stage #0b0b0c, accent #7c5cff, accent-ink #ffffff, muted #5cf2b5. Preto com violeta.
  Segunda na pesquisa; acento/stage 4,527:1, mas branco/acento 4,346:1 reprova texto normal de botão.
- E: paper #f6f1e4, ink #0f2a24, stage #0f3d33, accent #ffd23f, accent-ink #0f2a24, muted #ffb86b. Verde com amarelo
  sol. Melhor contraste (8,4:1), mas verde e amarelo podem remeter à bandeira do Brasil.
- F: paper #f4f1ea, ink #0b2a21, stage #1b7a5a, accent #ff6a4d, accent-ink #0b2a21, muted #ffd9c9. Verde médio com
  coral. Contraste do acento sobre o stage reprova (1,9:1).
- G: a C com `live` = #d7f55a (lima), para tirar a seriedade sem trocar a base.

Regras que tiramos da pesquisa: evento de competição usa preto mais uma cor ácida (HYROX, Spartan); evento de
comunidade usa cor quente sobre fundo claro. Queremos stage escuro mas não preto, acento ácido, papel quente. Evitar
laranja, que é a cor do festival de handstand de Rosario, na Argentina, a referência mais próxima. Nenhum acento
serve como texto sobre o papel.

**O que eu quero de você:**

1. **Palheta.** Julgue as sete com critérios explícitos: energia sem competição, contraste WCAG (acento sobre stage
   ≥ 4,5:1; texto sobre paper ≥ 7:1), comportamento sobre foto de ginásio com luz lateral, leitura em miniatura de
   Instagram, distância das marcas de academia e de circo. Escolha uma e diga por quê. Se nenhuma for boa, proponha
   uma oitava com os sete tokens em hex e os contrastes calculados. Mostre a escolhida aplicada em: hero do site
   (título empilhado sobre foto escura), um story 1080x1920 com barra de progresso e selo de play, um pôster A3 e um
   avatar de Instagram.

2. **Logo.** Hoje é só tipografia: "HAND / STAND / FEST" empilhado em Archivo estendida, "Hand" na cor de acento,
   uma barra vertical à esquerda e um quadradinho com "1º" em Space Mono. Falta um símbolo que funcione sozinho
   como avatar, selo no fim dos vídeos e estampa de camiseta. Proponha três direções bem diferentes (por exemplo:
   uma figurativa com o corpo invertido, uma só com as barras e blocos que já usamos, uma tipográfica com o "H"
   ou o "F" virados), cada uma com a versão horizontal, a empilhada, o símbolo isolado e a monocromática, sobre
   stage e sobre paper. Diga como tratar o "1º": dentro do logo (muda a cada edição) ou como selo separado. Lembre
   que a marca também assina artigos e encontros fora do festival; o logo não pode gritar "evento de abril".

3. **Fotos.** Com a palheta escolhida, sugira um tratamento de foto e vídeo (grão, contraste, cor ou preto e branco
   ou sépia) e diga em que situações usar cada um. Nossas filmagens tendem a estourar as altas luzes por causa das
   paredes de vidro; leve isso em conta.

Formato da resposta: primeiro a decisão de palheta em uma frase, depois os tokens em hex, depois as imagens, depois
as três direções de logo, depois o tratamento de foto. Cite as suposições que você fez.

---

## Rodada 3 — pranchas PNG e logo com moldura (proposta)

Paulo pediu um PNG por paleta atual, alternativas ao fundo muito claro e algo envolvendo o HF para que não pareça apenas duas letras. Pranchas em `design/handstandfest-identity-03/pranchas/`: cobalto/lima e ameixa/manteiga, cada uma com logo em bloco e contorno, F invertido emoldurado como alternativa, hero, story, pôster e avatar. Três fundos: paper, muted (mineral) e stage inteiro. Aplicações centradas no HF; escolha final ainda aberta.


## Rodada 4 — C e D revisitadas (proposta)

Paulo pediu mais duas pranchas retomando paletas anteriores. Comentário mais recente: verde/rosa parece um pouco carnavalesco; testar outros tons e fundos. A C era a preferida do Gabriel; D ficou em segundo na pesquisa. Este comentário atual complementa o registro histórico de que a C parecia séria.

- **C ajustada / verde + rosa antigo:** paper `#f1eee7`, ink e accent-ink `#182c26`, stage `#24473e`, accent/live `#dfb3bb`, muted `#b9c6bc`. Rosa menos saturado e apoio sálvia no lugar do ciano. Acento/stage 5,52:1; ink/paper 12,70:1.
- **D ajustada / grafite + lavanda:** paper `#f0eeea`, ink e accent-ink `#27262e`, stage `#303038`, accent/live `#bdb1de`, muted `#c5c2cf`. Grafite no lugar do preto, lavanda no lugar do violeta elétrico, cinza lilás no lugar do verde-menta. Acento/stage 6,54:1; ink/paper 12,92:1.

Pranchas em `design/handstandfest-identity-04/pranchas/`, com as mesmas aplicações e três fundos da rodada 3. São derivações das candidatas, não substituem seus tokens históricos. Nada aprovado ou publicado.


## Refinamento aplicado e nova rodada de Instagram — 10/11/2026

A pedido do Paulo: data/local antes do vídeo no celular; menos decoração concorrendo com o selo. Saíram a barra externa atrás do hero, a sombra do selo, o grão animado do hero e o ruído nos campos verdes. Letras, selo e pincelada seguem como identidade.

A `/festival/instagram2/` passa a dez exemplos: mais três reels sobre a prática, dois stories de bastidor e um carrossel de cinco imagens estáticas. Cinco gravações adicionais do catálogo, sem repetir as fontes das primeiras peças. Carrosséis desta proposta são somente imagem e texto, inclusive na prévia; manter títulos grandes e reformular quebras antes de diminuir fonte.

Aprendizado reutilizável fora desta marca: playbooks globais `instagram-creation` (conteúdo/composição/revisão) e `videos-remotion` (implementação técnica), complementares. Pesquisa de 24 pautas além do festival registrada na KB como `handstand-instagram-editorial-alem-evento.md`.
