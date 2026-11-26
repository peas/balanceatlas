# Analisador de parada de mão no HF

Portado em 25/11/2026 de `~/paulo.com.br-render`, a pedido do Paulo, para análise e futuros posts. Código reutilizável agora no repositório do HF; não depende do frontend do projeto antigo.

## O que está disponível

- `scripts/handstand/pose.py`: cópia adaptada do extrator MediaPipe Pose Landmarker; full/heavy, amostragem, suavização opcional, recorte e múltiplas pessoas. Origem: script homônimo de paulo.com.br-render. `--model-dir` configurável; rotação automática do OpenCV desativada para não aplicar a rotação duas vezes.
- `src/festival/analysis/geometry.mjs`: conexões e ângulos internos em **pixels**, corrigindo o aspecto da imagem; interpolação somente entre detecções próximas e válidas. Sem segurar um esqueleto antigo durante falhas.
- `AnalysisVideo.tsx`: camada Remotion independente, esqueleto ocre, marcadores e ângulos de ombro, quadril e cotovelo. Lado fixo por take para evitar mudanças artificiais; baixa visibilidade vira “—”. Linha tracejada = vertical da imagem pelo punho, não medida de gravidade nem centro de massa.
- `scripts/handstand/render.py`: MP4/PNG local. Entrada atual: derivado **720×1280, SDR, 30 fps**. Recorte fixo configurável em pixels da fonte; vídeo e pose recebem a mesma transformação. Não esticar um recorte de proporção diferente da janela 900×1500.
- Testes: `node scripts/handstand/geometry.test.mjs`.

## Preparação e execução

Guardar original intacto, hash, derivado SDR, JSON da pose, props do render e resultado separadamente. Todos em `local/`, fora do Git. Catálogo aponta para o original e os derivados. Modelos MediaPipe ficam em `local/modelos/`; copiar os `.task` já disponíveis em paulo.com.br-render ou configurar `--model-dir`. Dependências fixadas em `scripts/handstand/requirements.txt`: mediapipe, opencv-contrib-python, numpy (ambiente existente: `~/ciencia/tamanhodouniverso/.venv-rosto/bin/python`). Os dois modelos já foram copiados para `local/modelos/` neste checkout, mas não são versionados. Não presumir modelo embutido no repo.

Para HDR HLG do Pixel: ffmpeg-full com scale → zscale linear npl=203 → primárias bt709 → tonemap mobius desat=2 → bt709/yuv420p. Remover metadados de localização do derivado; manter original privado. Uniformizar a linha do tempo a 30 fps antes da detecção. Rotação já aplicada no derivado: inventário `rotacao: 0`.

```sh
python scripts/handstand/pose.py ID --modelo heavy --model-dir local/modelos --passo 2 --fontes /caminho/sources.json --raiz /caminho/pasta --saida /caminho/pasta
python3 scripts/handstand/render.py local/festival/analysis/paulo-20261125 --pose paulo-20261125.json --still 360
python3 scripts/handstand/render.py local/festival/analysis/paulo-20261125 --pose paulo-20261125.json
```

`sources.json` é lista de `{id, arquivo, fps, rotacao}`. Saída: `{fonte,fps,w,h,passo,suave,modelo,quadros:[{t,pose?}]}`; pose tem 33 pontos `[x,y,z,visibility]`, x/y normalizados ao quadro em pé, t em segundos do derivado (mesma origem temporal neste teste).

## Como interpretar e revisar

Estimativas **2D**, não diagnóstico, nota de execução, consenso entre escolas ou medição precisa. Perspectiva, lente, roupa, oclusões e inversão podem alterar a detecção. Não importar as antigas afirmações de “erro universal/consenso” do playbook de one-arm como regras para posts do HF. Cues e interpretações técnicas são revisados pelo Gabriel.

De perfil: ângulo do ombro usa punho–ombro–quadril; quadril usa ombro–quadril–joelho; cotovelo usa punho–cotovelo–ombro. Ângulos internos 0–180°: não distinguem por si só arco de flexão nem medem pelvic tilt/escápula. Não usar diferenças de 1–2° como prova de mudança corporal. Parte do movimento da linha vem do detector; observar o vídeo junto.

Filmagem preferida: câmera fixa, corpo inteiro com folga, perfil verdadeiro, câmera aproximadamente na altura do tronco e sem grande angular acentuada. Vista frontal e perfil respondem perguntas diferentes. Revisar vários momentos, mãos/pés, lado escolhido, perdas de detecção e coincidência da camada com o corpo antes de publicar. Analisar fotografia real, nunca gravura gerada.

## Primeiro estudo HF

`paulo-20261125-parada-um-minuto`: 59,6 s, Paulo de perfil, permanência na parada reta/palito com pequenas variações. Descrição enviada pelo Paulo também menciona pike; não rotular automaticamente cada oscilação como mudança de shape. Pauta: **“Parada não é imobilidade”**. Mostrar pequenas variações sem transformar toda diferença em erro. Original com som não revisado; análise exportada sem áudio.

A suavização está desligada neste estudo para não criar atraso da linha sobre o corpo; interpolação entre amostras a 15 Hz serve só para exibição a 30 fps. Guardar os dados brutos para comparação. Não confundir 59,6 s de vídeo com tempo certificado de hold (a entrada/saída não está integralmente documentada).

## Próximos usos

Trechos educativos, freeze com uma medida relevante, comparações do mesmo take e catálogo futuro do Handstand Life. Integrar ao Player quando houver seleção editorial. Detecção no navegador é possibilidade futura, **não implementada**; o Remotion já desenha a camada no client, a detecção deste estudo roda offline. Análise de one-arm, métricas de fase e comparações históricas continuam no projeto de origem, não foram portadas nesta etapa.

## Validação desta entrega
895/895 amostras com detecção (15 Hz); isso mede cobertura, não acurácia anatômica. Cadeia esquerda escolhida por visibilidade maior, sem alternância automática. MP4 H.264 1080×1920, 30 fps, 59,6 s, ~20 MB; frames revisados em 7, 12, 21, 35 e 49 s. Corpo inteiro preservado no recorte fixo. Testes de geometria/ausência de pose, parsing do catálogo e build do projeto passaram. Render local, sem publicação no Instagram.
