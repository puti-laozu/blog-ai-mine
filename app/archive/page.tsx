import { fetchArchivePosts } from '@/lib/api';
import { groupPostsByYear, formatDate } from '@/lib/utils';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default async function ArchivePage() {
  const posts = await fetchArchivePosts();
  const groupedPosts = groupPostsByYear(posts);
  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a));

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">文章归档</h1>
        
        <div className="space-y-12">
          {years.map(year => (
            <div key={year} className="relative">
              <h2 className="text-2xl font-bold mb-4">{year}</h2>
              <div className="space-y-4 ml-4">
                {groupedPosts[year].map(post => (
                  <div
                    key={post.id}
                    className="relative pl-6 border-l border-gray-200"
                  >
                    <div className="absolute left-0 top-3 -ml-1.5 h-3 w-3 rounded-full bg-gray-200" />
                    <Link
                      href={`/posts/${post.slug}`}
                      className="block hover:bg-gray-50 p-4 rounded transition-colors"
                    >
                      <time className="text-sm text-gray-500">
                        {formatDate(post.created_at)}
                      </time>
                      <h3 className="text-lg font-semibold mt-1">
                        {post.title}
                      </h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
} 