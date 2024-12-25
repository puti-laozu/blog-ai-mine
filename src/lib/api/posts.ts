import { Env } from '../../index';

export async function handleBlogPost(request: Request, env: Env): Promise<Response> {
  const { method } = request;

  switch (method) {
    case 'GET':
      return await getPosts(request, env);
    case 'POST':
      return await createPost(request, env);
    default:
      return new Response('Method not allowed', { status: 405 });
  }
}

async function getPosts(request: Request, env: Env): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const posts = await env.DB
    .prepare('SELECT * FROM posts WHERE status = ? ORDER BY published_at DESC LIMIT ? OFFSET ?')
    .bind('published', limit, (page - 1) * limit)
    .all();

  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function createPost(request: Request, env: Env): Promise<Response> {
  const post = await request.json();
  
  const result = await env.DB
    .prepare('INSERT INTO posts (title, content, slug, published_at) VALUES (?, ?, ?, ?)')
    .bind(post.title, post.content, post.slug, Date.now())
    .run();

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
} 