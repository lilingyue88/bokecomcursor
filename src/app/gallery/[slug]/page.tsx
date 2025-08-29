import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Images, Tag } from 'lucide-react';
import { getAlbumBySlug, getAllAlbumSlugs } from '@/lib/gallery';
import { AlbumDetailClient } from './album-detail-client';

// 禁用静态生成，确保每次请求都重新读取数据
export const dynamic = 'force-dynamic';

// 生成静态路径
export async function generateStaticParams() {
  const slugs = getAllAlbumSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const album = getAlbumBySlug(params.slug);
  
  if (!album) {
    return {
      title: '相册未找到',
    };
  }

  return {
    title: `${album.name} - 相册 - Bokecom`,
    description: album.description,
    openGraph: {
      title: album.name,
      description: album.description,
      type: 'website',
    },
  };
}

export default async function AlbumDetailPage({ params }: { params: { slug: string } }) {
  const album = getAlbumBySlug(params.slug);

  if (!album) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* 面包屑导航 */}
      <nav className="mb-6">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回相册列表
        </Link>
      </nav>

      {/* 相册头部 */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {album.name}
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          {album.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>创建于 {album.createdAt}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Images className="h-4 w-4" />
              <span>{album.imageCount} 张照片</span>
            </div>
          </div>

          <div className="flex gap-2">
            {album.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* 相册内容 */}
      <AlbumDetailClient album={album} />
    </div>
  );
}
