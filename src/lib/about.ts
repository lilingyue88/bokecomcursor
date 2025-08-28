import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export interface AboutContent {
  title: string;
  description: string;
  avatar: string;
  lastUpdated: string;
  content: string;
}

/**
 * 获取关于页面内容
 */
export function getAboutContent(): AboutContent | null {
  const aboutPath = path.join(process.cwd(), 'src/content/about.md');
  
  if (!fs.existsSync(aboutPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(aboutPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      title: data.title || '关于我',
      description: data.description || '个人介绍、技能特长、联系方式等',
      avatar: data.avatar || '/images/avatar.jpg',
      lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
      content: content
    };
  } catch (error) {
    console.error('Error reading about content:', error);
    return null;
  }
}

/**
 * 将 Markdown 转换为 HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
}

/**
 * 更新关于页面内容
 */
export function updateAboutContent(updates: Partial<AboutContent>): void {
  const aboutPath = path.join(process.cwd(), 'src/content/about.md');
  
  if (!fs.existsSync(aboutPath)) {
    console.error('About content file not found');
    return;
  }

  try {
    const fileContents = fs.readFileSync(aboutPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // 更新 frontmatter
    const updatedData = { ...data, ...updates };
    
    // 重新生成 Markdown 内容
    const frontmatter = matter.stringify(content, updatedData);
    
    // 写入文件
    fs.writeFileSync(aboutPath, frontmatter);
    
    console.log('About content updated successfully');
  } catch (error) {
    console.error('Error updating about content:', error);
  }
}
