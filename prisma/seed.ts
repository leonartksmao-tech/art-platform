import { PrismaClient, Category, Rarity } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ==================== 课程 ====================
  const creativeCourse = await prisma.course.create({
    data: {
      title: "创作课",
      description: "12节创造力训练，每节课一个核心思维 + 一个物理互动形式 + AI协作工作流。培养孩子的拆解力、导演思维、色彩叙事力和符号化表达能力。",
      category: Category.CREATIVE,
      lessonCount: 12,
      sortOrder: 1,
    },
  });

  const basicCourse = await prisma.course.create({
    data: {
      title: "基础课",
      description: "9节基础能力训练，从图形概括、人体解构到空间逻辑、四方连续。建立设计思维，把艺术创作转化为可玩、可穿戴、可展示的成品。",
      category: Category.BASIC,
      lessonCount: 9,
      sortOrder: 2,
    },
  });

  // ==================== 创作课 12 节 ====================
  const creativeLessons = await Promise.all([
    prisma.lesson.create({
      data: {
        courseId: creativeCourse.id,
        title: "马和草原",
        coreThinking: "拆解力——再复杂的物体都能通过图形重组",
        workflowType: "sketch-refine",
        promptTemplate: "一匹{姿势}的马站在{色调}的草原上，远处有{背景元素}，{风格}风格",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "图形拆解", child: "看真实马的照片，用○△□三个基础形把马'拼'出来", teacher: "追问：'奔跑的马和站着的马，三角形和长方形的角度有什么不同？'" }, { title: "动态实验", child: "用剪好的几何纸片在桌上摆出 3 种马的姿势，选最喜欢的拍照留底", teacher: "不评价画功：'这匹马在干什么？它开心吗？你从哪个形状看出来的？'" }, { title: "主角草图", child: "在贺卡纸上画出选定的'几何马'，线条歪不怕，保留拼搭痕迹", teacher: "确保不擦掉重画——每个几何块都是思考的证据" }] },
          phase2: { title: "共创", options: [{ name: "草原背景", input: "口述'有风的黄色草原，天边有紫色的山'", output: "4 张不同色调草原" }, { name: "马的变体", input: "几何马线稿拍照垫图", output: "3 种风格（水彩/版画/彩铅）" }, { name: "配角布局", input: "口头描述'远处有两头小马和一群鸟'", output: "不同摆法方案" }], keyMoment: "老师混入一张'精美但不符合故事'的图，问'这张很好看，但适合你的故事吗？'——训练不被精美迷惑。" },
          phase3: { title: "输出", steps: ["手工水彩背景", "手工上色主角", "折出立体支撑底座", "贺卡内页手写一句话故事"] }
        }),
        sortOrder: 1,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: creativeCourse.id,
        title: "小小的我",
        coreThinking: "视角转换力——彻底颠覆视角，培养对生活细节的敏锐捕捉力",
        workflowType: "sketch-refine",
        promptTemplate: "一个缩小的人在{场景}里探险，{物品}变成了巨大的{奇幻元素}，{色调}氛围",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "捡素材", child: "从厨房/阳台找 3 样东西（西兰花、饼干、海绵），拍照记录", teacher: "引导触摸质感：'西兰花的表面像什么？饼干边缘像什么地形？'" }, { title: "想象放大", child: "把自己缩小成蚂蚁大小，画一张'我在 X 里探险'的铅笔草图", teacher: "追问：'如果西兰花是大树，树冠下面有什么？'" }, { title: "主角设计", child: "画一个'缩小版的我'——穿什么？拿什么工具？表情什么样？", teacher: "确认主角有辨识度——这是全篇的锚点" }] },
          phase2: { title: "共创", options: [{ name: "场景转化", input: "草图 + 口述'饼干变成荒漠'", output: "3 种转化度（写实→奇幻）" }, { name: "比例参考", input: "描述'树有 10 个我那么高'", output: "不同比例关系画面" }, { name: "氛围方案", input: "选：神秘深绿 / 温暖饼干色 / 冷调冒险", output: "3 种色调氛围稿" }], keyMoment: "AI 生成一张'完美但丢失原物特征'的图，跟孩子草图对比——'你饼干边缘的锯齿还在，AI 把它变成了普通沙漠。'转化的趣味在于保留原物的影子。" },
          phase3: { title: "输出", steps: ["确定构图", "手工绘制完整插画（A4）", "画面角落贴'原物照片'做彩蛋", "背面写'我的微型冒险日记'"] }
        }),
        sortOrder: 2,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: creativeCourse.id,
        title: "从地心到星河",
        coreThinking: "色彩叙事力——用色彩讲故事，让画面拥有空间跨度和情感张力",
        workflowType: "color-compare",
        promptTemplate: "{层级}世界，{情绪}的氛围，用{色调}表现，生物身上有{变形特征}",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "极简草图", child: "竖长纸条分出 3 层：地下/地面/天空，每层勾 1-2 个'奇怪生物'轮廓", teacher: "每层至少一个生物，每个生物至少 1 处变形（放大牙、灯泡眼）" }, { title: "情绪地图", child: "给每层标情绪词：地下（神秘/可怕？）地面（平静/热闹？）天空（自由/梦幻？）", teacher: "不做纠正——'你觉得地下是可怕还是温暖？你先选一个。'" }, { title: "色卡选择", child: "从彩色纸条堆里给每层挑 2-3 个代表色，贴到草图对应层", teacher: "不评价搭配——'为什么天空选了这个蓝？'" }] },
          phase2: { title: "共创", options: [{ name: "色调验证", input: "色卡 + 情绪词描述", output: "3 种配色方案" }, { name: "生物变体", input: "铅笔生物草图垫图", output: "保持轮廓的 3 种风格化版本" }, { name: "过渡方案", input: "描述'地下到地面怎么接？'", output: "3 种过渡构图（渐变/断层/桥梁）" }], keyMoment: "AI 生成一张'色彩漂亮但情绪错误'的图（神秘地心配糖果色），问'好看吗？但这是你心里的地心吗？'——好看 ≠ 对味。" },
          phase3: { title: "输出", steps: ["长条纸正式绘制", "上色（孩子选定的方案）", "画面两侧加'情绪标签小字'", "卷起来丝带扎好，拉开即展览"] }
        }),
        sortOrder: 3,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: creativeCourse.id,
        title: "虫虫的家",
        coreThinking: "导演思维——页面间的逻辑联系，完整表达一个事件",
        workflowType: "character-consistency",
        promptTemplate: "一只{性格}的{昆虫}在{场景}里，正在{动作}，{情绪}的氛围",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "科学观察", child: "看昆虫参考图，数三体节/足/翅，歪线画结构图", teacher: "引导解构——'这只甲虫的腿从哪个体节长出来的？'" }, { title: "角色设定", child: "给虫子起名、定性格，画'主角定妆照'草图", teacher: "只追问——'它最喜欢藏在哪种叶子里？为什么？'" }, { title: "故事板", child: "4-6 格分镜草稿，火柴人 + 箭头即可", teacher: "四要素检查：人物/目标/困难/结局" }] },
          phase2: { title: "共创", options: [{ name: "场景生成", input: "'叶子下的洞'草图垫图", output: "保留构图的精致场景" }, { name: "角色演化", input: "定妆照垫图", output: "不同情绪下的变体" }, { name: "情绪氛围", input: "每格标注情绪词", output: "每格不同色调参考" }], keyMoment: "火柴人分镜和 AI 精致画面并排——'AI 让画面变好看了，但故事的紧张感，是你那个缩成一团的火柴人决定的。AI 不会害怕，你会。'" },
          phase3: { title: "输出", steps: ["AI 插图排进折页模板", "打印折叠装订豆豆本", "手写对白文字", "朗读录音 + AI 音效 → 有声书二维码贴封底"] }
        }),
        sortOrder: 4,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: creativeCourse.id,
        title: "吃点什么",
        coreThinking: "层级逻辑——逻辑感与惊喜感并存，绘画过程就是一场游戏",
        workflowType: "spatial-factory",
        promptTemplate: "一个用{食物}搭建的{房间类型}，{食物层1}变成了{家具1}，{食物层2}变成了{家具2}",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "实物拆解", child: "拿一个汉堡，从上到下一层层拆开，拍照排序", teacher: "追问'先放什么再放什么？生菜放最下面会怎样？'" }, { title: "奇幻联想", child: "每层变别的东西：面包变被子、肉饼变沙发", teacher: "鼓励离谱——'芝士是滑滑梯？番茄片是蹦床？'" }, { title: "零件草图", child: "画出每层'食物零件'，剪成独立小片", teacher: "层数 ≥ 4，每片有'食物→家具'的视觉线索" }] },
          phase2: { title: "共创", options: [{ name: "纹理表现", input: "描述'面包有小洞洞，肉饼有纹路'", output: "食物纹理特写参考" }, { name: "奇幻场景", input: "零件草图 + '汉堡变卧室'", output: "3 种奇幻化程度场景" }, { name: "配角方案", input: "'谁住在食物房间里？'", output: "不同小角色方案" }], keyMoment: "做一个顺序混乱的汉堡——番茄片放面包上面、生菜最底层——问'为什么站不住？'逻辑错误导致结构崩塌。" },
          phase3: { title: "输出", steps: ["食物零件上色", "背面贴魔术贴", "底板画房间背景", "自由组装——今天汉堡卧室，明天游乐场", "录导览小视频"] }
        }),
        sortOrder: 5,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: creativeCourse.id,
        title: "故事卡牌",
        coreThinking: "系统性思维——故事不是随机的，可以通过逻辑模块进行精彩编排",
        workflowType: "character-consistency",
        promptTemplate: "一个{角色}，带着{道具}，在{场景}里{动作}，{风格}风格卡牌插画",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "角色工厂", child: "'变动作 + 加道具'两步法，画 4 张角色卡牌", teacher: "每个角色至少一个身体动作 + 一个道具" }, { title: "四要素牌", child: "写 4 张文字牌：人物/目标/困难/结局，各 2-3 个版本", teacher: "给范例库（目标：找宝藏/救朋友/回家；困难：风暴/迷路/被误会）" }, { title: "组合测试", child: "随机抽牌组合，讲 1 分钟口头故事", teacher: "记录哪组好，哪组卡住了" }] },
          phase2: { title: "共创", options: [{ name: "角色升级", input: "角色卡牌垫图", output: "3 种美术风格（卡通/水墨/Q版）" }, { name: "故事脑洞", input: "卡住的那组要素喂大模型", output: "3 个故事走向建议" }, { name: "平衡测试", input: "盲抽牌让 AI 编故事", output: "对比 AI 的编排" }], keyMoment: "抽一组'烂牌'（找钥匙 + 大怪兽），孩子和 AI 同时编。AI 编标准冒险故事，但谁能出意外翻转？故事好坏不在牌，在你怎么打。" },
          phase3: { title: "输出", steps: ["完善角色卡牌（统一装饰线条）", "扩充牌库", "定规则：每人抽 4 张，3 分钟编故事", "家庭可反复玩"] }
        }),
        sortOrder: 6,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: creativeCourse.id,
        title: "街角奇遇记",
        coreThinking: "城市观察力——打破死板，通过拼贴让街景产生跃动感",
        workflowType: "style-transfer",
        promptTemplate: "一条{风格}的街道，建筑是{建筑风格}，街上的人们在{活动}，突然{奇遇事件}",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "街道取景", child: "出门找一条街，手机拍 3 张不同角度，圈出 5 栋建筑轮廓", teacher: "引导：哪些是长方形？哪些有三角屋顶？窗户排列有规律吗？" }, { title: "人群速写", child: "观察 3 个行人，极简笔触画走路姿势", teacher: "'那个人急匆匆还是慢悠悠？你从哪看出来的？'" }, { title: "奇遇事件", child: "定一个反常元素——猫推婴儿车？邮筒在跳舞？", teacher: "只一个反常，其他保持日常——反差产生趣味" }] },
          phase2: { title: "共创", options: [{ name: "建筑风格", input: "街道照片", output: "同条街 3 种风格（童话/赛博朋克/老照片）" }, { name: "人物群像", input: "粗笔速写垫图", output: "保留动态的精致人物" }, { name: "构图排练", input: "建筑/人物/奇遇元素列表", output: "3 种拼贴构图方案" }], keyMoment: "一张'所有建筑完美、所有人都精致' vs 一张'保留歪斜手感的拼贴风'。完美是死的，不完美才像有人住在里面。" },
          phase3: { title: "输出", steps: ["剪建筑色块", "拼贴街道背景", "剪人物动态拼入场景", "奇遇元素用特殊材质（金箔/亮片）", "给街道起名写路牌"] }
        }),
        sortOrder: 7,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: creativeCourse.id,
        title: "秘密浴室",
        coreThinking: "空间解构——平凡场景的奇幻化改造，把枯燥日常变成冒险舞台",
        workflowType: "spatial-factory",
        promptTemplate: "一个浴室的{视角}视角，{秘密描述}藏在{位置}，{光线描述}的光线",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "空间测绘", child: "进浴室，画'从门口看进去'的空间框架——地面、洗手台、浴缸三大块", teacher: "强调'骨架'——先画三条线定地面/墙面/天花板" }, { title: "秘密设定", child: "决定一个藏在浴室的秘密：浴缸下是海底通道？镜子倒影不一样？", teacher: "唯一要求：秘密必须藏起来，第一眼看不出" }, { title: "动态草图", child: "画一个浴室动作（弯腰放水/伸长手拿毛巾/浴缸里只露头）", teacher: "让孩子自己做动作，身体感受关节弯曲——再画" }] },
          phase2: { title: "共创", options: [{ name: "空间方案", input: "空间框架草图", output: "3 种浴室布局变体" }, { name: "奇幻化", input: "描述秘密设定", output: "3 种'揭露前后'对比图" }, { name: "材质参考", input: "'瓷砖反光、金属感、浴帘褶皱'", output: "材质特写参考" }], keyMoment: "先把'平常版'给家长看，再拉开浴帘露出'秘密版'。平凡与奇幻的一帘之隔。" },
          phase3: { title: "输出", steps: ["绘制浴室场景", "硫酸纸浴帘（半透明，可拉动）", "浴帘后藏秘密场景", "浴缸水可掀开，下面有东西"] }
        }),
        sortOrder: 8,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: creativeCourse.id,
        title: "奇幻小镇地图",
        coreThinking: "符号化表达——化繁为简，用设计师的思维梳理庞大信息",
        workflowType: "spatial-factory",
        promptTemplate: "一张{风格}风格的小镇地图，有{地标列表}，用{符号风格}做图例",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "建筑清单", child: "列 ≥8 种建筑，每种用几何图形组合画出俯视图", teacher: "最难也最重要的视角——从正上方看" }, { title: "符号设计", child: "为海/山/路/森林/农田各设计一个符号", teacher: "规则：≤ 3 笔，别人一看就懂——信息设计核心" }, { title: "地标命名", child: "给小镇起名，5 个核心地点起有趣名字", teacher: "名字要有画面感——'咕噜咕噜汤泉'比'温泉'有故事" }] },
          phase2: { title: "共创", options: [{ name: "地图风格", input: "建筑草稿 + 符号", output: "同一地图 3 种风格（藏宝图/导航/奇幻卷轴）" }, { name: "布局方案", input: "建筑名单 + 地理要素", output: "3 种小镇布局" }, { name: "图例系统", input: "手绘符号", output: "保持原型的 3 种图例风格" }], keyMoment: "两张地图盲测——一张混乱一张清晰。让孩子指路'从学校到公园'。在混乱地图上失败，在清晰地图上成功。符号设计不是装饰，是沟通。" },
          phase3: { title: "输出", steps: ["A3 完整地图", "图例栏 + 比例尺", "红色推荐游览路线", "背面 5 个地点一句话介绍（像旅游手册）"] }
        }),
        sortOrder: 9,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: creativeCourse.id,
        title: "美丽的餐厅",
        coreThinking: "色彩直觉——打破'先勾线后上色'，先色块后形状，关注颜色本身",
        workflowType: "color-compare",
        promptTemplate: "一个{色调}色调的{餐厅类型}，主色是{主色}，辅色是{辅色}，点缀{点缀色}",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "色块捕捉", child: "看美食照片，眯起眼，在纸上用大色块涂出颜色区域——不看形状只看颜色", teacher: "'不要画东西，只画颜色。红色在哪？黄色在哪？'" }, { title: "形状提炼", child: "在干了的色块上，用黑笔勾出食物轮廓——色块变成煎蛋、番茄、面包", teacher: "'你看，颜色自己变成了食物，根本不需要你画得像！'" }, { title: "餐厅设定", child: "定餐厅类型、名字、3 道招牌菜", teacher: "名字有颜色感——'暖橘餐厅''薄荷小馆'" }] },
          phase2: { title: "共创", options: [{ name: "色调方案", input: "描述'暖橘色调拉面馆'", output: "不同暖橘比例的配色方案" }, { name: "色块构成", input: "色块草图垫图 → AI 分析", output: "提取主色调色板" }, { name: "餐厅氛围", input: "选定主色调", output: "3 张同色调不同氛围" }], keyMoment: "两张图对比——先勾线再填色 vs 先色块再勾线。问哪张更'活'。线是牢笼，色是自由的。" },
          phase3: { title: "输出", steps: ["色卡纸拼贴 + 色块绘画结合", "设计菜单（3 道招牌菜配小图）", "餐厅门口放'招牌'"] }
        }),
        sortOrder: 10,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: creativeCourse.id,
        title: "谁藏在草丛里",
        coreThinking: "动态表现力——画面生机感的营造，对风的捕捉 + 互动机关的探索趣味",
        workflowType: "style-transfer",
        promptTemplate: "一片{花海类型}在{风力}中摇曳，花丛密度{密度}，{动物}藏在{位置}，露出{部位}",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "风的身体", child: "站在风扇前闭眼感受风的方向，身体跟着倾斜", teacher: "'风从哪里来？你要往哪边躲？头发往哪个方向飞？'" }, { title: "画风", child: "画一排花/草——先无风版（竖直），再起风版（倾斜+弯曲）", teacher: "检查每株倾斜方向一致——风有来处" }, { title: "藏什么", child: "决定草丛里藏着什么动物，画在独立小卡片上", teacher: "要求：不插进去看不出，插进去画面完整——设计隐蔽性" }] },
          phase2: { title: "共创", options: [{ name: "花海方案", input: "口述'紫色薰衣草花田'", output: "不同密度/高度/色调花海" }, { name: "风的程度", input: "有风版草图垫图", output: "微风/中风/大风三种动态" }, { name: "隐藏揭秘", input: "描述'花丛里露出一双眼睛'", output: "不同隐蔽程度参考" }], keyMoment: "两张卡——一张完美隐藏，一张半隐半现。最好的设计是让人有'发现'的快感，而非'找不到'的挫败。" },
          phase3: { title: "输出", steps: ["花海背景（风向统一）", "花朵成组画（3-5 朵一组）", "背景切出插卡槽", "动物卡片插入", "画面顶部加风的痕迹（飘落花瓣/弯折草叶）"] }
        }),
        sortOrder: 11,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: creativeCourse.id,
        title: "树洞里的秘密",
        coreThinking: "细节质感——纹理的刻画 + 翻页结构制造'别有洞天'的惊喜",
        workflowType: "sketch-refine",
        promptTemplate: "一棵{季节}的大树，树皮{纹理描述}，树洞里住着{居民}，里面有{内部场景}",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "树的解剖", child: "找一棵真树，从下到上观察——根怎么扎？树干多粗？枝怎么分叉？画骨架图", teacher: "用术语建立专业身份：主根/侧根、主干/分枝、树冠轮廓" }, { title: "触摸树皮", child: "闭眼摸树皮 3 分钟，用语言描述触感 → 用点线面还原", teacher: "不示范——'你摸到竖裂还是横裂？用你摸到的方式画。'" }, { title: "树洞故事", child: "决定树洞里住着谁——一家人？图书馆？秘密基地？画内部草图", teacher: "追问细节——'有灯吗？光从哪来？家具用什么做的？'" }] },
          phase2: { title: "共创", options: [{ name: "树皮纹理", input: "纹理习作 + 描述'竖着裂，有小疙瘩'", output: "不同树种树皮 + 点线面方案" }, { name: "树洞内部", input: "内部草图垫图", output: "保留布局的精致内景" }, { name: "树的四季", input: "同一棵树", output: "春夏秋冬四版外观" }], keyMoment: "外观是写实的粗糙树皮，翻开树洞翻页，里面是温暖的奇幻场景。最粗糙的外壳包裹最柔软的内涵——就像人。" },
          phase3: { title: "输出", steps: ["画大树外观（树皮纹理 + 树枝结构）", "树干切出翻页", "翻页后画树洞内部", "周围加季节元素（落叶/新芽/积雪）", "封底贴'树洞居民合影'"] }
        }),
        sortOrder: 12,
      },
    }),
  ]);

  // ==================== 基础课 9 节 ====================
  const basicLessons = await Promise.all([
    prisma.lesson.create({
      data: {
        courseId: basicCourse.id,
        title: "神奇的早餐",
        coreThinking: "图形概括 × 拟人叙事——通过形状观察物体，赋予日常物品生命力",
        workflowType: "style-transfer",
        promptTemplate: "一个{食物}角色在{场景}里{动作}，{拟人程度}的拟人风格，{色调}色调",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "形状拆解", child: "看真实早餐照片，用○△□三个形状快速概括每种食物", teacher: "'煎蛋是几个○？吐司切掉两个△角剩什么？'" }, { title: "拟人实验", child: "给食物加四肢和表情——煎蛋在平底锅里游泳？吐司在躲果酱？", teacher: "'你觉得它在干什么？它开心还是害怕？为什么？'" }, { title: "故事设定", child: "选最有趣的角色：它是谁？在哪？遇到什么问题？画定妆照", teacher: "用四要素快速检查" }] },
          phase2: { title: "共创", options: [{ name: "场景方案", input: "口述'煎蛋在平底锅里蒸桑拿'", output: "4 张不同色调/构图场景" }, { name: "角色变体", input: "食物角色草图垫图", output: "3 种风格（水彩/蜡笔/扁平）" }, { name: "拟人程度", input: "拟人角色描述", output: "3 种拟人化梯度" }], keyMoment: "AI 生成'精美但失去食物特征'的图——'你画的吐司还有面包边的纹理，AI 把它变成了普通小人。保留原样的拟人才有趣。'" },
          phase3: { title: "输出", steps: ["草图纸定稿", "绘画纸正式绘制插画", "画面下方写 2-3 句故事", "给作品起标题写在画框位置"] }
        }),
        sortOrder: 1,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: basicCourse.id,
        title: "动物贴纸",
        coreThinking: "图形概括 × 包装设计——图形的极简概括（剪影美感）与'作品感'的建立",
        workflowType: "style-transfer",
        promptTemplate: "一个{动物}的{风格}风格贴纸，{颜色}配色，底卡是{底卡主题}",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "剪影提炼", child: "看 5 种动物照片，用黑色纸剪出外轮廓剪影（不画直接剪）", teacher: "'忘掉细节，只看边缘——大象的剪影和长颈鹿差在哪？'" }, { title: "特征找回", child: "在剪影上最多加 3 笔白色线条，让剪影能被认出", teacher: "'这 3 笔为什么加在这？耳朵还是角最能让人认出它？'" }, { title: "动态尝试", child: "同一个动物剪出 3 个不同姿势（站/跑/跳），选最生动的", teacher: "'哪个姿势让你一眼知道这只动物在干什么？'" }] },
          phase2: { title: "共创", options: [{ name: "贴纸风格", input: "剪影 + 口述配色", output: "3 种贴纸风格（极简/手绘/复古）" }, { name: "底卡设计", input: "描述'丛林主题底卡'", output: "3 种底卡背景方案" }, { name: "包装参考", input: "'卡头要怎么设计？'", output: "3 种包装版式" }], keyMoment: "孩子的剪影 vs AI 精致贴纸——'AI 画得比你细，但你的剪影只用形状就让人认出是长颈鹿。这就是少即是多。'" },
          phase3: { title: "输出", steps: ["完善动物贴纸（上色 + 勾线）", "画底卡背景", "制作卡头（标题 + 装饰）", "装袋完成可售贴纸包", "定价、写广告语"] }
        }),
        sortOrder: 2,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: basicCourse.id,
        title: "动来动去的朋友",
        coreThinking: "人体结构 × 关节逻辑——从解剖学角度简化人体，理解动态特征",
        workflowType: "character-consistency",
        promptTemplate: "一个{角色}在做{动作}，{头身比}比例，穿着{服装}，关节位置{描述}",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "身体拆解", child: "画出人体 11 个零件：头、躯干、上臂×2、下臂×2、大腿×2、小腿×2", teacher: "用自己身体做教具——'弯一下胳膊肘，哪里在转？关节就该在那。'" }, { title: "连接实验", child: "用两脚钉临时连接零件，试摆 3 个动作，标记关节最大旋转角", teacher: "'哪个关节只能前后转？哪个可以转一圈？'" }, { title: "角色设定", child: "决定做谁——自己？超级英雄？画出外观并命名", teacher: "确认每个关节连接点都标了十字记号" }] },
          phase2: { title: "共创", options: [{ name: "动态验证", input: "零件草图 + '我想让它做后空翻'", output: "后空翻关节位姿分解图" }, { name: "比例参考", input: "孩子画的人体", output: "头身比分析 + 3 种比例变体" }, { name: "服装道具", input: "'给他加一套宇航服'", output: "3 种服装方案（不影响关节活动）" }], keyMoment: "反面教具——故意把连接点打错位置（胳膊关节在躯干正中间），摆动作摆不出来。关节位置错，整个人动不了。结构决定功能。" },
          phase3: { title: "输出", steps: ["正式绘制角色零件", "上色", "精确打孔", "上两脚钉连接", "测试所有关节可动", "给角色做'身份证'（名字/身高/特长/口头禅）"] }
        }),
        sortOrder: 3,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: basicCourse.id,
        title: "我的蝴蝶图鉴",
        coreThinking: "生物结构 × 纹样设计——纹样设计的韵律感与节奏感，图鉴式科学思维",
        workflowType: "style-transfer",
        promptTemplate: "一只{蝴蝶种类}蝴蝶，翅膀纹样是{纹样描述}，{对称方式}，{风格}风格科学插画",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "标本观察", child: "看 3 种蝴蝶标本照片，画结构图——触角/复眼/前翅/后翅/腹部，标注名称", teacher: "像昆虫学家一样用术语——'这是凤蝶科的，注意后翅有尾突'" }, { title: "纹样采集", child: "用放大镜观察，在翅膀上找到至少 3 种纹样单元——圆点、波浪线、网格", teacher: "'这些纹样是怎么排列的？有规律吗？'" }, { title: "纹样实验", child: "用点线面组合设计 3 种不同翅膀纹样——疏密、粗细、长短变化各试一次", teacher: "'哪种你最喜欢？为什么？'" }] },
          phase2: { title: "共创", options: [{ name: "纹样变体", input: "纹样草图 + 描述", output: "同一种纹样的 3 种节奏变化" }, { name: "对称方案", input: "'蝴蝶左边画什么纹样？'", output: "完全对称 vs 不完全对称 vs 不对称" }, { name: "图鉴版式", input: "结构图 + 纹样设计", output: "3 种图鉴排版方案" }], keyMoment: "AI 生成'纹样密集到翅膀看不出形状'的蝴蝶 vs 孩子的设计。纹样是服务结构的，不是吃掉结构的。" },
          phase3: { title: "输出", steps: ["正式画蝴蝶（结构准确 + 纹样设计）", "翅膀与身体分别剪裁", "装订可煽动的翅膀机关", "制作图鉴页（名称/科属/特征/发现地点）", "多页装订成册"] }
        }),
        sortOrder: 4,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: basicCourse.id,
        title: "手电筒找一找",
        coreThinking: "空间逻辑 × 视觉发现——从'画一个物体'转向'构建一个世界'",
        workflowType: "spatial-factory",
        promptTemplate: "一个{房间类型}的{视角}视角，光源来自{光源位置}，暗处藏着{隐藏物品列表}",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "方盒子测绘", child: "把房间理解为'一个方盒子'——画出顶面/正面墙面/左侧墙面/右侧墙面/地面", teacher: "'你站在门口看进去，哪面墙最远？哪面最近？'" }, { title: "家具填充", child: "在'方盒子'里画至少 5 件家具——用简单几何体定位", teacher: "床是放在地面上的吗？吊灯是从顶面挂下来的吗？" }, { title: "秘密清单", child: "列出 5-8 个要藏在房间的东西——写在纸条上不画出来", teacher: "秘密要'能藏但能看到一点点'" }] },
          phase2: { title: "共创", options: [{ name: "空间转换", input: "方盒子线稿", output: "同一房间 3 种视角（正视/略俯视/斜角）" }, { name: "光影方案", input: "描述'台灯亮着，月光从窗户照进来'", output: "不同光源位置的明暗方案" }, { name: "细节参考", input: "'书架上的书怎么摆？'", output: "家具细节参考" }], keyMoment: "先看'平常版房间'，然后用手电筒道具照过画面——'光照到的地方亮了，照不到的地方就是秘密的藏身之处。'" },
          phase3: { title: "输出", steps: ["深色底纸上画房间线稿（白色/浅色笔）", "透明胶片上画'光锥'（手电筒光束形状）", "胶片的亮色区和底纸的暗色区形成对比", "手电筒形状硬纸板做把手", "移动光锥即可'发现'隐藏物品"] }
        }),
        sortOrder: 5,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: basicCourse.id,
        title: "猜猜我在哪儿",
        coreThinking: "遮挡关系 × 构图逻辑——通过重叠关系表达空间深度，掌握层级思维",
        workflowType: "spatial-factory",
        promptTemplate: "一个{主题}场景，5 层景深从{远景}到{近景}，{遮挡描述}，{色彩深度}",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "遮挡游戏", child: "用 3 张纸片（红色圆、蓝色方、绿色三角），互相遮挡，拍 3 种不同遮挡关系", teacher: "'红在蓝前面时谁被遮住？前后不同，画面完全不同。'" }, { title: "分层清单", child: "确定画面主题，列出 5 层：最远景/远景/中景/近景/最近景，每层写 1-2 个元素", teacher: "天空在最远层，手上拿的东西在最近层" }, { title: "单层绘制", child: "把每层元素分别画在不同的纸上，每张纸只画那一层", teacher: "'树如果在房子前面，树和房子不能画在同一张纸上'" }] },
          phase2: { title: "共创", options: [{ name: "深度方案", input: "描述'森林里的小屋，前面有河流'", output: "同一场景 3 种深度分配" }, { name: "遮挡参考", input: "元素清单", output: "3 种遮挡关系方案" }, { name: "色彩深度", input: "'远处用冷色，近处用暖色'", output: "同构图 3 种色彩深度方案" }], keyMoment: "做一个'没有遮挡'的画面——所有东西整整齐齐排开，谁也不挡谁。跟有遮挡的画面对比。遮挡不是错误，是空间存在的证据。" },
          phase3: { title: "输出", steps: ["5 层画面分别剪裁", "从远到近顺序粘贴（天空→山→建筑→人物→手中物）", "每层之间用泡棉胶垫高（制造真实厚度差）", "侧面看有阶梯感，正面看有深度感"] }
        }),
        sortOrder: 6,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: basicCourse.id,
        title: "我设计的面具",
        coreThinking: "设计思维 × 线条质感——设计思维的启蒙：需求→草图→深化→成品",
        workflowType: "style-transfer",
        promptTemplate: "一个{风格}风格的{主题}面具，{颜色}配色，线条走向强调{质感描述}",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "需求分析", child: "回答 3 个问题：给谁戴？什么场合？表达什么？", teacher: "'你可以做恐怖的、搞笑的、美的，但你必须先决定。'" }, { title: "线条调查", child: "摸自己的头发、毛衣、皮肤——观察线条方向。画 3 种线条练习", teacher: "'头发从头顶往四面八方长——面具上有毛的话，线条应该往哪走？'" }, { title: "草图设计", child: "在面具纸型上画正面设计——眼睛洞在哪？线条走向标注方向箭头", teacher: "至少 3 处用了不同方向的线条来表现不同质感" }] },
          phase2: { title: "共创", options: [{ name: "形象方案", input: "描述'神秘的猫头鹰面具'", output: "3 种风格（几何/写实/部落图腾）" }, { name: "线条走向", input: "草图 + 材质描述", output: "3 种线条走向方案" }, { name: "色彩方案", input: "'偏冷的银灰色 + 一点金色点缀'", output: "3 种配色比例" }], keyMoment: "两张面具对比——一张所有线条同一个方向，一张不同区域不同线条走向。线条的方向变了，材料看起来就变了。这就是设计的'质感魔法'。" },
          phase3: { title: "输出", steps: ["厚卡纸正式绘制面具", "剪出眼睛洞和轮廓", "装饰材料粘贴", "两侧打孔穿皮筋", "戴上走秀", "背后写'设计说明'（3 句话）"] }
        }),
        sortOrder: 7,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: basicCourse.id,
        title: "好多好多人",
        coreThinking: "四方连续 × 系统性思维——在复杂构图规律中寻找平衡，实现视觉无限扩展",
        workflowType: "tile-verify",
        promptTemplate: "一个{主题}的四方连续图案，{数量}个{动态}的小人，{排列方式}排列，适合印在{应用场景}",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "动态采集", child: "画 3 种不同运动状态的人物简笔——跑步/跳跃/挥手，每种 ≤ 10 笔", teacher: "'同一个人，在三个不同瞬间——哪个瞬间最有动感？'" }, { title: "连续体验", child: "找一张四方连续布料，用 A4 纸框在图案上移动——观察右边裁掉的图案怎样从左边'回来'", teacher: "'你发现了什么？右边的半个人会从左边重新出现。'" }, { title: "单元草图", child: "在 10×10cm 方形纸上画 3-5 个不同动态的小人", teacher: "'画面右边的半截胳膊，画到左边去时要能接上'" }] },
          phase2: { title: "共创", options: [{ name: "动态排列", input: "人物草稿", output: "3 种排列方式（均匀/错落/有主次）" }, { name: "连续验证", input: "单元图垫图", output: "2×2 拼接预览——看接缝是否'穿帮'" }, { name: "图案应用", input: "'把这个图案印在T恤上'", output: "3 种应用场景效果图" }], keyMoment: "把 4 张相同单元图拼在一起——如果接缝处胳膊断了或头飞了，就是连续失败。系统里的每一个元素都影响全局。" },
          phase3: { title: "输出", steps: ["正式绘制单元图（精确 10×10cm）", "裁剪边缘", "复印 4 份", "拼贴验证无缝", "贴在更大底板上（2×2 或 3×3 阵列）", "展示像'面料一样无限延伸'的效果"] }
        }),
        sortOrder: 8,
      },
    }),
    prisma.lesson.create({
      data: {
        courseId: basicCourse.id,
        title: "我的情绪指南",
        coreThinking: "五官定位 × 表情捕捉——捕捉微妙表情变化，利用物理翻页增强故事张力",
        workflowType: "expression-solver",
        promptTemplate: "一个{脸型}脸型的角色，{发型}，正在做'{情绪}'的表情，{强度}程度",
        contentJson: JSON.stringify({
          phase1: { title: "灵感", steps: [{ title: "五官定位", child: "画空脸轮廓，画十字准星——竖线定鼻子，横线定眼睛高度", teacher: "'中轴线歪了，整个人就歪了。但故意歪可以表达什么——困惑？醉酒？'" }, { title: "情绪实验", child: "对着镜子做 4 种表情（开心/生气/伤心/惊讶），观察眉毛和嘴角变化", teacher: "'惊讶和害怕——眉毛都抬高，但嘴有什么不同？'" }, { title: "脸型+发型", child: "给角色设计 3 种脸型（圆/方/尖）+ 3 种发型，组合选择", teacher: "'同一张脸换发型和脸型还是同一个人吗？'" }] },
          phase2: { title: "共创", options: [{ name: "表情微调", input: "4 种表情速写 + 描述'伤心但不想被看出来'", output: "同一情绪 3 种强度" }, { name: "组合测试", input: "五官分别画在翻页条上", output: "不同眼睛 × 不同嘴的组合效果预览" }, { name: "角色变装", input: "同一个主角", output: "3 种发型/脸型的'同一个人'方案" }], keyMoment: "盲盒翻页——老师随机翻动眼睛条和嘴条，生成'意外表情'，让孩子命名这个情绪。'这是什么表情？你什么时候有过这种表情？'——情绪的名字是自己起的。" },
          phase3: { title: "输出", steps: ["画主角正脸定妆照", "制作翻页结构（眼睛横条切 3 段/嘴横条切 3 段）", "可翻出 ≥ 9 种表情组合", "给每种组合标一个情绪词", "封底写'今天的我'（画今天表情并标注）"] }
        }),
        sortOrder: 9,
      },
    }),
  ]);

  const allLessons = [...creativeLessons, ...basicLessons];

  // ==================== 技能卡牌（21 张） ====================
  const skillCardData = [
    { name: "拆解之力", description: "能将任何复杂物体分解为○△□三个基本形，再复杂的画面都始于最简单的几何。", lessonId: creativeLessons[0].id, rarity: Rarity.RARE },
    { name: "微观之眼", description: "拥有缩放世界的视角，能从西兰花里看到参天大树，从饼干碎屑里看到荒漠沙丘。", lessonId: creativeLessons[1].id, rarity: Rarity.RARE },
    { name: "色彩之心", description: "用颜色讲故事的人，懂得深色带来神秘、暖色带来温暖。每一笔色彩都是情绪的翻译。", lessonId: creativeLessons[2].id, rarity: Rarity.EPIC },
    { name: "导演之眼", description: "掌握分镜头叙事的能力，知道每个画面之间如何连接、翻页的节奏在何时呼吸。", lessonId: creativeLessons[3].id, rarity: Rarity.EPIC },
    { name: "逻辑之链", description: "理解万物皆有层级和顺序的能力，汉堡不能生菜在下、面包在上——结构决定一切。", lessonId: creativeLessons[4].id, rarity: Rarity.RARE },
    { name: "系统之脑", description: "领悟故事不是随机拼凑，而是通过人物、目标、困难、结局四大模块精妙编排的系统。", lessonId: creativeLessons[5].id, rarity: Rarity.LEGENDARY },
    { name: "城市之眼", description: "拥有在城市街角发现故事的能力，看见建筑里住着几何，行人的步伐里藏着性格。", lessonId: creativeLessons[6].id, rarity: Rarity.RARE },
    { name: "秘密之门", description: "擅长在平凡的日常空间中埋藏奇幻的秘密入口，浴缸下面是海洋，镜子里是另一个世界。", lessonId: creativeLessons[7].id, rarity: Rarity.RARE },
    { name: "符号之钥", description: "化繁为简的能力，能用三笔以内的符号让任何人读懂信息。设计不是为了装饰，是为了沟通。", lessonId: creativeLessons[8].id, rarity: Rarity.EPIC },
    { name: "色彩之魂", description: "先看到颜色再看到形状的直觉者，打破先勾线后上色的规则，让色块本身成为画面结构。", lessonId: creativeLessons[9].id, rarity: Rarity.EPIC },
    { name: "风之舞者", description: "能捕捉无形之物——风的来处、草的弯腰、花瓣飘落的方向。画面里藏着看不见的力量。", lessonId: creativeLessons[10].id, rarity: Rarity.RARE },
    { name: "质感之手", description: "闭眼摸树皮 3 分钟的人，能用点线面翻译每一种触感。粗糙的是竖裂，柔软的是苔藓。", lessonId: creativeLessons[11].id, rarity: Rarity.LEGENDARY },
    { name: "生命厨师", description: "给早餐赋予性格和冒险的人。煎蛋在平底锅游泳，吐司长了眼睛躲果酱——日常就是最丰富的创作素材。", lessonId: basicLessons[0].id, rarity: Rarity.RARE },
    { name: "剪影大师", description: "不画细节就能让人认出长颈鹿的人。极简到极致，只用轮廓讲述特征。少即是多。", lessonId: basicLessons[1].id, rarity: Rarity.RARE },
    { name: "关节博士", description: "精通人体关节逻辑，知道胳膊肘只能前后弯、肩膀可以转一圈。结构决定功能。", lessonId: basicLessons[2].id, rarity: Rarity.EPIC },
    { name: "纹样织者", description: "善于发现自然界的重复与节奏，能把蝴蝶翅膀上的圆点、波浪、网格变成独特的装饰语言。", lessonId: basicLessons[3].id, rarity: Rarity.RARE },
    { name: "空间建筑师", description: "能在大脑中把三维房间翻译成五面方盒子，理解顶面、墙面、地面之间的关系。构建世界从理解空间开始。", lessonId: basicLessons[4].id, rarity: Rarity.EPIC },
    { name: "深度猎手", description: "用 5 层纸片创造景深的人。天空在最远，手心在最近，中间的一切因为遮挡而存在。", lessonId: basicLessons[5].id, rarity: Rarity.RARE },
    { name: "设计启蒙者", description: "第一个完成完整设计循环的人：需求→草图→深化→成品。设计不是画得好，是解决问题。", lessonId: basicLessons[6].id, rarity: Rarity.EPIC },
    { name: "无限织工", description: "掌握四方连续之秘的人，知道右边切掉的图案要从左边回来。系统的每一块都影响全局。", lessonId: basicLessons[7].id, rarity: Rarity.LEGENDARY },
    { name: "情绪侦探", description: "能从眉毛一毫米的位移和嘴角 5 度的变化中读出情绪的人。微妙是情感的本质。", lessonId: basicLessons[8].id, rarity: Rarity.LEGENDARY },
  ];

  for (const card of skillCardData) {
    await prisma.skillCard.create({ data: card });
  }

  // ==================== 成就系统（12 个） ====================
  const achievements = [
    { name: "初来乍到", description: "完成第 1 节课，开启创作之旅", unlockRule: JSON.stringify({ type: "lesson_count", value: 1 }) },
    { name: "创作课毕业", description: "完成全部 12 节创作课", unlockRule: JSON.stringify({ type: "course_complete", course: "creative" }) },
    { name: "基础课毕业", description: "完成全部 9 节基础课", unlockRule: JSON.stringify({ type: "course_complete", course: "basic" }) },
    { name: "全勤大师", description: "完成全部 21 节课", unlockRule: JSON.stringify({ type: "all_lessons_complete" }) },
    { name: "社交达人", description: "发表 20 条评论", unlockRule: JSON.stringify({ type: "comment_count", value: 20 }) },
    { name: "人气之星", description: "作品累计获得 100 个赞", unlockRule: JSON.stringify({ type: "total_likes", value: 100 }) },
    { name: "精选常客", description: "3 件作品被精选", unlockRule: JSON.stringify({ type: "featured_count", value: 3 }) },
    { name: "七天连胜", description: "连续 7 天学习", unlockRule: JSON.stringify({ type: "streak_days", value: 7 }) },
    { name: "卡牌收藏家", description: "收集 10 张技能卡牌", unlockRule: JSON.stringify({ type: "skill_count", value: 10 }) },
    { name: "绘本出版", description: "完成豆豆本/有声书完整作品", unlockRule: JSON.stringify({ type: "work_type", workType: "book" }) },
    { name: "AI 指挥官", description: "完成 5 次 AI 生图", unlockRule: JSON.stringify({ type: "ai_generation_count", value: 5 }) },
    { name: "猫猫老师的认可", description: "获得老师点评推荐", unlockRule: JSON.stringify({ type: "teacher_featured" }) },
  ];

  for (const a of achievements) {
    await prisma.achievement.create({ data: a });
  }

  console.log("Seed complete: 2 courses, 21 lessons, 21 skill cards, 12 achievements");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
