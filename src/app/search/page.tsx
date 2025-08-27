import { SearchClient } from './search-client';
import { getAllPosts, getAllNotes, getAllResources } from '@/lib/markdown';

export default function SearchPage() {
  // 获取所有内容（服务器端）
  const allPosts = getAllPosts();
  const allNotes = getAllNotes();
  const allResources = getAllResources();
  
  return <SearchClient posts={allPosts} notes={allNotes} resources={allResources} />;
}


