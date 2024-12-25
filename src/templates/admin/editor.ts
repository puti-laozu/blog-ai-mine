export function editor({ title, post }: EditorPageData) {
  return `
    <!DOCTYPE html>
    <html lang="zh">
      <head>
        <meta charset="UTF-8">
        <title>${post ? '编辑文章' : '写新文章'} - ${title}</title>
        <link rel="stylesheet" href="/static/admin.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.css">
      </head>
      <body>
        <div class="admin-layout">
          <nav class="admin-nav">
            <h1>${title}</h1>
            <ul>
              <li><a href="/admin/posts">返回文章列表</a></li>
            </ul>
          </nav>
          <main class="admin-main">
            <form id="postForm" class="post-editor">
              <div class="form-group">
                <label for="title">标题</label>
                <input type="text" id="title" name="title" value="${post?.title || ''}" required>
              </div>
              <div class="form-group">
                <label for="content">内容</label>
                <textarea id="content" name="content">${post?.content || ''}</textarea>
              </div>
              <div class="form-group">
                <label for="slug">URL 别名</label>
                <input type="text" id="slug" name="slug" value="${post?.slug || ''}" required>
              </div>
              <div class="form-group">
                <label>状态</label>
                <select name="status">
                  <option value="draft" ${post?.status === 'draft' ? 'selected' : ''}>草稿</option>
                  <option value="published" ${post?.status === 'published' ? 'selected' : ''}>发布</option>
                </select>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn">保存</button>
                <button type="button" class="btn btn-preview">预览</button>
              </div>
            </form>
          </main>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.js"></script>
        <script src="/static/admin/editor.js"></script>
      </body>
    </html>
  `;
}

interface EditorPageData {
  title: string;
  post?: Post;
} 