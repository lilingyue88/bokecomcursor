"use client";

import resources from '@/content/resources.json';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface Resource {
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
}

export default function ResourcesPage() {
  const [category, setCategory] = useState<string>('全部');
  const [tag, setTag] = useState<string>('全部');

  const categories = useMemo(() => ['全部', ...Array.from(new Set((resources as Resource[]).map((r) => r.category)))], []);
  const tags = useMemo(() => ['全部', ...Array.from(new Set((resources as Resource[]).flatMap((r) => r.tags)))], []);

  const filtered = useMemo(() => {
    return (resources as Resource[]).filter((r) => (category === '全部' || r.category === category) && (tag === '全部' || r.tags.includes(tag)));
  }, [category, tag]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold tracking-tight">资源</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">分类与标签筛选的外链合集。</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md border border-gray-200 dark:border-gray-800 bg-transparent px-3 py-2 text-sm">
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={tag} onChange={(e) => setTag(e.target.value)} className="rounded-md border border-gray-200 dark:border-gray-800 bg-transparent px-3 py-2 text-sm">
          {tags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filtered.map((r) => (
          <article key={r.url} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center gap-3">
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                {r.title}
              </a>
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{r.description}</div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{r.category} ｜ 标签：{r.tags.join('、')}</div>
          </article>
        ))}
      </div>
    </div>
  );
}


