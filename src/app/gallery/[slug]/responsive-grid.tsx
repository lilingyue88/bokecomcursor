'use client';

import { GalleryImage } from '@/types/gallery';

interface ResponsiveGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export function ResponsiveGrid({ images, onImageClick }: ResponsiveGridProps) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {images.map((image, i) => (
        <figure
          key={image.id}
          className="group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 cursor-zoom-in hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
          onClick={() => onImageClick(i)}
        >
          <div className="relative w-full bg-gray-100 dark:bg-gray-800">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              style={{
                minHeight: '120px',
                maxHeight: '300px',
                objectFit: 'contain'
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
