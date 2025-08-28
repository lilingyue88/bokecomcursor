import fs from 'fs';
import path from 'path';
import { Album, GalleryImage, GalleryData } from '@/types/gallery';

// 获取相册数据
export function getGalleryData(): GalleryData {
  const albumsPath = path.join(process.cwd(), 'src/content/images/albums.json');
  
  if (!fs.existsSync(albumsPath)) {
    return { albums: [] };
  }
  
  try {
    const fileContents = fs.readFileSync(albumsPath, 'utf8');
    const data: GalleryData = JSON.parse(fileContents);
    return data;
  } catch (error) {
    console.error('Error reading gallery data:', error);
    return { albums: [] };
  }
}

// 获取所有相册
export function getAllAlbums(): Album[] {
  const data = getGalleryData();
  return data.albums;
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

// 注意：以下函数只能在服务器端使用，不能在客户端组件中调用
// 这些函数用于管理相册数据，通常通过 API 路由调用

// 添加图片到相册
export function addImageToAlbum(albumSlug: string, image: GalleryImage): void {
  const albumsPath = path.join(process.cwd(), 'src/content/images/albums.json');
  const data = getGalleryData();
  
  const albumIndex = data.albums.findIndex(album => album.slug === albumSlug);
  if (albumIndex !== -1) {
    data.albums[albumIndex].images.push(image);
    data.albums[albumIndex].imageCount = data.albums[albumIndex].images.length;
    
    // 写入文件
    fs.writeFileSync(albumsPath, JSON.stringify(data, null, 2));
  }
}

// 从相册中移除图片
export function removeImageFromAlbum(albumSlug: string, imageId: string): void {
  const albumsPath = path.join(process.cwd(), 'src/content/images/albums.json');
  const data = getGalleryData();
  
  const albumIndex = data.albums.findIndex(album => album.slug === albumSlug);
  if (albumIndex !== -1) {
    data.albums[albumIndex].images = data.albums[albumIndex].images.filter(
      img => img.id !== imageId
    );
    data.albums[albumIndex].imageCount = data.albums[albumIndex].images.length;
    
    // 写入文件
    fs.writeFileSync(albumsPath, JSON.stringify(data, null, 2));
  }
}

// 创建新相册
export function createAlbum(album: Omit<Album, 'id' | 'createdAt' | 'imageCount' | 'images'>): void {
  const albumsPath = path.join(process.cwd(), 'src/content/images/albums.json');
  const data = getGalleryData();
  
  const newAlbum: Album = {
    ...album,
    id: album.slug,
    createdAt: new Date().toISOString().split('T')[0],
    imageCount: 0,
    images: []
  };
  
  data.albums.push(newAlbum);
  fs.writeFileSync(albumsPath, JSON.stringify(data, null, 2));
}

// 删除相册
export function deleteAlbum(albumSlug: string): void {
  const albumsPath = path.join(process.cwd(), 'src/content/images/albums.json');
  const data = getGalleryData();
  
  data.albums = data.albums.filter(album => album.slug !== albumSlug);
  fs.writeFileSync(albumsPath, JSON.stringify(data, null, 2));
}
