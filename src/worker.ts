import { handleError } from './middleware/error';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    try {
      const url = new URL(request.url);
      
      // API 路由处理
      if (url.pathname.startsWith('/api/')) {
        return await handleApiRequest(request, env, ctx);
      }

      // 静态资源处理
      if (url.pathname.startsWith('/static/')) {
        return await handleStaticRequest(request, env, ctx);
      }

      // 默认返回 HTML
      return await handlePageRequest(request, env, ctx);
    } catch (err) {
      return handleError(err);
    }
  },
};

async function handleApiRequest(request: Request, env: Env, ctx: ExecutionContext) {
  const url = new URL(request.url);
  
  // API 路由映射
  const routes = {
    '/api/posts': handlePosts,
    '/api/auth/login': handleLogin,
    // ... 其他 API 路由
  };

  const handler = routes[url.pathname];
  if (handler) {
    return handler(request, env, ctx);
  }

  return new Response('Not Found', { status: 404 });
}

async function handlePosts(request: Request, env: Env, ctx: ExecutionContext) {
  // 文章相关的 CRUD 操作
  switch (request.method) {
    case 'GET':
      const { results } = await env.DB.prepare(
        'SELECT * FROM posts ORDER BY published_at DESC'
      ).all();
      return Response.json(results);

    case 'POST':
      // 验证权限
      const auth = await verifyAuth(request, env);
      if (!auth) {
        return new Response('Unauthorized', { status: 401 });
      }

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

    default:
      return new Response('Method Not Allowed', { status: 405 });
  }
}

async function handlePageRequest(request: Request, env: Env) {
  const url = new URL(request.url);

  // 管理后台路由
  if (url.pathname.startsWith('/admin')) {
    return handleAdminPage(request, env);
  }

  // 博客前台路由
  const routes = {
    '/': handleHomePage,
    '/posts/[slug]': handlePostPage,
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