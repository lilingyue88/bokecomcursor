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
                zIndex: 1,
              }}
            />
          )}
          
          {/* 半透明蒙版 - 使用JSON配置 */}
          {coverStyle?.blur && (
            <div 
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                backgroundColor: coverStyle?.overlay || 'rgba(0,0,0,0.2)',
                zIndex: 2,
              }}
            />
          )}
          
          {/* 前景图片 - 只在没有模糊效果时显示 */}
          {!coverStyle?.blur && (
            <div className="absolute inset-0 flex items-center justify-center p-4" style={{ zIndex: 3 }}>
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
          )}
          
          {/* 相册信息 - 在模糊背景之上显示 */}
          {coverStyle?.blur && (
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white" style={{ zIndex: 3 }}>
              <h3 className="text-lg font-bold mb-1">{name}</h3>
              <p className="text-sm opacity-90">点击查看详情</p>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Images className="h-16 w-16 text-gray-400" />
        </div>
      )}
    </div>
  );
}
