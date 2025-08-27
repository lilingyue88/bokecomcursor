"use client";

import posts from '@/content/posts.json';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, Filter, Calendar, Clock, Tag } from 'lucide-react';

interface Post {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number;
}

const PAGE_SIZE = 5;

export default function BlogListPage() {
  const allTags = useMemo(() => Array.from(new Set((posts as Post[]).flatMap((p) => p.tags))), []);
  const allYears = useMemo(
    () => Array.from(new Set((posts as Post[]).map((p) => new Date(p.date).getFullYear()))).sort((a, b) => b - a),
    []
  );

  const [tag, setTag] = useState<string>('全部');
  const [year, setYear] = useState<string>('全部');
  const [q, setQ] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const filtered = useMemo(() => {
    let arr = (posts as Post[]).slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (tag !== '全部') arr = arr.filter((p) => p.tags.includes(tag));
    if (year !== '全部') arr = arr.filter((p) => new Date(p.date).getFullYear().toString() === year);
    if (q.trim()) {
      const kw = q.trim().toLowerCase();
      arr = arr.filter((p) =>
        p.title.toLowerCase().includes(kw) || p.summary.toLowerCase().includes(kw) || p.tags.join(',').toLowerCase().includes(kw)
      );
    }
    return arr;
  }, [tag, year, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [filtered, page]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">文章</h1>
        <p className="text-gray-600 dark:text-gray-400">支持标签、年份与关键词过滤，并分页展示。</p>
      </header>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="搜索标题、摘要或标签..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="全部">全部标签</option>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="全部">全部年份</option>
              {allYears.map((y) => (
                <option key={y} value={y.toString()}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        找到 {filtered.length} 篇文章
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {current.map((p) => (
          <article key={p.slug} className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{p.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>约 {p.readingTime} 分钟</span>
              </div>
            </div>
            
            <Link href={`/blog/${p.slug}`} className="block">
              <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {p.title}
              </h2>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{p.summary}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {p.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              <Link 
                href={`/blog/${p.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
              >
                阅读全文 →
              </Link>
            </div>
          </article>
        ))}
        
        {current.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">没有符合条件的文章。</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">尝试调整筛选条件或搜索关键词。</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            上一页
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              if (totalPages <= 5 || pageNum === 1 || pageNum === totalPages || (pageNum >= page - 2 && pageNum <= page + 2)) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      pageNum === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              if (pageNum === page - 3 || pageNum === page + 3) {
                return <span key={pageNum} className="px-2 py-2 text-gray-500">...</span>;
              }
              return null;
            })}
          </div>
          
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
}


