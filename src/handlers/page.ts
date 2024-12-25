import { html } from '../templates';

export async function handlePageRequest(request: Request, env: Env) {
  const url = new URL(request.url);

  // 获取页面数据
  const pageData = {
    title: env.BLOG_TITLE,
    description: env.BLOG_DESCRIPTION,
  };

  if (url.pathname === '/') {
    // 首页
    const { results: posts } = await env.DB.prepare(
      'SELECT * FROM posts WHERE status = ? ORDER BY published_at DESC LIMIT 10'
    ).bind('published').all();
    
    return new Response(html.home({ ...pageData, posts }), {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  }

  // 其他页面路由...
  return new Response('Not Found', { status: 404 });
} 