# WebAIHarnessRoom Portal

WebAIHarnessRoom 的门厅门户。纯静态站点，零依赖、零构建。

## 本地预览

**直接双击 `index.html`**，或用浏览器打开 `file:///.../index.html`。所有资源与链接均使用相对路径，无需本地服务器。

## 部署到 GitHub Pages

### 方式 A：组织根站点（推荐）

1. 新建仓库 `WebAIHarnessRoom.github.io`（仓库名必须与组织名完全一致）。
2. 将所有文件推送到 `main` 分支。
3. Settings → Pages → Source 选择 `Deploy from a branch`，分支 `main`，目录 `/ (root)`。
4. 访问 `https://webaiharnessroom.github.io/`。

### 方式 B：项目子路径

1. 将文件推送到任意仓库（例如 `portal`）。
2. Settings → Pages → Source 选择 `Deploy from a branch`，分支 `main`，目录 `/ (root)`。
3. 访问 `https://<org>.github.io/portal/`。

两种方式都不需要修改任何路径——相对路径会自动适应部署位置。

## 新增 Harness

1. 在 `assets/data.js` 的 `HARNESS_DATA` 数组中追加条目。
2. 新建 `harness/<id>/index.html`，复制现有详情页，修改：
   - `<title>`、`<meta name="description">`
   - `<main data-harness-id="...">` 的 id
   - 正文内容（标题、描述、命令块、边界说明）
3. 向 room-index 提交 PR 同步索引数据。

## 路径约定

每个 HTML 页面的 `<html>` 标签带一个 `data-base` 属性，值为从当前页面到站点根目录的相对路径（`""`、`"../"`、`"../../"`）。`app.js` 用它拼接动态生成的链接。新增页面时不要忘记设置这个属性。

## 数据校准提示

`assets/data.js` 中 `getting_started` 命令为示例值，请对照 GenerateProjectContext 仓库 README 校准后再部署。

## 图标

- `assets/img/wahr.png` — 组织图标，用于所有页面 header 品牌区，以及非详情页的 favicon。
- `assets/img/gpc.png` — GenerateProjectContext 图标，用于首页/索引卡片、详情页标题行，以及详情页 favicon。

新增 Harness 时，把该 Harness 的图标放入 `assets/img/`，并在 `data.js` 条目的 `icon` 字段中填写相对站点根目录的路径（如 `assets/img/<name>.png`）。详情页的标题行图标是静态写在 HTML 里的，同样指向 `../../assets/img/<name>.png`。