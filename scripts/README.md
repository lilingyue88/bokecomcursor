# 🚀 图片自动推送脚本

## 📋 功能说明

这个脚本可以自动将本地文件夹中的图片推送到 GitHub 仓库的相册中，包括：

- ✅ 自动复制图片到目标相册文件夹
- ✅ 自动更新相册配置文件
- ✅ 自动推送到 GitHub 仓库
- ✅ 支持多种图片格式
- ✅ 智能文件重命名（避免冲突）

## 🎯 支持的相册

| 相册标识符 | 相册名称 | 配置文件 |
|-----------|----------|----------|
| `tech-share` | 技术分享 | `src/content/images/tech-share.json` |
| `growth-record` | 成长记录 | `src/content/images/growth-record.json` |
| `reading-notes` | 读书笔记 | `src/content/images/reading-notes.json` |
| `life-moments` | 生活瞬间 | `src/content/images/life-moments.json` |

## 🚀 使用方法

### 基本语法

```bash
node scripts/image-uploader.js <本地文件夹路径> <GitHub仓库照片文件夹链接>
```

### 使用示例

#### 1. 上传图片到技术分享相册

```bash
node scripts/image-uploader.js ./my-tech-photos https://github.com/lilingyue88/bokecomcursor/tree/main/public/images/tech-share
```

#### 2. 上传图片到成长记录相册

```bash
node scripts/image-uploader.js ./my-growth-photos https://github.com/lilingyue88/bokecomcursor/tree/main/public/images/growth-record
```

#### 3. 上传图片到读书笔记相册

```bash
node scripts/image-uploader.js ./my-reading-photos https://github.com/lilingyue88/bokecomcursor/tree/main/public/images/reading-notes
```

#### 4. 上传图片到生活瞬间相册

```bash
node scripts/image-uploader.js ./my-life-photos https://github.com/lilingyue88/bokecomcursor/tree/main/public/images/life-moments
```

## 📁 目录结构示例

### 本地图片文件夹结构

```
my-photos/
├── photo1.jpg
├── photo2.png
├── photo3.webp
└── photo4.gif
```

### 运行后的项目结构

```
public/images/tech-share/
├── photo1.jpg
├── photo2.png
├── photo3.webp
└── photo4.gif

src/content/images/tech-share.json
└── 自动更新的配置文件
```

## 🎨 支持的图片格式

- ✅ **JPG/JPEG** - 最常用的图片格式
- ✅ **PNG** - 支持透明背景
- ✅ **WebP** - 现代高效格式
- ✅ **GIF** - 支持动画

## ⚙️ 工作流程

### 1. 验证输入参数
- 检查本地文件夹是否存在
- 从 GitHub 链接提取相册标识符
- 验证相册是否支持

### 2. 处理图片文件
- 扫描本地文件夹中的图片
- 过滤支持的图片格式
- 复制图片到目标相册文件夹

### 3. 更新配置文件
- 读取相册配置文件
- 添加新图片信息
- 更新图片数量统计
- 生成唯一图片ID

### 4. 推送到 GitHub
- 添加所有更改到 Git
- 提交更改
- 推送到远程仓库

## 🔧 高级功能

### 自动文件重命名

如果目标文件夹中已存在同名文件，脚本会自动重命名：

```
原文件名: photo.jpg
新文件名: photo_1703123456789.jpg
```

### 智能标签生成

根据相册类型自动生成合适的标签：

- **技术分享**: `["技术", "分享"]`
- **成长记录**: `["成长", "学习"]`
- **读书笔记**: `["读书", "笔记"]`
- **生活瞬间**: `["生活", "瞬间"]`

### 自动分类

根据相册类型自动设置图片分类：

- **技术分享**: `技术`
- **成长记录**: `成长`
- **读书笔记**: `读书`
- **生活瞬间**: `生活`

## 📝 配置文件更新示例

### 更新前

```json
{
  "id": "tech-share",
  "name": "技术分享",
  "imageCount": 2,
  "images": [
    {
      "id": "tech-meeting-1",
      "src": "/images/tech-share/meeting-1.jpg",
      "alt": "技术会议现场",
      "caption": "2024年技术分享会现场照片"
    }
  ]
}
```

### 更新后

```json
{
  "id": "tech-share",
  "name": "技术分享",
  "imageCount": 3,
  "images": [
    {
      "id": "tech-meeting-1",
      "src": "/images/tech-share/meeting-1.jpg",
      "alt": "技术会议现场",
      "caption": "2024年技术分享会现场照片"
    },
    {
      "id": "tech-share-1703123456789-0",
      "src": "/images/tech-share/photo1.jpg",
      "alt": "photo1",
      "caption": "photo1",
      "category": "技术",
      "tags": ["技术", "分享"],
      "createdAt": "2025-01-21"
    }
  ]
}
```

## 🚨 注意事项

### 前置条件

1. **Node.js 环境**: 确保已安装 Node.js
2. **Git 配置**: 确保 Git 已配置并可以推送到远程仓库
3. **权限**: 确保有写入项目目录的权限

### 文件命名建议

- 使用英文文件名
- 避免空格和特殊字符
- 使用连字符或下划线分隔单词
- 建议格式: `category-description.jpg`

### 图片规格建议

- **尺寸**: 不超过 2000x2000 像素
- **文件大小**: 建议小于 2MB
- **格式**: 优先使用 JPG 或 WebP

## 🔍 故障排除

### 常见错误

#### 1. 本地文件夹不存在
```
❌ 本地文件夹不存在: ./my-photos
```
**解决方案**: 检查文件夹路径是否正确

#### 2. 无法提取相册标识符
```
❌ 无法从 GitHub 链接中提取相册标识符
```
**解决方案**: 确保 GitHub 链接格式正确，包含 `/images/相册名`

#### 3. 相册配置文件不存在
```
❌ 相册配置文件不存在: src/content/images/tech-share.json
```
**解决方案**: 检查相册标识符是否正确

#### 4. Git 推送失败
```
❌ GitHub 推送失败: ...
```
**解决方案**: 检查 Git 配置和网络连接

### 调试模式

如果需要查看详细日志，可以修改脚本添加更多 `console.log` 语句。

## 📚 相关文档

- [图片上传指南](../IMAGE_UPLOAD_GUIDE.md)
- [相册配置说明](../src/content/images/README.md)
- [项目部署指南](../DEPLOYMENT.md)

## 🤝 贡献

如果你发现 bug 或有改进建议，欢迎提交 Issue 或 Pull Request！

## 📄 许可证

本项目采用 MIT 许可证。
