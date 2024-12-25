import { fetchPostsByTag, fetchTags } from '@/lib/api';

export async function generateStaticParams() {
  const tags = await fetchTags();
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  const { posts, tag } = await fetchPostsByTag(params.slug);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">标签: {tag.name}</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-4">
              <a href={`/posts/${post.slug}`} className="hover:text-blue-600">
                {post.title}
              </a>
            </h2>
            <p className="text-gray-600">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
} 