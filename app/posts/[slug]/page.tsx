import { fetchPostBySlug } from '@/lib/api';
import Layout from '@/components/Layout';
import Comments from '@/components/Comments';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';

export default async function PostPage({
  params: { slug }
}: {
  params: { slug: string };
}) {
  const post = await fetchPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <article className="prose lg:prose-xl mx-auto">
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-lg"
          />
        )}
        <h1>{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-500 mb-8">
          <time>{formatDate(post.created_at)}</time>
          <span>阅读量: {post.view_count || 0}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="mt-8">
          {post.tags?.map(tag => (
            <span
              key={tag.id}
              className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </article>
      <Comments postId={post.id} />
    </Layout>
  );
} 