export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  cover_image?: string;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
  view_count?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  post_count?: number;
}

export interface Comment {
  id: number;
  post_id: number;
  content: string;
  author: string;
  email?: string;
  website?: string;
  created_at: string;
  replies?: Comment[];
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
} 