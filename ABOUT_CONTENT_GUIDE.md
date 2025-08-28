# 📝 关于页面内容编辑指南

## 🎯 概述

关于页面现在使用 Markdown 文件管理内容，你可以轻松编辑个人信息、技能特长、联系方式等内容，无需修改代码。

## 📁 文件位置

**配置文件**: `src/content/about.md`

## ✏️ 如何编辑内容

### 1. 编辑 Markdown 文件

直接编辑 `src/content/about.md` 文件：

```bash
# 使用你喜欢的编辑器
code src/content/about.md
# 或者
vim src/content/about.md
# 或者
nano src/content/about.md
```

### 2. 文件结构说明

```markdown
---
title: "关于我"                    # 页面标题
description: "个人介绍..."         # 页面描述
avatar: "/images/avatar.jpg"      # 头像路径
lastUpdated: "2025-01-21"        # 最后更新时间
---

# 👋 关于我                      # 主标题

## 🎯 个人简介                   # 二级标题

内容内容内容...

## 🚀 技能特长

### 前端技术                     # 三级标题
- **框架**: React, Vue, Angular  # 列表项
- **语言**: JavaScript, TypeScript
```

## 🖼️ 头像管理

### 更换头像

1. **上传新头像**到 `public/images/` 文件夹
2. **更新配置文件**中的 `avatar` 字段：

```markdown
---
avatar: "/images/your-new-avatar.jpg"
---
```

### 头像要求

- **格式**: JPG, PNG, WebP
- **尺寸**: 建议 300x300 像素以上
- **文件大小**: 建议小于 2MB
- **路径**: 必须以 `/images/` 开头

## 📝 内容编辑示例

### 修改个人简介

```markdown
## 🎯 个人简介

你好！我是一名热爱技术的开发者，专注于前端开发和全栈技术。
我拥有5年的开发经验，参与过多个大型项目的开发。
我喜欢探索新技术，解决实际问题，并分享我的学习经验。
```

### 添加新技能

```markdown
### 新增技能
- **AI/ML**: TensorFlow, PyTorch, 机器学习
- **区块链**: Ethereum, Solidity, 智能合约
- **移动开发**: React Native, Flutter
```

### 更新联系方式

```markdown
### 联系方式
- **邮箱**: your-real-email@example.com
- **微信**: your-real-wechat-id
- **QQ**: your-real-qq-number
- **LinkedIn**: [你的LinkedIn链接](https://linkedin.com/in/your-profile)
```

## 🎨 Markdown 语法支持

### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
```

### 文本格式

```markdown
**粗体文本**
*斜体文本*
~~删除线文本~~
`行内代码`
```

### 列表

```markdown
- 无序列表项
- 另一个列表项
  - 嵌套列表项

1. 有序列表项
2. 第二个列表项
```

### 链接和图片

```markdown
[链接文本](https://example.com)
![图片描述](图片路径)
```

### 引用

```markdown
> 这是一个引用块
> 可以有多行
```

### 代码块

```markdown
```javascript
function hello() {
  console.log("Hello World!");
}
```
```

## 🔧 高级功能

### 自定义样式

Markdown 内容会自动应用美观的样式，包括：

- 响应式布局
- 深色/浅色主题支持
- 代码高亮
- 链接悬停效果
- 列表样式

### SEO 优化

页面会自动生成：

- 页面标题
- 页面描述
- Open Graph 标签
- 头像图片

## 📋 编辑检查清单

编辑完成后，请检查：

- [ ] 头像路径正确
- [ ] 标题和描述合适
- [ ] 内容格式正确
- [ ] 链接有效
- [ ] 时间信息准确

## 🚀 部署和更新

### 本地预览

```bash
npm run dev
# 访问 http://localhost:3000/about
```

### 推送到 GitHub

```bash
git add src/content/about.md
git commit -m "更新关于页面内容"
git push origin main
```

### 自动部署

如果使用 Vercel 等平台，推送后会自动重新部署。

## 🆘 常见问题

### Q: 头像不显示？
A: 检查头像路径是否正确，确保图片文件存在于指定位置。

### Q: 内容格式错乱？
A: 检查 Markdown 语法是否正确，特别是标题层级和列表格式。

### Q: 如何添加新的内容板块？
A: 在 Markdown 文件中添加新的二级标题（##）即可。

### Q: 可以添加图片到内容中吗？
A: 可以！使用 Markdown 图片语法：`![描述](图片路径)`

### Q: 如何设置不同的头像？
A: 修改 frontmatter 中的 `avatar` 字段，指向新的图片路径。

## 💡 最佳实践

### 内容组织

1. **逻辑清晰**: 按重要性或时间顺序组织内容
2. **层次分明**: 使用合适的标题层级
3. **信息完整**: 包含必要的联系方式和背景信息
4. **定期更新**: 保持内容的时效性

### 技术细节

1. **图片优化**: 使用适当大小的图片
2. **链接检查**: 确保所有链接都有效
3. **格式一致**: 保持 Markdown 格式的一致性
4. **备份重要**: 定期备份重要的个人信息

## 🎉 开始编辑

现在你可以：

1. **编辑 `src/content/about.md`** 文件
2. **更换头像** 到 `public/images/` 文件夹
3. **自定义内容** 使用 Markdown 语法
4. **预览效果** 运行 `npm run dev`
5. **推送到 GitHub** 分享你的更新

如有问题，请参考示例内容或查看项目文档！
