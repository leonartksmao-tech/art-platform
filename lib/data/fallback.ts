export const FALLBACK_COURSES = [
  {
    id: "picture-book",
    title: "创意绘本课",
    description:
      "21 节 AI 融合创作课，从图形概括、色彩叙事到综合创作。每节课一个核心思维 + 一个物理互动形式 + AI 协作工作流，系统培养 AI 时代的小创作者。",
    category: "CREATIVE" as const,
    lessonCount: 21,
    sortOrder: 1,
    isPublished: true,
    lessons: [
      { id: "seed-l1", title: "马和草原", coreThinking: "拆解力——再复杂的物体都能通过图形重组", sortOrder: 1, workflowType: "sketch-refine", image: "/works/sticker/img20250912_20082796.jpg" },
      { id: "seed-l2", title: "小小的我", coreThinking: "视角转换力——彻底颠覆视角，培养对生活细节的敏锐捕捉力", sortOrder: 2, workflowType: "sketch-refine", image: "/works/doll/img20251031_13404933.jpg" },
      { id: "seed-l3", title: "从地心到星河", coreThinking: "色彩叙事力——认识从冷到暖、从地心到宇宙的色彩光谱", sortOrder: 3, workflowType: "color-compare", image: "/works/butterfly/img20251031_13551636.jpg" },
      { id: "seed-l4", title: "虫虫的家", coreThinking: "导演思维——为角色设计一个完整的'家'空间", sortOrder: 4, workflowType: "spatial-factory", image: "/works/breakfast/1.jpg" },
      { id: "seed-l5", title: "吃点什么", coreThinking: "逻辑链——从食材到成品，把烹饪逻辑转化成视觉画面", sortOrder: 5, workflowType: "style-transfer", image: "/works/breakfast/enen.jpg" },
      { id: "seed-l6", title: "故事卡牌", coreThinking: "系统思维——把故事拆成起点、中间和终点三个系统要素", sortOrder: 6, workflowType: "expression-solver", image: "/works/mask/DSC02232.jpg" },
      { id: "seed-l7", title: "我设计的文字", coreThinking: "符号化能力——设计属于自己的文字符号系统", sortOrder: 7, workflowType: "sketch-refine", image: "/works/pattern/111.jpg" },
      { id: "seed-l8", title: "情绪的颜色", coreThinking: "情感表达力——用形状和色彩表达情绪状态", sortOrder: 8, workflowType: "color-compare", image: "/works/butterfly/img20251031_14034476.jpg" },
      { id: "seed-l9", title: "地图与迷宫", coreThinking: "空间逻辑——设计完整自洽的奇幻地图", sortOrder: 9, workflowType: "spatial-factory", image: "/works/pattern/澄.jpg" },
      { id: "seed-l10", title: "未来的我", coreThinking: "人物塑造力——创造一个未来世界的自己", sortOrder: 10, workflowType: "character-consistency", image: "/works/doll/img20251031_13355815.jpg" },
      { id: "seed-l11", title: "声音看得见", coreThinking: "通感转换——把听觉信息转译成视觉语言", sortOrder: 11, workflowType: "expression-solver", image: "/works/butterfly/img20251031_14022001.jpg" },
      { id: "seed-l12", title: "我的豆豆本", coreThinking: "综合创作——把多节课作品整合成一本完整的绘本", sortOrder: 12, workflowType: "tile-verify", image: "/works/mask/0bf7d676dbe865008bb6c2995e40d3d1.jpg" },
      { id: "seed-l13", title: "图形的秘密", coreThinking: "图形概括——万事万物都可还原为基本图形", sortOrder: 13, workflowType: "sketch-refine", image: "/works/sticker/img20250912_20114460.jpg" },
      { id: "seed-l14", title: "人体解构", coreThinking: "结构思维——用关节和比例解构复杂人体", sortOrder: 14, workflowType: "character-consistency", image: "/works/doll/img20251031_13473374.jpg" },
      { id: "seed-l15", title: "色彩实验室", coreThinking: "色环技法——认识原色、间色、互补色的科学规律", sortOrder: 15, workflowType: "color-compare", image: "/works/butterfly/img20251031_13572932.jpg" },
      { id: "seed-l16", title: "纹理博物馆", coreThinking: "质感表达——收集并再现自然和人工物的表面纹理", sortOrder: 16, workflowType: "texture-reference", image: "/works/mask/DSC02018.jpg" },
      { id: "seed-l17", title: "空间搭建", coreThinking: "透视入门——建立近大远小、前后遮挡的空间意识", sortOrder: 17, workflowType: "spatial-factory", image: "/works/pattern/img055.jpg" },
      { id: "seed-l18", title: "角色设计", coreThinking: "人物设计——从性格出发设计角色外观", sortOrder: 18, workflowType: "character-consistency", image: "/works/doll/img20251031_13511298.jpg" },
      { id: "seed-l19", title: "图案连续", coreThinking: "四方连续——理解重复、镜像、旋转的装饰规律", sortOrder: 19, workflowType: "tile-verify", image: "/works/pattern/吴若浠.jpg" },
      { id: "seed-l20", title: "立体造型", coreThinking: "3D 思维——从平面到立体，训练体块转换能力", sortOrder: 20, workflowType: "spatial-factory", image: "/works/mask/0ed81e087e9329b5ca6e385df1905d80.jpg" },
      { id: "seed-l21", title: "我的品牌", coreThinking: "综合设计——把全课程技能整合成一个个人品牌", sortOrder: 21, workflowType: "style-transfer", image: "/works/sticker/img20250912_20150879.jpg" },
    ],
  },
];

