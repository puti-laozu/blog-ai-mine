#!/bin/bash

# 1. 构建优化
pnpm build

# 2. 数据库迁移
wrangler d1 execute blog_db --file=./migrations/

# 3. 资源优化
pnpm optimize-assets

# 4. 部署应用
wrangler deploy

# 5. 清理缓存
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}' 