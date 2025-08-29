'use client';

import { useState, useEffect } from 'react';
import { Images } from 'lucide-react';

interface AlbumCoverProps {
  src: string;
  alt: string;
  name: string;
}

export function AlbumCover({ src, alt, name }: AlbumCoverProps) {
  const [imageRatio, setImageRatio] = useState<'landscape' | 'portrait' | 'square'>('square');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      if (ratio > 1.2) {
        setImageRatio('landscape');
      } else if (ratio < 0.8) {
        setImageRatio('portrait');
      } else {
        setImageRatio('square');
      }
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  // 根据图片比例调整容器样式
  const getContainerStyle = () => {
    switch (imageRatio) {
      case 'landscape':
        return { minHeight: '160px', padding: '20px 16px' };
      case 'portrait':
        return { minHeight: '280px', padding: '16px 20px' };
      default:
        return { minHeight: '220px', padding: '20px' };
    }
  };

  // 根据图片比例调整图片样式
  const getImageStyle = () => {
    switch (imageRatio) {
      case 'landscape':
        return { maxHeight: '120px', maxWidth: '100%' };
      case 'portrait':
        return { maxHeight: '240px', maxWidth: '100%' };
      default:
        return { maxHeight: '180px', maxWidth: '100%' };
    }
  };

  return (
    <div 
      className="relative w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
      style={getContainerStyle()}
    >
      {isLoaded ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          style={getImageStyle()}
        />
      ) : (
        <div className="w-full h-32 flex items-center justify-center">
          <Images className="h-16 w-16 text-gray-400" />
        </div>
      )}
    </div>
  );
}
