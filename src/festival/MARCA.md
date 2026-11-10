# Marca do HandstandFest: decisões, dúvidas abertas e brief para design

Em pt-BR, como o texto do festival: é o documento que o Paulo leva para outras ferramentas de design (Astra) e
lê com o Gabriel. Atualizar aqui a cada decisão; o `CLAUDE.md` do repo aponta para cá.

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
| A | #f4f1ea | #151515 | #222220 | #ff3b30 | #151515 | #8a8986 | original, concreto + vermelho; acento sobre stage reprova contraste (1,5:1) |
| B (padrão) | #f2efe6 | #111111 | #2b3cf0 | #d7f55a | #111111 | #c9c5ba | cobalto + lima; 1º na pesquisa (energia, 5,7:1, lê como rede social) |
| C | #f4f1ea | #0f2a24 | #0f3d33 | #ff8fb8 | #0f2a24 | #8ed8e8 | verde profundo + rosa; **o Gabriel gostou**, o Paulo achou séria |
| D | #edebe6 | #0b0b0c | #0b0b0c | #7c5cff | #ffffff | #5cf2b5 | preto + violeta; 2º na pesquisa, acento no limite (4,5:1) |
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

## Prompt para o Astra

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
  com vermelho. Problema: o vermelho sobre o stage tem contraste 1,5:1.
- B (padrão hoje): paper #f2efe6, ink #111111, stage #2b3cf0, accent #d7f55a, accent-ink #111111, muted #c9c5ba.
  Cobalto com lima. Foi a primeira numa pesquisa de marcas de evento esportivo: energia, 5,7:1, lê como rede social.
- C: paper #f4f1ea, ink #0f2a24, stage #0f3d33, accent #ff8fb8, accent-ink #0f2a24, muted #8ed8e8. Verde profundo com
  rosa. Um organizador gostou; o outro achou séria demais.
- D: paper #edebe6, ink #0b0b0c, stage #0b0b0c, accent #7c5cff, accent-ink #ffffff, muted #5cf2b5. Preto com violeta.
  Segunda na pesquisa; acento no limite de contraste (4,5:1).
- E: paper #f6f1e4, ink #0f2a24, stage #0f3d33, accent #ffd23f, accent-ink #0f2a24, muted #ffb86b. Verde com amarelo
  sol. Melhor contraste (8,4:1), mas verde e amarelo viram bandeira do Brasil.
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
