# 图片和相册管理指南

## 概述

这个目录用于管理网站的所有图片和相册。现在每个相册都有独立的 JSON 配置文件，便于管理和维护。

## 目录结构

```
src/content/images/
├── README.md           # 本说明文件
├── albums.md           # 相册配置说明
├── tech-share.json     # 技术分享相册配置
├── growth-record.json  # 成长记录相册配置
├── reading-notes.json  # 读书笔记相册配置
└── life-moments.json   # 生活瞬间相册配置

public/images/          # 实际图片文件存储位置
├── tech-share/         # 技术分享相册图片
├── growth-record/      # 成长记录相册图片
├── reading-notes/      # 读书笔记相册图片
└── life-moments/       # 生活瞬间相册图片
```

## 相册配置

### 技术分享相册 (`tech-share.json`)
- **名称**: 技术分享
- **描述**: 技术会议和分享活动的照片记录
- **标签**: 技术、会议、分享
- **图片文件夹**: `public/images/tech-share/`

### 成长记录相册 (`growth-record.json`)
- **名称**: 成长记录
- **描述**: 技术学习历程、项目经验总结、职业发展思考
- **标签**: 成长、学习、经验
- **图片文件夹**: `public/images/growth-record/`

### 读书笔记相册 (`reading-notes.json`)
- **名称**: 读书笔记
- **描述**: 好书推荐与阅读感悟，技术书籍精读笔记
- **标签**: 读书、笔记、感悟
- **图片文件夹**: `public/images/reading-notes/`

### 生活瞬间相册 (`life-moments.json`)
- **名称**: 生活瞬间
- **描述**: 日常生活和工作中的精彩瞬间，记录美好时光
- **标签**: 生活、工作、瞬间
- **图片文件夹**: `public/images/life-moments/`

## 如何添加图片

### 1. 上传图片文件

将图片文件复制到相应的相册文件夹：

```bash
# 技术分享相册
cp your-tech-image.jpg public/images/tech-share/

# 成长记录相册
cp your-growth-image.jpg public/images/growth-record/

# 读书笔记相册
cp your-reading-image.jpg public/images/reading-notes/

# 生活瞬间相册
cp your-life-image.jpg public/images/life-moments/
```

### 2. 更新相册配置

编辑对应的 JSON 文件，添加新图片信息。例如，在 `tech-share.json` 中添加：

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

## 创建新相册

### 1. 创建图片文件夹

```bash
mkdir public/images/new-album
```

### 2. 创建相册配置文件

在 `src/content/images/` 目录中创建 `new-album.json` 文件：

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

## 图片字段说明

### 必需字段
- `id`: 图片唯一标识符
- `src`: 图片文件路径（相对于 public 目录）
- `alt`: 图片替代文本（用于无障碍访问）
- `category`: 图片分类
- `tags`: 图片标签数组
- `createdAt`: 创建日期

### 可选字段
- `caption`: 图片标题或说明
- `width`: 图片宽度（像素）
- `height`: 图片高度（像素）

## 优势

### 独立管理
- 每个相册有独立的配置文件
- 便于单独编辑和维护
- 减少文件冲突

### 灵活扩展
- 可以轻松添加新相册
- 每个相册可以有不同的结构
- 支持不同的配置需求

### 版本控制
- 每个相册的更改可以独立提交
- 便于回滚特定相册的更改
- 更好的协作体验

## 注意事项

### 文件命名
- JSON 文件名必须与相册 slug 一致
- 图片文件名不要包含空格和特殊字符
- 使用小写字母和连字符

### 路径一致性
- 确保 JSON 中的图片路径与实际文件路径一致
- 图片路径必须以 `/images/` 开头
- 定期检查图片文件是否存在

### 数据同步
- 保持图片数量与 `imageCount` 字段同步
- 确保所有必需字段都已填写
- 定期验证 JSON 格式的正确性

## 故障排除

### 相册不显示
1. 检查 JSON 文件是否存在
2. 验证 JSON 格式是否正确
3. 确认相册 slug 是否唯一

### 图片不显示
1. 检查图片路径是否正确
2. 确认图片文件存在于指定位置
3. 检查文件权限

### 配置错误
1. 验证 JSON 语法
2. 检查必需字段是否完整
3. 查看控制台错误信息

## 下一步

现在你可以：
1. 在各个相册文件夹中上传图片
2. 编辑对应的 JSON 配置文件
3. 创建新的相册
4. 在网站中查看相册效果

如有问题，请参考示例配置或查看项目文档。
