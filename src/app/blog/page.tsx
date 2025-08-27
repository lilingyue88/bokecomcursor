import { BlogListClient } from './blog-list-client';
import { getAllPosts } from '@/lib/markdown';

export default function BlogListPage() {
  // 获取所有文章（服务器端）
  const allPosts = getAllPosts();
  
  return <BlogListClient posts={allPosts} />;
}


