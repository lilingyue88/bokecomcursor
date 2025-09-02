'use client';

import { useEffect } from 'react';
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
  // 调试信息
  useEffect(() => {
    console.log('AlbumCover Debug:', {
      src,
      alt,
      name,
      coverStyle,
      hasBlur: coverStyle?.blur,
      blurIntensity: coverStyle?.blurIntensity,
      actualBlur: coverStyle?.blurIntensity || '20px',
      opacity: coverStyle?.opacity,
      scale: coverStyle?.scale,
      overlay: coverStyle?.overlay,
      filterStyle: `blur(${coverStyle?.blurIntensity || '20px'})`
    });
  }, [src, coverStyle]);

  return (
    <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
      {src ? (
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
                filter: `blur(${coverStyle?.blurIntensity || '20px'})`,
                WebkitFilter: `blur(${coverStyle?.blurIntensity || '20px'})`,
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
          
          {/* 前景图片 - 始终显示，无论是否有模糊效果 */}
          <div className="absolute inset-0 flex items-center justify-center p-4" style={{ zIndex: 3 }}>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              loading="lazy"
              style={{
                maxHeight: coverStyle?.blur ? '100px' : '120px',
                maxWidth: '100%'
              }}
            />
          </div>
          
          {/* 相册信息 - 在有模糊背景时显示在底部 */}
          {coverStyle?.blur && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/50 to-transparent" style={{ zIndex: 4 }}>
              <h3 className="text-lg font-bold mb-1">{name}</h3>
              <p className="text-sm opacity-90">点击查看详情</p>
            </div>
          )}
          
          {/* 相册信息 - 在没有模糊背景时显示在底部 */}
          {!coverStyle?.blur && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-gray-800 dark:text-white bg-gradient-to-t from-white/80 to-transparent dark:from-black/50" style={{ zIndex: 4 }}>
              <h3 className="text-lg font-bold mb-1">{name}</h3>
              <p className="text-sm opacity-90">点击查看详情</p>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 dark:text-gray-400">
          <Images className="h-16 w-16 mb-2" />
          <p className="text-sm text-center">
            图片路径: {src || '无路径'}
          </p>
          <p className="text-xs text-center mt-1">
            {name}
          </p>
        </div>
      )}
    </div>
  );
}
