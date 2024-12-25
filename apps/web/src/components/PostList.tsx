'use client'

import { useQuery } from '@tanstack/react-query'
import { Post } from '@/types'
import { PostCard } from './PostCard'

export function PostList() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(res => res.json())
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
} 