export const FALLBACK_TEACHER_WORKS = [
  {
    id: "teacher-breakfast",
    title: "吃点什么 · 教师示范",
    story: "猫猫老师用食物拼贴的方式，示范如何把日常生活变成视觉艺术。从食材选择到色彩搭配，每一步都在训练孩子的「逻辑链」思维。",
    finalWorkUrl: "/works/teacher/img049.jpg",
    gallery: ["/works/teacher/img049.jpg", "/works/teacher/img050.jpg"],
    likesCount: 86,
    commentsCount: 12,
    isFeatured: true,
    createdAt: "2026-02-10T09:00:00Z",
    profile: { nickname: "猫猫老师" },
    lesson: { title: "吃点什么" },
  },
  {
    id: "teacher-butterfly",
    title: "蝴蝶 · 教师示范",
    story: "对称是自然界的魔法。猫猫老师用一只蝴蝶的创作过程，展示了如何用图形概括 + 色彩渐变构建出翅膀的层次感。",
    finalWorkUrl: "/works/teacher/蝴蝶.jpg",
    gallery: ["/works/teacher/蝴蝶.jpg"],
    likesCount: 72,
    commentsCount: 9,
    isFeatured: true,
    createdAt: "2026-02-15T10:30:00Z",
    profile: { nickname: "猫猫老师" },
    lesson: { title: "蝴蝶" },
  },
  {
    id: "teacher-doll",
    title: "人偶制作 · 教师示范",
    story: "从身体结构到服饰搭配，猫猫老师示范如何用关节纸偶把人体知识变成一场可动可玩的创作游戏。",
    finalWorkUrl: "/works/teacher/img20251031_13423301.jpg",
    gallery: [
      "/works/teacher/img20251031_13423301.jpg",
      "/works/teacher/img20251031_13430651.jpg",
      "/works/teacher/img20251031_13450053.jpg",
      "/works/teacher/img20251031_13462383.jpg",
    ],
    likesCount: 65,
    commentsCount: 8,
    isFeatured: true,
    createdAt: "2026-02-20T14:00:00Z",
    profile: { nickname: "猫猫老师" },
    lesson: { title: "人偶制作" },
  },
  {
    id: "teacher-mask",
    title: "面具设计 · 教师示范",
    story: "面具是角色创造的终极挑战。猫猫老师示范如何用几何分割 + 装饰元素设计一个充满戏剧张力的面具。",
    finalWorkUrl: "/works/teacher/DSC02116.JPG",
    gallery: ["/works/teacher/DSC02116.JPG", "/works/teacher/DSC02018.jpg"],
    likesCount: 91,
    commentsCount: 15,
    isFeatured: true,
    createdAt: "2026-03-01T09:00:00Z",
    profile: { nickname: "猫猫老师" },
    lesson: { title: "我设计的面具" },
  },
  {
    id: "teacher-sticker",
    title: "动物贴纸 · 教师示范",
    story: "如何把复杂的动物简化成有辨识度的贴纸？猫猫老师用图形概括法，把每个动物拆解成基本图形再重组。",
    finalWorkUrl: "/works/teacher/img20251016_14102913.jpg",
    gallery: ["/works/teacher/img20251016_14102913.jpg", "/works/teacher/e95d6686.jpg"],
    likesCount: 78,
    commentsCount: 11,
    isFeatured: true,
    createdAt: "2026-03-05T11:00:00Z",
    profile: { nickname: "猫猫老师" },
    lesson: { title: "动物贴纸" },
  },
  {
    id: "teacher-pattern",
    title: "四方连续 · 教师示范",
    story: "从单元图形到无限延伸的图案，猫猫老师示范四方连续的底层逻辑——重复、镜像、旋转，三种方式让简单的图形变成漂亮的布料设计。",
    finalWorkUrl: "/works/teacher/111.jpg",
    gallery: ["/works/teacher/111.jpg", "/works/teacher/img053.jpg"],
    likesCount: 83,
    commentsCount: 14,
    isFeatured: true,
    createdAt: "2026-03-10T15:30:00Z",
    profile: { nickname: "猫猫老师" },
    lesson: { title: "四方连续" },
  },
];

