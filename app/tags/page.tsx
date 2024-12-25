import { fetchTags } from '@/lib/api';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default async function TagsPage() {
  const tags = await fetchTags();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">标签</h1>
        <div className="flex flex-wrap gap-4">
          {tags.map(tag => (
            <Link
              key={tag.id}
              href={`/tags/${tag.slug}`}
              className="bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700"
            >
              {tag.name}
              <span className="ml-2 text-gray-500">({tag.post_count})</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
} 