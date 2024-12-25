import { Env } from '../../index';
import { handleBlogPost } from '../api/posts';
import { handleComments } from '../api/comments';

export async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  // 博客文章路由
  if (path.startsWith('/api/posts')) {
    return handleBlogPost(request, env);
  }

  // 评论路由
  if (path.startsWith('/api/comments')) {
    return handleComments(request, env);
  }

  // 默认返回静态页面
  return new Response('Hello Blog!', {
    headers: { 'Content-Type': 'text/html' },
  });
} 