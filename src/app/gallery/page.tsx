import { GalleryClient } from './gallery-client';
import { getAllAlbums } from '@/lib/gallery';

// 禁用静态生成，确保每次请求都重新读取数据
export const dynamic = 'force-dynamic';

export default function GalleryPage() {
  // 获取所有相册（服务器端）
  const allAlbums = getAllAlbums();
  
  return <GalleryClient albums={allAlbums} />;
}


