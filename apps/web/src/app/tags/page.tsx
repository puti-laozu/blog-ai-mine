import { getTags } from '@/services/tags'
import Link from 'next/link'

export default async function TagsPage() {
  const tags = await getTags()

  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold mb-8">Tags</h1>
      
      <div className="flex flex-wrap gap-4">
        {tags.map(tag => (
          <Link
            key={tag.id}
            href={`/tags/${tag.slug}`}
            className="px-4 py-2 bg-gray-100 rounded-full text-lg hover:bg-gray-200"
          >
            {tag.name}
            <span className="ml-2 text-gray-500">({tag.count})</span>
          </Link>
        ))}
      </div>
    </div>
  )
} 