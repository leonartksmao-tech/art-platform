"""给技能卡牌图片叠加序号"""
from PIL import Image, ImageDraw, ImageFont
import os

SKILLS_DIR = "public/skills"
FONT_PATH = "/System/Library/Fonts/Helvetica.ttc"

# 卡牌图片列表（按顺序）
CARDS = [
    "shape-generalization.jpg",
    "line-expression.jpg",
    "line-application.jpg",
    "spatial-expression.jpg",
    "occlusion-relationship.jpg",
    "figure-motion.jpg",
    "collage-making.jpg",
    "tile-continuity.jpg",
    "sticker-packaging.jpg",
    "design-basics.jpg",
    "design-fundamentals.jpg",
]

def add_number(image_path, number, output_path):
    img = Image.open(image_path).convert("RGBA")
    w, h = img.size
    draw = ImageDraw.Draw(img)

    # 卡片底部居中区域 — 白色半透明底 + 序数字
    badge_y = int(h * 0.88)
    badge_h = 38
    badge_w = 52

    # 半透明深色底
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)

    # 圆角矩形底
    x0 = (w - badge_w) // 2
    x1 = x0 + badge_w
    y0 = badge_y
    y1 = y0 + badge_h
    overlay_draw.rounded_rectangle(
        [(x0, y0), (x1, y1)],
        radius=10,
        fill=(0, 0, 0, 160),
    )

    # 数字
    try:
        font = ImageFont.truetype(FONT_PATH, 22)
    except OSError:
        font = ImageFont.load_default()

    text = str(number)
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = (w - tw) // 2
    ty = badge_y + (badge_h - th) // 2 - 1
    overlay_draw.text((tx, ty), text, font=font, fill=(255, 255, 255, 255))

    img = Image.alpha_composite(img, overlay)
    img = img.convert("RGB")
    img.save(output_path, "JPEG", quality=92)
    print(f"  {number:2d} → {os.path.basename(output_path)}")


def main():
    base = os.path.join(os.path.dirname(__file__), "..")
    skills = os.path.join(base, SKILLS_DIR)

    print("处理技能卡牌图片...")
    for i, filename in enumerate(CARDS):
        src = os.path.join(skills, filename)
        if not os.path.exists(src):
            print(f"  ⚠ 跳过 {filename} (文件不存在)")
            continue
        add_number(src, i + 1, src)

    print("完成!")


if __name__ == "__main__":
    main()
