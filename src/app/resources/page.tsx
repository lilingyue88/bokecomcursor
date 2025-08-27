import { ResourcesClient } from './resources-client';
import { getAllResources } from '@/lib/markdown';

export default function ResourcesPage() {
  // 获取所有资源（服务器端）
  const allResources = getAllResources();
  
  return <ResourcesClient resources={allResources} />;
}


