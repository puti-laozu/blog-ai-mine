import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../../lib/auth';
import { Post } from '../../../types/post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return await getPosts(req, res);
      case 'POST':
        return await createPost(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  const { page = '1', limit = '10', status } = req.query;
  const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

  let query = 'SELECT * FROM posts';
  const params: any[] = [];

  if (status) {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY published_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const { results } = await req.env.DB.prepare(query).bind(...params).all();
  return res.status(200).json(results);
}

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  const token = await verifyToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const post = req.body as Partial<Post>;
  const result = await req.env.DB
    .prepare(`
      INSERT INTO posts (title, content, slug, excerpt, status, published_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .bind(
      post.title,
      post.content,
      post.slug,
      post.excerpt,
      post.status,
      Date.now()
    )
    .run();

  return res.status(201).json({ id: result.lastRowId });
} 