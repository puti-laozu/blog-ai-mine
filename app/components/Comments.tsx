'use client';

import { useState } from 'react';
import { useComments } from '@/lib/hooks';

interface CommentsProps {
  postId: number;
}

export default function Comments({ postId }: CommentsProps) {
  const { comments, isLoading, mutate } = useComments(postId);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, content, author }),
      });

      if (!response.ok) throw new Error('Failed to post comment');
      
      setContent('');
      setAuthor('');
      mutate(); // 刷新评论列表
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="mt-16 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">评论</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="你的名字"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的评论..."
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          提交评论
        </button>
      </form>

      {isLoading ? (
        <div>加载中...</div>
      ) : (
        <div className="space-y-6">
          {comments?.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{comment.author}</span>
                <time className="text-sm text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </time>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 