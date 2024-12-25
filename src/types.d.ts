interface Env {
  DB: D1Database;
  KV: KVNamespace;
  BLOG_TITLE: string;
  BLOG_DESCRIPTION: string;
  JWT_SECRET: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: 'draft' | 'published';
  published_at: number;
} 