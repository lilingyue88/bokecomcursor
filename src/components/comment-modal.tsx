'use client';

import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommentModal({ isOpen, onClose }: CommentModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="guestbook-title" aria-describedby="guestbook-desc">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div ref={dialogRef} className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 id="guestbook-title" className="text-xl font-semibold text-gray-900 dark:text-white">
              留言墙
            </h2>
            <p id="guestbook-desc" className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              点击下方按钮前往留言墙页面
            </p>
          </div>
          <button
            onClick={onClose}
            ref={closeBtnRef}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h3 className="text-lg font-semibold mb-4">欢迎来到留言墙！</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            在这里你可以：
          </p>
          
          <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">1</span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">发表留言和想法</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">2</span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">回复其他人的留言</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">3</span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">点赞喜欢的留言</span>
            </div>
          </div>

          <a
            href="/guestbook"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            前往留言墙
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
