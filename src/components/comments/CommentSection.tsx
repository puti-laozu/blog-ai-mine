import { useState } from 'react';
import { Comment } from '../../types/comment';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitComment = async (content: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const newComment = await response.json();
      setComments(prev => [newComment, ...prev]);
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">评论</h2>
      <CommentForm onSubmit={handleSubmitComment} isLoading={isLoading} />
      <CommentList comments={comments} />
    </section>
  );
} 