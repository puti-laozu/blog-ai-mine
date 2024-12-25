-- 扩展文章表
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  published_at INTEGER NOT NULL,
  updated_at INTEGER,
  views INTEGER DEFAULT 0,
  read_time INTEGER DEFAULT 0,
  tags TEXT[],
  category_id TEXT,
  status TEXT DEFAULT 'draft',
  featured_image TEXT,
  meta_description TEXT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 扩展评论表
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  parent_id TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  created_at INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (parent_id) REFERENCES comments(id)
);

-- 阅读统计表
CREATE TABLE IF NOT EXISTS post_views (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  viewed_at INTEGER NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id)
); 