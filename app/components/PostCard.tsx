import Link from 'next/link';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.cover_image && (
        <div className="aspect-video relative overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="p-6">
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-2 hover:text-blue-600">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <time>{new Date(post.created_at).toLocaleDateString()}</time>
          {post.tags && (
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag.id}
                  href={`/tags/${tag.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
} 