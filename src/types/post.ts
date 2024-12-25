export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published_at: number;
  updated_at?: number;
  views: number;
  tags?: string[];
  category?: string;
  featured_image?: string;
  meta_description?: string;
} 