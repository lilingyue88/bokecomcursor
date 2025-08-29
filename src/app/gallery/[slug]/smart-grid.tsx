'use client';

import { GalleryImage } from '@/types/gallery';

interface SmartGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export function SmartGrid({ images, onImageClick }: SmartGridProps) {
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
      {images.map((image, i) => (
        <figure
          key={image.id}
          className="group break-inside-avoid overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 cursor-zoom-in hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 mb-4"
          onClick={() => onImageClick(i)}
        >
          <div className="relative w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-2">
            <img
              src={image.src}
              alt={image.alt}
              className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              style={{
                maxHeight: '180px',
                maxWidth: '100%'
              }}
            />
          </div>
          
          {image.caption && (
            <figcaption className="p-2 text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
