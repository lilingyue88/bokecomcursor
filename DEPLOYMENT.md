# 🚀 部署指南

## ✅ 部署状态

你的网站代码已经成功推送到 GitHub 仓库：[https://github.com/lilingyue88/bokecomcursor.git](https://github.com/lilingyue88/bokecomcursor.git)

## 🌐 部署选项

### 1. GitHub Pages (推荐)

#### 步骤 1: 启用 GitHub Pages
1. 访问你的 GitHub 仓库：https://github.com/lilingyue88/bokecomcursor
2. 点击 "Settings" 标签页
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 部分选择 "Deploy from a branch"
5. 选择 "main" 分支
6. 点击 "Save"

#### 步骤 2: 配置构建
由于这是一个 Next.js 项目，你需要配置 GitHub Actions 来自动构建和部署：

1. 在仓库根目录创建 `.github/workflows/deploy.yml` 文件
2. 文件内容如下：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build with Next.js
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 步骤 3: 配置 Next.js 导出
在 `next.config.js` 中添加：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### 2. Vercel (最简单)

#### 步骤 1: 连接 Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你的 `bokecomcursor` 仓库
5. 保持默认设置，点击 "Deploy"

#### 步骤 2: 自动部署
- 每次推送到 `main` 分支都会自动触发部署
- Vercel 会自动检测 Next.js 项目并配置构建

### 3. Netlify

#### 步骤 1: 连接 Netlify
1. 访问 [netlify.com](https://netlify.com)
2. 使用 GitHub 账号登录
3. 点击 "New site from Git"
4. 选择你的 `bokecomcursor` 仓库
5. 构建命令：`npm run build`
6. 发布目录：`.next`

## 🔧 本地测试

在部署之前，建议先在本地测试构建：

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 启动生产版本
npm start
```

## 📝 环境变量

如果需要配置环境变量，在部署平台中添加：

- `NEXT_PUBLIC_SITE_URL`: 你的网站 URL
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID (可选)

## 🚨 常见问题

### 1. 构建失败
- 检查 `package.json` 中的依赖版本
- 确保 Node.js 版本 >= 18
- 查看构建日志中的错误信息

### 2. 页面 404
- 确保 Next.js 配置正确
- 检查路由配置
- 验证静态导出设置

### 3. 样式问题
- 确保 Tailwind CSS 配置正确
- 检查 CSS 导入顺序
- 验证构建后的 CSS 文件

## 🔄 更新部署

### 自动更新
- **GitHub Pages**: 推送代码后自动触发 Actions 部署
- **Vercel**: 推送代码后自动部署
- **Netlify**: 推送代码后自动部署

### 手动更新
如果需要手动触发部署：
- **GitHub Pages**: 在 Actions 标签页手动运行 workflow
- **Vercel**: 在项目页面点击 "Redeploy"
- **Netlify**: 在项目页面点击 "Trigger deploy"

## 📊 性能优化

### 1. 图片优化
- 使用 WebP 格式
- 配置图片懒加载
- 使用适当的图片尺寸

### 2. 代码分割
- Next.js 自动代码分割
- 使用动态导入减少初始包大小

### 3. 缓存策略
- 配置适当的缓存头
- 使用 CDN 加速

## 🔍 监控和分析

### 1. 性能监控
- 使用 Vercel Analytics (如果使用 Vercel)
- 配置 Google PageSpeed Insights
- 监控 Core Web Vitals

### 2. 错误追踪
- 配置 Sentry 或类似服务
- 监控构建和运行时错误

## 🎯 下一步

1. **选择部署平台**：推荐 Vercel 或 GitHub Pages
2. **配置域名**：如果需要自定义域名
3. **设置 SSL**：确保 HTTPS 访问
4. **配置分析**：添加 Google Analytics 等
5. **监控性能**：定期检查网站性能

---

**注意**: 部署完成后，记得测试所有功能，确保网站正常运行！
