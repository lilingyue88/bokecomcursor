'use client';

import { useState, useMemo } from 'react';
import { Search, ExternalLink, ArrowRight } from 'lucide-react';
import { Resource } from '@/lib/markdown';

interface ResourcesClientProps {
  resources: Resource[];
}

export function ResourcesClient({ resources }: ResourcesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  // 获取所有分类
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    resources.forEach(resource => {
      categories.add(resource.category);
    });
    return ['全部', ...Array.from(categories).sort()];
  }, [resources]);

  // 过滤资源
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === '全部' || resource.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [resources, searchQuery, selectedCategory]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">资源</h1>
        <p className="text-gray-600 dark:text-gray-400">
          精选的学习资源、工具和参考资料
        </p>
      </header>

      {/* 搜索和筛选 */}
      <div className="mb-8 space-y-4">
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="搜索资源标题、描述或标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-3">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 结果统计 */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          找到 {filteredResources.length} 个资源
        </div>
      </div>

      {/* 资源列表 */}
      <div className="space-y-6">
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              没有找到相关资源
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              尝试调整搜索条件或筛选器
            </p>
          </div>
        ) : (
          filteredResources.map((resource) => (
            <article key={resource.slug} className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium">
                    {resource.category}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {resource.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    访问资源
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={`/resources/${resource.slug}` as any}
                    className="inline-flex items-center gap-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    查看详情
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
