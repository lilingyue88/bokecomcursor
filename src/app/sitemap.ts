import { MetadataRoute } from 'next';
import { getAllPosts, getAllNotes, getAllResources } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const notes = getAllNotes();
  const resources = getAllResources();

  const baseUrl = 'https://bokecom.vercel.app';

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/guestbook`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // 添加博客文章
  posts.forEach((post) => {
    sitemap.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // 添加笔记
  notes.forEach((note) => {
    sitemap.push({
      url: `${baseUrl}/notes/${note.slug}`,
      lastModified: new Date(note.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // 添加资源
  resources.forEach((resource) => {
    sitemap.push({
      url: `${baseUrl}/resources/${resource.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return sitemap;
}


