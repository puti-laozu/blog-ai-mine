import { Env } from '../../index';

export async function handleComments(request: Request, env: Env): Promise<Response> {
  const { method } = request;

  switch (method) {
    case 'GET':
      return await getComments(request, env);
    case 'POST':
      return await createComment(request, env);
    default:
      return new Response('Method not allowed', { status: 405 });
  }
}

async function getComments(request: Request, env: Env): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return new Response('Post ID is required', { status: 400 });
  }

  const comments = await env.DB
    .prepare('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC')
    .bind(postId)
    .all();

  return new Response(JSON.stringify(comments), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function createComment(request: Request, env: Env): Promise<Response> {
  const comment = await request.json();
  
  const result = await env.DB
    .prepare('INSERT INTO comments (post_id, content, author, created_at) VALUES (?, ?, ?, ?)')
    .bind(comment.postId, comment.content, comment.author, Date.now())
    .run();

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
} 