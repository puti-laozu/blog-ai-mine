import { Tag } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

export async function getTags(): Promise<(Tag & { count: number })[]> {
  const res = await fetch(`${API_URL}/tags`)
  if (!res.ok) throw new Error('Failed to fetch tags')
  return res.json()
} 