# 资料领取功能设计

## 概述

在首页网站列表上方增加「资料领取」section，展示可领取的资料卡片（如面试宝典）。点击卡片弹出暗号输入弹窗，暗号匹对 `public/data/` 下对应文件名后触发下载。

## 架构

### 新增文件

- `src/assets/downloadItems.json` — 可领取资料项配置

### 修改文件

- `src/components/Links.vue` — 新增资料领取 section + 暗号弹窗

## 数据模型

### downloadItems.json

```json
[
  {
    "name": "面试宝典",
    "icon": "Book",
    "hint": "华为面试宝典95道题"
  },
  {
    "name": "面试宝典(完整版)",
    "icon": "Book",
    "hint": "华为面试宝典127道题"
  }
]
```

- `name`: 展示名称
- `icon`: 使用的图标名（复用 siteLinks 的图标映射）
- `hint`: 暗号提示文字，帮助用户理解暗号格式

### public/data/ 文件

当前已有：
- `华为面试宝典127道题.7z`
- `华为面试宝典95道题.7z`

暗号匹配逻辑：用户输入暗号 → 依次尝试 `.7z` 和 `.rar` 后缀 → 尝试 fetch HEAD 请求检查 `/data/{暗号}.7z` 或 `/data/{暗号}.rar` 是否可访问 → 找到则触发下载，都不存在则提示暗号错误。

## UI 设计

### 资料领取 Section

- 位于「网站列表」标题上方
- 标题行：图标 + "资料领取"（与网站列表标题行样式一致）
- 卡片网格：使用与网站列表相同的 grid 布局和 liquid glass 风格卡片
- 每个卡片显示图标 + 资料名称

### 暗号输入弹窗

- 使用 Element Plus `el-dialog`
- 包含：
  - 标题："输入暗号领取资料"
  - `el-input` 输入框（placeholder: "请输入暗号"）
  - 提示文字：当前点击的资料名称
  - 确认 + 取消按钮
- 暗号正确：`ElMessage.success` 提示 + 触发下载
- 暗号错误：`ElMessage.error` 提示"暗号错误，请重新输入"

## 下载逻辑

依次尝试 `.7z` 和 `.rar` 后缀，通过 fetch HEAD 请求检查文件是否存在：

```js
const extensions = ['.7z', '.rar']
for (const ext of extensions) {
  const url = `/data/${code}${ext}`
  const res = await fetch(url, { method: 'HEAD' })
  if (res.ok) {
    const link = document.createElement('a')
    link.href = url
    link.download = `${code}${ext}`
    link.click()
    return
  }
}
// 所有后缀都不匹配 → 暗号错误
```

由于文件在 `public/data/` 下，Vite 构建后可直接通过 `/data/{filename}` 访问，无需后端。

## 目录保护

禁止浏览器直接列出 `public/data/` 目录内容。在 `public/data/` 下放置 `.htaccess`（Apache）或通过 Vite 配置处理。对于 Vite dev server，在 `vite.config.js` 中间件层拦截 `/data/` 的目录列表请求。对于生产环境，在部署配置中关闭 autoindex。

具体方案：在 `public/data/` 目录下创建 `index.html` 文件（空页面或 403 提示），这样无论 dev 还是生产环境，访问 `/data/` 时都会返回该 index.html 而非目录列表。

## 错误处理

- 暗号不匹配任何文件（.7z 和 .rar 都不存在）→ ElMessage.error 提示"暗号错误，请重新输入"
- 网络问题导致下载失败 → 浏览器自然报错即可