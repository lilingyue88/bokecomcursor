#!/usr/bin/env node

/**
 * 图片自动推送程序
 * 功能：将本地文件夹中的图片自动推送到 GitHub 仓库
 * 
 * 使用方法：
 * node scripts/image-uploader.js <本地文件夹路径> <GitHub仓库照片文件夹链接>
 * 
 * 示例：
 * node scripts/image-uploader.js ./my-photos https://github.com/lilingyue88/bokecomcursor/tree/main/public/images/tech-share
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ImageUploader {
  constructor() {
    this.supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    this.albumConfigs = {
      'tech-share': 'src/content/images/tech-share.json',
      'growth-record': 'src/content/images/growth-record.json',
      'reading-notes': 'src/content/images/reading-notes.json',
      'life-moments': 'src/content/images/life-moments.json'
    };
  }

  /**
   * 主函数
   */
  async main() {
    try {
      console.log('🖼️  图片自动推送程序启动...\n');

      // 获取命令行参数
      const args = process.argv.slice(2);
      if (args.length !== 2) {
        this.showUsage();
        process.exit(1);
      }

      const localFolderPath = args[0];
      const githubFolderUrl = args[1];

      // 验证参数
      if (!this.validateLocalFolder(localFolderPath)) {
        process.exit(1);
      }

      const albumSlug = this.extractAlbumSlug(githubFolderUrl);
      if (!albumSlug) {
        console.error('❌ 无法从 GitHub 链接中提取相册标识符');
        process.exit(1);
      }

      console.log(`📁 本地文件夹: ${localFolderPath}`);
      console.log(`🎯 目标相册: ${albumSlug}`);
      console.log('');

      // 执行图片推送流程
      await this.uploadImages(localFolderPath, albumSlug);

      console.log('\n✅ 图片推送完成！');
      console.log('🚀 正在推送到 GitHub 仓库...');

      // 推送到 GitHub
      this.pushToGitHub(albumSlug);

      console.log('\n🎉 所有操作完成！');
      console.log(`📸 请访问 https://github.com/lilingyue88/bokecomcursor 查看上传的图片`);

    } catch (error) {
      console.error('\n❌ 程序执行出错:', error.message);
      process.exit(1);
    }
  }

  /**
   * 显示使用说明
   */
  showUsage() {
    console.log('使用方法:');
    console.log('  node scripts/image-uploader.js <本地文件夹路径> <GitHub仓库照片文件夹链接>');
    console.log('');
    console.log('示例:');
    console.log('  node scripts/image-uploader.js ./my-photos https://github.com/lilingyue88/bokecomcursor/tree/main/public/images/tech-share');
    console.log('');
    console.log('支持的相册:');
    console.log('  - tech-share (技术分享)');
    console.log('  - growth-record (成长记录)');
    console.log('  - reading-notes (读书笔记)');
    console.log('  - life-moments (生活瞬间)');
  }

  /**
   * 验证本地文件夹
   */
  validateLocalFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
      console.error(`❌ 本地文件夹不存在: ${folderPath}`);
      return false;
    }

    if (!fs.statSync(folderPath).isDirectory()) {
      console.error(`❌ 路径不是文件夹: ${folderPath}`);
      return false;
    }

    return true;
  }

  /**
   * 从 GitHub 链接中提取相册标识符
   */
  extractAlbumSlug(githubUrl) {
    const match = githubUrl.match(/\/images\/([^\/]+)/);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }

  /**
   * 上传图片到相册
   */
  async uploadImages(localFolderPath, albumSlug) {
    console.log('📸 开始处理图片...');

    // 获取本地图片文件
    const imageFiles = this.getImageFiles(localFolderPath);
    if (imageFiles.length === 0) {
      console.log('⚠️  本地文件夹中没有找到支持的图片文件');
      return;
    }

    console.log(`📊 找到 ${imageFiles.length} 张图片`);

    // 复制图片到目标相册文件夹
    const targetFolder = `public/images/${albumSlug}`;
    this.ensureTargetFolder(targetFolder);
    
    const uploadedImages = [];
    for (const imageFile of imageFiles) {
      const result = await this.copyImage(imageFile, targetFolder);
      if (result.success) {
        uploadedImages.push(result.imageInfo);
        console.log(`✅ ${result.imageInfo.filename} - 上传成功`);
      } else {
        console.log(`❌ ${imageFile} - 上传失败: ${result.error}`);
      }
    }

    // 更新相册配置文件
    if (uploadedImages.length > 0) {
      this.updateAlbumConfig(albumSlug, uploadedImages);
      console.log(`📝 相册配置文件已更新: ${this.albumConfigs[albumSlug]}`);
    }

    return uploadedImages;
  }

  /**
   * 获取本地图片文件
   */
  getImageFiles(folderPath) {
    const files = fs.readdirSync(folderPath);
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return this.supportedFormats.includes(ext);
      })
      .map(file => path.join(folderPath, file));
  }

  /**
   * 确保目标文件夹存在
   */
  ensureTargetFolder(targetFolder) {
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
      console.log(`📁 创建目标文件夹: ${targetFolder}`);
    }
  }

  /**
   * 复制图片文件
   */
  async copyImage(sourcePath, targetFolder) {
    try {
      const filename = path.basename(sourcePath);
      const targetPath = path.join(targetFolder, filename);
      
      // 检查文件是否已存在
      if (fs.existsSync(targetPath)) {
        const timestamp = new Date().getTime();
        const nameWithoutExt = path.parse(filename).name;
        const ext = path.extname(filename);
        const newFilename = `${nameWithoutExt}_${timestamp}${ext}`;
        const newTargetPath = path.join(targetFolder, newFilename);
        
        fs.copyFileSync(sourcePath, newTargetPath);
        return {
          success: true,
          imageInfo: {
            filename: newFilename,
            src: `/images/${path.basename(targetFolder)}/${newFilename}`,
            originalName: filename
          }
        };
      } else {
        fs.copyFileSync(sourcePath, targetPath);
        return {
          success: true,
          imageInfo: {
            filename: filename,
            src: `/images/${path.basename(targetFolder)}/${filename}`,
            originalName: filename
          }
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 更新相册配置文件
   */
  updateAlbumConfig(albumSlug, newImages) {
    const configPath = this.albumConfigs[albumSlug];
    if (!fs.existsSync(configPath)) {
      console.error(`❌ 相册配置文件不存在: ${configPath}`);
      return;
    }

    try {
      const configContent = fs.readFileSync(configPath, 'utf8');
      const config = JSON.parse(configContent);

      // 为每张新图片生成唯一ID
      newImages.forEach((imageInfo, index) => {
        const imageId = `${albumSlug}-${Date.now()}-${index}`;
        const newImage = {
          id: imageId,
          src: imageInfo.src,
          alt: this.generateAltText(imageInfo.filename),
          caption: this.generateCaption(imageInfo.filename),
          category: this.getCategoryFromAlbum(albumSlug),
          tags: this.getTagsFromAlbum(albumSlug),
          createdAt: new Date().toISOString().split('T')[0]
        };

        config.images.push(newImage);
      });

      // 更新图片数量
      config.imageCount = config.images.length;

      // 写入配置文件
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    } catch (error) {
      console.error(`❌ 更新相册配置失败: ${error.message}`);
    }
  }

  /**
   * 生成图片替代文本
   */
  generateAltText(filename) {
    const nameWithoutExt = path.parse(filename).name;
    return nameWithoutExt.replace(/[-_]/g, ' ');
  }

  /**
   * 生成图片标题
   */
  generateCaption(filename) {
    const nameWithoutExt = path.parse(filename).name;
    return nameWithoutExt.replace(/[-_]/g, ' ');
  }

  /**
   * 根据相册获取分类
   */
  getCategoryFromAlbum(albumSlug) {
    const categories = {
      'tech-share': '技术',
      'growth-record': '成长',
      'reading-notes': '读书',
      'life-moments': '生活'
    };
    return categories[albumSlug] || '其他';
  }

  /**
   * 根据相册获取标签
   */
  getTagsFromAlbum(albumSlug) {
    const tags = {
      'tech-share': ['技术', '分享'],
      'growth-record': ['成长', '学习'],
      'reading-notes': ['读书', '笔记'],
      'life-moments': ['生活', '瞬间']
    };
    return tags[albumSlug] || ['其他'];
  }

  /**
   * 推送到 GitHub
   */
  pushToGitHub(albumSlug) {
    try {
      console.log('🔄 添加文件到 Git...');
      execSync('git add .', { stdio: 'inherit' });

      console.log('💾 提交更改...');
      const commitMessage = `feat: 自动上传图片到 ${albumSlug} 相册`;
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

      console.log('🚀 推送到 GitHub...');
      execSync('git push origin main', { stdio: 'inherit' });

      console.log('✅ GitHub 推送完成！');
    } catch (error) {
      console.error('❌ GitHub 推送失败:', error.message);
      throw error;
    }
  }
}

// 运行程序
const uploader = new ImageUploader();
uploader.main().catch(console.error);
