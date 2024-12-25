import { Router } from 'itty-router';
import { json } from 'itty-router-extras';

interface Env {
  DB: D1Database;
  BLOG_CACHE: KVNamespace;
}

const router = Router();

// 文章列表
router.get('/api/posts', async (request, env: Env) => {
  try {
    const { results } = await env.DB
      .prepare(`
        SELECT p.*, GROUP_CONCAT(t.name) as tag_names
        FROM posts p
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        GROUP BY p.id
        ORDER BY p.created_at DESC
      `)
      .all();
    
    return json({ data: results });
  } catch (error) {
    return json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
});

// 获取单篇文章
router.get('/api/posts/:slug', async (request, env: Env) => {
  try {
    const { slug } = request.params;
    
    // 先检查缓存
    const cached = await env.BLOG_CACHE.get(`post:${slug}`);
    if (cached) return json({ data: JSON.parse(cached) });
    
    const post = await env.DB
      .prepare(`
        SELECT p.*, GROUP_CONCAT(t.name) as tag_names
        FROM posts p
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        WHERE p.slug = ?
        GROUP BY p.id
      `)
      .bind(slug)
      .first();
    
    if (!post) return json({ error: 'Post not found' }, { status: 404 });
    
    // 缓存结果
    await env.BLOG_CACHE.put(`post:${slug}`, JSON.stringify(post), {
      expirationTtl: 3600 // 1小时缓存
    });
    
    return json({ data: post });
  } catch (error) {
    return json({ error: 'Failed to fetch post' }, { status: 500 });
  }
});

// 获取标签列表
router.get('/api/tags', async (request, env: Env) => {
  try {
    const { results } = await env.DB
      .prepare(`
        SELECT t.*, COUNT(pt.post_id) as post_count
        FROM tags t
        LEFT JOIN post_tags pt ON t.id = pt.tag_id
        GROUP BY t.id
      `)
      .all();
    
    return json({ data: results });
  } catch (error) {
    return json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
});

// 获取文章评论
router.get('/api/posts/:id/comments', async (request, env: Env) => {
  try {
    const { id } = request.params;
    const { results } = await env.DB
      .prepare(`
        SELECT * FROM comments
        WHERE post_id = ?
        ORDER BY created_at DESC
      `)
      .bind(id)
      .all();
    
    return json({ data: results });
  } catch (error) {
    return json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
});

// 添加评论
router.post('/api/comments', async (request, env: Env) => {
  try {
    const { postId, content, author } = await request.json();
    
    const result = await env.DB
      .prepare(`
        INSERT INTO comments (post_id, content, author)
        VALUES (?, ?, ?)
      `)
      .bind(postId, content, author)
      .run();
    
    return json({ data: result });
  } catch (error) {
    return json({ error: 'Failed to post comment' }, { status: 500 });
  }
});

// 获取标签下的文章
router.get('/api/tags/:slug/posts', async (request, env: Env) => {
  try {
    const { slug } = request.params;
    
    // 获取标签信息
    const tag = await env.DB
      .prepare('SELECT * FROM tags WHERE slug = ?')
      .bind(slug)
      .first();
    
    if (!tag) return json({ error: 'Tag not found' }, { status: 404 });
    
    // 获取标签下的文章
    const { results: posts } = await env.DB
      .prepare(`
        SELECT p.*, GROUP_CONCAT(t.name) as tag_names
        FROM posts p
        JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        WHERE pt.tag_id = ?
        GROUP BY p.id
        ORDER BY p.created_at DESC
      `)
      .bind(tag.id)
      .all();
    
    return json({ data: { tag, posts } });
  } catch (error) {
    return json({ error: 'Failed to fetch posts by tag' }, { status: 500 });
  }
});

// 搜索文章
router.get('/api/search', async (request, env: Env) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    
    if (!query) return json({ data: [] });
    
    const { results } = await env.DB
      .prepare(`
        SELECT p.*, GROUP_CONCAT(t.name) as tag_names
        FROM posts p
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        WHERE p.title LIKE ?
        OR p.content LIKE ?
        GROUP BY p.id
        ORDER BY p.created_at DESC
      `)
      .bind(`%${query}%`, `%${query}%`)
      .all();
    
    return json({ data: results });
  } catch (error) {
    return json({ error: 'Failed to search posts' }, { status: 500 });
  }
});

export default {
  fetch: router.handle
}; 