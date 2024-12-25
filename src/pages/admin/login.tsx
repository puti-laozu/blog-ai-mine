import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 处理登录逻辑
  };

  return (
    <>
      <Head>
        <title>登录 - My Blog</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {/* 登录表单 */}
        </form>
      </div>
    </>
  );
} 