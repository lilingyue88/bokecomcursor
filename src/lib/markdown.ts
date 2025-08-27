import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export interface MarkdownContent {
  content: string;
  data: Record<string, any>;
}

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

// 读取 Markdown 文件内容
export function getMarkdownContent(filePath: string): MarkdownContent {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    content,
    data
  };
}

// 将 Markdown 转换为 HTML
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown);
  
  return result.toString();
}

// 获取所有文章
export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const { content, data } = getMarkdownContent(fullPath);
      
      return {
        slug,
        content,
        ...data,
      } as Post;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return allPostsData;
}

// 根据 slug 获取单篇文章
export function getPostBySlug(slug: string): Post | null {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const { content, data } = getMarkdownContent(fullPath);
  
  return {
    slug,
    content,
    ...data,
  } as Post;
}

// 获取所有笔记
export function getAllNotes(): Note[] {
  const notesDirectory = path.join(process.cwd(), 'src/content/notes');
  
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(notesDirectory);
  const allNotesData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(notesDirectory, fileName);
      const { content, data } = getMarkdownContent(fullPath);
      
      return {
        slug,
        content,
        ...data,
      } as Note;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return allNotesData;
}

// 根据 slug 获取单个笔记
export function getNoteBySlug(slug: string): Note | null {
  const notesDirectory = path.join(process.cwd(), 'src/content/notes');
  const fullPath = path.join(notesDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const { content, data } = getMarkdownContent(fullPath);
  
  return {
    slug,
    content,
    ...data,
  } as Note;
}

// 获取所有资源
export function getAllResources(): Resource[] {
  const resourcesDirectory = path.join(process.cwd(), 'src/content/resources');
  
  if (!fs.existsSync(resourcesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(resourcesDirectory);
  const allResourcesData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(resourcesDirectory, fileName);
      const { content, data } = getMarkdownContent(fullPath);
      
      return {
        slug,
        content,
        ...data,
      } as Resource;
    });
  
  return allResourcesData;
}

// 根据 slug 获取单个资源
export function getResourceBySlug(slug: string): Resource | null {
  const resourcesDirectory = path.join(process.cwd(), 'src/content/resources');
  const fullPath = path.join(resourcesDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const { content, data } = getMarkdownContent(fullPath);
  
  return {
    slug,
    content,
    ...data,
  } as Resource;
}

// 获取所有文章的 slug（用于生成静态路径）
export function getAllPostSlugs(): string[] {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

// 获取所有笔记的 slug
export function getAllNoteSlugs(): string[] {
  const notesDirectory = path.join(process.cwd(), 'src/content/notes');
  
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(notesDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

// 获取所有资源的 slug
export function getAllResourceSlugs(): string[] {
  const resourcesDirectory = path.join(process.cwd(), 'src/content/resources');
  
  if (!fs.existsSync(resourcesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(resourcesDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}
