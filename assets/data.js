// WebAIHarnessRoom 索引数据
// 新增 Harness：在此追加条目，并在 harness/<id>/ 下创建详情页。
// 字段说明见 /contributing/。
window.HARNESS_DATA = [
  {
    id: 'generate-project-context',
    name: 'GenerateProjectContext',
    repo: 'WebAIHarnessRoom/GenerateProjectContext',
    icon: 'assets/img/gpc.png',
    tagline: '把任意代码项目整理成一份 Markdown 上下文文档',
    description: '用于人工快速理解项目，也用于给 AI 提供完整工程上下文。仓库包含核心库与可选 GUI，支持 CLI、Python API 和图形界面三种入口。',
    target_web_ai: '通用',
    status: 'verified',
    last_verified: '2026-10-28',
    language: 'Python',
    license: 'MIT',
    version: '0.1.0',
    getting_started: 'pip install project-context\nproject-context .',
    docs_url: '',
    boundary_note: ''
  },
  {
    id: 'mkstruct',
    name: 'mkstruct',
    repo: 'WebAIHarnessRoom/mkstruct',
    icon: 'assets/img/mkstruct.png',
    tagline: '根据树形结构文本，一键创建目录与空文件的项目骨架生成器',
    description: '把 tree 命令风格的目录树或设计文档中的树形结构直接粘贴给它，即可在指定位置批量创建完整的目录和文件结构。提供 CLI 与 GUI 两种形态，共享同一套解析与创建逻辑，零第三方依赖，仅使用 Python 标准库。',
    target_web_ai: '通用',
    status: 'verified',
    last_verified: '2026-10-28',
    language: 'Python',
    license: 'MIT',
    version: '0.1.0',
    getting_started: 'mkstruct tree.txt -d .\\out',
    docs_url: 'https://github.com/WebAIHarnessRoom/mkstruct',
    boundary_note: '预览与写入分离，已存在文件不会被覆盖；目录以 / 结尾或有子节点识别，文件以其余节点识别。'
  },
  {
    id: 'deepseek-code-nav',
    name: 'DeepSeek 代码块导航',
    repo: 'WebAIHarnessRoom/deepseek-code-nav',
    icon: 'assets/img/deepseek-code-nav.png',
    tagline: '在 DeepSeek 网页对话中一键跳转上一段 / 下一段代码块，免去反复滚动鼠标滚轮',
    description: '浏览器扩展（Manifest V3），在 chat.deepseek.com 页面注入可拖拽浮动导航条。以代码块右上角「复制」按钮为锚点识别并排序代码块，支持上一段/下一段跳转、边界置灰、位置指示、平滑滚动与 1.5 秒高亮。零数据收集，仅声明 content script 匹配 https://chat.deepseek.com/*。',
    target_web_ai: 'DeepSeek',
    status: 'verified',
    last_verified: '2026-11-09',
    language: 'JavaScript',
    license: 'MIT',
    version: '1.0.0',
    getting_started: '打开 chrome://extensions/ → 开启开发者模式 → 加载已解压的扩展程序 → 选择 src/ 目录',
    docs_url: 'https://github.com/WebAIHarnessRoom/deepseek-code-nav#readme',
    boundary_note: '非官方扩展，与 DeepSeek 官方无关；仅匹配 chat.deepseek.com；依赖页面结构，改版时可能退化为 pre 兜底；流式生成期间跳转可能有一次视觉回弹；不收集、不存储、不传输任何用户数据。'
  }
];