import Link from 'next/link';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { getAllNotes } from '@/lib/markdown';

export default function NotesListPage() {
  // 获取所有笔记
  const allNotes = getAllNotes();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">笔记</h1>
        <p className="text-gray-600 dark:text-gray-400">
          记录日常学习中的想法、技巧和心得
        </p>
      </header>

      <div className="space-y-6">
        {allNotes.length > 0 ? (
          allNotes.map((note) => (
            <article key={note.slug} className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{note.date}</span>
                  </div>
                </div>
              </div>

              <Link href={`/notes/${note.slug}` as any} className="block">
                <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {note.title}
                </h2>
              </Link>

              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {note.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/notes/${note.slug}` as any}
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  阅读全文
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              还没有笔记
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              开始记录你的学习心得吧！
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


