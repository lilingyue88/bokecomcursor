#!/usr/bin/env node

/**
 * 自定义图片推送脚本 - 推送 first 文件夹中的图片
 * 使用方法：node scripts/upload-first-images.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class FirstImageUploader {
  constructor() {
    this.supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    this.sourceFolder = 'public/images/first'; // 源文件夹路径
    this.targetAlbum = 'tech-share'; // 目标相册（可以修改）
    this.targetFolder = `public/images/${this.targetAlbum}`;
    this.configFile = `src/content/images/${this.targetAlbum}.json`;
  }

  async main() {
    try {
      console.log('🖼️  First 文件夹图片推送程序启动...\n');

      // 检查源文件夹是否存在
      if (!this.validateSourceFolder()) {
        process.exit(1);
      }

      console.log(`📁 源文件夹: ${this.sourceFolder}`);
      console.log(`🎯 目标相册: ${this.targetAlbum}`);
      console.log('');

      // 执行图片推送流程
      await this.uploadImages();

      console.log('\n✅ 图片推送完成！');
      console.log('🚀 正在推送到 GitHub 仓库...');

      // 推送到 GitHub
      this.pushToGitHub();

      console.log('\n🎉 所有操作完成！');
      console.log(`📸 请访问 https://github.com/lilingyue88/bokecomcursor 查看上传的图片`);

    } catch (error) {
      console.error('\n❌ 程序执行出错:', error.message);
      process.exit(1);
    }
  }

  /**
   * 验证源文件夹
   */
  validateSourceFolder() {
    if (!fs.existsSync(this.sourceFolder)) {
      console.error(`❌ 源文件夹不存在: ${this.sourceFolder}`);
      console.log('💡 请确保 first 文件夹存在于 public/images/ 目录中');
      return false;
    }

    if (!fs.statSync(this.sourceFolder).isDirectory()) {
      console.error(`❌ 路径不是文件夹: ${this.sourceFolder}`);
      return false;
    }

    return true;
  }

  /**
   * 上传图片到相册
   */
  async uploadImages() {
    console.log('📸 开始处理图片...');

    // 获取本地图片文件
    const imageFiles = this.getImageFiles();
    if (imageFiles.length === 0) {
      console.log('⚠️  first 文件夹中没有找到支持的图片文件');
      return;
    }

    console.log(`📊 找到 ${imageFiles.length} 张图片`);

    // 确保目标文件夹存在
    this.ensureTargetFolder();
    
    const uploadedImages = [];
    for (const imageFile of imageFiles) {
      const result = await this.copyImage(imageFile);
      if (result.success) {
        uploadedImages.push(result.imageInfo);
        console.log(`✅ ${result.imageInfo.filename} - 上传成功`);
      } else {
        console.log(`❌ ${imageFile} - 上传失败: ${result.error}`);
      }
    }

    // 更新相册配置文件
    if (uploadedImages.length > 0) {
      this.updateAlbumConfig(uploadedImages);
      console.log(`📝 相册配置文件已更新: ${this.configFile}`);
    }

    return uploadedImages;
  }

  /**
   * 获取本地图片文件
   */
  getImageFiles() {
    const files = fs.readdirSync(this.sourceFolder);
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return this.supportedFormats.includes(ext);
      })
      .map(file => path.join(this.sourceFolder, file));
  }

  /**
   * 确保目标文件夹存在
   */
  ensureTargetFolder() {
    if (!fs.existsSync(this.targetFolder)) {
      fs.mkdirSync(this.targetFolder, { recursive: true });
      console.log(`📁 创建目标文件夹: ${this.targetFolder}`);
    }
  }

  /**
   * 复制图片文件
   */
  async copyImage(sourcePath) {
    try {
      const filename = path.basename(sourcePath);
      const targetPath = path.join(this.targetFolder, filename);
      
      // 检查文件是否已存在
      if (fs.existsSync(targetPath)) {
        const timestamp = new Date().getTime();
        const nameWithoutExt = path.parse(filename).name;
        const ext = path.extname(filename);
        const newFilename = `${nameWithoutExt}_${timestamp}${ext}`;
        const newTargetPath = path.join(this.targetFolder, newFilename);
        
        fs.copyFileSync(sourcePath, newTargetPath);
        return {
          success: true,
          imageInfo: {
            filename: newFilename,
            src: `/images/${this.targetAlbum}/${newFilename}`,
            originalName: filename
          }
        };
      } else {
        fs.copyFileSync(sourcePath, targetPath);
        return {
          success: true,
          imageInfo: {
            filename: filename,
            src: `/images/${this.targetAlbum}/${filename}`,
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
  updateAlbumConfig(newImages) {
    if (!fs.existsSync(this.configFile)) {
      console.error(`❌ 相册配置文件不存在: ${this.configFile}`);
      return;
    }

    try {
      const configContent = fs.readFileSync(this.configFile, 'utf8');
      const config = JSON.parse(configContent);

      // 为每张新图片生成唯一ID
      newImages.forEach((imageInfo, index) => {
        const imageId = `${this.targetAlbum}-${Date.now()}-${index}`;
        const newImage = {
          id: imageId,
          src: imageInfo.src,
          alt: this.generateAltText(imageInfo.filename),
          caption: this.generateCaption(imageInfo.filename),
          category: this.getCategoryFromAlbum(),
          tags: this.getTagsFromAlbum(),
          createdAt: new Date().toISOString().split('T')[0]
        };

        config.images.push(newImage);
      });

      // 更新图片数量
      config.imageCount = config.images.length;

      // 写入配置文件
      fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2));
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
  getCategoryFromAlbum() {
    const categories = {
      'tech-share': '技术',
      'growth-record': '成长',
      'reading-notes': '读书',
      'life-moments': '生活'
    };
    return categories[this.targetAlbum] || '其他';
  }

  /**
   * 根据相册获取标签
   */
  getTagsFromAlbum() {
    const tags = {
      'tech-share': ['技术', '分享'],
      'growth-record': ['成长', '学习'],
      'reading-notes': ['读书', '笔记'],
      'life-moments': ['生活', '瞬间']
    };
    return tags[this.targetAlbum] || ['其他'];
  }

  /**
   * 推送到 GitHub
   */
  pushToGitHub() {
    try {
      console.log('🔄 添加文件到 Git...');
      execSync('git add .', { stdio: 'inherit' });

      console.log('💾 提交更改...');
      const commitMessage = `feat: 从 first 文件夹自动上传图片到 ${this.targetAlbum} 相册`;
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

      console.log('🚀 推送到 GitHub...');
      execSync('git push origin main', { stdio: 'inherit' });

      console.log('✅ GitHub 推送完成！');
    } catch (error) {
      console.error('❌ GitHub 推送失败:', error.message);
      throw error;
    }
  }

  /**
   * 显示配置选项
   */
  showConfig() {
    console.log('📋 当前配置:');
    console.log(`   源文件夹: ${this.sourceFolder}`);
    console.log(`   目标相册: ${this.targetAlbum}`);
    console.log(`   目标文件夹: ${this.targetFolder}`);
    console.log(`   配置文件: ${this.configFile}`);
    console.log('');
    console.log('💡 如需修改目标相册，请编辑脚本中的 targetAlbum 变量');
    console.log('   支持的相册: tech-share, growth-record, reading-notes, life-moments');
  }
}

// 运行程序
const uploader = new FirstImageUploader();
uploader.showConfig();
uploader.main().catch(console.error);
