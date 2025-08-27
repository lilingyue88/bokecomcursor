import notes from '@/content/notes.json';

interface Note {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
}

export default function NotesListPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold tracking-tight">笔记</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">按更新时间逆序展示，支持标签筛选。</p>

      <div className="mt-6 space-y-4">
        {(notes as Note[]).map((n) => (
          <article key={n.slug} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">{n.date}</div>
            <h2 className="mt-1 text-lg font-medium">{n.title}</h2>
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">{n.summary}</div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">标签：{n.tags.join('、')}</div>
          </article>
        ))}
      </div>
    </div>
  );
}


