import { Post } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts`)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export async function getPost(slug: string): Promise<Post | null> {
  const res = await fetch(`${API_URL}/posts/${slug}`)
  if (!res.ok) return null
  return res.json()
}

export async function getArchive() {
  const posts = await getPosts()
  return posts.reduce((acc: Record<string, Post[]>, post) => {
    const year = new Date(post.createdAt).getFullYear().toString()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})
} 