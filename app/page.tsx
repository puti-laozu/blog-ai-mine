import { fetchPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import Layout from '@/components/Layout';

export default async function HomePage() {
  const posts = await fetchPosts();

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold mb-8">最新文章</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
} 