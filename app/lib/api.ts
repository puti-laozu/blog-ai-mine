import { Post, Tag, Comment } from '../types';

const baseUrl = typeof window === 'undefined' 
  ? 'http://127.0.0.1:8787'  // 在服务器端构建时使用
  : '';  // 在浏览器中使用相对路径

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${baseUrl}/api/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  const { data } = await res.json();
  return data;
}

export async function fetchPostBySlug(slug: string): Promise<Post> {
  const res = await fetch(`${baseUrl}/api/posts/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  const { data } = await res.json();
  return data;
}

export async function fetchTags(): Promise<Tag[]> {
  const res = await fetch(`${baseUrl}/api/tags`);
  if (!res.ok) throw new Error('Failed to fetch tags');
  const { data } = await res.json();
  return data;
}

export async function fetchPostsByTag(slug: string): Promise<{ posts: Post[], tag: Tag }> {
  const res = await fetch(`${baseUrl}/api/tags/${slug}/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts by tag');
  const { data } = await res.json();
  return data;
}

export async function fetchArchivePosts(): Promise<Post[]> {
  const res = await fetch(`${baseUrl}/api/posts?sort=desc`);
  if (!res.ok) throw new Error('Failed to fetch archive posts');
  const { data } = await res.json();
  return data;
}

export async function fetchSearchResults(query: string): Promise<Post[]> {
  const res = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to search posts');
  const { data } = await res.json();
  return data;
} 