import { SiteConfig, NavigationItem } from '@/types';

export const siteConfig: SiteConfig = {
  title: 'Bokecom',
  description: '个人博客与知识分享平台',
  author: '李金元',
  url: 'https://bokecom.vercel.app',
  github: 'lilingyue88',
  email: 'lijinyuan@example.com',
  social: {
    github: 'https://github.com/lilingyue88',
    twitter: 'https://twitter.com/lijinyuan',
    weibo: 'https://weibo.com/lijinyuan',
    zhihu: 'https://zhihu.com/people/lijinyuan',
    bilibili: 'https://space.bilibili.com/lijinyuan',
    linkedin: 'https://linkedin.com/in/lijinyuan',
  },
};

export const navigation: NavigationItem[] = [
  { name: '首页', href: '/' },
  { name: '文章', href: '/blog' },
  { name: '笔记', href: '/notes' },
  { name: '资源', href: '/resources' },
  { name: '相册', href: '/gallery' },
  { name: '关于', href: '/about' },
  { name: '留言墙', href: '/guestbook' },
];

export const giscusConfig = {
  repo: 'lijinyuan/bokecomcursor' as const,
  repoId: 'R_kgDOPj25WA',
  category: 'Guestbook',
  categoryId: 'DIC_kwDOPj25WM4CukNQ',
  mapping: 'specific' as const,
  term: 'Guestbook',
  strict: '0' as const,
  reactionsEnabled: '1' as const,
  emitMetadata: '0' as const,
  inputPosition: 'bottom' as const,
  theme: 'preferred_color_scheme' as const,
  lang: 'zh-CN' as const,
};
