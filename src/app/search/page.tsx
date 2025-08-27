"use client";

import { useState, useEffect, useMemo } from 'react';
import { Search, Clock, TrendingUp, FileText, BookOpen, Link, Image, X } from 'lucide-react';
import Fuse from 'fuse.js';
import posts from '@/content/posts.json';
import notes from '@/content/notes.json';
import resources from '@/content/resources.json';

interface Post {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number;
}

interface Note {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
}

interface Resource {
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{ type: string; item: Post | Note | Resource; score: number }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 热门搜索词
  const popularSearches = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Git', 'Docker', '机器学习', '前端开发'];

  // 从 localStorage 加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // 保存搜索历史到 localStorage
  const saveSearchHistory = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    const newHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.parse(JSON.stringify(newHistory)));
  };

  // 清除搜索历史
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // 搜索逻辑
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    saveSearchHistory(searchQuery);

    // 配置 Fuse.js
    const fuseOptions = {
      keys: ['title', 'summary', 'tags'],
      threshold: 0.3,
      includeScore: true,
    };

    const allData = [
      ...(posts as Post[]).map(item => ({ type: 'post', item })),
      ...(notes as Note[]).map(item => ({ type: 'note', item })),
      ...(resources as Resource[]).map(item => ({ type: 'resource', item })),
    ];

    const fuse = new Fuse(allData, fuseOptions);
    const searchResults = fuse.search(searchQuery);
    
    setResults(searchResults.map(result => ({
      type: result.item.type,
      item: result.item.item,
      score: result.score || 0,
    })));

    setIsLoading(false);
  };

  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
    setShowSuggestions(false);
  };

  // 处理搜索建议点击
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    performSearch(suggestion);
    setShowSuggestions(false);
  };

  // 搜索结果分组
  const groupedResults = useMemo(() => {
    const groups = {
      posts: results.filter(r => r.type === 'post'),
      notes: results.filter(r => r.type === 'note'),
      resources: results.filter(r => r.type === 'resource'),
    };
    return groups;
  }, [results]);

  // 渲染搜索结果项
  const renderResultItem = (result: { type: string; item: Post | Note | Resource; score: number }) => {
    const { type, item } = result;
    
    switch (type) {
      case 'post':
        const post = item as Post;
        return (
          <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium mb-1">
                <a href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.title}
                </a>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{post.summary}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{post.date}</span>
                <span>•</span>
                <span>约 {post.readingTime} 分钟</span>
                <span>•</span>
                <div className="flex gap-1">
                  {post.tags.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'note':
        const note = item as Note;
        return (
          <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-600 transition-colors">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium mb-1">
                <a href={`/notes/${note.slug}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {note.title}
                </a>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{note.summary}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{note.date}</span>
                <span>•</span>
                <div className="flex gap-1">
                  {note.tags.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'resource':
        const resource = item as Resource;
        return (
          <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
              <Link className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium mb-1">
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  {resource.title}
                </a>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{resource.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">{resource.category}</span>
                <span>•</span>
                <div className="flex gap-1">
                  {resource.tags.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">搜索</h1>
        <p className="text-gray-600 dark:text-gray-400">在文章、笔记和资源中快速找到你需要的内容</p>
      </header>

      {/* 搜索框 */}
      <div className="relative mb-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
                if (!e.target.value.trim()) {
                  setResults([]);
                }
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="输入关键词搜索..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setResults([]);
                  setShowSuggestions(false);
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            搜索
          </button>
        </form>

        {/* 搜索建议 */}
        {showSuggestions && (query || searchHistory.length > 0 || popularSearches.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
            {/* 搜索历史 */}
            {searchHistory.length > 0 && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    搜索历史
                  </h3>
                  <button
                    onClick={clearSearchHistory}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    清除
                  </button>
                </div>
                <div className="space-y-2">
                  {searchHistory.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(term)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 热门搜索 */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                热门搜索
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(term)}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 搜索结果 */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">搜索中...</p>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="space-y-6">
          {/* 文章结果 */}
          {groupedResults.posts.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                文章 ({groupedResults.posts.length})
              </h2>
              <div className="space-y-3">
                {groupedResults.posts.map((result, index) => (
                  <div key={`post-${index}`}>
                    {renderResultItem(result)}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 笔记结果 */}
          {groupedResults.notes.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                笔记 ({groupedResults.notes.length})
              </h2>
              <div className="space-y-3">
                {groupedResults.notes.map((result, index) => (
                  <div key={`note-${index}`}>
                    {renderResultItem(result)}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 资源结果 */}
          {groupedResults.resources.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Link className="h-5 w-5 text-purple-600" />
                资源 ({groupedResults.resources.length})
              </h2>
              <div className="space-y-3">
                {groupedResults.resources.map((result, index) => (
                  <div key={`resource-${index}`}>
                    {renderResultItem(result)}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {!isLoading && query && results.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">未找到相关结果</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            尝试使用不同的关键词，或者检查拼写是否正确
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            建议：使用更通用的词汇，或者减少关键词数量
          </div>
        </div>
      )}

      {!isLoading && !query && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">开始搜索</h3>
          <p className="text-gray-600 dark:text-gray-400">
            在搜索框中输入关键词，或者点击上方的搜索建议
          </p>
        </div>
      )}
    </div>
  );
}


