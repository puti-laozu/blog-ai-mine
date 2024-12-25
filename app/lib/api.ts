import { Post, Tag, Comment } from '../types';

// 获取完整的 API URL
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // 客户端：使用相对路径
    return '';
  }
  // 服务器端：使用完整 URL
  return process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';
};

export async function fetchPosts(): Promise<Post[]> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/posts`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch posts');
  const { data } = await res.json();
  return data;
}

export async function fetchPostBySlug(slug: string): Promise<Post> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/posts/${slug}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch post');
  const { data } = await res.json();
  return data;
}

export async function fetchTags(): Promise<Tag[]> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/tags`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch tags');
  const { data } = await res.json();
  return data;
}

export async function fetchPostsByTag(slug: string): Promise<{ posts: Post[], tag: Tag }> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/tags/${slug}/posts`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch posts by tag');
  const { data } = await res.json();
  return data;
}

export async function fetchArchivePosts(): Promise<Post[]> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/posts?sort=desc`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch archive posts');
  const { data } = await res.json();
  return data;
}

export async function fetchSearchResults(query: string): Promise<Post[]> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent(query)}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to search posts');
  const { data } = await res.json();
  return data;
} 