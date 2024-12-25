import { GetStaticProps } from 'next';
import Head from 'next/head';
import PostCard from '../components/posts/PostCard';
import { Post } from '../types/post';

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Head>
        <title>我的博客</title>
        <meta name="description" content="欢迎访问我的博客" />
      </Head>

      <div className="space-y-8">
        <section className="card">
          <h1>最新文章</h1>
          <div className="grid gap-6 mt-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // 这里将来会从 D1 数据库获取数据
  const posts = [];
  return {
    props: {
      posts,
    },
    revalidate: 60, // 每分钟重新生成页面
  };
}; 