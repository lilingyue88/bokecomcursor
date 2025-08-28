import { GalleryClient } from './gallery-client';
import { getAllAlbums } from '@/lib/gallery';

export default function GalleryPage() {
  // 获取所有相册（服务器端）
  const allAlbums = getAllAlbums();
  
  return <GalleryClient albums={allAlbums} />;
}


