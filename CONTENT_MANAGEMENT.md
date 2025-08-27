# 内容管理指南

## 📝 概述

这是一个零后端的静态网站，所有内容都通过 JSON 文件管理。你可以通过编辑以下文件来更新网站内容：

## 📁 内容文件结构

```
src/content/
├── posts.json      # 博客文章
├── notes.json      # 笔记
├── resources.json  # 资源链接
└── gallery.json    # 相册图片
```

## 🎯 博客文章管理 (`posts.json`)

### 文件位置
`src/content/posts.json`

### 数据结构
```json
{
  "title": "文章标题",
  "slug": "url-标识符",
  "date": "2025-01-15",
  "summary": "文章摘要",
  "tags": ["标签1", "标签2"],
  "readingTime": 5
}
```

### 字段说明
- **title**: 文章标题
- **slug**: URL 标识符（英文，用连字符分隔）
- **date**: 发布日期（YYYY-MM-DD 格式）
- **summary**: 文章摘要（显示在列表页）
- **tags**: 标签数组（用于分类和搜索）
- **readingTime**: 预计阅读时间（分钟）

### 示例
```json
{
  "title": "Next.js 14 新特性详解",
  "slug": "nextjs-14-features",
  "date": "2025-01-15",
  "summary": "深入解析 Next.js 14 的新功能和改进，包括 App Router、Server Components 等。",
  "tags": ["Next.js", "React", "前端开发"],
  "readingTime": 8
}
```

### 如何添加新文章
1. 在 `posts.json` 中添加新的文章对象
2. 确保 `slug` 唯一且符合 URL 规范
3. 保存文件，网站会自动更新

## 📝 笔记管理 (`notes.json`)

### 文件位置
`src/content/notes.json`

### 数据结构
```json
{
  "title": "笔记标题",
  "slug": "note-identifier",
  "date": "2025-01-15",
  "summary": "笔记摘要",
  "tags": ["标签1", "标签2"]
}
```

### 示例
```json
{
  "title": "React Hooks 使用技巧",
  "slug": "react-hooks-tips",
  "date": "2025-01-15",
  "summary": "记录 React Hooks 的常用技巧和最佳实践。",
  "tags": ["React", "Hooks", "前端"]
}
```

## 🔗 资源管理 (`resources.json`)

### 文件位置
`src/content/resources.json`

### 数据结构
```json
{
  "title": "资源标题",
  "url": "https://example.com",
  "description": "资源描述",
  "category": "分类",
  "tags": ["标签1", "标签2"]
}
```

### 示例
```json
{
  "title": "React 官方文档",
  "url": "https://react.dev",
  "description": "React 官方文档，包含完整的 API 参考和教程。",
  "category": "文档",
  "tags": ["React", "文档", "教程"]
}
```

## 🖼️ 相册管理 (`gallery.json`)

### 文件位置
`src/content/gallery.json`

### 数据结构
```json
{
  "title": "图片标题",
  "url": "https://example.com/image.jpg",
  "description": "图片描述",
  "category": "分类",
  "tags": ["标签1", "标签2"]
}
```

### 示例
```json
{
  "title": "项目截图",
  "url": "https://example.com/screenshot.jpg",
  "description": "项目开发过程中的界面截图。",
  "category": "项目展示",
  "tags": ["UI", "项目", "截图"]
}
```

## 🏷️ 标签系统

### 推荐标签
- **技术类**: React, Next.js, TypeScript, JavaScript, CSS, HTML
- **领域类**: 前端开发, 后端开发, 移动开发, 数据科学
- **主题类**: 教程, 经验分享, 问题解决, 工具推荐
- **难度类**: 入门, 进阶, 高级, 专家

### 标签使用建议
1. 每个内容使用 2-4 个标签
2. 保持标签的一致性和规范性
3. 使用中文标签便于中文用户理解

## 📅 内容更新流程

### 1. 添加新内容
1. 编辑对应的 JSON 文件
2. 添加新的内容对象
3. 保存文件
4. 刷新网站查看效果

### 2. 修改现有内容
1. 在 JSON 文件中找到对应内容
2. 修改需要更新的字段
3. 保存文件
4. 刷新网站查看效果

### 3. 删除内容
1. 从 JSON 文件中删除对应的对象
2. 保存文件
3. 刷新网站查看效果

## 🔧 高级配置

### 网站基本信息
编辑 `src/config/site.ts` 文件：
```typescript
export const siteConfig: SiteConfig = {
  title: '你的网站标题',
  description: '网站描述',
  author: '你的名字',
  url: '你的网站地址',
  github: '你的GitHub用户名',
  email: '你的邮箱'
};
```

### 导航菜单
在 `src/config/site.ts` 中修改 `navigation` 数组：
```typescript
export const navigation = [
  { name: '首页', href: '/' },
  { name: '文章', href: '/blog' },
  { name: '笔记', href: '/notes' },
  // 添加或修改菜单项
];
```

## 📱 内容展示规则

### 首页展示
- **最近更新**: 显示最新的 4 篇文章
- **精选系列**: 根据标签分类显示
- **快速入口**: 链接到各个主要页面

### 列表页展示
- **文章列表**: 按日期倒序排列，支持搜索和标签筛选
- **笔记列表**: 按日期倒序排列
- **资源列表**: 按分类和标签筛选

### 搜索功能
- 支持标题、摘要、标签的模糊搜索
- 搜索结果按类型分组显示
- 支持搜索历史记录

## 🎨 样式定制

### 颜色主题
- 支持浅色/深色主题切换
- 主题色：蓝色系 (#3B82F6)
- 辅助色：绿色、紫色、黄色等

### 响应式设计
- 桌面端：完整功能展示
- 平板端：优化布局
- 移动端：触摸友好设计

## 🚀 部署说明

### 本地开发
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 部署到 GitHub Pages
1. 推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择部署分支（通常是 `main` 或 `gh-pages`）

### 部署到 Vercel
1. 连接 GitHub 仓库到 Vercel
2. 自动部署，每次推送都会触发重新部署

## 📞 技术支持

如果在内容管理过程中遇到问题：
1. 检查 JSON 文件格式是否正确
2. 确保所有必需字段都已填写
3. 查看浏览器控制台是否有错误信息
4. 检查文件路径和文件名是否正确

## 🔄 内容备份

建议定期备份你的内容文件：
1. 将 `src/content/` 文件夹备份到安全位置
2. 使用 Git 进行版本控制
3. 考虑使用云存储服务备份重要内容

---

**注意**: 这是一个静态网站，所有内容更改都需要重新构建和部署才能生效。在本地开发模式下，保存文件后刷新浏览器即可看到更改。
