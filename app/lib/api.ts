import { Post, Tag, Comment } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchPostBySlug(slug: string): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

export async function fetchTags(): Promise<Tag[]> {
  const res = await fetch(`${API_BASE}/tags`);
  if (!res.ok) throw new Error('Failed to fetch tags');
  return res.json();
}

export async function fetchArchivePosts(): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/api/posts?sort=desc`);
  if (!res.ok) throw new Error('Failed to fetch archive posts');
  const { data } = await res.json();
  return data;
}

export async function fetchSearchResults(query: string): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to search posts');
  const { data } = await res.json();
  return data;
} 