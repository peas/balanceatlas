# Acervo do HandstandFest

Catálogo do material bruto (vídeos e fotos de treino, do Trapézio Voador e dos convites) que alimenta o site e o
Instagram do festival. Exceção à regra de inglês do repositório, como o texto das páginas do festival: o catálogo é
lido pelo Paulo e pelo Gabriel.

**O material em si não entra no git.** Fica em `local/festival/` (gitignored), nesta máquina:

```
local/festival/
  manifest.json      fingerprints: id do Drive, md5, tamanho, duração, hora da captura (evita baixar duas vezes)
  originais/<pasta>/ arquivos como vieram do Drive (HEVC, HDR, 1080x1920 ou 4K)
  fotos/<pasta>/     fotos originais
  proxies/<id>.mp4   540x960, SDR, mesma linha do tempo do original (prévia e análise)
  audio/<id>.wav     16 kHz mono
  folhas/<id>-N.jpg  folhas de contato, um quadro a cada 2 s com o segundo escrito
  pose/<id>.json     MediaPipe (formato do ~/paulo.com.br-render)
  transcricoes/      Whisper local
  analise.json       trechos de ponta-cabeça medidos pela pose
  sync.json          pares iPhone + Pixel filmados ao mesmo tempo, com o offset do áudio
```

## Fluxo quando houver upload novo no Drive

```bash
scripts/festival_acervo.py sync        # baixa só o que não está no manifest (md5, ou nome + tamanho + duração)
scripts/festival_derivados.py          # proxies, áudio e folhas de contato do que faltar
scripts/festival_analise.py tudo       # pose, trechos invertidos, sincronia entre celulares, fala
```

Depois, catalogar os ids novos em `catalogo.yaml` olhando as folhas (`local/festival/folhas/`), o `analise.json`
e as transcrições. Os três scripts têm `--help`.

## catalogo.yaml

Uma lista; um item por arquivo. Tempos em **segundos do arquivo original** (o proxy tem a mesma linha do tempo).

```yaml
- id: img-3174                 # id do manifest
  arquivo: videos-do-trapezio-voador/IMG_3174.MOV
  camera: iphone               # iphone (Gabriel) | pixel (Paulo) | whatsapp (arquivo já comprimido) | foto
  data: 2026-11-04
  hora: "16:24"                # início, horário de São Paulo
  duracao: 189.0
  local: trapezio-sala-vidro   # trapezio-sala-vidro | trapezio-palco | trapezio-externo | parque | outro (dizer qual)
  quem: [Paulo, Gabriel]
  tipo: treino                 # treino | convite | ambiente | bastidor | edicao (vídeo que já veio editado)
  som: ambiente                # fala | ambiente | musica | mudo
  resumo: uma linha dizendo o que é o arquivo
  destaque: 4                  # 1 a 5: quanto serve para o Instagram (5 = imagem forte, limpa, corpo inteiro)
  fala: |                      # só quando há fala: transcrição revisada, literal, [?] onde houver dúvida
    ...
  cenas:
    - de: 3.0
      ate: 21.5
      quem: [Gabriel]
      posicao: straddle        # vocabulário abaixo; pode ser lista
      o_que: sobe em press e abre em straddle, segura firme, desce controlado
      quadro: frente, corpo inteiro   # frente | perfil | 3/4; corpo inteiro ou o que corta; movimento de câmera
      nota: 5                  # 1 a 5, só a imagem deste trecho
  par:                         # mesmo momento no outro celular (de sync.json): t_outro = t_este + offset
    com: pxl-20261104_192358456
    offset: 32.1
  problemas: pés cortados entre 40 e 44 s; gente ao fundo
```

Vocabulário de `posicao`: `reta`, `straddle`, `tuck`, `pike`, `stag`, `press` (subida de força), `chute` (entrada
chutando), `uma-mao`, `troca-de-peso`, `parede`, `andando`, `queda`, `saida`, `dupla` (os dois ao mesmo tempo),
`acro` (um sobre o outro), `aquecimento`, `fala`, `ambiente`. Posição que não couber: escrever por extenso.

