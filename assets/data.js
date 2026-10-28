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
  }
];