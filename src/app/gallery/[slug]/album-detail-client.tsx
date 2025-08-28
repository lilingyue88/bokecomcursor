'use client';

import { useState } from 'react';
import { Album, GalleryImage } from '@/types/gallery';
import 'yet-another-react-lightbox/styles.css';
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { ssr: false });

interface AlbumDetailClientProps {
  album: Album;
}

export function AlbumDetailClient({ album }: AlbumDetailClientProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // 准备灯箱数据
  const slides = album.images.map((img) => ({ 
    src: img.src, 
    description: img.caption || img.alt 
  }));

  if (album.images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          相册还是空的
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          还没有添加照片，快来上传第一张照片吧！
        </p>
      </div>
    );
  }

  return (
    <>
      {/* 图片网格 */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {album.images.map((image, i) => (
          <figure
            key={image.id}
            className="group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 cursor-zoom-in hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {image.caption && (
              <figcaption className="p-2 text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* 灯箱 */}
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={index}
          on={{ view: ({ index: i }) => setIndex(i) }}
        />
      )}
    </>
  );
}