Regras: descrever só o que se vê e se ouve (nada inventado); nome de pessoa só quando for certo (Paulo, Gabriel),
senão `praticante`; tempos com uma casa decimal, conferidos nas folhas e no `analise.json`.

## Vocabulário (página local, 05/11/2026)

```bash
scripts/festival_vocabulario.py
```

Abre `http://localhost:4331` com um cartão por trecho do catálogo que tem posição (75 hoje), em loop e aproximado no
corpo pela pose. O Paulo pausa, marca o instante e escreve o nome que usa; na lateral, cada nome vira um termo com
tipo (posição, entrada, saída, transição, movimento), outros nomes e definição. Cada mudança é gravada na hora em
`acervo/vocabulario.yaml` (`termos` e `marcacoes`, com o clipe e o segundo). Nada sai da máquina.

Depois que ele preencher: usar `vocabulario.yaml` para trocar os rótulos provisórios de `posicao` no catálogo pelos
nomes dele e atualizar a lista de vocabulário acima. A página só lê vídeo; para rotular fotos (retiros), falta um
tipo de cartão de imagem.

## A fazer (pedidos do Paulo, 05/11/2026)

- **Retiros do Balance Atlas**: fotos catalogadas em 12/11/2026 (abaixo). Ainda faltam os vídeos dos retiros e cartões de imagem na página de vocabulário.


## Índice visual de fotos — 12/11/2026

A fonte única continua sendo `catalogo.yaml`: **190 registros de imagem**, incluindo as sete fotos do local
já cadastradas e 183 caminhos únicos referenciados pelos retiros em `src/content/retreats/*.md`.
Foram inspecionadas visualmente 189 imagens. `turkey-antalya.webp` retornou HTTP 404; seus campos desconhecidos
ficam `null`, não `false`. Este inventário não inclui automaticamente todo PNG/SVG derivado do site.

Classificação aproximada para descobrir imagens, conforme pedido do Paulo; não é análise biomecânica.
Não rodamos detecção de esqueletos em lote nem identificamos pessoas pelo rosto.

- `midia: imagem`, `camera: foto`: distinguem fotos dos vídeos existentes.
- `resumo`: descrição curta do que está visível.
- `handstand`: `true` quando há pelo menos uma pessoa em parada de mãos; `false` quando não há.
  Apoio sobre a cabeça (`apoio-cabeca`) fica separado, com `handstand: false` se ninguém estiver em parada de mãos.
- `pessoas`: total aproximado de pessoas visíveis, incluindo observadores e corpos parciais.
- `pessoas_em_handstand`: quantas estão em parada de mãos.
- `forma`: lista de formas visíveis, podendo conter várias numa foto: `reta`, `straddle`, `tuck`, `stag`,
  `uma-mao`, `diamond`, `mexicano`; outros apoios incluem `apoio-cabeca`, `sapinho`, `ponte`, `v-sit`, `prancha`.
  Lista vazia quando não identificável ou não aplicável. Foto isolada não comprova entrada/press ou movimento.
- `grupo_em_handstand`: pelo menos duas pessoas em parada de mãos.
- `todos_em_handstand`: todos os visíveis em parada de mãos; também pode ser verdadeiro para uma pessoa sozinha.
- `atividade`: aula, demonstração, mobilidade, convivência etc.
- `corpo`: `inteiro` ou `parcial`, referente ao sujeito principal.
- `uso_sugerido`: candidatos a post, ilustração de exercício, recorte/gravura ou treino coletivo;
  é sugestão para triagem, não aprovação automática de qualidade ou uso.
- `revisao_visual`: data, método, precisão e estado; observações quando há ambiguidade.
- `url`, `referencias`, `largura`, `altura`, `sha256`: origem e metadados para reencontrar o arquivo.

