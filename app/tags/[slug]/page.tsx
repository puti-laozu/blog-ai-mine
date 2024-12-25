import { fetchPostsByTag } from '@/lib/api';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import { notFound } from 'next/navigation';

export default async function TagPage({
  params: { slug }
}: {
  params: { slug: string };
}) {
  const { posts, tag } = await fetchPostsByTag(slug);
  
  if (!tag) {
    notFound();
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          标签: {tag.name}
          <span className="ml-2 text-gray-500">({posts.length})</span>
        </h1>
        <div className="space-y-8">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
} 