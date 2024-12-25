import { notFound } from 'next/navigation'
import { Comments } from '@/components/Comments'
import { getPost } from '@/services/posts'
import { formatDate } from '@/utils/date'

export default async function PostPage({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const post = await getPost(slug)
  
  if (!post) {
    notFound()
  }

  return (
    <article className="prose lg:prose-xl mx-auto py-10">
      <h1>{post.title}</h1>
      
      <div className="text-gray-600">
        <time>{formatDate(post.createdAt)}</time>
        <span className="mx-2">·</span>
        <span>{post.views} views</span>
      </div>
      
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <Comments postId={post.id} />
    </article>
  )
} 