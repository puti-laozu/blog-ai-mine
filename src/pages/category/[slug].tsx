import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import PostCard from '../../components/posts/PostCard';
import { Post } from '../../types/post';
import { Category } from '../../types/category';

interface CategoryPageProps {
  category: Category;
  posts: Post[];
}

export default function CategoryPage({ category, posts }: CategoryPageProps) {
  return (
    <>
      <Head>
        <title>{category.name} - 分类 - 我的博客</title>
      </Head>

      <div className="space-y-8">
        <header className="card">
          <h1>{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 mt-2">{category.description}</p>
          )}
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
  // 这里将来会从 D1 数据库获取所有分类的 slug
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  // 这里将来会从 D1 数据库获取分类数据和相关文章
  const category = {
    id: '1',
    name: '技术',
    slug: 'tech',
    description: '技术相关文章'
  };
  const posts = [];

  return {
    props: {
      category,
      posts,
    },
    revalidate: 60,
  };
}; 