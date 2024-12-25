import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { format } from 'date-fns';
import { marked } from 'marked';
import { Post } from '../../types/post';
import CommentSection from '../../components/comments/CommentSection';

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <>
      <Head>
        <title>{post.title} - 我的博客</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
      </Head>

      <article className="card prose prose-lg max-w-none">
        <header className="mb-8">
          <h1 className="mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <time>{format(new Date(post.published_at), 'yyyy-MM-dd')}</time>
            <span>阅读量: {post.views}</span>
            {post.category && (
              <span className="px-2 py-1 bg-gray-100 rounded">
                {post.category}
              </span>
            )}
          </div>
        </header>

        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: marked(post.content) }} 
        />

        <footer className="mt-8 pt-8 border-t">
          <div className="flex gap-2">
            {post.tags?.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </article>

      <CommentSection postId={post.id} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 这里将来会从 D1 数据库获取所有文章的 slug
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  // 这里将来会从 D1 数据库获取文章数据
  const post = {
    id: '1',
    title: '示例文章',
    slug: 'example-post',
    content: '# 示例内容\n\n这是一篇示例文章。',
    excerpt: '这是一篇示例文章。',
    published_at: Date.now(),
    views: 0,
    tags: ['示例', '测试'],
    category: '技术'
  };

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
}; 