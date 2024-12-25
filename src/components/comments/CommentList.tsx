import { format } from 'date-fns';
import { Comment } from '../../types/comment';

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p className="text-gray-500">暂无评论</p>;
  }

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <div key={comment.id} className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{comment.author}</span>
              <time className="text-sm text-gray-500">
                {format(new Date(comment.created_at), 'yyyy-MM-dd HH:mm')}
              </time>
            </div>
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </div>
      ))}
    </div>
  );
} 