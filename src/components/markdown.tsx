'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  // 简单的 HTML 渲染，移除所有交互功能
  const renderContent = () => {
    // 使用 dangerouslySetInnerHTML 作为临时解决方案
    // 在生产环境中，建议使用更安全的 HTML 解析器
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <div className="markdown-content prose prose-lg dark:prose-invert max-w-none">
      {renderContent()}
    </div>
  );
}


