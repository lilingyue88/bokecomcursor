'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  summary: string;
}

export function ShareButton({ title, summary }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: title,
        text: summary,
        url: window.location.href,
      });
    } else if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >
      <Share2 className="h-4 w-4" />
      分享
    </button>
  );
}
