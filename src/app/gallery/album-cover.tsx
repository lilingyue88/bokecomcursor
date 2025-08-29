'use client';

import { useState, useEffect } from 'react';
import { Images } from 'lucide-react';

interface AlbumCoverProps {
  src: string;
  alt: string;
  name: string;
}

export function AlbumCover({ src, alt, name }: AlbumCoverProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
      {isLoaded && src ? (
        <>
          {/* 模糊背景填充 - 当图片比例不符时 */}
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110 opacity-80"
            style={{
              backgroundImage: `url(${src})`,
              filter: 'blur(16px)',
            }}
          />
          
          {/* 背景图片 - 按比例缩放并居中 */}
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* 半透明蒙版 */}
          <div className="absolute inset-0 bg-black/15 dark:bg-black/25 transition-opacity duration-300 group-hover:bg-black/10 dark:group-hover:bg-black/20" />
          
          {/* 前景图片 - 居中显示 */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              loading="lazy"
              style={{
                maxHeight: '120px',
                maxWidth: '100%'
              }}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Images className="h-16 w-16 text-gray-400" />
        </div>
      )}
    </div>
  );
}
