import { getAboutContent, markdownToHtml } from '@/lib/about';
import { AboutContentRenderer } from './about-content-renderer';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const aboutContent = getAboutContent();
  
  if (!aboutContent) {
    return {
      title: '关于我 - Bokecom',
      description: '个人介绍、技能特长、联系方式等'
    };
  }

  return {
    title: `${aboutContent.title} - Bokecom`,
    description: aboutContent.description,
    openGraph: {
      title: aboutContent.title,
      description: aboutContent.description,
      type: 'profile',
      images: [aboutContent.avatar]
    }
  };
}

export default async function AboutPage() {
  const aboutContent = getAboutContent();

  if (!aboutContent) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8 text-center">
        {/* 头像 */}
        <div className="mb-6">
          <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 shadow-lg">
            <img
              src={aboutContent.avatar}
              alt="个人头像"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 标题和描述 */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {aboutContent.title}
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          {aboutContent.description}
        </p>

        {/* 最后更新时间 */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          最后更新: {aboutContent.lastUpdated}
        </div>
      </header>

      {/* 内容渲染器 */}
      <AboutContentRenderer content={aboutContent.content} />
    </div>
  );
}


