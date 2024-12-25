export async function handleAdminRequest(request: Request, env: Env) {
  // 验证权限
  const auth = await verifyAuth(request, env);
  if (!auth) {
    return new Response('Unauthorized', { status: 401 });
  }

  const url = new URL(request.url);
  
  // 管理后台API路由
  const routes = {
    '/api/admin/posts': handleAdminPosts,
    '/api/admin/posts/new': handleCreatePost,
    '/api/admin/posts/[id]': handleUpdatePost,
    '/api/admin/posts/[id]/delete': handleDeletePost,
  };

  // 匹配路由
  for (const [pattern, handler] of Object.entries(routes)) {
    const match = matchRoute(pattern, url.pathname);
    if (match) {
      return handler(request, env, match.params);
    }
  }

  return new Response('Not Found', { status: 404 });
}

async function handleAdminPosts(request: Request, env: Env) {
  const { results } = await env.DB.prepare(
    'SELECT * FROM posts ORDER BY published_at DESC'
  ).all();
  
  return Response.json(results);
}

async function handleCreatePost(request: Request, env: Env) {
  const post = await request.json();
  
  const result = await env.DB.prepare(`
    INSERT INTO posts (title, content, slug, status, published_at)
    VALUES (?, ?, ?, ?, ?)
  `).bind(
    post.title,
    post.content,
    post.slug,
    post.status,
    Date.now()
  ).run();

  return Response.json({ id: result.lastRowId });
}

async function handleUpdatePost(request: Request, env: Env, params: any) {
  const post = await request.json();
  
  await env.DB.prepare(`
    UPDATE posts 
    SET title = ?, content = ?, slug = ?, status = ?, updated_at = ?
    WHERE id = ?
  `).bind(
    post.title,
    post.content,
    post.slug,
    post.status,
    Date.now(),
    params.id
  ).run();

  return Response.json({ success: true });
}

async function handleDeletePost(request: Request, env: Env, params: any) {
  await env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(params.id).run();
  return Response.json({ success: true });
} 