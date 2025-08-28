import Link from 'next/link';
import { ArrowRight, BookOpen, Notebook, Images, Rss, ExternalLink, Star, TrendingUp } from 'lucide-react';
import { getAllPosts } from '@/lib/markdown';

export default function HomePage() {
  // 获取所有文章（服务器端）
  const allPosts = getAllPosts();
  
  // 获取最近的文章
  const recentPosts = allPosts.slice(0, 4);
  
  // 统计各系列文章数量
  const techPosts = allPosts.filter(post => post.tags.includes('技术探索')).length;
  const growthPosts = allPosts.filter(post => post.tags.includes('成长记录')).length;
  const bookPosts = allPosts.filter(post => post.tags.includes('读书笔记')).length;

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
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <article key={post.slug} className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{post.date}</div>
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">约 {post.readingTime} 分钟</span>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-gray-500 dark:text-gray-400">
              <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>还没有文章，快来发布第一篇吧！</p>
            </div>
          )}
        </div>
      </section>

      {/* 精选系列 */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">精选系列</h2>
          <p className="text-gray-600 dark:text-gray-400">深度内容与专题讨论</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/module/技术探索" className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">技术探索</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">分享前沿技术、架构设计、性能优化等深度技术内容，记录学习过程中的思考与收获</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">{techPosts} 篇文章</div>
          </Link>
          
          <Link href="/module/成长记录" className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">成长记录</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">记录技术学习历程、项目经验总结、职业发展思考，分享个人成长路上的心得与感悟</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">{growthPosts} 篇文章</div>
          </Link>
          
          <Link href="/module/读书笔记" className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">读书笔记</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">好书推荐与阅读感悟，技术书籍精读笔记，经典文章深度解析，让知识更有价值</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">{bookPosts} 篇文章</div>
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


