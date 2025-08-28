import fs from 'fs';
import path from 'path';
import { Album, GalleryImage, GalleryData } from '@/types/gallery';

// 获取相册数据目录
const getAlbumsDirectory = () => path.join(process.cwd(), 'src/content/images');

// 获取所有相册
export function getAllAlbums(): Album[] {
  const albumsDirectory = getAlbumsDirectory();
  
  if (!fs.existsSync(albumsDirectory)) {
    return [];
  }
  
  try {
    const fileNames = fs.readdirSync(albumsDirectory);
    const albumFiles = fileNames.filter(fileName => fileName.endsWith('.json'));
    
    const albums: Album[] = [];
    
    for (const fileName of albumFiles) {
      try {
        const filePath = path.join(albumsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const album: Album = JSON.parse(fileContents);
        albums.push(album);
      } catch (error) {
        console.error(`Error reading album file ${fileName}:`, error);
      }
    }
    
    // 按创建时间排序
    return albums.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error reading albums directory:', error);
    return [];
  }
}

// 根据 slug 获取单个相册
export function getAlbumBySlug(slug: string): Album | null {
  const albums = getAllAlbums();
  return albums.find(album => album.slug === slug) || null;
}

// 获取所有相册的 slug（用于生成静态路径）
export function getAllAlbumSlugs(): string[] {
  const albums = getAllAlbums();
  return albums.map(album => album.slug);
}

// 获取相册数据（保持向后兼容）
export function getGalleryData(): GalleryData {
  const albums = getAllAlbums();
  return { albums };
}

// 注意：以下函数只能在服务器端使用，不能在客户端组件中调用
// 这些函数用于管理相册数据，通常通过 API 路由调用

// 添加图片到相册
export function addImageToAlbum(albumSlug: string, image: GalleryImage): void {
  const albumsDirectory = getAlbumsDirectory();
  const albumFilePath = path.join(albumsDirectory, `${albumSlug}.json`);
  
  if (!fs.existsSync(albumFilePath)) {
    console.error(`Album file not found: ${albumFilePath}`);
    return;
  }
  
  try {
    const fileContents = fs.readFileSync(albumFilePath, 'utf8');
    const album: Album = JSON.parse(fileContents);
    
    album.images.push(image);
    album.imageCount = album.images.length;
    
    // 写入文件
    fs.writeFileSync(albumFilePath, JSON.stringify(album, null, 2));
  } catch (error) {
    console.error(`Error updating album ${albumSlug}:`, error);
  }
}

// 从相册中移除图片
export function removeImageFromAlbum(albumSlug: string, imageId: string): void {
  const albumsDirectory = getAlbumsDirectory();
  const albumFilePath = path.join(albumsDirectory, `${albumSlug}.json`);
  
  if (!fs.existsSync(albumFilePath)) {
    console.error(`Album file not found: ${albumFilePath}`);
    return;
  }
  
  try {
    const fileContents = fs.readFileSync(albumFilePath, 'utf8');
    const album: Album = JSON.parse(fileContents);
    
    album.images = album.images.filter(img => img.id !== imageId);
    album.imageCount = album.images.length;
    
    // 写入文件
    fs.writeFileSync(albumFilePath, JSON.stringify(album, null, 2));
  } catch (error) {
    console.error(`Error updating album ${albumSlug}:`, error);
  }
}

// 创建新相册
export function createAlbum(album: Omit<Album, 'id' | 'createdAt' | 'imageCount' | 'images'>): void {
  const albumsDirectory = getAlbumsDirectory();
  const albumFilePath = path.join(albumsDirectory, `${album.slug}.json`);
  
  if (fs.existsSync(albumFilePath)) {
    console.error(`Album file already exists: ${albumFilePath}`);
    return;
  }
  
  const newAlbum: Album = {
    ...album,
    id: album.slug,
    createdAt: new Date().toISOString().split('T')[0],
    imageCount: 0,
    images: []
  };
  
  try {
    fs.writeFileSync(albumFilePath, JSON.stringify(newAlbum, null, 2));
  } catch (error) {
    console.error(`Error creating album ${album.slug}:`, error);
  }
}

// 删除相册
export function deleteAlbum(albumSlug: string): void {
  const albumsDirectory = getAlbumsDirectory();
  const albumFilePath = path.join(albumsDirectory, `${albumSlug}.json`);
  
  if (fs.existsSync(albumFilePath)) {
    try {
      fs.unlinkSync(albumFilePath);
    } catch (error) {
      console.error(`Error deleting album ${albumSlug}:`, error);
    }
  }
}

// 更新相册信息
export function updateAlbum(albumSlug: string, updates: Partial<Omit<Album, 'id' | 'images' | 'imageCount'>>): void {
  const albumsDirectory = getAlbumsDirectory();
  const albumFilePath = path.join(albumsDirectory, `${albumSlug}.json`);
  
  if (!fs.existsSync(albumFilePath)) {
    console.error(`Album file not found: ${albumFilePath}`);
    return;
  }
  
  try {
    const fileContents = fs.readFileSync(albumFilePath, 'utf8');
    const album: Album = JSON.parse(fileContents);
    
    const updatedAlbum: Album = {
      ...album,
      ...updates
    };
    
    // 写入文件
    fs.writeFileSync(albumFilePath, JSON.stringify(updatedAlbum, null, 2));
  } catch (error) {
    console.error(`Error updating album ${albumSlug}:`, error);
  }
}
