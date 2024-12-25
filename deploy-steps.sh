# 1. 安装 Wrangler CLI
npm install -g wrangler

# 2. 登录 Cloudflare
wrangler login

# 3. 创建数据库
wrangler d1 create blog-db

# 4. 创建 R2 存储桶
wrangler r2 bucket create blog-assets

# 5. 部署应用
wrangler deploy 