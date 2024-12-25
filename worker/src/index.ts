interface Env {
  DB: D1Database;
  BLOG_CACHE: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle OPTIONS request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    try {
      // API routes
      if (path.startsWith('/api/')) {
        // Posts
        if (path === '/api/posts') {
          const sort = url.searchParams.get('sort') || 'asc';
          const posts = await env.DB.prepare(
            `SELECT * FROM posts ORDER BY created_at ${sort === 'desc' ? 'DESC' : 'ASC'}`
          ).all();
          return new Response(JSON.stringify({ data: posts.results }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Tags
        if (path === '/api/tags') {
          const tags = await env.DB.prepare('SELECT * FROM tags').all();
          return new Response(JSON.stringify({ data: tags.results }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Search
        if (path === '/api/search') {
          const query = url.searchParams.get('q') || '';
          const posts = await env.DB.prepare(
            `SELECT * FROM posts WHERE title LIKE ? OR content LIKE ?`
          ).bind(`%${query}%`, `%${query}%`).all();
          return new Response(JSON.stringify({ data: posts.results }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
}; 