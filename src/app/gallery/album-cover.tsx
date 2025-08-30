'use client';

import { useState, useEffect } from 'react';
import { Images } from 'lucide-react';

interface AlbumCoverProps {
  src: string;
  alt: string;
  name: string;
  coverStyle?: {
    blur: boolean;
    blurIntensity: string;
    opacity: string;
    scale: string;
    overlay: string;
  };
}

export function AlbumCover({ src, alt, name, coverStyle }: AlbumCoverProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // 调试信息
  useEffect(() => {
    console.log('AlbumCover Debug:', {
      src,
      alt,
      name,
      coverStyle,
      hasBlur: coverStyle?.blur,
      blurIntensity: coverStyle?.blurIntensity
    });
  }, [src, coverStyle]);

  useEffect(() => {
    if (!src) return;
    
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
      setLoadError(false);
    };
    img.onerror = () => {
      setLoadError(true);
      console.error('AlbumCover: Failed to load image:', src);
    };
    img.src = src;
  }, [src]);

  return (
    <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
      {isLoaded && src ? (
        <>
          {/* 模糊背景填充 - 使用JSON配置 */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${src})`,
              filter: `blur(${coverStyle?.blurIntensity || '30px'})`,
              WebkitFilter: `blur(${coverStyle?.blurIntensity || '30px'})`,
              opacity: coverStyle?.opacity || '0.8',
              transform: `scale(${coverStyle?.scale || '1.2'})`,
            }}
          />
          
          {/* 半透明蒙版 - 使用JSON配置 */}
          <div 
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              backgroundColor: coverStyle?.overlay || 'rgba(0,0,0,0.2)',
            }}
          />
          
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
