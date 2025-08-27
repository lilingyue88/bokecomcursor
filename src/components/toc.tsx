'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface TocItem { id: string; text: string; level: number }

export function Toc({ containerId = 'post-content' }: { containerId?: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const root = document.getElementById(containerId) || document.body;
    const headings = Array.from(root.querySelectorAll('h1, h2, h3')) as HTMLHeadingElement[];
    const parsed = headings.map((h) => ({ id: h.id, text: h.textContent || '', level: Number(h.tagName.substring(1)) }));
    setItems(parsed);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [containerId]);

  if (!items.length) return null;

  const TocContent = () => (
    <nav className="space-y-1 text-sm">
      <div className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">目录</div>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it.id} className={it.level > 2 ? 'ml-4' : ''}>
            <a
              href={`#${it.id}`}
              className={`block py-1 px-2 rounded transition-colors ${
                activeId === it.id 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile TOC Toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-20 right-6 z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="打开目录"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile TOC Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">目录</h3>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <TocContent />
          </div>
        </div>
      )}

      {/* Desktop TOC */}
      <div className="hidden lg:block sticky top-24 w-64 self-start">
        <TocContent />
      </div>
    </>
  );
}


