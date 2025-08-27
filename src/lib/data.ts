// 客户端可用的数据接口
export interface Post {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number;
  content: string;
  cover?: string;
  updated?: string;
  series?: string;
}

export interface Note {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
}

export interface Resource {
  title: string;
  slug: string;
  url: string;
  category: string;
  tags: string[];
  description: string;
  content: string;
}

// 这些函数将在服务器端组件中调用，然后通过 props 传递给客户端组件
export async function fetchAllPosts(): Promise<Post[]> {
  // 这个函数将在服务器端组件中实现
  return [];
}

export async function fetchAllNotes(): Promise<Note[]> {
  // 这个函数将在服务器端组件中实现
  return [];
}

export async function fetchAllResources(): Promise<Resource[]> {
  // 这个函数将在服务器端组件中实现
  return [];
}
