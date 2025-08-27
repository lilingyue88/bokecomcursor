'use client';

import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // 处理代码块复制
  const handleCopyCode = async (code: string, language: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(`${language}-${Date.now()}`);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // 自定义代码块渲染
  const CodeBlock = ({ children, className }: { children: string; className?: string }) => {
    const language = className ? className.replace('language-', '') : 'text';
    
    return (
      <div className="relative group">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleCopyCode(children, language)}
            className="p-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            title="复制代码"
          >
            {copiedCode === `${language}-${Date.now()}` ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          showLineNumbers
        >
          {children}
        </SyntaxHighlighter>
      </div>
    );
  };

  // 处理 HTML 内容中的代码块
  const processHtmlContent = (htmlContent: string) => {
    // 将 HTML 内容转换为 React 组件
    const createElement = (tag: string, props: any, ...children: any[]) => {
      const elementProps = { ...props };
      
      // 处理代码块
      if (tag === 'pre' && children[0]?.type === 'code') {
        const codeElement = children[0];
        const codeContent = codeElement.children?.[0] || '';
        const className = codeElement.props?.className || '';
        const language = className.replace('language-', '');
        
        return (
          <CodeBlock key={Math.random()} className={className}>
            {codeContent}
          </CodeBlock>
        );
      }
      
      // 处理其他元素
      switch (tag) {
        case 'h1':
          return <h1 className="text-3xl font-bold mb-4 mt-8 first:mt-0" {...elementProps}>{children}</h1>;
        case 'h2':
          return <h2 className="text-2xl font-bold mb-3 mt-6" {...elementProps}>{children}</h2>;
        case 'h3':
          return <h3 className="text-xl font-semibold mb-2 mt-4" {...elementProps}>{children}</h3>;
        case 'h4':
          return <h4 className="text-lg font-semibold mb-2 mt-4" {...elementProps}>{children}</h4>;
        case 'p':
          return <p className="mb-4 leading-relaxed" {...elementProps}>{children}</p>;
        case 'ul':
          return <ul className="mb-4 list-disc list-inside space-y-1" {...elementProps}>{children}</ul>;
        case 'ol':
          return <ol className="mb-4 list-decimal list-inside space-y-1" {...elementProps}>{children}</ol>;
        case 'li':
          return <li className="leading-relaxed" {...elementProps}>{children}</li>;
        case 'blockquote':
          return <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 italic" {...elementProps}>{children}</blockquote>;
        case 'code':
          if (elementProps.className) {
            // 行内代码
            return <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono" {...elementProps}>{children}</code>;
          }
          return <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono" {...elementProps}>{children}</code>;
        case 'a':
          return <a className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...elementProps}>{children}</a>;
        case 'strong':
          return <strong className="font-semibold" {...elementProps}>{children}</strong>;
        case 'em':
          return <em className="italic" {...elementProps}>{children}</em>;
        case 'hr':
          return <hr className="my-8 border-gray-200 dark:border-gray-700" {...elementProps} />;
        case 'table':
          return <div className="overflow-x-auto my-6"><table className="min-w-full border border-gray-200 dark:border-gray-700" {...elementProps}>{children}</table></div>;
        case 'thead':
          return <thead className="bg-gray-50 dark:bg-gray-800" {...elementProps}>{children}</thead>;
        case 'tbody':
          return <tbody {...elementProps}>{children}</tbody>;
        case 'tr':
          return <tr className="border-b border-gray-200 dark:border-gray-700" {...elementProps}>{children}</tr>;
        case 'th':
          return <th className="px-4 py-2 text-left font-semibold border-r border-gray-200 dark:border-gray-700" {...elementProps}>{children}</th>;
        case 'td':
          return <td className="px-4 py-2 border-r border-gray-200 dark:border-gray-700" {...elementProps}>{children}</td>;
        default:
          return React.createElement(tag, elementProps, ...children);
      }
    };

    // 简单的 HTML 解析（生产环境建议使用更安全的解析器）
    const parseHtml = (html: string) => {
      // 这里使用 dangerouslySetInnerHTML 作为临时解决方案
      // 在实际项目中，建议使用 DOMParser 或其他安全的 HTML 解析器
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    return parseHtml(htmlContent);
  };

  return (
    <div className="markdown-content">
      {processHtmlContent(content)}
    </div>
  );
}


