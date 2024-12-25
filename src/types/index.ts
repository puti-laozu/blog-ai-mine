export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  status: PostStatus;
  published_at: number;
  created_at: number;
  updated_at: number;
}

export type PostStatus = 'draft' | 'published';

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