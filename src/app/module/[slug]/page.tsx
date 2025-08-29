import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Notebook, FileText, ExternalLink, Images } from 'lucide-react';
import { getAllPosts, getAllNotes, getAllResources } from '@/lib/markdown';
import { getAllAlbums } from '@/lib/gallery';
import modulesData from '@/content/modules.json';
import type { ModulesData } from '@/types';

interface ModulePageProps {
  params: {
    slug: string;
  };
}

export default function ModulePage({ params }: ModulePageProps) {
  const moduleKey = decodeURIComponent(params.slug);
  const moduleData = (modulesData as ModulesData)[moduleKey];

  if (!moduleData) {
    notFound();
  }

  // 获取所有内容
  const allPosts = getAllPosts();
  const allNotes = getAllNotes();
  const allResources = getAllResources();
  const allAlbums = getAllAlbums();

  // 过滤出属于该模块的内容
  const modulePosts = allPosts.filter(post => 
    (moduleData.posts && moduleData.posts.includes(post.slug)) || post.tags.includes(moduleData.name)
  );
  const moduleNotes = allNotes.filter(note => 
    (moduleData.notes && moduleData.notes.includes(note.slug)) || note.tags.includes(moduleData.name)
  );
  const moduleResources = allResources.filter(resource => 
    (moduleData.resources && moduleData.resources.includes(resource.slug)) || resource.tags.includes(moduleData.name)
  );
  const moduleAlbums = allAlbums.filter(album => 
    moduleData.albums && moduleData.albums.includes(album.slug)
  );

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* 返回按钮 */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>
      </div>

      {/* 模块标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{moduleData.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {moduleData.description}
        </p>
      </div>

      {/* 文章部分 */}
      {modulePosts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">文章</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">({modulePosts.length})</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {modulePosts.map((post) => (
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
            ))}
          </div>
        </section>
      )}

      {/* 笔记部分 */}
      {moduleNotes.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Notebook className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold">笔记</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">({moduleNotes.length})</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {moduleNotes.map((note) => (
              <article key={note.slug} className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{note.date}</div>
                <Link href={`/notes/${note.slug}`} className="block">
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                    {note.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{note.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {note.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">笔记</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 资源部分 */}
      {moduleResources.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold">资源</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">({moduleResources.length})</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {moduleResources.map((resource) => (
              <article key={resource.slug} className="group rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">资源</div>
                <Link href={`/resources/${resource.slug}`} className="block">
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {resource.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">资源描述</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {resource.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">资源</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 相册集部分 */}
      {moduleAlbums.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Images className="h-6 w-6 text-pink-600" />
            <h2 className="text-2xl font-bold">相册集</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">({moduleAlbums.length})</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {moduleAlbums.map((album) => (
              <Link key={album.slug} href={`/gallery/${album.slug}`} className="group rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                {/* 相册封面 */}
                <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  {album.cover ? (
                    <>
                      {/* 模糊背景填充 */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center scale-110 opacity-80"
                        style={{
                          backgroundImage: `url(${album.cover})`,
                          filter: 'blur(16px)',
                        }}
                      />
                      
                      {/* 背景图片 */}
                      <img
                        src={album.cover}
                        alt={album.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      {/* 半透明蒙版 */}
                      <div className="absolute inset-0 bg-black/15 dark:bg-black/25 transition-opacity duration-300 group-hover:bg-black/10 dark:group-hover:bg-black/20" />
                      
                      {/* 前景图片 */}
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <img
                          src={album.cover}
                          alt={album.name}
                          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                          loading="lazy"
                          style={{
                            maxHeight: '120px',
                            maxWidth: '100%'
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Images className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* 相册信息 */}
                <div className="p-6 bg-white dark:bg-gray-900">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {album.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {album.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{album.createdAt}</span>
                    <span>{album.imageCount} 张照片</span>
                  </div>
                  {album.tags && album.tags.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {album.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 空状态 */}
      {modulePosts.length === 0 && moduleNotes.length === 0 && moduleResources.length === 0 && moduleAlbums.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">该模块还没有内容</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">请编辑 modules.json 文件来添加内容</p>
        </div>
      )}
    </div>
  );
}
