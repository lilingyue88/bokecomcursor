import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { getNoteBySlug, getAllNoteSlugs } from '@/lib/markdown';
import { MarkdownRenderer } from '@/components/markdown-renderer';

// 生成静态路径
export async function generateStaticParams() {
  const slugs = getAllNoteSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const note = getNoteBySlug(params.slug);
  
  if (!note) {
    return {
      title: '笔记未找到',
    };
  }

  return {
    title: `${note.title} - Bokecom`,
    description: note.summary,
    openGraph: {
      title: note.title,
      description: note.summary,
      type: 'article',
      publishedTime: note.date,
      tags: note.tags,
    },
  };
}

export default async function NoteDetailPage({ params }: { params: { slug: string } }) {
  const note = getNoteBySlug(params.slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* 面包屑导航 */}
      <nav className="mb-6">
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回笔记列表
        </Link>
      </nav>

      {/* 笔记头部 */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {note.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{note.date}</span>
          </div>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          {note.summary}
        </p>

        <div className="flex gap-2">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* 笔记内容 */}
      <article>
        <MarkdownRenderer content={note.content} />
      </article>

      {/* 笔记底部 */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            创建时间：{note.date}
          </div>
          
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            返回笔记列表
          </Link>
        </div>
      </footer>
    </div>
  );
}