export const FALLBACK_WORKS = [
  // 吃点什么 — 学生作品
  { id: "sw-breakfast-1", title: "我的神奇早餐", story: "用食物拼出一幅可以吃的画——面包是天空，鸡蛋是太阳，蔬菜变成了小动物。每一口都是一个故事。", finalWorkUrl: "/works/breakfast/1.jpg", gallery: ["/works/breakfast/2.jpg", "/works/breakfast/3.jpg"], likesCount: 24, commentsCount: 5, isFeatured: true, createdAt: "2026-03-15T08:00:00Z", profile: { nickname: "小厨神乐乐" }, lesson: { title: "吃点什么" } },
  { id: "sw-breakfast-2", title: "早餐动物园", story: "把三明治变成了海底世界，海苔是海草，胡萝卜切成小鱼——一口吃掉整个海洋！", finalWorkUrl: "/works/breakfast/enen.jpg", gallery: ["/works/breakfast/4.jpg", "/works/breakfast/5.jpg"], likesCount: 18, commentsCount: 3, isFeatured: false, createdAt: "2026-03-20T10:30:00Z", profile: { nickname: "创意小可" }, lesson: { title: "吃点什么" } },
  { id: "sw-breakfast-3", title: "色彩早餐拼盘", story: "妈妈的早餐变成了我的画布，每一种食物都是一种颜色，拼在一起就是最好看的早餐画。", finalWorkUrl: "/works/breakfast/nini.jpg", gallery: ["/works/breakfast/img20251016_14092309.jpg", "/works/breakfast/img20251016_14041318.jpg"], likesCount: 15, commentsCount: 4, isFeatured: false, createdAt: "2026-04-05T09:00:00Z", profile: { nickname: "妮妮小画家" }, lesson: { title: "吃点什么" } },

  // 蝴蝶 — 学生作品
  { id: "sw-butterfly-1", title: "梦幻蝴蝶翅膀", story: "用对称的花纹和渐变色设计了独一无二的蝴蝶翅膀，每一片鳞片都是自己画的。", finalWorkUrl: "/works/butterfly/img20251031_13551636.jpg", gallery: ["/works/butterfly/img20251031_14022001.jpg", "/works/butterfly/img20251031_14030122.jpg"], likesCount: 31, commentsCount: 8, isFeatured: true, createdAt: "2026-04-02T14:00:00Z", profile: { nickname: "色彩大师航航" }, lesson: { title: "蝴蝶" } },
  { id: "sw-butterfly-2", title: "彩虹蝴蝶", story: "左边和右边的花纹要一模一样才好看，我学会了对称设计，这只蝴蝶可以飞起来了。", finalWorkUrl: "/works/butterfly/img20251031_14034476.jpg", gallery: ["/works/butterfly/img20251031_13572932.jpg", "/works/butterfly/img20251031_14013946.jpg"], likesCount: 15, commentsCount: 4, isFeatured: false, createdAt: "2026-04-05T09:00:00Z", profile: { nickname: "小小设计师" }, lesson: { title: "蝴蝶" } },

  // 人偶制作 — 学生作品
  { id: "sw-doll-1", title: "关节纸偶", story: "用卡纸和两脚钉做的小人偶，手脚都能动，穿上了我自己设计的衣服，头发是用妈妈的毛线编的。", finalWorkUrl: "/works/doll/img20251031_13404933.jpg", gallery: ["/works/doll/img20251031_13473374.jpg", "/works/doll/img20251031_13481917.jpg"], likesCount: 22, commentsCount: 6, isFeatured: true, createdAt: "2026-03-28T11:00:00Z", profile: { nickname: "巧手果果" }, lesson: { title: "人偶制作" } },
  { id: "sw-doll-2", title: "时装人偶", story: "给纸偶设计了一套彩虹连衣裙，搭配了同色系的小包包和发饰，我的小人偶是世界上最时髦的。", finalWorkUrl: "/works/doll/img20251031_13355815.jpg", gallery: ["/works/doll/img20251031_13511298.jpg", "/works/doll/img20251031_13520186.jpg"], likesCount: 28, commentsCount: 7, isFeatured: false, createdAt: "2026-04-10T16:00:00Z", profile: { nickname: "小小裁缝" }, lesson: { title: "人偶制作" } },

  // 我设计的面具 — 学生作品
  { id: "sw-mask-1", title: "戏剧面具", story: "设计了一个充满戏剧感的面具，用了金色和银色的颜料，戴上去就像从童话里走出来的人物。", finalWorkUrl: "/works/mask/DSC02232.jpg", gallery: ["/works/mask/DSC02008.jpg", "/works/mask/dqs 2025-11-08 172743.492.jpg"], likesCount: 35, commentsCount: 9, isFeatured: true, createdAt: "2026-04-15T09:30:00Z", profile: { nickname: "面具大师" }, lesson: { title: "我设计的面具" } },
  { id: "sw-mask-2", title: "奇幻面具", story: "用羽毛、亮片和彩纸做了一只孔雀面具，戴上它就可以变身成森林之王。", finalWorkUrl: "/works/mask/DSC02018.jpg", gallery: ["/works/mask/e29dd11b0b82b70012f629edf21e690c.jpg", "/works/mask/DSC02035.jpg"], likesCount: 19, commentsCount: 4, isFeatured: false, createdAt: "2026-04-18T14:30:00Z", profile: { nickname: "孔雀公主" }, lesson: { title: "我设计的面具" } },
  { id: "sw-mask-3", title: "几何面具", story: "用几何图形设计的抽象面具，三角形是眼睛，菱形是嘴巴——数学和艺术的完美结合。", finalWorkUrl: "/works/mask/8576dc9f5894768534d25688b94a7357.jpg", gallery: ["/works/mask/DSC01978.jpg", "/works/mask/DSC02026.jpg"], likesCount: 27, commentsCount: 6, isFeatured: false, createdAt: "2026-05-02T10:00:00Z", profile: { nickname: "几何小天才" }, lesson: { title: "我设计的面具" } },

  // 动物贴纸 — 学生作品
  { id: "sw-sticker-1", title: "森林动物贴纸", story: "设计了一套森林动物贴纸，有小狐狸、小兔子和一只胖胖的熊，都可以贴在我的画本上。", finalWorkUrl: "/works/sticker/img20250912_20082796.jpg", gallery: ["/works/sticker/img20250912_20133889.jpg", "/works/sticker/img20250912_20150879.jpg"], likesCount: 26, commentsCount: 5, isFeatured: true, createdAt: "2026-03-10T10:00:00Z", profile: { nickname: "动物小画家" }, lesson: { title: "动物贴纸" } },
  { id: "sw-sticker-2", title: "海底贴纸", story: "画了各种各样的海底生物贴纸，海豚、小丑鱼、海龟，还有一只笑眯眯的章鱼。", finalWorkUrl: "/works/sticker/img20250912_20114460.jpg", gallery: ["/works/sticker/img20250912_20094965.jpg"], likesCount: 14, commentsCount: 2, isFeatured: false, createdAt: "2026-03-12T15:30:00Z", profile: { nickname: "海洋使者" }, lesson: { title: "动物贴纸" } },

  // 四方连续 — 学生作品
  { id: "sw-pattern-1", title: "几何花纹布料", story: "用菱形和三角形设计了一块可以无限延伸的布料图案，配色是粉色和金色，做裙子一定很好看。", finalWorkUrl: "/works/pattern/111.jpg", gallery: ["/works/pattern/img055.jpg", "/works/pattern/img056.jpg"], likesCount: 20, commentsCount: 3, isFeatured: true, createdAt: "2026-04-22T10:00:00Z", profile: { nickname: "图案工匠" }, lesson: { title: "四方连续" } },
  { id: "sw-pattern-2", title: "花花连续图案", story: "设计了一个可以无限重复的花纹图案，每一格都严丝合缝，铺在一起就像一块漂亮的花布。", finalWorkUrl: "/works/pattern/澄.jpg", gallery: ["/works/pattern/好好.jpg", "/works/pattern/小可爱.jpg"], likesCount: 32, commentsCount: 7, isFeatured: true, createdAt: "2026-05-01T14:00:00Z", profile: { nickname: "澄澄" }, lesson: { title: "四方连续" } },
  { id: "sw-pattern-3", title: "彩虹四方连续", story: "用彩虹的颜色排列成重复图案，每一行都不同但又能完美接在一起，像魔法一样。", finalWorkUrl: "/works/pattern/吴若浠.jpg", gallery: ["/works/pattern/鸽子.jpg", "/works/pattern/小可爱.jpg"], likesCount: 17, commentsCount: 4, isFeatured: false, createdAt: "2026-05-05T11:30:00Z", profile: { nickname: "若浠" }, lesson: { title: "四方连续" } },
];

