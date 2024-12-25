import { verifyAuth } from '../middleware/auth';
import { Env } from '../types';

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
  };

  // 匹配路由
  for (const [pattern, handler] of Object.entries(routes)) {
    if (url.pathname === pattern) {
      return handler(request, env);
    }
  }

  return new Response('Not Found', { status: 404 });
}

async function handleAdminPosts(request: Request, env: Env) {
  const posts = await env.DB
    .prepare('SELECT * FROM posts ORDER BY created_at DESC')
    .all();

  return Response.json(posts);
}

async function handleCreatePost(request: Request, env: Env) {
  const post = await request.json();
  
  const result = await env.DB
    .prepare('INSERT INTO posts (title, content, slug, status) VALUES (?, ?, ?, ?)')
    .bind(post.title, post.content, post.slug, post.status)
    .run();

  return Response.json({ id: result.lastRowId });
}

async function handleUpdatePost(request: Request, env: Env) {
  const post = await request.json();
  const id = new URL(request.url).pathname.split('/').pop();

  await env.DB
    .prepare('UPDATE posts SET title = ?, content = ?, status = ? WHERE id = ?')
    .bind(post.title, post.content, post.status, id)
    .run();

  return Response.json({ success: true });
} 