### Consultar e manter

Requer Python 3, Pillow e Ruby do sistema (o mesmo leitor YAML do vocabulário). A partir da raiz:

```bash
python3 scripts/festival_image_index.py --validate --summary
python3 scripts/festival_image_index.py --list --handstand true --people 1 --whole-body
python3 scripts/festival_image_index.py --list --shape straddle
python3 scripts/festival_image_index.py --list --group --all-in-handstand
python3 scripts/festival_image_index.py --json --use recorte-gravura
```

`--json` exporta uma seleção derivada; editar sempre o YAML. `--prepare` atualiza inventário técnico e folhas
de contato em `local/image-index/`, sem alterar classificações. Novas referências precisam de revisão visual
e inclusão no catálogo. Downloads e folhas ficam fora do git. Conferir a imagem maior nos casos ambíguos,
principalmente mãos/cabeça apoiadas, pessoas pequenas ao fundo e membros cortados.

O detector opcional existente em `~/paulo.com.br-render/scripts/pose.py` pode apoiar um caso específico,
mas não é pré-requisito para este índice. Consultar primeiro estes rótulos ao escolher imagens para Instagram,
exercícios ou gravuras; confirmar visualmente a seleção final.

## Lote Gabriel — 12/11/2026

Adicionados ao mesmo `catalogo.yaml`: **9 vídeos e 11 imagens** recebidos pelo Paulo (IDs `gabriel-img-*`).
Agora são 201 imagens no catálogo, das quais 200 revisadas e uma URL indisponível. Originais e metadados
ficam em `local/festival/gabriel-2026-11-12/`; ingestão repetível via `scripts/festival_gabriel.py`.
As formas e contagens são aproximadas; quem aparece em grupo não foi identificado automaticamente.
Os vídeos foram inspecionados por folhas a cada 2 s; o som está marcado como não revisado.

Selecionados: IMG_3372 e IMG_3377 (Reels com freeze), IMG_8751 (gravura) e IMG_7876 (foto em cor).
Tempos, render e aplicações: `design/handstandfest-arte/2026-11-12-gabriel/README.md`.

## Gravuras e imagens processadas

[`gravuras.json`](gravuras.json) é o índice separado de derivados artísticos reutilizáveis: oito figuras
hachuradas sem tinta embutida e duas composições de cenário. Inclui fonte do catálogo/manifesto, prompt,
PNG mestre, WebP público, dimensões, alpha, hash, formas, usos e estado de revisão. Os originais seguem em
`catalogo.yaml`; não duplicar a descrição do bruto em um segundo catálogo. Máscaras e filtros procedurais
não são gravuras anatômicas; a cena híbrida não é um recorte transparente. Ao adicionar nova figura, manter
os caminhos relativos à raiz do repo e conferir a existência/alpha do arquivo e o vínculo à fonte.
A página de Instagram tem uma galeria do índice em `#gravuras`. Tinta separada é a opção preferida; para
camisetas, verificar resolução na dimensão física e fazer prova, não chamar o PNG de arte vetorial.

## Lote natureza e piscina — 12/11/2026

Seleção de oito vídeos + quatro fotos novas, e um JPEG original de maior resolução ligado a `photo-thailand-2026-56`. Total de imagens: **205** (204 revisadas, uma URL indisponível). Nove cortes prontos + cinco WebPs na galeria local `local/festival/natureza-2026-11-12/index.html`. Receita, seleção prioritária e limites: [lotes/natureza-2026-11-12.md](lotes/natureza-2026-11-12.md). Classificação e tempos permanecem no catálogo; o JSON do lote registra ingestão/deduplicação e decisões sobre os descartados da seleção. `cortes` referencia derivados separados: tempos são do original, `freeze_corte` é relativo ao MP4 cortado. Nenhum original foi apagado ou publicado.
