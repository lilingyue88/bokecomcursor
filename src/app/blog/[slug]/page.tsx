import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { getPostBySlug, getAllPostSlugs } from '@/lib/markdown';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { ShareButton } from '@/components/share-button';

// 生成静态路径
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: `${post.title} - Bokecom`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* 面包屑导航 */}
      <nav className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回文章列表
        </Link>
      </nav>

      {/* 文章头部 */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>约 {post.readingTime} 分钟</span>
          </div>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          {post.summary}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <ShareButton title={post.title} summary={post.summary} />
        </div>
      </header>

      {/* 文章内容 */}
      <article>
        <MarkdownRenderer content={post.content} />
      </article>

      {/* 文章底部 */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            最后更新：{post.date}
          </div>
          
          <div className="flex gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              返回文章列表
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


