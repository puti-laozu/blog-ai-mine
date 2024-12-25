import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AdminLayout from '../../../../components/admin/AdminLayout';
import PostEditor from '../../../../components/admin/PostEditor';
import { Post } from '../../../../types/post';

export default function EditPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (updatedPost: Partial<Post>) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        router.push('/admin/posts');
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <Head>
        <title>编辑文章 - 管理后台</title>
      </Head>

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">编辑文章</h1>
        {post && <PostEditor post={post} onSubmit={handleSubmit} />}
      </div>
    </AdminLayout>
  );
} 