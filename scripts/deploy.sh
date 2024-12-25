#!/bin/bash

# 确保脚本在错误时停止
set -e

# 构建项目
echo "Building project..."
pnpm build

# 初始化数据库
echo "Initializing database..."
pnpm wrangler d1 execute blog_db --file=./migrations/01_initial.sql

# 部署到 Cloudflare Pages
echo "Deploying to Cloudflare Pages..."
pnpm wrangler pages deploy dist \
  --project-name=my-blog \
  --branch=main

echo "Deployment complete!" 