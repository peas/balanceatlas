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

- **Retiros do Balance Atlas**: trazer para este catálogo as fotos e vídeos dos retiros de que o Paulo participou
  (hoje no R2, `media.balanceatlas.com`, com `manifest.json` por evento) e dar a eles cartões na página de
  vocabulário.
