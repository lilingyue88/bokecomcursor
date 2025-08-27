import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/markdown';

export async function GET() {
  const posts = getAllPosts();
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Bokecom</title>
  <description>个人博客与知识分享平台</description>
  <link>https://bokecom.vercel.app</link>
  <atom:link href="https://bokecom.vercel.app/rss.xml" rel="self" type="application/rss+xml" />
  <language>zh-CN</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${posts.map(post => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <description><![CDATA[${post.summary}]]></description>
    <link>https://bokecom.vercel.app/blog/${post.slug}</link>
    <guid>https://bokecom.vercel.app/blog/${post.slug}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <category>${post.tags.join(', ')}</category>
  </item>
  `).join('')}
</channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}


