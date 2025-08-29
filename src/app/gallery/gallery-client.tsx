'use client';

import Link from 'next/link';
import { Album } from '@/types/gallery';
import { Images, Calendar, Tag } from 'lucide-react';
import { AlbumCover } from './album-cover';

interface GalleryClientProps {
  albums: Album[];
}

export function GalleryClient({ albums }: GalleryClientProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">相册</h1>
        <p className="text-gray-600 dark:text-gray-400">
          精选照片集，记录精彩瞬间
        </p>
      </header>

      {albums.length === 0 ? (
        <div className="text-center py-12">
          <Images className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            还没有相册
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            快来创建第一个相册吧！
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <Link
              key={album.id}
              href={`/gallery/${album.slug}`}
              className="group rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              {/* 智能相册封面 */}
              <AlbumCover 
                src={album.cover || ''} 
                alt={album.name} 
                name={album.name} 
              />

              {/* 相册信息 */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {album.name}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {album.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{album.createdAt}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Images className="h-4 w-4" />
                    <span>{album.imageCount} 张</span>
                  </div>
                </div>

                {/* 标签 */}
                <div className="flex gap-1 mt-3">
                  {album.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {album.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{album.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
