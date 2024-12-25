interface ApiRouter {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  handler: (request: Request, env: Env) => Promise<Response>;
  middleware?: Middleware[];
}

const routes: ApiRouter[] = [
  {
    path: '/api/posts',
    method: 'GET',
    handler: async (request, env) => {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      
      const posts = await env.DB
        .prepare('SELECT * FROM posts WHERE status = ? ORDER BY published_at DESC LIMIT ? OFFSET ?')
        .bind('published', limit, (page - 1) * limit)
        .all();
      
      return new Response(JSON.stringify(posts), {
        headers: { 'Content-Type': 'application/json' }
      });
    },
    middleware: [rateLimit, auth]
  }
]; 