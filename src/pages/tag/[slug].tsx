import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import PostCard from '../../components/posts/PostCard';
import { Post } from '../../types/post';

interface TagPageProps {
  tag: string;
  posts: Post[];
}

export default function TagPage({ tag, posts }: TagPageProps) {
  return (
    <>
      <Head>
        <title>{tag} - 标签 - 我的博客</title>
      </Head>

      <div className="space-y-8">
        <header className="card">
          <h1>#{tag}</h1>
          <div className="text-sm text-gray-500 mt-4">
            共 {posts.length} 篇文章
          </div>
        </header>

        <div className="grid gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 这里将来会从 D1 数据库获取所有标签
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params?.slug as string;
  // 这里将来会从 D1 数���库获取标签相关文章
  const posts = [];

  return {
    props: {
      tag,
      posts,
    },
    revalidate: 60,
  };
}; 