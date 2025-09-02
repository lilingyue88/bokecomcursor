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
      blurIntensity: coverStyle?.blurIntensity,
      opacity: coverStyle?.opacity,
      scale: coverStyle?.scale,
      overlay: coverStyle?.overlay,
      isLoaded,
      loadError
    });
  }, [src, coverStyle, isLoaded, loadError]);

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
      {/* 强制测试蒙版 - 总是显示 */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0,255,0,0.3)',
          zIndex: 1,
        }}
      />
      
      {isLoaded && src ? (
        <>
          {/* 模糊背景 - 封面照片放大并模糊处理 */}
          {coverStyle?.blur && (
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: `blur(${coverStyle?.blurIntensity})`,
                WebkitFilter: `blur(${coverStyle?.blurIntensity})`,
                opacity: coverStyle?.opacity,
                transform: `scale(${coverStyle?.scale})`,
                zIndex: 2,
              }}
            />
          )}
          
          {/* 半透明蒙版 - 使用JSON配置 */}
          {coverStyle?.blur && (
            <div 
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                backgroundColor: coverStyle?.overlay || 'rgba(255,0,0,0.5)',
                zIndex: 3,
              }}
            />
          )}
          
          {/* 前景图片 - 居中显示，在模糊背景之上 */}
          <div className="absolute inset-0 flex items-center justify-center p-4" style={{ zIndex: 4 }}>
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
