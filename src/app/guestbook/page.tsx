'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Send, Reply, Heart, Trash2 } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

export default function GuestbookPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // 从 localStorage 加载留言
  useEffect(() => {
    const savedComments = localStorage.getItem('guestbook-comments');
    const savedAuthor = localStorage.getItem('guestbook-author');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
    if (savedAuthor) {
      setAuthor(savedAuthor);
    }
  }, []);

  // 保存留言到 localStorage
  const saveComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem('guestbook-comments', JSON.stringify(newComments));
  };

  // 添加新留言
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !author.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: author.trim(),
      content: newComment.trim(),
      timestamp: new Date().toLocaleString('zh-CN'),
      likes: 0,
      replies: [],
    };

    saveComments([comment, ...comments]);
    setNewComment('');
    localStorage.setItem('guestbook-author', author);
  };

  // 添加回复
  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim() || !author.trim()) return;

    const reply: Reply = {
      id: Date.now().toString(),
      author: author.trim(),
      content: replyContent.trim(),
      timestamp: new Date().toLocaleString('zh-CN'),
      likes: 0,
    };

    const updatedComments = comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    );

    saveComments(updatedComments);
    setReplyContent('');
    setReplyingTo(null);
  };

  // 点赞
  const handleLike = (commentId: string, replyId?: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        if (replyId) {
          // 点赞回复
          const updatedReplies = comment.replies.map(reply =>
            reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
          );
          return { ...comment, replies: updatedReplies };
        } else {
          // 点赞留言
          return { ...comment, likes: comment.likes + 1 };
        }
      }
      return comment;
    });

    saveComments(updatedComments);
  };

  // 删除留言 - 只有作者和管理员可以删除
  const handleDelete = (commentId: string, replyId?: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    // 检查权限：只有作者和管理员可以删除
    const isAuthor = author === comment.author;
    const isAdmin = author === '李金元' || author === 'admin'; // 你可以修改管理员名称

    if (!isAuthor && !isAdmin) {
      alert('只有作者和管理员可以删除留言');
      return;
    }

    if (!confirm('确定要删除这条留言吗？')) return;

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        if (replyId) {
          // 删除回复
          const updatedReplies = comment.replies.filter(reply => reply.id !== replyId);
          return { ...comment, replies: updatedReplies };
        } else {
          // 删除留言
          return null;
        }
      }
      return comment;
    }).filter(Boolean) as Comment[];

    saveComments(updatedComments);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
          <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">留言墙</h1>
        <p className="text-gray-600 dark:text-gray-400">在这里与我交流，分享你的想法和问题</p>
      </header>

      {/* 留言输入框 */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900 mb-8">
        <h2 className="text-lg font-semibold mb-4">发表留言</h2>
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              昵称 *
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="请输入你的昵称"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              留言内容 *
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="请输入你的留言内容..."
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>
          
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Send className="h-4 w-4" />
            发表留言
          </button>
        </form>
      </div>

      {/* 留言列表 */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">留言列表 ({comments.length})</h2>
        
        {comments.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>还没有留言，快来发表第一条留言吧！</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900">
              {/* 主留言 */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {comment.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{comment.author}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{comment.timestamp}</div>
                    </div>
                  </div>
                  {/* 只有作者和管理员可以看到删除按钮 */}
                  {(author === comment.author || author === '李金元' || author === 'admin') && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="删除留言"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <div className="ml-13 text-gray-700 dark:text-gray-300 mb-3">
                  {comment.content}
                </div>
                
                <div className="ml-13 flex items-center gap-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`h-4 w-4 ${comment.likes > 0 ? 'text-red-500 fill-current' : ''}`} />
                    <span>{comment.likes}</span>
                  </button>
                  
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <Reply className="h-4 w-4" />
                    <span>回复</span>
                  </button>
                </div>
              </div>

              {/* 回复输入框 */}
              {replyingTo === comment.id && (
                <div className="ml-13 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">回复给 {comment.author}:</span>
                  </div>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="请输入回复内容..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSubmitReply(comment.id)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                    >
                      发表回复
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent('');
                      }}
                      className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}

              {/* 回复列表 */}
              {comment.replies.length > 0 && (
                <div className="ml-13 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                          {reply.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium text-gray-900 dark:text-white text-sm">{reply.author}</div>
                          {/* 只有作者和管理员可以看到删除按钮 */}
                          {(author === reply.author || author === '李金元' || author === 'admin') && (
                            <button
                              onClick={() => handleDelete(comment.id, reply.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              title="删除回复"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                          {reply.content}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <span>{reply.timestamp}</span>
                          <button
                            onClick={() => handleLike(comment.id, reply.id)}
                            className="flex items-center gap-1 hover:text-red-500 transition-colors"
                          >
                            <Heart className={`h-3 w-3 ${reply.likes > 0 ? 'text-red-500 fill-current' : ''}`} />
                            <span>{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 底部提示 */}
      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>留言数据保存在浏览器本地，刷新页面不会丢失。</p>
        <p className="mt-1">只有作者和管理员可以删除留言和回复。</p>
      </div>
    </div>
  );
}


