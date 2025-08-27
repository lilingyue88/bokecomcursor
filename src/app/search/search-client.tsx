'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Clock, Calendar, Tag, ArrowRight } from 'lucide-react';
import { Post, Note, Resource } from '@/lib/markdown';
import Link from 'next/link';

interface SearchClientProps {
  posts: Post[];
  notes: Note[];
  resources: Resource[];
}

export function SearchClient({ posts, notes, resources }: SearchClientProps) {
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 搜索历史
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const saveSearchHistory = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    const newHistory = [searchTerm, ...searchHistory.filter(h => h !== searchTerm)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // 搜索结果
  const searchResults = useMemo(() => {
    if (!query.trim()) return { posts: [], notes: [], resources: [] };

    const searchTerm = query.toLowerCase();
    
    const filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.summary.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    const filteredNotes = notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm) ||
      note.summary.toLowerCase().includes(searchTerm) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    const filteredResources = resources.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    return { posts: filteredPosts, notes: filteredNotes, resources: filteredResources };
  }, [query, posts, notes, resources]);

  const totalResults = searchResults.posts.length + searchResults.notes.length + searchResults.resources.length;

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    saveSearchHistory(searchTerm);
  };

  const popularSearches = ['React', 'TypeScript', 'Next.js', '前端开发', '学习笔记'];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">搜索</h1>
        <p className="text-gray-600 dark:text-gray-400">
          搜索文章、笔记和资源
        </p>
      </header>

      {/* 搜索框 */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
          <input
            type="text"
            placeholder="输入关键词搜索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
          />
        </div>
      </div>

      {/* 搜索历史和热门搜索 */}
      {!query && (
        <div className="mb-8 space-y-6">
          {/* 搜索历史 */}
          {searchHistory.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">搜索历史</h3>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 热门搜索 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">热门搜索</h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors text-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 搜索结果 */}
      {query && (
        <div className="space-y-8">
          {/* 结果统计 */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              找到 <span className="font-semibold text-blue-600 dark:text-blue-400">{totalResults}</span> 个结果
            </p>
          </div>

          {/* 文章结果 */}
          {searchResults.posts.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>文章</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">({searchResults.posts.length})</span>
              </h2>
              <div className="space-y-4">
                {searchResults.posts.map((post) => (
                  <article key={post.slug} className="group rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
                    <Link href={`/blog/${post.slug}` as any} className="block">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {post.summary}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>约 {post.readingTime} 分钟</span>
                      </div>
                      <div className="flex gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* 笔记结果 */}
          {searchResults.notes.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>笔记</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">({searchResults.notes.length})</span>
              </h2>
              <div className="space-y-4">
                {searchResults.notes.map((note) => (
                  <article key={note.slug} className="group rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
                    <Link href={`/notes/${note.slug}` as any} className="block">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {note.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {note.summary}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{note.date}</span>
                      </div>
                      <div className="flex gap-2">
                        {note.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* 资源结果 */}
          {searchResults.resources.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>资源</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">({searchResults.resources.length})</span>
              </h2>
              <div className="space-y-4">
                {searchResults.resources.map((resource) => (
                  <article key={resource.slug} className="group rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
                    <h3 className="text-lg font-semibold mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                          {resource.category}
                        </span>
                        {resource.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm"
                      >
                        访问资源
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* 无结果 */}
          {totalResults === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                没有找到相关结果
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                尝试使用不同的关键词或检查拼写
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
