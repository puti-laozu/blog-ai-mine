import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // 检查登录状态
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>管理后台 - My Blog</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">管理后台</h1>
        {/* 添加管理功能 */}
      </div>
    </>
  );
} 