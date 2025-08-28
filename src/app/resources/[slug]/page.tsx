import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { getResourceBySlug, getAllResourceSlugs } from '@/lib/markdown';
import { MarkdownRenderer } from '@/components/markdown-renderer';

// 生成静态路径
export async function generateStaticParams() {
  const slugs = getAllResourceSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const resource = getResourceBySlug(params.slug);
  
  if (!resource) {
    return {
      title: '资源未找到',
    };
  }

  return {
    title: `${resource.title} - Bokecom`,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      type: 'website',
      url: resource.url,
    },
  };
}

export default async function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const resource = getResourceBySlug(params.slug);

  if (!resource) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* 面包屑导航 */}
      <nav className="mb-6">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回资源列表
        </Link>
      </nav>

      {/* 资源头部 */}
      <header className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium">
              {resource.category}
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {resource.title}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          {resource.description}
        </p>

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

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            访问资源
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* 资源内容 */}
      <article>
        <MarkdownRenderer content={resource.content} />
      </article>

      {/* 资源底部 */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            分类：{resource.category}
          </div>
          
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            返回资源列表
          </Link>
        </div>
      </footer>
    </div>
  );
}