export const FALLBACK_SKILL_CARDS = [
  { name: "图形概括力", rarity: "COMMON" as const, image: "/skills/shape-generalization.jpg", description: "万事万物都可还原为基本图形" },
  { name: "线条表达力", rarity: "COMMON" as const, image: "/skills/line-expression.jpg", description: "用线条的粗细、疏密、曲直来表达情感" },
  { name: "色彩叙事力", rarity: "RARE" as const, image: "/skills/line-application.jpg", description: "从冷到暖、从地心到宇宙的色彩光谱" },
  { name: "空间表达力", rarity: "RARE" as const, image: "/skills/spatial-expression.jpg", description: "建立近大远小、前后遮挡的空间意识" },
  { name: "结构思维", rarity: "RARE" as const, image: "/skills/occlusion-relationship.jpg", description: "用关节和比例解构复杂人体与遮挡关系" },
  { name: "人物塑造力", rarity: "EPIC" as const, image: "/skills/figure-motion.jpg", description: "从性格出发设计角色外观与动态" },
  { name: "拼贴创作力", rarity: "EPIC" as const, image: "/skills/collage-making.jpg", description: "组合多元材料创造新的视觉叙事" },
  { name: "图案设计力", rarity: "EPIC" as const, image: "/skills/tile-continuity.jpg", description: "理解重复、镜像、旋转的装饰规律" },
  { name: "贴纸包装设计", rarity: "EPIC" as const, image: "/skills/sticker-packaging.jpg", description: "把图形概括应用到产品设计中" },
  { name: "设计原理", rarity: "LEGENDARY" as const, image: "/skills/design-basics.jpg", description: "掌握设计的基本理论和美学原则" },
  { name: "综合创作力", rarity: "LEGENDARY" as const, image: "/skills/design-fundamentals.jpg", description: "把全部技能整合成完整的个人作品" },
];
