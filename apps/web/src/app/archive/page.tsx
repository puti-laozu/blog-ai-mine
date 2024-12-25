import { getArchive } from '@/services/posts'
import Link from 'next/link'
import { formatDate } from '@/utils/date'

export default async function ArchivePage() {
  const archive = await getArchive()

  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold mb-8">Archive</h1>
      
      {Object.entries(archive).map(([year, posts]) => (
        <section key={year} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{year}</h2>
          
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="flex gap-4">
                <time className="text-gray-500 w-32">
                  {formatDate(post.createdAt, 'MMM DD')}
                </time>
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
} 