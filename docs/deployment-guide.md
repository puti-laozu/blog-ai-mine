# 博客系统部署指南

本指南将帮助你一步步在 Cloudflare 上部署博客系统。即使你不懂代码，按照以下步骤也能成功部署。

## 第一部分：Cloudflare 账号准备

### 1. 注册 Cloudflare 账号
1. 打开浏览器，访问 https://dash.cloudflare.com/sign-up
2. 填写：
   - 电子邮件地址
   - 密码（至少8位，包含字母和数字）
3. 点击"注册"按钮
4. 验证你的邮箱（去邮箱点击验证链接）

### 2. 获取必要的账号信息
1. 登录 Cloudflare 控制台
2. 在右上角点击你的头像
3. 点击"我的个人资料"
4. 在左侧菜单找到并记录：
   - Account ID（账户 ID）
   - API Token（如果没有，需要创建）

### 3. 创建 API Token
1. 在个人资料页面，点击左侧的"API Tokens"
2. 点击"Create Token"按钮
3. 选择"Create Custom Token"
4. 填写以下信息：
   - Token name: `blog-deploy-token`
   - Permissions（权限）:
     - Account > Cloudflare Pages > Edit
     - Account > D1 > Edit
     - Account > R2 > Edit
     - Account > Workers KV > Edit
5. 点击"Continue to summary"，然后点击"Create Token"
6. **重要：** 立即复制并保存生成的 token，因为它只会显示一次

## 第二部分：创建必要的 Cloudflare 服务

### 1. 创建 D1 数据库
1. 在左侧菜单找到"Workers & Pages"
2. 点击"D1"选项卡
3. 点击"Create database"按钮
4. 填写：
   - Database name: `blog_db`
5. 点击"Create"
6. 保存显示的 Database ID

### 2. 创建 R2 存储桶
1. 在左侧菜单找到"R2"
2. 点击"Create bucket"按钮
3. 填写：
   - Bucket name: `blog-assets`
4. 点击"Create bucket"
5. 记录生成的 bucket 信息

### 3. 创建 KV 命名空间
1. 在左侧菜单找到"Workers"
2. 点击"KV"选项卡
3. 点击"Create namespace"按钮
4. 填写：
   - Namespace name: `blog_kv`
5. 点击"Add"
6. 保存显示的 Namespace ID

## 第三部分：创建 Pages 项目

### 1. 创建新项目
1. 在左侧菜单找到"Pages"
2. 点击"Create application"按钮
3. 选择"Pages"
4. 选择"Connect to Git"
5. 选择你的 GitHub 账号并授权
6. 选择博客项目的仓库
7. 点击"Begin setup"

### 2. 配置构建设置
1. 在构建设置页面填写：
   - Project name: `my-blog`
   - Production branch: `main`
   - Build command: `pnpm install && pnpm build`
   - Build output directory: `dist`
   - Node.js version: `20.x`

### 3. 配置环境变��
1. 在项目设置中找到"Environment variables"
2. 点击"Add"按钮，添加以下变量：
   ```
   BLOG_TITLE=你的博客标题
   BLOG_DESCRIPTION=博客描述
   ADMIN_USERNAME=管理员用户名
   ADMIN_PASSWORD=管理员密码（至少12位）
   JWT_SECRET=随机字符串（至少32位）
   CF_ACCOUNT_ID=你的Account ID
   CF_API_TOKEN=你之前创建的API Token
   ```

### 4. 绑定数据服务
1. 在项目设置中找到"Functions"
2. 点击"D1 Databases"
3. 点击"Add binding"
4. 填写：
   - Variable name: `DB`
   - Database: 选择之前创建的 `blog_db`

5. 重复类似步骤绑定 R2 和 KV：
   - R2:
     - Variable name: `ASSETS`
     - Bucket: 选择 `blog-assets`
   - KV:
     - Variable name: `KV`
     - Namespace: 选择 `blog_kv`

## 第四部分：域名设置（可选）

### 1. 添加自定义域名
1. 在 Pages 项目设置中找到"Custom domains"
2. 点击"Add custom domain"
3. 输入你的域名（例如：blog.example.com）
4. 点击"Add custom domain"
5. 按照显示的说明配置 DNS 记录：
   - 如果域名在 Cloudflare：自动配置
   - 如果域名在其他服务商：需要手动添加 CNAME 记录

### 2. 配置 SSL/TLS
1. 在域名设置中找到"SSL/TLS"
2. 选择"Full"模式
3. 等待证书自动配置完成

## 第五部分：��始化和验证

### 1. 验证部署
1. 等待自动部署完成
2. 访问分配的 Pages URL 或你的自定义域名
3. 确认网站可以正常访问

### 2. 初始化管理员账号
1. 访问 `/admin/login`
2. 使用设置的管理员账号登录：
   - 用户名：之前设置的 ADMIN_USERNAME
   - 密码：之前设置的 ADMIN_PASSWORD
3. 验证是否可以正常进入管理后台

### 3. 测试基本功能
1. 在管理后台创建一篇测试文章
2. 检查文章是否正常显示
3. 测试评论功能
4. 测试搜索功能

## 常见问题解决

### 部署失败
1. 检查环境变量是否都已正确设置
2. 查看构建日志，找到具体错误信息
3. 确保所有服务绑定都已正确配置

### 无法访问管理后台
1. 确认访问的URL是否正确
2. 检查用户名密码是否输入正确
3. 清除浏览器缓存后重试

### 数据库连接错误
1. 检查 D1 数据库绑定是否正确
2. 确认数据库名称是否正确
3. 验证数据库权限设置

如果遇到其他问题，可以：
1. 查看 Cloudflare Pages 的部署日志
2. 检查浏览器控制台是否有错误信息
3. 确认所有环境变量和配置是否正确

需要帮助时，可以：
1. 访问 Cloudflare 帮助中心
2. 在 GitHub 项目中提交 Issue
3. 联系技术支持 