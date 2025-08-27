import Link from 'next/link';
import { ArrowRight, BookOpen, Notebook, Images, Rss, ExternalLink, Star, TrendingUp } from 'lucide-react';
import posts from '@/content/posts.json';

interface Post {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number;
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          记录、构建、分享
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          在这里阅读文章、快速浏览笔记，或给我留言交流。用技术记录生活，用代码构建未来。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            最新文章
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-lg border-2 border-gray-200 dark:border-gray-700 px-6 py-3 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105"
          >
            关于我
          </Link>
        </div>
      </section>

      {/* 最近更新 */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">最近更新</h2>
          <Link href="/blog" className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            查看全部
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {([...(posts as Post[])]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 4)
          ).map((p) => (
            <article key={p.slug} className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{p.date}</div>
              <Link href={`/blog/${p.slug}`} className="block">
                <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {p.title}
                </h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{p.summary}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {p.tags.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">约 {p.readingTime} 分钟</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 精选系列 */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">精选系列</h2>
          <p className="text-gray-600 dark:text-gray-400">深度内容与专题讨论</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/blog?tag=技术探索" className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">技术探索</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">前沿技术与实践经验分享</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">3 篇文章</div>
          </Link>
          
          <Link href="/blog?tag=成长记录" className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">成长记录</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">学习历程与思考总结</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">5 篇文章</div>
          </Link>
          
          <Link href="/blog?tag=读书笔记" className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">读书笔记</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">好书推荐与阅读感悟</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">2 篇文章</div>
          </Link>
        </div>
      </section>

      {/* 快速入口 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">快速入口</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <Link href="/notes" className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
              <Notebook className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">笔记</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">碎片化想法与草记</p>
          </Link>
          
          <Link href="/resources" className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/40 transition-colors">
              <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">资源</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">教程、论文、工具合集</p>
          </Link>
          
          <Link href="/gallery" className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors">
              <Images className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">相册</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">图片网格与灯箱</p>
          </Link>
        </div>
      </section>

      {/* 订阅 */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
          <Rss className="h-5 w-5" />
          <a href="/rss.xml" className="hover:underline">订阅 RSS</a>
        </div>
      </section>
    </div>
  );
}


