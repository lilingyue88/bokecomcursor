import posts from '@/content/posts.json';
import Link from 'next/link';
import { Markdown } from '@/components/markdown';
import { ReadingProgress } from '@/components/reading-progress';
import { Toc } from '@/components/toc';
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

interface Post {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number;
}

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return (posts as Post[]).map((p) => ({ slug: p.slug }));
}

export default function PostDetailPage({ params }: Params) {
  const post = (posts as Post[]).find((p) => p.slug === params.slug);
  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">未找到文章</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">抱歉，您访问的文章不存在。</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            返回文章列表
          </Link>
        </div>
      </div>
    );
  }

  // 获取相关文章（基于标签匹配）
  const relatedPosts = (posts as Post[])
    .filter((p) => p.slug !== post.slug && p.tags.some(tag => post.tags.includes(tag)))
    .sort((a, b) => {
      const aScore = a.tags.filter(tag => post.tags.includes(tag)).length;
      const bScore = b.tags.filter(tag => post.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <ReadingProgress targetId="post-content" />
      
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">首页</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">文章</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">{post.title}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
        <div id="post-content">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>约 {post.readingTime} 分钟</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <div className="flex gap-1">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <article className="prose dark:prose-invert max-w-none">
            <Markdown content={`# ${post.title}\n\n${post.summary}\n\n## 小节一\n- 列表项A\n- 列表项B\n\n## 小节二\n**加粗演示** 与 \`行内代码\`。\n\n\`\`\`javascript\n// 代码块示例\nfunction hello() {\n  console.log("Hello, World!");\n}\n\`\`\`\n\n> 引用块示例：这是一段引用文字，用于演示样式。\n\n![示例图片](https://via.placeholder.com/600x300/4F46E5/FFFFFF?text=示例图片)\n\n## 小节三\n更多内容...`} />
          </article>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 作者. 保留所有权利。
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                  分享
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                  收藏
                </button>
              </div>
            </div>
          </footer>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-semibold mb-4">相关文章</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.slug} className="group rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <h3 className="font-medium mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {relatedPost.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {relatedPost.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* TOC */}
        <Toc containerId="post-content" />
      </div>
    </div>
  );
}


