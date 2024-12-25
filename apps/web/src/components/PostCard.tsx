import Link from 'next/link'
import { Post } from '@/types'
import { formatDate } from '@/utils/date'

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="border rounded-lg p-6 hover:shadow-lg transition">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-2xl font-bold hover:text-blue-600">{post.title}</h2>
      </Link>
      
      <div className="mt-2 text-gray-600">
        <time>{formatDate(post.createdAt)}</time>
        <span className="mx-2">·</span>
        <span>{post.views} views</span>
      </div>
      
      {post.excerpt && (
        <p className="mt-4 text-gray-600">{post.excerpt}</p>
      )}
      
      {post.tags && post.tags.length > 0 && (
        <div className="mt-4 flex gap-2">
          {post.tags.map(tag => (
            <Link
              key={tag.id}
              href={`/tags/${tag.slug}`}
              className="px-2 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      )}
    </article>
  )
} 