'use client';

import gallery from '@/content/gallery.json';
import 'yet-another-react-lightbox/styles.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';

interface GalleryItem {
  title: string;
  album: string;
  src: string;
  thumb: string;
  caption?: string;
  takenAt?: string;
}

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { ssr: false });

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const slides = (gallery as GalleryItem[]).map((g) => ({ src: g.src, description: g.caption }));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold tracking-tight">相册</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">自适应网格与灯箱将稍后接入。</p>

      <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {(gallery as GalleryItem[]).map((g, i) => (
          <figure key={g.src} className="group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 cursor-zoom-in" onClick={() => { setIndex(i); setOpen(true); }}>
            {/* 占位缩略图 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.thumb || g.src} alt={g.title} className="h-40 w-full object-cover group-hover:scale-105 transition-transform" />
            <figcaption className="p-2 text-xs text-gray-600 dark:text-gray-400">
              {g.title}
            </figcaption>
          </figure>
        ))}
      </div>

      {open && (
        <Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} on={{ view: ({ index: i }) => setIndex(i) }} />
      )}
    </div>
  );
}


