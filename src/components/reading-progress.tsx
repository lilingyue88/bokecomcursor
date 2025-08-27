'use client';

import { useEffect, useState } from 'react';

interface ReadingProgressProps {
  targetId?: string;
}

export function ReadingProgress({ targetId = 'post-content' }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = document.getElementById(targetId) || document.documentElement;
    const onScroll = () => {
      const el = container;
      const scrollTop = window.scrollY;
      const docHeight = el.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(ratio * 100);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll as any);
  }, [targetId]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div className="h-full bg-blue-600" style={{ width: `${progress}%` }} />
    </div>
  );
}


