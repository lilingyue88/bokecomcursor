'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from 'next-themes';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  const { theme } = useTheme();
  
  const CodeBlock = ({ inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const code = String(children).replace(/\n$/, '');
    
    if (inline) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }

    const lines = code.split('\n');
    
    return (
      <div className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            {match ? match[1] : 'text'}
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
          >
            复制
          </button>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 w-12 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 font-mono select-none">
            {lines.map((_, i) => (
              <div key={i} className="px-2 py-0.5 text-right">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="pl-12">
            <SyntaxHighlighter
              style={theme === 'dark' ? atomOneDark : atomOneLight}
              language={match ? match[1] : undefined}
              PreTag="div"
              customStyle={{ 
                margin: 0,
                padding: '0.5rem 1rem',
                background: 'transparent'
              }}
              showLineNumbers={false}
              {...props}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSlug], [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
        components={{
          code: CodeBlock,
          img: ({ src, alt, ...props }) => (
            <div className="my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="rounded-lg shadow-sm max-w-full h-auto"
                loading="lazy"
                {...props}
              />
              {alt && (
                <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400 italic">
                  {alt}
                </p>
              )}
            </div>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg" {...props}>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}


