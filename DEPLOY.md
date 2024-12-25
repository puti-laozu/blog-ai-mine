# 博客系统部署指南

本指南将帮助你从零开始部署博客系统，无需本地开发环境。所有操作都在浏览器中完成。

## 目录
1. GitHub 仓库设置
2. Cloudflare 账户设置
3. 数据库配置
4. Workers 部署
5. 域名配置
6. 测试验证

## 1. GitHub 仓库设置

### 1.1 创建 GitHub 密钥
1. 访问 GitHub 设置页面：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选以下权限：
   - `repo` (完整访问权限)
   - `workflow` (允许 GitHub Actions)
4. 生成并保存令牌（Token）

### 1.2 配置仓库密钥
1. 进入你的博客仓库
2. 点击 "Settings" → "Secrets and variables" → "Actions"
3. 添加以下密钥：
   ```
   CF_API_TOKEN=你的_Cloudflare_API_令牌
   CF_ACCOUNT_ID=你的_Cloudflare_账户ID
   ```

## 2. Cloudflare 账户设置

### 2.1 创建 Cloudflare 账户
1. 访问 https://dash.cloudflare.com/sign-up
2. 使用邮箱注册新账户
3. 完成邮箱验证

### 2.2 获取账户信息
1. 登录 Cloudflare 控制台
2. 在右侧找到 "Account ID"，复制保存
3. 创建 API 令牌：
   - 访问 https://dash.cloudflare.com/profile/api-tokens
   - 点击 "Create Token"
   - 选择 "Edit Cloudflare Workers" 模板
   - 权限设置：
     - Account.Workers KV: Edit
     - Account.Workers Scripts: Edit
     - Account.D1: Edit
   - 创建令牌并保存

## 3. 数据库配置

### 3.1 创建 D1 数据库
1. 访问 Cloudflare Workers 控制台
2. 点击左侧 "D1"
3. 点击 "Create database"
4. 输入数据库名称：`blog-db`
5. 选择最近的地区
6. 复制生成的 `database_id`

### 3.2 配置数据库
1. 在 D1 数据库页面
2. 点击 "Query" 标签
3. 复制 `schema/init.sql` 中的内容到查询框
4. 点击 "Run query" 执行建表语句

### 3.3 创建 KV 命名空间
1. 在 Workers 控制台点击 "KV"
2. 点击 "Create namespace"
3. 输入名称：`BLOG_CACHE`
4. 复制生成的 `id`

## 4. Workers 部署

### 4.1 更新配置文件
1. 在 GitHub 仓库中编辑 `wrangler.toml`
2. 更新以下内容：
   ```toml
   [[d1_databases]]
   database_id = "你的_D1_数据库_ID"

   [[kv_namespaces]]
   id = "你的_KV_命名空间_ID"
   ```

### 4.2 部署 Worker
1. 在 Cloudflare Workers 控制台
2. 点击 "Create application"
3. 选择 "Deploy from GitHub"
4. 选择你的博客仓库
5. 选择主分支
6. 点击 "Deploy"

## 5. 域名配置

### 5.1 添加自定义域名（可选）
1. 在 Workers 控制台选择你的 Worker
2. 点击 "Triggers" 标签
3. 在 "Custom Domains" 下点击 "Add Custom Domain"
4. 输入你的域名（例如：blog.example.com）
5. 按照提示配置 DNS 记录

### 5.2 更新 API 地址
1. 在 GitHub 仓库中创建 `.env` 文件
2. 添加以下内容：
   ```env
   NEXT_PUBLIC_API_URL=https://你的worker地址.workers.dev
   ```

## 6. 测试验证

### 6.1 验证部署
1. 访问你的 Worker URL 或自定义域名
2. 检查以下功能是否正常：
   - 首页文章列表
   - 文章详情页
   - 标签页面
   - 归档页面
   - 搜索功能
   - 评论功能

### 6.2 添加测试文章
1. 在 D1 数据库的查询界面
2. 执行以下 SQL 添加测试文章：
   ```sql
   INSERT INTO posts (title, content, slug) 
   VALUES ('测试文章', '这是一篇测试文章', 'test-post');
   ```

## 常见问题

### 1. Worker 部署失败
- 检查 GitHub Actions 密钥是否正确配置
- 确认 Cloudflare API 令牌权限是否足够

### 2. 数据库连接错误
- 验证 D1 数据库 ID 是否正确
- 检查数据库表是否创建成功

