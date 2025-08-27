'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CommentModal } from './comment-modal';

export function FloatingCommentButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 统一监听来自全站的“打开留言弹窗”事件
  useEffect(() => {
    const handler = () => setIsModalOpen(true);
    window.addEventListener('open-guestbook-modal' as any, handler);
    return () => window.removeEventListener('open-guestbook-modal' as any, handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110 md:h-12 md:w-12"
        aria-label="留言"
      >
        <MessageCircle className="h-6 w-6 md:h-5 md:w-5" />
        <span className="absolute -top-2 -right-2 hidden md:block text-xs font-medium">
          留言
        </span>
      </button>

      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
