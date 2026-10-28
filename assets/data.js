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
  }
];