### 3. 缓存不生效
- 确认 KV 命名空间 ID 是否正确
- 检查 Worker 是否有 KV 访问权限

## 维护指南

### 1. 更新博客内容
- 直接通过 D1 数据库界面添加/修改文章
- 使用 SQL 语句管理内容

### 2. 清理缓存
- 在 KV 命名空间中手动删除缓存项
- 或等待缓存自动过期（1小时）

### 3. 监控使用情况
- 在 Workers 控制台查看请求统计
- 监控数据库和 KV 存储使用量

## 数据库初始化详细步骤

### 1. 创建数据表
在 D1 数据库查询界面依次执行以下 SQL：

```sql
-- 1. 创建文章表
CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. 创建标签表
CREATE TABLE tags (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- 3. 创建文章标签关联表
CREATE TABLE post_tags (
  post_id INTEGER REFERENCES posts(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);

-- 4. 创建评论表
CREATE TABLE comments (
  id INTEGER PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id),
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  email TEXT,
  website TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2. 添加示例内容

```sql
-- 1. 添加测试文章
INSERT INTO posts (title, content, slug, excerpt) 
VALUES 
('第一篇博客', '这是我的第一篇博客内容。', 'first-post', '这是摘要'),
('关于我', '个人介绍页面', 'about', '关于我的页面');

-- 2. 添加示例标签
INSERT INTO tags (name, slug) 
VALUES 
('技术', 'tech'),
('生活', 'life');

-- 3. 关联文章和标签
INSERT INTO post_tags (post_id, tag_id) 
VALUES 
(1, 1),  -- 第一篇博客-技术
(2, 2);  -- 关于我-生活
```

## 内容管理指南

### 1. 添加新文章

```sql
-- 1. 插入文章
INSERT INTO posts (title, content, slug, excerpt) 
VALUES (
  '文章标题',
  '文章内容，支持 Markdown 格式',
  'article-slug',  -- URL 友好的标识符
  '文章摘要'
);

-- 2. 获取刚插入的文章 ID
SELECT last_insert_rowid() as post_id;

-- 3. 添加标签（如果需要）
INSERT INTO post_tags (post_id, tag_id)
VALUES (上一步获取的ID, 标签ID);
```

### 2. 更新文章

```sql
-- 更新文章内容
UPDATE posts 
SET 
  title = '新标题',
  content = '新内容',
  updated_at = CURRENT_TIMESTAMP
WHERE slug = 'article-slug';

-- 更新文章标签
DELETE FROM post_tags WHERE post_id = 文章ID;
INSERT INTO post_tags (post_id, tag_id) VALUES (文章ID, 新标签ID);
```

### 3. 管理标签

```sql
-- 添加新标签
INSERT INTO tags (name, slug) VALUES ('标签名称', 'tag-slug');

-- 查看标签使用情况
SELECT 
  t.name,
  COUNT(pt.post_id) as post_count
FROM tags t
LEFT JOIN post_tags pt ON t.id = pt.tag_id
GROUP BY t.id;
```

## 性能优化建议

### 1. 添加索引
```sql
-- 为常用查询添加索引
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_created ON posts(created_at);
CREATE INDEX idx_tags_slug ON tags(slug);
```

### 2. 缓存策略
- 热门文章缓存在 KV 中：`post:热门:${id}`
- 首页文章列表缓存：`posts:latest`
- 标签页面缓存：`tags:all`

### 3. 定期维护
```sql
-- 清理无引用的标签
DELETE FROM tags 
WHERE id NOT IN (SELECT DISTINCT tag_id FROM post_tags);

-- 更新文章统计
UPDATE posts 
SET view_count = (
  SELECT COUNT(*) 
  FROM page_views 
  WHERE post_id = posts.id
);
```

## 故障排查指南

### 1. 数据库查询问题
- 检查 SQL 语法
- 验证表结构是否完整
- 确认数据是否正确插入

### 2. API 响应问题
1. 检查 Worker 日志
2. 验证 API 路由是否正确
3. 确认数据库连接是否正常

### 3. 前端显示问题
1. 检查 API 响应数据格式
2. 验证环境变量是否正确设置
3. 确认路由配置是否正确

## 备份和恢复

### 1. 导出数据
在 D1 数据库界面：
1. 选择 "Export"
2. 下载 SQL 文件保存

### 2. 恢复数据
1. 创建新的 D1 数据库
2. 导入之前导出的 SQL 文件
3. 更新 `wrangler.toml` 中的数据库 ID 