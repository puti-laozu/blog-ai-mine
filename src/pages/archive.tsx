import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { Post } from '../types/post';

interface ArchivePageProps {
  archives: {
    [key: string]: Post[];
  };
}

export default function ArchivePage({ archives }: ArchivePageProps) {
  return (
    <>
      <Head>
        <title>归档 - 我的博客</title>
      </Head>

      <div className="space-y-12">
        <h1>文章归档</h1>
        
        {Object.entries(archives)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([year, posts]) => (
            <section key={year} className="space-y-4">
              <h2 className="text-2xl font-bold">{year}</h2>
              <div className="space-y-2">
                {posts.map(post => (
                  <div key={post.id} className="flex items-center space-x-4">
                    <time className="text-gray-500 w-24">
                      {format(new Date(post.published_at), 'MM-dd')}
                    </time>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:text-blue-600"
                    >
                      {post.title}
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // 这里将来会从 D1 数据库获取所有文章并按年份分组
  const archives = {
    '2024': [
      {
        id: '1',
        title: '示例文章',
        slug: 'example-post',
        published_at: Date.now(),
      },
    ],
  };

  return {
    props: {
      archives,
    },
    revalidate: 3600, // 每小时重新生成
  };
}; 