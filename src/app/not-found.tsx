import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight">页面未找到</h1>
      <p className="mt-3 text-gray-600 dark:text-gray-400">
        抱歉，你访问的页面不存在或已被移动。
      </p>
      <div className="mt-6">
        <Link href="/" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
          返回首页
        </Link>
      </div>
    </div>
  );
}


