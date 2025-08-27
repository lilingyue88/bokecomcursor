import posts from '@/content/posts.json';
import { siteConfig } from '@/config/site';

export default async function sitemap() {
  const base = siteConfig.url.replace(/\/$/, '');
  const staticPages = ['/', '/blog', '/notes', '/resources', '/gallery', '/about', '/guestbook', '/search'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date().toISOString(),
  }));

  const postPages = (posts as any[]).map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updated || p.date).toISOString(),
  }));

  return [...staticPages, ...postPages];
}


