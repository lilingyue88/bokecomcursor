# 🖼️ 图片上传指南

## 📁 文件夹结构

现在 `public/images/` 文件夹已经在 GitHub 仓库中了！你可以直接上传图片到对应的相册文件夹：

```
public/images/
├── tech-share/         # 技术分享相册
├── growth-record/      # 成长记录相册
├── reading-notes/      # 读书笔记相册
└── life-moments/       # 生活瞬间相册
```

## 🚀 如何上传图片

### 方法 1：通过 GitHub 网页上传（推荐）

1. **访问你的仓库**: https://github.com/lilingyue88/bokecomcursor
2. **进入相册文件夹**: 点击 `public/images/` → 选择相册文件夹（如 `tech-share`）
3. **上传图片**: 点击 "Add file" → "Upload files"
4. **拖拽图片**: 将图片文件拖拽到上传区域
5. **提交更改**: 添加提交信息，如 "添加技术分享照片"，然后点击 "Commit changes"

### 方法 2：通过 Git 命令行上传

```bash
# 1. 将图片复制到对应文件夹
cp your-image.jpg public/images/tech-share/

# 2. 添加到 Git
git add public/images/tech-share/your-image.jpg

# 3. 提交更改
git commit -m "添加技术分享照片"

# 4. 推送到 GitHub
git push origin main
```

## 📝 更新相册配置

上传图片后，需要更新对应的 JSON 配置文件：

### 1. 编辑相册配置文件

在 `src/content/images/` 目录中找到对应的 JSON 文件：
- `tech-share.json` - 技术分享相册
- `growth-record.json` - 成长记录相册
- `reading-notes.json` - 读书笔记相册
- `life-moments.json` - 生活瞬间相册

### 2. 添加图片信息

在 `images` 数组中添加新图片：

```json
{
  "id": "tech-meeting-3",
  "src": "/images/tech-share/your-new-image.jpg",
  "alt": "新图片描述",
  "caption": "新图片标题",
  "category": "会议",
  "tags": ["技术分享", "新照片"],
  "createdAt": "2025-01-21"
}
```

### 3. 更新图片数量

记得更新 `imageCount` 字段：

```json
"imageCount": 3
```

## 🎯 图片要求

### 支持的格式
- ✅ JPG/JPEG
- ✅ PNG
- ✅ WebP
- ✅ GIF

### 建议规格
- **尺寸**: 不超过 2000x2000 像素
- **文件大小**: 建议小于 2MB
- **命名**: 使用英文，避免空格和特殊字符

### 命名示例
```
meeting-1.jpg
tech-discussion.png
workshop-photo.webp
```

## 🔄 完整工作流程

### 步骤 1：上传图片文件
1. 将图片上传到 `public/images/[相册名]/` 文件夹
2. 通过 GitHub 网页或 Git 命令行

### 步骤 2：更新相册配置
1. 编辑对应的 JSON 配置文件
2. 添加新图片信息到 `images` 数组
3. 更新 `imageCount` 字段

### 步骤 3：提交更改
1. 提交图片文件更改
2. 提交配置文件更改
3. 推送到 GitHub

### 步骤 4：查看效果
1. 等待部署完成（如果使用 Vercel 等平台）
2. 访问 `/gallery` 查看相册列表
3. 点击相册查看详细图片

## 📋 示例：添加技术分享照片

### 1. 上传图片
- 将 `meeting-3.jpg` 上传到 `public/images/tech-share/`

### 2. 更新配置
编辑 `src/content/images/tech-share.json`：

```json
{
  "id": "tech-share",
  "name": "技术分享",
  "slug": "tech-share",
  "description": "技术会议和分享活动的照片记录",
  "cover": "/images/tech-share/cover.jpg",
  "category": "技术",
  "tags": ["技术", "会议", "分享"],
  "createdAt": "2025-01-20",
  "imageCount": 3,
  "images": [
    {
      "id": "tech-meeting-1",
      "src": "/images/tech-share/meeting-1.jpg",
      "alt": "技术会议现场",
      "caption": "2024年技术分享会现场照片",
      "category": "会议",
      "tags": ["技术分享", "会议"],
      "createdAt": "2025-01-20"
    },
    {
      "id": "tech-meeting-2",
      "src": "/images/tech-share/meeting-2.jpg",
      "alt": "小组讨论",
      "caption": "小组技术讨论环节",
      "category": "讨论",
      "tags": ["技术讨论", "小组"],
      "createdAt": "2025-01-20"
    },
    {
      "id": "tech-meeting-3",
      "src": "/images/tech-share/meeting-3.jpg",
      "alt": "新添加的会议照片",
      "caption": "最新技术分享会照片",
      "category": "会议",
      "tags": ["技术分享", "最新"],
      "createdAt": "2025-01-21"
    }
  ]
}
```

## 🚨 注意事项

### 路径一致性
- 确保 JSON 中的 `src` 路径与实际文件路径一致
- 图片路径必须以 `/images/` 开头
- 路径区分大小写

### 数据同步
- 保持 `imageCount` 与实际图片数量一致
- 确保每个图片都有唯一的 `id`
- 定期检查图片文件是否存在

### 版本控制
- 图片文件和配置文件要一起提交
- 使用清晰的提交信息
- 定期备份重要图片

## 🆘 常见问题

### Q: 图片上传后不显示？
A: 检查 JSON 配置文件中的路径是否正确，确保图片已上传到正确文件夹。

### Q: 如何删除图片？
A: 从文件夹中删除图片文件，然后从 JSON 配置中移除对应条目，更新 `imageCount`。

### Q: 可以创建新相册吗？
A: 可以！创建新文件夹和对应的 JSON 配置文件即可。

### Q: 图片太大怎么办？
A: 使用图片压缩工具（如 TinyPNG）压缩后再上传。

## 🎉 开始使用

现在你可以：
1. **立即上传图片**到对应的相册文件夹
2. **编辑 JSON 配置文件**添加图片信息
3. **在网站中查看**相册效果

如有问题，请参考示例配置或查看项目文档！
