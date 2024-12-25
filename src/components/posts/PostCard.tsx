import Link from 'next/link';
import { format } from 'date-fns';
import { Post } from '../../types/post';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <Link href={`/posts/${post.slug}`}>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold hover:text-blue-600">
            {post.title}
          </h2>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <time>{format(new Date(post.published_at), 'yyyy-MM-dd')}</time>
            <span>阅读量: {post.views}</span>
            {post.category && (
              <span className="px-2 py-1 bg-gray-100 rounded">
                {post.category}
              </span>
            )}
          </div>
          <p className="text-gray-600">{post.excerpt}</p>
          <div className="flex gap-2">
            {post.tags?.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
} 