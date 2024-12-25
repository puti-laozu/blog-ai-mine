export async function handlePostRequest(request: Request, env: Env) {
  const url = new URL(request.url);
  const slug = url.pathname.replace('/posts/', '');

  // 获取文章数据
  const { results } = await env.DB.prepare(
    'SELECT * FROM posts WHERE slug = ? AND status = ?'
  ).bind(slug, 'published').all();

  const post = results[0];
  if (!post) {
    return new Response('Not Found', { status: 404 });
  }

  // 渲染文章页面
  return new Response(html.post({ 
    title: env.BLOG_TITLE,
    description: env.BLOG_DESCRIPTION,
    post 
  }), {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
  });
} 