import { fetchSearchResults } from '@/lib/api';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';

export default async function SearchPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;
  const posts = query ? await fetchSearchResults(query) : [];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">搜索结果</h1>
          <SearchBar />
        </div>

        {query ? (
          <>
            <p className="mb-8 text-gray-600">
              找到 {posts.length} 篇与 "{query}" 相关的文章
            </p>
            <div className="space-y-8">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">请输入搜索关键词</p>
        )}
      </div>
    </Layout>
  );
} 