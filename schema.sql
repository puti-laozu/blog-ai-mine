-- D1 数据库架构
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  published_at INTEGER NOT NULL,
  updated_at INTEGER,
  tags TEXT[],
  metadata JSONB,
  status TEXT DEFAULT 'draft'
);

CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT
);

-- 全文搜索支持
CREATE VIRTUAL TABLE posts_fts USING fts5(
  title, 
  content,
  content='posts',
  content_rowid='id'
); 