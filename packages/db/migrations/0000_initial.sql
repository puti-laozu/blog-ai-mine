CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar TEXT,
  github_id TEXT UNIQUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  published INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  author_id TEXT NOT NULL REFERENCES users(id),
  views INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS posts_tags (
  post_id TEXT NOT NULL REFERENCES posts(id),
  tag_id TEXT NOT NULL REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  post_id TEXT NOT NULL REFERENCES posts(id),
  author_id TEXT NOT NULL REFERENCES users(id),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_comments_post ON comments(post_id); 