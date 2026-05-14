#!/bin/zsh
# 批量压缩课程视频到 720p Web 优化格式
FFMPEG="/Users/kay/art-platform/scripts/ffmpeg"
NAS_BASE="/Volumes/cc/网站版/基础课"
OUT_DIR="/Users/kay/art-platform/public/videos"
mkdir -p "$OUT_DIR"

compress() {
  local src="$1" out="$2"
  if [ -f "$OUT_DIR/$out" ]; then
    echo "SKIP: $out (exists)"
    return
  fi
  echo "COMPRESS: $out"
  $FFMPEG -i "$NAS_BASE/$src" \
    -vf "scale=1280:720:force_original_aspect_ratio=decrease" \
    -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 96k \
    -movflags +faststart -y "$OUT_DIR/$out" 2>&1 | tail -1
  echo "DONE: $out ($(ls -lh "$OUT_DIR/$out" | awk '{print $5}'))"
}

# Also re-compress first video at CRF 28
compress "1材料预备营/完整版.mp4"         "材料预备营.mp4"
compress "2基础课我的神奇早餐/完整版.mp4" "神奇早餐.mp4"
compress "3基础课动物贴纸/完整版.mp4"     "动物贴纸.mp4"
compress "4基础课动来动去的朋友纸偶课/完整版.mp4" "纸偶课.mp4"
compress "5基础课猜猜我在哪/完整版.mp4"   "拼贴画.mp4"
compress "6基础课手电筒找一找/完整版.mp4" "手电筒空间.mp4"
compress "7基础课我的蝴蝶图鉴/完整版.mp4" "蝴蝶图鉴.mp4"
compress "8基础课四方连续好多好多人/好多人完整版.mp4" "四方连续.mp4"
compress "9基础课我设计的面具/完整版.mp4" "面具设计.mp4"

echo "=== Done ==="
du -sh "$OUT_DIR"
ls -lhS "$OUT_DIR"
