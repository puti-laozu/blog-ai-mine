#!/bin/bash

# 创建主要目录
mkdir -p my-blog
cd my-blog

# 创建源代码目录结构
mkdir -p src/{components,pages,lib,styles,types}/{common,layout,posts}
mkdir -p src/lib/{api,db,utils}
mkdir -p public
mkdir -p migrations
mkdir -p scripts

# 初始化 git
git init

# 创建基础配置文件
touch .gitignore
touch .env.example
touch wrangler.toml
touch package.json
touch tsconfig.json 