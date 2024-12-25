import useSWR from 'swr';
import { Comment } from '@/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useComments(postId: number) {
  const { data, error, isLoading, mutate } = useSWR<{ data: Comment[] }>(
    `/api/posts/${postId}/comments`,
    fetcher
  );

  return {
    comments: data?.data,
    isLoading,
    isError: error,
    mutate
  };
} 