import posts from '@/content/posts.json';
import { siteConfig } from '@/config/site';

export const revalidate = 3600;

export async function GET() {
  const items = (posts as any[])
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rssItems = items
    .map((p) => `
      <item>
        <title><![CDATA[${p.title}]]></title>
        <link>${siteConfig.url}/blog/${p.slug}</link>
        <guid>${siteConfig.url}/blog/${p.slug}</guid>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        <description><![CDATA[${p.summary}]]></description>
      </item>
    `)
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title><![CDATA[${siteConfig.title}]]></title>
      <link>${siteConfig.url}</link>
      <description><![CDATA[${siteConfig.description}]]></description>
      <language>zh-CN</language>
      ${rssItems}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}


