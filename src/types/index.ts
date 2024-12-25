export interface Env {
  DB: D1Database;
  KV: KVNamespace;
  JWT_SECRET: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: 'draft' | 'published';
  created_at: number;
  updated_at?: number;
}

export interface Comment {
  id: string;
  post_id: string;
  content: string;
  author: string;
  created_at: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
} 