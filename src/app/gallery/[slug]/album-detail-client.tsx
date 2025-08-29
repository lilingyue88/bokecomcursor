'use client';

import { useState } from 'react';
import { Album, GalleryImage } from '@/types/gallery';
import 'yet-another-react-lightbox/styles.css';
import dynamic from 'next/dynamic';
import { SmartGrid } from './smart-grid';

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
      {/* 智能图片网格 */}
      <SmartGrid 
        images={album.images} 
        onImageClick={(index) => {
          setIndex(index);
          setOpen(true);
        }}
      />

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
