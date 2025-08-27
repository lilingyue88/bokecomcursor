'use client';

import Link from 'next/link';
import { navigation, siteConfig } from '@/config/site';
import { Github, Twitter, Mail, ExternalLink, MessageCircle } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left - Copyright & RSS */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                B
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {siteConfig.title}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} {siteConfig.author}. 保留所有权利。
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>RSS</span>
              <a href="/rss.xml" className="hover:text-blue-600 dark:hover:text-blue-400">
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Center - Secondary Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">快速链接</h3>
            <nav className="flex flex-col space-y-2">
              {navigation.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href as any}
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-guestbook-modal'));
                }}
                className="inline-flex items-center space-x-2 text-left text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>给我留言</span>
              </button>
            </nav>
          </div>

          {/* Right - Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">关注我</h3>
            <div className="flex space-x-4">
              {siteConfig.social.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            使用 Next.js 和 Tailwind CSS 构建
          </p>
        </div>
      </div>
    </footer>
  );
}
