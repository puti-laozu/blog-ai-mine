export interface Comment {
  id: string;
  post_id: string;
  content: string;
  author: string;
  created_at: number;
  parent_id?: string;
  status: 'pending' | 'approved' | 'rejected';
} 