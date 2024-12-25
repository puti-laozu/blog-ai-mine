import { fetchPostBySlug, fetchPosts } from '@/lib/api';
import { Post } from '@/types';
import Comments from '@/components/Comments';

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug);
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      <Comments postId={post.id} />
    </article>
  );
} 