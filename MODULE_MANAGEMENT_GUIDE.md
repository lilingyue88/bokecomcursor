# 模块管理指南

## 概述

本指南说明如何通过编辑 `src/content/modules.json` 文件来管理网站的内容分类。每个模块可以包含文章、笔记和资源，实现灵活的内容组织。

## 文件结构

```json
{
  "模块名称": {
    "name": "显示名称",
    "description": "模块描述",
    "icon": "图标名称",
    "color": "渐变色类名",
    "posts": ["文章slug1", "文章slug2"],
    "notes": ["笔记slug1", "笔记slug2"],
    "resources": ["资源slug1", "资源slug2"]
  }
}
```

## 配置说明

### 1. 模块名称
- **键名**: 用作 URL 路径，如 `技术探索` 对应 `/module/技术探索`
- **建议**: 使用简洁的中文名称，避免特殊字符

### 2. 基本信息
- **name**: 在页面上显示的模块名称
- **description**: 模块的详细描述，显示在模块页面顶部
- **icon**: 使用的图标名称（来自 Lucide React）
- **color**: Tailwind CSS 渐变色类名

### 3. 内容关联
- **posts**: 属于该模块的文章 slug 数组
- **notes**: 属于该模块的笔记 slug 数组  
- **resources**: 属于该模块的资源 slug 数组

## 如何添加新模块

### 步骤 1: 编辑 modules.json

```json
{
  "新模块": {
    "name": "新模块",
    "description": "新模块的详细描述",
    "icon": "Zap",
    "color": "from-yellow-500 to-orange-600",
    "posts": [],
    "notes": [],
    "resources": []
  }
}
```

### 步骤 2: 添加内容

将现有的文章、笔记、资源 slug 添加到对应数组中：

```json
{
  "新模块": {
    "posts": ["existing-post-1", "existing-post-2"],
    "notes": ["existing-note-1"],
    "resources": ["existing-resource-1"]
  }
}
```

### 步骤 3: 创建内容

在对应的内容目录中创建 Markdown 文件：

- **文章**: `src/content/posts/`
- **笔记**: `src/content/notes/`
- **资源**: `src/content/resources/`

## 如何修改现有模块

### 1. 更改模块信息

```json
{
  "技术探索": {
    "name": "技术探索与创新",
    "description": "更新后的描述内容",
    "icon": "Rocket",
    "color": "from-indigo-500 to-purple-600"
  }
}
```

### 2. 调整内容分类

```json
{
  "技术探索": {
    "posts": ["react-performance", "nextjs-optimization", "new-post"],
    "notes": ["typescript-tips", "git-workflow", "new-note"],
    "resources": ["frontend-tools", "new-resource"]
  }
}
```

## 内容关联方式

### 方式 1: 通过 slug 精确匹配

```json
"posts": ["exact-post-slug"]
```

### 方式 2: 通过标签自动匹配

在 Markdown 文件的 frontmatter 中添加对应标签：

```yaml
---
title: "文章标题"
tags: ["技术探索", "React", "性能优化"]
---
```

系统会自动将带有 `技术探索` 标签的内容归类到该模块。

## 注意事项

1. **slug 必须存在**: 确保 `posts`、`notes`、`resources` 数组中的 slug 对应实际存在的内容文件
2. **标签一致性**: 建议使用统一的标签命名规范
3. **URL 编码**: 中文模块名称会自动进行 URL 编码
4. **图标支持**: 使用 Lucide React 图标库中的图标名称

## 示例配置

```json
{
  "技术探索": {
    "name": "技术探索",
    "description": "分享前沿技术、架构设计、性能优化等深度技术内容",
    "icon": "Star",
    "color": "from-blue-500 to-purple-600",
    "posts": ["react-performance", "nextjs-optimization"],
    "notes": ["typescript-tips", "git-workflow"],
    "resources": ["frontend-tools", "backend-frameworks"]
  },
  "成长记录": {
    "name": "成长记录",
    "description": "记录技术学习历程、项目经验总结、职业发展思考",
    "icon": "TrendingUp",
    "color": "from-green-500 to-teal-600",
    "posts": ["career-journey", "project-lessons"],
    "notes": ["learning-notes", "skill-development"],
    "resources": ["learning-resources", "career-guides"]
  }
}
```

## 部署

修改 `modules.json` 文件后：

1. 保存文件
2. 提交更改: `git add . && git commit -m "更新模块配置"`
3. 推送到 GitHub: `git push origin main`

## 故障排除

### 问题 1: 模块页面显示 404
- 检查模块名称是否正确
- 确认 URL 路径格式: `/module/模块名称`

### 问题 2: 内容不显示
- 检查 slug 是否正确
- 确认内容文件是否存在
- 验证标签是否匹配

### 问题 3: 图标不显示
- 确认图标名称是否在 Lucide React 中存在
- 检查图标名称拼写是否正确

## 支持

如有问题，请检查：
1. 文件语法是否正确（JSON 格式）
2. 内容文件是否存在
3. 标签命名是否一致
4. 浏览器控制台是否有错误信息
