import { D1Database } from '@cloudflare/workers-types';

export async function initializeDatabase(db: D1Database) {
  // 运行迁移
  const migrations = await import('../../../migrations/01_initial.sql');
  await db.batch(migrations.default.split(';').filter(Boolean));
}

export async function getPostById(db: D1Database, id: string) {
  const { results } = await db
    .prepare('SELECT * FROM posts WHERE id = ?')
    .bind(id)
    .all();
  return results[0] || null;
}

export async function getPostBySlug(db: D1Database, slug: string) {
  const { results } = await db
    .prepare('SELECT * FROM posts WHERE slug = ?')
    .bind(slug)
    .all();
  return results[0] || null;
}

export async function incrementPostViews(db: D1Database, postId: string) {
  await db
    .prepare('UPDATE posts SET views = views + 1 WHERE id = ?')
    .bind(postId)
    .run();
}

export async function searchPosts(db: D1Database, query: string) {
  const { results } = await db
    .prepare(`
      SELECT * FROM posts 
      WHERE status = 'published' 
        AND (title LIKE ? OR content LIKE ? OR excerpt LIKE ?)
      ORDER BY published_at DESC
    `)
    .bind(`%${query}%`, `%${query}%`, `%${query}%`)
    .all();
  return results;
} 