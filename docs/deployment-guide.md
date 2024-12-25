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
     - Account > Workers Scripts > Edit
     - Account > Workers KV Storage > Edit
5. 点击"Continue to summary"，然后点击"Create Token"
6. **重要：** 立即复制并保存生成的 token，因为它只会显示一次

## 第二部分：创建必要的 Cloudflare 服务

### 1. 创建 Workers KV 命名空间
1. 在左侧菜单找到"Workers"
2. 点击"KV"选项卡
3. 点击"Create namespace"按钮
4. 填写：
   - Namespace name: `blog_kv`
5. 点击"Add"
6. 保存显示的 Namespace ID（这个很重要，后面需要用）

### 2. 创建 Workers 服务
1. 在左侧菜单找到"Workers & Pages"
2. 点击"Create application"按钮
3. 选择"Create Worker"
4. 给你的 Worker 起个名字（例如：`my-blog-worker`）
5. 点击"Deploy"按钮
6. 记录生成的 Worker 域名（例如：my-blog-worker.username.workers.dev）

## 第三部分：配置 Workers 服务

### 1. 配置 Workers 设置
1. 在 Worker 详情页面，点击"Settings"选项卡
2. 找到"Environment Variables"部分
3. 点击"Add binding"按钮，添加以下变量：
   ```
   BLOG_TITLE=你的博客标题
   BLOG_DESCRIPTION=博客描述
   ADMIN_USERNAME=管理员用户名
   ADMIN_PASSWORD=管理员密码（至少12位）
   JWT_SECRET=随机字符串（至少32位）
   ```

### 2. 绑定 KV 命名空间
1. 在 Worker 设置页面，找到"KV Namespace Bindings"
2. 点击"Add binding"按钮
3. 填写：
   - Variable name: `KV`
   - KV namespace: 选择之前创建的 `blog_kv`
4. 点击"Save"按钮

## 第四部分：部署验证

### 1. 验证部署
1. 访问你的 Worker 域名（my-blog-worker.username.workers.dev）
2. 确认网站可以正常访问
3. 检查页面是否正确加载

### 2. 初始化管理员账号
1. 访问 `your-worker-domain.workers.dev/admin/login`
2. 使用设置的管理员账号登录：
   - 用户名：之前设置的 ADMIN_USERNAME
   - 密码：之前设置的 ADMIN_PASSWORD
3. 验证是否可以正常进入管理后台

### 3. 测试基本功能
1. 在管理后台创建一篇测试文章
2. 检查文章是否正常显示
3. 测试搜索功能

## 常见问题解决

### 部署失败
1. 检查环境变量是否都已正确设置
2. 查看 Workers 日志，找到具体错误信息
3. 确保 KV 命名空间绑定正确

### 无法访问管理后台
1. 确认访问的 URL 是否正确
2. 检查用户名密码是否输入正确
3. 清除浏览器缓存后重试

### KV 存储问题
1. 检查 KV 命名空间绑定是否正确
2. 确认 KV 变量名称是否为 `KV`
3. 验证 KV 权限设置

如果遇到其他问题，可以：
1. 查看 Workers 的运行日志
2. 检查浏览器控制台是否有错误信息
3. 确认所有环境变量和配置是否正确

需要帮助时，可以：
1. 访问 Cloudflare Workers 文档中心
2. 在 GitHub 项目中提交 Issue
3. 在 Cloudflare 社区论坛寻求帮助 