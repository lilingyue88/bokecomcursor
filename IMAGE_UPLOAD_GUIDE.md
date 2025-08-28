# 图片上传和管理指南

## 🎯 概述

本指南将教你如何在网站中上传图片、创建相册，并管理图片内容。现在你可以：

1. ✅ 在 `src/content/images/` 目录中管理图片
2. ✅ 创建多个相册集
3. ✅ 点击相册进入查看详细图片
4. ✅ 使用灯箱功能查看大图

## 📁 目录结构

```
src/content/images/
├── README.md           # 详细说明文档
├── albums.md           # 相册配置说明
├── albums.json         # 相册数据文件
├── tech-share/         # 技术分享相册
├── life-record/        # 生活记录相册
└── travel-memory/      # 旅行记忆相册

public/images/          # 实际图片文件存储位置
├── tech-share/         # 技术分享相册图片
├── life-record/        # 生活记录相册图片
└── travel-memory/      # 旅行记忆相册图片
```

## 🚀 快速开始

### 第一步：上传图片文件

1. **准备图片文件**：
   - 支持的格式：JPG、PNG、WebP、GIF
   - 建议尺寸：不超过 2000x2000 像素
   - 文件大小：建议小于 2MB

2. **上传到相册文件夹**：
   ```bash
   # 将图片复制到相应的相册文件夹
   cp your-image.jpg public/images/tech-share/
   cp your-image.jpg public/images/life-record/
   cp your-image.jpg public/images/travel-memory/
   ```

### 第二步：配置相册信息

编辑 `src/content/images/albums.json` 文件，添加新图片信息：

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
      "alt": "新上传的图片",
      "caption": "新添加的技术分享照片",
      "category": "分享",
      "tags": ["技术分享", "新照片"],
      "createdAt": "2025-01-21"
    }
  ]
}
```

### 第三步：查看效果

1. **访问相册列表**：`/gallery`
2. **点击相册进入详情**：`/gallery/tech-share`
3. **点击图片查看大图**：使用灯箱功能

## 📸 图片字段说明

### 必需字段
- `id`: 图片唯一标识符（建议使用描述性名称）
- `src`: 图片文件路径（相对于 public 目录）
- `alt`: 图片替代文本（用于无障碍访问）
- `category`: 图片分类
- `tags`: 图片标签数组
- `createdAt`: 创建日期

### 可选字段
- `caption`: 图片标题或说明
- `width`: 图片宽度（像素）
- `height`: 图片高度（像素）

## 🎨 相册管理

### 创建新相册

1. **创建文件夹**：
   ```bash
   mkdir public/images/new-album
   ```

2. **更新 albums.json**：
   ```json
   {
     "id": "new-album",
     "name": "新相册",
     "slug": "new-album",
     "description": "新相册的描述",
     "cover": "/images/new-album/cover.jpg",
     "category": "新分类",
     "tags": ["新标签"],
     "createdAt": "2025-01-21",
     "imageCount": 0,
     "images": []
   }
   ```

### 删除相册

1. **从 albums.json 中移除相册**
2. **删除对应的文件夹**：
   ```bash
   rm -rf public/images/old-album
   ```

### 编辑相册信息

直接修改 `albums.json` 文件中的相应字段即可。

## 🔧 高级功能

### 灯箱查看

- 点击任何图片都会打开灯箱
- 支持键盘导航（左右箭头、ESC）
- 显示图片标题和描述

### 响应式网格

- 自动适应不同屏幕尺寸
- 移动端：2列
- 平板：3列
- 桌面：4-5列

### 标签系统

- 支持多标签分类
- 标签用于搜索和分类
- 可以按标签筛选图片

## 📱 使用示例

### 示例1：添加技术分享照片

1. **上传图片**：
   ```bash
   cp ~/Downloads/tech-conference.jpg public/images/tech-share/
   ```

2. **更新配置**：
   ```json
   {
     "id": "tech-conference-2024",
     "src": "/images/tech-share/tech-conference.jpg",
     "alt": "2024年技术大会",
     "caption": "年度技术大会现场盛况",
     "category": "大会",
     "tags": ["技术大会", "2024", "盛况"],
     "createdAt": "2025-01-21"
   }
   ```

### 示例2：创建生活相册

1. **创建文件夹**：
   ```bash
   mkdir public/images/daily-life
   ```

2. **添加相册配置**：
   ```json
   {
     "id": "daily-life",
     "name": "日常生活",
     "slug": "daily-life",
     "description": "记录日常生活的点点滴滴",
     "cover": "/images/daily-life/cover.jpg",
     "category": "生活",
     "tags": ["生活", "日常", "记录"],
     "createdAt": "2025-01-21",
     "imageCount": 0,
     "images": []
   }
   ```

## ⚠️ 注意事项

### 文件管理
- 图片文件必须放在 `public/images/` 目录下
- 路径必须以 `/images/` 开头
- 避免使用中文文件名

### 性能优化
- 图片尺寸不要过大
- 使用适当的图片格式
- 考虑图片压缩

### 数据一致性
- 确保 `albums.json` 中的图片路径与实际文件路径一致
- 定期检查图片文件是否存在
- 保持图片数量与 `imageCount` 字段同步

## 🚀 部署和更新

### 本地开发
1. 上传图片到相应文件夹
2. 更新 `albums.json` 配置
3. 刷新浏览器查看效果

### 生产部署
1. 提交所有更改到 Git
2. 推送到 GitHub 仓库
3. Vercel 自动重新构建和部署

## 🔍 故障排除

### 图片不显示
- 检查文件路径是否正确
- 确认文件存在于指定位置
- 检查文件权限

### 相册页面错误
- 验证 JSON 格式是否正确
- 检查相册 slug 是否唯一
- 确认所有必需字段都已填写

### 灯箱不工作
- 检查图片路径是否正确
- 确认图片格式受支持
- 查看浏览器控制台错误

## 📚 相关文档

- [Markdown 内容管理指南](./MARKDOWN_CONTENT_GUIDE.md)
- [相册配置说明](./src/content/images/README.md)
- [项目部署指南](./DEPLOYMENT.md)

## 🎉 开始使用

现在你可以：

1. **上传图片**到相应的相册文件夹
2. **编辑相册配置**在 `albums.json` 中
3. **查看相册**在 `/gallery` 页面
4. **管理图片**通过编辑配置文件

如有问题，请参考示例配置或查看相关文档！
