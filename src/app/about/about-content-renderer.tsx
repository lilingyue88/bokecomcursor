import { markdownToHtml } from '@/lib/about';

interface AboutContentRendererProps {
  content: string;
}

export async function AboutContentRenderer({ content }: AboutContentRendererProps) {
  // 将 Markdown 转换为 HTML
  const htmlContent = await markdownToHtml(content);

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
