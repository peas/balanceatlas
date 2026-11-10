#!/usr/bin/env bash
# Builds the HandstandFest clips (public/festival/) from the duo training videos (11/10/2026).
# Each cut is cropped to 4:5, given the soft natural look (or a moderate black and white) and kept short; transitions,
# slow-mo and overlays happen in the Remotion compositions (src/festival/).
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: scripts/festival_clips.sh SEQUENCE.mp4 STRADDLE.mp4 [OUT_DIR]

  SEQUENCE.mp4  duo synced sequence, portrait 1080x1920 (WA0078, ~60 s)
  STRADDLE.mp4  duo straddle handstands, portrait (WhatsApp 19.44.17, ~23 s)
  OUT_DIR       default: public/festival

Outputs (720x900, 30 fps, no audio):
  seg-1.mp4 .. seg-4.mp4   hero cuts (color)        seg-1.webp  hero poster
  teacher.mp4              straddle in B&W          teacher.webp
Cut points are the `cut` calls at the bottom (name, source, crop, start s, length s).
EOF
}
[[ "${1:-}" == "-h" || "${1:-}" == "--help" || $# -lt 2 ]] && { usage; exit 0; }

SEQ="$1"; STR="$2"; OUT="${3:-public/festival}"
mkdir -p "$OUT"
FIT="scale=720:900:force_original_aspect_ratio=increase,crop=720:900,setsar=1,fps=30"
# Looks since 10/11/2026 (src/festival/MARCA.md): softened natural colour, moderate black and white. No warm cast,
# no vignette, no crushed blacks. The compositions add no filter on top, so the look is baked here.
GRADE="eq=saturation=0.86:contrast=0.96:brightness=0.01"
BW="hue=s=0,eq=contrast=1.06:brightness=0.02"
SEQ_CROP="crop=1080:1350:0:430"                                   # legs at the top, roof beam out
STR_CROP="crop=iw*0.8:iw*0.8*5/4:iw*0.1:ih-iw*0.8*5/4-ih*0.07"   # tighter on the pair

cut() { # name src crop start len look
  ffmpeg -nostdin -v error -y -ss "$4" -t "$5" -i "$2" -vf "$3,$FIT,$6,format=yuv420p" \
    -an -c:v libx264 -preset slow -crf 26 -g 30 -movflags +faststart "$OUT/$1.mp4"
}
still() { # name src crop at look
  ffmpeg -nostdin -v error -y -ss "$4" -i "$2" -frames:v 1 -vf "$3,$FIT,$5" "/tmp/$1.png"
  cwebp -quiet -q 82 -m 6 "/tmp/$1.png" -o "$OUT/$1.webp"
}

cut seg-1 "$SEQ" "$SEQ_CROP" 22 5   "$GRADE"
cut seg-2 "$SEQ" "$SEQ_CROP" 28 4   "$GRADE"
cut seg-3 "$SEQ" "$SEQ_CROP" 33 4.5 "$GRADE"
cut seg-4 "$STR" "$STR_CROP" 9  6   "$GRADE"
cut teacher "$STR" "$STR_CROP" 9 7  "$BW"
still seg-1   "$SEQ" "$SEQ_CROP" 23 "$GRADE"
still teacher "$STR" "$STR_CROP" 13 "$BW"

ls -la "$OUT"/seg-* "$OUT"/teacher.*
