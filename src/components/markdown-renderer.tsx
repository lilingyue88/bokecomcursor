import { markdownToHtml } from '@/lib/markdown';

interface MarkdownRendererProps {
  content: string;
}

export async function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // 在服务器端将 Markdown 转换为 HTML
  const htmlContent = await markdownToHtml(content);
  
  return (
    <div 
      className="prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
