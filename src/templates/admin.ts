export const adminHtml = {
  login({ title }: AdminPageData) {
    return `
      <!DOCTYPE html>
      <html lang="zh">
        <head>
          <meta charset="UTF-8">
          <title>登录 - ${title}</title>
          <link rel="stylesheet" href="/static/admin.css">
        </head>
        <body>
          <main class="login-page">
            <form id="loginForm" class="login-form">
              <h1>管理员登录</h1>
              <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" id="username" name="username" required>
              </div>
              <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" name="password" required>
              </div>
              <button type="submit">登录</button>
            </form>
          </main>
          <script src="/static/admin/login.js"></script>
        </body>
      </html>
    `;
  },

  dashboard({ title, posts }: AdminDashboardData) {
    return `
      <!DOCTYPE html>
      <html lang="zh">
        <head>
          <meta charset="UTF-8">
          <title>管理后台 - ${title}</title>
          <link rel="stylesheet" href="/static/admin.css">
        </head>
        <body>
          <div class="admin-layout">
            <nav class="admin-nav">
              <h1>${title}</h1>
              <ul>
                <li><a href="/admin/posts">文章管理</a></li>
                <li><a href="/admin/settings">设置</a></li>
              </ul>
            </nav>
            <main class="admin-main">
              <div class="toolbar">
                <h2>文章列表</h2>
                <a href="/admin/posts/new" class="btn">写新文章</a>
              </div>
              <table class="posts-table">
                <thead>
                  <tr>
                    <th>标题</th>
                    <th>状态</th>
                    <th>发布时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  ${posts.map(post => `
                    <tr>
                      <td>${post.title}</td>
                      <td>${post.status === 'published' ? '已发布' : '草稿'}</td>
                      <td>${formatDate(post.published_at)}</td>
                      <td>
                        <a href="/admin/posts/${post.id}/edit">编辑</a>
                        <button onclick="deletePost(${post.id})">删除</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </main>
          </div>
          <script src="/static/admin/dashboard.js"></script>
        </body>
      </html>
    `;
  }
};

interface AdminPageData {
  title: string;
}

interface AdminDashboardData extends AdminPageData {
  posts: Post[];
} 